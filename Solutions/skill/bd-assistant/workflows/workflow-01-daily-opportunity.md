# Workflow 01 — 每日商机发现（Daily Opportunity Discovery）

## 概述

| 属性 | 值 |
|-----|---|
| **触发方式** | 定时触发（Cron: 每日 08:00 UTC） |
| **调用 Skills** | Skill 01 → Skill 02 |
| **执行频率** | 每日 1 次（工作日），每周汇总 1 次 |
| **预计耗时** | 15-30 分钟 |
| **输出** | 商机简报 → 飞书推送 + CRM 线索创建 |

---

## 流程图

```
┌─────────────┐
│  定时触发     │ Cron 08:00 UTC
│  (每日/每周)  │
└──────┬──────┘
       ▼
┌─────────────┐
│ 加载配置     │ 关键词、目标行业、地域、数据源列表
└──────┬──────┘
       ▼
┌─────────────────────────────────┐
│  Skill 01: 市场情报采集          │
│  ├─ 并行抓取各数据源             │
│  ├─ 去重 & 清洗                 │
│  ├─ LLM 摘要生成               │
│  └─ 事件分类 & 初步关联度判断     │
└──────────────┬──────────────────┘
               ▼
         items == 0 ?
        ╱            ╲
      Yes             No
       ▼               ▼
  ┌─────────┐   ┌─────────────────────────────────┐
  │ 记录日志  │   │  Skill 02: 商机评估与评分          │
  │ 无新情报  │   │  ├─ 查询 CRM 历史交互              │
  │ 结束     │   │  ├─ LLM 产品矩阵映射              │
  └─────────┘   │  ├─ 五维加权评分                   │
                │  └─ 生成需求分析 & 跟进建议          │
                └──────────────┬──────────────────────┘
                               ▼
                     ┌─────────────────┐
                     │  按优先级分发      │
                     └────┬───┬───┬────┘
                          │   │   │
                 ┌────────┘   │   └────────┐
                 ▼            ▼            ▼
           🔴 High      🟡 Medium     🟢 Low
                 │            │            │
                 ▼            ▼            ▼
          ┌──────────┐ ┌──────────┐ ┌──────────┐
          │飞书实时推送│ │飞书简报   │ │ 归档存储  │
          │CRM创建线索│ │人工决定   │ │ 周报汇总  │
          │自动创建   │ │是否跟进   │ │          │
          │跟进任务   │ └──────────┘ └──────────┘
          │→Workflow02│
          └──────────┘
```

## 详细步骤

### Step 1: 初始化 & 加载配置

```yaml
action: load_config
source: config_db / env_vars
config:
  keywords:
    zh: ["跨境支付", "数字货币", "支付牌照", "汇款", "Web3支付", "开放银行"]
    en: ["cross-border payment", "digital currency", "payment license", "remittance", "Web3 payment", "open banking"]
  target_industries: ["银行", "支付公司", "电商平台", "加密货币交易所", "汇款公司"]
  regions: ["Southeast Asia", "Middle East", "Africa", "Latin America", "Europe"]
  data_sources: ["google_news", "newsapi", "finextra", "coindesk", "linkedin", "twitter"]
  time_range: "last_24h"  # 每日模式
  max_results: 50
```

### Step 2: 执行 Skill 01 — 市场情报采集

```yaml
action: invoke_skill
skill: skill-01-market-intelligence
input:
  keywords: ${config.keywords}
  target_industries: ${config.target_industries}
  regions: ${config.regions}
  time_range: ${config.time_range}
  max_results: ${config.max_results}
output: intelligence_items
timeout: 15min
retry: 2
on_error: log_error + notify_admin + continue_with_partial
```

### Step 3: 空结果判断

```yaml
action: condition
if: intelligence_items.total_items == 0
then:
  - action: log
    message: "本日无新情报"
  - action: notify_feishu
    channel: "#bd-assistant-log"
    message: "📋 每日商机扫描完成，今日未发现新动态"
  - action: end
else: continue
```

### Step 4: 执行 Skill 02 — 商机评估与评分

```yaml
action: invoke_skill
skill: skill-02-opportunity-scoring
input:
  intelligence_items: ${intelligence_items.items}
  ex_product_catalog: ${load_from_db("ex_products")}
  scoring_weights:
    company_scale: 0.20
    event_urgency: 0.25
    product_relevance: 0.30
    region_priority: 0.15
    historical_interaction: 0.10
output: opportunity_report
timeout: 10min
retry: 1
```

