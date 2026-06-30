# FIBD 智能助手工作组 — Multi-Agent 架构

> 基于 `BDASSISTANT.MD` 拆解，采用 **主Agent + 子Agent** 模式  
> 适配飞书 aily / Coze / Dify 等支持多 Agent 编排的平台

---

## 架构选型：为什么是"主Agent + 子Agent"

| 方案 | 适用场景 | 本项目适用性 |
|------|---------|------------|
| 单Agent + 多Skill | Skill少、职责相似 | ❌ 三个助手职责差异太大，单Prompt难以覆盖 |
| 纯多Agent | 完全独立、无协作 | ❌ 有数据流转需求（市场→销售） |
| **主Agent + 子Agent** | 有路由需求 + 子任务专精 | ✅ Boss路由 + 各助手专精 |

---

## 整体架构

```
                    ┌────────────────────────────┐
                    │     Boss（主Agent / 路由器）    │
                    │                            │
                    │  • 理解用户意图              │
                    │  • 分发任务给子Agent         │
                    │  • 汇总结果 & 看板           │
                    │  • 管理 Workflows 触发       │
                    └──────┬─────┬─────┬─────────┘
                           │     │     │
              ┌────────────┘     │     └────────────┐
              ▼                  ▼                  ▼
   ┌──────────────────┐ ┌──────────────────┐ ┌──────────────────┐
   │  雷达（市场）      │ │  拓拓（销售）      │ │  桥桥（渠道）      │
   │                  │ │                  │ │                  │
   │  Skills:         │ │  Skills:         │ │  Skills:         │
   │  • 情报采集       │ │  • 联系人挖掘     │ │  • 渠道库管理     │
   │  • 商机评分       │ │  • 消息生成       │ │  • 需求匹配       │
   │                  │ │  • 发送追踪       │ │  • 方案生成       │
   │  Tools:          │ │  • 回复处理       │ │                  │
   │  • NewsAPI       │ │                  │ │  Tools:          │
   │  • SerpAPI       │ │  Tools:          │ │  • 渠道DB查询     │
   │  • Twitter API   │ │  • Hunter.io     │ │  • CRM读取       │
   │  • Proxycurl     │ │  • AWS SES       │ │  • 飞书表单       │
   │  • RSS Reader    │ │  • LinkedIn API   │ │                  │
   └────────┬─────────┘ └────────┬─────────┘ └────────┬─────────┘
            │                    │                    │
            ▼                    ▼                    ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                    Workflows（跨Agent编排）                    │
   │                                                             │
   │  WF-01: 每日商机    WF-02: 外联转化    WF-03: 渠道响应       │
   │  (市场Agent)        (市场→销售Agent)    (渠道Agent)          │
   │                                                             │
   │  WF-04: 全链路管线（Boss调度，串联所有Agent）                   │
   └─────────────────────────────────────────────────────────────┘
            │                    │                    │
            ▼                    ▼                    ▼
   ┌─────────────────────────────────────────────────────────────┐
   │                    共享数据层                                  │
   │  CRM  │  商机DB  │  渠道DB  │  联系人DB  │  外联记录  │ 看板   │
   └─────────────────────────────────────────────────────────────┘
```

---

## 文件结构

```
bd-assistant/
├── README.md                              ← 本文件（架构总览）
│
├── agents/                                ← Agent 定义（Prompt + Skills + Tools）
│   ├── main-agent-boss.md                ← Boss：主Agent（路由 + 调度 + 看板）
│   ├── sub-agent-market.md                ← 雷达：市场子Agent（情报采集 + 商机评分）
│   ├── sub-agent-sales.md                 ← 拓拓：销售子Agent（外联全流程）
│   └── sub-agent-channel.md               ← 桥桥：渠道子Agent（匹配 + 联络方案）
│
├── workflows/                             ← 跨Agent编排（触发条件 + 数据流转）
│   ├── workflow-01-daily-opportunity.md    ← 每日商机发现（市场Agent 内部）
│   ├── workflow-02-lead-outreach.md       ← 商机外联转化（市场→销售 跨Agent）
│   ├── workflow-03-channel-request.md     ← 渠道需求响应（渠道Agent 内部）
│   └── workflow-04-full-bd-pipeline.md    ← 全链路（Boss调度所有Agent）
│
├── config/                                ← 凭证 & 数据源配置
│   ├── .env.example                       ← 环境变量模板
│   ├── credentials-guide.md               ← 各平台凭证获取指南
│   ├── data-sources.yaml                  ← 数据源认证 & 采集策略
│   └── token-refresh-service.py           ← Token 自动续期服务
│
└── (legacy) skill-*.md                    ← 旧版Skill文件（已合并进agents/）
```

