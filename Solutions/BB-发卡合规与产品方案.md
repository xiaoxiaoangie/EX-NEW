# BB 发卡：合规 + 产品方案

> **版本**：v1.0
> **场景**：BB 通过美国壳主体 + Sponsor Bank，对终端商户（Merchant）提供 US BIN 发卡；并复用同一模板扩展 AU / EU / UK
> **核心矛盾**：BB 要求对接方"持牌"；当前美国壳是普通公司（非持牌），与 BB 政策冲突
> **解决思路**：**不拿发卡 MTL**，通过 **"Agent of Sponsor Bank + FBO 账户"** 模型，把合规资质沉淀到 Sponsor Bank 层，壳主体只做 Program Manager

---

## 1. 业务流程（商户视角）

商户看到的是一个极简流程：

```
① 商户在 BB 平台发起充值
        ↓
② 资金到账
        ↓
③ 平台发卡 / 充值到卡
```

商户**不需要**感知背后有"壳主体"、"Sponsor Bank"、"FBO 账户"这些结构——这些是 BB 侧的合规抽象。

---

## 2. 真实资金流（合规视角）

商户看不到的是资金实际在哪些主体间流转。**这一层的设计是整个方案成立的关键**：

```
商户（Merchant）
    │
    │ 充值（USD wire / ACH / USDC → USD）
    ▼
┌──────────────────────────────────────────────────┐
│  Sponsor Bank 开立的 FBO 账户                    │
│  （For Benefit Of: BB Merchant Customers）       │
│  ─────────────────────────────────────────────   │
│  法律上：账户归 Sponsor Bank 所有                │
│  受益人：商户（子账户逻辑隔离）                  │
│  托管角色：BB 美国壳 / BB 母体（operator）      │
└──────────────────────────────────────────────────┘
    │
    │ Sponsor Bank 执行出账（发卡充值、交易清算）
    ▼
商户持有的 Visa / MC 卡消费
```

### 2.1 为什么是 FBO 账户？

**FBO（For-Benefit-Of）账户是 Fintech 合规的"魔法"所在**：

| 对比项 | 普通账户（壳公司自持） | FBO 账户（Sponsor Bank 持） |
|---|---|---|
| 法律所有权 | 壳公司 | **Sponsor Bank** |
| 商户资金法律性质 | 壳公司的负债 / 代收款 | 信托式独立资产，破产隔离 |
| 是否触发州 MTL | **会触发**（州视壳公司为 Money Transmitter） | **不触发**（壳只是 PM，不持有客户资金） |
| 破产风险 | 壳公司倒闭 → 商户资金被清算 | 壳公司倒闭 → 商户资金仍在 Sponsor Bank，受 FDIC 保护 |
| 行业实例 | 无（这是 Synapse × Evolve 崩掉的那种设计） | Marqeta、Lithic、Mercury、Brex、Ramp 全走这个 |

> **记住这一条**：只要商户的钱在 FBO 账户里（Sponsor Bank 名下），壳公司就不算 Money Transmitter，**就不需要一州一州去拿 MTL**。

---

## 3. 主体与牌照结构

```
                          ┌──────────────────────────────┐
                          │  BB 母体（HK / SG）           │
                          │  · VASP 牌照                 │
                          │  · SRO 牌照                  │
                          │  · 技术平台 + 风控 + Crypto 入口│
                          └──────────────┬───────────────┘
                                         │ 100% 控股
                                         ▼
                          ┌──────────────────────────────┐
                          │  BB US, Inc.（Delaware LLC） │
                          │  ─────────────────────────   │
                          │  角色：Program Manager       │
                          │  · FinCEN MSB 注册（见 §4）  │
                          │  · 与 Sponsor Bank 签 PMA    │
                          │  · 客户面 / 合同 / 运营      │
                          └──────────────┬───────────────┘
                                         │ PMA
                                         ▼
                          ┌──────────────────────────────┐
                          │  Sponsor Bank（持牌方）       │
                          │  例：Cross River / Sutton /  │
                          │      Pathward / Celtic        │
                          │  · FDIC 会员 + 州银行牌照    │
                          │  · Visa / MC BIN 授权         │
                          │  · **持有 FBO 账户**         │
                          │  · 所有客户资金法律归属方    │
                          └──────────────────────────────┘
```

