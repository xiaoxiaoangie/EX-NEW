# 业务产品、基础产品、业务特性与交易映射

## 1. 文档目标

本文统一定义以下对象及其关系：

1. 业务产品：客户实际申请、使用和看到的产品；
2. 基础产品：平台可独立配置、执行和复用的标准能力；
3. 业务特性：不改变产品核心能力，但影响执行参数、服务方式或计费的属性；
4. 交易：客户使用产品后产生的一次实际资金执行记录。

总体关系：

```text
业务产品
├─ 引用一个或多个基础产品
├─ 携带本次业务特性
└─ 根据业务特性匹配计费 SKU

基础产品
└─ 执行后产生一笔或多笔标准交易
```

## 2. 核心定义

### 2.1 业务产品（Business Product）

业务产品是面向客户的产品定义，用来回答：

> 客户开通和使用的是什么业务？

业务产品具有以下特征：

- 面向客户展示；
- 可以申请、签约或授权；
- 描述完整客户场景；
- 可以引用一个或多个基础产品；
- 可以携带多项业务特性；
- 是产品运营和客户业务统计的一级口径。

本期业务产品包括：

| 业务产品 Code | 中文名称 | 英文名称 | 定义 | 建设阶段 |
|---|---|---|---|---|
| `TOP_UP` | 充值 | Top Up | Counterparty 为客户本人，将法币或数币充入客户钱包；可同币种或异币种入账 | 一期 |
| `WITHDRAWAL` | 提现/提币 | Withdrawal | Counterparty 为客户本人，将钱包中的法币或数币提至客户自有账户/地址；可同币种或异币种提取 | 一期 |
| `COLLECTION` | 收款 | Collection | Counterparty 为第三方，第三方向客户支付法币或数币；可同币种或异币种结算 | 一期 |
| `PAYMENT` | 付款 | Payment | Counterparty 为第三方，客户向第三方支付法币或数币；可同币种或异币种支付 | 一期 |
| `REALTIME_FX` | 实时换汇 | Real-time FX | Fiat → Fiat，Prefund 模式下即时换汇 | 一期 |
| `POSTFUND_FX` | 预约换汇 | Post-funded FX | Fiat → Fiat，Postfund 模式下先成交/锁价、后补足资金 | **二期** |
| `LIMIT_FX` | 挂单换汇 | Limit Order FX | Fiat → Fiat，按目标汇率挂单，成交后完成换汇 | **二期** |
| `FIAT_CRYPTO_CONVERSION` | 数法兑换 | Fiat–Stablecoin Conversion | Fiat ↔ Stablecoin，不区分法转数或数转法产品，方向作为订单字段 | 一期 |
| `SCHEDULED_PAYMENT` | 预约付款 | Scheduled Payment | 先创建付款订单，再由客户充值，必要时兑换，最后向第三方付款 | 一期 |
| `CNY_SETTLEMENT` | 人民币结汇 | CNY Settlement | 将符合条件的资金结算为人民币，支持普通、极速、企业申报等业务特性 | 一期 |

阶段范围说明：一期不建设 Postfund 预约换汇和 Limit Order 挂单换汇相关的下单、授信、敞口、挂单、撤单、部分成交及过期能力；数据模型可以预留相应编码和扩展字段，但不进入一期客户入口和验收范围。

### 2.2 基础产品（Base Product）

基础产品是平台可独立配置、授权、执行和复用的标准能力，用来回答：

> 平台为了完成业务，需要调用哪些能力？

基础产品具有以下特征：

- 有明确的输入、输出或资金方向；
- 可以独立配置币种、渠道、地区、限额和风控规则；
- 可以被不同业务产品复用；
- 执行后能够产生标准交易；
- 不包含“先做什么、再做什么”的完整场景编排。

基础产品与交易的区别：

| 对象 | 定义 | 示例 |
|---|---|---|
| 基础产品 | 长期存在的能力模板 | 法币付款 |
| 交易 | 某个客户实际执行该能力的实例 | 客户 A 向供应商支付 10,000 USD |

推荐基础产品清单：

