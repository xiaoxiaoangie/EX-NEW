# Workflow 04 — 全链路 BD 管线（Full BD Pipeline）

## 概述

| 属性                  | 值                                                   |
| --------------------- | ---------------------------------------------------- |
| **触发方式**    | 自动（由 Workflow 01 驱动）或人工触发全链路          |
| **调用 Skills** | Skill 01 → Skill 02 → Skill 03 → Skill 04（按需） |
| **编排角色**    | "boss"（FIBD 专属 AI 助理 / 中央调度器）             |
| **周期**        | 持续运行，按商机生命周期推进                         |
| **输出**        | 统一工作看板 + 阶段性报告                            |

---

## 全链路概览

```
                        "BOSS" 中央调度
                    ┌──────────────────┐
                    │   任务分发         │
                    │   状态监控         │
                    │   看板汇总         │
                    │   异常升级         │
                    └────┬────┬────┬───┘
                         │    │    │
              ┌──────────┘    │    └──────────┐
              ▼               ▼               ▼
    ┌─────────────┐  ┌──────────────┐  ┌─────────────┐
    │  市场助手     │  │  销售助手      │  │  渠道助手    │
    │  Skill 1+2  │  │  Skill 3     │  │  Skill 4    │
    │             │  │              │  │             │
    │  Workflow 01│→→│ Workflow 02  │  │ Workflow 03 │
    │  每日商机    │  │  外联转化     │  │  渠道匹配   │
    └──────┬──────┘  └──────┬──────┘  └──────┬──────┘
           │                │                │
           ▼                ▼                ▼
    ┌──────────────────────────────────────────────┐
    │              统一数据层 (CRM + DB)              │
    │  商机库 │ 联系人库 │ 外联记录 │ 渠道库 │ 看板    │
    └──────────────────────────────────────────────┘
```

## 商机生命周期状态机

```
                    ┌────────────────────────────────────────┐
                    │          商机生命周期状态机                │
                    ├────────────────────────────────────────┤
                    │                                        │
                    │  [discovered] ──→ [scored]              │
                    │       │              │                  │
                    │       │         ┌────┴────┐            │
                    │       │         ▼         ▼            │
                    │       │     [high]    [medium/low]     │
                    │       │         │         │            │
                    │       │         ▼         ▼            │
                    │       │   [contacting]  [archived]     │
                    │       │         │                      │
                    │       │    ┌────┴────┐                 │
                    │       │    ▼         ▼                 │
                    │       │ [replied] [no_response]        │
                    │       │    │         │                 │
                    │       │    │    ┌────┴────┐            │
                    │       │    │    ▼         ▼            │
                    │       │    │ [follow_up] [dormant]     │
                    │       │    │                           │
                    │       │    ▼                           │
                    │       │ [interested]                   │
                    │       │    │                           │
                    │       │    ▼                           │
                    │       │ [meeting_scheduled]            │
                    │       │    │                           │
                    │       │    ▼                           │
                    │       │ [proposal_sent]                │
                    │       │    │                           │
                    │       │ ┌──┴──┐                        │
                    │       │ ▼     ▼                        │
                    │       │[won] [lost]                    │
                    │       │                                │
                    └───────┴────────────────────────────────┘
```

## "boss"" 调度逻辑

### 核心职责

```yaml
scheduler:
  name: "boss
"
  role: "FIBD 专属 AI 助理 / 中央调度器"
  
  responsibilities:
    1_task_dispatch:
      description: "向三个助手分发任务"
      rules:
        - 每日 08:00 UTC 自动触发 Workflow 01
        - Workflow 01 输出 High 商机 → 自动触发 Workflow 02
        - 内部表单提交 → 自动触发 Workflow 03
        - 人工指定 → 按需触发任意 Workflow
  
    2_status_monitor:
      description: "监控各助手执行状态"
      check_interval: 30min
      monitors:
        - workflow_01_execution_status
        - workflow_02_outreach_progress
        - workflow_03_pending_requests
        - sla_compliance
        - error_rates
  
    3_dashboard:
      description: "汇总并呈现整体工作看板"
      refresh: real_time
      views:
        - pipeline_overview
        - daily_summary
        - weekly_trend
        - team_performance
  
    4_coordination:
      description: "确保数据流与工作流协同一致"
      rules:
        - 商机ID 全链路唯一，可追溯
        - CRM 状态自动同步
        - 避免重复触达（跨 Workflow 去重）
        - 异常自动升级
```

