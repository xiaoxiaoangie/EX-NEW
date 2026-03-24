---
name: ex-backend-develop-workflow
description: 后端微服务开发全流程编排。仅当用户明确提到"开发服务"时触发此skill。
---

# 后端微服务开发全流程

本 skill 负责流程编排和阶段协调，具体职责由各专项 skill 承担。

## 设计理念

面向 Agent 编程：PRD 定义"做什么"和"做到什么程度"，AI 自主完成"怎么做"的全过程，人只在关键节点确认。

- 人的职责：提供 PRD（或简单描述由 AI 生成 PRD）、价值判断、方案确认
- AI的职责：PRD 完整性验证、技术分析、方案设计、代码实现、自检修正、文档维护
- 开发流程的输入始终是 PRD，而不是口头描述。小需求由人简单描述后 AI 辅助生成 PRD，确认后再推进流程

## 流程总览

| 阶段 | 核心动作 | 调度的 Skill | 人的参与 |
|---|---|---|---|
| 启动 | 获取 JIRA → 查找 PRD → 选择模式 | — | 提供 JIRA 单号，选择模式 |
| 1. 需求对齐 | 检查 PRD，无则生成；验证完整性，技术对齐 | `ex-backend-requirement-analysis` | 提供/确认 PRD，回答澄清问题 |
| 2. 方案设计 | 架构设计 + 接口设计 + 测试用例 | `architecture-design` → `architecture-review` → `api-design` → `api-review` → `test-analysis` → `test-review` | 审阅设计方案和测试覆盖度 |
| 3. 实现交付 | 代码生成 + 自检 + 测试执行 | `code-generate` → `code-review` → `unit-test` | 确认交付物 |
| 4. 提交归档 | 变更记录 + Git 提交 | `ex-backend-changelog` → `ex-common-git-commit` | 无需确认 |

基础规范（各阶段自动引用，无需单独调度）：
- `ex-backend-project-structure-spec`：工程结构和分层规范
- `ex-backend-coding-standards-spec`：编码规范
- `ex-backend-tech-stack-spec`：技术栈和依赖版本

## 启动

```
1. 获取 JIRA 单号（强制第一步，必须输入，不能临时创建或留空）
   - 如果用户首次输入中包含 JIRA 单号，直接记录为 {JIRA}
   - 如果未提供，立即询问并等待用户输入，不进入后续步骤

2. 根据 JIRA 单号查找需求文档
   - 在 docs/requirements/ 目录下精确匹配以 {JIRA}- 开头的任务目录
   - 在匹配到的目录中查找 PRD 文件（{JIRA}-prd-*.md）
   - 如果找到 PRD，从文件名中提取 {需求简述} 记录为 {SUMMARY}
   - 注意：docs/requirements/ 下存在历史任务的文档，必须通过 JIRA 单号精确匹配，禁止扫描整个目录

3. 请用户选择开发模式
   A. 全新开发 — 全新业务需求，从阶段1开始，所有文档和代码从零创建
   B. 变更开发 — 对已有产出物进行增量更新，由用户选择变更类型：
      B1. 需求变更 — 从阶段1开始
      B2. 修改设计 — 从阶段2开始
      B3. 优化代码 — 从阶段3开始
   C. 修复 Bug — 直接调度 ex-backend-bugfix，修复完成后跳转到阶段4
      要求用户提供以下至少一项：Bug 描述、错误日志、现象截图

4. 根据 PRD 查找结果决定下一步
   - PRD 已存在：基于 PRD 进入对应起始阶段
   - PRD 不存在：提示用户输入需求描述，AI 从中总结出 {需求简述} 作为 {SUMMARY}，经用户确认后创建任务目录并生成 PRD，用户确认后再推进

5. 向用户确认后开始执行
```

全局变量说明：
- `{JIRA}`：JIRA 单号，整个流程保持不变，传递给每个 skill
- `{SUMMARY}`：变更简述，从 PRD 文件名 `{JIRA}-prd-{YYYYMMDD}-{需求简述}.md` 的最后一段提取；PRD 不存在时由 AI 从用户需求描述中总结并经用户确认

## 阶段1：需求对齐

**目标**：确保需求完整且可开发，对齐技术实现理解。

**执行**：调度 `ex-backend-requirement-analysis`，传入 JIRA 单号和需求文档（PRD 在启动阶段已确认存在或已生成）。

**产出物**：
- `docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-reqanalysis-{YYYYMMDD}-{SUMMARY}.md`
- `docs/designs/full-prd.md`（增量更新或新建）

**人机迭代**：向用户展示需求分析结论后，**必须停下等待用户审阅并反馈，不允许跳过**。用户可对需求理解或分析结论提出修正，每轮修改后再次停下等待用户确认，迭代直到用户确认通过。

**⚠️ 必须停下等待用户确认通过，不允许跳过** → 进入阶段2

---

## 阶段2：方案设计

**目标**：输出完整的技术方案（架构 + 接口 + 测试用例），作为实现阶段的契约。

**执行**（AI 自主串联，中间不等待用户）：
1. **架构设计 + 自检**：调度 `ex-backend-architecture-design` → `ex-backend-architecture-review`，自动修复问题
2. **接口设计 + 自检**：调度 `ex-backend-api-design` → `ex-backend-api-review`，自动修复问题
3. **测试用例 + 自检**：调度 `ex-backend-test-analysis` → `ex-backend-test-review`，自动修复问题

自检规则：P0/P1 问题自动修复后重新评审，循环上限 3 轮；超过 3 轮报告给用户；P2 问题展示给用户确认。

**产出物**：
- `docs/designs/full-architecture-design.md`（增量更新）
- `docs/designs/full-api-design.md`（增量更新）
- `docs/tests/full-testcases.md`（增量更新）
- `docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-testcase-{YYYYMMDD}-{SUMMARY}.md`

**人机迭代**：向用户展示架构要点、接口清单、测试覆盖概要后，**必须停下等待用户审阅并反馈，不允许跳过**。用户可提出修改意见，每轮只修改用户指出的部分，修改后再次停下等待用户确认，迭代直到用户确认通过。

**⚠️ 必须停下等待用户确认通过，不允许跳过** → 进入阶段3

---

## 阶段3：实现交付

**目标**：生成可运行的代码，所有测试通过。

**执行**（AI 自主串联，中间不等待用户）：
1. **代码生成 + 自检**：调度 `ex-backend-code-generate` → `ex-backend-code-review`，自动修复问题
2. **单元测试**：调度 `ex-backend-unit-test`，测试不通过时自动修复并重新执行，循环上限 3 轮

自检规则同阶段2。

**产出物**：
- 工程代码（业务代码 + 测试代码）
- `docs/designs/full-database-schema.md`（自动更新）

**人机迭代**：向用户展示代码变更概要和测试结果后，**必须停下等待用户审阅并反馈，不允许跳过**。用户可审查代码后提出修改意见，每轮只修改用户指出的部分，修改后再次停下等待用户确认，迭代直到用户确认通过。

**⚠️ 必须停下等待用户确认通过，不允许跳过** → 进入阶段4

---

## 阶段4：提交归档

**目标**：生成变更记录，提交代码。

**执行**（AI 自动完成，无需用户确认）：
1. 调度 `ex-backend-changelog`，传入 JIRA 单号和 `{SUMMARY}`
2. 调度 `ex-common-git-commit`，传入 JIRA 单号和 `{SUMMARY}`

**产出物**：
- `docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-changelog-{YYYYMMDD}-{SUMMARY}.md`
- Git commit & push
