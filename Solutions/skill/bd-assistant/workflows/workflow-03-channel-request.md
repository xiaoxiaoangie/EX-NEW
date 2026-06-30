# Workflow 03 — 渠道需求响应（Channel Request Response）

## 概述

| 属性 | 值 |
|-----|---|
| **触发方式** | 内部部门通过工作台提交渠道需求 |
| **调用 Skills** | Skill 04 (渠道智能匹配) |
| **SLA** | 普通需求 24h 内响应，紧急需求 4h 内响应 |
| **输出** | 渠道匹配报告 + 联络方案包 → 飞书推送 + 可选流转至 Workflow 02 |

---

## 流程图

```
┌───────────────────────────┐
│  内部部门提交渠道需求         │
│  (工作台标准化表单)          │
└────────────┬──────────────┘
             ▼
┌───────────────────────────┐
│  需求解析 & 补全             │
│  ├─ NLP 提取能力/地域/牌照   │
│  ├─ 自动补全缺失字段         │
│  └─ 确认需求（如有歧义→追问） │
└────────────┬──────────────┘
             ▼
┌───────────────────────────┐
│  Skill 04: 渠道智能匹配     │
│  ├─ 硬过滤（牌照/地域）      │
│  ├─ 四维匹配评分            │
│  ├─ 排序 & TopN 推荐       │
│  └─ 能力对比矩阵生成        │
└────────────┬──────────────┘
             ▼
       匹配结果 > 0 ?
      ╱            ╲
    No              Yes
     ▼                ▼
┌──────────┐  ┌──────────────────────────┐
│通知需求方  │  │  LLM 生成联络方案包       │
│"暂无匹配"  │  │  ├─ 沟通提纲              │
│建议扩展条件│  │  ├─ 价值主张              │
│或人工介入  │  │  ├─ 破冰点建议            │
└──────────┘  │  └─ 推荐附带资料           │
              └────────────┬─────────────┘
                           ▼
              ┌──────────────────────────┐
              │  推送匹配报告至需求方       │
              │  ├─ 飞书卡片消息          │
              │  ├─ 包含对比矩阵          │
              │  └─ 每个推荐含联络方案     │
              └────────────┬─────────────┘
                           ▼
                   需求方确认选择
                  ╱       │      ╲
              选定渠道  需调整条件  需人工协助
                 ▼        ▼         ▼
           ┌─────────┐┌────────┐┌─────────┐
           │可选：流转 ││重新运行 ││升级至渠道│
           │Workflow02││Skill 04││经理人工 │
           │执行外联  ││         ││处理     │
           └─────────┘└────────┘└─────────┘
```

## 详细步骤

### Step 1: 需求接收

```yaml
trigger:
  - source: "internal_workspace_form"
    form_fields:
      requester_name: required
      requester_department: required
      requirement_description: required  # 自然语言
      capabilities_needed: optional      # 多选标签
      target_regions: optional
      license_required: optional
      urgency: required  # urgent / normal / low
      additional_notes: optional

action: create_request_ticket
ticket_id: auto_generate
status: "processing"
sla:
  urgent: 4h
  normal: 24h
  low: 48h
```

### Step 2: 需求解析 & 智能补全

```yaml
action: parse_requirement
method: llm_extraction

prompt: |
  你是渠道需求分析师。请从以下自然语言需求中提取结构化信息：
  
  ---
  {requirement_description}
  ---
  
  请输出：
  1. 所需核心能力标签（从以下选择，可多选）：
     acquiring / remittance / card_issuing / fx_exchange / local_payment / 
     crypto_payment / compliance_kyc / banking_as_service / virtual_account / 
     cross_border_settlement / mobile_money / e_wallet / open_banking
  2. 目标地域（国家/地区列表）：
  3. 是否需要持牌：yes/no/unclear
  4. 其他关键约束（如预算、时间要求等）：
  5. 是否有歧义需要追问：yes/no
  6. 如有歧义，追问问题：

# 如有歧义
on_ambiguity:
  action: send_clarification
  channel: feishu
  to: ${requester}
  message: "关于您的渠道需求，需要确认几个问题：${clarification_questions}"
  wait_for_reply: true
  timeout: 4h
  on_timeout: proceed_with_best_guess
```

### Step 3: 执行匹配

```yaml
action: invoke_skill
skill: skill-04-channel-matching
input:
  request_type: "channel_query"
  requester:
    name: ${requester_name}
    department: ${requester_department}
  requirement:
    description: ${parsed_description}
    capabilities_needed: ${extracted_capabilities}
    target_regions: ${extracted_regions}
    license_required: ${extracted_license_req}
    urgency: ${urgency}
    max_recommendations: 5
output: match_report
timeout: 5min
```