### 智能决策节点

```yaml
decision_points:

  # 决策 1: 商机路由
  opportunity_routing:
    input: scored_opportunity
    rules:
      - if: score >= 75 AND has_existing_channel_partner
        then: skip_outreach → direct_to_channel_manager
        reason: "已有渠道合作关系，无需冷启动外联"
    
      - if: score >= 75 AND no_channel_partner
        then: trigger_workflow_02
        reason: "高分商机，启动外联流程"
    
      - if: score >= 50 AND score < 75
        then: queue_for_human_review
        reason: "中等分数，人工决定是否跟进"
    
      - if: score < 50
        then: archive
        reason: "低分商机，归档"

  # 决策 2: 外联升级
  outreach_escalation:
    input: outreach_status
    rules:
      - if: reply_category == "interested" AND company_in_channel_db
        then: trigger_workflow_03(mode="existing_channel_activation")
        reason: "已有渠道关系，激活渠道经理协同"
    
      - if: reply_category == "interested" AND company_not_in_channel_db
        then: assign_to_sales_team
        reason: "新客户，分配给销售团队人工跟进"
    
      - if: no_response_after_all_followups
        then: mark_dormant + schedule_re_engage(90d)
        reason: "休眠，90天后重新评估"

  # 决策 3: 渠道-销售联动
  channel_sales_linkage:
    input: channel_match_result
    rules:
      - if: channel_status == "active" AND requester_wants_outreach
        then: trigger_workflow_02(with_channel_contact)
        reason: "活跃渠道，销售助手执行联络"
    
      - if: channel_status == "dormant"
        then: trigger_workflow_02(template="reactivation")
        reason: "休眠渠道，用再激活模板"
```

## 统一工作看板

### 看板结构

```
┌──────────────────────────────────────────────────────────┐
│                FIBD 智能助手工作看板                        │
├──────────────────────────────────────────────────────────┤
│                                                          │
│  📊 今日概览                                              │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐            │
│  │ 新商机   │ │ 外联中  │ │ 有回复  │ │ 渠道需求 │            │
│  │   12    │ │   8    │ │   3    │ │   2    │            │
│  └────────┘ └────────┘ └────────┘ └────────┘            │
│                                                          │
│  🔴 需关注                                               │
│  ├─ [High] ABC Bank 表示有兴趣，需24h内安排会议            │
│  ├─ [SLA] 渠道需求 #CH-042 即将超时(剩余2h)               │
│  └─ [Alert] LinkedIn 外联渠道触发频率限制                  │
│                                                          │
│  📈 本周趋势                                              │
│  商机发现: 58 (↑12%)  外联触达: 34  回复率: 11.7%          │
│  会议预订: 4  渠道匹配请求: 7  匹配采纳率: 71%             │
│                                                          │
│  🔄 管线概览                                              │
│  Discovered(58) → Scored(58) → Contacting(23)            │
│  → Replied(8) → Interested(4) → Meeting(2) → Won(0)     │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### 看板数据源

```yaml
dashboard:
  data_sources:
    - crm:
        query: "pipeline_status_counts"
        refresh: 5min
    - workflow_01_log:
        query: "today_opportunities"
        refresh: on_complete
    - workflow_02_log:
        query: "active_outreach_status"
        refresh: 30min
    - workflow_03_log:
        query: "pending_channel_requests"
        refresh: on_update
  
  push_channels:
    - feishu_bot:
        group: "#fibd-dashboard"
        schedule:
          morning: "09:00 每日概览"
          evening: "18:00 每日总结"
          weekly: "MON 09:00 每周回顾"
    - web_dashboard:
        url: "internal.company.com/fibd-dashboard"
        auth: sso