### 3.1 每个主体的牌照与注册清单

| 主体 | 角色 | 必须做的合规动作 | 为什么 |
|---|---|---|---|
| **BB 母体** | VASP + 技术平台 | 保持现有 VASP + SRO | 承接 Crypto → USD 的合规入金 |
| **BB US, Inc.（壳）** | Program Manager | ✅ **FinCEN MSB 注册**（联邦级，1–2 周，< $1000）<br>✅ 州 MTL **不需要**（因为走 FBO 架构，资金不过壳账户） | MSB 是联邦 AML 基线，成本极低但让 BB 内部合规政策"有据可查"；规避州 MTL 是本方案的核心省钱点 |
| **Sponsor Bank** | 真正的持牌发卡方 | BB 对其做独立 KYB + 牌照审计 | 全链路的合规资质来自这里 |

---

## 4. 关于"升级合规壳 = 要拿 MSB 吗"的直接回答

### ✅ **要，但只是"注册"不是"申请牌照"，成本极低**

| 项 | 内容 |
|---|---|
| 是什么 | **FinCEN MSB 注册**（Money Services Business Registration, Form 107） |
| 级别 | 联邦（不是州牌） |
| 成本 | 注册费 < $1000；年度更新 < $500 |
| 时间 | 1–2 周下号 |
| 难度 | 低（网上填表 + 反洗钱官员任命 + BSA/AML 政策文档） |
| 换来的效果 | 壳公司进入 **FinCEN MSB Registry** 公开可查；BB 内部合规政策的"持牌"口径满足 |

### ❌ **不需要做的（成本高、时间长，且通过 FBO 架构可避开）**

| 项 | 为什么不做 |
|---|---|
| **州 MTL（Money Transmitter License）** | 一州一拿、$1M+、2–3 年；**走 FBO 架构后不触发 MTL 适用条件** |
| **OCC 国家银行牌照** | 根本不需要，也不可能 |
| **州级 Trust / ILC** | 同上 |

### 💡 **BB 内部合规政策的口径改动（核心）**

BB 政策原文（推测）："对接方必须是**持牌**主体。"

建议改为：

> **合规通道认定 = 直接对接方 + 其背后的合规链路：**
>
> **条件 A**：直接对接方（Program Manager）本身满足以下任一：
>   1. 持牌（MTL / EMI / PI / VASP / MSB 等联邦或州级资质），或
>   2. **已在联邦层面注册为 MSB（或等同资质）**，且持续在合规状态；
>
> **条件 B**：整条链路的发卡 / 清结算主体必须持牌：
>   - 必须有一家持牌 Sponsor Bank / Issuing Bank 作为资金持有方；
>   - 直接对接方与其之间有**可审计的 PMA 合同**；
>   - BB 可以独立对 Sponsor Bank 做 KYB 与牌照审计。
>
> **条件 A + B 同时满足 → 视为合规通道**。

这个改动的本质：**从"只看直接对接方"升级为"看合规链路完整性"**。这是国际持牌发卡行业的通用合规标准。

---

## 5. 产品方案：终端商户的完整旅程

### 5.1 Onboarding（开户）

```
商户填写 KYB 资料（公司 / UBO / 业务模型）
    ↓
BB 平台侧做一层 KYB（BB 风控）
    ↓
数据同步到 Sponsor Bank（Sponsor Bank 做二次合规审查）
    ↓
两边通过 → 为商户在 FBO 账户下开"子账户"（逻辑隔离）
    ↓
商户账户可用
```

**关键设计**：**双层 KYB**。BB 做商业可行性筛选，Sponsor Bank 做监管合规审查，两层职责边界清晰。

### 5.2 充值（Funding）

