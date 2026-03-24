---
name: ex-frontend-unit-test
description: 前端组件/单元测试，使用 Vitest + @vue/test-utils 对组件渲染、Props/Emits、纯逻辑函数和 Store 进行测试。基于测试用例文档自动生成并执行测试脚本，失败时自动修复。触发场景：用户提到单元测试、组件测试、unit test、vitest、前端测试。
---

# 前端组件/单元测试

使用 Vitest + @vue/test-utils 对前端组件和纯逻辑模块进行测试，验证组件渲染、交互行为、数据逻辑的正确性。

基础规范（自动引用，无需单独调度）：

- `ex-frontend-tech-stack-spec`：技术栈规范（Vitest、@vue/test-utils 版本等）
- `ex-frontend-project-structure-spec`：工程结构规范

## 输入

| 来源 | 是否必须 | 说明 |
|------|---------|------|
| 测试用例文档 | 必须 | `docs/tests/full-testcases.md` 中的组件/单元测试用例，或增量测试用例文档中的对应部分 |
| 页面代码 | 必须 | `src/views/`、`src/components/` 下的组件代码，提取 Props/Emits/逻辑 |
| Composables | 按需 | `src/composables/` 下的组合式函数 |
| Store | 按需 | `src/stores/` 下的 Pinia Store |
| Utils | 按需 | `src/utils/` 下的工具函数 |

## 测试流程

### 第1步：分析测试范围

1. 读取测试用例文档，提取所有组件测试和单元测试用例
2. 读取被测代码，理解每个模块的：
   - 组件：Props 定义、Emits 定义、模板结构、依赖的 Store/API/Composable
   - Composables：参数、返回值、响应式状态、副作用
   - Store：state 结构、getters、actions、依赖的 API
   - Utils：函数签名、输入输出、边界条件
3. 确认测试环境：
   - 项目是否已安装 vitest 和 @vue/test-utils
   - vitest 配置文件是否存在（`vitest.config.ts` 或 `vite.config.ts` 中的 test 配置）
   - 是否有全局测试 setup 文件

**⚠️ 必须停下等待用户确认测试范围，不允许跳过**

### 第2步：生成测试脚本

基于测试用例和被测代码，生成 Vitest 测试脚本。

**脚本存放路径**：`docs/tests/unit-test/{模块路径}/__tests__/{模块名}.spec.ts`

路径映射规则：被测文件相对于 `src/` 的路径映射到 `docs/tests/unit-test/` 下。

| 被测文件 | 测试文件 |
|---------|---------|
| `src/views/{domain}/{Page}.vue` | `docs/tests/unit-test/views/{domain}/__tests__/{Page}.spec.ts` |
| `src/components/common/{Comp}.vue` | `docs/tests/unit-test/components/common/__tests__/{Comp}.spec.ts` |
| `src/components/business/{Comp}.vue` | `docs/tests/unit-test/components/business/__tests__/{Comp}.spec.ts` |
| `src/composables/{name}.ts` | `docs/tests/unit-test/composables/__tests__/{name}.spec.ts` |
| `src/stores/modules/{name}.ts` | `docs/tests/unit-test/stores/__tests__/{name}.spec.ts` |
| `src/utils/{name}.ts` | `docs/tests/unit-test/utils/__tests__/{name}.spec.ts` |

**脚本结构**：

#### 组件测试

```typescript
import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import Component from '@/views/{domain}/{Component}.vue'

describe('{Component}', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('应正确渲染默认状态', () => {
    const wrapper = mount(Component, {
      props: { /* ... */ },
      global: {
        stubs: { /* 桩组件 */ },
        plugins: [createPinia()],
      },
    })
    expect(wrapper.find('.target').exists()).toBe(true)
  })

  it('应在点击按钮时触发事件', async () => {
    const wrapper = mount(Component)
    await wrapper.find('button').trigger('click')
    expect(wrapper.emitted('submit')).toHaveLength(1)
  })
})
```

#### Composable 测试

```typescript
import { describe, it, expect } from 'vitest'
import { useXxx } from '@/composables/useXxx'
import { withSetup } from '../helpers'

describe('useXxx', () => {
  it('应返回正确的初始状态', () => {
    const [result] = withSetup(() => useXxx())
    expect(result.value).toBe(expectedValue)
  })
})
```

#### Store 测试

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useXxxStore } from '@/stores/modules/xxx'

describe('useXxxStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('应有正确的初始状态', () => {
    const store = useXxxStore()
    expect(store.data).toBeNull()
  })

  it('fetchData 应更新状态', async () => {
    const store = useXxxStore()
    await store.fetchData()
    expect(store.data).toBeDefined()
  })
})
```

#### 工具函数测试

```typescript
import { describe, it, expect } from 'vitest'
import { formatAmount } from '@/utils/format'

