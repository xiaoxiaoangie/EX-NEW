# 凭证获取与配置指南

## 总览

BD 智能助手需要对接多个外部平台，部分平台需要登录/API Key 才能使用。本文档说明每个平台的凭证获取方式、认证机制和注意事项。

---

## 认证方式分类

| 平台 | 认证方式 | 是否需要登录 | 费用 | 获取难度 |
|------|---------|------------|------|---------|
| NewsAPI | API Key | ❌ 注册即可 | Free/Paid | ⭐ 简单 |
| SerpAPI | API Key | ❌ 注册即可 | $50/mo+ | ⭐ 简单 |
| Twitter/X | OAuth 2.0 Bearer | ❌ 开发者申请 | Free(Basic)/Paid | ⭐⭐ 中等 |
| LinkedIn (官方) | OAuth 2.0 | ✅ 需企业申请 | Free(有限) | ⭐⭐⭐ 较难 |
| LinkedIn (Proxycurl) | API Key | ❌ 注册即可 | $49/mo+ | ⭐ 简单 |
| Hunter.io | API Key | ❌ 注册即可 | Free/Paid | ⭐ 简单 |
| 飞书 | App ID + Secret | ❌ 后台创建 | Free | ⭐ 简单 |
| AWS SES | Access Key | ❌ IAM 配置 | 按量付费 | ⭐⭐ 中等 |

---

## 1. 新闻类 API（无需登录）

### NewsAPI
- **获取方式**：https://newsapi.org/register → 注册后直接拿 Key
- **免费额度**：100 次/天（开发），生产需付费 $449/mo
- **认证方式**：请求头 `X-Api-Key: your-key`
- **限制**：免费版只返回标题+描述，不返回全文

### SerpAPI（Google News 替代）
- **获取方式**：https://serpapi.com → 注册 → Dashboard → API Key
- **免费额度**：100 次/月
- **认证方式**：URL 参数 `api_key=xxx`
- **优势**：可搜 Google News、Google Scholar、多引擎

### Bing News (Azure)
- **获取方式**：Azure Portal → Cognitive Services → Bing Search → 创建资源 → 获取 Key
- **免费额度**：1000 次/月 (S1 tier)
- **认证方式**：请求头 `Ocp-Apim-Subscription-Key: your-key`

---

## 2. LinkedIn（需要授权）

### 方案 A：LinkedIn 官方 API（推荐用于公司主页数据）

**申请流程**：
1. 登录 https://www.linkedin.com/developers/
2. 创建 App → 关联公司主页 → 获取 Client ID & Secret
3. 申请 Marketing Developer Platform 权限（需人工审核，约 1-2 周）
4. OAuth 2.0 授权流程获取 Access Token

**可获取数据**：
- 公司主页信息（描述、员工数、行业）
- 公司动态帖子
- ❌ 不能获取任意用户 Profile（隐私限制）

**Token 续期**：
```python
# Access Token 有效期 60 天，需自动续期
import requests

def refresh_linkedin_token(client_id, client_secret, refresh_token):
    resp = requests.post("https://www.linkedin.com/oauth/v2/accessToken", data={
        "grant_type": "refresh_token",
        "refresh_token": refresh_token,
        "client_id": client_id,
        "client_secret": client_secret
    })
    return resp.json()["access_token"]
```

### 方案 B：Proxycurl（第三方，推荐用于联系人挖掘）

- **获取方式**：https://proxycurl.com → 注册 → API Key
- **费用**：$49/mo（100 credits），$1/profile lookup
- **能力**：
  - 根据 LinkedIn URL 获取完整 Profile
  - 公司搜索（按行业/地域/规模）
  - 员工列表（按公司）
  - ❌ 不需要 LinkedIn 登录，合规使用公开数据

**示例**：
```python
import requests

headers = {"Authorization": "Bearer YOUR_PROXYCURL_KEY"}

# 获取公司信息
resp = requests.get(
    "https://nubela.co/proxycurl/api/linkedin/company",
    params={"url": "https://www.linkedin.com/company/stripe"},
    headers=headers
)
company = resp.json()

# 搜索公司员工
resp = requests.get(
    "https://nubela.co/proxycurl/api/linkedin/company/employees",
    params={
        "url": "https://www.linkedin.com/company/stripe",
        "role_search": "Head of Payments",
        "page_size": 10
    },
    headers=headers
)
employees = resp.json()
```

### 方案 C：PhantomBuster（浏览器自动化，高风险）

- **获取方式**：https://phantombuster.com → 注册
- **原理**：使用你的 LinkedIn Session Cookie 模拟浏览器操作
- **风险**：⚠️ 可能导致 LinkedIn 账号被限制/封禁
- **建议**：仅作为最后手段，使用专门的 LinkedIn 账号

---

## 3. Twitter / X API

### 申请流程
1. 登录 https://developer.twitter.com/
2. 申请 Developer Account（需说明用途）
3. 创建 Project → App → 获取 Keys & Tokens

### 套餐选择

| Tier | 费用 | 推文读取量 | 适用场景 |
|------|------|-----------|---------|
| Free | $0 | 仅写入 | ❌ 不适用 |
| Basic | $100/mo | 10,000/mo | 小规模测试 |
| Pro | $5,000/mo | 1,000,000/mo | 生产使用 |

**建议**：先用 Basic 验证效果，确认 ROI 后升级 Pro。

### 认证方式
```python
import requests

# Bearer Token (App-only, 只读公开数据)
headers = {"Authorization": "Bearer YOUR_BEARER_TOKEN"}

# 搜索近期推文
resp = requests.get(
    "https://api.twitter.com/2/tweets/search/recent",
    params={
        "query": "cross-border payment -is:retweet lang:en",
        "max_results": 50,
        "tweet.fields": "created_at,author_id,public_metrics"
    },
    headers=headers
)
```

