# Skill 03 — 销售外联执行（Sales Outreach Execution）

## 归属助手
销售助手

## 功能定位
接收商机列表，自动化完成关键联系人挖掘、个性化外联消息生成、多渠道发送执行、回复处理与状态追踪的全流程。是从"商机"到"初步接触"的**执行引擎**。

---

## Input Schema

```json
{
  "type": "object",
  "properties": {
    "opportunities": {
      "type": "array",
      "description": "来自 Skill 02 的商机列表",
      "items": {
        "type": "object",
        "properties": {
          "opportunity_id": { "type": "string" },
          "company_name": { "type": "string" },
          "demand_analysis": { "type": "string" },
          "matched_products": { "type": "array", "items": { "type": "object" } },
          "suggested_approach": { "type": "string" }
        }
      }
    },
    "outreach_config": {
      "type": "object",
      "properties": {
        "channels": {
          "type": "array",
          "items": { "type": "string", "enum": ["email", "linkedin_inmail", "linkedin_connection"] },
          "default": ["email", "linkedin_inmail"]
        },
        "max_contacts_per_company": { "type": "integer", "default": 3 },
        "target_roles": {
          "type": "array",
          "description": "目标联系人职位关键词",
          "items": { "type": "string" },
          "default": ["CEO", "CTO", "VP of Payments", "Head of BD", "Product Director", "COO"]
        },
        "follow_up_strategy": {
          "type": "string",
          "enum": ["aggressive", "moderate", "conservative"],
          "default": "moderate"
        }
      }
    }
  },
  "required": ["opportunities"]
}
```

## Output Schema

```json
{
  "type": "object",
  "properties": {
    "execution_id": { "type": "string" },
    "executed_at": { "type": "string", "format": "date-time" },
    "total_companies": { "type": "integer" },
    "total_contacts_found": { "type": "integer" },
    "total_messages_sent": { "type": "integer" },
    "outreach_details": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "opportunity_id": { "type": "string" },
          "company_name": { "type": "string" },
          "contacts": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "contact_id": { "type": "string" },
                "name": { "type": "string" },
                "title": { "type": "string" },
                "email": { "type": "string" },
                "linkedin_url": { "type": "string" },
                "email_verified": { "type": "boolean" },
                "source": { "type": "string", "enum": ["linkedin", "company_website", "conference_directory", "public_record"] }
              }
            }
          },
          "messages_sent": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "message_id": { "type": "string" },
                "contact_id": { "type": "string" },
                "channel": { "type": "string" },
                "subject": { "type": "string" },
                "sent_at": { "type": "string", "format": "date-time" },
                "status": {
                  "type": "string",
                  "enum": ["sent", "delivered", "opened", "replied", "bounced", "unsubscribed", "no_response"]
                },
                "template_used": { "type": "string" },
                "personalization_score": { "type": "number", "description": "个性化程度 0-100" }
              }
            }
          }
        }
      }
    },
    "interaction_log": {
      "type": "array",
      "description": "自动化应答日志",
      "items": {
        "type": "object",
        "properties": {
          "contact_id": { "type": "string" },
          "reply_content_summary": { "type": "string" },
          "auto_response_sent": { "type": "boolean" },
          "escalated_to_human": { "type": "boolean" },
          "reply_category": {
            "type": "string",
            "enum": ["interested", "request_info", "schedule_meeting", "not_interested", "out_of_office", "unsubscribe", "other"]
          }
        }
      }
    }
  }
}
```

---

## 核心处理逻辑

### 阶段一：联系人挖掘

```
1. 根据 company_name 搜索 LinkedIn 公司主页
2. 按 target_roles 筛选关键决策者（最多 N 人/公司）
3. 交叉验证：公司官网 Team 页面 / 行业会议名录
4. 邮箱猜测 + 验证（常见格式：first.last@domain）
5. 去重：检查 CRM 是否已有该联系人记录
6. 输出结构化联系人列表
```

### 阶段二：个性化消息生成