| 基础产品 Code | 中文名称 | 英文名称 | 能力范围 |
|---|---|---|---|
| `FIAT_TOP_UP` | 法币充值 | Fiat Top Up | Self，法币进入客户钱包 |
| `CRYPTO_TOP_UP` | 数币充值 | Crypto Top Up | Self，数币进入客户钱包 |
| `FIAT_COLLECTION` | 法币收款 | Fiat Collection | Third party 使用法币向客户付款 |
| `CRYPTO_COLLECTION` | 数币收款 | Crypto Collection | Third party 使用数币向客户付款 |
| `FIAT_WITHDRAWAL` | 法币提现 | Fiat Withdrawal | 法币提至客户本人法币账户 |
| `CRYPTO_WITHDRAWAL` | 数币提币 | Crypto Withdrawal | 数币提至客户本人链上地址 |
| `FIAT_PAYMENT` | 法币付款 | Fiat Payment | Third party 最终收到法币 |
| `CRYPTO_PAYMENT` | 数币付款 | Crypto Payment | Third party 最终收到数币 |
| `FIAT_FX` | 换汇 | Fiat FX | Fiat → Fiat |
| `CRYPTO_SWAP` | 数币闪兑 | Crypto Swap | Crypto → Crypto |
| `FIAT_TO_STABLECOIN` | 法转数 | Fiat to Stablecoin | Fiat → Stablecoin |
| `STABLECOIN_TO_FIAT` | 数转法 | Stablecoin to Fiat | Stablecoin → Fiat |
| `MEMBER_TRANSFER` | 会员间转账 | Member Transfer | 平台会员之间同资产转账 |
| `REALLOCATION` | 调拨 | Fund Reallocation | SP 或资金池之间的流动性调拨 |
| `CNY_SETTLEMENT_EXECUTION` | 人民币结汇 | CNY Settlement Execution | 执行人民币结汇及相关结算处理 |

截图中的名称建议按以下方式归一：

| 原名称 | 标准基础产品 |
|---|---|
| 买入数币 | 法转数 |
| 法转数 | 法转数 |
| 卖出数币 | 数转法 |
| 数转法 | 数转法 |
| 换汇 | 换汇 |
| 闪兑 | 数币闪兑 |

“买入数币/卖出数币”可以作为客户展示文案，但后台分别统一使用 `FIAT_TO_STABLECOIN` 和 `STABLECOIN_TO_FIAT`，避免重复配置同一种能力。

### 2.3 业务特性（Business Feature）

业务特性是在不改变核心产品能力的前提下，描述本次业务如何执行、通过什么渠道执行或按什么服务标准执行的属性。

业务特性：

- 不独立成为基础产品；
- 一般不单独授权；
- 可以影响报价、费率或计费 SKU；
- 必须在订单创建时保存快照；
- 不改变底层交易类型。

业务特性与业务产品的边界：

- 如果差异改变客户业务目的、核心下单流程或订单状态机，应定义为业务产品；
- 如果差异只影响汇率确定方式、渠道、服务等级、申报路由或价格，应定义为业务特性；
- 业务特性是计费 SKU 的匹配因子，业务特性本身不是 SKU；
- 计费 SKU 是系统根据业务产品、基础产品和业务特性最终匹配出的收费单元。

常用业务特性：

| 特性维度 | 可选值示例 | 适用业务产品 | 是否可作 SKU 因子 |
|---|---|---|---|
| Counterparty 类型 | `SELF` / `THIRD_PARTY` | 充值、提现、收款、付款、预约付款 | 是 |
| Counterparty 资产类型 | `FIAT` / `CRYPTO` | 收款、付款 | 是 |
| 资金模式 | `PREFUND` / `POSTFUND` | 换汇、兑换、预约付款 | 是 |
| 币种关系 | `SAME_CURRENCY` / `CROSS_CURRENCY` / `CROSS_ASSET` | 充提、收付款 | 是 |
| 成交方式 | `INSTANT` / `LIMIT_ORDER` | 实时换汇、挂单换汇（二期）、数币闪兑 | 是 |
| 是否锁汇 | `LOCKED` / `FLOATING` | 预约付款、预约换汇（二期） | 是 |
| 付款网络 | `LOCAL` / `SWIFT` / `BLOCKCHAIN` | 付款、预约付款 | 是 |
| 费用承担 | `OUR` / `SHA` / `BEN` | SWIFT 付款 | 是 |
| 结汇速度 | `STANDARD` / `EXPRESS` | 人民币结汇 | 是 |
| 申报类型 | `NORMAL` / `ENTERPRISE_DECLARATION` | 人民币结汇 | 是 |
| 商户主体类型 | `MAINLAND_CHINA` / `OVERSEAS` | 人民币结汇 | 是 |
| 申报模式 | `MAINLAND_MERCHANT_DECLARATION` / `OVERSEAS_MERCHANT_DECLARATION` | 人民币结汇 | 是 |
| 客户等级 | `STANDARD` / `VIP` | 全部 | 是 |
| 金额区间 | 阶梯区间 | 全部 | 是 |

