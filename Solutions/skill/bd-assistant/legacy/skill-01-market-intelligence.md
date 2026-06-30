# Skill 01 — 市场情报采集（Market Intelligence Collection）

## 归属助手
市场助手

## 功能定位
从公开渠道自动采集全球目标机构客户的动态信息，经过 NLP 处理后输出结构化情报条目。这是整个 BD 智能体系的**信息源头**。

---

## Input Schema

```json
{
  "type": "object",
  "properties": {
    "target_industries": {
      "type": "array",
      "description": "目标行业列表",
      "items": { "type": "string" },
      "default": ["银行", "支付公司", "电商平台", "加密货币交易所", "汇款公司"]
    },
    "keywords": {
      "type": "array",
      "description": "监控关键词（多语言）",
      "items": { "type": "string" },
      "example": ["cross-border payment", "跨境支付", "Web3 payment", "license application", "market expansion"]
    },
    "time_range": {
      "type": "string",
      "description": "采集时间范围",
      "enum": ["last_24h", "last_7d", "last_30d"],
      "default": "last_24h"
    },
    "regions": {
      "type": "array",
      "description": "目标地域",
      "items": { "type": "string" },
      "example": ["Southeast Asia", "Middle East", "Africa", "Latin America"]
    },
    "max_results": {
      "type": "integer",
      "description": "最大返回条目数",
      "default": 50
    }
  },
  "required": ["keywords"]
}
```

## Output Schema

```json
{
  "type": "object",
  "properties": {
    "collection_time": { "type": "string", "format": "date-time" },
    "total_items": { "type": "integer" },
    "items": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "id": { "type": "string", "description": "情报条目唯一 ID" },
          "company_name": { "type": "string", "description": "目标机构全称" },
          "source_url": { "type": "string", "description": "原始信息来源链接" },
          "source_type": {
            "type": "string",
            "enum": ["news", "company_website", "linkedin", "twitter", "forum", "financial_report"]
          },
          "language": { "type": "string", "description": "原始语言 (zh/en/etc)" },
          "published_at": { "type": "string", "format": "date-time" },
          "title": { "type": "string", "description": "标题/摘要（原文）" },
          "summary_zh": { "type": "string", "description": "中文摘要（LLM 生成）" },
          "summary_en": { "type": "string", "description": "英文摘要（LLM 生成）" },
          "detected_events": {
            "type": "array",
            "description": "识别的业务事件标签",
            "items": {
              "type": "string",
              "enum": [
                "market_expansion",
                "product_launch",
                "license_acquired",
                "partnership_announced",
                "funding_round",
                "tech_upgrade",
                "leadership_change",
                "regulatory_update",
                "acquisition",
                "other"
              ]
            }
          },
          "relevance_to_ex": {
            "type": "string",
            "description": "与 EX 产品/服务的关联度初判",
            "enum": ["high", "medium", "low"]
          },
          "raw_text_snippet": { "type": "string", "description": "关键段落原文（≤500字）" }
        }
      }
    }
  }
}
```

---

## 数据来源（公开合法渠道）

| 来源类别 | 具体渠道 | 采集方式 |
|---------|---------|---------|
| 新闻聚合 | Google News API, NewsAPI, Bing News | REST API |
| 行业资讯 | Finextra, PaymentsJournal, CoinDesk | RSS + Web Scraping |
| 公司官网 | 目标公司 IR/Press Release 页面 | 定向爬虫 |
| LinkedIn | 公司主页 + 高管动态 | LinkedIn API / 页面解析 |
| Twitter(X) | 公司官方账号 + 行业 hashtag | X API v2 |
| 专业论坛 | Reddit r/fintech, Hacker News | API + 爬虫 |

## 核心处理逻辑

```
1. 定时触发（cron: 每日 08:00 UTC）
2. 并行采集各数据源
3. 去重（基于 URL + 标题相似度 > 0.85）
4. LLM 摘要生成（多语言→统一中英文摘要）
5. 事件分类（prompt: 将动态映射到预定义事件标签）
6. 初步关联度判断（prompt: 基于 EX 产品矩阵判断）
7. 输出结构化情报列表 → 传入 Skill 02 评分
```

## LLM Prompt 模板（核心）

```
你是 FIBD 部门的市场情报分析师。请分析以下新闻/动态：

---
{raw_text}
---

请输出：
1. 公司名称：
2. 中文摘要（≤100字）：
3. 英文摘要（≤100字）：
4. 业务事件类型（从以下选择）：market_expansion / product_launch / license_acquired / partnership_announced / funding_round / tech_upgrade / leadership_change / regulatory_update / acquisition / other
5. 与 EX 跨境支付/Web3 业务的关联度（high/medium/low）：
6. 关联度理由（一句话）：
```

## 约束与合规

- **严格遵守** 各平台 API 调用频率限制（Rate Limit）
- **不采集** 非公开信息（如需登录才能查看的内容）
- 爬虫需设置合理的 User-Agent 和请求间隔
- 采集数据保留期限：90 天（过期自动清理）
- LinkedIn/Twitter 数据仅用于商业情报分析，不做用户画像

---
*版本: v1.0 | 2026-05-22*