---

## 4. 邮箱查找 & 验证

### Hunter.io
- **获取方式**：https://hunter.io → 注册 → API Key
- **免费额度**：25 次搜索/月 + 50 次验证/月
- **付费**：$49/mo（500 搜索 + 1000 验证）

**能力**：
```python
import requests

# 根据域名查找邮箱模式
resp = requests.get(
    "https://api.hunter.io/v2/domain-search",
    params={"domain": "stripe.com", "api_key": "YOUR_KEY"}
)
# 返回: {pattern: "{first}.{last}@stripe.com", emails: [...]}

# 验证邮箱有效性
resp = requests.get(
    "https://api.hunter.io/v2/email-verifier",
    params={"email": "john.doe@stripe.com", "api_key": "YOUR_KEY"}
)
# 返回: {status: "valid" / "invalid" / "accept_all"}
```

### ZeroBounce（批量验证）
- **获取方式**：https://zerobounce.net → 注册
- **费用**：$0.008/email（批量更便宜）
- **优势**：支持批量上传 CSV 验证

---

## 5. 飞书 / Lark

### 创建自建应用
1. 登录 https://open.feishu.cn/app → 创建应用
2. 获取 App ID + App Secret
3. 配置权限：消息发送、群组管理
4. 发布应用 → 管理员审批

### Webhook Bot（最简方案）
1. 飞书群 → 设置 → 群机器人 → 添加自定义机器人
2. 复制 Webhook URL
3. 直接 POST JSON 即可推送消息

```python
import requests

webhook_url = "https://open.feishu.cn/open-apis/bot/v2/hook/xxxxx"

# 推送文本消息
requests.post(webhook_url, json={
    "msg_type": "interactive",
    "card": {
        "header": {"title": {"content": "🔴 高优商机发现", "tag": "plain_text"}},
        "elements": [{
            "tag": "markdown",
            "content": "**公司**: ABC Bank\n**评分**: 87/100\n**需求**: 跨境支付系统升级"
        }]
    }
})
```

---

## 6. 邮件发送（AWS SES）

### 配置步骤
1. AWS Console → SES → 验证发件域名（添加 DNS 记录）
2. 验证发件邮箱
3. 申请"生产访问"（移出沙箱，否则只能发给已验证邮箱）
4. IAM → 创建 User → 附加 `AmazonSESFullAccess` → 获取 Access Key

### 注意事项
- 新账号有沙箱限制（只能发给已验证地址），需申请解除
- 建议开启 DKIM + SPF + DMARC 提升送达率
- 设置 SNS 通知追踪 Bounce/Complaint

---

## 7. 代理 IP（反爬必备）

### 为什么需要代理
- 高频请求同一网站会被 IP 封禁
- LinkedIn、Twitter 等对 IP 有严格频率限制
- 使用住宅代理模拟真实用户访问

### 推荐服务

| 服务商 | 费用 | IP 类型 | 适用场景 |
|--------|------|---------|---------|
| Bright Data | $10/GB+ | 住宅/数据中心 | 专业级，最稳定 |
| SmartProxy | $7/GB | 住宅 | 性价比高 |
| Oxylabs | $8/GB | 住宅/ISP | 企业级 |

### 配置示例
```python
proxies = {
    "http": "http://user:pass@brd.superproxy.io:22225",
    "https": "http://user:pass@brd.superproxy.io:22225"
}
requests.get("https://target-site.com", proxies=proxies)
```

---

## 安全规范

### 凭证存储原则

```
┌──────────────────────────────────────────────────────┐
│                 凭证安全规范                            │
├──────────────────────────────────────────────────────┤
│ ✅ 所有密钥存 .env 文件或 Vault，绝不硬编码           │
│ ✅ .env 加入 .gitignore，永不入库                    │
│ ✅ 生产环境使用 Secret Manager (AWS/GCP/飞书)        │
│ ✅ API Key 按最小权限原则配置                        │
│ ✅ Token 定期轮换（LinkedIn 60天，其他90天）          │
│ ✅ 敏感操作记录审计日志                              │
│ ❌ 禁止在代码/文档中明文写入真实密钥                  │
│ ❌ 禁止共享个人账号凭证，使用团队/服务账号            │
│ ❌ 禁止将 .env 通过即时通讯工具传输                  │
└──────────────────────────────────────────────────────┘
```

### 推荐的密钥管理方案

| 环境 | 方案 | 说明 |
|------|------|------|
| 本地开发 | `.env` 文件 | 加入 `.gitignore` |
| 测试环境 | 飞书 Vault / AWS SSM Parameter Store | 环境变量注入 |
| 生产环境 | AWS Secrets Manager / HashiCorp Vault | 自动轮换 + 审计 |

---

## 快速启动清单

按优先级获取以下凭证即可启动 MVP（Phase 1: 市场情报）：

### 必须（Day 1）
- [ ] NewsAPI Key — 注册即得
- [ ] DeepSeek / OpenAI API Key — 注册即得
- [ ] 飞书 Webhook URL — 群内添加机器人

### 建议（Week 1）
- [ ] SerpAPI Key — Google News 搜索
- [ ] Twitter Basic Tier — $100/mo
- [ ] Proxycurl API Key — LinkedIn 数据

### Phase 2 需要
- [ ] Hunter.io Key — 邮箱查找验证
- [ ] AWS SES 配置 — 邮件外联
- [ ] Bright Data 代理 — 反爬

### Phase 3 需要
- [ ] CRM API (HubSpot/Salesforce)
- [ ] Calendly API — 会议预约
- [ ] LinkedIn 官方 API（企业申请）

---
*版本: v1.0 | 2026-05-22*
