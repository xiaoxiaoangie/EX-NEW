---
name: ex-frontend-project-structure-spec
description: 前端 Vue 3 + TypeScript 工程结构规范，定义目录划分、文件命名和模块组织。此skill不由用户直接触发，由其他职责skill触发加载。
---

# 前端工程结构规范

> 基于 ex-merchant-portal 实际工程总结，所有新增代码必须遵循本规范。

## 目录结构

```
{工程名}/
├── README.md
├── package.json
├── tsconfig.json
├── vite.config.ts
├── uno.config.ts
├── eslint.config.mjs
├── .env.development
├── .env.production
│
├── docs/                                        # 项目文档
│   ├── tests/                                   # 测试相关
│   │   ├── full-testcases.md                    #【AI生成，人确认】测试用例全景，增量累积
│   │   ├── unit-test/                           #【AI生成】组件/单元测试代码
│   │   │   └── **/__tests__/*.spec.ts
│   │   └── e2e/                                 #【AI生成】E2E 用户测试脚本
│   │       └── {domain}/{page-name}.spec.ts
│   ├── requirements/                            # 需求文档（仅保留每次任务单的增量需求描述）
│   │   ├── prototypes/                          # 页面原型（静态 HTML）
│   │   │   └── {页面名}.html                    #【AI生成/维护，人确认】页面原型文件
│   │   └── {JIRA}-{YYYYMMDD}-{需求简述}/      # 每个任务的文档目录
│   │       ├── {JIRA}-prd-{YYYYMMDD}-{需求简述}.md   #【人提供】需求描述
│   │       ├── {JIRA}-taskbreakdown-{YYYYMMDD}-{需求简述}.md    #【AI生成】任务拆解
│   │       ├── {JIRA}-testcase-{YYYYMMDD}-{需求简述}.md    #【AI生成】测试用例
│   │       ├── {JIRA}-integrationtest-{YYYYMMDD}-{需求简述}.md  #【AI生成】联调测试报告
│   │       ├── {JIRA}-usertest-{YYYYMMDD}-{需求简述}.md         #【AI生成】用户测试报告
│   │       └── {JIRA}-changelog-{YYYYMMDD}-{需求简述}.md   #【AI生成】变更记录
│   ├── designs/                                 # 设计文档
│   │   ├── full-prd.md                          #【AI生成，人确认】本应用业务设计的全量文档，增量累积
│   │   └── full-technical-design.md             #【AI生成，人确认】增量累积
│   └── backend-apis/                            # 后端接口文档（从后端工程同步或手动维护）
│       └── {服务名}-api.md                      #【人维护】本项目使用的后端接口清单
│
├── public/
│
└── src/
    ├── api/                        # API 请求模块（平铺，按业务域命名）
    │   ├── auth.ts
    │   ├── user.ts
    │   ├── {domain}.ts             # kebab-case，如 system-manage.ts
    │   └── ...
    │
    ├── assets/                     # 静态资源
    │   ├── icons/
    │   │   └── system/             # 字体图标（iconfont）
    │   ├── img/
    │   │   ├── avatar/
    │   │   ├── login/
    │   │   └── common/
    │   └── styles/                 # 全局 SCSS（通过 Vite preprocessor 自动注入）
    │       ├── variables.scss
    │       ├── mixins.scss
    │       └── overrides/          # 组件库样式覆盖（唯一允许写全局样式的地方）
    │
    ├── components/                 # 可复用组件
    │   ├── core/                   # 通用组件（与业务无关）
    │   │   ├── base/               # 基础类：logo、icon-selector 等
    │   │   ├── forms/              # 表单类：search-bar、excel-import 等
    │   │   ├── tables/             # 表格类：art-table 等
    │   │   ├── charts/             # 图表类
    │   │   ├── layouts/            # 布局类：header、sidebar、settings-panel 等
    │   │   └── ...
    │   │       └── {component-name}/     # 组件目录：kebab-case
    │   │           ├── index.vue         # 主组件入口
    │   │           ├── style.scss        # 组件样式（如有）
    │   │           ├── composables/      # 组件内部 composable（如有）
    │   │           │   └── useXxx.ts
    │   │           └── widget/           # 子组件（如有）：PascalCase 文件名
    │   │               └── SubComponent.vue
    │   └── business/                 # 业务组件（项目内复用，与业务相关）
    │       └── {component-name}/
    │           └── index.vue
    │
    ├── composables/                # 组合式函数
    │   ├── useAuth.ts
    │   ├── useTable.ts
    │   └── use{Name}.ts            # camelCase，use 前缀
    │
    ├── config/                     # 配置文件
    │
    ├── directives/                 # Vue 自定义指令
    │   ├── auth.ts                 # v-auth：权限控制
    │   ├── roles.ts                # v-roles：角色控制
    │   └── index.ts                # 统一注册
    │
    ├── enums/                      # 枚举
    │   ├── appEnum.ts
    │   └── formEnum.ts
    │
    ├── locales/                    # 国际化
    │   ├── index.ts
    │   └── langs/
    │       ├── zh.json
    │       └── en.json
    │
    ├── router/                     # 路由
    │   ├── index.ts                # 路由实例（含 HOME_PAGE_PATH）
    │   ├── routes/
    │   │   ├── staticRoutes.ts     # 静态路由（登录、错误页等）
    │   │   └── asyncRoutes.ts      # 动态路由（登录后按权限加载）
    │   ├── guards/
    │   │   ├── beforeEach.ts       # 路由前置守卫
    │   │   └── afterEach.ts        # 路由后置守卫
    │   ├── menus/
    │   │   └── microMenus.ts       # 微前端菜单配置
    │   └── utils/
    │       ├── menuToRouter.ts     # 菜单数据 → 路由对象转换
    │       └── registerRoutes.ts   # 路由注册工具
    │
    ├── store/                      # Pinia 状态管理
    │   ├── index.ts                # Pinia 初始化（含持久化插件）
    │   └── modules/
    │       ├── user.ts             # 用户认证、权限
    │       ├── menu.ts             # 菜单/导航
    │       ├── setting.ts          # UI 设置、主题
    │       ├── worktab.ts          # 标签页状态
    │       ├── config.ts           # 微前端配置
    │       └── {domain}.ts         # 业务 Store
    │
    ├── types/                      # TypeScript 类型定义
    │   ├── api/
    │   │   ├── index.ts            # API 类型聚合导出
    │   │   └── request.ts          # 请求/响应基础类型
    │   ├── router/
    │   │   └── index.ts            # RouteMeta、AppRouteRecord 等
    │   ├── store/
    │   │   └── index.ts            # Store 状态类型
    │   ├── component/
    │   │   └── index.ts            # 组件 Props 类型
    │   └── index.ts                # 类型总出口
    │
    ├── typings/                    # 全局类型声明（.d.ts）
    │   ├── api.d.ts                # 全局 API 命名空间（namespace Api）
    │   ├── form.d.ts
    │   └── http.d.ts
    │
    ├── utils/                      # 工具函数（按功能分子目录）
    │   ├── http/                   # axios 实例和拦截器
    │   ├── permission/             # 权限校验逻辑
    │   ├── storage/                # localStorage 封装（含 StorageKeyManager）
    │   ├── navigation/             # 路由跳转工具
    │   ├── dataprocess/            # 数据处理（format、array 等）
    │   ├── micro/                  # 微前端工具
    │   └── ...
    │
    ├── views/                      # 页面组件（与路由一一对应）
    │   ├── auth/
    │   │   ├── login/
    │   │   │   └── index.vue       # 页面组件：kebab-case 目录 + index.vue
    │   │   └── forget-password/
    │   │       └── index.vue
    │   ├── {domain}/               # 业务域：kebab-case
    │   │   ├── {page-name}/        # 页面名：kebab-case
    │   │   │   ├── index.vue       # 页面主组件
    │   │   │   ├── style.scss      # 页面样式（如有）
    │   │   │   └── modules/        # 页面私有组件目录（根据复杂度，也可用 components/）
    │   │   │       └── SubSection.vue   # 私有子组件：PascalCase 文件名
    │   │   └── ...
    │   └── exception/
    │       └── 404/
    │           └── index.vue
    │
    ├── mock/                       # Mock 数据（仅开发环境）
    ├── App.vue
    └── main.ts
```

