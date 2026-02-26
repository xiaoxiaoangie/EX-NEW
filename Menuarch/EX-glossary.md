# EX 平台专业术语表（Glossary）

> **文档版本**：v2.0
> **创建日期**：2026-02-22
> **适用范围**：EX 平台全产品线（On/Off-Ramp · VCC · Crypto Checkout）
> **语言版本**：简体中文 · 繁體中文（粵語）· English

---

## 目录

1. [核心业务术语](#1-核心业务术语)
2. [订单与交易术语](#2-订单与交易术语)
3. [账户与资金术语](#3-账户与资金术语)
4. [数字货币术语](#4-数字货币术语)
5. [支付与收付款术语](#5-支付与收付款术语)
6. [费率与汇率术语](#6-费率与汇率术语)
7. [风控与合规术语](#7-风控与合规术语)
8. [平台角色术语](#8-平台角色术语)
9. [系统架构术语](#9-系统架构术语)
10. [状态与流程术语](#10-状态与流程术语)
11. [VCC（虚拟卡）术语](#11-vcc虚拟卡术语)
12. [数币收单（Crypto Checkout）术语](#12-数币收单crypto-checkout术语)

---

## 1. 核心业务术语

| 简体中文        | 繁體中文（粵語） | English                                    | 说明                                                    |
| --------------- | ---------------- | ------------------------------------------ | ------------------------------------------------------- |
| 承兑            | 承兌             | Exchange / Conversion                      | 法币与数币之间的兑换行为，是 On/Off-Ramp 的核心动作     |
| 入金            | 入金             | On-Ramp / Fiat-to-Crypto                   | 法币兑换为数字货币的过程，资金从法币世界进入数币世界    |
| 出金            | 出金             | Off-Ramp / Crypto-to-Fiat                  | 数字货币兑换为法币的过程，资金从数币世界回到法币世界    |
| 法币            | 法幣             | Fiat Currency / Fiat                       | 由政府发行的法定货币，如 USD、EUR、GBP、SGD             |
| 数币 / 数字货币 | 數幣 / 數字貨幣  | Cryptocurrency / Digital Currency / Crypto | 基于区块链的数字资产，如 USDT、USDC、BTC                |
| 稳定币          | 穩定幣           | Stablecoin                                 | 与法币挂钩的数字货币，价值相对稳定，如 USDT（锚定 USD） |
| 数法融合        | 數法融合         | Crypto-Fiat Integration                    | 数字货币与法币之间的无缝兑换与流转能力                  |
| 跨境支付        | 跨境支付         | Cross-Border Payment                       | 涉及不同国家/地区之间的资金转移                         |

---

## 2. 订单与交易术语

| 简体中文 | 繁體中文（粵語） | English                  | 说明                                                 |
| -------- | ---------------- | ------------------------ | ---------------------------------------------------- |
| 商户单   | 商戶單           | Merchant Order           | 面向商户的顶层订单，聚合所有底层交易单状态           |
| 交易单   | 交易單           | Transaction              | 按 SP 拆分的具体交易记录，包含计费、汇率、风控、记账 |
| 渠道单   | 渠道單           | Channel Order            | SP 调用底层渠道的执行记录，仅 SP 后台可见            |
| 预约单   | 預約單           | Reservation Order        | 商户先下单预约，等银行转账到账后自动触发承兑的订单   |
| 即时单   | 即時單           | Instant Order            | 使用法币钱包余额直接扣款，实时完成承兑的订单         |
| 三单模型 | 三單模型         | Three-Layer Order Model  | 商户单 → 交易单 → 渠道单的三层单据架构             |
| 交易单链 | 交易單鏈         | Transaction Chain        | 一个商户单下按顺序执行的多笔交易单序列               |
| 挂账     | 掛賬             | Suspense / Pending Entry | 收到款项但无法匹配到预约单时，资金暂挂在账户中       |

---

## 3. 账户与资金术语

| 简体中文   | 繁體中文（粵語） | English                                             | 说明                                                             |
| ---------- | ---------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| 法币账户   | 法幣賬戶         | Fiat Account                                        | 持有法定货币余额的账户，按 SP 区分（BB 法币账户 / IPL 法币账户） |
| 数币钱包   | 數幣錢包         | Crypto Wallet                                       | 持有数字货币的钱包，支持充币/提币，由 BB 提供                    |
| 虚拟账户   | 虛擬賬戶         | Virtual Account (VA)                                | 银行分配的专属虚拟收款账号，用于同名收款，一户一号               |
| 代收付账户 | 代收付賬戶       | Omnibus Account / Collection & Disbursement Account | BB 自有的统一收付款账户，多个商户共用同一账号                    |
| 中间户     | 中間戶           | Intermediary Account / Transit Account              | BB 和 IPL 之间用于跨 SP 资金划转的清算中间账户                   |
| 同名充值   | 同名充值         | mso 叫：Transfer In 有MPI/SVF 叫 Top Up             | 商户从自有银行账户向平台法币账户转入资金（汇款人 = 商户）        |
| 提现       | 提現             | Withdrawal                                          | 从平台法币账户提取资金到商户银行账户                             |
| 充币       | 充幣             | Crypto Deposit                                      | 从外部链上地址向平台数币钱包转入数字货币                         |
| 提币       | 提幣             | Crypto Withdrawal                                   | 从平台数币钱包向外部链上地址转出数字货币                         |
| 冻结       | 凍結             | Freeze / Hold                                       | 交易发起时锁定账户中对应金额，防止重复使用                       |
| 余额       | 餘額             | Balance                                             | 账户中可用的资金数量                                             |
| 资金调拨   | 資金調撥         | Fund Transfer / Internal Transfer                   | IPL 与 BB 之间定期进行的资金轧差和划转                           |

---

## 4. 数字货币术语

| 简体中文        | 繁體中文（粵語） | English                           | 说明                                 |
| --------------- | ---------------- | --------------------------------- | ------------------------------------ |
| USDT            | USDT             | USDT (Tether)                     | 锚定美元的稳定币，由 Tether 公司发行 |
| USDC            | USDC             | USDC (USD Coin)                   | 锚定美元的稳定币，由 Circle 公司发行 |
| 链 / 公链       | 鏈 / 公鏈        | Blockchain / Chain / Network      | 数字货币运行的底层区块链网络         |
| TRC-20          | TRC-20           | TRC-20 (TRON)                     | TRON 区块链上的代币标准，Gas 费低    |
| ERC-20          | ERC-20           | ERC-20 (Ethereum)                 | 以太坊区块链上的代币标准             |
| BEP-20          | BEP-20           | BEP-20 (BNB Chain)                | BNB Chain 上的代币标准               |
| Gas 费 / 网络费 | Gas 費 / 網絡費  | Gas Fee / Network Fee             | 链上交易所需支付的区块链网络手续费   |
| 链上地址        | 鏈上地址         | On-Chain Address / Wallet Address | 区块链上用于接收数字货币的唯一标识   |
| 链上交易        | 鏈上交易         | On-Chain Transaction              | 在区块链网络上执行并记录的交易       |

---

## 5. 支付与收付款术语

| 简体中文    | 繁體中文（粵語） | English                                                             | 说明                                   |
| ----------- | ---------------- | ------------------------------------------------------------------- | -------------------------------------- |
| 银行转账    | 銀行轉賬         | Bank Transfer / Wire Transfer                                       | 通过银行系统进行的资金转移             |
| 同名转账    | 同名轉賬         | Same-Name Transfer                                                  | 汇款人名称与收款商户注册名称一致的转账 |
| 异名出款    | 異名出款         | Third-Party Payment / POBO                                          | 付款人与收款人不同名的出款方式         |
| POBO        | POBO             | Payment On Behalf Of                                                | 代付，由平台代商户向第三方收款人付款   |
| COBO        | COBO             | Collection On Behalf Of                                             | 代收，由平台代商户从第三方收取款项     |
| 汇款人      | 匯款人           | Remitter / Sender                                                   | 发起银行转账的一方                     |
| 收款人      | 收款人           | Beneficiary / Payee                                                 | 接收付款的一方                         |
| 收款        | 收款             | Collection / Inbound Payment                                        | 资金流入平台账户的行为                 |
| 出款 / 付款 | 出款 / 付款      | Disbursement / Payout                                               | 资金从平台账户流出的行为               |
| 入账        | 入賬             | Credit / Inbound                                                    | 资金到达并记入账户                     |
| 扣款        | 扣款             | Debit / Deduction                                                   | 从账户中扣除资金                       |
| SWIFT       | SWIFT            | SWIFT (Society for Worldwide Interbank Financial Telecommunication) | 国际银行间通信协议，用于跨境汇款       |
| SWIFT Code  | SWIFT Code       | SWIFT Code / BIC                                                    | 银行在 SWIFT 网络中的唯一标识码        |
| 本地转账    | 本地轉賬         | Local Transfer / Domestic Transfer                                  | 同一国家/地区内的银行转账              |

---

## 6. 费率与汇率术语

| 简体中文            | 繁體中文（粵語）    | English                              | 说明                                          |
| ------------------- | ------------------- | ------------------------------------ | --------------------------------------------- |
| 汇率                | 匯率                | Exchange Rate / FX Rate              | 两种货币之间的兑换比率                        |
| 预汇率              | 預匯率              | Indicative Rate / Pre-Rate           | 下单时展示的参考汇率，非最终结算汇率          |
| 最终汇率 / 结算汇率 | 最終匯率 / 結算匯率 | Final Rate / Settlement Rate         | 实际结算时使用的汇率                          |
| 锁定汇率            | 鎖定匯率            | Locked Rate / Fixed Rate             | 即时单下单时锁定的汇率，不随市场波动          |
| 实时汇率            | 實時匯率            | Real-Time Rate / Live Rate           | 当前市场的即时汇率                            |
| 换汇                | 換匯                | Foreign Exchange / FX                | 法币账户内不同币种之间的兑换（如 USD ↔ EUR） |
| 承兑费 / 承兑手续费 | 承兌費 / 承兌手續費 | Exchange Fee / Conversion Fee        | 执行法币与数币承兑时收取的手续费              |
| 收款手续费          | 收款手續費          | Collection Fee / Receiving Fee       | VA 或代收付账户收款时收取的手续费             |
| 网络费              | 網絡費              | Network Fee / Gas Fee                | 链上转账产生的区块链网络费用                  |
| 固定费              | 固定費              | Fixed Fee / Flat Fee                 | 不随交易金额变化的固定手续费                  |
| 比例费 / 百分比费   | 比例費 / 百分比費   | Percentage Fee / Rate-Based Fee      | 按交易金额百分比计算的手续费                  |
| 内扣                | 內扣                | Inclusive Fee / Deducted from Amount | 手续费从交易金额中扣除，收款方承担            |
| 外扣                | 外扣                | Exclusive Fee / Charged Separately   | 手续费在交易金额之外另行收取，付款方承担      |
| 分佣                | 分佣                | Commission Split / Revenue Share     | 租户与 SP 之间按约定比例分配的交易佣金        |
| 限额                | 限額                | Transaction Limit                    | 单笔或每日交易金额的上下限                    |

---

## 7. 风控与合规术语

| 简体中文        | 繁體中文（粵語） | English                             | 说明                                         |
| --------------- | ---------------- | ----------------------------------- | -------------------------------------------- |
| 风控            | 風控             | Risk Control / Risk Management      | 对交易进行风险评估和控制的机制               |
| KYC             | KYC              | KYC (Know Your Customer)            | 了解你的客户，商户入网时的身份验证流程       |
| KYB             | KYB              | KYB (Know Your Business)            | 了解你的企业，针对企业客户的尽职调查         |
| AML             | AML              | AML (Anti-Money Laundering)         | 反洗钱，防止利用金融系统进行洗钱的合规检查   |
| Purpose Code    | Purpose Code     | Purpose Code / Remittance Purpose   | 银行转账备注中的用途代码，标识汇款目的       |
| 同名校验        | 同名校驗         | Name Matching / Name Verification   | 验证汇款人名称与商户注册名称是否一致         |
| 贸易背景        | 貿易背景         | Trade Background / Underlying Trade | 交易所对应的真实贸易活动，合规要求的证明材料 |
| 入网 / 入网审核 | 入網 / 入網審核  | Onboarding / Merchant Onboarding    | 商户接入平台并通过审核的过程                 |
| 持牌            | 持牌             | Licensed                            | 持有金融监管牌照，具备合规经营资质           |
| OTP             | OTP              | OTP (One-Time Password)             | 一次性密码，用于交易安全验证                 |
| 退款            | 退款             | Refund                              | 将已收取的资金原路退回给汇款人               |

---

## 8. 平台角色术语

| 简体中文   | 繁體中文（粵語） | English                         | 说明                                                |
| ---------- | ---------------- | ------------------------------- | --------------------------------------------------- |
| 平台管理员 | 平台管理員       | SaaS Admin (SA)                 | EX 平台总管理后台，管理 SP、租户、全局配置          |
| 服务提供商 | 服務提供商       | Service Provider (SP)           | 提供底层支付能力的机构（如 BB、IPL）                |
| 租户       | 租戶             | Tenant (TP)                     | 使用 SP 能力为商户提供支付服务的机构                |
| 商户       | 商戶             | Merchant (MP)                   | 最终使用支付服务的企业客户，归属于租户              |
| 会员       | 會員             | Member                          | 租户视角下对商户的称呼                              |
| 渠道       | 渠道             | Channel                         | SP 内部对接的底层支付通道（如 XPAY）                |
| 代理行     | 代理行           | Correspondent Bank / Agent Bank | 在跨境支付中代为处理资金清算的银行                  |
| 承兑服务商 | 承兌服務商       | Exchange Service Provider       | 提供数法承兑引擎能力的 SP（如 BB）                  |
| 法币服务商 | 法幣服務商       | Fiat Service Provider           | 提供法币账户、VA 收款、POBO 出款能力的 SP（如 IPL） |

---

## 9. 系统架构术语

| 简体中文 | 繁體中文（粵語） | English                        | 说明                                       |
| -------- | ---------------- | ------------------------------ | ------------------------------------------ |
| 编排层   | 編排層           | Orchestration Layer / HUB      | EX HUB，负责商户单管理、业务校验、交易编排 |
| 交易引擎 | 交易引擎         | Transaction Engine (TE)        | 负责交易单管理、计费、汇率、风控、记账     |
| 承兑引擎 | 承兌引擎         | Exchange Engine                | BB 内部执行法币与数币兑换的核心引擎        |
| 路由     | 路由             | Routing                        | 根据配置规则将交易分发到对应 SP 或渠道     |
| 幂等     | 冪等             | Idempotency                    | 同一请求多次执行产生相同结果，防止重复处理 |
| 渠道通知 | 渠道通知         | Channel Notification / Webhook | 渠道方主动推送的入账/交易结果通知          |
| 对账     | 對賬             | Reconciliation                 | 核对平台记录与渠道/银行记录是否一致        |
| 清算     | 清算             | Settlement / Clearing          | 交易完成后的资金结算和分配过程             |
| 轧差     | 軋差             | Netting                        | 将多笔应收应付汇总后只结算净额             |
| 状态机   | 狀態機           | State Machine                  | 定义订单/交易在不同状态之间流转的规则模型  |

---

## 10. 状态与流程术语

| 简体中文      | 繁體中文（粵語） | English                              | 说明                                           |
| ------------- | ---------------- | ------------------------------------ | ---------------------------------------------- |
| 已创建        | 已創建           | Created                              | 订单/交易已创建，等待后续处理                  |
| 等待汇款      | 等待匯款         | Awaiting Funds                       | 预约单已创建，等待商户完成银行转账             |
| 已匹配        | 已匹配           | Matched                              | 渠道入账通知已成功匹配到预约单                 |
| 处理中        | 處理中           | Processing                           | 交易正在执行中（承兑/收款/划转）               |
| 已完成 / 成功 | 已完成 / 成功    | Completed / Success                  | 交易全部完成，数币已入账                       |
| 失败          | 失敗             | Failed                               | 交易执行失败                                   |
| 已过期        | 已過期           | Expired                              | 预约单超时未收到汇款（默认 72 小时）           |
| 已取消        | 已取消           | Cancelled                            | 商户主动取消预约单                             |
| 退款中        | 退款中           | Refunding                            | 正在执行退款操作                               |
| 已退款        | 已退款           | Refunded                             | 退款已完成                                     |
| 人工确认      | 人工確認         | Pending Confirmation / Manual Review | 金额偏差在容差范围内，需运营人员确认           |
| 人工匹配      | 人工匹配         | Manual Matching                      | 系统无法自动匹配，需运营人员手动处理           |
| 精确匹配      | 精確匹配         | Exact Match                          | 入账金额与预约金额完全一致（偏差 ≤ 0.01）     |
| 容差匹配      | 容差匹配         | Tolerance Match                      | 入账金额在允许偏差范围内自动匹配（偏差 ≤ 5%） |

---

## 11. VCC（虚拟卡）术语

### 11.1 卡基本信息与卡组织

| 简体中文   | 繁體中文（粵語） | English                            | 说明                                          |
| ---------- | ---------------- | ---------------------------------- | --------------------------------------------- |
| 虚拟卡     | 虛擬卡           | Virtual Credit Card (VCC)          | 无实体卡片，仅有卡号/CVV/有效期，用于线上支付 |
| 卡 Bin     | 卡 Bin           | Bank Identification Number (BIN)   | 卡号前 6～8 位，标识发卡行和卡产品            |
| IIN        | IIN              | Issuer Identification Number (IIN) | 与 BIN 同义，ISO 新标准名称（8 位）           |
| 卡组织     | 卡組織           | Card Scheme / Card Network         | 国际卡组织，如 Visa、Mastercard               |
| 卡面 Logo  | 卡面 Logo        | Card Face Logo                     | 卡片正面的卡组织标识或品牌设计                |
| 发卡地区   | 發卡地區         | Issuing Region                     | 卡 Bin 所属的发卡国家/地区                    |
| 卡账户币种 | 卡賬戶幣種       | Card Account Currency              | 卡片账户的计价币种（如 USD、EUR）             |
| 卡有效期   | 卡有效期         | Card Validity Period               | 卡片有效期限，属于 Bin 固有属性               |

### 11.2 卡产品类型与资金模式

| 简体中文       | 繁體中文（粵語） | English                 | 说明                                                                       |
| -------------- | ---------------- | ----------------------- | -------------------------------------------------------------------------- |
| 卡产品类型     | 卡產品類型       | Card Product Type       | 按资金模式分：Prepaid（预付）/ Credit（信用）/ Deferred Credit（延期信用） |
| 预付卡         | 預付卡           | Prepaid Card            | 先充值后消费，余额不可透支                                                 |
| 信用卡         | 信用卡           | Credit Card             | 先消费后还款，有授信额度                                                   |
| 延期信用卡     | 延期信用卡       | Deferred Credit Card    | 类似信用卡但无免息期，消费后立即计息                                       |
| 卡类别         | 卡類別           | Card Programme Type     | 按使用主体分：Corporate（企业卡）/ Consumer（个人卡）                      |
| 企业卡         | 企業卡           | Corporate Card          | 企业用途的卡片，用于差旅、采购、广告投放等                                 |
| 个人卡         | 個人卡           | Consumer Card           | 面向个人持卡人的消费卡                                                     |
| 资金模式       | 資金模式         | Funding Model           | 卡片资金所有权归属模式                                                     |
| 项目管理模式   | 項目管理模式     | Programme Managed (PM)  | 资金归属企业/项目，企业控制余额，可充值/扣回/冻结                          |
| 持卡人管理模式 | 持卡人管理模式   | Cardholder Managed (CM) | 资金归属持卡人个人，到账后企业无权扣回                                     |

### 11.3 卡账户能力

| 简体中文    | 繁體中文（粵語） | English             | 说明                     |
| ----------- | ---------------- | ------------------- | ------------------------ |
| 共享卡      | 共享卡           | Shared Card         | 多张卡共享同一个账户余额 |
| 共享卡账户  | 共享卡賬戶       | Shared Card Account | 多卡挂载的共用资金账户   |
| 转入 / 充值 | 轉入 / 充值      | Top-Up / Recharge   | 向卡账户注入资金         |
| 转出 / 提现 | 轉出 / 提現      | Withdraw / Cash-Out | 从卡账户提取资金         |

### 11.4 交易能力与授权

| 简体中文     | 繁體中文（粵語） | English                        | 说明                                                               |
| ------------ | ---------------- | ------------------------------ | ------------------------------------------------------------------ |
| 交易受理渠道 | 交易受理渠道     | Transaction Acceptance Channel | 卡片支持的交易渠道：ATM / POS / 线上（E-commerce）                 |
| 单次消费     | 單次消費         | Single-use                     | 卡片仅允许一次交易，交易后自动失效                                 |
| 多次消费     | 多次消費         | Multi-use                      | 卡片允许多次交易，直到余额用完或到期                               |
| 授权         | 授權             | Authorization                  | 商户发起交易时，发卡行验证卡片有效性和余额并预留资金               |
| 实时授权     | 實時授權         | Real-time Authorization        | 交易发起时即时验证并扣款                                           |
| 授权浮动     | 授權浮動         | Auth Padding                   | 允许实际结算金额与预授权金额存在一定百分比的偏差                   |
| 发卡处理方   | 發卡處理方       | Issuer Processor               | 代理发卡行处理授权、清算等业务的机构（VCC 场景中 SP 即发卡处理方） |

### 11.5 3D Secure（3DS）

| 简体中文   | 繁體中文（粵語） | English               | 说明                                                                            |
| ---------- | ---------------- | --------------------- | ------------------------------------------------------------------------------- |
| 3D Secure  | 3D Secure        | 3D Secure (3DS)       | EMVCo 制定的在线交易身份验证协议，当前版本 3DS2                                 |
| EMVCo      | EMVCo            | EMVCo                 | Europay/Mastercard/Visa 联合组织，制定芯片卡和在线支付标准                      |
| ACS        | ACS              | Access Control Server | 发卡行侧的 3DS 验证服务器，是 Frictionless / Challenge 的最终决策者             |
| 目录服务器 | 目錄伺服器       | Directory Server (DS) | 卡组织运营的路由服务器（Visa DS / MC DS），3DS 请求的中转枢纽                   |
| 无感验证   | 無感驗證         | Frictionless (3DS)    | ACS 基于风险评估自动通过，持卡人无需额外操作                                    |
| 挑战验证   | 挑戰驗證         | Challenge (3DS)       | ACS 要求持卡人完成额外身份验证（OTP / 密码 / APP 推送）                         |
| 挑战策略   | 挑戰策略         | Challenge Policy      | ACS 侧的默认风控策略：Prefer Frictionless / Prefer Challenge / Always Challenge |
| 挑战方式   | 挑戰方式         | Challenge Method      | 具体验证手段：OTP / Static Password / Out-of-Band (OOB)                         |
| 静态密码   | 靜態密碼         | Static Password       | 持卡人预设的安全密码（如 Verified by Visa 密码）                                |
| 带外验证   | 帶外驗證         | Out-of-Band (OOB)     | ACS 通过 APP 推送或邮件发送确认链接，持卡人在外部渠道确认                       |
| 通知递送   | 通知遞送         | Notification Delivery | 验证请求的递送路径：Direct to Cardholder / Webhook to Merchant                  |

### 11.6 卡限制配置

| 简体中文     | 繁體中文（粵語） | English                 | 说明                                          |
| ------------ | ---------------- | ----------------------- | --------------------------------------------- |
| 卡限制       | 卡限制           | Card Limits             | 统称数量限制、金额限额、次数限制              |
| 卡片数量限制 | 卡片數量限制     | Card Quantity Limit     | 单商户可持有的卡片数量上限（单日/月/年/累计） |
| 交易消费限额 | 交易消費限額     | Transaction Spend Limit | 单笔/日/周/月/年/单卡累计的消费金额上限       |
| 交易次数限制 | 交易次數限制     | Transaction Count Limit | 单卡的最大交易次数上限（单日/单月/总计）      |
| 转入限额     | 轉入限額         | Top-Up Limit            | 单次转入/充值的最小和最大金额                 |
| 转出限额     | 轉出限額         | Withdrawal Limit        | 单次转出/提现的最小和最大金额                 |

### 11.7 风控与持卡人

| 简体中文   | 繁體中文（粵語） | English                      | 说明                                           |
| ---------- | ---------------- | ---------------------------- | ---------------------------------------------- |
| MCC        | MCC              | Merchant Category Code (MCC) | 商户类别码，标识商户所属行业（如 5411=杂货店） |
| MCC 白名单 | MCC 白名單       | MCC Whitelist                | 允许消费的商户类别码列表                       |
| MCC 黑名单 | MCC 黑名單       | MCC Blacklist                | 禁止消费的商户类别码列表                       |
| 地区白名单 | 地區白名單       | Region Whitelist             | 允许消费的国家/地区列表                        |
| 地区黑名单 | 地區黑名單       | Region Blacklist             | 禁止消费的国家/地区列表                        |
| 持卡人     | 持卡人           | Cardholder                   | 虚拟卡的最终使用者                             |

---

## 12. 数币收单（Crypto Checkout）术语

### 12.1 收单核心概念

| 简体中文 | 繁體中文（粵語） | English                       | 说明                                                  |
| -------- | ---------------- | ----------------------------- | ----------------------------------------------------- |
| 数币收单 | 數幣收單         | Crypto Checkout               | 商户以法币计价，付款人以稳定币完成链上支付的收单产品  |
| 四方聚合 | 四方聚合         | Four-Party Aggregation        | EX 外接第三方链上收单通道的模式（平台不自建链上能力） |
| 收单编排 | 收單編排         | Checkout Orchestration        | EX 作为编排层，管理订单创建、支付匹配、结算的全流程   |
| PPaaS    | PPaaS            | Payment Platform as a Service | 支付平台即服务，EX 的 B2B 商业模式                    |

### 12.2 支付能力

| 简体中文     | 繁體中文（粵語） | English                 | 说明                                               |
| ------------ | ---------------- | ----------------------- | -------------------------------------------------- |
| 订单计价币种 | 訂單計價幣種     | Pricing Currency        | 商户创建订单时使用的计价法币（本期固定 USD）       |
| 支付稳定币   | 支付穩定幣       | Accepted Cryptocurrency | 付款人可用于支付的稳定币种类（如 USDT / USDC）     |
| 区块链网络   | 區塊鏈網絡       | Accepted Network        | 支持的链网络（如 TRC-20 / ERC-20 / BEP-20）        |
| 汇率来源     | 匯率來源         | Exchange Rate Source    | 订单创建时用于法币→稳定币换算的汇率来源           |
| 独立收款地址 | 獨立收款地址     | One-time Address        | 每笔订单生成唯一的收款地址，不复用（行业标准做法） |

### 12.3 订单配置

| 简体中文   | 繁體中文（粵語） | English                  | 说明                                             |
| ---------- | ---------------- | ------------------------ | ------------------------------------------------ |
| 订单有效期 | 訂單有效期       | Order TTL (Time-to-Live) | 订单从创建到过期的时间窗口，超时未支付则自动关单 |
| 订单过期   | 訂單過期         | Order Expiration         | 订单超过有效期未完成支付，状态变为 Expired       |

### 12.4 支付阈值配置

| 简体中文         | 繁體中文（粵語） | English                        | 说明                                                                                  |
| ---------------- | ---------------- | ------------------------------ | ------------------------------------------------------------------------------------- |
| 少付             | 少付             | Underpayment                   | 付款人实际到账金额低于订单应付金额                                                    |
| 多付             | 多付             | Overpayment                    | 付款人实际到账金额高于订单应付金额                                                    |
| 支付阈值         | 支付閾值         | Payment Tolerance / Threshold  | 定义多大的金额偏差仍可视为"全额支付"自动接受                                          |
| 阈值模式         | 閾值模式         | Threshold Mode                 | 阈值计算方式：Percentage（百分比）/ Fixed Amount（固定金额）/ Min of Both（两者取小） |
| 百分比阈值       | 百分比閾值       | Percentage Threshold           | 按订单金额百分比计算的容忍值                                                          |
| 固定金额阈值     | 固定金額閾值     | Fixed Amount Threshold         | 固定金额的容忍值（与订单大小无关）                                                    |
| 两者取小         | 兩者取小         | Min of Both                    | 容忍额 = min(百分比计算值, 固定金额)，推荐用于大额封顶                                |
| 等待补款         | 等待補款         | Await Top-Up                   | 少付时保持"部分支付"状态，等待付款人在有效期内补足差额                                |
| ~~自动关单~~     | ~~自動關單~~     | ~~Auto Close~~                 | 下期：少付超出阈值时，订单立即关闭                                                    |
| 自动接受全额入账 | 自動接受全額入賬 | Auto Accept & Settle All       | 多付时超额部分连同订单金额一起结算到商户账户，商户自行处理退款                        |
| 全额暂挂         | 全額暫掛         | Hold & Await Merchant Decision | 多付订单全额暂挂（不结算），商户在后台确认"接受入账"或"发起退回"后才结算              |

### 12.5 结算

| 简体中文     | 繁體中文（粵語） | English                    | 说明                                         |
| ------------ | ---------------- | -------------------------- | -------------------------------------------- |
| 逐笔结算     | 逐筆結算         | Per-Transaction Settlement | 每笔订单确认到账后单独结算，不做批次合并     |
| 同货币同网络 | 同貨幣同網絡     | Same Currency Same Network | 收到 USDT TRC-20，结算 USDT TRC-20；不做换汇 |
| 结算账户     | 結算賬戶         | Settlement Account         | 结算资金入账的目标数币钱包账户               |
| 批次结算     | 批次結算         | Batch Settlement           | 按时间周期批量合并结算（如 T+1），本期不支持 |
| 自动换汇结算 | 自動換匯結算     | Auto Conversion Settlement | 收到数币后自动换汇为法币入账，本期不支持     |

### 12.6 订单状态

| 简体中文 | 繁體中文（粵語） | English        | 说明                                      |
| -------- | ---------------- | -------------- | ----------------------------------------- |
| 待支付   | 待支付           | Pending        | 订单已创建，等待付款人链上转账            |
| 部分支付 | 部分支付         | Partially Paid | 收到转账但金额不足（underpaid），等待补款 |
| 支付成功 | 支付成功         | Paid           | 通道确认到账，金额足额                    |
| 已结算   | 已結算           | Settled        | 结算完成，资金已入商户数币钱包            |
| 已过期   | 已過期           | Expired        | 有效期到期，未完成支付                    |
| 已关闭   | 已關閉           | Closed         | 订单因 underpaid 自动关单策略而关闭       |
| 异常     | 異常             | Exception      | 订单因超阈值触发人工处理                  |

### 12.7 Webhook 事件

| 简体中文     | 繁體中文（粵語） | English            | 说明                                                |
| ------------ | ---------------- | ------------------ | --------------------------------------------------- |
| 支付成功事件 | 支付成功事件     | checkout.paid      | 订单支付成功（通道确认到账）                        |
| 订单过期事件 | 訂單過期事件     | checkout.expired   | 订单有效期到期，未完成支付                          |
| 结算完成事件 | 結算完成事件     | checkout.settled   | 结算完成，资金入商户数币钱包                        |
| 少付事件     | 少付事件         | checkout.underpaid | 收到转账但金额不足（underpaid 策略=等待补款时触发） |

---

## 附录：缩写速查表

| 缩写   | 全称                                                        | 中文                         |
| ------ | ----------------------------------------------------------- | ---------------------------- |
| SA     | SaaS Admin                                                  | 平台管理后台                 |
| SP     | Service Provider                                            | 服务提供商                   |
| TP     | Tenant Portal                                               | 租户后台                     |
| MP     | Merchant Portal                                             | 商户后台                     |
| PP     | Provider Portal                                             | 服务商后台                   |
| VA     | Virtual Account                                             | 虚拟账户                     |
| VCC    | Virtual Credit Card                                         | 虚拟卡                       |
| BIN    | Bank Identification Number                                  | 卡 Bin（发卡行标识）         |
| IIN    | Issuer Identification Number                                | 发卡机构标识号               |
| MCC    | Merchant Category Code                                      | 商户类别码                   |
| 3DS    | 3D Secure                                                   | 3D 安全验证协议              |
| ACS    | Access Control Server                                       | 发卡行验证服务器             |
| DS     | Directory Server                                            | 卡组织目录服务器             |
| EMVCo  | Europay / Mastercard / Visa (Co.)                           | 芯片卡与支付标准组织         |
| OOB    | Out-of-Band                                                 | 带外验证                     |
| PM     | Programme Managed                                           | 项目管理模式（资金归企业）   |
| CM     | Cardholder Managed                                          | 持卡人管理模式（资金归个人） |
| TTL    | Time-to-Live                                                | 有效期 / 存活时间            |
| PPaaS  | Payment Platform as a Service                               | 支付平台即服务               |
| POBO   | Payment On Behalf Of                                        | 代付                         |
| COBO   | Collection On Behalf Of                                     | 代收                         |
| KYC    | Know Your Customer                                          | 了解你的客户                 |
| KYB    | Know Your Business                                          | 了解你的企业                 |
| AML    | Anti-Money Laundering                                       | 反洗钱                       |
| OTP    | One-Time Password                                           | 一次性密码                   |
| FX     | Foreign Exchange                                            | 外汇兑换                     |
| SWIFT  | Society for Worldwide Interbank Financial Telecommunication | 环球银行金融电信协会         |
| BIC    | Bank Identifier Code                                        | 银行识别码                   |
| TRC-20 | TRON Token Standard                                         | TRON 代币标准                |
| ERC-20 | Ethereum Token Standard                                     | 以太坊代币标准               |
| BEP-20 | BNB Chain Token Standard                                    | BNB Chain 代币标准           |
| MID    | Merchant ID                                                 | 商户标识                     |
| FIFO   | First In, First Out                                         | 先进先出                     |
| SLA    | Service Level Agreement                                     | 服务等级协议                 |

---

*文档版本：v2.0*
*创建日期：2026-02-22*
*最后更新：2026-02-26*