```
1. 读取商机分析（demand_analysis + matched_products）
2. 读取联系人信息（职位、背景）
3. 从模板库选取最佳匹配模板
4. 调用 LLM 生成个性化内容
5. 合规校验（含退订链接、无虚假声明、无过度承诺）
6. 人工审核队列（可选，High 商机默认开启）
```

### 阶段三：发送与追踪

```
1. 按发送节奏规则排入队列
2. 分渠道发送（Email via SMTP/SES, LinkedIn via API）
3. 实时追踪：送达 → 打开 → 回复
4. 回复自动分类（LLM判断意图）
5. 自动应答或升级至人工
6. 状态同步至 CRM
```

## 消息模板体系

### 模板分类

| 模板类型 | 触发场景 | 示例 |
|---------|---------|------|
| **首次触达** | 新商机首次联络 | "我们注意到贵司近期在XX领域的动态…" |
| **Follow-up #1** | 首次无回复 3 天后 | "想确认您是否收到我之前的消息…" |
| **Follow-up #2** | Follow-up #1 无回复 5 天后 | "附上一个可能对您有帮助的案例…" |
| **资料回复** | 客户回复"发资料" | 自动附产品手册 + 一句话亮点 |
| **会议邀请** | 客户回复"有兴趣" | 附 Calendly 链接预约时间 |
| **退出确认** | 客户要求停止联系 | 确认退订 + 礼貌告别 |

### LLM Prompt 模板（首次触达）

```
你是 FIBD 的商务拓展专家，正在撰写一封外联邮件。

## 背景信息
- 目标公司：{company_name}
- 联系人：{contact_name}，职位：{contact_title}
- 近期动态：{summary_zh}
- 潜在需求：{demand_analysis}
- 推荐产品：{matched_products}

## 要求
1. 邮件主题行：简短、引人注目、不像垃圾邮件
2. 正文：≤150 字，开头引用对方近期动态（建立关联），中间简述我司相关能力，结尾提出具体的下一步（如15分钟通话）
3. 语气：专业但不生硬，平等交流
4. 语言：英文（除非目标公司是中文环境）
5. 必须包含退订声明

请输出：
Subject: 
Body:
```

## 发送节奏规则

| 规则 | 值 | 说明 |
|-----|---|------|
| 同一联系人最大触达次数 | 3 | 首次 + 2次 follow-up |
| 首次到 Follow-up #1 间隔 | 3 天 | — |
| Follow-up #1 到 #2 间隔 | 5 天 | — |
| 同一公司每日最大触达人数 | 2 | 避免被标记 |
| 每日总发送上限 | 50 封 | 维护发件信誉 |
| LinkedIn InMail 每日上限 | 20 | 平台限制 |
| 黑名单自动退出 | 即时 | unsubscribe 后永不再触达 |

## 合规设计（生命线）

```
┌──────────────────────────────────────────┐
│              合规校验清单                   │
├──────────────────────────────────────────┤
│ ✅ 联系方式来源 = 公开渠道                  │
│ ✅ 首次消息含退订选项                       │
│ ✅ 退订请求 24h 内执行                      │
│ ✅ 不向同一人发送 > 3 次                    │
│ ✅ 支持 GDPR 数据删除请求                   │
│ ✅ 所有外联操作可审计追溯                    │
│ ✅ LinkedIn 操作频率 < 平台限制              │
│ ✅ 邮件内容无虚假声明/过度承诺               │
│ ❌ 违反任一条 → 阻断发送 + 告警             │
└──────────────────────────────────────────┘
```

## 集成点

| 系统 | 集成方式 | 动作 |
|-----|---------|------|
| CRM | REST API | 创建/更新联系人、同步沟通记录 |
| Email (SES/SMTP) | SDK | 发送邮件、追踪打开/点击 |
| LinkedIn | API / Browser Automation | InMail、连接请求 |
| 飞书 | Webhook | 回复告警推送（interested/schedule_meeting） |
| Calendly | API | 自动生成会议预约链接 |

---
*版本: v1.0 | 2026-05-22*
