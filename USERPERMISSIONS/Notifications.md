# EX Platform — 通知矩阵（TP/MP · 模块化）

> 版本：v1.1 | 更新日期：2026-05-08 14:55 (UTC+8)
> 来源：SigninLogin/prd/MP-register.md · IA-TP/tp-login-v2.html · IA-TP/tp-personal-profile.html · EXGLOSSARY/EX-glossary.md

---

## 0. 术语对齐（摘自 EX Glossary）

- **Tenant (TP)**：租户侧门户（Tenant Portal）
- **Merchant (MP)**：商户侧门户（Merchant Portal），商户=企业客户
- **OTP**：一次性验证码（One-Time Password），本文件统一用变量 `otp_code`
- **2FA**：双因素认证（Authenticator App / SMS / Email）
- **Payment PIN**：交易密码（Identity 级，6 位数字）
- **Designated Phone**：安全验证手机号（MID/Merchant 级）

---

## 1. 渠道与通用规则

- 渠道类型：
  - 邮件（Email）
  - 短信（SMS）
  - 站内信（In-App / 通知中心）
- 约束与约定：
  - 验证类消息（含 `otp_code`）仅支持 邮件/SMS，不支持站内信承载验证码。
  - 激活/邀请使用激活链接（activation link），不使用系统生成临时密码。
  - 安全事件（冻结、解冻、新设备登录、支付密码锁定）默认 邮件+SMS，并在站内信保留一条可追溯记录。
  - 邮件发件人：`noreply@ex-platform.com`
  - 短信签名：统一以【EX Platform】开头
  - 语言：随用户 Identity 的语言偏好

---

## 2. 通知矩阵总览（按端与模块）

- TP（Tenant Portal）
  - 注册/激活：激活链接邮件；站内信镜像
  - 登录：忘记密码 OTP；新设备登录；账户冻结/解冻
  - 个人中心：绑定/变更手机号 OTP；修改密码成功通知
- MP（Merchant Portal）
  - 注册/激活：验证码注册（邮箱/手机）；邮箱/手机号邀请加入商户（激活链接/SMS 提醒）
  - 登录：忘记密码 OTP；新设备登录；账户冻结
  - 个人中心：首次设置/修改密码成功；绑定/变更手机号 OTP/成功通知
  - 资金与 On/Off-Ramp：
    - Self：交易发起人使用 `otp_code` 或 Payment PIN（优先 PIN）
    - Designated：验证码发往 Designated Phone（SMS），操作者收到站内信提示“待指定手机号确认”
  - 开发者中心：API Key 新建/重置/删除、IP 白名单更新、Webhook Secret 重置（邮件+站内信）

---

## 3. 具体场景与渠道（含模板摘要）

### 3.1 注册/激活（Registration & Activation）

- TP-REG-01 激活链接（管理员邀请/开通）
  - 渠道：邮件 + 站内信（镜像，无验证码）
  - 触发：收到 TP 邀请/激活，链接有效期 24h（见 tp-login-v2.html）
  - 邮件 EN 题目：Activate Your EX Partner Portal Account
  - 邮件 ZH 摘要：请点击以下链接完成激活并设置密码。链接 24 小时内有效：{activation_link}

- MP-REG-01 验证码注册（邮箱/手机）
  - 渠道：邮件 / 短信（仅其一，取决于凭证类型）
  - 摘要：Your verification code is {otp_code}. Valid for 5 minutes.

- MP-REG-02 邮箱邀请加入商户（激活链接）
  - 渠道：邮件 + 站内信（登录后可见“你有一条待接受的邀请”）
  - 触发：Owner/Admin 通过邮箱邀请加入 {merchant_name}，有效期 7 天
  - 邮件 EN 题目：You've been invited to join {merchant_name} on EX Platform
  - 邮件 ZH 摘要：{inviter_name} 邀请你加入 {merchant_name}（角色：{role_names}）。请在 7 天内完成激活：{activation_link}

- MP-REG-03 手机号邀请加入商户（提醒）
  - 渠道：短信
  - 摘要：【EX Platform】{inviter_name} 邀请你加入 {merchant_name}。请在 MP 端注册/登录后接受邀请。

### 3.2 登录（Sign-In）与账号安全

- ALL-AUTH-01 忘记密码 OTP
  - 端：TP/MP
  - 渠道：邮件 / 短信（验证码）
  - 摘要：Your password reset code is {otp_code}. Valid for 5 minutes.

- ALL-AUTH-02 新设备登录提醒
  - 端：TP/MP
  - 渠道：邮件 + 站内信
  - 摘要：{datetime} 检测到在 {device}（{ip}, {location}）登录。如非本人，请尽快修改密码。

- ALL-AUTH-03 密码错误 5 次账户冻结（TP：24h；MP：24h）
  - 渠道：邮件 + 短信 + 站内信
  - 摘要：因连续 5 次密码错误，你的账户已临时冻结 24 小时。可通过重置密码提前解冻。

- TP-AUTH-04 账户解冻通知
  - 渠道：邮件 + 站内信
  - 摘要：你的账户冻结已解除，可正常登录。为安全起见，建议修改密码。

- ALL-2FA-05 2FA 挑战（仅密码登录触发）
  - 渠道：邮件 / 短信（验证码）；站内信不承载验证码
  - 摘要：Your 2FA verification code is {otp_code}. Valid for 5 minutes.

### 3.3 个人中心（Profile & Security）

- ALL-PROF-01 绑定/变更手机号 — 验证码（原/新号）
  - 渠道：短信（发送至原手机号验证身份；发送至新手机号完成绑定）
  - 提示：站内信不承载验证码；可在站内信记录“手机号已变更”

