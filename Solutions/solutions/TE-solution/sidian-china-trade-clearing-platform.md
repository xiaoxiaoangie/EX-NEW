# Sidian Bank — 肯尼亚-中国贸易清算平台解决方案

> **文档类型**：银行级清算平台解决方案
> **方案对象**：Sidian Bank（肯尼亚）
> **战略定位**：把 Sidian 打造成 **东非的"中国贸易清算枢纽"**
> **类比**：Sidian 之于"肯尼亚-中国走廊" ≈ CIPS 之于"全球-中国 RMB 清算"
> **版本**：v1.0
> **最后更新**：2026-05-16

---

## 一、战略愿景

### 1.1 定位：Sidian = "肯尼亚-中国走廊的 CIPS"

把 Sidian Bank 升级为 **东非地区中肯贸易支付的中央清算枢纽**，对外提供完整的：

- **多渠道收款能力**（M-Pesa / 行内 / 跨行 / LC / 卡 / KE-QR）
- **去美元化清算能力**（KES → CNY / USDC / USDT 直接兑换，不经 USD 中转）
- **去 SWIFT 跨境**（IPL/BB 作为双边做市商，本币 ↔ 目标币种内部记账，不走 SWIFT）
- **多级参与者接入**（Sidian 直客 + 其他肯尼亚银行代理 + 未来 EAC 区域）

### 1.1.1 战略主张：**去美元化（De-USD）**

传统中肯贸易付款链路：`KES → USD → CNY`，存在三大问题：

| 问题 | 影响 |
|------|------|
| ❌ **双段换汇成本** | KES→USD（0.5-0.8%）+ USD→CNY（0.3-0.5%）= 累计 ~1% 损耗 |
| ❌ **依赖美元代理行** | SWIFT 中间行 $25-50/笔 + 加点 0.5-1% + 受美国制裁政策影响 |
| ❌ **时效慢、链路长** | T+3~5 跨境到账，资金占用成本高 |

本方案路径：**`KES → CNY/USDC/USDT` 一步直兑**，由 **IPL/BB 作为双边做市商**承担 FX 与本币↔目标币种的内部头寸调拨。

| 改进 | 效果 |
|------|------|
| ✅ **单段换汇** | 直接 KES↔CNY/USDC/USDT，节省 USD 中转加点 |
| ✅ **绕开 SWIFT** | IPL 在 Sidian 持 KES，IPL 在中国持 CNY → 跨境是 IPL 内部记账 |
| ✅ **抗制裁** | 不经 USD 系统、不经美国代理行，规避地缘政治风险 |
| ✅ **响应快** | T+0~T+1 全链路到账 |

### 1.2 类比：参考 CIPS（中国跨境支付系统）

| 维度 | CIPS（中国 RMB） | Sidian China Trade Clearing（本方案）|
|------|-----------------|-------------------------------------|
| **运营方** | 中国人民银行（CIPS Co.）| Sidian Bank |
| **清算货币** | RMB | KES / CNY / USDC / USDT |
| **直接参与者** | 大型中外资银行 | Sidian 总分行 + 大型企业客户 |
| **间接参与者** | 中小银行通过直接参与者代理 | 其他肯尼亚银行（Equity/KCB/Co-op）通过 Sidian 代理 |
| **清算模式** | RTGS（实时全额）+ DNS（净额）| RTGS + 批量净额 |
| **覆盖网络** | 全球 110+ 国家、1500+ 机构 | 肯尼亚全境 → 未来扩展东非 5 国 |
| **报文标准** | ISO 20022 | ISO 20022 |

### 1.3 三大商业价值

| 价值 | 说明 |
|------|------|
| 🌟 **品牌升级** | Sidian 从中型商业银行 → **东非中国走廊清算中心**，建立独家品牌资产 |
| 🌟 **网络效应** | 其他肯尼亚银行不愿独建中国走廊 → 通过 Sidian 代理，Sidian 获得"网络位"|
| 🌟 **规模化收入** | 交易费 + 换汇加点 + LC 手续费 + 沉淀存款利息 + 数据增值服务 |

---

## 二、系统总览

### 2.1 三层架构（去美元 · 去 SWIFT）

```
┌─────────────────────────────────────────────────────────────────┐
│                        Sidian China Trade                        │
│                    Clearing Platform（SCTC）                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ 第 1 层：多渠道收款层（Acquiring Layer）—— 仅 KES 入金            │
│   M-Pesa │ 行内转账 │ PesaLink │ RTGS │ LC │ 卡 │ KE-QR           │
└─────────────────────────────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 第 2 层：Sidian 中央清算引擎（Clearing Core）                     │
│   KES 账本 │ 直兑 FX 引擎 │ RTGS │ 净额清算 │ ISO20022 │ 风控      │
│   ⚠️ 不经 USD，直接 KES → CNY / USDC / USDT 报价                  │
└─────────────────────────────────────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 第 3 层：跨境结算层（去美元 · 去 SWIFT）                          │
│       ┌───────────────────┐    ┌───────────────────┐             │
│       │ IPL 通道           │    │ BB 通道            │             │
│       │ KES → CNY 直兑     │    │ KES → USDC/USDT    │             │
│       │（IPL 双边做市）    │    │（BB 双边做市）     │             │
│       └───────────────────┘    └───────────────────┘             │
│                                                                   │
│  跨境机制：IPL/BB 在 Sidian 持 KES、在中国/HK 持 CNY/USDC/USDT      │
│            → 跨境 = IPL/BB 内部账户调拨（不走 SWIFT）               │
└─────────────────────────────────────────────────────────────────┘
                                ▼
                      [中国卖家收款]
                  CNY 对公 / USDC·USDT 链上钱包
```