| 充值方式 | 资金路径 | 适用场景 |
|---|---|---|
| **USD 电汇 / ACH** | 商户银行 → 直接到 Sponsor Bank 的 FBO 账户 | 已有美元银行账户的商户 |
| **USDC / USDT → USD** | 商户链上钱包 → BB 母体 VASP（crypto 入金）→ 换汇 → 打到 FBO 账户 | 绝大多数 crypto 原生客户（BB 的主力客群） |

**crypto 入金的合规亮点**：这一步用到了 BB 母体的 **VASP + SRO 牌照**——crypto 入金由持牌 VASP 处理，USD 到账由持牌 Sponsor Bank 处理，两段都是持牌操作，**壳公司不碰客户钱**。

### 5.3 发卡

```
商户请求发卡
    ↓
BB 平台发单到 Issuer Processor（Marqeta / Lithic / Galileo）
    ↓
Sponsor Bank 授权 → Visa / MC 生成卡号
    ↓
卡绑定商户 FBO 子账户的可用余额
    ↓
商户消费时，Sponsor Bank 从 FBO 子账户扣款、清算
```

### 5.4 出金 / 退款

```
商户发起出金
    ↓
BB 风控 + Sponsor Bank 合规审查
    ↓
Sponsor Bank 从 FBO 子账户出账：
  - 法币出金：ACH / Wire → 商户银行
  - Crypto 出金：FBO 账户 → BB VASP → 链上地址
```

### 5.5 对商户的对外叙事

**不要对商户披露 FBO / 壳 / Sponsor Bank 的细节**，但合规披露必须到位：

- 合同中明示"资金由 [Sponsor Bank 名称] 持有，受 FDIC 保险"
- 对大客户 / 机构客户可主动说明三层结构（提升合规信任）
- 对 C 端 / 小 B 商户隐藏细节，只讲流程与费率

---

## 6. 和"卡台行业壳主体做法"的对比

| 做法 | 资金放哪 | 合规性 | 风险 | BB 是否该走 |
|---|---|---|---|---|
| ❌ 裸壳型 | 壳公司自有账户 | 无任何监管注册 | 随时被 Visa/MC 切 BIN，商户资金无保护 | 不走 |
| ⚠️ 半合规壳型 | 壳公司账户 + FinCEN MSB | 有 MSB 但**缺 MTL** → 技术上违规 | 被州监管找 / 商户资金无 FDIC 保护 | 不走 |
| ✅ **FBO 合规壳型（本方案）** | **Sponsor Bank 的 FBO 账户** | MSB 联邦注册 + Sponsor Bank 持牌背书 | 行业主流，Marqeta / Lithic / Mercury 都这样 | **就是这个** |

---

## 7. 其他 BIN 市场的复用模板

同一套"**本地壳 + 轻量合规注册 + 持牌 Sponsor + FBO 账户**"模型复制到其他市场：

| 市场 | 本地壳 | 联邦 / 基础注册 | 推荐 Sponsor Bank / Issuer | FBO 模式是否可行 |
|---|---|---|---|---|
| **US** | Delaware LLC | FinCEN MSB | Cross River / Sutton / Pathward / Celtic | ✅ |
| **AU** | Pty Ltd | AUSTRAC DCE 注册 | EML / Hay / Novatti | ✅（类 FBO：Trust Account） |
| **EU** | 立陶宛 / 爱尔兰 UAB/SA | EMD Agent | Intergiro / Modulr / Treezor / Swan | ✅（Safeguarded Account） |
| **UK** | UK Ltd | FCA EMI Agent | Modulr / Clear Junction | ✅（Safeguarded Account） |
| **HK** | 现 BB HK 主体 | SVF | 自持或合作 | ✅ |
| **SG** | 现 BB SG 主体 | MAS PS Act / MPI | 自持或合作 | ✅ |

每个市场都有本地版的 "FBO 等价物"（UK 叫 Safeguarded、EU 叫 Trust、AU 叫 Trust Account），**合规逻辑完全一致**。

---

## 8. 落地路线