```

## 全链路数据流

```yaml
data_flow:
  
  # 阶段 1: 情报 → 商机
  stage_1:
    source: Skill 01 (市场情报采集)
    output: intelligence_items
    sink: opportunity_db
    transform: Skill 02 (评分) → opportunity_record
    key: opportunity_id (全链路唯一)
  
  # 阶段 2: 商机 → 外联
  stage_2:
    source: opportunity_db (priority=high)
    output: outreach_tasks
    sink: crm_communication_log
    transform: Skill 03 (外联) → contact_record + message_log
    key: opportunity_id + contact_id
  
  # 阶段 3: 外联 → 渠道（可选）
  stage_3:
    source: outreach_results (interested)
    check: channel_db (existing_partner?)
    if_yes: activate_channel_path
    if_no: human_sales_path
    sink: crm_deal_record
  
  # 阶段 4: 内部需求 → 渠道匹配（独立触发）
  stage_4:
    source: internal_request_form
    output: match_report
    sink: channel_interaction_log
    transform: Skill 04 (匹配) → recommendation + contact_package

  # 数据一致性规则
  consistency:
    - opportunity_id 贯穿全链路
    - CRM 是 single source of truth
    - 所有写操作先 CRM 再本地
    - 冲突解决: CRM wins
```

## 定期报告

### 每日报告 (自动 18:00 推送)

```yaml
daily_report:
  sections:
    - market_intelligence:
        items_collected: ${count}
        high_priority: ${count}
        new_companies: ${list}
    - outreach_progress:
        messages_sent: ${count}
        replies_received: ${count}
        meetings_booked: ${count}
        key_interactions: ${list}
    - channel_requests:
        new_requests: ${count}
        requests_resolved: ${count}
        pending: ${count}
    - action_items:
        urgent: ${list}
        follow_ups: ${list}
```

### 每周报告 (自动 周一 09:00 推送)

```yaml
weekly_report:
  sections:
    - pipeline_metrics:
        total_opportunities: ${count}
        conversion_funnel: ${chart}
        week_over_week_change: ${delta}
    - outreach_performance:
        delivery_rate: ${pct}
        open_rate: ${pct}
        reply_rate: ${pct}
        meeting_rate: ${pct}
        best_performing_template: ${name}
    - channel_activity:
        requests_handled: ${count}
        adoption_rate: ${pct}
        new_channels_added: ${count}
    - ai_performance:
        skill_01_accuracy: ${pct}
        skill_02_scoring_correlation: ${pct}
        skill_03_compliance_rate: ${pct}
        skill_04_match_satisfaction: ${score}
    - recommendations:
        - ${auto_generated_improvement_suggestions}
```

## 异常升级机制

```yaml
escalation:
  levels:
    L1_auto:
      handler: "小小"
      actions: [retry, fallback, log]
      examples:
        - "API 临时不可用 → 自动重试"
        - "LLM 超时 → 降级模式"
  
    L2_team:
      handler: "BD Team Lead"
      trigger: "L1 处理失败 OR SLA 即将超时"
      notification: feishu + email
      examples:
        - "连续3天商机为0 → 检查数据源"
        - "外联投诉 → 暂停发送"
  
    L3_management:
      handler: "FIBD Department Head"
      trigger: "合规风险 OR 系统级故障"
      notification: feishu + email + phone
      examples:
        - "GDPR 数据删除请求"
        - "大规模邮件退信"
        - "LinkedIn 账号被封"
```

---

## 实施优先级

基于原始文档建议，按以下顺序迭代交付：

| Phase        | 内容                        | 周期   | MVP 定义                       |
| ------------ | --------------------------- | ------ | ------------------------------ |
| **P1** | Skill 01 + 02 + Workflow 01 | 4-6 周 | 每日自动生成商机简报，推送飞书 |
| **P2** | Skill 03 + Workflow 02      | 4-6 周 | 自动外联 High 商机，追踪回复   |
| **P3** | Skill 04 + Workflow 03      | 3-4 周 | 渠道匹配推荐，联络方案生成     |
| **P4** | Workflow 04 + 看板          | 2-3 周 | 全链路调度，统一看板           |

---

*版本: v1.0 | 2026-05-22*