### Step 5: 按优先级分发

```yaml
action: parallel_dispatch

# 🔴 High Priority
- condition: opportunity.priority == "high"
  actions:
    - action: push_feishu
      channel: "#bd-high-priority"
      template: "high_priority_alert"
      content: |
        🔴 高优先级商机
        公司：${opportunity.company_name}
        评分：${opportunity.total_score}/100
        需求：${opportunity.demand_analysis}
        建议：${opportunity.suggested_approach}
        匹配产品：${opportunity.matched_products}
      mention: ["@bd-lead", "@sales-lead"]
    
    - action: create_crm_lead
      data:
        company: ${opportunity.company_name}
        source: "AI Market Intelligence"
        priority: "high"
        score: ${opportunity.total_score}
        notes: ${opportunity.demand_analysis}
        linked_intelligence_id: ${opportunity.intelligence_id}
    
    - action: create_task
      assignee: auto_assign_by_region(${opportunity.region})
      title: "跟进高优商机: ${opportunity.company_name}"
      due_date: today + 2d
      description: ${opportunity.suggested_approach}
    
    - action: enqueue_workflow
      workflow: workflow-02-lead-outreach
      input:
        opportunities: [${opportunity}]

# 🟡 Medium Priority
- condition: opportunity.priority == "medium"
  actions:
    - action: collect_for_daily_report
      target: medium_list

# 🟢 Low Priority
- condition: opportunity.priority == "low"
  actions:
    - action: archive
      storage: opportunity_archive
      retention: 90d
```

### Step 6: 生成并推送每日简报

```yaml
action: generate_report
template: daily_opportunity_briefing
data:
  date: ${today}
  high_count: ${opportunity_report.summary_stats.high_priority}
  medium_count: ${opportunity_report.summary_stats.medium_priority}
  low_count: ${opportunity_report.summary_stats.low_priority}
  total: ${opportunity_report.total_opportunities}
  high_list: ${filter(opportunities, priority="high")}
  medium_list: ${filter(opportunities, priority="medium")}

push_to:
  - channel: feishu
    group: "#bd-daily-briefing"
    time: "09:00 UTC+8"
  - channel: email
    recipients: ["bd-team@company.com"]
    subject: "📊 FIBD 每日商机简报 - ${today}"
```

### Step 7: 记录执行日志

```yaml
action: log_execution
data:
  workflow: "workflow-01-daily-opportunity"
  execution_time: ${elapsed_time}
  items_collected: ${intelligence_items.total_items}
  opportunities_scored: ${opportunity_report.total_opportunities}
  high_priority_count: ${opportunity_report.summary_stats.high_priority}
  errors: ${errors_if_any}
```

---

## 每周汇总模式

每周一额外触发一次汇总任务：

```yaml
trigger: cron("0 9 * * MON")
action: generate_weekly_summary
data:
  period: "last_7d"
  all_daily_reports: ${load_reports(last_7_days)}
  metrics:
    - total_items_collected
    - total_high_priority
    - conversion_rate (high → contacted)
    - new_crm_leads_created
push_to:
  - channel: feishu
    group: "#bd-weekly-review"
  - channel: email
    recipients: ["fibd-leadership@company.com"]
```

## 异常处理

| 异常场景 | 处理策略 |
|---------|---------|
| 数据源 API 不可用 | 跳过该源，继续采集其他源，日志告警 |
| LLM 调用超时 | 重试 2 次，失败后降级为关键词匹配 |
| CRM 不可达 | 商机暂存本地队列，下次执行时补推 |
| 飞书推送失败 | 重试 3 次 + 备用邮件通知 |
| 情报去重失败 | 宁可多报不漏报，人工去重 |

## 监控指标

| 指标 | 目标值 | 告警阈值 |
|------|-------|---------|
| 每日采集条目数 | ≥ 20 | < 5 |
| Skill 01 执行成功率 | ≥ 98% | < 90% |
| Skill 02 执行成功率 | ≥ 99% | < 95% |
| 端到端耗时 | ≤ 30 min | > 45 min |
| High 商机 CRM 创建成功率 | 100% | < 100% |

---
*版本: v1.0 | 2026-05-22*
