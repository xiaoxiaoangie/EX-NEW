# Skill 04 — 渠道智能匹配（Channel Intelligent Matching）

## 归属助手
渠道助手

## 功能定位
维护结构化渠道合作伙伴数据库，响应内部部门的渠道需求，基于多维度匹配算法推荐最优渠道组合，并为每个推荐渠道生成首次联络方案包。是渠道合作伙伴生态的**智能管家**。

---

## Input Schema

### 输入类型 A：渠道需求查询

```json
{
  "type": "object",
  "properties": {
    "request_type": { "type": "string", "const": "channel_query" },
    "requester": {
      "type": "object",
      "properties": {
        "name": { "type": "string" },
        "department": { "type": "string" },
        "role": { "type": "string" }
      }
    },
    "requirement": {
      "type": "object",
      "properties": {
        "description": { "type": "string", "description": "自然语言需求描述" },
        "capabilities_needed": {
          "type": "array",
          "description": "所需核心能力标签",
          "items": {
            "type": "string",
            "enum": [
              "acquiring", "remittance", "card_issuing", "fx_exchange",
              "local_payment", "crypto_payment", "compliance_kyc",
              "banking_as_service", "virtual_account", "cross_border_settlement",
              "mobile_money", "e_wallet", "open_banking"
            ]
          }
        },
        "target_regions": { "type": "array", "items": { "type": "string" } },
        "license_required": { "type": "boolean", "default": false },
        "budget_range": { "type": "string", "description": "预算范围（可选）" },
        "urgency": { "type": "string", "enum": ["urgent", "normal", "low"] },
        "max_recommendations": { "type": "integer", "default": 5 }
      }
    }
  },
  "required": ["request_type", "requirement"]
}
```

### 输入类型 B：渠道数据维护

```json
{
  "type": "object",
  "properties": {
    "request_type": { "type": "string", "const": "channel_update" },
    "action": { "type": "string", "enum": ["create", "update", "deactivate"] },
    "channel_data": {
      "type": "object",
      "properties": {
        "channel_id": { "type": "string" },
        "company_name": { "type": "string" },
        "capabilities": { "type": "array", "items": { "type": "string" } },
        "regions": { "type": "array", "items": { "type": "string" } },
        "contacts": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": { "type": "string" },
              "title": { "type": "string" },
              "email": { "type": "string" },
              "phone": { "type": "string" },
              "preferred_language": { "type": "string" }
            }
          }
        },
        "cooperation_status": { "type": "string", "enum": ["negotiating", "signed", "active", "dormant", "terminated"] },
        "contract_summary": { "type": "string" },
        "historical_rating": { "type": "number", "description": "1-5 星评分" },
        "notes": { "type": "string" }
      }
    }
  },
  "required": ["request_type", "action"]
}
```

## Output Schema

### 输出 A：渠道匹配报告

```json
{
  "type": "object",
  "properties": {
    "report_id": { "type": "string" },
    "generated_at": { "type": "string", "format": "date-time" },
    "requirement_summary": { "type": "string" },
    "total_matches": { "type": "integer" },
    "recommendations": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "rank": { "type": "integer" },
          "channel_id": { "type": "string" },
          "company_name": { "type": "string" },
          "match_score": { "type": "number", "description": "0-100 匹配度" },
          "match_reasons": { "type": "array", "items": { "type": "string" } },
          "capability_coverage": { "type": "number", "description": "需求能力覆盖率 %" },
          "region_coverage": { "type": "number", "description": "需求地域覆盖率 %" },
          "cooperation_status": { "type": "string" },
          "historical_rating": { "type": "number" },
          "risk_notes": { "type": "string", "description": "注意事项/风险提示" },
          "contact_package": {
            "type": "object",
            "description": "首次联络方案包",
            "properties": {
              "primary_contact": {
                "type": "object",
                "properties": {
                  "name": { "type": "string" },
                  "title": { "type": "string" },
                  "email": { "type": "string" }
                }
              },
              "communication_outline": { "type": "string", "description": "沟通提纲" },
              "value_proposition": { "type": "string", "description": "我方可提供的价值主张" },
              "icebreaker_suggestion": { "type": "string", "description": "破冰点建议" },
              "reference_materials": { "type": "array", "items": { "type": "string" }, "description": "推荐附上的业务资料" }
            }
          }
        }
      }
    },
    "capability_comparison_matrix": {
      "type": "array",
      "description": "推荐渠道能力对比矩阵",
      "items": {
        "type": "object",
        "properties": {
          "company_name": { "type": "string" },
          "capabilities": { "type": "object", "description": "各能力项 true/false" }
        }
      }
    }
  }
}
```

