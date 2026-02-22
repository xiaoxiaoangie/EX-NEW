# On/Off-Ramp 专业术语表（Glossary）

> **文档版本**：v1.0
> **创建日期**：2026-02-22
> **适用范围**：数法融合承兑解决方案全产品线
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
| 同名充值   | 同名充值         | Same-Name Deposit / Top-Up                          | 商户从自有银行账户向平台法币账户转入资金（汇款人 = 商户）        |
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

## 附录：缩写速查表

| 缩写   | 全称                                                        | 中文                 |
| ------ | ----------------------------------------------------------- | -------------------- |
| SA     | SaaS Admin                                                  | 平台管理后台         |
| SP     | Service Provider                                            | 服务提供商           |
| TP     | Tenant Portal                                               | 租户后台             |
| MP     | Merchant Portal                                             | 商户后台             |
| PP     | Provider Portal                                             | 服务商后台           |
| VA     | Virtual Account                                             | 虚拟账户             |
| POBO   | Payment On Behalf Of                                        | 代付                 |
| COBO   | Collection On Behalf Of                                     | 代收                 |
| KYC    | Know Your Customer                                          | 了解你的客户         |
| KYB    | Know Your Business                                          | 了解你的企业         |
| AML    | Anti-Money Laundering                                       | 反洗钱               |
| OTP    | One-Time Password                                           | 一次性密码           |
| FX     | Foreign Exchange                                            | 外汇兑换             |
| SWIFT  | Society for Worldwide Interbank Financial Telecommunication | 环球银行金融电信协会 |
| BIC    | Bank Identifier Code                                        | 银行识别码           |
| TRC-20 | TRON Token Standard                                         | TRON 代币标准        |
| ERC-20 | Ethereum Token Standard                                     | 以太坊代币标准       |
| BEP-20 | BNB Chain Token Standard                                    | BNB Chain 代币标准   |
| MID    | Merchant ID                                                 | 商户标识             |
| FIFO   | First In, First Out                                         | 先进先出             |
| SLA    | Service Level Agreement                                     | 服务等级协议         |

---

*文档版本：v1.0*
*创建日期：2026-02-22*
*最后更新：2026-02-22*