业务特性可以影响计费，但收费不同不自动产生新产品。例如：

```text
业务产品：付款
基础产品：法币付款
业务特性：付款网络 = SWIFT，费用承担 = OUR
计费 SKU：FIAT_PAYMENT_SWIFT_OUR
```

```text
业务产品：人民币结汇
基础产品：人民币结汇
业务特性：结汇速度 = EXPRESS
计费 SKU：CNY_SETTLEMENT_EXPRESS
客户展示：极速结汇
```

业务特性和 SKU 的关系示例：

```text
业务产品：预约付款
业务特性：汇率模式 = LOCKED，付款网络 = SWIFT
计费 SKU：SCHEDULED_PAYMENT_LOCKED_SWIFT
```

这里 `LOCKED` 是业务特性，`SCHEDULED_PAYMENT_LOCKED_SWIFT` 才是计费 SKU。

## 3. 业务产品与基础产品映射

### 3.1 总体映射

| 业务产品 | 业务场景 | 必选基础产品 | 条件基础产品 | 关键业务特性 |
|---|---|---|---|---|
| 充值 | 充法币 | 法币充值 | 换汇、法转数 | Self、同/异币种、入账资产 |
| 充值 | 充数币 | 数币充值 | 数币闪兑、数转法 | Self、同/异币种、入账资产 |
| 提现 | 提法币 | 法币提现 | 换汇、数转法 | Self、同/异币种、目标资产 |
| 提现 | 提数币 | 数币提币 | 数币闪兑、法转数 | Self、同/异币种、目标资产 |
| 收款 | 收法币 | 法币收款 | 换汇、法转数 | Third party、同/异币种、结算资产 |
| 收款 | 收数币 | 数币收款 | 数币闪兑、数转法 | Third party、同/异币种、结算资产 |
| 付款 | 付法币 | 法币付款 | 换汇、数转法 | Third party、Local/SWIFT、同/异币种 |
| 付款 | 付数币 | 数币付款 | 数币闪兑、法转数 | Third party、链、同/异币种 |
| 实时换汇 | Fiat → Fiat，即时成交 | 换汇 | — | Prefund、Instant |
| 预约换汇（二期） | Fiat → Fiat，后补资金 | 换汇 | — | Postfund、是否锁汇、资金期限 |
| 挂单换汇（二期） | Fiat → Fiat，目标价成交 | 换汇 | — | Limit Order、目标汇率、有效期 |
| 数法兑换 | Fiat → Stablecoin | 法转数 | — | 方向、Prefund/Postfund |
| 数法兑换 | Stablecoin → Fiat | 数转法 | — | 方向、Prefund/Postfund |
| 预约付款 | 先充法币再付款 | 法币充值、法币/数币付款 | 换汇、法转数 | Self → Third party、锁汇、付款网络 |
| 预约付款 | 先充数币再付款 | 数币充值、法币/数币付款 | 数币闪兑、数转法 | Self → Third party、锁汇、付款网络 |
| 人民币结汇 | 普通人民币结汇 | 人民币结汇 | 收款、换汇、法币付款 | Standard、申报类型 |
| 人民币结汇 | 极速人民币结汇 | 人民币结汇 | 收款、换汇、法币付款 | Express、额度、专用路由 |
| 人民币结汇 | 企业申报结汇 | 人民币结汇 | 收款、换汇、法币付款 | Enterprise Declaration、退税材料 |

### 3.2 充值

充值的 Counterparty 固定为 `SELF`。

| 客户资金来源 | 客户入账 | 基础产品链路 |
|---|---|---|
| 法币 A | 法币 A | 法币充值 |
| 法币 A | 法币 B | 法币充值 → 换汇 |
| 法币 | Stablecoin | 法币充值 → 法转数 |
| 数币 A | 数币 A | 数币充值 |
| 数币 A | 数币 B | 数币充值 → 数币闪兑 |
| Stablecoin | 法币 | 数币充值 → 数转法 |

