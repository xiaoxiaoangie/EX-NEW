"""
FIBD 智能助手 — Token 自动续期服务

处理需要定期刷新的 OAuth Token（如 LinkedIn）。
建议以独立 cron job 或后台服务运行。

依赖：pip install requests python-dotenv schedule
"""

import os
import json
import time
import logging
from datetime import datetime, timedelta
from pathlib import Path

import requests
import schedule
from dotenv import load_dotenv

# ---- 配置 ----
load_dotenv()
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger("token-refresh")

TOKEN_STORE_PATH = Path(__file__).parent / ".tokens.json"  # 本地开发用，生产应使用 Vault
FEISHU_ALERT_WEBHOOK = os.getenv("FEISHU_BOT_WEBHOOK_DAILY")


# ---- Token 存储（本地 JSON，生产用 Secrets Manager）----

def load_tokens() -> dict:
    """加载本地 token 存储"""
    if TOKEN_STORE_PATH.exists():
        with open(TOKEN_STORE_PATH, "r") as f:
            return json.load(f)
    return {}


def save_tokens(tokens: dict):
    """保存 token 到本地存储"""
    with open(TOKEN_STORE_PATH, "w") as f:
        json.dump(tokens, f, indent=2, default=str)
    # 确保文件权限仅限当前用户
    os.chmod(TOKEN_STORE_PATH, 0o600)


# ---- LinkedIn Token 续期 ----