## 命名规范

### 文件命名

| 类型 | 命名规则 | 示例 |
|------|---------|------|
| 页面目录 | kebab-case | `roles-permissions/`、`forget-password/` |
| 页面主组件 | `index.vue`（固定） | `views/settings/profile/index.vue` |
| 页面私有子组件 | PascalCase 文件名 | `modules/RoleTable.vue`、`widget/MainDashboard.vue` |
| 通用/业务组件目录 | kebab-case | `art-table/`、`ex-otp-input/` |
| 通用/业务组件主文件 | `index.vue`（固定） | `components/core/tables/art-table/index.vue` |
| 通用/业务组件子组件 | PascalCase | `widget/BasicSettings.vue` |
| composable | camelCase，use 前缀 | `useAuth.ts`、`useTable.ts` |
| store 模块 | camelCase | `user.ts`（导出 `useUserStore`） |
| API 模块 | kebab-case | `system-manage.ts`、`roles.ts` |
| 类型文件 | camelCase | `request.ts`、`index.ts` |
| 工具函数目录 | camelCase 或 kebab-case | `dataprocess/`、`navigation/` |
| 枚举文件 | camelCase | `appEnum.ts`、`formEnum.ts` |

### 组件命名

| 类型 | 命名规则 | 示例 |
|------|----------|------|
| 通用组件（目录） | `art-` 前缀，kebab-case | `art-table`、`art-settings-panel` |
| 业务组件（目录） | `ex-` 前缀，kebab-case | `ex-otp-input`、`ex-logo` |
| 页面私有子组件（文件） | PascalCase | `MainDashboard.vue`、`RoleTable.vue` |
| 页面主组件（文件） | `index.vue`（固定） | `index.vue` |