交易列表的业务产品统一显示“充值”，同时显示执行明细，例如“法币充值”“充值后换汇”。

### 3.3 提现/提币

提现/提币的 Counterparty 固定为 `SELF`。

| 客户扣款 | 提取目标 | 基础产品链路 |
|---|---|---|
| 法币 A | 法币 A | 法币提现 |
| 法币 A | 法币 B | 换汇 → 法币提现 |
| Stablecoin | 法币 | 数转法 → 法币提现 |
| 数币 A | 数币 A | 数币提币 |
| 数币 A | 数币 B | 数币闪兑 → 数币提币 |
| 法币 | Stablecoin | 法转数 → 数币提币 |

法币使用“提现”，数币使用“提币”。

### 3.4 收款

收款的 Counterparty 固定为 `THIRD_PARTY`。“收法币/收数币”按照 Counterparty 实际支付的资产类型定义。

| Counterparty 支付 | 客户结算 | 基础产品链路 |
|---|---|---|
| 法币 A | 法币 A | 法币收款 |
| 法币 A | 法币 B | 法币收款 → 换汇 |
| 法币 | Stablecoin | 法币收款 → 法转数 |
| 数币 A | 数币 A | 数币收款 |
| 数币 A | 数币 B | 数币收款 → 数币闪兑 |
| Stablecoin | 法币 | 数币收款 → 数转法 |

### 3.5 付款

付款的 Counterparty 固定为 `THIRD_PARTY`。“付法币/付数币”按照 Counterparty 最终收到的资产类型定义。

| 客户扣款 | Counterparty 收到 | 基础产品链路 |
|---|---|---|
| 法币 A | 法币 A | 法币付款 |
| 法币 A | 法币 B | 换汇 → 法币付款 |
| Stablecoin | 法币 | 数转法 → 法币付款 |
| 数币 A | 数币 A | 数币付款 |
| 数币 A | 数币 B | 数币闪兑 → 数币付款 |
| 法币 | Stablecoin | 法转数 → 数币付款 |

本地付款和 SWIFT 付款仍属于同一个“付款”业务产品，付款网络作为业务特性并参与 SKU 匹配。

### 3.6 实时换汇（一期）、预约换汇与挂单换汇（二期）

三个业务产品都调用基础产品“换汇”，区别由业务特性和订单流程表达：

| 业务产品 | 基础产品 | 资金模式 | 成交方式 | 主要差异 |
|---|---|---|---|---|
| 实时换汇 | 换汇 | Prefund | Instant | 余额充足后立即成交 |
| 预约换汇（二期） | 换汇 | Postfund | Instant/Locked Quote | 先成交或锁价，约定时间补足资金 |
| 挂单换汇（二期） | 换汇 | Prefund 或按政策配置 | Limit Order | 达到目标汇率后成交，可撤单或过期 |

#### 为什么挂单换汇是业务产品（二期）

挂单换汇虽然复用基础产品“换汇”，但它改变了核心订单流程和状态机：

- 客户需要设置目标汇率和订单有效期；
- 下单后进入待成交状态，而不是立即成交；
- 可能出现部分成交、全部成交、已撤销和已过期；
- 挂单时不生成已完成的 Conversion，实际成交时才生成 Conversion；
- 运营、客户和客服需要以“挂单换汇”独立查询和管理订单。

因此推荐：

```text
业务产品：挂单换汇
基础产品：换汇
固定执行方式：LIMIT_ORDER
订单参数：目标汇率、有效期、是否允许部分成交
计费因子：Maker/Taker、客户等级、成交金额等
交易：成交后生成 Conversion
```

“挂单换汇”是业务产品；目标汇率、有效期等是订单参数；Maker/Taker、客户等级等可以作为计费 SKU 因子。

### 3.7 数法兑换

数法兑换是一个业务产品，根据方向调用不同基础产品：

| 兑换方向 | 基础产品 | 标准交易类型 |
|---|---|---|
| Fiat → Stablecoin | 法转数 | Conversion |
| Stablecoin → Fiat | 数转法 | Conversion |

### 3.8 预约付款

预约付款包含两个 Counterparty 阶段：

1. 客户充值阶段：`SELF`；
2. 对外付款阶段：`THIRD_PARTY`。

