# Workflow 02 — 商机外联转化（Opportunity-to-Outreach）

## 概述

| 属性 | 值 |
|-----|---|
| **触发方式** | 事件触发（Workflow 01 推送 High 商机）或人工触发 |
| **调用 Skills** | Skill 03 (销售外联执行) |
| **执行周期** | 首次触达 → Follow-up #1 (D+3) → Follow-up #2 (D+8) |
| **预计耗时** | 首次触达 5 min/公司，完整周期 8-10 天 |
| **输出** | 外联执行报告 → CRM 更新 + 飞书通知 |

---

## 流程图

```
┌─────────────────────────┐
│  触发                    │
│  来源: Workflow 01       │
│  或: 人工选择商机触发     │
└───────────┬─────────────┘
            ▼
┌─────────────────────────┐
│  预检查                  │
│  ├─ CRM 去重（近30天已联系？）
│  ├─ 黑名单校验           │
│  └─ 每日配额检查         │
└───────────┬─────────────┘
            ▼
      通过预检？
     ╱        ╲
   No          Yes
    ▼            ▼
┌────────┐  ┌──────────────────────────┐
│跳过+日志│  │ Skill 03 阶段一：联系人挖掘 │
└────────┘  │ ├─ LinkedIn 搜索           │
            │ ├─ 官网 Team 页面          │
            │ ├─ 邮箱猜测 + 验证         │
            │ └─ CRM 去重               │
            └───────────┬──────────────┘
                        ▼
                 找到联系人？
                ╱          ╲
              No            Yes
               ▼              ▼
        ┌──────────┐  ┌──────────────────────────┐
        │标记为      │  │ Skill 03 阶段二：消息生成  │
        │"需人工查找"│  │ ├─ 选取模板              │
        │→人工队列   │  │ ├─ LLM 个性化内容        │
        └──────────┘  │ ├─ 合规校验              │
                      │ └─ 人工审核（可选）        │
                      └───────────┬──────────────┘
                                  ▼
                      ┌──────────────────────────┐
                      │ Skill 03 阶段三：发送       │
                      │ ├─ 按节奏规则排入队列       │
                      │ ├─ 分渠道发送              │
                      │ └─ 实时追踪               │
                      └───────────┬──────────────┘
                                  ▼
                          等待回复（监听）
                         ╱    │     ╲
                       回复  无回复   退订
                        ▼     ▼      ▼
                  ┌──────┐ ┌─────┐ ┌──────┐
                  │分类   │ │D+3  │ │加黑名单│
                  │处理   │ │触发  │ │记录   │
                  └──┬───┘ │F-up1│ └──────┘
                     │     └──┬──┘
            ┌────────┼────┐   │
            ▼        ▼    ▼   ▼
        有兴趣   要资料  拒绝  D+8无回复
            ▼        ▼    ▼      ▼
        ┌──────┐┌─────┐┌────┐┌──────┐
        │升级人工││自动发││标记 ││Follow│
        │安排会议││产品册││关闭 ││-up #2│
        │@sales ││    ││    ││     │
        └──────┘└─────┘└────┘└──┬───┘
                                ▼
                          仍无回复→标记休眠
```

## 详细步骤

### Step 1: 接收商机 & 预检查

```yaml
trigger:
  - event: "workflow-01.high_priority_opportunity"
  - manual: "bd_team.select_opportunity"

action: pre_check
checks:
  - name: crm_dedup
    query: "SELECT * FROM crm_leads WHERE company = ${company_name} AND last_contacted > NOW() - INTERVAL '30 days'"
    fail_action: skip_with_log("近30天已联系，跳过")
  
  - name: blacklist_check
    query: "SELECT * FROM blacklist WHERE company = ${company_name} OR domain = ${company_domain}"
    fail_action: skip_with_log("命中黑名单，跳过")
  
  - name: daily_quota
    check: today_sent_count < 50
    fail_action: defer_to_tomorrow("今日配额已满")
```

### Step 2: 联系人挖掘

```yaml
action: invoke_skill
skill: skill-03-sales-outreach
phase: "contact_discovery"
input:
  company_name: ${opportunity.company_name}
  target_roles: ["CEO", "CTO", "VP of Payments", "Head of BD", "Product Director"]
  max_contacts: 3
  channels: ["linkedin", "company_website"]
output: contacts_found
timeout: 5min

on_empty_result:
  action: create_manual_task
  assignee: "bd-team-pool"
  title: "人工查找联系人: ${opportunity.company_name}"
  priority: "high"
  context: ${opportunity}
```

### Step 3: 个性化消息生成

```yaml
action: invoke_skill
skill: skill-03-sales-outreach
phase: "message_generation"
input:
  contacts: ${contacts_found}
  opportunity: ${opportunity}
  template_type: "first_touch"
  language: auto_detect(${opportunity.company_region})
output: messages_draft

# 合规校验（自动）
action: compliance_check
checks:
  - has_unsubscribe_link: true
  - no_false_claims: true
  - sender_identity_clear: true
  - gdpr_compliant: true
on_fail: block_and_alert("合规校验未通过")

# 人工审核（High 商机默认开启）
action: human_review
condition: opportunity.priority == "high"
reviewer: "sales-lead"
timeout: 4h
on_timeout: auto_approve  # 超时自动通过
```

