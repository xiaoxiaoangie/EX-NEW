# 1FlyCapital VCC × EX 解决方案

> **客户**：FlyCapital（租户）`<br>`
> **业务**：为 OTA 平台客户提供 VCC 发卡服务 `<br>`
> **接入方式**：EX 平台（聚合 API + 风控层）→ 持牌 SP（实际账户/VCC 能力）

---

## 1. 平台架构与名词解释

### 1.1 四层架构

```
┌─────────────────────────────────────────────────────────┐
│  Layer 1: OTA 平台客户 (C端消费者)                        │
│  - 持有 VCC 虚拟卡                                        │
│  - 使用卡号在航司/GDS/酒店消费                             │
└─────────────────────────────────────────────────────────┘
                            │ 消费/扣款
                            ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 2: FlyCapital (租户)                              │
│  - 在 EX 以「租户」身份入网                               │
│  - 管理 VA、钱包、共享账户、VCC 卡组                       │
│  - 给 C 端消费者发卡                                      │
└─────────────────────────────────────────────────────────┘
                            │ API / Webhook
                            ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 3: EX 平台                                        │
│  - API 聚合层                                            │
│  - 风控编排层                                            │
│  - 租户管理 + 商户管理                                    │
└─────────────────────────────────────────────────────────┘
                            │
                            │ 商户入网请求
                            ▼
┌─────────────────────────────────────────────────────────┐
│  Layer 4: 持牌 SP                                        │
│  - 商户实际入网（KYC/KYB 审核）                          │
│  - 实际账户开户（法币账户、数币钱包）                     │
│  - VA 创建 + VCC 发卡 + 资金托管                         │
└─────────────────────────────────────────────────────────┘
```

### 1.2 核心名词解释

| 名词               | 英文             | 说明                                                                                                                               |
| ------------------ | ---------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **租户**     | Tenant           | FlyCapital 在 EX 平台的入驻实体，拥有独立的租户 ID 和配置                                                                          |
| **商户**     | Merchant         | 场景1:是租户的终端商户<br />场景2:是租户<br />在当前的方案中，术语场景2<br />会将商户推送到 SP 入网，SP 侧完成 KYC/KYB 审核、开户 |
| **SP**       | Service Provider | 持牌机构，实际提供 VA、账户、钱包、VCC 等金融能力，商户在此入网                                                                    |
| **VA**       | Virtual Account  | 虚拟银行账户，用于 FlyCapital 向 SP 充值法币                                                                                       |
| **法币账户** | Fiat Account     | 开在 SP 的法币账户（USD/EUR 等），同名充值/提现                                                                                    |
| **数币钱包** | Crypto Wallet    | 开在 SP 的加密货币钱包（USDT/USDC），充币/提币                                                                                     |
| **共享账户** | Shared Account   | 卡资金池，多张 VCC 共享余额                                                                                                        |
| **共享卡**   | Shared Card      | 绑定共享账户，消费时扣减共享账户余额                                                                                               |
| **充值卡**   | Standard Card    | 独立账户，一卡一账户，需单独充值                                                                                                   |
| **卡组**     | Card Program     | VCC 卡产品配置（卡 BIN、额度规则、有效期等）                                                                                       |

#### 租户与商户的关系

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   FlyCapital    │         │      EX 平台     │         │   持牌 SP       │
│    (租户)       │ ──────▶ │    创建商户      │ ──────▶ │   商户入网      │
│                 │         │   (Merchant)   │         │  (KYC/KYB)      │
└────────┬────────┘         └─────────────────┘         └────────┬────────┘
         │                                                        │
         │              租户通过 API 管理                         │
         │◄──────────────────────────────────────────────────────┘
         │              但账户/资金实际在 SP
         ▼
┌──────────────────────────────────────────────────────────────────┐
│                      租户管理视角                                 │
│  • 查看法币账户余额（实际在 SP）                                  │
│  • 查看数币钱包余额（实际在 SP）                                  │
│  • 管理 VA、卡组、共享账户                                        │
│  • 给 C 端消费者发卡                                              │
└──────────────────────────────────────────────────────────────────┘
```

**关键理解**：

- **租户**是 EX 平台的客户，使用 EX 的 API 和界面
- **商户**是 SP 侧的实际入网主体，由 EX 推送创建
- Flycapital 需要注册EX 的租户也要注册SP 的商户
- 所有资金账户（法币账户、数币钱包）实际开立在 SP 的商户名下

### 1.3 账户体系关系图

#### 方案 A：法币入金 → 法币账户 → 共享/充值卡

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   银行转账    │ ───▶ │     VA       │ ───▶ │  法币账户    │
│  (FlyCapital)│      │ (Virtual Acct)│     │  (SP 托管)   │
└──────────────┘      └──────────────┘      └──────┬───────┘
                                                   │
                          ┌────────────────────────┼────────────────────────┐
                          │                        │                        │
                          ▼                        ▼                        ▼
                   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
                   │  共享账户    │          │  充值卡      │          │  充值卡      │
                   │ (Card Pool) │          │ (独立账户)   │          │ (独立账户)   │
                   └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
                          │                        │                        │
                          ▼                        ▼                        ▼
                   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
                   │  共享卡 1    │          │   充值卡 A   │          │   充值卡 B   │
                   │  共享卡 2    │          │            │          │            │
                   │  共享卡 N    │          │            │          │            │
                   └─────────────┘          └─────────────┘          └─────────────┘
```