**关键认知**：
- 收款层只有 KES（不接 USD 入金）
- 清算层报价直接 KES↔目标币种（CNY/USDC/USDT），中间不存在 USD
- 跨境层是 **IPL/BB 体内的账户调拨**，不依赖 SWIFT 与美元代理行

### 2.2 关键角色

| 角色 | 主体 | 职责 |
|------|------|------|
| **平台运营方** | **Sidian Bank** | 系统对外品牌、参与者管理、清算运营、本地合规、客户服务 |
| **平台技术供应方** | **EX 平台** | 清算核心系统、API/SDK、合规中台、对账引擎（白标输出）|
| **CNY 落地方 + KES/CNY 做市商** | **IPL** | 在 Sidian 持 KES 头寸 + 在中国持 CNY 池；**KES↔CNY 直接做市**；SAFE 牌照、贸易背景核验 |
| **数币落地方 + KES/USDC·USDT 做市商** | **BB** | 在 Sidian 持 KES 头寸 + 持 USDC/USDT 池；**KES↔USDC/USDT 直接做市**；VASP 牌照 |
| **直接参与者** | Sidian 直客（企业、SME、电商）| 通过 Sidian Portal 或 API 发起付款 |
| **间接参与者**（未来）| 其他肯尼亚银行 | 通过 Sidian 代理发起中国向支付 |
| **付款方** | 肯尼亚进口商 | 通过 Sidian 各类渠道付款 |
| **收款方** | 中国出口商 | 通过 IPL 或 BB 收 CNY/USDC/USDT |

### 2.3 部署模式

#### 选项 A：白标（Sidian 完全自有品牌）

- 系统对外完全使用 Sidian 品牌（"Sidian China Trade"、"Sidian Pay China"）
- EX 平台作为底层技术供应商，不露出
- IPL/BB 作为后台落地通道，不直接面客
- Sidian 负责所有客户关系、合规、商务

#### 选项 B：联合品牌（Sidian × EX × IPL）

- 对外品牌 "Sidian × IPL — China Trade Hub"
- 强调中国端能力背书
- IPL/BB 在合规层面有限露出（用于贸易合规说明）

> **推荐选项 A**：Sidian 客户仅看到 Sidian，简化客户体验，强化 Sidian 品牌资产。

---

## 三、多渠道收款（Acquiring Layer）

### 3.1 渠道矩阵（仅 KES 入金，全数字化）

| 渠道 | 实现方式 | 单笔上限 | 适用场景 | 时效 |
|------|---------|---------|---------|------|
| **M-Pesa Paybill** | Sidian 自有 Aggregator Paybill，集成 Daraja API | KES 250K-500K | 中小进口商、电商 | 秒级 |
| **行内转账** | Sidian Mobile/Internet Banking → 平台收款户 | 无 | Sidian 自有客户 | 实时 |
| **PesaLink 跨行** | 其他银行客户经 PesaLink 转入 | KES 999,999/笔 | Equity/KCB/Co-op 客户 | 实时 |
| **RTGS（KEPSS）** | 大额跨行实时清算 | 无 | >KES 100 万大额 | T+0 当日 |
| **EFT/ACH** | 批量低优先级 | 无 | 工资、批量缴费 | T+1~2 |
| **Visa/Mastercard 卡** | Sidian 卡收单（少量场景）| 卡组织限额 | B2B 卡支付 | 秒级 |
| **KE-QR 扫码** | EMVCo + KE-QR Standard | 钱包限额 | 商户与个人混合 | 秒级 |
| **信用证 LC** | 银行间报文（参见 3.2）| 无 | 中大额贸易 | T+按 LC 条款 |
| **托收 D/A · D/P** | Documents Against Acceptance/Payment | 无 | 中等贸易信用 | T+按托收条款 |
| **保函** | 银行保函（履约/付款保函）| 无 | 大额工程贸易 | T+按合同 |

> **设计原则**：渠道全部数字化、API 化。**不接受柜面现金、不接受纸质支票**，避免现金管理风险与 AML 漏洞。

### 3.2 信用证 LC 集成（核心差异化能力）

LC 是国际贸易最重要的支付工具之一。Sidian 作为开证行（Issuing Bank）或通知行（Advising Bank），可在平台中完成：

```
[肯尼亚买家（开证申请人）]
       │
       │ ① 申请开立 LC（提交合同/贸易背景）
       ▼
[Sidian Bank（Issuing Bank）]
       │
       │ ② Sidian 审核 + 占用授信 + 开立 LC
       │ ③ ISO 20022 报文 → 中国合作行（IPL 体系内行）
       ▼
[中国合作行（与 IPL 同体系）]
       │
       │ ④ 通知中国卖家（Beneficiary）
       │ ⑤ 卖家发货 + 提交单据（B/L、Invoice、Packing List）
       │ ⑥ 单据审核合格 → 议付确认
       ▼
[ISO 20022 议付通知 → Sidian]
       │
       │ ⑦ Sidian 收单 → 确认无问题 → 解除 LC 责任
       │ ⑧ Sidian SCTC → IPL 通道 → KES→CNY 直兑落地
       ▼
[中国卖家收 CNY]

       │
       │ ⑨ Sidian 与买家结算（买家偿付 KES + LC 费用）
       ▼
[买家 Sidian 账户扣款]
```

