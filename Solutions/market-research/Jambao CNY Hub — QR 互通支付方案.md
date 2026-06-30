# Jambao CNY Hub — QR 互通支付方案

## 背景与定位

本文档描述 **Jambao CNY Hub** 二期（Phase 2）的 QR 互通支付方案，聚焦于 **东非消费者在中国境内使用本地钱包支付** 的三种核心场景。

**适用人群**：持有 Jambao App（Sidian Bank 旗下消费者钱包）的东非个人用户，在中国境内面对支付宝或微信支付收款码时，无需兑换人民币现金，直接完成跨境支付。**支付方式可以由用户选择**：小额支付通过 M\-Pesa 直连 Jambao CNY Hub；大额支付通过 Jambao App 发起；两个渠道并行运营，互不干扰。

**资金路径**：

```Plaintext
【小额】M-Pesa（KES）→ Jambao CNY Hub → IPL（KES→CNH 跨境清算）→ CN合作伙伴（CNH→ 支付宝/微信商户代付）→ 中国商户到账
【大额】Jambao App（KES）→ Jambao CNY Hub → IPL（KES→CNH 跨境清算）→ CN合作伙伴（CNH→ 支付宝/微信商户代付）→ 中国商户到账
```

IPL 负责香港侧的跨境外汇清算，将 KES 兑换为 CNH 并划付至 CN合作伙伴头寸账户；CN合作伙伴 持有中国境内支付牌照，完成支付宝 / 微信支付的最终代付入账。

**与 Phase 1 的关系**：Phase 1 主要服务 B2B 企业贸易结算（M\-Pesa Paybill 大额汇款），QR 互通是 Phase 2 面向 C 端消费场景的延伸。两个阶段共用同一套 Jambao CNY Hub 清算核心，不另建账务体系，边际接入成本低。

---

## 系统参与方

|符号|系统角色|对应实体|
|---|---|---|
|**东非用户**|付款方|肯尼亚 / 东非个人消费者，Jambao App 注册 KYC 用户|
|**Jambao App**|大额支付渠道|Sidian Bank 旗下消费者移动端；负责大额跨境支付发起；集成 QR 扫码解析、KYC、FX 报价展示|
|**Jambao Hub**|跨境清算核心|EurewaX 技术平台（Phase 1 SaaS 托管）；即 Jambao CNY Hub；负责 QR 内容解析、FX 报价锁价、跨境订单管理、Ledger 记账与三方对账|
|**M\-Pesa**|小额支付渠道|Safaricom M\-Pesa；直连 Jambao CNY Hub；KES 小额资金来源，STK Push 触发用户 PIN 确认|
|**IPL**|跨境外汇清算|香港跨境支付公司；负责 KES↔CNH 外汇清算与跨境资金划付，不持有中国 SAFE 牌照|
|**CN合作伙伴**|中国境内代付|持有中国境内支付牌照的机构；负责支付宝 / 微信支付商户代付、QR 商户信息查询、收单确认|
|**支付宝/微信支付**|中国收单网络|支付宝或微信支付商户收款系统；静态码 / 动态订单码 / 收单确认|
|**商户**|收款方|中国境内支付宝 / 微信支付收款商户（实体店、电商、POS 收银台）|

---

## 支付渠道架构总览

M\-Pesa（小额）与 Jambao App（大额）并行接入同一 Jambao CNY Hub，按交易金额路由，分别完成 KES 扣款后汇聚至统一跨境清算通道。

```mermaid
graph LR
    subgraph 东非侧
        MP["M-Pesa\n小额支付 · KES\nSTK Push"]
        APP["Jambao App\n大额支付 · KES"]
    end

    HUB["Jambao CNY Hub\nFX锁价 · 订单管理 · 记账"]

    subgraph 跨境清算
        IPL["IPL\nKES → CNH\nHK跨境外汇"]
    end

    subgraph 中国侧
        CN["CN合作伙伴\n境内代付\n持中国支付牌照"]
        PAY["支付宝 / 微信支付"]
        M["中国商户"]
    end

    MP -- "小额 KES" --> HUB
    APP -- "大额 KES" --> HUB
    HUB -- "KES→CNH 换汇" --> IPL
    IPL -- "CNH 划付" --> CN
    CN -- "代付指令" --> PAY
    PAY -- "CNY 到账" --> M```

---

## 三种 QR 支付模式概览