---

## Agent 与 Skill/Workflow 的关系

```
┌─────────────────────────────────────────────────────────────────┐
│                        概念层级关系                                │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Agent  = 一个有独立 Prompt + 记忆 + 工具集的"角色"                │
│           → 能理解指令、做决策、调用工具                            │
│                                                                 │
│  Skill  = Agent 内部的一个"能力模块"                              │
│           → 有明确 Input/Output、可被 Agent 决策调用               │
│           → 不能独立运行，必须在 Agent 内                          │
│                                                                 │
│  Tool   = Skill 执行时调用的"外部接口"                            │
│           → API、DB查询、文件操作等                               │
│           → 最底层，无决策能力                                     │
│                                                                 │
│  Workflow = 跨 Agent 的"编排逻辑"                                │
│           → 定义：触发条件 → Agent调用顺序 → 数据传递 → 异常处理   │
│           → 由主Agent或定时器触发                                  │
│                                                                 │
│  层级：  Workflow > Agent > Skill > Tool                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 各 Agent 一览

| Agent | 类型 | Skills | Tools | 触发方式 |
|-------|------|--------|-------|---------|
| **Boss** | 主Agent | 意图识别、任务分发、报告汇总 | 飞书Bot、CRM Dashboard | 用户对话 / 定时 |
| **雷达** | 子Agent | 情报采集、商机评分 | NewsAPI、SerpAPI、Twitter、Proxycurl、RSS | 被Boss调度 / Cron |
| **拓拓** | 子Agent | 联系人挖掘、消息生成、发送追踪、回复处理 | Hunter.io、SES、LinkedIn、Calendly | 被Boss调度 / 事件 |
| **桥桥** | 子Agent | 渠道库管理、需求匹配、联络方案生成 | 渠道DB、CRM、飞书表单 | 被Boss调度 / 表单 |

---

## 平台映射

### 飞书 aily

| 本项目概念 | aily 对应 |
|-----------|----------|
| Boss（主Agent） | 主技能 / 入口技能 |
| 雷达/拓拓/桥桥（子Agent） | 子技能（被主技能 @调用） |
| Skill | 技能内的"插件动作" |
| Tool | 插件（API 连接器） |
| Workflow | 飞书自动化 / 多维表格自动化 |

### Coze

| 本项目概念 | Coze 对应 |
|-----------|----------|
| Boss（主Agent） | 主 Bot（Multi-Agent 模式） |
| 雷达/拓拓/桥桥（子Agent） | Agent Node（在 Workflow 中） |
| Skill | Bot 内的 Plugin |
| Tool | Plugin 内的 API Tool |
| Workflow | Workflow（可视化编排） |

### Dify

| 本项目概念 | Dify 对应 |
|-----------|----------|
| Boss（主Agent） | Agent（ReAct / Function Call） |
| 子Agent | 嵌套 Agent 节点 |
| Skill | Tool Provider |
| Workflow | Workflow App |

---

## 设计原则

1. **Agent = 独立人格**：每个 Agent 有自己的 System Prompt、专属记忆、独立工具集
2. **Skill ⊂ Agent**：Skill 归属于特定 Agent，不跨 Agent 共享
3. **Workflow = 编排层**：定义 Agent 之间的协作顺序和数据传递
4. **主Agent 不做执行**：Boss 只路由和汇总，不直接调用 Tools
5. **数据流单向**：市场 → 销售 → 渠道，避免循环依赖
6. **合规优先**：销售子Agent 内置合规校验，所有外联动作可审计

---

## 实施路径

| Phase | 交付物 | 周期 |
|-------|--------|------|
| **P1** | Boss(基础路由) + 雷达(情报+评分) + WF-01 | 4-6 周 |
| **P2** | 拓拓(全流程) + WF-02 | 4-6 周 |
| **P3** | 桥桥 + WF-03 | 3-4 周 |
| **P4** | WF-04 全链路 + 看板 + Boss增强 | 2-3 周 |

---
*版本: v2.0 | 架构升级为 Multi-Agent | 2026-05-22*