**LC 报文方案（去 SWIFT）**：
- LC 报文采用 **ISO 20022（pacs/pain/camt 系列）** 而非传统 SWIFT MT
- 通过 SCTC 平台的 **银行间报文网关** 直接对接中国合作行（与 IPL 同体系）
- 也可通过 **PAPSS** / **CIPS（未来）** 双向连接
- **完全不经美国代理行、不经 SWIFT**

**LC 平台模块功能**：

- LC 在线申请（买家上传贸易合同自助开证）
- LC 单据自动 OCR 识别 + 字段比对
- LC 审单工作流（Sidian 单证团队）
- LC 议付与结算自动化
- LC 状态查询（开证/通知/承兑/议付/付款）
- 与 IPL CNY 落地通道无缝衔接

### 3.3 收款 SDK / API

Sidian 对其客户提供统一 API + SDK：

```
POST /v1/orders
{
  "amount": 100000,
  "amount_currency": "CNY",                    // 卖家计价币种
  "buyer_pay_currency": "KES",                 // 买家付款币种（仅 KES）
  "settlement_currency": "CNY|USDC|USDT",      // 卖家落地币种（不含 USD）
  "buyer": { "type": "MPESA|BANK|LC|...", "details": {...} },
  "trade_doc": { "contract_id": "...", "invoice": "...", "bl": "..." },
  "beneficiary": { "country": "CN", "type": "BUSINESS", ... }
}
→ 返回订单号 + 付款指令（Paybill 号 / Bank Account / LC 模板 / 收银台 URL）
→ 含锁汇凭证（KES 应付金额 + 锁汇有效期）
```

> **注意**：API 设计不暴露 USD 中间币种。客户与卖家只看到 KES → CNY/USDC/USDT 的端到端报价。

---

## 四、Sidian 中央清算引擎（Clearing Core）

### 4.1 引擎核心模块

| 模块 | 功能 |
|------|------|
| **多币种账本（Multi-currency Ledger）** | **KES / CNY / USDC / USDT 四币种**统一账本（无 USD），复式记账 |
| **直兑 FX 引擎（Direct FX Engine）** | **KES↔CNY、KES↔USDC、KES↔USDT 直接报价**；IPL/BB 作为双边做市商；实时锁汇 + 批量执行；不经 USD |
| **RTGS 模块** | 实时全额清算，单笔大额、加急 |
| **净额清算（DNS）模块** | 多笔合并，按日/批次净额结算（与 IPL/BB 结算时降本）|
| **参与者管理** | 直接参与者（DP）+ 间接参与者（IP）权限、额度、子账户管理 |
| **报文引擎（ISO 20022）** | pacs.008/pacs.009/camt.052/camt.053 等标准报文 |
| **对账引擎** | 多方对账（Sidian ↔ IPL ↔ BB ↔ 客户）、差异自动告警 |
| **风控引擎** | AML/CFT、制裁筛查、可疑交易识别、TBML（贸易洗钱）|
| **报告中心** | 监管报告、客户对账单、内部 MIS、数据看板 |

### 4.2 多币种账本设计（无 USD）

```
Sidian SCTC Ledger（双复式记账）

参与者 → 子账户 → 流水
  │       │        │
  ▼       ▼        ▼
 客户A   KES 户    [+1,800,000 KES] (M-Pesa 入账)
         CNY 户    [+100,000 CNY]   (KES→CNY 直兑落地)
         USDC 户   [    0 USDC]
         USDT 户   [    0 USDT]

  对应：
   · Sidian 自身 KES 备付金（行内）
   · IPL 在 Sidian 的 KES 头寸 + IPL 在中国的 CNY 池
   · BB 在 Sidian 的 KES 头寸 + BB 的 USDC/USDT 池
```

### 4.3 直兑 FX 引擎设计（一步到位、不经 USD）

#### 一步式直兑

```
KES → CNY              KES → USDC                KES → USDT
  │                       │                          │
  ▼ IPL 双边做市            ▼ BB 双边做市               ▼ BB 双边做市
[KES/CNY Pool]         [KES/USDC Pool]            [KES/USDT Pool]
  │                       │                          │
  · IPL 实时报价            · BB 实时报价               · BB 实时报价
  · 凭贸易背景核验           · 链上结算                  · 链上结算
  · SAFE 合规直接落地 CNY   · VASP 合规                · VASP 合规
```

> **关键创新**：IPL/BB 为 Sidian 提供 **直接 KES↔目标币种** 的双边做市报价，**报价内部参考 USD/CNY、USD/USDC 等市场价但客户透明感知是 KES↔目标币种一步价**。

#### IPL 作为 KES/CNY 双边做市商的运作

```
IPL 双边持仓：
  ┌────────────────────────┐  ┌────────────────────────┐
  │ IPL 在 Sidian 的 KES 户  │  │ IPL 中国境内 CNY 池     │
  │ (从 Sidian 买家收 KES)   │  │ (向中国卖家付 CNY)      │
  └────────────────────────┘  └────────────────────────┘
              ▲                           │
              │                           ▼
        买家付 KES                   卖家收 CNY

IPL 头寸管理：
  · 内部头寸轧差（避免逐笔跨境）
  · 周期性头寸再平衡：通过 PAPSS / 中非合作行（如 ICBC、BoC 非洲分行）
  · 反向流量对冲（中国出口商付肯尼亚供应商时反向）
  · 必要时通过 CNH（离岸人民币）市场补 KES 头寸
```

#### BB 作为 KES/USDC、KES/USDT 双边做市商