def refresh_linkedin_token():
    """
    LinkedIn OAuth2 Token 续期
    Access Token 有效期 60 天，提前 7 天刷新
    """
    tokens = load_tokens()
    linkedin = tokens.get("linkedin", {})
    
    # 检查是否需要刷新
    expires_at = linkedin.get("expires_at")
    if expires_at:
        expiry = datetime.fromisoformat(expires_at)
        if expiry - datetime.now() > timedelta(days=7):
            logger.info("LinkedIn token 有效期充足，跳过刷新")
            return
    
    client_id = os.getenv("LINKEDIN_CLIENT_ID")
    client_secret = os.getenv("LINKEDIN_CLIENT_SECRET")
    refresh_token = linkedin.get("refresh_token") or os.getenv("LINKEDIN_REFRESH_TOKEN")
    
    if not all([client_id, client_secret, refresh_token]):
        logger.warning("LinkedIn 凭证不完整，跳过刷新")
        return
    
    try:
        resp = requests.post(
            "https://www.linkedin.com/oauth/v2/accessToken",
            data={
                "grant_type": "refresh_token",
                "refresh_token": refresh_token,
                "client_id": client_id,
                "client_secret": client_secret,
            },
            timeout=30
        )
        resp.raise_for_status()
        data = resp.json()
        
        # 更新存储
        tokens["linkedin"] = {
            "access_token": data["access_token"],
            "refresh_token": data.get("refresh_token", refresh_token),
            "expires_in": data["expires_in"],
            "expires_at": (datetime.now() + timedelta(seconds=data["expires_in"])).isoformat(),
            "refreshed_at": datetime.now().isoformat(),
        }
        save_tokens(tokens)
        logger.info("LinkedIn token 刷新成功，新有效期: %s 天", data["expires_in"] // 86400)
        
    except requests.exceptions.RequestException as e:
        logger.error("LinkedIn token 刷新失败: %s", e)
        send_alert(f"⚠️ LinkedIn Token 刷新失败\n错误: {e}\n请人工检查")


# ---- Twitter Token 验证 ----

def verify_twitter_token():
    """
    Twitter Bearer Token 不会过期，但需定期验证有效性
    """
    bearer_token = os.getenv("TWITTER_BEARER_TOKEN")
    if not bearer_token:
        logger.warning("Twitter Bearer Token 未配置")
        return
    
    try:
        resp = requests.get(
            "https://api.twitter.com/2/tweets/search/recent",
            params={"query": "test", "max_results": 10},
            headers={"Authorization": f"Bearer {bearer_token}"},
            timeout=15
        )
        
        if resp.status_code == 200:
            logger.info("Twitter token 验证通过")
        elif resp.status_code == 401:
            logger.error("Twitter token 无效/已过期")
            send_alert("⚠️ Twitter Bearer Token 无效，请重新生成")
        elif resp.status_code == 429:
            logger.warning("Twitter API 速率限制，token 仍有效")
        else:
            logger.warning("Twitter API 返回异常状态: %d", resp.status_code)
            
    except requests.exceptions.RequestException as e:
        logger.error("Twitter token 验证失败: %s", e)


# ---- Proxycurl 额度检查 ----

def check_proxycurl_credits():
    """
    检查 Proxycurl 剩余 credits
    """
    api_key = os.getenv("PROXYCURL_API_KEY")
    if not api_key:
        return
    
    try:
        resp = requests.get(
            "https://nubela.co/proxycurl/api/credit",
            headers={"Authorization": f"Bearer {api_key}"},
            timeout=15
        )
        resp.raise_for_status()
        data = resp.json()
        
        credits_remaining = data.get("credit_balance", 0)
        logger.info("Proxycurl 剩余 credits: %d", credits_remaining)
        
        if credits_remaining < 50:
            send_alert(f"⚠️ Proxycurl credits 不足\n剩余: {credits_remaining}\n请充值")
        
    except requests.exceptions.RequestException as e:
        logger.error("Proxycurl credits 查询失败: %s", e)


# ---- Hunter.io 额度检查 ----

def check_hunter_quota():
    """
    检查 Hunter.io 本月剩余用量
    """
    api_key = os.getenv("HUNTER_API_KEY")
    if not api_key:
        return
    
    try:
        resp = requests.get(
            "https://api.hunter.io/v2/account",
            params={"api_key": api_key},
            timeout=15
        )
        resp.raise_for_status()
        data = resp.json()["data"]
        
        searches_used = data["requests"]["searches"]["used"]
        searches_available = data["requests"]["searches"]["available"]
        verifications_used = data["requests"]["verifications"]["used"]
        verifications_available = data["requests"]["verifications"]["available"]
        
        logger.info(
            "Hunter.io 用量 - 搜索: %d/%d, 验证: %d/%d",
            searches_used, searches_available,
            verifications_used, verifications_available
        )
        
        if searches_used / max(searches_available, 1) > 0.8:
            send_alert(f"⚠️ Hunter.io 搜索额度即将耗尽\n已用: {searches_used}/{searches_available}")
        
    except requests.exceptions.RequestException as e:
        logger.error("Hunter.io 额度查询失败: %s", e)


# ---- 飞书告警 ----

def send_alert(message: str):
    """推送告警到飞书群"""
    if not FEISHU_ALERT_WEBHOOK:
        logger.warning("飞书 Webhook 未配置，告警仅输出日志: %s", message)
        return
    
    try:
        requests.post(
            FEISHU_ALERT_WEBHOOK,
            json={
                "msg_type": "interactive",
                "card": {
                    "header": {
                        "title": {"content": "🔑 凭证服务告警", "tag": "plain_text"},
                        "template": "red"
                    },
                    "elements": [{
                        "tag": "markdown",
                        "content": message
                    }, {
                        "tag": "note",
                        "elements": [{
                            "tag": "plain_text",
                            "content": f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
                        }]
                    }]
                }
            },
            timeout=10
        )
    except Exception as e:
        logger.error("飞书告警推送失败: %s", e)


# ---- 定时任务调度 ----

def run_all_checks():
    """执行所有凭证检查"""
    logger.info("=" * 50)
    logger.info("开始执行凭证健康检查...")
    refresh_linkedin_token()
    verify_twitter_token()
    check_proxycurl_credits()
    check_hunter_quota()
    logger.info("凭证健康检查完成")
    logger.info("=" * 50)


if __name__ == "__main__":
    # 启动时执行一次
    run_all_checks()
    
    # 定时执行：每天 07:00 UTC 检查一次
    schedule.every().day.at("07:00").do(run_all_checks)
    
    logger.info("Token 续期服务已启动，每日 07:00 UTC 检查")
    
    while True:
        schedule.run_pending()
        time.sleep(60)
