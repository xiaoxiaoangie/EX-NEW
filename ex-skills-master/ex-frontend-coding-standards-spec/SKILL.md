---
name: ex-frontend-coding-standards-spec
description: 前端编码规范，定义 Vue SFC、TypeScript、CSS 的编码标准和最佳实践。此skill会自动触发 ex-frontend-tech-stack-spec、ex-frontend-project-structure-spec skill。此skill不由用户直接触发，由其他职责skill触发加载。
---

# 前端编码规范

## 触发规范 Skill

使用本编码规范前，必须先触发以下规范 Skill：
1. 触发技术栈规范 Skill（`ex-frontend-tech-stack-spec`）
2. 触发工程结构规范 Skill（`ex-frontend-project-structure-spec`）

## Vue SFC 规范

### 文件结构顺序

```vue
<script setup lang="ts">
// 1. 类型导入（仅类型，运行时无需导入）
import type { FormInstance } from 'element-plus'

// 注意：Vue 3 API（ref/computed/onMounted 等）、useRouter、useRoute、
// defineStore、storeToRefs、VueUse composables 已通过 auto-import 全局注入，
// 无需手动 import。

// 2. 内部模块（API、composables、utils 等）
import { getItemList } from '@/api/{domain}'
import { useItemStore } from '@/store/modules/{domain}'

// 3. 组件导入（通用/业务组件已通过 unplugin-vue-components 自动导入，
//    页面私有子组件需手动导入）
import FilterForm from './modules/FilterForm.vue'

// 4. Props / Emits 定义
const props = defineProps<{
  parentId: string
}>()

const emit = defineEmits<{
  select: [item: Api.{Domain}.{Entity}Info]
}>()

// 5. 响应式状态
const list = ref<Api.{Domain}.{Entity}Info[]>([])
const total = ref(0)
const loading = ref(false)

// 6. 计算属性
const hasData = computed(() => list.value.length > 0)

// 7. 方法
async function fetchList() { /* ... */ }
function handleSelect(item: Api.{Domain}.{Entity}Info) {
  emit('select', item)
}

// 8. 生命周期
onMounted(() => {
  fetchList()
})
</script>

<template>
  <!-- 模板内容 -->
</template>

<style scoped>
/* 样式 */
</style>
```

### Props 定义

使用 TypeScript 泛型语法定义 props：
```typescript
// 推荐：泛型语法
const props = defineProps<{
  title: string
  count?: number
  items: string[]
}>()

// 需要默认值时使用 withDefaults
const props = withDefaults(defineProps<{
  title: string
  count?: number
}>(), {
  count: 0
})
```

### Emits 定义

使用 TypeScript 泛型语法定义 emits：
```typescript
const emit = defineEmits<{
  change: [value: string]
  submit: [data: FormData]
  'update:modelValue': [value: string]
}>()
```

## TypeScript 规范

### 类型定义

类型按用途分三处管理：

**① 跨域共享基础类型** → `src/typings/api.d.ts`（ambient 声明，全局可用，无需 import）

```typescript
// src/typings/api.d.ts —— 只放跨域通用的基础结构，不放业务类型
declare namespace Api {
  interface PageParams {
    page: number
    pageSize: number
  }
  interface PageResult<T> {
    list: T[]
    total: number
  }
  interface Response<T = void> {
    code: number
    message: string
    data: T
  }
}
```

**② 业务域 API 类型** → `src/types/api/{domain}.ts`（普通模块，按域拆分，按需 import）

```typescript
// src/types/api/{domain}.ts
import type { StatusEnum } from '@/enums/appEnum'

export interface {Entity}Info {
  id: string
  name: string
  status: StatusEnum
  createdAt: string
}

export interface {Entity}ListParams extends Api.PageParams {
  status?: StatusEnum
  keyword?: string
}

export type {Entity}ListResult = Api.PageResult<{Entity}Info>

export interface Create{Entity}Req {
  name: string
  // ...
}
```

**③ 枚举** → `src/enums/appEnum.ts`

```typescript
export const enum StatusEnum {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED'
}
```

### 类型使用规则

- 优先使用 `interface`，需要联合类型或映射类型时使用 `type`
- API 响应类型必须显式定义，禁止使用 `any`
- 组件 props 和 emits 必须有完整类型定义
- ref 包裹复杂类型时显式标注：`ref<{Entity}Info[]>([])`
- 禁止使用 `@ts-ignore`，确需跳过检查使用 `@ts-expect-error` 并说明原因
- `typings/api.d.ts` 只放跨域共享的基础结构（`PageParams`、`PageResult` 等），业务类型必须拆分到 `types/api/{domain}.ts`

### 异步函数

```typescript
async function fetchList() {
  loading.value = true
  try {
    const data = await getList(params)
    list.value = data.list
    total.value = data.total
  } catch (error) {
    list.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}
```

## 响应式数据规范

### ref vs reactive

- 基础类型和需要替换整个值的场景：使用 `ref`
- 禁止对 reactive 对象整体赋值（会丢失响应性）
- 统一使用 `ref`，保持一致性

```typescript
const count = ref(0)
const list = ref<ItemInfo[]>([])
const form = ref<CreateForm>({ name: '', type: '' })
```

### computed 使用

- 派生数据必须使用 computed，禁止用 watch 手动同步
- computed 内禁止副作用（API 调用、DOM 操作）

### watch 使用

- 必须在组件卸载时清理（`<script setup>` 中自动清理）
- 避免 watch 链（A watch B，B watch C）
- 需要立即执行时使用 `{ immediate: true }`

## 模板规范

### 指令使用

```html
<!-- v-if vs v-show -->
<!-- 切换频率低、条件复杂：v-if -->
<div v-if="hasPermission('resource:create')">...</div>

<!-- 切换频率高：v-show -->
<div v-show="isExpanded">...</div>

<!-- 列表渲染必须有 key -->
<div v-for="item in list" :key="item.id">...</div>

<!-- 禁止 v-if 和 v-for 同时使用在同一元素 -->
<!-- 错误 -->
<div v-for="item in list" v-if="item.active" :key="item.id">...</div>
<!-- 正确 -->
<div v-for="item in activeList" :key="item.id">...</div>
```

### 事件处理命名

```html
<button @click="handleSubmit">提交</button>
<AppTable @row-click="handleRowClick" />
```

## CSS 规范

### 样式隔离

- 所有组件必须使用 `<style scoped>` 或 CSS Modules
- 禁止在组件中写全局样式
- 需要穿透子组件样式时使用 `:deep()`

### CSS 变量

```scss
/* assets/styles/variables.scss（通过 Vite preprocessor 自动注入，组件内可直接使用变量） */
:root {
  --color-primary: #1890ff;
  --color-success: #52c41a;
  --color-warning: #faad14;
  --color-error: #f5222d;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --font-size-sm: 12px;
  --font-size-base: 14px;
  --font-size-lg: 16px;

  --border-radius: 4px;
}
```

## 错误处理规范

### API 错误处理分层

```
axios 拦截器（全局）
├── 网络错误 → 全局 toast 提示
├── 401 未认证 → 跳转登录页
├── 403 无权限 → 全局 toast 提示
└── 500 服务端错误 → 全局 toast 提示

组件层（局部）
├── 业务错误码 → 根据场景处理（提示/重试/降级）
├── 空数据 → 展示空状态组件
└── 加载失败 → 展示错误状态 + 重试按钮
```

### 页面状态管理

每个数据请求页面必须处理四种状态：
- **Loading**：骨架屏或 loading 指示器
- **Empty**：空状态提示
- **Error**：错误提示 + 重试
- **Success**：正常数据展示
