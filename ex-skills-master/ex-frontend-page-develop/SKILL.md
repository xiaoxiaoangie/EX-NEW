---
name: ex-frontend-page-develop
description: 前端页面开发，根据技术方案或任务拆解生成/修改页面代码。此skill会自动触发 ex-frontend-tech-stack-spec、ex-frontend-project-structure-spec、ex-frontend-coding-standards-spec skill。当需要编写前端页面代码、组件代码时使用。触发场景：用户提到页面开发、组件开发、写页面、写组件、前端编码。
---

# 前端页面开发

根据技术方案（如有）和任务拆解文档，生成或修改前端页面代码。

## 触发规范 Skill

开始页面开发前，必须先触发以下规范 Skill：
1. 触发技术栈规范 Skill（`ex-frontend-tech-stack-spec`）
2. 触发工程结构规范 Skill（`ex-frontend-project-structure-spec`）
3. 触发编码规范 Skill（`ex-frontend-coding-standards-spec`）

## 输入

| 来源 | 说明 |
|------|------|
| 技术方案文档 | 阶段2的产出物（如有） |
| 任务拆解文档 | 阶段1的产出物 |
| 后端接口文档 | 后端接口定义（如有） |

## 输出

页面代码（直接写入 `src/` 目录）

## 开发流程

### 第一步：类型定义

根据后端接口文档，在 `src/types/api/{domain}.ts` 中定义业务域类型。
`src/typings/api.d.ts` 中只放跨域共享的基础结构（`PageParams`、`PageResult` 等），不在此处堆积业务类型。

```typescript
// src/types/api/{domain}.ts
import type { StatusEnum } from '@/enums/appEnum'

/** 列表查询参数 */
export interface {Entity}ListParams extends Api.PageParams {
  // ... 查询参数（Api.PageParams 已含 page/pageSize）
}

/** 列表项 / 详情 */
export interface {Entity}Info {
  id: string
  // ... 与后端 DTO 对齐的字段
}

/** 列表响应 */
export type {Entity}ListResult = Api.PageResult<{Entity}Info>

/** 创建请求体 */
export interface Create{Entity}Req {
  // ...
}

/** 更新请求体 */
export interface Update{Entity}Req {
  // ...
}
```

### 第二步：API 模块

在 `src/api/` 下创建或修改 API 文件（平铺，kebab-case 命名）：

```typescript
// src/api/{domain}.ts
import { request } from '@/utils/http'
import type {
  {Entity}ListParams,
  {Entity}ListResult,
  {Entity}Info,
  Create{Entity}Req,
  Update{Entity}Req
} from '@/types/api/{domain}'

const prefix = '/api/v1/mp/{domain}'

export function get{Entity}List(params: {Entity}ListParams) {
  return request.get<{Entity}ListResult>({
    url: `${prefix}/list`,
    params
  })
}

export function get{Entity}Detail(id: string) {
  return request.get<{Entity}Info>({
    url: `${prefix}/${id}`
  })
}

export function create{Entity}(data: Create{Entity}Req) {
  return request.post<void>({
    url: prefix,
    data,
    showSuccessMessage: true
  })
}

export function update{Entity}(id: string, data: Update{Entity}Req) {
  return request.put<void>({
    url: `${prefix}/${id}`,
    data,
    showSuccessMessage: true
  })
}

export function delete{Entity}(id: string) {
  return request.delete<void>({
    url: `${prefix}/${id}`,
    showSuccessMessage: true
  })
}
```

### 第三步：路由配置

在 `src/router/routes/asyncRoutes.ts` 中添加路由（路由集中维护，**不**拆分为独立模块文件）：