### Step 4: 空结果处理

```yaml
action: condition
if: match_report.total_matches == 0
then:
  - action: notify_requester
    channel: feishu
    message: |
      📋 渠道匹配结果
      
      抱歉，当前数据库中未找到完全匹配的渠道。
      
      建议：
      1. 放宽地域范围或能力要求后重新查询
      2. 联系渠道经理 @channel-manager 人工处理
      
      需求摘要：${match_report.requirement_summary}
  
  - action: create_manual_task
    assignee: "channel-manager"
    title: "人工处理渠道需求: ${ticket_id}"
    context: ${requirement}
  
  - action: end
else: continue
```

### Step 5: 联络方案生成

```yaml
# 对每个推荐渠道生成联络方案包（已在 Skill 04 内完成）
# 此步骤做额外的质量检查

action: quality_check
for_each: match_report.recommendations
checks:
  - contact_info_present: true
  - communication_outline_not_empty: true
  - value_proposition_relevant: true
on_fail: flag_for_manual_review
```

### Step 6: 推送结果

```yaml
action: push_to_requester
channel: feishu
message_type: "interactive_card"
content:
  title: "📊 渠道匹配报告 - ${ticket_id}"
  summary: |
    需求：${match_report.requirement_summary}
    匹配渠道：${match_report.total_matches} 个
    
  recommendations:
    for_each: match_report.recommendations
    card:
      rank: "#${rank}"
      company: ${company_name}
      score: "${match_score}/100"
      status: ${cooperation_status}
      rating: "${historical_rating}⭐"
      capabilities: ${matched_capabilities}
      regions: ${matched_regions}
      match_reasons: ${match_reasons}
      
  actions:
    - button: "查看完整联络方案"
      action: show_contact_package
    - button: "发起外联（流转Workflow 02）"
      action: enqueue_workflow_02
    - button: "调整条件重新匹配"
      action: re_run_matching
    - button: "转人工处理"
      action: escalate_to_human

# 同时推送能力对比矩阵
action: push_comparison_matrix
channel: feishu
data: match_report.capability_comparison_matrix
format: table
```

### Step 7: 需求方反馈处理

```yaml
action: listen_for_feedback
timeout: 48h

on_action:
  - action_type: "enqueue_workflow_02"
    execute:
      action: invoke_workflow
      workflow: workflow-02-lead-outreach
      input:
        opportunities:
          - opportunity_id: "channel_${ticket_id}"
            company_name: ${selected_channel.company_name}
            demand_analysis: ${requirement_description}
            matched_products: []
            suggested_approach: ${selected_channel.contact_package.communication_outline}
        outreach_config:
          contacts_override: [${selected_channel.contact_package.primary_contact}]
  
  - action_type: "re_run_matching"
    execute:
      action: collect_new_criteria
      then: goto_step_3
  
  - action_type: "escalate_to_human"
    execute:
      action: create_manual_task
      assignee: "channel-manager"
      title: "人工处理渠道需求: ${ticket_id}"
      context: ${full_context}

on_timeout:
  action: close_ticket
  status: "no_action_taken"
  log: "需求方 48h 未响应，关闭工单"
```

### Step 8: 记录 & 反馈闭环

```yaml
action: log_execution
data:
  ticket_id: ${ticket_id}
  requester: ${requester_name}
  department: ${requester_department}
  requirement: ${requirement_description}
  matches_found: ${match_report.total_matches}
  selected_channel: ${selected_channel_name}
  outcome: ${final_status}
  sla_met: ${was_sla_met}
  time_to_respond: ${response_time}

# 用于优化匹配算法的反馈数据
action: collect_satisfaction
trigger: ticket_closed + 7d
send_survey:
  to: ${requester}
  questions:
    - "推荐渠道是否满足需求？(1-5)"
    - "联络方案是否实用？(1-5)"
    - "改进建议（可选）"
```

---

## 异常处理

| 异常场景 | 处理策略 |
|---------|---------|
| 渠道数据库为空/数据过旧 | 提示管理员更新，降级为人工推荐 |
| LLM 联络方案质量差 | 标记人工审核后推送 |
| 需求方未响应追问 | 按最佳猜测执行 + 标注"可能不精确" |
| SLA 即将超时 | 自动升级至渠道经理 |

## 监控指标

| 指标 | 目标值 | 告警阈值 |
|------|-------|---------|
| SLA 达标率 | ≥ 95% | < 85% |
| 匹配命中率（有结果） | ≥ 80% | < 60% |
| 需求方采纳率 | ≥ 60% | < 30% |
| 平均响应时间（普通） | ≤ 12h | > 24h |
| 平均响应时间（紧急） | ≤ 2h | > 4h |

---
*版本: v1.0 | 2026-05-22*
