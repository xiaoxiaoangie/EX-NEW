---
name: ex-frontend-develop-workflow
description: 前端开发全流程编排。当用户提出任何前端需求或页面变更时必须首先触发此skill，包括但不限于：新增页面、修改页面、页面交互变更、前端联调、组件开发、样式调整。只要涉及对前端工程的功能性修改（如"新增XXX页面"、"修改XXX交互"、"调整XXX样式"、"开发XXX组件"），都应触发此skill进行全流程管理。
---

# 前端开发全流程

本 skill 负责流程编排和阶段协调，具体职责由各专项 skill 承担。

## 设计理念

面向 Agent 编程：人定义"做什么"和"做到什么程度"，AI 自主完成"怎么做"的全过程，人只在关键节点确认。

- 人的职责：业务意图、交互期望、验收标准、方案确认
- AI的职责：需求拆解、方案设计、代码实现、自检修正、文档维护

## 流程总览

| 阶段 | 核心动作 | 调度的 Skill | 人的参与 |
|---|---|---|---|
| 启动 | 获取 JIRA → 查找 PRD → 确认接口和原型 → 选择模式 | — | 提供 JIRA 单号，选择模式 |
| 1. 需求对齐 | AI 拆解需求，主动提问澄清 | `ex-frontend-task-breakdown` | 回答问题，确认需求理解 |
| 2. 方案设计 | 技术方案 + 方案评审 + 测试用例 | `technical-design` → `design-review` → `test-analysis` → `test-review` | 审阅设计方案和测试覆盖度 |
| 3. 编码实现 | 页面开发 + 代码审查 | `page-develop` → `code-review` | 审阅代码变更 |
| 4. 测试验证 | 组件/单元测试 + 联调测试 + 用户测试 | `unit-test` → `integration-test` → `user-test` | 确认测试结果 |
| 5. 提交归档 | 变更记录 + Git 提交 | `ex-frontend-changelog` → `ex-common-git-commit` | 无需确认 |

基础规范（各阶段自动引用，无需单独调度）：
- `ex-frontend-project-structure-spec`：工程结构和目录规范
- `ex-frontend-coding-standards-spec`：编码规范
- `ex-frontend-tech-stack-spec`：技术栈和依赖版本

## 启动

```
1. 获取 JIRA 单号（强制第一步，必须输入，不能临时创建或留空）
   - 如果用户首次输入中包含 JIRA 单号，直接记录为 {JIRA}
   - 如果未提供，立即询问并等待用户输入，不进入后续步骤

2. 确认门户类型（强制，记录为 {PORTAL}）
   - 读取项目中的.env 配置，自动识别门户类型
   - 如果无法自动识别，询问用户当前项目属于哪种门户：mp（商户门户）| tp（租户门户）| ap（代理门户）| pp（合作方门户）| sa（运营后台）
   - {PORTAL} 将用于 API 路径前缀 `/api/v1/{PORTAL}/{domain}`

3. 根据 JIRA 单号查找需求文档
   - 在 docs/requirements/ 目录下精确匹配以 {JIRA}- 开头的任务目录
   - 在匹配到的目录中查找 PRD 文件（{JIRA}-prd-*.md）及其他相关文档
   - 如果找到 PRD，从文件名中提取 {需求简述} 记录为 {SUMMARY}
   - 注意：docs/requirements/ 下存在历史任务的文档，必须通过 JIRA 单号精确匹配，禁止扫描整个目录

4. 确认后端接口文档来源
   - 扫描 docs/backend-apis/ 目录是否存在接口文档
   - 如不存在，询问用户：提供后端工程路径（从其 docs/designs/full-api-design.md 读取）、直接粘贴、或本次不涉及后端接口
   - 一个页面可能涉及多个后端服务，支持提供多个后端工程路径

5. 确认页面原型（必须已存在，由产品设计阶段产出）
   - 原型统一使用静态 HTML 文件，存放在 docs/requirements/prototypes/
   - AI 解析 HTML 原型，提取页面结构、字段、交互信息
   - 如果原型不存在，提示用户先完成产品设计，不进入后续步骤

6. 解析用户意图，确定执行模式
   A. 常规开发流程（按阶段执行）：
      - 从阶段1开始：新页面开发、较大的页面变更
      - 从阶段2开始：涉及复杂交互或架构调整的变更
      - 从阶段3开始：简单的页面修改、样式调整
   B. Bug 修复流程：
      - 直接调度 ex-frontend-bugfix，修复完成后跳转到阶段4
      - 步骤3和4可跳过

7. 根据 PRD 查找结果决定下一步
   - PRD 已存在：基于 PRD 进入对应起始阶段
   - PRD 不存在：提示用户输入需求描述，AI 从中总结出 {需求简述} 作为 {SUMMARY}，经用户确认后创建任务目录并生成 PRD，用户确认后再推进

8. 向用户确认后开始执行
```

全局变量说明：
- `{JIRA}`：JIRA 单号，整个流程保持不变，传递给每个 skill
- `{PORTAL}`：门户类型（mp | tp | ap | pp | sa），启动阶段确认，用于 API 路径前缀
- `{SUMMARY}`：变更简述，从 PRD 文件名 `{JIRA}-prd-{YYYYMMDD}-{需求简述}.md` 的最后一段提取；PRD 不存在时由 AI 从用户需求描述中总结并经用户确认

## 阶段1：需求对齐

**目标**：确保 AI 准确理解用户的页面需求和交互意图。

