---
name: ex-frontend-user-test
description: 前端用户测试，使用 Playwright 模拟真实用户在页面上的交互操作，执行全流程功能测试。基于测试用例和页面原型，自动生成并执行 E2E 测试脚本，验证页面功能是否符合预期。触发场景：用户提到用户测试、E2E测试、端到端测试、页面功能测试、全流程测试、模拟用户操作、自动化测试。
---

# 前端用户测试

使用 Playwright 模拟真实用户在浏览器中的交互操作，对页面进行全流程功能测试。

基础规范（自动引用，无需单独调度）：

- `ex-frontend-tech-stack-spec`：技术栈规范（Playwright 版本等）
- `ex-frontend-project-structure-spec`：工程结构规范

## 输入

| 来源 | 是否必须 | 说明 |
|------|---------|------|
| 测试用例文档 | 必须 | `docs/tests/full-testcases.md` 中的 E2E 测试用例，或增量测试用例文档中的 E2E 部分 |
| 页面原型 | 必须 | `docs/requirements/prototypes/*.html`，了解页面结构和交互预期 |
| PRD | 推荐 | 增量 PRD 或全量 PRD，了解业务规则和验收标准 |
| 页面代码 | 必须 | `src/views/` 下的页面组件，提取实际的选择器和路由 |
| 运行中的前端服务 | 必须 | 本地 dev server 或部署环境的 URL |

## 测试流程

### 第1步：分析测试范围

1. 读取测试用例文档，提取所有 E2E 测试用例
2. 读取页面原型和 PRD，理解每个页面的业务目标和交互流程
3. 读取页面代码，提取实际的：
   - 路由路径（`router/` 配置）
   - DOM 选择器（`data-testid`、组件类名、表单字段名）
   - API 请求路径（`api/` 模块）
   - 页面状态和条件分支
4. 确认测试环境：
   - 前端服务地址（默认 `http://localhost:5173`）
   - 是否需要登录（如需要，获取登录凭证或 token）
   - 是否需要 Mock 后端接口（后端未就绪时）

**⚠️ 必须停下等待用户确认测试范围和环境信息，不允许跳过**

### 第2步：生成测试脚本

基于测试用例和页面代码，生成 Playwright 测试脚本：

**脚本存放路径**：`e2e/{domain}/{page-name}.spec.ts`

**脚本结构**：

```typescript
import { test, expect } from '@playwright/test'

test.describe('{页面名称}', () => {
  test.beforeEach(async ({ page }) => {
    // 登录（如需要）
    // 导航到目标页面
  })

  test('{用例名称}', async ({ page }) => {
    // 模拟用户操作
    // 断言预期结果
  })
})
```

**编写规则**：

- 每个测试用例对应一个 `test()` 块，用例名称与测试用例文档中的用例名称一致
- 操作步骤严格模拟真实用户行为：
  - 点击：`page.click()` / `page.getByRole().click()`
  - 输入：`page.fill()` / `page.getByLabel().fill()`
  - 选择：`page.selectOption()` / `page.getByRole('combobox').click()`
  - 等待：`page.waitForResponse()` / `page.waitForSelector()`
  - 导航：`page.goto()` / `page.getByRole('link').click()`
- 选择器优先级：`data-testid` > `getByRole` > `getByLabel` > `getByText` > CSS 选择器
- 每个操作后添加必要的等待，避免竞态条件
- 断言覆盖：页面元素可见性、文本内容、URL 变化、API 请求发送、Toast/消息提示

**测试场景分类**：

| 场景类型 | 模拟操作 | 断言重点 |
|---------|---------|---------|
| 页面加载 | 导航到页面 | 关键元素渲染、数据加载完成、loading 消失 |
| 列表操作 | 筛选、排序、分页、搜索 | 列表数据变化、筛选条件生效、分页正确 |
| 表单提交 | 填写字段、点击提交 | 校验提示、提交请求发送、成功反馈 |
| 表单校验 | 留空必填项、输入非法值 | 校验错误提示出现、提交按钮禁用 |
| 详情查看 | 点击列表项进入详情 | 详情数据正确展示、返回按钮可用 |
| 编辑流程 | 进入编辑→修改→保存 | 表单回填正确、保存成功、数据更新 |
| 删除操作 | 点击删除→确认弹窗→确认 | 确认弹窗出现、删除成功、列表更新 |
| 状态流转 | 触发状态变更操作 | 状态标签更新、可用操作变化 |
| 权限控制 | 不同角色登录 | 菜单/按钮的显示隐藏、操作拦截 |
| 异常处理 | 模拟网络错误、超时 | 错误提示展示、重试机制、降级展示 |
| 跨页面流程 | 多页面连续操作 | 页面跳转正确、数据传递正确、流程完整 |