基础产品编排：

```text
创建预约付款订单
→ 法币充值或数币充值：Fund In
→ 如资产/币种不同，执行换汇、数币闪兑、法转数或数转法：Conversion
→ 法币付款或数币付款：Fund Out
```

锁汇/不锁汇、本地/SWIFT、到账自动执行等均作为业务特性。

#### 实时汇率与锁定汇率

实时汇率和锁定汇率不拆成两个业务产品，因为两者的客户目的和主流程相同：都是先创建预约付款订单，资金到位后完成付款。

| 汇率模式 | 汇率确定时间 | 业务特性值 | 计费 SKU 示例 |
|---|---|---|---|
| 实时汇率 | 到账或执行付款时获取汇率 | `rate_mode = FLOATING` | `SCHEDULED_PAYMENT_FLOATING_LOCAL` |
| 锁定汇率 | 创建订单时锁定汇率及有效期 | `rate_mode = LOCKED` | `SCHEDULED_PAYMENT_LOCKED_LOCAL` |

如再叠加付款网络，可以匹配不同 SKU：

| 汇率模式 | 付款网络 | SKU 示例 |
|---|---|---|
| 实时汇率 | Local | `SCHEDULED_PAYMENT_FLOATING_LOCAL` |
| 锁定汇率 | Local | `SCHEDULED_PAYMENT_LOCKED_LOCAL` |
| 实时汇率 | SWIFT | `SCHEDULED_PAYMENT_FLOATING_SWIFT` |
| 锁定汇率 | SWIFT | `SCHEDULED_PAYMENT_LOCKED_SWIFT` |

推荐保存：

```text
rate_mode = FLOATING | LOCKED
quote_id
locked_rate
rate_locked_at
rate_expire_at
payment_network = LOCAL | SWIFT | BLOCKCHAIN
pricing_sku_code
pricing_rule_snapshot
```

只有当锁汇预约付款需要独立申请、单独合同或独立授信，而实时汇率预约付款不需要时，才将其拆成两个业务产品。

### 3.9 人民币结汇

人民币结汇作为业务产品，底层调用“人民币结汇”基础产品；如执行链路包含收款、换汇或对外结算，可继续组合相应基础产品。

“普通、极速、企业申报”不改变人民币结汇的核心能力，作为业务特性和计费 SKU 因子：

| 客户展示 | 业务产品 | 关键业务特性 | SKU 示例 |
|---|---|---|---|
| 人民币结汇 | 人民币结汇 | Standard | `CNY_SETTLEMENT_STANDARD` |
| 极速结汇 | 人民币结汇 | Express | `CNY_SETTLEMENT_EXPRESS` |
| 企业申报结汇 | 人民币结汇 | Enterprise Declaration | `CNY_SETTLEMENT_ENTERPRISE` |

#### 大陆主体与海外主体申报

商户为大陆主体和海外主体时，申报责任人、所需材料和处理流程可能不同，但客户目标仍然是“人民币结汇”。因此默认保留一个业务产品，通过商户主体和申报模式进入不同流程分支，不拆成两个业务产品。

这里应按商户主体判断，不应使用汇款人类型代替：

```text
业务产品：人民币结汇
→ 读取 merchant_entity_type
  ├─ MAINLAND_CHINA
  │  └─ declaration_mode = MAINLAND_MERCHANT_DECLARATION
  └─ OVERSEAS
     └─ declaration_mode = OVERSEAS_MERCHANT_DECLARATION
→ 确定申报责任主体、材料和申报渠道
→ 执行人民币结汇
```

推荐字段：

```text
merchant_entity_type
declaration_mode
declarant_type
declarant_entity_id
required_documents
declaration_channel
declaration_status
```

其中：

- `merchant_entity_type` 是客户固有属性，不由客户下单选择；
- `declaration_mode` 是系统根据商户主体及业务规则派生的业务特性；
- 两者都可以参与计费 SKU 匹配；
- 普通/极速是客户可选择或由客户权限决定的服务特性。

SKU 示例：

| 商户主体 | 结汇速度 | SKU 示例 |
|---|---|---|
| 大陆主体 | 普通 | `CNY_SETTLEMENT_MAINLAND_STANDARD` |
| 大陆主体 | 极速 | `CNY_SETTLEMENT_MAINLAND_EXPRESS` |
| 海外主体 | 普通 | `CNY_SETTLEMENT_OVERSEAS_STANDARD` |
| 海外主体 | 极速 | `CNY_SETTLEMENT_OVERSEAS_EXPRESS` |