```typescript
// src/router/routes/asyncRoutes.ts（在合适位置追加）
{
  path: '/{domain}',
  name: '{Domain}',
  component: RoutesAlias.Layout,
  meta: {
    title: 'menus.{domain}.title',
    icon: 'i-ri-{icon-name}',
    sort: 1000   // 控制菜单排序
  },
  children: [
    {
      path: '{page-name}',           // kebab-case
      name: '{Entity}List',           // PascalCase
      component: () => import('@views/{domain}/{page-name}/index.vue'),
      meta: {
        title: 'menus.{domain}.{page}',
        icon: 'i-ri-list-check-line',
        permissions: ['{domain}:list']  // 权限码（如有）
      }
    },
    {
      path: '{page-name}/:id',
      name: '{Entity}Detail',
      component: () => import('@views/{domain}/{page-name}-detail/index.vue'),
      meta: {
        title: 'menus.{domain}.detail',
        isHide: true   // 详情页通常不显示在菜单中
      }
    }
  ]
}
```

同步在 `src/locales/langs/zh.json` 和 `en.json` 中补充 i18n key。

### 第四步：页面组件开发

按照技术方案的组件架构，从叶子组件到页面组件逐层开发。

#### 目录结构

```
src/views/{domain}/{page-name}/
├── index.vue          # 页面主组件（固定命名）
├── style.scss         # 页面样式（如有）
└── modules/           # 页面私有子组件（PascalCase 文件名）
    ├── FilterForm.vue
    └── DataTable.vue
```

#### 开发顺序

1. 通用组件（如需新建，放 `components/core/`）
2. 业务组件（如需新建，放 `components/business/`）
3. 页面私有组件（放页面目录的 `modules/`）
4. 页面主组件（`index.vue`）

#### 列表页模板

```vue
<!-- src/views/{domain}/{page-name}/index.vue -->
<script setup lang="ts">
// ✅ ref/reactive/computed/onMounted 等无需 import（auto-import 全局注入）
// ✅ useRouter/useRoute 无需 import
// ✅ Element Plus 组件无需 import

import { get{Entity}List, delete{Entity} } from '@/api/{domain}'
import type { {Entity}Info, {Entity}ListParams } from '@/types/api/{domain}'
import FilterForm from './modules/FilterForm.vue'
import DataTable from './modules/DataTable.vue'

const { t } = useI18n()

// 列表数据
const list = ref<{Entity}Info[]>([])
const total = ref(0)
const loading = ref(false)

// 查询参数
const queryParams = reactive<{Entity}ListParams>({
  page: 1,
  pageSize: 20
})

// 获取列表
async function fetchList() {
  loading.value = true
  try {
    const res = await get{Entity}List(queryParams)
    list.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

// 分页变更
function handlePageChange(page: number) {
  queryParams.page = page
  fetchList()
}

function handleSizeChange(size: number) {
  queryParams.pageSize = size
  queryParams.page = 1
  fetchList()
}

// 删除
async function handleDelete(id: string) {
  await delete{Entity}(id)
  fetchList()
}

onMounted(() => {
  fetchList()
})
</script>

<template>
  <div class="page-container">
    <!-- 筛选区域 -->
    <FilterForm v-model="queryParams" @search="fetchList" />

    <!-- 表格区域 -->
    <DataTable
      :data="list"
      :loading="loading"
      @delete="handleDelete"
    />

    <!-- 分页 -->
    <el-pagination
      v-model:current-page="queryParams.page"
      v-model:page-size="queryParams.pageSize"
      :total="total"
      layout="total, sizes, prev, pager, next"
      class="mt-4 justify-end"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style scoped>
.page-container {
  padding: 24px;
}
</style>
```

#### 表单/详情页模板

