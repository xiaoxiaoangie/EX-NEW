# Skill 02 — 商机评估与评分（Opportunity Scoring & Prioritization）

## 归属助手
市场助手

## 功能定位
接收 Skill 01 输出的结构化情报条目，结合 EX 产品矩阵和历史数据，对每条商机进行多维度量化评分和优先级排序，生成可直接交付业务团队的**商机简报**。

---

## Input Schema

```json
{
  "type": "object",
  "properties": {
    "intelligence_items": {
      "type": "array",
      "description": "Skill 01 输出的情报条目列表",
      "items": { "$ref": "#/definitions/IntelligenceItem" }
    },
    "ex_product_catalog": {
      "type": "array",
      "description": "EX 当前产品/服务目录（用于需求映射）",
      "items": {
        "type": "object",
        "properties": {
          "product_id": { "type": "string" },
          "product_name": { "type": "string" },
          "category": { "type": "string" },
          "target_industries": { "type": "array", "items": { "type": "string" } },
          "regions_available": { "type": "array", "items": { "type": "string" } }
        }
      }
    },
    "scoring_weights": {
      "type": "object",
      "description": "评分权重（可调）",
      "properties": {
        "company_scale": { "type": "number", "default": 0.2 },
        "event_urgency": { "type": "number", "default": 0.25 },
        "product_relevance": { "type": "number", "default": 0.3 },
        "region_priority": { "type": "number", "default": 0.15 },
        "historical_interaction": { "type": "number", "default": 0.1 }
      }
    }
  },
  "required": ["intelligence_items"]
}
```

## Output Schema

```json
{
  "type": "object",
  "properties": {
    "report_id": { "type": "string" },
    "generated_at": { "type": "string", "format": "date-time" },
    "report_type": { "type": "string", "enum": ["daily", "weekly"] },
    "total_opportunities": { "type": "integer" },
    "summary_stats": {
      "type": "object",
      "properties": {
        "high_priority": { "type": "integer" },
        "medium_priority": { "type": "integer" },
        "low_priority": { "type": "integer" }
      }
    },
    "opportunities": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "opportunity_id": { "type": "string" },
          "intelligence_id": { "type": "string", "description": "关联 Skill 01 条目 ID" },
          "company_name": { "type": "string" },
          "priority": { "type": "string", "enum": ["high", "medium", "low"] },
          "total_score": { "type": "number", "description": "0-100 综合评分" },
          "score_breakdown": {
            "type": "object",
            "properties": {
              "company_scale": { "type": "number" },
              "event_urgency": { "type": "number" },
              "product_relevance": { "type": "number" },
              "region_priority": { "type": "number" },
              "historical_interaction": { "type": "number" }
            }
          },
          "matched_products": {
            "type": "array",
            "description": "匹配的 EX 产品/服务",
            "items": {
              "type": "object",
              "properties": {
                "product_name": { "type": "string" },
                "match_reason": { "type": "string" }
              }
            }
          },
          "demand_analysis": { "type": "string", "description": "潜在需求分析（LLM 生成）" },
          "suggested_approach": { "type": "string", "description": "建议跟进方向" },
          "priority_reason": { "type": "string", "description": "优先级判定理由" }
        }
      }
    }
  }
}
```

---

## 评分模型

### 五维评分体系

| 维度 | 权重 | 评分逻辑 | 数据来源 |
|------|------|---------|---------|
| **机构规模** | 20% | 上市=90, 大型私企=70, 中型=50, 初创=30 | Crunchbase / LinkedIn员工数 |
| **事件紧急度** | 25% | 立即需求(新市场/新牌照)=90, 规划中=60, 一般动态=30 | Skill 01 事件标签 |
| **产品相关性** | 30% | 精准匹配=90, 部分匹配=60, 间接相关=30 | LLM 产品矩阵映射 |
| **地域优先级** | 15% | FIBD 重点区域=90, 次要区域=60, 其他=30 | 预设地域优先级表 |
| **历史交互** | 10% | 已有合作=90, 有过接触=60, 全新=40 | CRM 查询 |

### 优先级阈值

| 评分范围 | 优先级 | 后续动作 |
|---------|--------|---------|
| 75–100 | 🔴 High | 自动创建 CRM 线索 + 推送飞书 + 进入 Workflow 02 外联 |
| 50–74 | 🟡 Medium | 推送飞书简报 + 人工决定是否跟进 |
| 0–49 | 🟢 Low | 归档存储，周报汇总展示 |

## 核心处理逻辑

```
1. 接收 Skill 01 情报列表
2. 对每条情报：
   a. 查询 CRM 历史交互记录
   b. 调用 LLM 进行产品矩阵映射
   c. 查询机构规模数据（缓存 / API）
   d. 按地域优先级表打分
   e. 根据事件标签判断紧急度
   f. 加权计算总分
3. 按总分降序排列
4. LLM 为 High/Medium 商机生成「需求分析」和「跟进建议」
5. 生成结构化商机简报
6. 按优先级触发后续动作
```

## LLM Prompt 模板

```
你是 FIBD 部门的商机分析专家。请基于以下信息评估合作可能性：

## 目标公司
{company_name}

## 动态摘要
{summary_zh}

## 事件类型
{detected_events}

## EX 可匹配的产品/服务
{ex_product_catalog}

请输出：
1. 匹配的 EX 产品（列出产品名 + 匹配理由）：
2. 潜在需求分析（≤150字）：
3. 建议跟进方向（具体的业务切入点）：
4. 产品相关性评分（0-100）：
```

## 集成点

| 系统 | 集成方式 | 动作 |
|-----|---------|------|
| 飞书群 | Webhook | High 商机实时推送，Daily 简报定时推送 |
| CRM | REST API | High 商机自动创建销售线索 |
| 任务管理 | REST API | High 商机自动创建跟进任务并分配责任人 |
| Workflow 02 | 内部事件 | High 商机列表作为外联任务输入 |

---
*版本: v1.0 | 2026-05-22*