只有当两类主体需要分别申请、使用不同合同或法律服务主体、具有完全不同的产品准入及交付结果时，才拆成“境内主体人民币结汇”和“海外主体人民币结汇”两个业务产品。

## 4. 基础产品与交易映射

### 4.1 映射总表

| 基础产品 Code | 基础产品（中/英） | 交易类型 Code | 交易类型中文 | 交易类型英文 | 资金结果 |
|---|---|---|---|---|---|
| `FIAT_TOP_UP` | 法币充值 / Fiat Top Up | `FUND_IN` | 入账 | Fund In | 客户法币余额增加 |
| `CRYPTO_TOP_UP` | 数币充值 / Crypto Top Up | `FUND_IN` | 入账 | Fund In | 客户数币余额增加 |
| `FIAT_COLLECTION` | 法币收款 / Fiat Collection | `FUND_IN` | 入账 | Fund In | 第三方法币进入客户账户 |
| `CRYPTO_COLLECTION` | 数币收款 / Crypto Collection | `FUND_IN` | 入账 | Fund In | 第三方数币进入客户账户 |
| `FIAT_WITHDRAWAL` | 法币提现 / Fiat Withdrawal | `FUND_OUT` | 出账 | Fund Out | 客户法币余额减少并提至本人账户 |
| `CRYPTO_WITHDRAWAL` | 数币提币 / Crypto Withdrawal | `FUND_OUT` | 出账 | Fund Out | 客户数币余额减少并提至本人地址 |
| `FIAT_PAYMENT` | 法币付款 / Fiat Payment | `FUND_OUT` | 出账 | Fund Out | 客户资金用于向第三方支付法币 |
| `CRYPTO_PAYMENT` | 数币付款 / Crypto Payment | `FUND_OUT` | 出账 | Fund Out | 客户资金用于向第三方支付数币 |
| `FIAT_FX` | 换汇 / Fiat FX | `CONVERSION` | 兑换 | Conversion | 来源法币减少、目标法币增加 |
| `CRYPTO_SWAP` | 数币闪兑 / Crypto Swap | `CONVERSION` | 兑换 | Conversion | 来源数币减少、目标数币增加 |
| `FIAT_TO_STABLECOIN` | 法转数 / Fiat to Stablecoin | `CONVERSION` | 兑换 | Conversion | 法币减少、Stablecoin 增加 |
| `STABLECOIN_TO_FIAT` | 数转法 / Stablecoin to Fiat | `CONVERSION` | 兑换 | Conversion | Stablecoin 减少、法币增加 |
| `MEMBER_TRANSFER` | 会员间转账 / Member Transfer | `TRANSFER` | 转账 | Transfer | 付款会员减少、收款会员增加 |
| `REALLOCATION` | 调拨 / Fund Reallocation | `REALLOCATE` | 调拨 | Reallocate | 平台/SP/资金池的资金位置变化 |
| `CNY_SETTLEMENT_EXECUTION` | 人民币结汇 / CNY Settlement Execution | `SETTLEMENT` | 结算 | Settlement | 待结汇资金完成 CNY 结算 |

### 4.2 交易类型定义

| 交易类型 Code | 中文名称 | 英文名称 | 定义 | 注意事项 |
|---|---|---|---|---|
| `FUND_IN` | 入账 | Fund In | 外部资金进入客户钱包或账户 | 充值和收款通过 Counterparty 类型区分 |
| `FUND_OUT` | 出账 | Fund Out | 客户钱包或账户资金向外支付 | 提现和付款通过 Counterparty 类型区分 |
| `CONVERSION` | 兑换 | Conversion | 币种或资产发生转换 | 覆盖 Fiat-Fiat、Crypto-Crypto、Fiat-Stablecoin |
| `TRANSFER` | 转账 | Transfer | 平台会员之间或客户内部账户之间转账 | 不等同于第三方付款 |
| `REALLOCATE` | 调拨 | Reallocate | 平台、SP 或资金池流动性调拨 | 不作为客户业务产品 |
| `SETTLEMENT` | 结算 | Settlement | 结算处理完成 | 如账务系统不设置 Settlement，可按实际链路拆为 Fund In、Conversion、Fund Out |