#### 方案 B：数币入金 → 数币钱包 → 共享/充值卡

```
┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│   链上充币    │ ───▶ │   EX 收银    │ ───▶ │  数币钱包    │
│  (USDT/USDC) │      │  (Crypto)    │      │  (SP 托管)   │
└──────────────┘      └──────────────┘      └──────┬───────┘
                                                   │
                          ┌────────────────────────┼────────────────────────┐
                          │                        │                        │
                          ▼                        ▼                        ▼
                   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
                   │  共享账户    │          │  充值卡      │          │  充值卡      │
                   │ (Card Pool) │          │ (独立账户)   │          │ (独立账户)   │
                   └──────┬──────┘          └──────┬──────┘          └──────┬──────┘
                          │                        │                        │
                          ▼                        ▼                        ▼
                   ┌─────────────┐          ┌─────────────┐          ┌─────────────┐
                   │  共享卡 1    │          │   充值卡 A   │          │   充值卡 B   │
                   │  共享卡 2    │          │            │          │            │
                   │  共享卡 N    │          │            │          │            │
                   └─────────────┘          └─────────────┘          └─────────────┘
```

#### 关键概念说明

| 概念                        | 说明                                                               |
| --------------------------- | ------------------------------------------------------------------ |
| **充值卡 = 一对一**   | 每张充值卡背后有一个独立账户，只能绑定一张卡；充值即给该账户加余额 |
| **共享账户 = 一对多** | 一个共享账户可发多张共享卡，所有卡共享该账户余额；消费时统一扣减   |
| **首次发卡**          | 共享卡需先创建共享账户并充值；充值卡直接发卡+充值                  |
| **非首次发卡**        | 共享卡可直接选择已有共享账户发卡，无需重复创建                     |

---

## 2. 完整发卡流程

### 2.1 阶段一：租户入驻与产品开通

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP

    F->>EX: 1. 租户入驻申请（提交 KYB 资料）
    EX->>EX: 2. 创建商户（Merchant）<br/>与租户绑定
    EX->>SP: 3. 推送商户入网请求 + KYB 材料
    SP-->>SP: 4. SP 侧风控审核（KYC/KYB）
    SP-->>EX: 5. 审核结果（通过/拒绝/RFI）
    EX-->>F: 6. Webhook: MERCHANT_KYB_RESULT<br/>商户审核结果

    alt 审核通过
        F->>EX: 7. 申请开通 VCC 产品
        EX->>SP: 8. 为商户开通 VCC 发卡能力
        SP-->>EX: 9. 产品开通成功（SP 侧配置卡组/路由）
        EX-->>F: 10. Webhook: VCC_PRODUCT_ACTIVE
    else 需要补充材料（RFI）
        EX-->>F: Webhook: RFI_REQUEST<br/>（商户维度）
        F->>EX: 上传补充文件
        EX->>SP: 同步补充材料
        SP-->>SP: 重新审核商户
    end
```

**关键说明**：

- **租户**（FlyCapital）是 EX 平台客户，使用 EX 的 API 和界面
- **商户**由 EX 创建后推送到 SP，SP 完成实际的 KYC/KYB 审核和账户开户
- 租户与商户通常是一对一关系（FlyCapital ↔ 一个 SP 商户）
- 后续新增产品只需调用「开通产品」接口，无需重复 KYB（但 SP 可能额外审核）
- RFI（Request For Information）时需调用「上传文件」接口补充材料

### 2.2 阶段二：VA 申请与法币充值

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP (商户侧)
    participant B as FlyCapital 银行

    F->>EX: 申请 VA（虚拟账户）<br/>为 SP 侧商户申请
    EX->>SP: 创建 VA 申请
    SP-->>SP: 风控审核 VA
    SP-->>EX: VA 创建成功 + 账户信息
    EX-->>F: Webhook: VA_ACTIVE<br/>{accountNumber, bankInfo}

    F->>B: 发起银行转账至 VA
    B->>SP: 资金入账 VA
    SP-->>SP: 风控审核入账
    SP-->>EX: 入账成功通知
    EX-->>F: Webhook: FIAT_DEPOSIT_SUCCESS<br/>法币账户余额增加
```

