# EX Platform - User System PRD

## 文档概述

本文档定义EX平台用户系统的产品需求，涵盖用户注册登录、用户中心（Profile & Security）以及用户与商户（MID）的关系模型。

**核心设计理念：**

- ✅ **验证码登录即注册**：无需单独注册流程，首次验证码登录自动创建账户
- ✅ **多凭证支持**：一个User可绑定多个登录凭证（邮箱/手机号）
- ✅ **多商户关联**：一个User可在多个MID下，且角色/权限可不同
- ✅ **安全优先**：支持密码 + 2FA双因素认证，保障账户安全

---

## 目录

1. [系统架构概览](#1-系统架构概览)
2. [模块总览与Scope](#2-模块总览与scope)
3. [Use Case](#3-use-case)
4. [登录注册模块](#4-登录注册模块)
5. [User Center - Profile](#5-user-center---profile)
6. [User Center - Security](#6-user-center---security)
7. [User与MID关系模型](#7-user与mid关系模型)
8. [状态机](#8-状态机)

---

## 1. 系统架构概览

### 1.1 用户系统整体架构

```mermaid
graph TB
    subgraph "用户入口"
        A[登录/注册页面]
    end

    subgraph "认证方式"
        B1[验证码登录<br/>邮箱/手机号]
        B2[密码登录<br/>邮箱/手机号]
    end

    subgraph "用户系统核心"
        C[User ID]
        D1[凭证管理<br/>邮箱 / 手机号]
        D2[安全管理<br/>密码 / 2FA]
        D3[用户信息<br/>昵称 / 语言]
    end

    subgraph "商户关联"
        E1[MID-A<br/>角色: Owner]
        E2[MID-B<br/>角色: Admin]
        E3[MID-C<br/>角色: Member]
    end

    A --> B1
    A --> B2
    B1 --> C
    B2 --> C
    C --> D1
    C --> D2
    C --> D3
    C --> E1
    C --> E2
    C --> E3
```

### 1.2 User-MID 关系模型

```mermaid
graph LR
    subgraph User Layer
        U1[User A uid: U001]
        U2[User B uid: U002]
        U3[User C uid: U003]
    end

    subgraph Credential Layer
        C1[email atest.com]
        C2[mobile 8529641xxxx]
        C3[email btest.com]
        C4[mobile  86138xxxx]
        C5[email ctest.com]
    end

    subgraph Merchant Layer
        M1[MID-001 ABC Trading]
        M2[MID-002 XYZ Corp]
        M3[MID-003 Global Inc]
    end

    U1 --- C1
    U1 --- C2
    U2 --- C3
    U2 --- C4
    U3 --- C5

    U1 -->|Owner| M1
    U1 -->|Member| M2
    U2 -->|Admin| M1
    U2 -->|Owner| M2
    U3 -->|Owner| M3
    U3 -->|Member| M1
```

**关键关系说明：**

- **User ↔ Credential**：一对多，一个User可绑定多个邮箱/手机号
- **User ↔ MID**：多对多，一个User可属于多个MID，一个MID可有多个User
- **User-MID角色**：每个User在不同MID下可拥有不同角色（Owner / Admin / Member）

---

## 2. 模块总览与Scope

### 2.1 登录注册模块

| 维度                   | 内容                                                                                                                                                                                                                                               |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **In Scope**     | ① 邮箱验证码登录（登录即注册）``② 手机号验证码登录（登录即注册）``③ 密码登录（邮箱/手机号 + 密码）``④ 基于IP自动识别国家区号``⑤ 密码强度校验（≥8位，大小写+数字/符号）``⑥ 验证码发送与校验（5分钟有效期）``⑦ 首次登录创建User ID并设置昵称 |
| **Out of Scope** | ① 第三方登录（Google / Apple / WeChat）``② SSO单点登录``③ 企业域名登录 ``④ 生物识别登录（指纹/面容）``⑤ 登录IP白名单                                                                                                                          |

### 2.2 User Profile 模块

| 维度                   | 内容                                                                                                                                                                                                            |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **In Scope**     | ① Contact & Login Method 管理 ``　- Email 查看/修改/验证状态``　- Mobile 查看/修改/验证状态 ``　- Login method 选择（Email / Mobile）``② 昵称设置（含默认昵称规则）``③ 语言偏好设置``④ 修改凭证需验证旧凭证 |
| **Out of Scope** | ① 头像上传 ``② 时区设置``③ 通知偏好设置（Notifications）``④ 关联账户管理（Accounts）``⑤ 助手/代理人管理（Assistants）``⑥ 账号注销                                                                         |

### 2.3 Security 模块

| 维度                   | 内容                                                                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **In Scope**     | ① 密码修改（需验证旧密码）``② 2FA双因素认证``　- Authenticator App（TOTP，可设为Default）``　- SMS验证码``③ Recovery Codes 生成与管理 |
| **Out of Scope** | ① 登录历史/设备管理 ``② 会话管理（强制登出其他设备）``③ API Key管理 ``④ 安全日志审计``⑤ 账号冻结/解冻                               |

---

## 3. Use Case

### 3.1 登录注册 Use Case

```mermaid
graph LR
    User((User))

    subgraph "登录注册"
        UC1[验证码登录/注册<br/>邮箱]
        UC2[验证码登录/注册<br/>手机号]
        UC3[密码登录]
        UC4[设置密码<br/>首次登录后]
        UC5[忘记密码<br/>通过验证码重置]
    end

    subgraph "系统行为"
        S1[IP识别国家区号]
        S2[发送验证码]
        S3[校验密码强度]
        S4[创建User ID]
        S5[生成默认昵称]
    end

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5

    UC1 --> S2
    UC2 --> S1
    UC2 --> S2
    UC4 --> S3
    UC5 --> S2
    UC1 --> S4
    UC2 --> S4
    S4 --> S5
```

### 3.2 User Center Use Case

```mermaid
graph LR
    User((User))

    subgraph "Profile"
        P1[查看/修改 Email]
        P2[查看/修改 Mobile]
        P3[选择 Login Method]
        P4[修改昵称]
        P5[设置语言偏好]
    end

    subgraph "Security"
        S1[修改密码]
        S2[启用/管理<br/>Authenticator App]
        S3[启用/管理<br/>SMS 2FA]
        S4[生成<br/>Recovery Codes]
    end

    subgraph "验证"
        V1[验证旧凭证]
        V2[验证新凭证]
    end

    User --> P1
    User --> P2
    User --> P3
    User --> P4
    User --> P5
    User --> S1
    User --> S2
    User --> S3
    User --> S4

    P1 --> V1
    P1 --> V2
    P2 --> V1
    P2 --> V2
    S1 --> V1
```

---

## 4. 登录注册模块

### 4.1 验证码登录/注册流程

**核心规则：验证码登录即注册，无需单独注册入口。**

```mermaid
flowchart TD
    A[用户访问登录页] --> B{选择登录方式}

    B -->|邮箱| C1[输入邮箱地址]
    B -->|手机号| C2[输入手机号]

    C2 --> C2a[系统基于IP自动填充区号]
    C2a --> C2b[用户可手动修改区号]

    C1 --> D{选择验证方式}
    C2b --> D

    D -->|验证码| E1[点击 发送验证码]
    D -->|密码| E2[输入密码]

    E1 --> F1[系统发送验证码<br/>有效期5分钟]
    F1 --> G1[用户输入验证码]
    G1 --> H1{验证码是否正确}

    H1 -->|正确| I{该凭证是否已注册}
    H1 -->|错误| G1a[提示验证码错误<br/>可重新输入]

    I -->|已注册| J1[直接登录<br/>进入工作台]
    I -->|未注册| J2[自动创建User ID]

    J2 --> K[生成默认昵称]
    K --> L[引导设置密码<br/>可跳过]
    L --> M[登录成功<br/>进入工作台]

    E2 --> H2{密码是否正确}
    H2 -->|正确| H2a{是否开启了2FA}
    H2 -->|错误| H2b[提示密码错误]

    H2a -->|是| H2c[要求输入2FA验证码]
    H2a -->|否| J1
    H2c --> H2d{2FA验证通过}
    H2d -->|是| J1
    H2d -->|否| H2e[提示2FA验证失败]
```

### 4.2 IP自动识别区号规则

```mermaid
flowchart TD
    A[用户选择手机号登录] --> B[获取用户IP地址]
    B --> C{IP地理位置识别}

    C -->|识别成功| D[自动填充对应国家区号<br/>如: 中国+86, 香港+852, 美国+1]
    C -->|识别失败| E[默认填充 +1<br/>美国区号]

    D --> F[用户可手动修改区号]
    E --> F

    F --> G[显示国家/区号下拉选择器<br/>支持搜索国家名称或区号]
```

**区号识别规则：**

- 根据用户当前IP地址判断所在国家
- 自动填充该国家的国际区号
- 如果IP无法识别国家，默认使用 **+1**（美国）
- 用户可以通过下拉选择器手动修改区号
- 下拉选择器支持按国家名称或区号搜索

### 4.3 密码强度规则

密码必须满足以下**全部**条件：

| 规则       | 要求                               |
| ---------- | ---------------------------------- |
| 最小长度   | ≥ 8 个字符                        |
| 大写字母   | 至少包含 1 个大写字母（A-Z）       |
| 小写字母   | 至少包含 1 个小写字母（a-z）       |
| 数字或符号 | 至少包含 1 个数字（0-9）或特殊符号 |

**UI交互：**

- 输入密码时实时校验，逐条显示是否满足
- 满足的条件显示 ✅ 绿色勾
- 未满足的条件显示 ○ 灰色
- 提示文案："For improved security, avoid passwords used with other websites."

### 4.4 验证码规则

| 规则         | 说明                                |
| ------------ | ----------------------------------- |
| 验证码格式   | 6位数字                             |
| 有效期       | 5分钟                               |
| 发送频率限制 | 同一凭证60秒内只能发送1次           |
| 每日发送上限 | 同一凭证每天最多10次                |
| 错误次数限制 | 连续5次输入错误，锁定15分钟         |
| 发送渠道     | 邮箱：邮件发送``手机号：SMS短信发送 |

### 4.5 首次登录后行为

```mermaid
flowchart TD
    A[验证码登录成功<br/>新用户首次登录] --> B[创建User ID]
    B --> C[生成默认昵称]
    C --> D[弹出引导页]

    D --> E{引导设置密码}
    E -->|设置| F[输入密码<br/>校验密码强度]
    E -->|跳过| G[进入工作台]

    F --> F1{密码强度通过}
    F1 -->|通过| F2[密码设置成功]
    F1 -->|不通过| F3[提示不满足的规则]
    F3 --> F

    F2 --> G
```

**默认昵称规则：**

- 邮箱注册：取邮箱 `@` 前面的部分作为昵称（如 `john@test.com` → `john`）
- 手机号注册：`User_` + 手机号后4位（如 `+852 96412374` → `User_2374`）
- 昵称可在 User Profile 中修改

---

## 5. User Center - Profile

### 5.1 模块概览

User Profile 页面包含以下信息模块：

```
┌─────────────────────────────────────────────────┐
│  Profile    Security                             │
│  ────────                                        │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │  Contact & login method                     │ │
│  │                                             │ │
│  │  Email    [Verified]                  Edit  │ │
│  │  liuxiaoxiaoangie@gmail.com                 │ │
│  │                                             │ │
│  │  Mobile   [Verified]                  Edit  │ │
│  │  +852 96412374                              │ │
│  │                                             │ │
│  │  Login method  ⓘ                      Edit  │ │
│  │  Email                                      │ │
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │  Basic info                                 │ │
│  │                                             │ │
│  │  Nickname                             Edit  │ │
│  │  john                                       │ │
│  │                                             │ │
│  │  Language                             Edit  │ │
│  │  English                                    │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 5.2 Contact & Login Method

#### 5.2.1 Email 管理

**查看状态：**

- 显示当前绑定的邮箱地址
- 显示验证状态标签：`Verified`（绿色）/ `Unverified`（灰色）

**修改邮箱流程：**

```mermaid
flowchart TD
    A[点击 Email 的 Edit 按钮] --> B[弹出修改邮箱弹窗]

    B --> C[Step 1: 验证当前凭证]
    C --> C1{当前有哪些已验证凭证}

    C1 -->|有已验证邮箱| C2[向当前邮箱发送验证码]
    C1 -->|只有已验证手机号| C3[向当前手机号发送验证码]

    C2 --> D[输入验证码完成身份验证]
    C3 --> D

    D --> E[Step 2: 输入新邮箱地址]
    E --> F[向新邮箱发送验证码]
    F --> G[输入新邮箱收到的验证码]
    G --> H{验证码正确}

    H -->|正确| I[邮箱修改成功<br/>新邮箱状态: Verified]
    H -->|错误| G1[提示验证码错误]
```

#### 5.2.2 Mobile 管理

**查看状态：**

- 显示当前绑定的手机号（含区号）
- 显示验证状态标签：`Verified`（绿色）/ `Unverified`（灰色）

**修改手机号流程：**

```mermaid
flowchart TD
    A[点击 Mobile 的 Edit 按钮] --> B[弹出修改手机号弹窗]

    B --> C[Step 1: 验证当前凭证]
    C --> C1{当前有哪些已验证凭证}

    C1 -->|有已验证手机号| C2[向当前手机号发送验证码]
    C1 -->|只有已验证邮箱| C3[向当前邮箱发送验证码]

    C2 --> D[输入验证码完成身份验证]
    C3 --> D

    D --> E[Step 2: 输入新手机号<br/>选择区号 + 输入号码]
    E --> F[向新手机号发送验证码]
    F --> G[输入新手机号收到的验证码]
    G --> H{验证码正确}

    H -->|正确| I[手机号修改成功<br/>新手机号状态: Verified]
    H -->|错误| G1[提示验证码错误]
```

#### 5.2.3 Login Method 设置

**说明：** 用户可以选择默认的登录方式（Email 或 Mobile），决定登录页面默认显示哪种输入方式。

**规则：**

- 只有已验证的凭证才能被设为 Login Method
- 如果只绑定了一个凭证，该凭证自动成为 Login Method
- 修改 Login Method 无需额外验证

#### 5.2.4 添加第二个凭证

**场景：** 用户注册时只绑定了邮箱，后续想添加手机号（或反之）。

```mermaid
flowchart TD
    A[用户当前只有邮箱<br/>Mobile 显示为空] --> B[点击 Mobile 的 Add 按钮]

    B --> C[Step 1: 验证当前邮箱]
    C --> D[向当前邮箱发送验证码]
    D --> E[输入验证码完成身份验证]

    E --> F[Step 2: 输入新手机号<br/>选择区号 + 输入号码]
    F --> G[向新手机号发送验证码]
    G --> H[输入验证码]
    H --> I{验证码正确}

    I -->|正确| J[手机号绑定成功<br/>状态: Verified]
    I -->|错误| H1[提示验证码错误]
```

### 5.3 Basic Info

#### 5.3.1 昵称

- 显示当前昵称
- 点击 Edit 可直接修改，无需额外验证
- 昵称长度限制：2-30个字符
- 支持中文、英文、数字、下划线
- 不支持特殊符号和emoji

**默认昵称生成规则：**

| 注册方式 | 默认昵称                | 示例                               |
| -------- | ----------------------- | ---------------------------------- |
| 邮箱     | 邮箱@前的部分           | `john@test.com` → `john`      |
| 手机号   | `User_` + 手机号后4位 | `+852 96412374` → `User_2374` |

#### 5.3.2 语言偏好

- 支持语言列表：English / 简体中文 / 繁體中文（可后续扩展）
- 修改语言后立即生效，页面自动切换
- 默认语言根据IP所在地区自动设置

---

## 6. User Center - Security

### 6.1 模块概览

```
┌─────────────────────────────────────────────────┐
│  Profile    Security                             │
│             ────────                             │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │  Password                                   │ │
│  │  Choose a strong password to keep      Change│ │
│  │  your account safe.                         │ │
│  └─────────────────────────────────────────────┘ │
│                                                  │
│  ┌─────────────────────────────────────────────┐ │
│  │  Two-factor authentication (2FA)            │ │
│  │  2FA adds a layer of security that          │ │
│  │  requires an additional authentication      │ │
│  │  method to log in.  Learn more              │ │
│  │                                             │ │
│  │  Authenticator app  [Default]          ···  │ │
│  │  Use a 3rd party authenticator app to       │ │
│  │  receive an authentication code.            │ │
│  │                                             │ │
│  │  SMS                                Set up  │ │
│  │  Receive an authentication code via SMS.    │ │
│  │                                             │ │
│  │  Generate recovery codes to log in and      │ │
│  │  edit your 2FA method in case you lose      │ │
│  │  2FA access.                                │ │
│  └─────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────┘
```

### 6.2 密码修改

```mermaid
flowchart TD
    A[点击 Password 的 Change 按钮] --> B{用户当前是否已设置密码}

    B -->|已设置| C[弹出修改密码弹窗]
    B -->|未设置<br/>验证码注册跳过了设置密码| D[弹出设置密码弹窗]

    C --> E[输入当前密码]
    E --> F{当前密码正确}
    F -->|正确| G[输入新密码]
    F -->|错误| E1[提示当前密码错误]

    D --> G

    G --> H[实时校验密码强度<br/> 大于等于8位 大写 写 数字/符号]
    H --> I[确认新密码<br/>二次输入]
    I --> J{两次密码一致}

    J -->|一致| K[密码修改/设置成功]
    J -->|不一致| I1[提示两次密码不一致]
```

**密码修改规则：**

- 新密码不能与当前密码相同
- 必须满足密码强度要求
- 修改成功后，其他设备的登录状态不受影响（本期）

### 6.3 Two-Factor Authentication (2FA)

#### 6.3.1 Authenticator App

**启用流程：**

```mermaid
flowchart TD
    A[点击 Authenticator App 的 Set up] --> B[弹出设置向导]

    B --> C[Step 1: 显示二维码<br/>和手动输入的密钥]
    C --> D[用户使用 Authenticator App<br/>扫描二维码或手动输入密钥<br/>如: Google Authenticator / Authy]

    D --> E[Step 2: 输入 App 上显示的<br/>6位验证码进行确认]
    E --> F{验证码正确}

    F -->|正确| G[Authenticator App 启用成功]
    F -->|错误| E1[提示验证码错误<br/>请重试]

    G --> H{是否为第一个2FA方式}
    H -->|是| I[自动设为 Default]
    H -->|否| J[用户可选择是否设为 Default]
```

**已启用后的管理（点击 ··· 按钮）：**

- **Set as Default**：设为默认2FA方式
- **Regenerate**：重新生成密钥（需先验证身份）
- **Disable**：关闭 Authenticator App 2FA

#### 6.3.2 SMS 2FA

**启用流程：**

```mermaid
flowchart TD
    A[点击 SMS 的 Set up] --> B{用户是否已绑定手机号}

    B -->|已绑定| C[向已绑定手机号发送验证码]
    B -->|未绑定| D[提示先在 Profile 中<br/>绑定并验证手机号]

    C --> E[输入收到的6位验证码]
    E --> F{验证码正确}

    F -->|正确| G[SMS 2FA 启用成功]
    F -->|错误| E1[提示验证码错误]
```

**SMS 2FA 规则：**

- 前提条件：必须已绑定并验证手机号
- 每次登录时向绑定手机号发送验证码
- 如果用户修改了手机号，SMS 2FA 自动绑定到新手机号

#### 6.3.3 2FA 登录流程

```mermaid
flowchart TD
    A[用户输入邮箱/手机号 + 密码] --> B{密码正确}

    B -->|错误| B1[提示密码错误]
    B -->|正确| C{是否开启了2FA}

    C -->|未开启| D[直接登录成功]
    C -->|已开启| E{Default 2FA 方式}

    E -->|Authenticator App| F1[要求输入 Authenticator 验证码]
    E -->|SMS| F2[自动发送SMS验证码<br/>要求输入]

    F1 --> G{验证通过}
    F2 --> G

    G -->|通过| D
    G -->|失败| H[提示验证失败]

    H --> I{是否使用 Recovery Code}
    I -->|是| J[输入 Recovery Code]
    I -->|否| K[重试或联系支持]

    J --> L{Recovery Code 有效}
    L -->|有效| D
    L -->|无效| K
```

### 6.4 Recovery Codes

**说明：** Recovery Codes 用于在丢失2FA设备时恢复账户访问。

**生成流程：**

```mermaid
flowchart TD
    A[点击 Generate recovery codes] --> B[身份验证]

    B --> C{验证方式}
    C -->|有密码| D[输入当前密码]
    C -->|无密码| E[发送验证码到邮箱/手机号]

    D --> F{验证通过}
    E --> F

    F -->|通过| G[生成一组 Recovery Codes<br/>通常8-10个一次性代码]
    F -->|失败| H[提示验证失败]

    G --> I[显示 Recovery Codes<br/>提示用户安全保存]
    I --> J[提供下载/复制功能]
```

**Recovery Codes 规则：**

| 规则     | 说明                                   |
| -------- | -------------------------------------- |
| 数量     | 每次生成 10 个                         |
| 格式     | 8位字母数字组合，如 `a1b2-c3d4`      |
| 使用规则 | 每个Code只能使用一次                   |
| 重新生成 | 重新生成后，旧的Codes全部失效          |
| 使用场景 | 丢失2FA设备时，用Code代替2FA验证码登录 |

---

## 7. User与MID关系模型

### 7.1 关系概览

```mermaid
flowchart TD
    subgraph "User 创建商户"
        A[User A] -->|创建| M1[MID-001]
        A -->|自动成为 Owner| M1
    end

    subgraph "User 被邀请加入商户"
        B[User B] -->|被邀请| M1
        B -->|角色: Admin| M1
    end

    subgraph "User 在多个商户"
        C[User C] -->|Owner| M2[MID-002]
        C -->|Member| M3[MID-003]
        C -->|Admin| M1
    end
```

### 7.2 角色定义

| 角色             | 说明              | 权限范围                                    |
| ---------------- | ----------------- | ------------------------------------------- |
| **Owner**  | 商户创建者/所有者 | 全部权限，包括删除商户、管理成员角色        |
| **Admin**  | 管理员            | 大部分管理权限，不能删除商户、不能修改Owner |
| **Member** | 普通成员          | 查看权限为主，有限的操作权限                |

### 7.3 创建商户流程

```mermaid
flowchart TD
    A[User 登录后] --> B[点击 创建商户]
    B --> C[填写商户基本信息<br/>公司name,业务类型等]
    C --> D[系统生成 MID]
    D --> E[User 自动成为该 MID 的 Owner]
    E --> F[进入商户工作台]
```

### 7.4 邀请成员加入商户

```mermaid
flowchart TD
    A[Owner/Admin 在商户管理中<br/>点击 邀请成员] --> B[输入被邀请人的<br/>邮箱或手机号]
    B --> C[选择角色<br/>Admin / Member]
    C --> D[发送邀请]

    D --> E{被邀请人是否已有 User ID}
    E -->|已有| F[发送邀请通知<br/>邮件/短信]
    E -->|没有| G[发送注册邀请链接<br/>邮件/短信]

    F --> H[被邀请人登录后<br/>看到邀请通知]
    G --> I[被邀请人通过链接<br/>注册并登录]

    H --> J{接受邀请}
    I --> J

    J -->|接受| K[User 加入该 MID<br/>获得对应角色权限]
    J -->|拒绝| L[邀请失效]
```

### 7.5 商户切换

**场景：** User 属于多个MID，需要在不同商户间切换。

```mermaid
flowchart TD
    A[User 登录成功] --> B{User 属于几个 MID}

    B -->|1个| C[直接进入该商户工作台]
    B -->|多个| D[显示商户选择页面<br/>列出所有关联的MID]

    D --> E[User 选择一个商户]
    E --> F[进入该商户工作台<br/>权限按该MID下的角色控制]

    F --> G[顶部导航栏显示<br/>当前商户名称 + 切换按钮]
    G --> H[点击切换按钮<br/>可随时切换到其他商户]
    H --> D
```

### 7.6 Owner 定义与认证

**Owner 不是随意指定的角色，必须满足以下条件之一：**

| Owner 类型                             | 说明                              | 认证方式                                               |
| -------------------------------------- | --------------------------------- | ------------------------------------------------------ |
| **开户人**                       | 创建MID并提交KYC/产品开通申请的人 | 系统自动认定，注册时已完成邮箱/手机号验证              |
| **法人（Legal Representative）** | 公司法定代表人                    | 需要身份认证：人脸识别 / 手机号验证 / 线下提供身份材料 |
| **董事（Director）**             | 公司董事会成员                    | 需要身份认证：人脸识别 / 手机号验证 / 线下提供身份材料 |

#### Owner 认定流程

```mermaid
flowchart TD
    A[MID创建] --> B[开户人自动成为 Owner]

    B --> C{是否需要变更Owner}
    C -->|不需要| D[开户人继续作为Owner]
    C -->|需要| E[发起Owner变更申请]

    E --> F{新Owner身份类型}
    F -->|法人| G1[提交法人身份信息]
    F -->|董事| G2[提交董事身份信息]

    G1 --> H[身份认证]
    G2 --> H

    H --> H1{认证方式}
    H1 -->|线上| H2[人脸识别 + 手机号验证]
    H1 -->|线下| H3[提交身份材料<br/>由平台/SP人工审核]

    H2 --> I{认证通过}
    H3 --> I

    I -->|通过| J[Owner变更成功<br/>原Owner降级为Admin]
    I -->|失败| K[认证失败<br/>保持原Owner不变]
```

#### Owner 权限特殊性

Owner 拥有以下**不可转让给 Admin/Member** 的专属权限：

- 配置 MID 级操作权限（见 7.7）
- 变更 Owner（转让给法人/董事）
- 删除/注销 MID
- 设置安全联系人
- 管理 Admin 角色（提升/降级）

### 7.7 MID级操作权限授权

**核心规则：** Owner 可以为每个 User 配置 MID 级操作的验证方式——User 自己验证，还是需要 Owner 验证。

#### 操作分类与默认权限

```mermaid
flowchart TD
    subgraph "User级操作（固定，不可更改）"
        A1[登录] -->|验证码发到| A1a[User自己]
        A2[修改个人密码] -->|验证码发到| A2a[User自己]
        A3[修改邮箱/手机号] -->|验证码发到| A3a[User自己]
        A4[2FA设置] -->|验证码发到| A4a[User自己]
    end

    subgraph "MID级操作（Owner可配置）"
        B1[发起交易] -->|Owner授权?| B1a{已授权: User自己<br/>未授权: Owner}
        B2[资金操作] -->|Owner授权?| B2a{已授权: User自己<br/>未授权: Owner}
        B3[修改商户配置] -->|Owner授权?| B3a{已授权: User自己<br/>未授权: Owner}
        B4[新增/删除成员] -->|Owner授权?| B4a{已授权: User自己<br/>未授权: Owner}
    end
```

#### 权限配置矩阵

Owner 在 MID 设置中为每个 User 配置权限：

```
MID-001 操作权限配置
┌──────────────────┬──────────┬──────────┬──────────┐
│ 操作类型          │ User-A   │ User-B   │ User-C   │
│                  │ (Admin)  │ (Admin)  │ (Member) │
├──────────────────┼──────────┼──────────┼──────────┤
│ 发起交易          │ ✅ 自己   │ ✅ 自己   │ ❌ Owner │
│ 资金操作(提现等)   │ ✅ 自己   │ ❌ Owner │ ❌ Owner │
│ 修改商户配置       │ ✅ 自己   │ ❌ Owner │ ❌ Owner │
│ 新增/删除成员      │ ❌ Owner │ ❌ Owner │ ❌ Owner │
└──────────────────┴──────────┴──────────┴──────────┘

✅ 自己 = Owner已授权，验证码发到User自己
❌ Owner = 未授权，验证码发到Owner
```

**默认规则：** 新加入的 User 默认所有 MID 级操作都需要 Owner 验证，Owner 逐项授权。

#### 操作验证流程

```mermaid
flowchart TD
    A[User发起MID级操作<br/>如: 发起交易] --> B{该User是否被Owner<br/>授权该操作}

    B -->|已授权| C[验证码发到 User 自己的凭证]
    B -->|未授权| D[验证码发到 Owner 的凭证]

    C --> E[User 输入验证码]
    E --> F{验证通过}
    F -->|通过| G[操作执行成功]
    F -->|失败| E

    D --> H[Owner 收到验证码 + 操作通知<br/>通知内容: 谁在做什么操作]
    H --> I{Owner 配合输入验证码}
    I -->|输入| J{验证通过}
    I -->|忽略/拒绝| K[操作超时失败<br/>通知User]
    J -->|通过| G
    J -->|失败| H
```

#### Owner 授权管理页面

```
┌─────────────────────────────────────────────────────┐
│  MID-001 操作权限管理                                │
│                                                     │
│  成员列表                                            │
│  ┌─────────────────────────────────────────────────┐│
│  │ User-A (Admin)                          配置 ▶ ││
│  │ user-a@test.com                                 ││
│  ├─────────────────────────────────────────────────┤│
│  │ User-B (Admin)                          配置 ▶ ││
│  │ user-b@test.com                                 ││
│  ├─────────────────────────────────────────────────┤│
│  │ User-C (Member)                         配置 ▶ ││
│  │ +852 9641xxxx                                   ││
│  └─────────────────────────────────────────────────┘│
│                                                     │
│  点击"配置"后：                                      │
│  ┌─────────────────────────────────────────────────┐│
│  │ User-A 操作权限                                  ││
│  │                                                  ││
│  │ 发起交易          [✅ 允许自主操作]  [切换]       ││
│  │ 资金操作          [✅ 允许自主操作]  [切换]       ││
│  │ 修改商户配置       [❌ 需Owner验证]  [切换]       ││
│  │ 新增/删除成员      [❌ 需Owner验证]  [切换]       ││
│  │                                                  ││
│  │                          [保存]  [取消]           ││
│  └─────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────┘
```

#### Scope 说明

| 维度                   | 内容                                                                                                                                                                                                             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **In Scope**     | ① Owner 定义（开户人/法人/董事）``② Owner 身份认证（人脸/手机号/线下材料）``③ Owner 为 User 配置 MID 级操作权限``④ 基于授权的验证码发送逻辑``⑤ Owner 收到操作通知（谁在做什么） |
| **Out of Scope** | ① 审批模式（员工提交 → Owner审批 → 执行）``② 多级审批（多人审批链）``③ 操作金额阈值控制（如>$10000需Owner）``④ 操作时间窗口控制（如非工作时间需Owner）                                |

---

## 8. 状态机

### 8.1 User 状态

```
ACTIVE ←→ SUSPENDED
  ↓
DELETED（Out of Scope，本期不做）
```

| 状态                | 说明                     |
| ------------------- | ------------------------ |
| **ACTIVE**    | 正常使用状态             |
| **SUSPENDED** | 账户被暂停（如安全风险） |

### 8.2 凭证（Credential）状态

```
UNVERIFIED → VERIFIED
     ↑          ↓
     └── CHANGED（修改后重新验证）
```

| 状态                 | 说明             |
| -------------------- | ---------------- |
| **UNVERIFIED** | 已绑定但未验证   |
| **VERIFIED**   | 已通过验证码验证 |

### 8.3 2FA 状态

```
NOT_SET → ENABLED ←→ DISABLED
              ↓
          DEFAULT（被设为默认2FA方式）
```

| 状态               | 说明                  |
| ------------------ | --------------------- |
| **NOT_SET**  | 未设置                |
| **ENABLED**  | 已启用                |
| **DISABLED** | 已禁用                |
| **DEFAULT**  | 已启用且为默认2FA方式 |

### 8.4 邀请状态

```
PENDING → ACCEPTED
    ↓
REJECTED
    ↓
EXPIRED（超过7天未处理）
```

---

## 附录

### A. 错误码与提示信息

| 场景                   | 错误提示                                                        |
| ---------------------- | --------------------------------------------------------------- |
| 验证码过期             | "Verification code has expired. Please request a new one."      |
| 验证码错误             | "Invalid verification code. Please try again."                  |
| 验证码发送频率限制     | "Please wait 60 seconds before requesting a new code."          |
| 验证码每日上限         | "You've reached the daily limit. Please try again tomorrow."    |
| 密码强度不足           | 实时显示未满足的具体规则                                        |
| 两次密码不一致         | "Passwords do not match."                                       |
| 当前密码错误           | "Current password is incorrect."                                |
| 邮箱已被其他账户绑定   | "This email is already associated with another account."        |
| 手机号已被其他账户绑定 | "This phone number is already associated with another account." |
| Recovery Code 无效     | "Invalid recovery code. Please try another one."                |
| 2FA验证失败            | "Invalid authentication code. Please try again."                |

### B. 安全策略

| 策略           | 规则                                   |
| -------------- | -------------------------------------- |
| 密码存储       | 使用 bcrypt 或 argon2 哈希，不存储明文 |
| 验证码传输     | 通过 HTTPS 加密传输                    |
| 2FA密钥存储    | 加密存储 TOTP Secret                   |
| Recovery Codes | 哈希存储，使用后标记为已用             |
| 登录失败锁定   | 连续5次密码错误，锁定账户15分钟        |
| 验证码错误锁定 | 连续5次验证码错误，锁定15分钟          |

---

*最后更新：2026-02-07*
*文档版本：v1.0*
*作者：EX Product Team*