**执行**：调度 `ex-frontend-task-breakdown`，传入 JIRA 单号、后端接口文档（如有）和页面原型（启动阶段已确认）。

**产出物**：
- `docs/requirements/prototypes/{页面名}.html`（新建或更新）
- `docs/requirements/task-breakdowns/{JIRA}-taskbreakdown-{YYYYMMDD}-{SUMMARY}.md`

**人机迭代**：向用户展示任务拆解结果后，**必须停下等待用户审阅并反馈，不允许跳过**。用户可对拆解结果提出修正，每轮修改后再次停下等待用户确认，迭代直到用户确认通过。

**⚠️ 必须停下等待用户确认通过，不允许跳过** → 进入阶段2

---

## 阶段2：方案设计

**目标**：输出完整的技术方案（组件架构 + 交互设计 + 测试用例），作为实现阶段的契约。

**简单需求可跳过**：纯 CRUD 页面、小范围样式修改等简单需求可跳过此阶段，需向用户确认。

**执行**（AI 自主串联，中间不等待用户）：
1. **技术方案 + 自检**：调度 `ex-frontend-technical-design` → `ex-frontend-design-review`，自动修复问题
2. **测试用例 + 自检**：调度 `ex-frontend-test-analysis` → `ex-frontend-test-review`，自动修复问题

自检规则：P0/P1 问题自动修复后重新评审，循环上限 3 轮；超过 3 轮报告给用户；P2 问题展示给用户确认。

**产出物**：
- `docs/designs/full-technical-design.md`（增量更新）
- `docs/tests/full-testcases.md`（增量更新）
- `docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-testcase-{YYYYMMDD}-{SUMMARY}.md`

**人机迭代**：向用户展示技术方案要点和测试覆盖概要后，**必须停下等待用户审阅并反馈，不允许跳过**。用户可提出修改意见，每轮只修改用户指出的部分，修改后再次停下等待用户确认，迭代直到用户确认通过。

**⚠️ 必须停下等待用户确认通过，不允许跳过** → 进入阶段3

---

## 阶段3：编码实现

**目标**：生成可运行的页面代码，通过代码审查。

**执行**（AI 自主串联，中间不等待用户）：
1. **页面开发 + 自检**：调度 `ex-frontend-page-develop` → `ex-frontend-code-review`，自动修复问题

自检规则同阶段2。

**产出物**：
- 工程代码（页面代码 + 组件代码 + 样式代码）

**人机迭代**：向用户展示代码变更概要后，**必须停下等待用户审阅并反馈，不允许跳过**。用户可审查后提出修改意见，每轮只修改用户指出的部分，修改后再次停下等待用户确认，迭代直到用户确认通过。

**⚠️ 必须停下等待用户确认通过，不允许跳过** → 进入阶段4

---

## 阶段4：测试验证

**目标**：通过三层测试验证页面功能的正确性和完整性。

**测试分层**：

| 测试层 | 工具 | 调度的 Skill | 测试重点 |
|--------|------|-------------|---------|
| 组件/单元测试 | Vitest + @vue/test-utils | `ex-frontend-unit-test` | 组件渲染、Props/Emits、纯逻辑函数、Store |
| 联调测试 | — | `ex-frontend-integration-test` | 前后端接口连通性、数据映射、异常场景 |
| 用户测试 | Playwright | `ex-frontend-user-test` | 模拟真实用户操作的全流程 E2E 功能测试 |

**执行**（AI 自主串联，中间不等待用户）：
1. **组件/单元测试**：调度 `ex-frontend-unit-test`，基于阶段2的测试用例执行组件测试和单元测试，失败时自动修复代码或测试脚本，循环上限 3 轮
2. **联调测试**：调度 `ex-frontend-integration-test`，验证前后端接口集成，失败时自动修复并重新执行，循环上限 3 轮
3. **用户测试**：调度 `ex-frontend-user-test`，基于阶段2的 E2E 测试用例生成 Playwright 脚本并执行，模拟真实用户在页面上的交互操作，失败时区分脚本问题（自动修复）和真实 Bug（记录报告），循环上限 3 轮

说明：
- 联调测试依赖后端服务就绪，如后端未就绪可跳过或使用 Mock
- 用户测试依赖前端服务运行，需确保 dev server 已启动
- 三层测试按顺序执行，前一层全部通过后再执行下一层

**产出物**：
- 组件/单元测试代码（`docs/tests/unit-test/**/__tests__/*.spec.ts`）
- 联调测试报告（`docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-integrationtest-{YYYYMMDD}-{SUMMARY}.md`）
- E2E 测试脚本（`docs/tests/e2e/{domain}/{page-name}.spec.ts`）
- 用户测试报告（`docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-usertest-{YYYYMMDD}-{SUMMARY}.md`）

**人机迭代**：向用户展示三层测试结果汇总后，**必须停下等待用户审阅并反馈，不允许跳过**。用户可审查后提出修改意见，每轮只修改用户指出的部分，修改后再次停下等待用户确认，迭代直到用户确认通过。

**⚠️ 必须停下等待用户确认通过，不允许跳过** → 进入阶段5

---

## 阶段5：提交归档

**目标**：生成变更记录，提交代码。

**执行**（AI 自动完成，无需用户确认）：
1. 调度 `ex-frontend-changelog`，传入 JIRA 单号和 `{SUMMARY}`
2. 调度 `ex-common-git-commit`，传入 JIRA 单号和 `{SUMMARY}`

**产出物**：
- `docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-changelog-{YYYYMMDD}-{SUMMARY}.md`
- Git commit & push