```
BB 双边持仓：
  ┌────────────────────────┐  ┌────────────────────────┐
  │ BB 在 Sidian 的 KES 户   │  │ BB 自营 USDC/USDT 钱包  │
  │ (从买家收 KES)            │  │ (向卖家付链上)          │
  └────────────────────────┘  └────────────────────────┘
              ▲                           │
              │                           ▼
        买家付 KES                   卖家收 USDC/USDT

BB 头寸管理：
  · KES 累积 → 通过 BB 自营 OTC 在加密市场出售（如 Binance P2P / Yellow Card）
  · 也可通过 IPL 协同：BB 把 KES 卖给 IPL，IPL 对应给 BB 美元/CNY 头寸
  · 链上 USDC/USDT 池由 BB 维护（Tether/Circle 渠道补给）
```

#### 锁汇与执行（端到端 T+0~T+1）

```
T0       客户询价 → SCTC FX 引擎询价 IPL（CNY）或 BB（USDC/USDT）
         返回直兑汇率：1 KES = X CNY / Y USDC / Y USDT
T+3s     客户确认订单 → 锁汇凭证生成（10-30 秒有效）
T+30s    买家发起付款（M-Pesa/银行/LC）
T+1min   KES 入 IPL/BB 在 Sidian 的账户
T+5min   IPL/BB 内部触发"KES 收款 → 目标币种付款"配对
         · IPL：从中国 CNY 池 → 向卖家对公账户付 CNY
         · BB：从 USDC/USDT 池 → 向卖家链上钱包付币
T+1h     卖家到账 → SCTC 对账完成
```

> **优势**：相比传统 `KES→USD→CNY` 双段链路（T+1~T+2、~1.0% 损耗），直兑路径 **T+0~T+1 + ~0.4% 损耗**。

### 4.4 清算时序

#### RTGS 模式（实时全额）

```
单笔大额、加急、需立即清算

[客户付款 KES] → [IPL/BB 在 Sidian 入账] → [IPL/BB 内部账本配对] → [目标币种付款]
    秒级                秒级                       秒级                  T+0
```

#### 净额清算模式（DNS）

```
小额高频、批量净额结算

T0 全天      [N 笔客户付款 KES] → [IPL/BB 在 Sidian 的 KES 头寸累积]
T+1 09:00    SCTC 汇总当日订单清单（按目标币种 + 对手分组）
T+1 11:00    分发到各 SP：
              · IPL：N 笔订单合并 → IPL 中国 CNY 池一次性 N 笔批量付款给卖家
              · BB：N 笔订单合并 → BB USDC/USDT 池一次性 N 笔批量链上付款
T+1 12:00    IPL/BB 完成付款 → SCTC 三方对账
```

> **优势**：
> - 跨境是 **IPL/BB 体内账本调拨**，不走 SWIFT，**无单笔 $25 成本**
> - 周期性头寸再平衡通过 PAPSS / 中非合作行 / CNH 离岸市场，规模化降本
> - 端到端成本 ≈ 0.4-0.8%（vs 传统 USD 中转 1.5-2.5%）

---

## 五、跨境结算（Cross-border Settlement）

### 5.1 结算路径全景（去美元 · 去 SWIFT）

```
                  Sidian SCTC Clearing Core
                            │
              ┌─────────────┴─────────────┐
              ▼                           ▼
        ┌──────────┐                ┌──────────┐
        │ IPL 通道  │                │ BB 通道   │
        │ KES→CNY  │                │ KES→USDC │
        │ 直兑      │                │ KES→USDT │
        └──────────┘                └──────────┘
              │                           │
              ▼                           ▼
     [中国卖家对公 CNY]            [卖家链上钱包 USDC/USDT]
     （80%+ 主流贸易）              （Web3/数字资产偏好）
```

> **不提供 USD/SWIFT 路径**：所有跨境结算都通过 IPL（CNY）或 BB（USDC/USDT），完全去美元化。

### 5.2 路径 A：KES → CNY 直兑（IPL 通道）

```
[买家付 KES（M-Pesa/银行/LC）]
        ↓
[IPL 在 Sidian 的 KES 收款户]    ← Sidian 行内即时入账
        ↓ Sidian 双 Webhook（IPL + EX）
[IPL FX 引擎做市报价：1 KES = X CNY]
        ↓ IPL 内部账本调拨：
        ↓   · IPL 在 Sidian 的 KES 头寸 +N
        ↓   · IPL 中国境内 CNY 池 -X*N
[IPL 中国 CNY 账户]              ← 凭贸易合同/Invoice/报关单核验
        ↓ T+0 直接付款
[中国卖家对公账户 / 支付宝企业]
```

**特点**：
- ✅ **不经 USD、不走 SWIFT**：跨境是 IPL 内部账本调拨（"在 Sidian 收 KES，在中国付 CNY"）
- ✅ T+0 ~ T+1 全链路
- ✅ 卖家直接收 CNY、可开发票、可退税
- ✅ IPL 持 SAFE 牌照，贸易合规完备
- ✅ 成本 ~0.4-0.6%（IPL 双边做市加点）

### 5.3 路径 B：KES → USDC/USDT 直兑（BB 通道）

```
[买家付 KES]
        ↓
[BB 在 Sidian 的 KES 收款户]      ← Sidian 行内即时入账
        ↓ Sidian 双 Webhook（BB + EX）
[BB FX 引擎做市报价：1 KES = Y USDC 或 Y USDT]
        ↓ BB 内部账本调拨：
        ↓   · BB 在 Sidian 的 KES 头寸 +N
        ↓   · BB USDC/USDT 自营钱包 -Y*N
[BB USDC/USDT 钱包]
        ↓ 链上付款（TRC20/ERC20/Polygon/Solana）
[卖家自有链上钱包]
```