### 路由命名

| 类型 | 命名规则 | 示例 |
|------|----------|------|
| 路由 path | kebab-case | `/roles-permissions`、`/forget-password` |
| 路由 name | PascalCase | `'RolesPermissions'`、`'ForgetPassword'` |

## 路由组织规则

路由集中在 `src/router/routes/` 下，**不按域拆分独立模块文件**，而是在 `asyncRoutes.ts` 中统一维护：

```typescript
// src/router/routes/asyncRoutes.ts
import type { AppRouteRecord } from '@/types/router'
import { RoutesAlias } from '../routesAlias'

const asyncRoutes: AppRouteRecord[] = [
  {
    path: '/setting',
    name: 'Setting',
    component: RoutesAlias.Layout,
    meta: {
      title: 'menus.setting.title',
      icon: 'i-ri-settings-3-line',
      sort: 1001
    },
    children: [
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('@views/settings/profile/index.vue'),
        meta: { title: 'menus.setting.profile', icon: 'i-ri-account-circle-2-line' }
      },
      {
        path: 'roles-permissions',
        name: 'RolesPermissions',
        component: () => import('@views/settings/roles-permissions/index.vue'),
        meta: { title: 'menus.setting.rolesPermissions', icon: 'i-ri-shield-user-line' }
      }
    ]
  }
]

export default asyncRoutes
```

**路由 meta 常用字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `title` | `string` | i18n key，如 `'menus.user.list'` |
| `icon` | `string` | UnoCSS 图标类，如 `'i-ri-user-line'` |
| `isHide` | `boolean` | 是否在侧边栏隐藏 |
| `keepAlive` | `boolean` | 是否缓存页面 |
| `permissions` | `string[]` | 所需权限码 |
| `isFullPage` | `boolean` | 是否全屏页面 |
| `sort` | `number` | 菜单排序 |

## API 模块组织规则

API 文件**平铺在 `src/api/` 下**，按业务域命名，使用 namespace 类型：

```typescript
// src/api/{domain}.ts
import { request } from '@/utils/http'

const prefix = '/api/v1/{portal}/{domain}'   // {portal} 取值：mp | tp | ap | pp | sa，由当前前端项目所属门户类型决定

export function get{Entity}List(params: Api.{Domain}.ListParams) {
  return request.get<Api.{Domain}.ListResult>({
    url: `${prefix}/list`,
    params
  })
}

export function get{Entity}Detail(id: string) {
  return request.get<Api.{Domain}.DetailInfo>({
    url: `${prefix}/${id}`
  })
}

export function create{Entity}(data: Api.{Domain}.CreateReq) {
  return request.post<void>({
    url: prefix,
    data
  })
}
```

对应类型定义在 `src/typings/api.d.ts` 的 `namespace Api` 下：