### 2.3 阶段三：数币充值（可选路径）

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP (商户侧)
    participant C as 链上

    F->>EX: 获取数币充值地址<br/>为 SP 侧商户钱包
    EX->>SP: 分配地址
    SP-->>EX: {address, chain, memo}
    EX-->>F: 返回充值地址

    F->>C: 链上转账 USDT/USDC
    C->>SP: 链上确认
    SP-->>SP: 风控审核（AML/合规）
    SP-->>EX: 充值成功
    EX-->>F: Webhook: CRYPTO_DEPOSIT_SUCCESS<br/>数币钱包余额增加
```

### 2.4 阶段四：开卡流程

#### 共享卡首次开卡（需创建共享账户）

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant OTA as OTA 平台
    participant EX as EX 平台
    participant SP as 持牌 SP

    OTA->>F: 消费者申请 VCC
    F->>EX: 创建共享账户<br/>POST /vcc/shared-account/create
    EX->>SP: 创建共享资金池
    SP-->>EX: 共享账户创建成功
    EX-->>F: {sharedAccountId}

    F->>EX: 共享账户充值<br/>POST /vcc/shared-account/fund<br/>{from: WALLET_FIAT, amount}
    EX->>SP: 从法币账户划转至共享账户
    SP-->>SP: 风控审核
    SP-->>EX: 划转成功
    EX-->>F: Webhook: SHARED_ACCOUNT_FUNDED

    F->>EX: 发共享卡<br/>POST /vcc/cards/issue<br/>{sharedAccountId, cardProgram}
    EX->>SP: 创建 VCC
    SP-->>EX: 卡创建成功<br/>{cardNumber, cvv, expiry}
    EX-->>F: Webhook: CARD_ISSUED<br/>{cardToken, maskedCard}
    F-->>OTA: 返回卡号信息（脱敏）
    OTA-->>C: 消费者获得 VCC
```

#### 充值卡开卡（一卡一账户）

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant OTA as OTA 平台
    participant EX as EX 平台
    participant SP as 持牌 SP

    OTA->>F: 消费者申请 VCC
    F->>EX: 发充值卡+充值<br/>POST /vcc/cards/issue-prepaid<br/>{cardProgram, fundAmount, from: WALLET_CRYPTO}
    EX->>SP: 创建独立卡账户 + 划转资金
    SP-->>SP: 风控审核
    SP-->>EX: 卡创建成功（已充值）
    EX-->>F: Webhook: CARD_ISSUED_AND_FUNDED
    F-->>OTA: 返回卡号信息
    OTA-->>C: 消费者获得 VCC（已可用）
```

#### 共享卡非首次开卡（复用已有共享账户）

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant OTA as OTA 平台
    participant EX as EX 平台
    participant SP as 持牌 SP

    OTA->>F: 消费者申请 VCC
    F->>EX: 查询已有共享账户<br/>GET /vcc/shared-accounts
    EX-->>F: 返回共享账户列表

    F->>EX: 发共享卡（选现有账户）<br/>POST /vcc/cards/issue<br/>{sharedAccountId: existing}
    EX->>SP: 在现有资金池下创建新卡
    SP-->>EX: 卡创建成功
    EX-->>F: Webhook: CARD_ISSUED
    F-->>OTA: 返回卡号信息
    OTA-->>C: 消费者获得 VCC（共享账户余额可用）
```

### 2.5 阶段五：卡消费与记录同步

```mermaid
sequenceDiagram
    autonumber
    participant C as 消费者
    participant M as 商户（航司/GDS）
    participant V as VCC 网络（Visa/MC）
    participant SP as 持牌 SP
    participant EX as EX 平台
    participant F as FlyCapital (租户)
    participant OTA as OTA 平台

    C->>M: 使用 VCC 消费（订机票/酒店）
    M->>V: 发起授权请求
    V->>SP: 卡授权请求
    SP-->>SP: 校验余额/风控
    SP-->>V: 授权通过
    V-->>M: 授权成功
    M-->>C: 订单确认

    SP->>SP: 清算扣款（共享/充值账户）
    SP->>EX: 交易通知
    EX->>F: Webhook: CARD_TRANSACTION<br/>{cardId, amount, merchant, status}
    F->>F: 记录消费流水
    F-->>OTA: 同步消费记录
    OTA->>C: 展示消费明细
```