---

## 渠道数据库 Schema

| 字段 | 类型 | 更新频率 | 说明 |
|------|------|---------|------|
| channel_id | UUID | 一次性 | 唯一标识 |
| company_name | Text | 一次性 | 渠道公司全称 |
| company_name_alias | Text[] | 按需 | 别名/简称 |
| capabilities | Tag[] | 每季度复审 | 核心能力标签 |
| regions | Tag[] | 业务变更时 | 覆盖国家/地区 |
| licenses | Text[] | 牌照变更时 | 持有牌照列表 |
| contacts | Object[] | 变更时 | 关键联系人（姓名/职位/联系方式/偏好语言） |
| cooperation_status | Enum | 状态变更时 | negotiating/signed/active/dormant/terminated |
| contract_summary | Text | 每次谈判/续约后 | 最新报价/合同关键信息 |
| historical_rating | Float | 项目结束后 | 1-5 星评分 |
| historical_reviews | Text[] | 项目结束后 | 合作评价记录 |
| company_size | Enum | 年度更新 | small/medium/large/enterprise |
| founded_year | Integer | 一次性 | 成立年份 |
| website | URL | — | 公司官网 |
| tags | Text[] | 按需 | 自定义标签 |
| created_at | Timestamp | — | 录入时间 |
| updated_at | Timestamp | — | 最近更新时间 |
| updated_by | Text | — | 最近更新人 |

## 匹配算法

### 四维匹配模型

```
总匹配分 = W1 × 能力覆盖率 + W2 × 地域覆盖率 + W3 × 合作状态分 + W4 × 历史评分

默认权重：
  W1 = 0.40  (能力匹配最重要)
  W2 = 0.25  (地域覆盖)
  W3 = 0.20  (已有合作关系优先)
  W4 = 0.15  (历史合作质量)
```

| 维度 | 计算方式 |
|------|---------|
| 能力覆盖率 | 交集(需求能力, 渠道能力) / 需求能力总数 × 100 |
| 地域覆盖率 | 交集(目标地域, 渠道覆盖地域) / 目标地域总数 × 100 |
| 合作状态分 | active=100, signed=80, negotiating=60, dormant=30, terminated=0 |
| 历史评分 | (rating / 5) × 100 |

### 额外规则

- **牌照硬过滤**：若 `license_required=true`，无相关牌照的渠道直接排除
- **Dormant 渠道**：匹配分 > 80 时仍推荐，但标注"需重新激活"
- **Terminated 渠道**：默认排除，除非无其他匹配

## 联络方案生成 Prompt

```
你是 FIBD 部门的渠道管理专家。请基于以下信息生成首次联络方案：

## 内部需求
{requirement_description}

## 推荐渠道
- 公司：{company_name}
- 核心能力：{capabilities}
- 覆盖地域：{regions}
- 当前合作状态：{cooperation_status}
- 历史评价：{historical_rating} 星

## 联系人
{contact_name}，{contact_title}

请输出：
1. 沟通提纲（3-5 个要点）：
2. 我方可提供的价值主张（结合本次需求）：
3. 破冰点建议（基于该渠道背景或近期动态）：
4. 注意事项/风险提示：
5. 建议附上的业务资料：
```

## 集成点

| 系统 | 集成方式 | 动作 |
|-----|---------|------|
| 内部工作台 | 标准化表单 | 渠道需求提交入口 |
| PostgreSQL | 直连 | 渠道数据库 CRUD |
| CRM | REST API | 同步渠道合作状态 |
| 合同/财务系统 | 只读 API | 读取合同状态与关键条款 |
| 销售助手 (Skill 03) | 内部事件 | 联络方案包 → 外联执行 |
| 飞书 | Webhook | 匹配报告推送至需求方 |

---
*版本: v1.0 | 2026-05-22*