```vue
<!-- src/views/{domain}/{page-name}-form/index.vue -->
<script setup lang="ts">
import { get{Entity}Detail, create{Entity}, update{Entity} } from '@/api/{domain}'
import type { {Entity}Info, Create{Entity}Req, Update{Entity}Req } from '@/types/api/{domain}'
import type { FormInstance } from 'element-plus'

const route = useRoute()
const router = useRouter()

const isEdit = computed(() => !!route.params.id)
const formRef = ref<FormInstance>()
const loading = ref(false)
const submitLoading = ref(false)

const form = reactive<Create{Entity}Req>({
  // ... 表单字段
})

const rules = {
  // ... 表单校验规则
}

// 编辑模式：回填数据
async function loadDetail() {
  if (!isEdit.value) return
  loading.value = true
  try {
    const data = await get{Entity}Detail(route.params.id as string)
    Object.assign(form, data)
  } finally {
    loading.value = false
  }
}

// 提交
async function handleSubmit() {
  await formRef.value?.validate()
  submitLoading.value = true
  try {
    if (isEdit.value) {
      await update{Entity}(route.params.id as string, form)
    } else {
      await create{Entity}(form)
    }
    router.back()
  } finally {
    submitLoading.value = false
  }
}

onMounted(() => {
  loadDetail()
})
</script>

<template>
  <div class="page-container" v-loading="loading">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <!-- 表单字段 -->
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" :loading="submitLoading" @click="handleSubmit">
          {{ $t('common.submit') }}
        </el-button>
        <el-button @click="router.back()">{{ $t('common.cancel') }}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
```

#### 页面私有组件模板

```vue
<!-- src/views/{domain}/{page-name}/modules/FilterForm.vue -->
<script setup lang="ts">
import type { {Entity}ListParams } from '@/types/api/{domain}'

const props = defineProps<{
  modelValue: {Entity}ListParams
}>()

const emit = defineEmits<{
  'update:modelValue': [value: {Entity}ListParams]
  'search': []
}>()

const localForm = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function handleReset() {
  // 重置逻辑
  emit('search')
}
</script>

<template>
  <el-form :model="localForm" inline class="mb-4">
    <el-form-item label="关键词">
      <el-input v-model="localForm.keyword" placeholder="请输入" clearable />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('search')">查询</el-button>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
```

### 第五步：Store（按需创建）

仅在需要跨组件/跨页面共享状态时创建 Store，放在 `src/store/modules/`：

```typescript
// src/store/modules/{name}.ts
export const use{Name}Store = defineStore('{name}', () => {
  // state
  const data = ref<Api.{Domain}.{Entity}Info | null>(null)
  const loading = ref(false)

  // getters
  const isReady = computed(() => !!data.value)

  // actions
  async function fetchData(id: string) {
    loading.value = true
    try {
      data.value = await get{Entity}Detail(id)
    } finally {
      loading.value = false
    }
  }

  function reset() {
    data.value = null
  }

  return { data, loading, isReady, fetchData, reset }
})
```

> ⚠️ `defineStore`、`ref`、`computed` 均无需 import（auto-import 全局注入）。

## 增量模式

修改已有页面时：
1. 先阅读已有代码，理解现有结构
2. 仅修改需要变更的部分
3. 保持已有代码风格一致
4. 新增组件/类型/API 遵循现有命名规范

## 代码质量检查清单

开发完成后自查：

- [ ] 所有组件使用 `<script setup lang="ts">`
- [ ] **没有** 手动 `import { ref, computed, onMounted }` from 'vue'（auto-import）
- [ ] **没有** 直接 `import axios`（统一走 `src/utils/http/` 的 `request`）
- [ ] Props 和 Emits 有完整的 TypeScript 泛型类型定义
- [ ] API 调用有 loading 状态和 try/finally 处理
- [ ] 列表页有空状态和 loading 状态处理
- [ ] 样式优先使用 UnoCSS 工具类，组件特有样式使用 `<style scoped>`
- [ ] 无 `any` 类型（除非有注释说明）
- [ ] i18n：文案使用 `$t()` 或 `t()`，不硬编码中文字符串（如项目有 i18n 要求）
- [ ] 路由配置：组件使用懒加载 `() => import(...)`，path 为 kebab-case，name 为 PascalCase
- [ ] 图标使用 `i-ri-xxx` UnoCSS 类（Remix Icon）
- [ ] 页面目录和文件命名：目录 kebab-case，主文件固定为 `index.vue`
- [ ] 私有子组件放 `modules/` 目录，文件名 PascalCase