---

## 3. OnRamp / OffRamp 流程

### 3.1 OnRamp（法币 → 数币）

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP

    Note over F,SP: 前置条件：已完成入驻、开通 OnRamp 产品

    F->>EX: 获取 OnRamp 报价<br/>POST /onramp/quote<br/>{fromCurrency: USD, toCurrency: USDT, amount}
    EX->>SP: 询价 + 锁汇
    SP-->>EX: {quoteId, rate, fromAmount, toAmount, expiresAt}
    EX-->>F: 返回报价（含倒计时）

    F->>EX: 确认下单<br/>POST /onramp/order<br/>{quoteId, fiatAccountId}
    EX->>SP: 执行 OnRamp
    SP-->>SP: 风控审核
    SP-->>SP: 法币账户扣款 → 数币钱包入账
    SP-->>EX: 交易完成
    EX-->>F: Webhook: ONRAMP_SETTLED<br/>数币钱包余额增加
```

### 3.2 OffRamp（数币 → 法币）

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP

    Note over F,SP: 前置条件：已完成入驻、开通 OffRamp 产品

    F->>EX: 获取 OffRamp 报价<br/>POST /offramp/quote<br/>{fromCurrency: USDT, toCurrency: USD, amount}
    EX->>SP: 询价 + 锁汇
    SP-->>EX: {quoteId, rate, fromAmount, toAmount, expiresAt}
    EX-->>F: 返回报价

    F->>EX: 确认下单<br/>POST /offramp/order<br/>{quoteId, walletId}
    EX->>SP: 执行 OffRamp
    SP-->>SP: 风控审核
    SP-->>SP: 数币钱包扣款 → 法币账户入账
    SP-->>EX: 交易完成
    EX-->>F: Webhook: OFFRAMP_SETTLED<br/>法币账户余额增加
```

**关键说明**：

- 市场汇率实时浮动，锁汇后需在有效期内确认
- 实际到账金额 = 下单金额（已锁汇），汇率风险由 SP 承担
- 每笔交易均需过 SP 风控，可能触发 RFI

### 3.3 提现/提币流程

#### 法币提现（当前仅支持同名账户，6月初支持非同名）

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP
    participant B as 收款银行

    F->>EX: 添加收款人（银行账户）<br/>POST /beneficiaries/create<br/>{accountType: BANK, accountName, accountNumber, bankCode}
    EX->>SP: 创建收款人 + 风控审核
    SP-->>EX: 收款人审核结果
    EX-->>F: Webhook: BENEFICIARY_REVIEW_RESULT

    alt 审核通过
        F->>EX: 发起提现<br/>POST /payout/orders<br/>{beneficiaryId, amount, currency: USD}
        EX->>SP: 执行付款
        SP-->>SP: 风控审核
        SP->>B: 实际付款（6月初支持非同名）
        SP-->>EX: 付款处理中/成功
        EX-->>F: Webhook: PAYOUT_PROCESSING → PAYOUT_SUCCESS
    end
```

#### 数币提币

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP
    participant C as 链上

    F->>EX: 添加收款人（链上地址）<br/>POST /beneficiaries/create<br/>{accountType: CRYPTO, chain, address}
    EX->>SP: 创建收款人 + 风控审核
    SP-->>EX: 收款人审核结果
    EX-->>F: Webhook: BENEFICIARY_REVIEW_RESULT

    alt 审核通过
        F->>EX: 发起提币<br/>POST /crypto/withdraw<br/>{beneficiaryId, amount, currency: USDT, chain}
        EX->>SP: 执行提币
        SP-->>SP: 风控审核
        SP->>C: 链上转账
        SP-->>EX: 提币处理中/成功
        EX-->>F: Webhook: CRYPTO_WITHDRAW_PROCESSING → CRYPTO_WITHDRAW_SUCCESS
    end
```

---

## 4. RFI（补充材料）处理流程

所有涉及风控的环节都可能触发 RFI，需商户主动补充文件：

```mermaid
sequenceDiagram
    autonumber
    participant F as FlyCapital (租户)
    participant EX as EX 平台
    participant SP as 持牌 SP

    SP-->>EX: 风控审核需补充材料
    EX-->>F: Webhook: RFI_REQUEST<br/>{rfiId, rfiType, description, requiredFiles}

    F->>EX: 上传文件<br/>POST /files/upload<br/>获取 fileUrl

    F->>EX: 提交 RFI 回复<br/>POST /rfi/submit<br/>{rfiId, files: [fileUrl], comment}

    EX->>SP: 同步补充材料
    SP-->>SP: 重新审核

    alt 审核通过
        SP-->>EX: 审核通过
        EX-->>F: Webhook: RFI_RESOLVED<br/>原流程继续
    else 仍不通过
        SP-->>EX: 审核拒绝
        EX-->>F: Webhook: RFI_REJECTED / 再次 RFI
    end
```