describe('formatAmount', () => {
  it('应格式化正常金额', () => {
    expect(formatAmount(1234.5)).toBe('1,234.50')
  })

  it('应处理零值', () => {
    expect(formatAmount(0)).toBe('0.00')
  })

  it('应处理 null/undefined', () => {
    expect(formatAmount(null)).toBe('-')
  })
})
```

**编写规则**：

- 每个测试用例对应一个 `it()` 块，用例名称与测试用例文档中的用例名称一致
- 测试描述使用中文，以"应"开头（如"应正确渲染列表"）
- Mock 策略：
  - API 模块：使用 `vi.mock()` Mock 整个模块
  - Router：使用 `vi.mock('vue-router')` 或 `global.mocks`
  - Store：使用真实 Pinia 实例（`createPinia()`），必要时 Mock actions
  - 外部依赖：使用 `vi.mock()` 隔离
- 每个测试用例必须独立，不依赖其他用例的执行顺序
- 异步操作使用 `await nextTick()` 或 `await flushPromises()` 等待 DOM 更新
- 组件测试优先验证用户可见的行为，而非内部实现细节

**Mock 示例**：

```typescript
// Mock API 模块
vi.mock('@/api/modules/order', () => ({
  getOrderList: vi.fn().mockResolvedValue({ list: [], total: 0 }),
  getOrderDetail: vi.fn().mockResolvedValue({ id: '1', status: 'pending' }),
}))

// Mock Router
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn() }),
  useRoute: () => ({ params: { id: '1' }, query: {} }),
}))
```

### 第3步：执行测试并收集结果

1. 执行 Vitest 测试：
   ```bash
   npx vitest run --config vitest.config.ts --reporter=verbose
   ```
   如果测试文件在 `docs/tests/unit-test/` 下，需确保 vitest 配置的 `include` 覆盖该路径。

2. 收集测试结果：
   - 通过/失败的用例数
   - 失败用例的错误信息和堆栈
   - 覆盖率数据（如配置了 coverage）

3. 对失败用例进行分析：
   - Mock 不完整：缺少必要的依赖 Mock
   - 异步时序：未正确等待 DOM 更新或异步操作
   - 选择器错误：组件模板结构与预期不符
   - 真实 Bug：被测代码确实存在缺陷

**⚠️ 必须停下等待用户审阅测试结果，不允许跳过**

### 第4步：修复与回归

根据用户反馈和测试结果：

1. **脚本问题**（Mock 不完整、时序问题、选择器错误）：修复测试脚本，重新执行
2. **真实 Bug**：记录问题，由用户决定是否修复被测代码
3. 修复后重新执行失败的用例：
   ```bash
   npx vitest run --config vitest.config.ts --reporter=verbose {失败的测试文件}
   ```
4. 循环修复直到所有非 Bug 类失败用例通过，循环上限 3 轮

**⚠️ 必须停下等待用户确认最终测试结果，不允许跳过**

## 产出物

| 产出物 | 路径 | 说明 |
|--------|------|------|
| 测试脚本 | `docs/tests/unit-test/{模块路径}/__tests__/{模块名}.spec.ts` | Vitest 测试脚本，全量持续更新 |

## Vitest 配置参考

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: [
      'src/**/__tests__/*.spec.ts',
      'docs/tests/unit-test/**/__tests__/*.spec.ts',
    ],
    setupFiles: ['./src/test-setup.ts'],
    coverage: {
      provider: 'v8',
      include: ['src/**/*.{ts,vue}'],
      exclude: ['src/**/*.d.ts', 'src/test-setup.ts'],
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

## 注意事项

- 测试脚本中的 Mock 必须基于实际代码的依赖关系，不能凭空假设
- 组件测试使用 `mount`（完整渲染）还是 `shallowMount`（浅渲染）取决于测试目标：验证子组件交互用 `mount`，仅验证当前组件逻辑用 `shallowMount`
- 每个测试文件的 `describe` 块对应一个被测模块，`it` 块对应一个测试用例
- 涉及 Pinia Store 的测试，必须在 `beforeEach` 中创建新的 Pinia 实例，避免状态污染
- 涉及定时器的测试使用 `vi.useFakeTimers()` 和 `vi.advanceTimersByTime()`
- 涉及 DOM 事件的测试使用 `await wrapper.find().trigger()` + `await nextTick()`
- 工具函数测试应覆盖正常值、边界值（空值、null、undefined）和异常输入