```typescript
// src/typings/api.d.ts
declare namespace Api {
  namespace {Domain} {
    interface ListParams {
      page: number
      pageSize: number
    }
    interface ListResult {
      list: DetailInfo[]
      total: number
    }
    interface DetailInfo {
      id: string
      // ...
    }
    interface CreateReq {
      // ...
    }
  }
}
```

## Store 组织规则

Store 文件在 `src/store/modules/` 下，每个文件导出一个 `useXxxStore`：

```typescript
// src/store/modules/{name}.ts
import { defineStore } from 'pinia'

export const use{Name}Store = defineStore('{name}', () => {
  // state
  const data = ref<DataType | null>(null)
  const loading = ref(false)

  // getters
  const isReady = computed(() => !!data.value)

  // actions
  async function fetchData() {
    loading.value = true
    try {
      data.value = await getSomeApi()
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

## 组件目录规则

项目文档分为三类：

-   【人维护】  ：README.md、后端接口文档——AI 无法自行决定的方向性内容和外部依赖
-   【人提供】  ：需求变更描述——人描述变更意图，AI 据此更新原型和代码
-   【AI生成/维护】  ：页面原型、任务拆解、技术方案、测试用例、变更记录——AI 在开发流程中自动生成和增量更新

单文件直接放 `index.vue`：
```
components/business/ex-logo/
└── index.vue
```

### 复杂组件

使用目录封装，子组件放 `widget/` 或 `modules/`：
```
components/core/layouts/art-settings-panel/
├── index.vue
├── style.scss
├── composables/
│   ├── useSettingsState.ts
│   └── useSettingsHandlers.ts
└── widget/
    ├── BasicSettings.vue
    └── ColorSettings.vue
```

## 页面私有组件规则

页面私有组件放在页面目录下的 `modules/` 或 `components/` 子目录中，PascalCase 文件名：

```
views/{domain}/{page-name}/
├── index.vue                       # 页面主组件
├── style.scss
└── components/                        # 页面私有组件（PascalCase 文件名）
    ├── FilterForm.vue
    └── DataTable.vue
```

当私有组件被第二个页面引用时，提升到 `components/business/`。

## 路径别名

| 别名 | 解析路径 |
|------|---------|
| `@` | `src/` |
| `@views` | `src/views/` |
| `@utils` | `src/utils/` |
| `@stores` | `src/store/` |
| `@styles` | `src/assets/styles/` |
| `@icons` | `src/assets/icons/` |
| `@imgs` | `src/assets/img/` |

## 文档维护职责

| 文档                                                    | 维护方         | 说明                    |
| ----------------------------------------------------- | ----------- | --------------------- |
| README.md                                             | 人           | 项目概要、技术栈、启动方式、页面清单    |
| docs/backend-apis/                                    | 人           | 后端接口文档，从后端工程同步或手动维护   |
| docs/designs/full-prd.md                              | AI生成，人确认    | 本服务业务设计的全量文档，增量累积     |
| docs/requirements/prototypes/\*.html                  | AI生成/维护，人确认 | 页面原型（静态HTML），AI 生成和更新 |
| docs/requirements/{JIRA}--/{JIRA}-prd--.md | 人提供         | 需求描述，变更场景的必要输入        |
| docs/requirements/{JIRA}--/{JIRA}-taskbreakdown--.md  | AI生成        | 任务拆解文档                |
| docs/designs/full-technical-design.md                 | AI生成，人确认    | 技术方案全景，增量累积           |
| docs/tests/full-testcases.md                          | AI生成，人确认    | 测试用例全景，增量累积           |
| docs/requirements/{JIRA}--/{JIRA}-testcase--.md       | AI生成        | 每次变更的增量测试用例           |
| docs/requirements/{JIRA}--/{JIRA}-integrationtest--.md | AI生成        | 每次变更的联调测试报告          |
| docs/requirements/{JIRA}--/{JIRA}-usertest--.md        | AI生成        | 每次变更的用户测试报告          |
| docs/requirements/{JIRA}--/{JIRA}-changelog--.md      | AI生成        | 每次变更的变更记录             |
| docs/tests/unit-test/**/__tests__/*.spec.ts           | AI生成        | 组件/单元测试代码，全量持续更新     |
| docs/tests/e2e/{domain}/{page-name}.spec.ts           | AI生成        | E2E 用户测试脚本，全量持续更新    |