**特点**：
- ✅ **不经 USD、不走 SWIFT**：跨境是 BB 内部账本调拨 + 链上付款
- ✅ T+0 全链路（链上付款几乎秒级）
- ✅ 适合 Web3 卖家、自由职业者、数字资产偏好者
- ✅ 成本 ~0.3-0.5%（BB 双边做市加点 + 链上 Gas）

#### USDC vs USDT 选择

| 维度 | USDC | USDT |
|------|------|------|
| **发行方** | Circle（美国，受 NYDFS 监管）| Tether（BVI 注册）|
| **合规等级** | 高（与美国监管深度配合）| 中（曾因储备透明度受质疑）|
| **流动性** | 中（DeFi 主流之一）| 最高（全球加密第一稳定币）|
| **链支持** | ETH/Polygon/Solana/Avalanche/Base 等 | TRC20/ERC20/BSC/Polygon 等 |
| **典型卖家偏好** | 合规优先（机构、欧美卖家）| 速度+成本优先（亚洲卖家、中小商户）|

> **推荐**：BB 同时支持 USDC + USDT，由卖家选择。USDC 适合长期持有 / 与美国合作；USDT 适合快速变现。

### 5.4 IPL/BB 头寸再平衡机制

由于 IPL/BB 在 Sidian 不断累积 KES 头寸（卖出 CNY/USDC/USDT），需要周期性再平衡：

```
IPL 头寸再平衡选项：
  ① PAPSS（泛非洲清算系统）→ 直接 KES↔CNY 跨境清算（未来主路径）
  ② 中非合作行（如 ICBC 标银、BoC 非洲分行）→ 双边 KES/CNY 清算协议
  ③ CNH 离岸市场（HK）→ KES 卖出换 CNH，CNH 转回 CNY 池
  ④ 反向流量对冲：中国出口商付肯尼亚供应商时，IPL 把累积 KES 卖给他们
  ⑤ 与 BB 内部协同：IPL 把 KES 卖给 BB（BB 用 KES 服务 USDC 客户）

BB 头寸再平衡选项：
  ① 加密 OTC 市场（Binance P2P / Yellow Card）→ KES 兑 USDT 卖出
  ② 与 IPL 内部协同（同上）
  ③ 通过 Sidian 在 CBK 框架下的外汇额度
```

> **关键**：再平衡是 **IPL/BB 自营业务**，对 SCTC 客户透明。客户始终看到一步直兑价。

### 5.5 路径 C：区域互联（未来）

通过 **PAPSS（泛非洲清算系统）** 实现：
- KES → CNY（PAPSS 与 CIPS 互联，未来）
- KES → TZS / UGX / RWF（东非区域 EAPS）
- KES → NGN / GHS / ZAR（泛非洲）

---

## 六、贸易金融模块（Trade Finance）

### 6.1 LC 全流程线上化（去 SWIFT · 去美元）

```
[买家：Sidian 直客 / SCTC 平台用户]
   ↓ 在线申请 LC
[Sidian 单证审核 + 授信占用]
   ↓ 自动生成 ISO 20022 报文
[SCTC LC 引擎 + 银行间报文网关]
   ↓ 发送 ISO 20022 LC 报文
[中国合作行（IPL 体系内行）]
   ↓ 通知中国卖家
[卖家发货 → 提交单据]
   ↓ 单据上传到 SCTC LC 模块
[中国议付行（与 IPL 关联）]
   ↓ 单据议付 → ISO 20022 议付通知
[Sidian 收单 + 自动 OCR + 字段比对]
   ↓ Sidian 审单 → 通过 → 付款指令
[SCTC 直兑 FX 引擎 + IPL 通道]
   ↓ KES → CNY 一步直兑 → 卖家收款
[买家 Sidian 账户偿付（含 LC 费用）]
```

**LC 模块关键能力**：

- ✅ 在线开证（买家自助 + Sidian 审核）
- ✅ **ISO 20022 报文**自动生成（取代传统 SWIFT MT700/MT710/MT202）
- ✅ 单据 OCR 自动识别（Invoice、B/L、Packing List）
- ✅ 单据合规性自动比对（与 LC 条款字段匹配）
- ✅ Sidian 审单工作流（待审/退单/通过）
- ✅ LC 状态全流程跟踪
- ✅ **不依赖 SWIFT 网络、不依赖美国代理行**

> **报文路径**：SCTC ↔ IPL 体系内中国合作行的双边银行间网关。后期可对接 PAPSS、CIPS 实现更广泛的银行覆盖。

### 6.2 D/A · D/P 托收

| 类型 | 说明 |
|------|------|
| **D/A（Documents Against Acceptance）** | 承兑交单：买家承兑后取单提货，到期付款 |
| **D/P（Documents Against Payment）** | 付款交单：买家付款后才能取单 |

SCTC 平台支持 D/A、D/P 全流程线上化，与 LC 共享单据 OCR 与审核引擎。

### 6.3 银行保函（Bank Guarantee）

| 类型 | 适用场景 |
|------|---------|
| **付款保函** | 大额贸易，担保买家付款 |
| **履约保函** | 工程合同，担保中国供应商履约 |
| **预付款保函** | 买家预付款保证 |
| **质保保函** | 售后质保期保证 |

### 6.4 贸易融资（Trade Finance Loan）

| 产品 | 说明 |
|------|------|
| **进口押汇（Import Loan）** | 买家收到货物后，用 LC/合同向 Sidian 申请短期融资 |
| **打包贷款（Packing Credit）** | 中国卖家凭 LC 向中国银行融资发货（SCTC 与中国银行合作）|
| **保理（Factoring）** | 应收账款转让融资 |
| **福费廷（Forfaiting）** | LC 项下应收远期票据贴现 |