|模式|触发方式|金额来源|支付渠道|典型场景|
|---|---|---|---|---|
|**主扫·静态码**|用户扫商户固定收款码|用户手动输入 RMB 金额|**M\-Pesa 小额**|市场摊位、个体小店（无 POS）|
|**主扫·订单码**|用户扫商户动态订单码|商户 POS 系统预设|**Jambao App 大额**|正规门店、餐厅、超市（有 POS）|
|**被扫·付款码**|商户 POS 扫用户出示的码|商户 POS 输入 RMB 金额|**M\-Pesa 小额**|便利店、机场免税店、高频小额场景|

---

## 场景一：主扫·静态码（手输金额）— M\-Pesa 小额渠道

**说明**：商户仅有一张印刷的支付宝或微信支付静态收款码（无订单系统）。用户扫码后，CN合作伙伴 解析商户身份并返回商户名称；用户手动输入 RMB 金额，Jambao CNY Hub 向 IPL 请求实时 KES/CNH 报价，用户确认后通过 M\-Pesa STK Push 完成 KES 小额扣款。金额灵活，适合无数字 POS 的小微商户。

```mermaid
sequenceDiagram
    autonumber
    participant U as 东非用户
    participant MP as M-Pesa<br/>(Safaricom)
    participant HUB as Jambao CNY Hub<br/>(EurewaX托管)
    participant IPL as IPL<br/>(HK跨境清算)
    participant CN as CN合作伙伴<br/>(中国境内代付)
    participant PAY as 支付宝/微信支付
    participant M as 中国商户

    U->>MP: 扫支付宝 / 微信支付静态收款码
    MP->>HUB: 上传 QR 内容
    HUB->>HUB: 识别 QR 类型（支付宝静态码 / 微信支付码）
    HUB->>CN: 查询 / 解析商户信息
    CN->>PAY: 校验收款码可支付性
    PAY-->>CN: 返回商户名称 / MerchantId
    CN-->>HUB: 返回商户信息

    HUB-->>MP: 展示商户信息，要求手输 RMB 金额
    U->>MP: 输入 RMB 金额

    MP->>HUB: 提交 RMB 金额
    HUB->>IPL: 请求 KES/CNH 报价
    IPL-->>HUB: 返回实时汇率 + 手续费
    HUB->>HUB: 计算 KES = RMB × 汇率 + 手续费，锁价 60s
    HUB-->>MP: 返回 KES 报价 + 有效期
    MP-->>U: 展示 KES 金额与费用明细，请求确认

    U->>MP: 输入 PIN 确认
    MP->>HUB: 创建跨境支付订单 + 扣款成功

    HUB->>IPL: 发起 KES→CNH 跨境清算
    IPL->>CN: 划付 CNH 至代付头寸账户
    CN->>PAY: 使用 CNH 头寸向商户发起代付
    PAY->>M: 商户支付宝 / 微信支付到账（CNY）
    PAY-->>CN: 支付成功回调
    CN-->>HUB: 中国侧代付确认

    HUB->>HUB: Ledger 记账：KES 已收 / CNH 已清算；生成对账流水
    HUB-->>MP: 返回支付成功
    MP-->>U: 展示成功凭证（RMB 金额 + KES 扣款 + 汇率）```

---

## 场景二：主扫·动态订单码 — Jambao App 大额渠道

**说明**：商户 POS 已预先在支付宝或微信支付创建订单并生成动态二维码（含订单号和 RMB 金额）。用户扫码后，CN合作伙伴 直接从支付宝 / 微信支付拉取订单详情，无需手输金额，降低操作失误风险；大额扣款通过 Jambao App 账户（Sidian Bank 授权）完成，不经 M\-Pesa，适合有收银系统的正规门店。