**Mock 策略**（后端未就绪时）：

```typescript
// 使用 Playwright 的路由拦截 Mock API
await page.route('**/api/{domain}/**', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ code: 0, data: mockData })
  })
})
```

### 第3步：执行测试并收集结果

1. 执行 Playwright 测试：
   ```bash
   npx playwright test e2e/{domain}/ --reporter=html,json
   ```
2. 收集测试结果：
   - 通过/失败的用例数
   - 失败用例的截图和错误信息
   - 每个用例的执行时间
3. 对失败用例进行分析：
   - 选择器失效：页面结构变化导致元素定位失败
   - 时序问题：异步操作未等待完成
   - 数据问题：测试数据不满足前置条件
   - 真实 Bug：页面功能确实存在缺陷

**⚠️ 必须停下等待用户审阅测试结果，不允许跳过**

### 第4步：修复与回归

根据用户反馈和测试结果：

1. **脚本问题**（选择器失效、时序问题、数据问题）：修复测试脚本，重新执行
2. **真实 Bug**：记录到测试报告的问题清单中，由用户决定是否修复
3. 修复后重新执行失败的用例：
   ```bash
   npx playwright test --last-failed
   ```
4. 循环修复直到所有非 Bug 类失败用例通过

**⚠️ 必须停下等待用户确认测试结果，不允许跳过**

## 产出物

| 产出物 | 路径 | 说明 |
|--------|------|------|
| E2E 测试脚本 | `e2e/{domain}/{page-name}.spec.ts` | Playwright 测试脚本 |
| 测试报告 | `docs/requirements/{JIRA}-{YYYYMMDD}-{SUMMARY}/{JIRA}-usertest-{YYYYMMDD}-{SUMMARY}.md` | 用户测试报告 |
| Playwright HTML 报告 | `playwright-report/index.html` | Playwright 自动生成的可视化报告 |
| 失败截图 | `test-results/` | 失败用例的自动截图 |

## 测试报告模板

```markdown
# {JIRA} 用户测试报告

## 测试概况

| 项目 | 值 |
|------|-----|
| JIRA | {JIRA} |
| 测试日期 | {日期} |
| 前端服务 | {URL} |
| 后端环境 | {环境地址 / Mock} |
| 浏览器 | Chromium {版本} |

## 测试结果汇总

| 指标 | 值 |
|------|-----|
| 总用例数 | {N} |
| 通过 | {N} |
| 失败 | {N} |
| 跳过 | {N} |
| 通过率 | {N}% |
| 总耗时 | {N}s |

## 测试用例执行明细

### {页面名称}

| 用例编号 | 用例名称 | 操作流程 | 预期结果 | 实际结果 | 状态 | 耗时 |
|---------|---------|---------|---------|---------|------|------|
| TC-XXXX | {名称} | {操作步骤概要} | {预期} | {实际} | ✅/❌ | {N}ms |

## 失败用例分析

### {用例编号}: {用例名称}

- **失败原因**：{选择器失效 / 时序问题 / 数据问题 / 真实Bug}
- **错误信息**：{Playwright 错误输出}
- **截图**：{截图路径}
- **处理方式**：{已修复脚本 / 已修复代码 / 待修复}

## 问题清单

| # | 级别 | 页面 | 描述 | 复现步骤 | 状态 |
|---|------|------|------|---------|------|
| 1 | P0/P1/P2 | {页面} | {描述} | {步骤} | 待修复/已修复 |

## 测试结论

- 总测试用例：{N} 项
- 通过：{N} 项（{N}%）
- 失败：{N} 项（脚本问题 {N} 项，真实 Bug {N} 项）
- 结论：通过 / 不通过
- 遗留问题：{列出未修复的问题}
```

## Playwright 配置参考

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
})
```

## 注意事项

- 测试脚本中的选择器必须基于实际页面代码，不能凭空假设
- 优先使用 `data-testid` 属性定位元素，如页面代码中没有，在测试脚本中标注需要添加
- 每个测试用例必须独立，不依赖其他用例的执行顺序或副作用
- 涉及数据变更的测试（创建、编辑、删除），需要在 `beforeEach` 或 `afterEach` 中清理测试数据
- 网络请求使用 `page.waitForResponse()` 等待，避免硬编码 `page.waitForTimeout()`
- 如果后端服务未就绪，使用 Playwright 路由拦截 Mock API 响应
- 测试报告中的失败用例必须区分"脚本问题"和"真实 Bug"