> **数据驱动信贷**：Sidian 基于 SCTC 平台积累的客户交易数据，做"基于交易流水的小额信贷"，类似阿里"网商贷"模式。

---

## 七、参与者模型（Multi-tier Participant Model）

### 7.1 直接参与者（Direct Participants）

| 参与者类型 | 接入方式 | 服务 |
|-----------|---------|------|
| **Sidian 直客（企业 / SME）** | Sidian Internet Banking + SCTC API | 完整服务 |
| **Sidian 高净值客户** | RM + Portal | 优先级、专属费率 |
| **Sidian 总分行** | 行内系统 | 柜面发起、代客操作 |
| **Sidian 代理网点** | Mobile App + Tablet | 农村地区代理服务 |

### 7.2 间接参与者（Indirect Participants）

#### 其他肯尼亚银行通过 Sidian 代理

```
[Equity Bank 客户] → Equity Bank → [SCTC API 代理通道] → SCTC 清算
[KCB 客户]         → KCB        → [SCTC API 代理通道] → SCTC 清算
[Co-op 客户]       → Co-op      → [SCTC API 代理通道] → SCTC 清算
```

**商业模式**：
- Sidian 向其他银行收"参与费"（年费 + 交易抽成）
- 其他银行通过 Sidian 提供"中国走廊"能力给自己客户，无需自建
- Sidian 成为中国走廊的**网络运营者**

### 7.3 区域扩展（未来）

```
Phase 1（年 1）：肯尼亚境内 Sidian 直客 + 代理银行
Phase 2（年 2）：扩展坦桑尼亚（Sidian 在 TZ 通过合作行）
Phase 3（年 3）：覆盖东非 5 国（EAC）
Phase 4（年 4-5）：泛非洲（通过 PAPSS）
```

---

## 八、技术架构

### 8.1 整体技术栈

```
┌─────────────────────────────────────────────────────────────┐
│                  对外接入层                                   │
│  Web Portal │ Mobile App │ API/SDK │ ISO20022 Bank Gateway   │
└─────────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│            Sidian 中央清算核心（SCTC Core）                  │
│  Order │ Ledger │ Direct-FX │ RTGS │ DNS │ ISO20022 │ Recon │
└─────────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  适配器层（Adapters）                         │
│  M-Pesa │ PesaLink │ KEPSS │ IPL Gateway │ BB Gateway │ Card │
└─────────────────────────────────────────────────────────────┘
                          ▼
┌─────────────────────────────────────────────────────────────┐
│                  外部系统                                     │
│  Safaricom │ KBA/IPSL │ CBK │ IPL │ BB │ PAPSS（未来）       │
└─────────────────────────────────────────────────────────────┘
```

> **架构特点**：完全去 SWIFT。所有跨境通信走 ISO 20022 自有银行间网关 + IPL/BB 内部 API，未来对接 PAPSS。

### 8.2 EX 平台向 Sidian 输出的能力

EX 作为 SCTC 系统的**底层技术供应方**，向 Sidian 提供：

| 能力 | 说明 |
|------|------|
| **清算核心引擎**（License）| 多币种账本、FX、RTGS、DNS、ISO 20022（SaaS / 私有部署）|
| **API/SDK** | Sidian 客户接入用，全套开发工具 |
| **管理后台**（白标）| Sidian 运营人员使用的 Portal |
| **客户门户**（白标）| Sidian 直客使用的 Web/Mobile |
| **IPL 通道**（API 集成）| CNY 落地（包级合作）|
| **BB 通道**（API 集成）| USDC/USDT 落地（包级合作）|
| **合规中台** | AML/制裁筛查/TBML 引擎 |
| **对账引擎** | 多方对账自动化 |
| **报告系统** | 监管报告、内部 MIS |

### 8.3 部署模式

| 模式 | 说明 | 适用 |
|------|------|------|
| **SaaS 多租户** | 共享基础设施 | 启动期，快速上线 |
| **专属云** | 独享虚拟集群 | Sidian 数据隔离 + 监管要求 |
| **私有化部署** | 部署到 Sidian 数据中心 | CBK 数据本地化要求 + 长期 |

> **推荐**：Phase 1 SaaS 快速启动，Phase 2 迁移到专属云，Phase 3 私有化。

---

## 九、合规与风控

### 9.1 双侧合规分工

| 合规域 | 责任方 | 内容 |
|--------|--------|------|
| **肯尼亚境内合规** | Sidian Bank | 银行牌照、CBK 监管、KYB/KYC、AML、反恐融资 |
| **外汇合规** | Sidian Bank | CBK 外汇额度、Form M、贸易背景核验 |
| **中国境内合规（CNY 路径）**| IPL | SAFE 跨境支付牌照、贸易背景二次核验 |
| **数字资产合规（USDC/USDT 路径）**| BB | VASP 牌照、链上 AML、地址监控 |
| **平台层合规** | EX 平台 | 数据合规（GDPR/DPA 2019）、跨境数据传输、运营审计 |

### 9.2 风控引擎核心规则

| 规则类型 | 示例 |
|---------|------|
| **金额异常** | 单笔超 $50K 自动复核；客户单日累计超额触发限制 |
| **频次异常** | 同一客户同一商品多笔、多个买家付款给同一卖家 |
| **黑名单** | OFAC、UN、EU、CBK 制裁名单实时筛查 |
| **TBML（贸易洗钱）** | 价格虚高/虚低、商品类目与客户经营范围不符、循环贸易 |
| **行为分析** | 客户行为模式机器学习模型 |
| **设备指纹** | 多账号同设备、地理位置异常 |

