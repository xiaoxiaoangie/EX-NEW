# MP 商户端 — 信息架构设计说明

> 版本：v1.0 | 更新日期：2026-02-26 | 作者：Product Team

---

## 目录

1. [EX 平台定位与 SP 能力矩阵](#1-ex-平台定位与-sp-能力矩阵)
2. [菜单结构总览](#2-菜单结构总览)
3. [核心设计原则](#3-核心设计原则)
4. [数据源与引用模型](#4-数据源与引用模型)
5. [各分组设计说明](#5-各分组设计说明)
6. [关键设计决策记录](#6-关键设计决策记录)
7. [行业对标：Wise / Coinbase](#7-行业对标wise--coinbase)
8. [Phase 规划](#8-phase-规划)

---

## 1. EX 平台定位与 SP 能力矩阵

### 1.1 EX 是什么

EX 是一个 **Web2 + Web3 支付能力聚合平台**，将传统法币支付（Web2）和加密货币支付（Web3）整合到同一个商户 Portal。商户不需要分别对接多个服务商，通过一个统一界面使用全部能力。

### 1.2 当前 SP 能力

| 能力 | IPL（香港 MSO） | BB（BlancBlock） | 商户看到的 |
|------|-----------------|-------------------|-----------|
| 法币账户（开户/持有） | ✅ | ❌ | IPL only |
| 数币钱包（托管） | ❌ | ✅ | BB only |
| FX 换汇（Spot） | ✅ | ❌ | IPL only |
| 承兑 On/Off-Ramp | ❌ | ✅ | BB only |
| VA 收款 | ✅ | ✅（XPay 渠道，即将上线） | IPL + BB |
| 法币付款 Payout | ✅ | 🔜（XPay 渠道） | IPL 为主 |
| 链上收款 | ❌ | ✅ | BB only |
| 链上付币 | ❌ | ✅ | BB only |
| 同名充值（法币） | ✅ | ❌ | IPL only |
| 同名提现（法币） | ✅ | ❌ | IPL only |
| 同名充币 | ❌ | ✅ | BB only |
| 同名提币 | ❌ | ✅ | BB only |
| 发卡 VCC | ✅ | ✅ | IPL + BB |
| 收单 Checkout | ❌ | ✅（外部渠道） | BB only |
| Remittance 编排 | 部分（FX + Payout） | 部分（承兑） | IPL + BB 协作 |

**核心特征：两个 SP 能力几乎完全互补，IPL = 法币世界，BB = 数币世界，EX 作为桥接层。**

### 1.3 商户端 SP 透明原则

- 商户端**完全不展示 SP**，只看到统一的能力和按币种合计的余额
- 底层每个 SP 给商户开独立账户（IPL 有 USD 账户，BB 也可能有 USD 账户），商户只看合计
- 充值/提现/付款时商户不选 SP，系统根据默认配置和优先级自动路由

---

## 2. 菜单结构总览

```
1. ASSETS（资产）
   ├── Fiat Accounts          法币账户：余额 / 同名充值 / 同名提现 / 卖U提现
   ├── Crypto Wallet          数币钱包：余额 / 同名充币 / 同名提币(或提现到银行) / 充值买U
   └── Exchange               纯体系内兑换：FX / Buy Crypto / Sell Crypto

2. TRANSFER IN（转账收款）
   ├── Collection Tools       收款工具管理（Tab: VA + 加密地址）
   ├── Remitter               汇款人通讯录
   └── Payins                 全量入金流水

3. CHECKOUT（收单）
   ├── Online Payment         在线支付
   ├── Invoice                账单支付（P2）
   └── Subscription           订阅支付（P2）

4. TRANSFER OUT（转账付款）
   ├── Beneficiary            收款人通讯录
   ├── Payouts                全量出金流水
   └── Remittance Orders      收→换→付编排

5. CARDS（发卡）
   ├── Cards Management       卡生命周期管理
   └── Card Transactions      卡交易记录

6. TRADE DOCUMENTS（贸易单据）
   ├── Trade Documents        单据上传/关联（P1 简版）
   ├── Order Files            订单文件（P2）
   └── Shop Management        店铺管理（P3）

7. REPORTS
   ├── Reports                报表（无 SP 维度）
   └── Downloads              下载中心

8. DEVELOPER
   ├── API Keys
   └── Webhooks

9. SETTINGS
   ├── Company Profile
   ├── Roles & Permissions
   └── Notifications
```

---

## 3. 核心设计原则

### 3.1 资金流向分组

菜单按**资金流向**组织，对应商户的核心心智模型：

| 分组 | 资金方向 | 商户心智 |
|------|---------|---------|
| ASSETS | 自己的钱（持有 + 体系内操作） | "我有多少钱，怎么管理" |
| TRANSFER IN | 外部 → 我（转账模式） | "别人怎么给我钱" |
| CHECKOUT | 外部 → 我（订单驱动） | "客户怎么付我钱" |
| TRANSFER OUT | 我 → 外部 | "我怎么付钱给别人" |
| CARDS | 我 → 外部（卡消费） | "通过卡花钱" |

### 3.2 Exchange = 纯体系内兑换

Exchange 只做**体系内资产形态转换**（钱包到钱包 / 账户到账户），钱不出体系：

| 操作 | 含义 | 底层 |
|------|------|------|
| FX | 法币账户 → 法币账户（如 USD→EUR） | IPL Conversion |
| Buy Crypto | 法币账户余额 → 数币钱包（如 USD→USDT） | BB 承兑 |
| Sell Crypto | 数币钱包余额 → 法币账户（如 USDT→USD） | BB 承兑 |

**涉及外部资金的"一单到底"操作（充值买U、卖U提现）不在 Exchange，而在各账户页面：**

- **充值买U**（外部银行→法币→USDT）→ Crypto Wallet 页面发起
- **卖U提现**（USDT→法币→外部银行）→ Crypto Wallet 的"提现"操作（选择提币 or 提现到银行）

### 3.3 Payins/Payouts = 全量交易流水

- **Payins** = 所有入金交易的完整记录（VA 收款 + 链上收款 + 同名充值 + 同名充币 + 充值买U）
- **Payouts** = 所有出金交易的完整记录（法币付款 + 链上付币 + 同名提现 + 同名提币 + 卖U提现）
- Assets 各账户页面的"交易记录" = Payins + Payouts + Exchange 中**涉及本账户的筛选视图**

### 3.4 数据唯一真相源 + 引用展示

每类数据只有一个管理入口，其他地方通过引用或筛选展示。详见第 4 节。

---

## 4. 数据源与引用模型

### 4.1 模型图

```
                   ┌──────────────────────────────────┐
                   │         数据源（唯一真相）          │
                   ├──────────────────────────────────┤
                   │  Collection Tools  → 管理 VA/地址  │
                   │  Payins            → 全量入金流水   │
                   │  Payouts           → 全量出金流水   │
                   │  Exchange          → 兑换记录       │
                   │  Remitter          → 汇款人信息     │
                   │  Beneficiary       → 收款人信息     │
                   └───────────┬──────────────────────┘
                               │ 引用 / 筛选
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                     ▼
   Fiat Accounts         Crypto Wallet          各业务页面
   ┌──────────────┐    ┌──────────────┐
   │ 余额总览      │    │ 余额总览      │
   │              │    │              │
   │ 充值         │    │ 充币          │
   │  └ 展示 VA   │    │  └ 展示地址   │ ← 引用 Collection Tools
   │ 提现         │    │ 提币/提现     │
   │              │    │ 充值买U       │
   │ 交易记录     │    │ 交易记录      │ ← 筛选 Payins + Payouts
   │ (本账户所有   │    │ (本账户所有    │   + Exchange 中涉及
   │  余额变动)   │    │  余额变动)    │   本账户的记录
   └──────────────┘    └──────────────┘
```

### 4.2 数据归属明细

| 数据类型 | 唯一管理入口 | 引用/展示位置 |
|---------|------------|-------------|
| VA 账户信息 | Collection Tools | Fiat Accounts 充值时调用展示 VA 信息 |
| 加密收款地址 | Collection Tools | Crypto Wallet 充币时调用展示充币地址 |
| 入金交易记录 | Payins（全量主表） | Fiat Accounts / Crypto Wallet 交易记录 = 按账户筛选的视图 |
| 出金交易记录 | Payouts（全量主表） | Fiat Accounts / Crypto Wallet 交易记录 = 按账户筛选的视图 |
| 兑换交易记录 | Exchange（全量主表） | Fiat Accounts / Crypto Wallet 交易记录 = 涉及本账户的兑换 |
| 汇款人信息 | Remitter | Payins 详情页展示关联汇款人 |
| 收款人信息 | Beneficiary | Payouts 创建付款时选择收款人 |

### 4.3 Assets 账户页面的交易记录

Assets 各账户页面看到的**不只是同名充提**，而是**该账户所有余额变动**：

**Fiat Accounts 交易记录包含：**

| 交易类型 | 方向 | 来源 |
|---------|------|------|
| 同名充值 | 余额 + | 自己银行 → 平台 |
| 同名提现 | 余额 − | 平台 → 自己银行 |
| VA 收款入账 | 余额 + | 他人银行汇款 → VA → 入账 |
| 法币付款扣款 | 余额 − | 平台 → 他人银行 |
| FX 换汇（入） | 余额 + | 其他币种法币 → 本币种 |
| FX 换汇（出） | 余额 − | 本币种 → 其他币种法币 |
| Buy Crypto 扣款 | 余额 − | 法币 → 数币（Exchange） |
| Sell Crypto 入账 | 余额 + | 数币 → 法币（Exchange） |
| 卖U提现 | 余额中转 | 数币→法币→提现（可能不体现为独立法币变动） |
| Checkout 结算入账 | 余额 + | 收单订单结算到法币账户 |

**Crypto Wallet 交易记录同理，所有导致数币余额变动的记录都展示。**

---

## 5. 各分组设计说明

### 5.1 ASSETS（资产）— "我的钱"

**设计逻辑：** 管理自己持有的资产，所有"体系内"操作在这里。

| 子菜单 | 定位 | 操作 |
|--------|------|------|
| Fiat Accounts | 法币账户管理 | 查余额 / 同名充值（展示 VA）/ 同名提现 |
| Crypto Wallet | 数币钱包管理 | 查余额 / 同名充币（展示地址）/ 提币或提现到银行 / 充值买U |
| Exchange | 体系内兑换 | FX / Buy Crypto（余额→余额）/ Sell Crypto（余额→余额）|

**为什么 Exchange 只做体系内：** Exchange 的本质是资产形态转换（法币⇄法币、法币⇄数币），不涉及外部资金进出。涉及外部的"一单到底"是编排操作，入口放在触发它的账户页面更直觉（见 6.1 决策说明）。

**Crypto Wallet 的"提现"操作：** 商户在 Crypto Wallet 点"提现/Withdraw"时，可以选择：
- **提币到外部钱包** — 同名提币，链上转账
- **提现到银行账户** — 卖U提现，一单到底编排（数币→承兑为法币→提现到银行）

### 5.2 TRANSFER IN（转账收款）— "别人给我转账"

**设计逻辑：** 管理收款工具、汇款人，查看所有入金交易。

| 子菜单 | 定位 |
|--------|------|
| Collection Tools | 收款工具唯一管理入口（VA + 加密地址），其他页面引用展示 |
| Remitter | 汇款人通讯录，记录"谁给我打钱"，用于入金匹配和合规 |
| Payins | 全量入金流水主表，支持按类型/币种/时间/汇款人筛选 |

### 5.3 CHECKOUT（收单）— "客户按订单付款"

**设计逻辑：** 订单驱动的收款，底层支付方式（VA/加密地址/在线支付）由系统自动分配，对商户透明。

**与 Transfer In 的区别：**
- Transfer In = 点对点转账，商户主动把收款工具（VA/地址）给对方
- Checkout = 商户创建订单 → 系统自动生成支付页面/分配支付方式 → 客户按指引支付

### 5.4 TRANSFER OUT（转账付款）— "我付钱给别人"

| 子菜单 | 定位 |
|--------|------|
| Beneficiary | 收款人通讯录，与 Remitter 对称 |
| Payouts | 全量出金流水主表 + 创建付款入口 |
| Remittance Orders | 收→换→付一单到底的编排订单，底层跨 SP 协作对商户透明 |

**为什么 Remittance Orders 放在 Transfer Out：** 商户的最终目的是"付钱给别人"，至于系统内部是否编排了收款+承兑+付款三步，商户不关心。

### 5.5 CARDS（发卡）

IPL 和 BB 都有发卡能力，Cards Management + Card Transactions。

### 5.6 TRADE DOCUMENTS（贸易单据）

服务跨境贸易合规场景，主要给 IPL 跨境汇款提供贸易背景材料。P1 简版。

### 5.7 REPORTS / DEVELOPER / SETTINGS

标准配置。**Reports 不展示 SP 维度**，只按币种、产品线、时间维度。

---

## 6. 关键设计决策记录

### 6.1 Exchange 的边界：纯体系内 vs 含外部编排

| 维度 | 纯体系内（✅ 选定） | 含外部编排 |
|------|-------------------|-----------|
| 定义 | 只做钱包→钱包 / 账户→账户 | 含"充值买U""卖U提现"等涉及外部资金的一单到底 |
| Exchange 概念 | 纯粹：资产形态转换 | 模糊：兼做兑换和出入金 |
| 商户操作 | 余额兑换去 Exchange；涉及外部的去各账户页面 | 所有兑换相关去 Exchange |
| 对标 | 更接近 Wise | 更接近 Coinbase |

**决策：选择纯体系内。** 原因：
1. 概念清晰，Exchange = Conversion，不混淆出入金
2. 涉及外部资金的操作放在触发账户页面更直觉（我在看 Crypto Wallet → 我想增加 USDT → "充值买U"）
3. 一单到底是编排行为，未来可能有更多编排场景，不应全部堆在 Exchange

### 6.2 一单到底操作的入口位置

| 操作 | 放在哪 | 原因 |
|------|--------|------|
| 充值买U（外部银行→USDT） | Crypto Wallet | 商户在看数币钱包，想增加 USDT |
| 卖U提现到银行 | Crypto Wallet 的"提现"选项 | 商户在看数币钱包，想把 U 变成法币提走 |

**不放在 Payins/Payouts 的原因：** "充值买U"对商户来说不是"入金"，而是"我要买 U"；"卖U提现"不是"出金"，而是"我要把 U 变现"。放在账户页面更符合操作动机。

### 6.3 Payins/Payouts 的范围：仅非同名 vs 全量

| 做法 | Payins 包含 | Payouts 包含 |
|------|------------|-------------|
| 仅非同名 | VA 收款 + 链上收款 | 法币付款 + 链上付币 |
| 全量（✅ 选定） | 上述 + 同名充值 + 同名充币 + 充值买U | 上述 + 同名提现 + 同名提币 + 卖U提现 |

**决策：全量。** Payins/Payouts 作为"全量资金流水主表"，商户需要一个统一入口看"所有钱进/出"。Assets 账户页面的交易记录是筛选视图。

### 6.4 Transfer In vs Checkout 是否合并

**决策：保持分开。** Checkout 是独立产品线，有订单生命周期、支付阈值、结算逻辑等，和 Transfer In 的"收到即入账"本质不同。

### 6.5 Collection Tools / Remitter / Beneficiary 是否独立为 DIRECTORY 分组

**决策：本期不独立。** 保持 Collection Tools + Remitter 在 Transfer In，Beneficiary 在 Transfer Out。看用户反馈再决定是否抽取。

---

## 7. 行业对标：Wise / Coinbase

### 7.1 Wise Business

Wise 是纯法币跨境支付平台，菜单结构：

```
Home（Dashboard）
├── Balances（= 我们的 Assets > Fiat Accounts）
│     余额总览、充值、提现、账户间转账
│     交易记录 = 该账户所有变动
├── Recipients（= 我们的 Beneficiary）
│     收款人管理
├── Transactions（= 我们的 Payins + Payouts 合并）
│     所有交易流水，不区分入金/出金
├── Cards
├── Team & Settings
└── Developer (API)
```

**Wise 的特点：**
- **Balances 页面** = 账户管理 + 操作入口 + 该账户交易记录（与我们的 Assets 账户页面一致）
- **Transactions** = 全量流水，不分 Payins/Payouts（因为 Wise 主要是出金场景，入金相对简单）
- **没有 Exchange 独立菜单**，换汇操作在 Balances 里直接发起（USD 账户 → 点"Convert" → 选目标币种）
- **Recipients** = 独立菜单（我们考虑过的 DIRECTORY 模式，Wise 选了独立）

**我们与 Wise 的区别：**
- Wise 只有法币，我们有法币+数币，需要 Exchange 来统一承兑/换汇入口
- Wise 没有收款工具管理（VA），我们有 Collection Tools
- Wise 没有收单（Checkout），我们有
- 我们的 Payins/Payouts 分开（因为入金场景比 Wise 复杂得多）

### 7.2 Coinbase（Commerce + 主站）

Coinbase 是加密货币交易所 + 支付平台：

```
Home
├── Assets / Portfolio（= 我们的 Assets）
│     各币种余额、价格走势
├── Buy / Sell（= 我们的 Exchange > Buy Crypto / Sell Crypto）
│     买U/卖U，支持从余额或外部银行/卡一单到底
├── Send / Receive（= 我们的 Transfer Out / Transfer In 的链上部分）
│     链上转账收付
├── Pay（= 我们的 Checkout）
│     Coinbase Commerce 收单
├── Card
└── Settings
```

**Coinbase 的特点：**
- **Buy/Sell 含外部编排**：买U时可以选"从银行账户"（= Deposit + Conversion 一单到底），Coinbase 把它当作一种"买"的付款方式，放在 Buy/Sell 统一入口里
- **Assets 页面的交易记录** = 该资产所有变动（转入/转出/买入/卖出/收款），与我们的设计一致
- **Send/Receive** = 链上转账独立菜单（不像我们合并到 Transfer In/Out）
- 没有法币跨境汇款场景，结构比我们简单

**我们与 Coinbase 的区别：**
- Coinbase 的 Buy/Sell 含外部编排（一单到底），我们选择 Exchange = 纯体系内，一单到底放在账户页面
- Coinbase 没有 VA 收款、法币跨境汇款、贸易单据等 B2B 场景
- 我们需要 Transfer In / Transfer Out 分组来承载法币和加密的双轨收付场景

### 7.3 对标总结

| 维度 | Wise | Coinbase | EX（我们） |
|------|------|----------|-----------|
| 核心场景 | 法币跨境转账 | 加密交易+支付 | Web2+Web3 聚合支付 |
| 资产管理 | Balances（法币） | Portfolio（加密为主） | Assets（法币+数币） |
| 兑换入口 | 在 Balances 内 Convert | 独立 Buy/Sell（含外部） | 独立 Exchange（纯体系内） |
| 收款工具 | 无 | Receive（链上） | Collection Tools（VA+地址） |
| 出入金流水 | 合并 Transactions | 在各资产详情里 | 分开 Payins/Payouts（全量） |
| 收单 | 无 | Pay（Commerce） | Checkout |
| 通讯录 | Recipients（独立） | 无 | Remitter + Beneficiary（各在 In/Out 下） |
| 账户交易记录 | 该账户所有变动 ✅ | 该资产所有变动 ✅ | 该账户所有变动 ✅ |
| 一单到底编排 | 无（纯法币不需要） | 在 Buy/Sell 里 | 在账户页面（Crypto Wallet）|

**我们的菜单结构是 Wise（B2B 跨境支付结构）+ Coinbase（加密资产管理）的融合体，这正是 EX 作为 Web2+Web3 聚合平台的定位决定的。**

---

## 8. Phase 规划

| 菜单 | P1 | P2 | P3 |
|------|----|----|-----|
| Fiat Accounts | ✅ 余额/充值/提现/交易记录 | — | — |
| Crypto Wallet | ✅ 余额/充币/提币/交易记录 | 提现到银行(卖U提现)/充值买U | — |
| Exchange | ✅ FX / Buy Crypto / Sell Crypto（余额→余额） | — | — |
| Collection Tools | ✅ VA + 加密地址 | — | — |
| Remitter | ✅ | — | — |
| Payins | ✅ 全量入金流水 | — | — |
| Online Payment | ✅ | — | — |
| Invoice | — | ✅ | — |
| Subscription | — | ✅ | — |
| Beneficiary | ✅ | — | — |
| Payouts | ✅ 全量出金流水 | — | — |
| Remittance Orders | ✅ | — | — |
| Cards | ✅ | — | — |
| Trade Documents | ✅ 基础上传/关联 | Order Files | Shop Management |
| Reports | ✅（无 SP 维度） | — | — |
| Developer | ✅ | — | — |
| Settings | ✅ | — | — |

---

## 附录：术语对照

| 术语 | 英文 | 含义 |
|------|------|------|
| 同名充值 | Deposit (Same-name) | 商户从自有银行账户向平台法币账户转入资金 |
| 同名提现 | Withdraw (Same-name) | 平台法币账户提现到商户自有银行账户 |
| 同名充币 | Crypto Deposit (Same-name) | 商户从自有外部钱包转入加密资产到平台 |
| 同名提币 | Crypto Withdraw (Same-name) | 平台加密资产提币到商户自有外部钱包 |
| 充值买U | Deposit & Buy Crypto | 从外部银行充值法币并自动兑换为加密资产（一单到底） |
| 卖U提现 | Sell Crypto & Withdraw | 加密资产承兑为法币并自动提现到外部银行（一单到底） |
| VA | Virtual Account | 虚拟账户，用于接收法币汇款 |
| 承兑 | On/Off-Ramp | 法币与加密货币之间的兑换服务 |