人民币结汇是否使用独立 `Settlement` 交易类型，需要由账务模型最终确认：

- 如果“结汇完成”是一个可独立入账、对账和冲正的账务事件，使用 `Settlement`；
- 如果人民币结汇只是收款、换汇、付款的业务编排，不新增交易类型，按实际资金动作生成 Fund In、Conversion、Fund Out。

推荐优先复用现有交易类型，除非账务和对账明确需要独立识别 Settlement。

## 5. 业务产品、基础产品、业务特性与 SKU 示例

| 客户订单 | 业务产品 | 基础产品 | 业务特性 | 计费 SKU | 交易 |
|---|---|---|---|---|---|
| USD 本地付款 | 付款 | 法币付款 | Local、Same Currency | `FIAT_PAYMENT_LOCAL` | Fund Out |
| USD SWIFT OUR 付款 | 付款 | 法币付款 | SWIFT、OUR | `FIAT_PAYMENT_SWIFT_OUR` | Fund Out |
| USD 换 EUR 后付款 | 付款 | 换汇 + 法币付款 | Cross Currency、SWIFT | `FIAT_PAYMENT_FX_SWIFT` | Conversion → Fund Out |
| USDT 换 USDC | 数币闪兑或直接调用基础产品 | 数币闪兑 | Instant | `CRYPTO_SWAP_INSTANT` | Conversion |
| 按目标价 USD 换 EUR（二期） | 挂单换汇 | 换汇 | Limit Order | `FX_LIMIT_ORDER` | 成交后 Conversion |
| 实时汇率预约付款 | 预约付款 | 充值 + 可选换汇 + 付款 | Floating、Local | `SCHEDULED_PAYMENT_FLOATING_LOCAL` | Fund In → 可选 Conversion → Fund Out |
| 锁汇预约付款 | 预约付款 | 充值 + 换汇 + 法币付款 | Locked、SWIFT | `SCHEDULED_PAYMENT_LOCKED_SWIFT` | Fund In → Conversion → Fund Out |
| 极速人民币结汇 | 人民币结汇 | 人民币结汇及所需组合能力 | Express | `CNY_SETTLEMENT_EXPRESS` | Settlement 或实际交易链路 |
| 海外主体极速结汇 | 人民币结汇 | 人民币结汇及所需组合能力 | Overseas、Express | `CNY_SETTLEMENT_OVERSEAS_EXPRESS` | Settlement 或实际交易链路 |

## 6. 推荐数据字段

### 6.1 业务产品

```text
BusinessProduct
- business_product_code
- business_product_name
- description
- customer_visible
- application_required
- status
```

### 6.2 基础产品

```text
BaseProduct
- base_product_code
- base_product_name
- supported_asset_types
- supported_currencies
- default_transaction_type
- status
```

### 6.3 业务产品与基础产品关系

```text
BusinessProductComponent
- business_product_code
- base_product_code
- sequence_no
- required
- execution_condition
```

### 6.4 业务特性

```text
BusinessFeature
- feature_code
- feature_name
- value_type
- allowed_values
- sku_factor
```

### 6.5 业务订单

```text
BusinessOrder
- order_id
- business_product_code
- business_product_name_snapshot
- feature_snapshot
- pricing_sku_code
- pricing_rule_snapshot
- counterparty_type
- counterparty_asset_type
- funding_asset_type
- settlement_asset_type
- source_currency
- target_currency
- status
```

### 6.6 基础产品执行与交易

```text
OrderExecution
- execution_id
- order_id
- base_product_code
- sequence_no
- transaction_id
- status

Transaction
- transaction_id
- transaction_type
- display_name
- asset
- amount
- direction
- status
```

## 7. 最终口径

```text
业务产品：客户在做什么业务
基础产品：平台调用什么标准能力完成业务
业务特性：这次业务按什么方式、渠道或服务等级执行
计费 SKU：基于业务产品、基础产品和业务特性按什么价格收费
交易：这次实际发生了什么资金事件
```

交易列表建议优先展示业务产品名称，并在详情中展示基础产品执行步骤、业务特性、费用和实际交易；对于直接由钱包触发的充提，可以直接展示“法币充值、数币充值、法币提现、数币提币”。