### 9.3 监管报告自动化

- CBK 季度报告（外汇头寸、跨境流水）
- KEBS 进口数据上报
- KRA 税务数据上报
- 中国 SAFE（通过 IPL）
- AML/CFT 监管报告

---

## 十、商业模式

### 10.1 收费模型

#### Sidian 向客户收费

| 收费项 | 标准（参考）| 收益归属 |
|--------|-----------|---------|
| 平台交易费 | 0.3-0.6% / 笔 | Sidian |
| 换汇加点（KES→USD）| 0.5-0.8% | Sidian |
| 跨境调拨费 | 0.2-0.3% | Sidian + 中间行 |
| LC 开证费 | 0.125-0.5% / 季 | Sidian |
| LC 修改费 | 固定 $30-50 / 次 | Sidian |
| 单据审核费 | 0.1% 单据金额 | Sidian |
| 保函费 | 0.5-2% / 年 | Sidian |
| 增值服务（贸易融资）| 议价 | Sidian |
| 间接参与者年费 | $50K-200K / 行 / 年 | Sidian |

#### Sidian 向 EX 平台支付

| 收费项 | 标准（参考）| 说明 |
|--------|-----------|------|
| **平台 License** | $500K-2M / 年（按规模）| SaaS 订阅或一次性买断 |
| **交易抽成** | 0.05-0.15% / 笔 | 走 SCTC 平台的所有交易 |
| **IPL 直兑通道费** | 0.3-0.5% | KES→CNY 一步直兑，按 IPL 标准 |
| **BB 直兑通道费** | 0.2-0.4% | KES→USDC/USDT 一步直兑，按 BB 标准 |
| **合规 / 反洗钱模块** | 含在 License 内 | — |
| **定制开发** | 按工时 | 特定本地化需求 |

#### 典型单笔分润（示例：等值 USD 5,000 的 KES→CNY 直兑订单）

```
客户支付总成本（去美元，无 SWIFT）：
  · 平台交易费 (Sidian)              $25  (0.5%)
  · KES→CNY 直兑加点 (IPL 双边做市)   $25  (0.5%)
  · LC 单据审核（如有）              $5   (按需)
  ─────────────────────────────────
  总成本                             $50-55  (1.0-1.1%)

  对比传统 KES→USD→CNY 路径：
    · 双段换汇 ~1.0%
    · SWIFT 中间行 $25-50
    · 合计 ~$150-200 (3-4%)
  → 节省 60%+

收入分配：
  · Sidian Bank                  $30  (品牌+客户+本地清算)
  · IPL                          $15  (中国 CNY 落地 + 双边做市)
  · EX 平台 (License + 抽成)      $5-10 (清算+合规+技术)
```

> **对比说明**：去美元 + 去 SWIFT 路径，端到端成本从传统 ~3% 降到 ~1%，是核心商业卖点。

### 10.2 Sidian 的预期增长

| 维度 | 起步 | 1 年 | 3 年 |
|------|------|------|------|
| 月交易笔数 | 1K | 50K | 500K |
| 月交易额 | $10M | $300M | $3B |
| 月收入 | $50K | $1.5M | $15M |
| 间接参与者 | 0 | 3 行 | 15 行 |
| 沉淀存款 | $5M | $150M | $1B |

### 10.3 Sidian 的护城河

| 护城河 | 说明 |
|--------|------|
| 🏰 **网络效应** | 越多银行接入，对中小银行越有吸引力（不接 = 失去中国走廊能力）|
| 🏰 **数据资产** | 中肯贸易数据沉淀，反哺信贷、风控、产品 |
| 🏰 **品牌资产** | "Sidian = 中国走廊专家"建立后，品牌不可替代 |
| 🏰 **监管壁垒** | CBK 不会批准多个银行做同样的事，先发优势巨大 |
| 🏰 **技术壁垒** | SCTC 系统持续迭代，后来者难以追赶 |

---

## 十一、实施路线图

### 11.1 阶段划分

| 阶段 | 时间 | 关键里程碑 |
|------|------|-----------|
| **Phase 0：战略对齐** | 1 月 | Sidian 高层 + EX/IPL/BB 联合启动；MOU 签署；IPL/BB 在 Sidian 开 KES 账户 |
| **Phase 1：核心 MVP** | 2-4 月 | M-Pesa 收款 + **IPL KES→CNY 直兑** + 中国卖家 CNY 落地（端到端 MVP）|
| **Phase 2：多渠道扩展** | 5-7 月 | 行内/PesaLink/RTGS/卡 + LC 模块（ISO 20022 报文）|
| **Phase 3：BB 数币通道** | 8-9 月 | USDC/USDT 落地 |
| **Phase 4：清算引擎升级** | 10-12 月 | RTGS + DNS + ISO 20022 + 间接参与者 API |
| **Phase 5：贸易金融** | 13-15 月 | LC 全流程 + D/A·D/P + 保函 + 贸易融资 |
| **Phase 6：网络扩张** | 16-18 月 | 接入 3-5 家肯尼亚代理银行 |
| **Phase 7：区域扩展** | 19-24 月 | 坦桑/乌干达/卢旺达试点 |
| **Phase 8：泛非** | 25+ 月 | PAPSS 整合 |

### 11.2 关键依赖