| 阶段 | 时间 | 关键动作 |
|---|---|---|
| **Phase 0** | Week 0 | 更新 BB 合规政策文档（§4 新口径），并由 Legal / Compliance 签字 |
| **Phase 1** | Week 1–4 | BB US, Inc. 完成 FinCEN MSB 注册；选定首家 Sponsor Bank（建议 Cross River，启动 KYB） |
| **Phase 2** | Month 2–3 | 签 PMA；对接 Issuer Processor（建议 Lithic，API 轻、出卡快）；打通 FBO 子账户系统；跑通第一个商户 |
| **Phase 3** | Month 3–6 | 接入 Crypto → USD 入金链路（BB VASP × Sponsor Bank）；上线出金 / 退款流；产品正式对外 |
| **Phase 4** | Month 6–9 | 复制到 UK / EU 市场（EMI Agent + Modulr）；配 2 家 Sponsor 做热备 |
| **Phase 5** | Month 9–12 | 评估是否值得在 US / UK 升级到主牌（MTL / EMI 自持），降低 Sponsor 依赖 |

---

## 9. 风险与前置规避

| 风险 | 规避 |
|---|---|
| Sponsor Bank 单点失败（类 Synapse × Evolve） | 每市场 2 家 Sponsor Bank 主备；PMA 中明写 "Portability 条款"（BIN、客户、数据可转移） |
| Visa / MC 地理合规红线 | 不用 US BIN 给亚洲客户发卡；跨境发卡走允许的 EU / UK / SG BIN 程序 |
| 壳公司被误用为收款 / 付款主体 | 所有资金合同、发票、对账文件都抬头 Sponsor Bank 的 FBO 账户；壳公司只签"服务"合同，不签"收款"合同 |
| VASP 被误用为发卡资质对外宣传 | 对外口径明确："VASP 管 crypto 清算，Sponsor Bank 管卡发行"，两段拆开讲 |
| MSB 合规义务（CTR / SAR 上报） | MSB 注册后需建立 BSA/AML 程序、任命 Compliance Officer、交易监控；**成本远低于 MTL，但必须真正做到** |

---

## 10. 一句话总结

> BB 的美国壳**不需要升级为吃牌主体**，只需要：
>
> 1. **拿 FinCEN MSB 注册**（联邦级，$1000 / 1–2 周）；
> 2. **把客户资金放进 Sponsor Bank 的 FBO 账户**（而不是壳的自有账户）；
> 3. **更新 BB 合规政策**，把"直接对接方必须持牌"改为"**合规链路穿透式认定**"。
>
> 三步到位后，壳公司就是一个**合规的 Program Manager**，完全满足 BB 自身的合规政策，也符合美国监管对 Fintech 发卡的通用做法（Marqeta / Lithic / Mercury 路线）。州 MTL 是大额、长周期、后期再考虑的事，**一期不需要**。

---

## 附 A：术语速查

| 术语 | 全称 / 含义 |
|---|---|
| **MSB** | Money Services Business，联邦级反洗钱注册（FinCEN） |
| **MTL** | Money Transmitter License，州级汇款牌照（50 州逐个拿） |
| **FBO 账户** | For-Benefit-Of Account，Sponsor Bank 代客户持有资金的信托式账户 |
| **Sponsor Bank** | 持 BIN 授权、承担实际发卡合规责任的持牌银行 |
| **Program Manager (PM)** | 面向客户的运营方，在 Sponsor Bank 授权下做发卡程序 |
| **PMA** | Program Management Agreement，PM 与 Sponsor Bank 之间的合同 |
| **Issuer Processor** | 卡处理服务商（Marqeta / Lithic / Galileo），连接 PM 与 Sponsor Bank |
| **VASP** | Virtual Asset Service Provider，虚拟资产服务商 |
| **SRO** | Self-Regulatory Organization，自律组织牌照 |
| **KYB** | Know Your Business，企业尽调 |
| **ODD** | Ongoing Due Diligence，持续尽调 |

---

*方案撰写：<姓名>*
*日期：2026-04-24*