```mermaid
sequenceDiagram
    autonumber
    participant U as 东非用户
    participant APP as Jambao App<br/>(Sidian Bank)
    participant HUB as Jambao CNY Hub<br/>(EurewaX托管)
    participant IPL as IPL<br/>(HK跨境清算)
    participant CN as CN合作伙伴<br/>(中国境内代付)
    participant PAY as 支付宝/微信支付
    participant M as 中国商户 POS

    M->>PAY: 创建支付宝 / 微信支付订单（含 RMB 金额）
    PAY-->>M: 返回动态订单二维码
    M-->>U: 展示订单码（屏幕 / 打印）

    U->>APP: 扫支付宝 / 微信支付动态订单码
    APP->>HUB: 上传 QR 内容
    HUB->>HUB: 识别为动态订单码，提取 Order Token
    HUB->>CN: 查询订单详情
    CN->>PAY: 拉取订单金额 / 商户 / 订单状态
    PAY-->>CN: 返回 RMB 金额、商户名、订单有效期
    CN-->>HUB: 返回订单详情

    HUB->>HUB: 校验订单状态 + 商户白名单
    HUB->>IPL: 请求 KES/CNH 报价（锁定该订单金额）
    IPL-->>HUB: 返回实时汇率 + 手续费
    HUB->>HUB: 计算 KES 等价，锁价 90s（匹配订单有效期）
    HUB-->>APP: 返回订单详情 + KES 报价
    APP-->>U: 展示商户名、RMB 金额、KES 等价、费用明细

    U->>APP: 确认支付（生物识别 / App PIN）
    APP->>HUB: 创建跨境支付订单
    HUB->>APP: 发起 Jambao App 账户扣款（KES 大额）
    APP->>APP: 校验账户余额 / Sidian Bank 授权
    APP-->>HUB: 扣款成功

    HUB->>IPL: 发起 KES→CNH 跨境清算
    IPL->>CN: 划付 CNH 至代付头寸账户
    CN->>PAY: 代付指定订单（Order Token + CNH）
    PAY->>M: 订单状态更新为已支付，商户到账
    PAY-->>CN: 支付成功回调
    CN-->>HUB: 中国侧代付确认

    HUB->>HUB: 关闭跨境订单，生成对账流水
    HUB-->>APP: 返回支付成功
    APP-->>U: 展示成功凭证（含订单号 + KES 扣款明细）```

---

## 场景三：被扫·付款码 — M\-Pesa 小额渠道

**说明**：用户在 Jambao App 中预先生成与 M\-Pesa 账户绑定的一次性动态付款码（Token），商户 POS 主动扫描该码并输入 RMB 金额。扣款请求由中国侧 POS 发起，经 CN合作伙伴 路由至 Jambao CNY Hub，Hub 通过 M\-Pesa STK Push 完成 KES 小额扣款后通知 IPL 清算，CN合作伙伴 完成支付宝 / 微信支付入账。适合便利店、超市等高频小额场景。

```mermaid
sequenceDiagram
    autonumber
    participant U as 东非用户
    participant MP as M-Pesa<br/>(Safaricom)
    participant HUB as Jambao CNY Hub<br/>(EurewaX托管)
    participant IPL as IPL<br/>(HK跨境清算)
    participant POS as 中国商户 POS
    participant CN as CN合作伙伴<br/>(中国境内代付)
    participant PAY as 支付宝/微信支付
    participant M as 中国商户

    U->>MP: 打开"付款码"页面
    MP->>HUB: 请求生成一次性付款 Token
    HUB->>HUB: 校验用户 KYC 状态、额度、风险等级
    HUB-->>MP: 返回动态付款码 Token（有效期 60s，自动刷新）
    MP-->>U: 展示付款码（条形码 + 数字串）

    M->>POS: 收银员输入 RMB 金额
    POS->>POS: 扫描用户付款码
    POS->>CN: 提交付款 Token + RMB 金额 + 商户信息
    CN->>HUB: 转发请求：请求扣东非用户 KES 账户
    HUB->>HUB: 校验 Token 有效期 + 金额合规 + 商户白名单
    HUB->>IPL: 请求 KES/CNH 报价
    IPL-->>HUB: 返回实时汇率 + 手续费
    HUB->>HUB: 计算 KES 等价，锁价执行

    HUB->>MP: 发起 STK Push（KES 扣款）
    MP-->>U: 推送 PIN 确认请求
    U->>MP: 输入 PIN 确认
    MP-->>HUB: 扣款成功

    HUB->>IPL: 发起 KES→CNH 跨境清算
    IPL->>CN: 划付 CNH 至代付头寸账户
    CN->>PAY: 向商户支付宝 / 微信支付发起收单确认入账
    PAY->>M: 商户到账（CNY）
    PAY-->>CN: 支付成功回调
    CN-->>POS: 返回支付成功

    POS-->>M: 打印 / 显示收款成功凭证

    HUB->>HUB: Ledger 记账与三方对账（KES 已收 / CNH 已清算）
    HUB-->>MP: 推送支付成功通知
    MP-->>U: 展示成功凭证（RMB 金额 + KES 扣款 + 商户名）```

---

## 附注

### 反向场景（中国人在东非消费）

上述三个场景均为"东非用户 → 中国商户"方向。Phase 2 同步规划**反向场景**：中国游客 / 商务人士在肯尼亚，使用支付宝 / 微信扫描本地 M\-Pesa 商户码，CN合作伙伴 将 CNY 资金交由 IPL 换汇为 KES 后入账商户 M\-Pesa。该场景资金流方向相反，但 IPL \+ CN合作伙伴 \+ Jambao CNY Hub 同一套通道，详见后续技术规格文档。