| 依赖项 | 责任方 | 风险 |
|--------|--------|------|
| Sidian 战略决策 | Sidian 董事会 | 高（决定项目大小）|
| CBK 牌照确认（多渠道清算）| Sidian Compliance | 中 |
| Safaricom Aggregator Paybill 升级 | Sidian + Safaricom | 中 |
| IPL CNY 容量扩展 | IPL | 低 |
| BB USDC/USDT 牌照 | BB | 低 |
| ISO 20022 报文系统 | EX 技术 | 中 |
| LC SWIFT 集成 | Sidian | 中 |
| 间接参与者商务谈判 | Sidian 商务 | 高 |

---

## 十二、对比与竞争优势

### 12.1 竞争对手分析

| 对手 | 模式 | 短板 |
|------|------|------|
| **Equity Bank China Desk** | 自建中国分支 | 重资产、规模有限、无清算系统、依赖 USD/SWIFT |
| **KCB China Trade** | 与中国银行代理合作 | 无差异化、SWIFT 老式做法、双段换汇高成本 |
| **AZA Finance** | B2B 跨境支付 SaaS | 无银行牌照、无 LC、无清算系统、依赖 USD |
| **PingPong / 连连国际** | 中国跨境收款 | 中国端强但肯尼亚端弱、KES 走 USD 中转 |
| **Wise Business** | 跨境数字银行 | 无 LC、无贸易金融、KES 入金后仍走 USD |
| **传统 SWIFT** | 银行间电汇 | 慢、贵、无清算编排、强依赖美元代理行 |

### 12.2 Sidian SCTC 的独特定位

```
                    "全能"
                      ▲
                      │
   AZA Finance    🎯 SCTC（Sidian）
   PingPong         · 银行牌照
                    · LC 贸易金融
                    · 清算系统
                    · 数币通道
                    · 网络效应
                      │
   Wise            Equity China Desk
                      │
                      ▼
                    "传统"
   ←───────────"轻"────────"重"───────→
```

### 12.3 价值主张总结

| 维度 | Sidian SCTC 优势 |
|------|---------------|
| **银行级合规** | 完整银行牌照 + LC + 担保 |
| **多渠道支付** | M-Pesa / 行内 / PesaLink / RTGS / LC / 卡 / KE-QR 一站式 |
| **去美元清算** | KES↔CNY/USDC/USDT 一步直兑，**不经 USD、不走 SWIFT** |
| **多形态结算** | 法币（CNY）+ 数币（USDC/USDT）+ LC 贸易金融 |
| **智能清算** | RTGS + DNS + ISO 20022 |
| **网络运营** | 其他银行通过 Sidian 接入中国走廊 |
| **数据资产** | 中肯贸易第一手数据 |
| **抗制裁** | 不依赖美国代理行，规避地缘政治风险 |
| **区域扩张** | 东非 + 泛非洲（PAPSS）网络效应 |

---

## 十三、附录

### 13.1 关键术语对照

| 中文 | 英文 | 说明 |
|------|------|------|
| 中央清算系统 | Central Clearing System | 类比 CIPS / CHIPS |
| 实时全额清算 | RTGS（Real-Time Gross Settlement）| 单笔实时 |
| 净额清算 | DNS（Deferred Net Settlement）| 批量净额 |
| 信用证 | LC（Letter of Credit）| 银行担保付款 |
| 承兑交单 | D/A（Documents Against Acceptance）| 托收方式 |
| 付款交单 | D/P（Documents Against Payment）| 托收方式 |
| 保理 | Factoring | 应收账款融资 |
| 福费廷 | Forfaiting | 远期票据贴现 |
| 直接参与者 | DP（Direct Participant）| 直接接入清算系统 |
| 间接参与者 | IP（Indirect Participant）| 通过 DP 代理接入 |
| 贸易洗钱 | TBML（Trade-Based Money Laundering）| 通过虚假贸易洗钱 |

### 13.2 参考文档

- `@/Users/xiaoxiaoliu/Documents/Ipaylinks/IPL PRODUCT/EX-NEW/Solutions/market-research/kenya-payment-market.md`
- `@/Users/xiaoxiaoliu/Documents/Ipaylinks/IPL PRODUCT/EX-NEW/Solutions/solutions/TE-solution/sidian-bank-china-payment-solution.md`（Sidian 作为 SP 的版本）
- CIPS 系统设计公开资料
- ISO 20022 报文标准
- Sidian Bank 公开年报

---

> **方案核心**：
>
> 1. **战略升级**：把 Sidian 从"中型商业银行"升级为"东非中国走廊清算枢纽"
> 2. **技术输出**：EX 平台向 Sidian **白标输出**完整清算系统（License + SaaS）
> 3. **去美元化**：KES↔CNY/USDC/USDT 一步直兑，**不经 USD 中转**
> 4. **去 SWIFT**：跨境是 IPL/BB 体内账本调拨 + ISO 20022 银行间网关，**不依赖美元代理行**
> 5. **多渠道（全数字化）**：M-Pesa / 行内 / PesaLink / RTGS / LC / 卡 / KE-QR
> 6. **多币种**：KES / CNY / USDC / USDT 四币种统一账本（**无 USD**）
> 7. **多参与者**：Sidian 直客 + 其他肯尼亚银行间接参与 → 网络效应
> 8. **贸易金融**：LC（ISO 20022）+ D/A·D/P + 保函 + 贸易融资 → 银行级差异化
> 9. **EX/IPL/BB 联合**：EX 提供清算技术，IPL 做市 KES↔CNY，BB 做市 KES↔USDC/USDT
> 10. **抗制裁 + 低成本**：成本从传统 ~3% 降至 ~1%；规避地缘政治风险