### Step 4: 首次触达发送

```yaml
action: invoke_skill
skill: skill-03-sales-outreach
phase: "send"
input:
  messages: ${messages_draft}
  send_schedule:
    - channel: email
      time: next_business_hour()
      priority: 1
    - channel: linkedin_inmail
      time: next_business_hour() + 2h
      priority: 2
output: send_results

# 同步 CRM
action: update_crm
for_each: send_results.outreach_details
update:
  lead_status: "contacted"
  last_contacted: ${now}
  communication_log: append(${message_summary})
```

### Step 5: 回复监听 & 自动处理

```yaml
action: listen_for_replies
duration: 8d  # 整个 follow-up 周期
check_interval: 1h

on_reply:
  action: invoke_skill
  skill: skill-03-sales-outreach
  phase: "reply_handling"
  
  routing:
    - category: "interested"
      actions:
        - push_feishu:
            channel: "#bd-hot-leads"
            message: "🔥 ${company_name} 的 ${contact_name} 表示有兴趣！"
            mention: ["@sales-owner"]
        - create_meeting_task:
            assignee: ${sales_owner}
            title: "安排会议: ${company_name}"
            due_date: today + 1d
        - update_crm:
            lead_status: "interested"
    
    - category: "request_info"
      actions:
        - auto_send:
            template: "info_reply"
            attachments: ${matched_product_brochures}
        - update_crm:
            lead_status: "info_sent"
    
    - category: "schedule_meeting"
      actions:
        - auto_send:
            template: "meeting_invite"
            include_calendly_link: true
        - update_crm:
            lead_status: "meeting_scheduled"
    
    - category: "not_interested"
      actions:
        - update_crm:
            lead_status: "closed_not_interested"
        - log: "标记关闭"
    
    - category: "unsubscribe"
      actions:
        - add_to_blacklist: ${contact_email}
        - auto_send:
            template: "unsubscribe_confirm"
        - update_crm:
            lead_status: "unsubscribed"
```

### Step 6: Follow-up 序列

```yaml
# Follow-up #1: D+3
action: scheduled_task
trigger: send_time + 3d
condition: reply_status == "no_response"
execute:
  action: invoke_skill
  skill: skill-03-sales-outreach
  phase: "message_generation"
  input:
    template_type: "follow_up_1"
    original_message: ${first_touch_message}
    contact: ${contact}
  then: send + continue_listening

# Follow-up #2: D+8
action: scheduled_task
trigger: send_time + 8d
condition: reply_status == "no_response"
execute:
  action: invoke_skill
  skill: skill-03-sales-outreach
  phase: "message_generation"
  input:
    template_type: "follow_up_2"
    original_message: ${first_touch_message}
    contact: ${contact}
    include_case_study: true
  then: send + continue_listening

# 最终关闭: D+15
action: scheduled_task
trigger: send_time + 15d
condition: reply_status == "no_response"
execute:
  - update_crm:
      lead_status: "dormant"
  - log: "${company_name} 三次触达无响应，标记休眠"
```

### Step 7: 生成外联执行报告

```yaml
action: generate_report
trigger: workflow_complete OR weekly_summary
template: outreach_execution_report
data:
  period: ${report_period}
  companies_targeted: ${total_companies}
  contacts_found: ${total_contacts}
  messages_sent: ${total_messages}
  delivery_rate: ${delivered / sent * 100}%
  open_rate: ${opened / delivered * 100}%
  reply_rate: ${replied / sent * 100}%
  positive_reply_rate: ${interested / replied * 100}%
  meetings_booked: ${meetings_count}
  
push_to:
  - channel: feishu
    group: "#bd-outreach-report"
  - channel: crm
    report_type: "outreach_summary"
```

---

## 异常处理

| 异常场景 | 处理策略 |
|---------|---------|
| LinkedIn 封号/限制 | 暂停 LinkedIn 渠道 24h，转 email only |
| 邮件退信率 > 10% | 暂停发送，排查邮箱验证质量 |
| LLM 生成不合规内容 | 阻断发送，降级为纯模板模式 |
| CRM 同步失败 | 本地队列暂存，下次批量补推 |
| 联系人投诉 | 立即停止所有触达 + 人工介入 |

## 监控指标

| 指标 | 目标值 | 告警阈值 |
|------|-------|---------|
| 邮件送达率 | ≥ 95% | < 90% |
| 邮件打开率 | ≥ 30% | < 15% |
| 回复率 | ≥ 10% | < 3% |
| 正面回复率 | ≥ 40% (of replies) | < 20% |
| 退订率 | < 1% | > 3% |
| 合规校验通过率 | 100% | < 100% |

---
*版本: v1.0 | 2026-05-22*