- ALL-PROF-02 变更手机号成功通知
  - 渠道：邮件 + 站内信
  - 摘要：你的登录手机号已于 {datetime} 变更为 {masked_phone}。如非本人操作请立即联系客服。

- ALL-PROF-03 首次设置/修改登录密码成功
  - 渠道：邮件 + 站内信
  - 摘要：你的登录密码已于 {datetime} 更新。如非本人操作请立即重置密码。

- ALL-PROF-04 启用/重置 2FA 成功
  - 渠道：邮件 + 站内信
  - 摘要：你的 2FA 设置已更新（默认方式：{factor}）。

### 3.4 资金与 On/Off-Ramp（基于 MP-register §7.6/7.8）

- MP-FUND-01 资金操作（Self）— 校验
  - 渠道：
    - 若已设置 Payment PIN：输入 PIN；失败 5 次 → 支付密码锁定（见 MP-FUND-03）
    - 未设置 PIN：邮件 / 短信发送 `otp_code`
  - 站内信：不含验证码；可记录“你发起的操作已通过验证/失败”

- MP-FUND-02 资金操作（Designated）— 指定手机号校验
  - 渠道：短信（发送到 Designated Phone 的号码）
  - 站内信：操作者收到“待指定手机号确认”；验证通过/超时也产生站内信记录

- MP-FUND-03 支付密码（PIN）连续错误 5 次 — 锁定 30 分钟
  - 渠道：邮件 + 短信 + 站内信
  - 摘要：你的支付密码因连续 5 次输入错误已锁定 30 分钟。期间将降级为验证码验证。

### 3.5 开发者中心（Developer Center）

- MP-DEV-01 API Key 新建/重置/删除
  - 渠道：邮件 + 站内信
  - 摘要：API Key（后 4 位 {api_key_last4}）已{op}。若非本人操作请立即禁用并轮换。

- MP-DEV-02 IP 白名单（Allowlist）更新
  - 渠道：邮件 + 站内信
  - 摘要：你的 API IP 白名单已更新：{ip_allowlist_delta}。若非本人操作请回滚。

- MP-DEV-03 Webhook Secret 重置
  - 渠道：邮件 + 站内信
  - 摘要：Webhook Secret 已更新。请同步更新你系统的签名校验配置。

---

## 4. 模板（精简版）

说明：以下为可复用片段；完整 HTML/短信文案在工程实现时落版。

- 激活链接（TP/MP 邮件）
  - EN Subject: Activate Your EX {portal} Account
  - EN Body: Click the button below to activate your account for {tenant_name}/{merchant_name}. This link expires in {link_expire_hours} hours: {activation_link}
  - ZH 主题：激活你的 {portal_cn} 账户
  - ZH 正文：请点击以下链接完成激活并设置密码，{link_expire_hours} 小时内有效：{activation_link}

- 验证码短信/邮件（通用）
  - EN: 【EX Platform】Your verification code is {otp_code}. Valid for 5 minutes. If this wasn’t you, ignore this message.
  - ZH：【EX Platform】你的验证码为 {otp_code}，5 分钟内有效。如非本人操作请忽略。

- 新设备登录（邮件/站内信）
  - EN: New device login on {datetime} from {device} ({ip}, {location}). If this wasn’t you, change your password immediately.
  - ZH：{datetime} 在 {device}（{ip}，{location}）有一次新登录。如非本人，请立即修改密码。

- 冻结/解冻/锁定（邮件/短信/站内信）
  - 冻结：你的账户因连续 5 次密码错误已冻结 24 小时，可通过重置密码提前解冻。
  - 解冻：你的账户冻结已解除，可正常登录。
  - PIN 锁定：你的支付密码因连续 5 次输入错误已锁定 30 分钟，期间将改为验证码验证。

- 开发者中心（邮件/站内信）
  - API Key：API Key（后 4 位 {api_key_last4}）已{op}（Created/Rotated/Deleted）。
  - Allowlist：IP 白名单已更新：{ip_allowlist_delta}。
  - Webhook Secret：Webhook Secret 已重置，请同步更新。

---

## 5. 模板变量说明

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `{tenant_name}` | 租户名称 | Fulunited Limited |
| `{merchant_name}` | 商户名称 | ABC Trading |
| `{inviter_name}` | 邀请人姓名 | Zhang San |
| `{role_names}` | 角色名称（逗号分隔） | Admin, Finance |
| `{otp_code}` | 6 位验证码 | 382916 |
| `{activation_link}` | 激活链接 URL | https://portal.ex.com/activate?... |
| `{link_expire_hours}` | 链接有效期（小时） | 24 / 168 |
| `{datetime}` | 操作时间 | 2026-03-08 17:45 (UTC+8) |
| `{device}` | 设备信息 | Chrome 120 · macOS |
| `{ip}` | IP 地址 | 203.0.113.42 |
| `{location}` | 位置 | Hong Kong |
| `{masked_phone}` | 掩码手机号 | +852 •••• 2374 |
| `{factor}` | 2FA 默认方式 | Authenticator / SMS / Email |
| `{operator_name}` | 操作者姓名 | Li Si |
| `{action_desc}` | 操作摘要 | Off-Ramp 10,000 USD |
| `{api_key_last4}` | API Key 后 4 位 | 7A3F |
| `{op}` | 操作动作 | Created / Rotated / Deleted |
| `{ip_allowlist_delta}` | 变更内容 | +1.2.3.4, -5.6.7.8 |

---

注：本文件仅定义触达策略与模板摘要；详细 UI/落版与频控（Rate Limit）按渠道规范执行。
