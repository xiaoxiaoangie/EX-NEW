# EX Platform — Developer Module PRD

## 文档概述

本文档定义 MP 端 Developer 模块的业务规则，包含 **API Keys**（API 密钥管理）和 **Webhooks**（事件通知配置）两个子模块。

**设计参考：** Stripe、Adyen、Airwallex 等业界标准。

---

## 1. API Keys（API 密钥管理）

### 1.1 密钥类型

| 类型 | 前缀 | 用途 | 安全级别 |
|------|------|------|----------|
| **Publishable Key** | `pk_live_` / `pk_test_` | 客户端使用（前端/SDK），仅可发起有限操作（如创建 token） | 低（可暴露在前端） |
| **Secret Key** | `sk_live_` / `sk_test_` | 服务端使用，可执行所有 API 操作 | **高（绝不可暴露）** |

### 1.2 环境区分

| 环境 | 说明 | 数据 |
|------|------|------|
| **Live** | 生产环境，真实交易 | 真实资金流转 |
| **Test** | 测试环境，模拟交易 | 不产生真实资金，可自由测试 |

### 1.3 Standard Keys 规则

> **MVP 阶段：** 仅提供 Standard Keys（每环境一对 Publishable + Secret），拥有所有 API 权限。Restricted Keys（按模块配置权限范围）后续版本支持。

- 每个环境（Live / Test）各一对：Publishable + Secret
- 拥有该环境下的所有 API 权限
- 不可删除，只能 Rotate（轮换）
- MID 开通时系统自动生成两个环境的密钥对

### 1.4 密钥轮换（Rotate）

用于定期更新密钥或密钥泄露时紧急替换。

**轮换规则：**

- 系统生成新密钥，新密钥立即生效
- 旧密钥可设过渡期：立即失效 / 24h / 48h / 72h（默认 24h）
- 过渡期内新旧密钥均可使用，方便商户迁移
- 新密钥仅在轮换时完整显示一次，之后永久隐藏
- 建议每 90 天轮换一次（系统可配置提醒）

### 1.5 密钥安全规则

| 规则 | 说明 |
|------|------|
| **仅显示一次** | Secret Key 创建 / 轮换后仅完整显示一次，之后只显示末 4 位 |
| **Publishable Key** | 可随时查看完整值（前端使用，非敏感） |
| **Reveal 操作** | Secret Key 的 Reveal 需要二次验证（密码或 2FA） |
| **操作日志** | 所有密钥操作（轮换 / Reveal）记录审计日志 |
| **Live vs Test** | Live 环境轮换需二次验证；Test 环境不需要，降低调试门槛 |

---

## 2. Webhooks（事件通知）

### 2.1 概述

商户配置 HTTP 回调 URL（Endpoint），当特定事件发生时，系统自动向该 URL 发送 POST 请求通知。

### 2.2 Endpoint 规则

**配置项：**

| 配置项 | 必填 | 说明 |
|--------|------|------|
| **URL** | ✅ | 回调地址，必须 HTTPS |
| **Description** | ❌ | 描述，便于识别 |
| **Events** | ✅ | 订阅的事件类型，至少选一个 |

**Endpoint 状态：**

| 状态 | 触发条件 |
|------|----------|
| **Active** | 最近投递成功 |
| **Failing** | 连续 3 次投递失败 |
| **Disabled** | 手动禁用，或连续失败超过 3 天系统自动禁用（发送邮件通知） |

**其他规则：**

- Live / Test 环境独立配置，互不影响
- 每个 MID 每个环境最多 16 个 Endpoint
- 创建 Endpoint 时系统生成 Signing Secret（`whsec_` 前缀），仅显示一次
- Signing Secret 支持 Rotate，规则同 API Key 轮换

### 2.3 事件类型

按业务模块分类，商户可按需订阅：

| 分类 | 事件 | 说明 |
|------|------|------|
| **Payin** | `payin.created` | 入金订单创建 |
| | `payin.completed` | 入金到账 |
| | `payin.failed` | 入金失败 |
| **Payout** | `payout.created` | 出金订单创建 |
| | `payout.processing` | 出金处理中 |
| | `payout.completed` | 出金成功 |
| | `payout.failed` | 出金失败 |
| | `payout.reversed` | 出金退回 |
| **Exchange** | `exchange.completed` | 兑换完成 |
| | `exchange.failed` | 兑换失败 |
| **Card** | `card.created` | 卡创建成功 |
| | `card.activated` | 卡激活 |
| | `card.transaction` | 卡交易通知 |
| | `card.frozen` | 卡冻结 |
| **Balance** | `balance.updated` | 余额变动 |
| | `balance.low` | 余额低于阈值 |
| **Checkout** | `checkout.session.completed` | 收银台支付完成 |
| | `checkout.session.expired` | 收银台会话过期 |
| **Refund** | `refund.created` | 退款发起 |
| | `refund.completed` | 退款完成 |
| | `refund.failed` | 退款失败 |

### 2.4 投递机制

**请求格式：**

```http
POST {endpoint_url}
Content-Type: application/json
X-EX-Signature: sha256=...
X-EX-Timestamp: {unix_timestamp}
X-EX-Event-ID: evt_{id}
X-EX-Event-Type: {event_type}
```

**签名验证规则：**

```
signature = HMAC-SHA256(signing_secret, timestamp + "." + request_body)
```

- 商户端从 Header 取 `X-EX-Timestamp` 和 `X-EX-Signature`
- 检查 timestamp 是否在 5 分钟内（防重放攻击）
- 用 Signing Secret 计算签名并比对

**成功条件：** 商户端返回 `2xx` 状态码（200-299），视为投递成功。

**重试策略（指数退避）：**

| 重试次数 | 间隔 | 累计时间 |
|----------|------|----------|
| 第 1 次 | 1 分钟 | 1 分钟 |
| 第 2 次 | 5 分钟 | 6 分钟 |
| 第 3 次 | 30 分钟 | 36 分钟 |
| 第 4 次 | 2 小时 | ~2.5 小时 |
| 第 5 次 | 8 小时 | ~10.5 小时 |
| 第 6 次（最后） | 24 小时 | ~34.5 小时 |

**失败处理：**

- 返回非 2xx 或超时（30 秒）→ 标记失败，进入重试队列
- 6 次重试均失败 → 该事件标记为 `failed`
- 连续 3 天所有投递失败 → Endpoint 自动禁用，发送邮件通知商户

### 2.5 调试工具

- **Send Test Event**：选择事件类型，发送模拟 payload 到 Endpoint，仅 Test 环境可用
- **投递日志**：查看每次投递的 Request / Response / 耗时 / 重试历史

---

## 3. 权限与安全

### 3.1 模块权限

| 操作 | 所需权限 |
|------|----------|
| 查看 API Keys / Webhooks | Developer: View |
| Reveal Secret Key / Signing Secret | Developer: Operate + 二次验证 |
| 轮换密钥 / 管理 Endpoint | Developer: Operate |

### 3.2 二次验证要求

以下操作需要二次验证（密码或 2FA）：

- Reveal Secret Key / Signing Secret
- 轮换 Live 环境密钥
- 删除 Webhook Endpoint

> Test 环境的操作不需要二次验证，降低开发调试门槛。

### 3.3 审计日志

所有 Developer 模块操作记录审计日志，字段包括：操作时间、操作人（Identity + User）、操作类型、操作对象、来源 IP、环境（Live / Test）。

---

## 4. 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-02-14 | 初始版本：API Keys + Webhooks |
