# 全球混合支付业务架构图 (Hybrid Payment Architecture)

**版本**：V8.0 (Web2 + Web3 融合版)  
**核心理念**：One Platform, Two Worlds. 连接法币与数字货币的统一金融底座。

---

## 一、 顶层：业务线 (Internal Business Lines)
*这一层是公司内部的能力边界定义，用于对内规划、对外专业介绍。真正面对客户时，会把这些业务线打包成行业解决方案。*

### 1. 全球收款业务线 (Global Collections)
> "无论是刷卡、汇款还是付币，一站式入账。"

*   **[产品] 在线收单 (Acquiring)**
    *   `属性` **国际卡收单**: Visa, Mastercard, Amex
    *   `属性` **本地钱包**: Alipay, GrabPay, Dana
    *   `属性` **[Web3] 数字货币收单**: Crypto Payment (扫码付 USDT/BTC)
*   **[产品] 全球账户 (Collection Accounts)**
    *   `属性` **法币虚拟户**: USD(ACH), EUR(SEPA), GBP(FPS)
    *   `属性` **[Web3] 充币地址**: Deposit Address (TRC20, ERC20)

### 2. 全球付款业务线 (Global Payouts)
> "法币汇全球，U币秒到账。"

*   **[产品] 全球转账 (Transfers)**
    *   `属性` **本地分发**: Local Rails (ACH, SEPA, FPS)
    *   `属性` **国际电汇**: SWIFT
    *   `属性` **[Web3] 链上提币**: On-chain Payout (付 USDT 到外部钱包)
*   **[产品] 商务发卡 (Issuing)**
    *   `属性` **卡类型**: 虚拟卡 (Virtual), 实体卡 (Physical)
    *   `属性` **[Web3] U卡/加密卡**: Crypto-backed Card (充币刷法币)

### 3. 资金管理业务线 (Treasury & Yield)
> "法币数币统一管理，汇通天下。"

*   **[产品] 混合钱包 (Hybrid Wallet)**
    *   `属性` **多资产持有**: 法币余额 (Fiat Balance) + 数币余额 (Crypto Balance)
    *   `属性` **内部清算**: 生态内转账 0 手续费 (Off-chain)
*   **[产品] 兑换引擎 (Exchange)**
    *   `属性` **外汇兑换**: FX Spot (USD <> EUR)
    *   `属性` **[Web3] 法币入金**: On-Ramp (USD -> USDT)
    *   `属性` **[Web3] 法币出金**: Off-Ramp (USDT -> USD)
    *   `属性` **风险对冲**: Forward (远期锁汇)

### 4. 金融服务业务线 (Finance & Capital)
> "让资产流动起来，创造杠杆。"

*   **[产品] 增值理财 (Wealth)**
    *   `属性` **法币生息**: Yield Account (货币基金)
    *   `属性` **[Web3] 质押生息**: Staking / Earn (存币生息)
*   **[产品] 商业信贷 (Lending)**
    *   `属性` **信用贷**: Revenue Based Financing (基于流水)
    *   `属性` **[Web3] 抵押贷**: Crypto-backed Loan (抵押 BTC 借 USD)

---

## 二、 面向客户的解决方案包装 (Solution Layer)
*业务线是内部能力，真正面向客户时，要根据行业诉求把多条业务线的产品组合成“解决方案包”。*

| 解决方案包 | 目标客户 | 业务线组合 | 典型卖点 |
| :--- | :--- | :--- | :--- |
| **跨境电商 DTC 方案** | Shopify/独立站卖家 | 收款 + 资金管理 + 发卡 | 卡收单 + USDT 收单，钱包自动换汇，发卡付广告费 |
| **平台卖家 (Amazon/Shopee)** | B2C 平台供货商 | 收款 + 资金管理 + 付款 | VA 收款、自动结汇、全球转账付供应商 |
| **Web3 游戏/应用** | 链游、公链生态项目 | 收款 + 资金管理 + 付款 + 金融服务 | Visa & Crypto Pay-in，混合钱包管理，链上发奖金，USDT 质押理财 |
| **SaaS/订阅型企业** | 企业服务厂商 | 收款 + 资金管理 + 发卡 | 订阅收单、余额存留、发卡付云资源 |
| **平台/灵活用工** | 网约车、直播、自由职业平台 | 收款 + 资金管理 + 付款 | 订单收款、内部记账、批量发放/链上发放 |

> 对外宣讲时可以说：“我们有四大业务线，能够快速拼装出适配不同行业的解决方案。”

---

## 三、 底层：原子产品能力与属性 (Atomic Capabilities)
*这是基于牌照和技术构建的六大核心能力中心。*

| 能力中心 (Capability) | 核心属性 (Attributes & Features) | 支撑的业务线 |
| :--- | :--- | :--- |
| **1. 账户中心**<br>(Account Issuance) | - **Fiat**: Static VA, Dynamic VA<br>- **Crypto**: MPC Wallet, Deposit Address<br>- **Type**: Named (同名), Pooled (公户) | -> 全球收款<br>-> 资金管理 |
| **2. 收单网关**<br>(Acquisition) | - **Scheme**: Visa/MC Direct Connection<br>- **Risk**: 3DS 2.0, Fraud Detection<br>- **Web3**: Crypto Gateway Protocol | -> 全球收款 |
| **3. 资金分发**<br>(Money Transfer) | - **Fiat Rails**: Local Clearing, SWIFT<br>- **Crypto Rails**: TRON, Ethereum, Solana, BSC<br>- **Speed**: Instant, T+1 | -> 全球付款 |
| **4. 发卡平台**<br>(Card Issuing) | - **Bin Type**: Prepaid, Debit, Credit<br>- **Funding**: Fiat Balance, Crypto Liquidation<br>- **Control**: Velocity Limits, MCC Blocking | -> 全球付款<br>-> 金融服务 |
| **5. 交易兑换**<br>(Trading Engine) | - **Source**: Bank LP (Fiat), Crypto Exchanges (CEX/DEX)<br>- **Instrument**: Spot, Forward, Swap<br>- **Execution**: Streaming, RFQ (询价) | -> 资金管理<br>-> 收款/付款(自动兑换) |
| **6. 账本与清算**<br>(Ledger Core) | - **Model**: Double-entry (复式记账)<br>- **Asset**: Multi-currency & Tokens<br>- **Network**: Internal Net (内部转账) | -> **全业务通用底座** |

---

## 四、 典型业务流向示例 (User Journey)

### 场景：Web3 游戏出海公司
1.  **收 (In)**: 玩家用 **Visa卡** 充值 (收单网关)，或者充值 **USDT** (充币地址)。
2.  **管 (Hold)**: 资金进入公司的 **混合钱包**，部分 USDT **兑换 (Off-ramp)** 成美元。
3.  **增 (Grow)**: 闲置的 USDT 放入 **理财账户 (Staking)** 赚利息。
4.  **付 (Out)**:
    *   用 **全球转账** 给美国员工发美元工资。
    *   用 **链上提币** 给分布式社区贡献者发 USDT 奖励。
    *   用 **商务发卡** (U卡) 支付 AWS 服务器费用。