### 常见 RFI 场景

| 场景      | RFI 类型    | 可能要求的文件                   |
| --------- | ----------- | -------------------------------- |
| KYB 入驻  | KYB_RFI     | 营业执照、董事身份证明、业务说明 |
| VA 申请   | VA_RFI      | 资金来源证明、业务合同           |
| 大额充值  | DEPOSIT_RFI | 银行流水、贸易单据               |
| 开卡审核  | CARD_RFI    | 持卡人身份证明、消费用途说明     |
| 数币交易  | CRYPTO_RFI  | 链上资金来源证明                 |
| 提现/提币 | PAYOUT_RFI  | 收款人关系证明、用途说明         |

---

## 5. API 清单汇总

| 功能         | API 端点                            | 关键 Webhook                          |
| ------------ | ----------------------------------- | ------------------------------------- |
| 入驻 KYB     | POST /merchants/onboarding          | KYC_KYB_RESULT                        |
| 开通产品     | POST /products/apply                | PRODUCT_ACTIVE / REJECTED             |
| 申请 VA      | POST /va/accounts                   | VA_ACTIVE                             |
| 查询报价     | POST /onramp/quote, /offramp/quote  | -                                     |
| 下单 OnRamp  | POST /onramp/orders                 | ONRAMP_SETTLED                        |
| 下单 OffRamp | POST /offramp/orders                | OFFRAMP_SETTLED                       |
| 添加收款人   | POST /beneficiaries                 | BENEFICIARY_REVIEW_RESULT             |
| 发起付款     | POST /payout/orders                 | PAYOUT_PROCESSING → SUCCESS          |
| 发起提币     | POST /crypto/withdraw               | CRYPTO_WITHDRAW_PROCESSING → SUCCESS |
| 创建共享账户 | POST /vcc/shared-accounts           | SHARED_ACCOUNT_ACTIVE                 |
| 共享账户充值 | POST /vcc/shared-accounts/{id}/fund | SHARED_ACCOUNT_FUNDED                 |
| 发卡         | POST /vcc/cards                     | CARD_ISSUED                           |
| 查询交易     | GET /vcc/cards/{id}/transactions    | CARD_TRANSACTION                      |
| 上传文件     | POST /files/upload                  | -                                     |
| 提交 RFI     | POST /rfi/submit                    | RFI_RESOLVED / REJECTED               |

---

## 6. 时序与 ETA 估算

| 阶段                     | 子任务                   | ETA       | 备注               |
| ------------------------ | ------------------------ | --------- | ------------------ |
| **入驻**           | KYB + VCC 产品开通       | 5-7 天    | 含 SP 风控审核     |
| **VA 申请**        | VA 创建 + 审核           | 1-3 天    | 并行可提前申请     |
| **首笔充值**       | 银行转账 + 风控 + 入账   | 1-2 天    | 依赖银行时效       |
| **共享卡首次**     | 创建账户 + 充值 + 发卡   | 实时-1 天 | 充值后风控可能耗时 |
| **充值卡**         | 发卡 + 充值              | 实时-1 天 | 可一步完成         |
| **共享卡复用**     | 直接发卡                 | 实时      | 已有共享账户       |
| **OnRamp/OffRamp** | 产品开通 + 首笔交易      | 3-5 天    | 开通后即可实时交易 |
| **提现/提币**      | 添加收款人 + 审核 + 付款 | 1-3 天    | 收款人首次需审核   |

> **首次全链路打通**：约 10-15 个工作日 `<br>`
> **日常运营（发卡/消费）**：实时 - 分钟级

---

## 7. 注意事项

1. **付款水单**：目前暂无独立接口获取付款水单，可通过 Webhook 数据自行生成
2. **非同名账户**：6月初将支持非同名法币收款人（当前仅限同名）
3. **数币收款人**：暂无身份限制，支持任意链上地址
4. **风控时效**：风控审核时间因场景和金额而异，大额/异常交易可能耗时较长
5. **并发建议**：共享账户适合批量发卡场景；充值卡适合独立资金管理场景
6. **余额监控**：建议订阅 Webhook 实时同步钱包/账户/卡余额变动
