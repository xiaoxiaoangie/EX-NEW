---
name: ex-frontend-tech-stack-spec
description: 前端技术栈规范，定义项目允许使用的技术框架、版本号和禁止项。此skill不由用户直接触发，由其他职责skill触发加载。
---

# 前端技术栈规范

> 基于 ex-merchant-portal 实际技术栈，所有代码生成和技术选型必须遵循本规范。

## 核心约束

### 必须遵守

- Vue 3 + Composition API（`<script setup lang="ts">` 语法）
- TypeScript 严格模式
- Vite 作为构建工具
- Pinia 作为状态管理
- Vue Router 4 作为路由
- **UnoCSS** 作为主要样式系统（Tailwind 兼容工具类）
- **Element Plus** 作为 UI 组件库（通过 `unplugin-vue-components` 自动导入）
- **unplugin-auto-import**：Vue 3 API、Vue Router、Pinia、VueUse 均**无需手动 import**
- Vue 3 API（`ref`、`computed`、`watch` 等）全局可用，**禁止** 在组件中手动 import
- HTTP 请求通过 `src/utils/http/` 封装的 `request` 工具，**禁止** 直接使用 axios

### 禁止使用

- Options API（所有组件必须使用 Composition API）
- Vuex（使用 Pinia 替代）
- jQuery 或其他 DOM 操作库
- `any` 类型（除非有充分理由并加注释说明）
- webpack（使用 Vite 替代）
- moment.js（使用 dayjs 替代）
- 在组件中直接 `import { ref } from 'vue'`（已通过 auto-import 全局注入）
- 在组件中直接 `import axios`（必须走 `src/utils/http/` 封装）
- 使用 float 布局

## 技术栈速查

| 类别 | 技术 | 说明 |
|------|------|------|
| 框架 | Vue 3 | Composition API + `<script setup>` |
| 语言 | TypeScript | 严格模式 |
| 构建 | Vite | Dev proxy 配置在 `vite.config.ts` |
| 路由 | Vue Router 4 | 动态路由 + 路由守卫 |
| 状态管理 | Pinia | 含持久化插件，Store 放 `src/store/modules/` |
| HTTP | axios（封装） | 通过 `src/utils/http/` 的 `request` 调用 |
| UI 组件库 | Element Plus | 自动导入，无需手动 import |
| 样式系统 | UnoCSS | Tailwind 兼容工具类，配置在 `uno.config.ts` |
| 图标 | Remix Icon（via UnoCSS presetIcons） | 格式：`i-ri-<icon-name>`，如 `i-ri-home-line` |
| 日期处理 | dayjs | 替代 moment.js |
| 工具库 | VueUse | 已通过 auto-import 全局注入 |
| 国际化 | vue-i18n | `useI18n()` 或模板中 `$t()` |
| 微前端 | @micro-zoe/micro-app | 主应用框架 |
| 事件总线 | mittBus（`src/utils/sys/`） | 跨组件通信 |

## 自动导入说明（重要）

通过 `unplugin-auto-import` 配置，以下内容**全局可用，无需手动 import**：

```typescript
// 以下在任意 .vue / .ts 文件中直接使用，无需 import
ref, reactive, computed, watch, watchEffect,
onMounted, onUnmounted, onBeforeUnmount,
nextTick, provide, inject, toRef, toRefs,
useRouter, useRoute,
defineStore, storeToRefs,
useStorage, useDark, useToggle  // VueUse composables
```

**Element Plus 组件**通过 `unplugin-vue-components` 自动导入，模板中直接使用：
```html
<el-button>按钮</el-button>
<el-table :data="list">...</el-table>
<!-- 无需手动 import ElButton、ElTable -->
```

## 图标使用规范

使用 **Remix Icon** 通过 UnoCSS presetIcons，格式为 `i-ri-<icon-name>`：

```html
<!-- 正确 -->
<span class="i-ri-home-line"></span>
<span class="i-ri-user-3-fill text-xl text-blue-500"></span>

<!-- 也支持字体图标（src/assets/icons/system/iconfont.css）-->
<i class="iconfont icon-xxx"></i>
```

## 样式规范

- **优先使用 UnoCSS 工具类**，如 `flex items-center gap-4 px-6 py-3`
- 组件特有样式写在 `<style scoped>` 或同目录 `style.scss` 中
- 禁止在组件内写全局样式（除 `src/assets/styles/overrides/` 目录）
- 全局 SCSS 变量/mixins 通过 Vite preprocessor 自动注入，直接使用 `$variable` 即可
- 响应式布局用 CSS Grid / Flexbox，或 UnoCSS breakpoint 前缀（`md:`, `lg:` 等）

## HTTP 请求规范

HTTP 客户端封装在 `src/utils/http/`，调用方式：

```typescript
// src/api/{domain}.ts
import { request } from '@/utils/http'
import type { UserInfo, UserListParams, UserListResult, CreateUserReq } from '@/types/api/user'

export function fetchUserList(params: UserListParams) {
  return request.get<UserListResult>({
    url: '/api/v1/mp/user/list',
    params
  })
}

export function createUser(data: CreateUserReq) {
  return request.post<void>({
    url: '/api/v1/mp/user',
    data,
    showSuccessMessage: true   // 成功后自动弹提示
  })
}
```

**request 配置字段：**

| 字段 | 类型 | 说明 |
|------|------|------|
| `url` | `string` | 接口路径 |
| `params` | `object` | GET 查询参数 |
| `data` | `object` | POST/PUT 请求体 |
| `showSuccessMessage` | `boolean` | 成功后弹出提示，默认 `false` |
| `showErrorMessage` | `boolean` | 失败后弹出提示，默认 `true` |

拦截器已自动处理：Authorization header 附加、token 过期刷新、统一错误提示。

## 权限控制规范

通过 `VITE_ACCESS_MODE` 控制权限模式（默认 `backend`）：

```html
<!-- 指令方式（推荐） -->
<el-button v-auth="'user:create'">新建</el-button>
<el-button v-roles="['admin', 'manager']">管理</el-button>

<!-- composable 方式 -->
<script setup lang="ts">
const { hasPermission } = useMpPermission()
const canCreate = computed(() => hasPermission('user:create'))
</script>
```

## i18n 规范

```typescript
// 在 <script setup> 中
const { t } = useI18n()
const title = computed(() => t('menus.user.list'))
```

```html
<!-- 在模板中 -->
<span>{{ $t('common.confirm') }}</span>
```

翻译 key 定义在 `src/locales/langs/zh.json` 和 `en.json`。

## 测试技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| 单元/组件测试 | Vitest | latest |
| 组件测试工具 | @vue/test-utils | 2.x |
| E2E 测试 | Playwright | latest |

## 代码质量

| 类别 | 技术 | 说明 |
|------|------|------|
| Lint | ESLint | Flat Config（`eslint.config.mjs`），单引号，无分号 |
| 格式化 | Prettier | 配合 ESLint |
| Git Hook | husky + lint-staged | 提交前自动 lint |
| Commit | Commitizen | `pnpm commit` 交互式提交，格式 `FEAT(TICKET): desc` |
| 样式 Lint | Stylelint | `pnpm lint:stylelint` |
