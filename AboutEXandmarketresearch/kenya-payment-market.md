# 肯尼亚支付市场分析

> **版本**：v1.0
> **日期**：2026-05-16
> **范围**：肯尼亚境内支付 + 跨境支付 + 建设方向

---

## 一、市场概况

### 1.1 基础数据

| 维度 | 数据 |
|------|------|
| 人口 | ~5400 万（2024） |
| GDP | ~1180 亿美元（2024） |
| 货币 | 肯尼亚先令（KES） |
| 监管机构 | 肯尼亚中央银行（CBK, Central Bank of Kenya） |
| 移动渗透率 | ~130%（多卡多设备）|
| 互联网渗透率 | ~42% |
| 银行账户渗透率 | ~50% |
| **移动钱包渗透率** | **~96%（成年人口）** |

### 1.2 市场特征

肯尼亚是**全球移动支付渗透率最高的国家**，由 Safaricom 的 M-Pesa 主导，造就了独特的 "**Mobile Money First**" 市场结构：

- **跳过卡支付时代**：未经历"现金 → 卡 → 数字"的演进，直接从现金跳到移动钱包
- **B2C/C2C 移动钱包占绝对主导**：M-Pesa 处理的交易额 = GDP 的 60%+
- **银行卡渗透率低**：信用卡持有率 < 5%，借记卡 ~15%
- **东非金融科技中心**：肯尼亚是 EAC（东非共同体）的支付创新引擎

### 1.3 监管框架

| 法规/政策 | 说明 |
|-----------|------|
| National Payment System Act (2011) | 支付系统基本法 |
| National Payments Strategy 2022-2025 | 国家支付战略，定义 5 大支柱 |
| Money Remittance Regulations (2013) | 汇款服务监管 |
| Banking Act / E-money Regulations | 电子货币发行 |
| Data Protection Act (2019) | GDPR 风格数据保护法 |
| **VASP Bill（虚拟资产服务提供商法案）** | **2025 年通过，正式监管加密货币** |

---

## 二、境内主流支付方式

### 2.1 移动钱包（Mobile Money）— 绝对主导

#### M-Pesa（Safaricom）

| 维度 | 数据 |
|------|------|
| 活跃用户 | ~3400 万（肯尼亚境内） |
| 代理网络 | ~25 万个代理点 |
| 商户数（Lipa Na M-Pesa）| ~60 万家 |
| 日均交易笔数 | ~5000 万 |
| 年交易额 | KES 35+ 万亿（~2700 亿美元） |
| 市场份额 | ~98%（移动钱包市场） |

**核心产品矩阵：**

- **M-Pesa（个人钱包）**：P2P、充值、缴费、提现
- **Lipa Na M-Pesa（商户收款）**：Till Number / Paybill 两种收款方式
  - Till Number：实体商户 POS 收款（类似收款码）
  - Paybill：账单缴费（水电、保险、电信、政府）
- **Pochi La Biashara**：小微商户专用账户（区分个人和商业流水）
- **Fuliza**：透支信贷
- **M-Shwari / KCB M-Pesa**：储蓄+小额贷款
- **M-Pesa Global**：跨境汇款（与 PayPal/Western Union/MoneyGram 对接）
- **M-Pesa GO**：青少年钱包
- **M-Pesa for Business**：B2B 批量付款 API

#### 其他移动钱包

| 钱包 | 运营商 | 市场份额 | 特点 |
|------|--------|----------|------|
| **Airtel Money** | Airtel Africa | ~2% | 跨非洲 14 国互通，费率较 M-Pesa 低 |
| **T-Kash** | Telkom Kenya | <1% | 用户基础小 |
| **PesaPal** | 独立 | - | 聚合支付（接入 M-Pesa + 卡） |

#### 移动钱包互通

- **CBK 强制互通要求**：2018 年起，M-Pesa / Airtel Money / T-Kash 之间可直接 P2P 转账
- **费率统一**：互通转账费率与同钱包内转账接近
- **结算**：通过 CBK 系统每日清算

### 2.2 银行间支付

#### PesaLink

| 维度 | 说明 |
|------|------|
| 运营方 | Integrated Payment Services Limited (IPSL) — 由 KBA（肯尼亚银行家协会）成立 |
| 性质 | **银行间实时转账系统** |
| 接入银行 | 30+ 家商业银行 |
| 单笔上限 | KES 999,999 |
| 到账时效 | 实时（7×24） |
| 用途 | 银行账户之间实时转账，绕开 SWIFT/RTGS |

**痛点**：与移动钱包未深度互通，需通过桥接（如 M-Pesa 充提到银行卡）实现跨域。

#### KEPSS（Kenya Electronic Payment and Settlement System）

- **CBK 运营的 RTGS 系统**
- 大额（KES 100 万以上）银行间结算
- T+0 当日结算
- 主要服务：大额企业转账、银行间清算、政府支付

#### EFT / ACH

- **Automated Clearing House**：批量小额、低优先级
- T+1~2 到账
- 主要场景：工资发放、批量缴费

#### 支票（Cheque）

- 仍在使用但快速萎缩（年降幅 15%+）
- 通过 ACH 清算
- 政府/B2B 大额仍有保留

### 2.3 卡支付

| 类型 | 渗透率 | 主要发卡行 |
|------|--------|-----------|
| 借记卡 | ~15% | Equity, KCB, Co-op, Standard Chartered |
| 信用卡 | <5% | Equity, KCB, Standard Chartered, Stanbic |
| 预付卡 | <2% | 主要为 Visa/Mastercard 礼品卡、薪资卡 |

**特点：**
- Visa / Mastercard 主导，UnionPay 在中资场景使用
- 收单机构：**Equity Bank、KCB、Stanbic、I&M、Co-op**
- POS 收单费率：~3.5% MDR
- 电商卡支付占比仅 ~10%（其余 90% 走 M-Pesa）

### 2.4 QR 码支付

- **KE-QR Code Standard**：CBK 2023 年发布，由 KBA 协调
- **目标**：商户一码多端通用（M-Pesa / Airtel Money / 银行卡 / PesaLink 全部可扫）
- **现状**：推广中，规模化采用刚起步
- **挑战**：M-Pesa 的 Till Number 已根深蒂固，新标准需克服路径依赖

### 2.5 现金

仍占非正式经济（agriculture, informal trade）的大部分交易，但城市地区现金使用率快速下降，约 ~30%（2024）。

### 2.6 数字信贷

| 产品 | 运营方 | 性质 |
|------|--------|------|
| **Fuliza** | Safaricom + NCBA + KCB | M-Pesa 透支线 |
| **M-Shwari** | NCBA + Safaricom | 移动储蓄+贷款 |
| **KCB M-Pesa** | KCB + Safaricom | 银行+移动钱包联营 |
| **Hustler Fund** | 政府主导 | 国民数字小贷（年息 8%） |
| **Tala / Branch / Zenka** | 国际 Fintech | 移动消费贷 |

> **注**：CBK 2022 年起对数字信贷牌照（DCP, Digital Credit Provider）实施严格牌照管理，淘汰了大批掠夺性放贷机构。

---

## 三、跨境支付

### 3.1 跨境流入：侨汇（Remittance Inflow）

| 维度 | 数据 |
|------|------|
| 2024 年侨汇总额 | **~46 亿美元** |
| 占 GDP 比重 | ~3.9% |
| 主要来源国 | 美国（57%）、欧洲（17%）、海湾国家（沙特/卡塔尔/UAE 12%）、英国 |
| 增长率 | 年化 10-15% |

**主流通道：**

| 通道 | 市场份额（估）| 特点 |
|------|-------------|------|
| **银行电汇（SWIFT）** | ~30% | 大额、慢、贵（$25-50 + 中间行加点） |
| **国际汇款公司** | ~35% | Western Union, MoneyGram, Ria —— 现金/钱包到账 |
| **数字汇款（Wise / Remitly / WorldRemit / Sendwave）** | ~25% | 直接打到 M-Pesa，10 分钟到账 |
| **M-Pesa Global** | ~8% | Safaricom 跨境产品（接 PayPal/Wise/Western Union 等）|
| **加密货币** | ~2% | USDT/BTC OTC，灰色区域 |

**关键趋势：**
- 数字汇款占比快速上升（年增 20%+），SWIFT 银行电汇份额下降
- **M-Pesa 是事实上的"最后一公里"**：80%+ 的境外汇款最终落地到 M-Pesa
- WorldRemit / Wise / Remitly 等都通过 API 直接对接 M-Pesa

### 3.2 跨境流出（Outbound）

肯尼亚是**外汇管制国家**（Foreign Exchange Act），但相对宽松：

- 个人年度购汇额度：无明确硬上限，需提供用途证明
- 企业购汇：需贸易背景文件（Form M、Invoice、PO）
- 主要通道：商业银行 SWIFT、M-Pesa Global（小额）

### 3.3 区域跨境（东非共同体）

#### 东非支付互通

| 系统 | 说明 |
|------|------|
| **EAPS（East African Payments System）** | EAC 5 国（肯尼亚、坦桑尼亚、乌干达、卢旺达、布隆迪）央行 RTGS 互联，KES/TZS/UGX/RWF/BIF 直接清算 |
| **REPSS（COMESA RTGS）** | COMESA 21 国 RTGS 互联（含埃及、津巴布韦、苏丹等）|
| **M-Pesa 跨境** | 肯尼亚 ↔ 坦桑尼亚（Vodacom）/ 乌干达 / 卢旺达 / 刚果（金）/ 莫桑比克 |
| **Airtel Money 跨境** | 14 国互通（非洲泛区域） |

#### PAPSS（Pan-African Payment and Settlement System）

- **非洲进出口银行（Afreximbank）+ AfCFTA 主导**
- 目标：非洲国家间本币直接清算，绕开美元中转
- 肯尼亚 2023 年加入，CBK 是清算行
- 现状：**逐步上线，规模有限**，但战略意义重大

### 3.4 加密货币与跨境

- **CBK 立场**：曾长期警示，2023 年起转向**有限度接纳**
- **VASP Bill 2025**：通过虚拟资产服务提供商法案，要求 VASP 持牌运营
- **市场现状**：
  - 肯尼亚是非洲第 4 大加密市场（按交易量）
  - **稳定币（USDT/USDC）成为跨境支付灰色解决方案**
  - 主要场景：自由职业者收外汇、跨境贸易、对冲先令贬值
  - P2P 平台（Binance P2P, Paxful, Yellow Card）活跃

---

## 四、现状与痛点

### 4.1 优势

| 优势 | 说明 |
|------|------|
| ✅ 移动钱包基础设施成熟 | M-Pesa 覆盖 96% 成年人口，是全球标杆 |
| ✅ 监管开放、相对清晰 | CBK 是非洲监管最成熟的央行之一 |
| ✅ 创新生态活跃 | 内罗毕"Silicon Savannah" 是非洲金融科技中心 |
| ✅ 数字信贷成熟 | Fuliza/M-Shwari 已是国民产品 |
| ✅ 数字汇款最后一公里完善 | M-Pesa 直连全球主流汇款机构 |

### 4.2 痛点

| 痛点 | 说明 |
|------|------|
| ❌ M-Pesa 垄断，议价能力低 | Safaricom 收单费率约 1.5-2.5%，压缩商户利润 |
| ❌ 卡支付渗透率低 | 跨境电商、订阅经济卡支付不友好 |
| ❌ 银行 ↔ 移动钱包割裂 | 跨域转账有摩擦（费率/上限） |
| ❌ 移动钱包间互通体验仍不顺畅 | 虽有政策强制，但用户习惯局限于 M-Pesa |
| ❌ 跨境付款贵且慢 | SWIFT 仍是企业大额主流，成本高 |
| ❌ KE-QR 推广乏力 | 标准已立但生态推动慢 |
| ❌ 加密监管刚起步 | VASP Bill 2025 才落地，合规成本高 |

---

## 五、建设方向（Roadmap）

### 5.1 国家支付战略（NPS 2022-2025）

CBK 国家支付战略五大支柱：

| 支柱 | 关键举措 |
|------|---------|
| **1. Trust（信任）** | 加强消费者保护、争议处理、欺诈防控 |
| **2. Security（安全）** | 推动 ISO 20022、加密标准、网络安全 |
| **3. Usefulness（实用）** | 扩大金融普惠（农村/低收入人群） |
| **4. Choice（选择）** | 强制互通、降低锁定（移动钱包+银行+卡 互通）|
| **5. Innovation（创新）** | 监管沙盒、Open Banking、CBDC 探索 |

### 5.2 国家快速支付系统（FPS, Fast Payment System）

- **目标**：构建 24×7 实时、低成本、跨机构互通的国家支付基础设施
- **类比**：印度 UPI、巴西 PIX、新加坡 PayNow
- **现状**：CBK 主导设计，KBA + IPSL + Safaricom + 银行联合工作组
- **关键设计**：
  - 统一寻址（手机号/身份证/VPA）
  - 银行 + 移动钱包 + 第三方支付商一体接入
  - 实时清算 + 强制互通费率
- **预计上线**：2026-2027（已多次延期）

### 5.3 KE-QR 互通生态

- 推动所有商户采用统一 QR 码
- 一码扫遍 M-Pesa / Airtel Money / Visa / Mastercard / PesaLink
- 政府公共服务（税务、市政费）优先采用 KE-QR
- 与 ISO 20022 数据标准对齐

### 5.4 Open Banking

- **CBK 2023 年发布 Open Banking 概念框架**
- **目标**：账户信息共享 + 支付发起标准 API
- **进度**：行业咨询阶段，预计 2026-2027 落地试点
- **影响**：第三方支付/聚合支付商可绕开 M-Pesa 独家通道

### 5.5 央行数字货币（eShilling / CBDC）

- **CBK 2022 年发布 CBDC 讨论文件**
- **2023 年更新立场**：暂不急于推出 CBDC，认为 M-Pesa 已基本满足数字法币功能
- **方向**：观察其他国家（尼日利亚 eNaira / 巴哈马 Sand Dollar）经验后决策
- **可能性**：批发 CBDC（机构间清算）优先于零售 CBDC

### 5.6 加密资产监管

- **VASP Bill 2025**：定义 VASP 牌照（交易所、托管、钱包、OTC、稳定币发行）
- **监管机构**：CBK + Capital Markets Authority（CMA）联合监管
- **影响**：
  - 大型 CEX（Binance / Coinbase / Yellow Card）需申请本地牌照
  - 稳定币（USDT/USDC）发行/分发需合规
  - **OTC 跨境支付场景将受到合规挤压**

### 5.7 PAPSS / 区域整合

- 推动肯尼亚成为 PAPSS 东非清算枢纽
- EAC 央行联合推进 EAPS 升级
- 目标：非洲内部贸易结算"去美元化"

### 5.8 金融普惠 2.0

- Hustler Fund：国民数字小贷（已 1900 万用户参与）
- 农村金融服务延伸：通过移动钱包代理网络
- 妇女/青年专项金融产品

---

## 六、市场机会与切入策略

### 6.1 跨境支付机会

| 机会 | 说明 |
|------|------|
| 🌟 **侨汇最后一公里** | 接 M-Pesa API，做 USD/EUR/GBP → KES + 落地 M-Pesa |
| 🌟 **C2B 跨境收款** | 帮助海外电商收肯尼亚消费者的钱（M-Pesa Paybill）|
| 🌟 **B2B 贸易付款** | 帮中国/东南亚出口企业从肯尼亚收 USD（绕开 SWIFT 高成本）|
| 🌟 **加密 OnRamp/OffRamp** | 在 VASP Bill 框架下做合规加密-法币兑换 |
| 🌟 **EAC 跨境** | 肯尼亚为支点，辐射坦桑尼亚/乌干达/卢旺达 |

### 6.2 境内 PSP / 收单机会

| 机会 | 说明 |
|------|------|
| 中资商户收单 | 中国电商/品牌出海非洲，需要"懂中国+本地落地" |
| 跨境电商 PSP | 海外电商（Shein/AliExpress 模式）在肯尼亚收 M-Pesa |
| 订阅经济收单 | Netflix/Spotify 模式订阅在肯尼亚的支付方案（Recurring + 移动钱包）|
| 多渠道聚合 | 一个 API 同时打通 M-Pesa / Airtel Money / 卡 / Bank |

### 6.3 EX 平台切入点

EX 平台可作为**全球出海企业进入肯尼亚市场的跨境支付枢纽**：

| 切入点 | EX 能力对应 |
|--------|-----------|
| 跨境收款（USD → M-Pesa） | Payins + FX + 落地通道 SP |
| 跨境付款（USD → KES → 商户）| Payouts + FX + Wallet |
| C2B 收单 | Online Payment + M-Pesa Paybill |
| 商户结算（KES → USD 出境）| OffRamp / FX / Payouts |
| 加密通道（合规 USDT 中转）| OnRamp/OffRamp + VASP 合规 SP |
| 多 SP 路由 | 接入 M-Pesa Global / Airtel Money / 本地银行 SP |

### 6.4 风险与挑战

| 风险 | 应对 |
|------|------|
| Safaricom 强势议价 | 多 SP 备份（Airtel Money / 直连银行 / 聚合 PSP）|
| 外汇管制 | 严格贸易背景审核，与本地持牌机构合作 |
| 先令贬值 | 实时锁汇 / USDT 中转方案 |
| VASP 合规成本 | 与已持牌 SP 合作，避免自己申牌 |
| 数据本地化要求 | 部署本地数据节点，符合 DPA 2019 |

---

## 七、专题：M-Pesa × 支付宝/微信 跨境收单

### 7.1 合作背景

| 时间 | 事件 |
|------|------|
| 2018-09 | Safaricom 宣布与 **Alipay** 战略合作，肯尼亚部分商户接受支付宝扫码 |
| 2019 | 扩展到 **WeChat Pay** |
| 2020 后 | 由 **Alipay+** 接管对外合作（蚂蚁国际化支付网关） |
| 2023+ | 通过 **DPO Group / Cellulant / Flutterwave** 等本地聚合商规模化落地 |

> **核心场景**：**中国出境游客**到肯尼亚消费 — 单向流量，**不支持肯尼亚用户用支付宝/微信向中国付款**（受外汇/KYC 限制）。

### 7.2 技术架构：M-Pesa **不直连**支付宝/微信

关键认知：**Safaricom 与蚂蚁/腾讯之间没有直接清算管道**。中间必须有一个**持牌的跨境聚合商**作为"翻译+清算"中转方。

```
中国游客（CNY）          肯尼亚商户（KES, M-Pesa 收款）
    ↓                              ↑
[支付宝 App]                  [M-Pesa Till/Paybill]
    ↓                              ↑
[Alipay+ 网关]            [M-Pesa Daraja API (B2C)]
    ↓                              ↑
    └─── 跨境聚合商（DPO / Cellulant / Flutterwave）───┘
              · 收 Alipay+ 的 USD 结算
              · 在肯尼亚换汇 USD → KES
              · 调 M-Pesa B2C API 入账商户
```

### 7.3 各方角色

| 角色 | 典型机构 | 职责 |
|------|---------|------|
| **国际钱包网关** | Alipay+ / WeChat Cross-Border | 用户侧扫码、CNY 扣款、批量结算给中转方 |
| **本地跨境聚合商（持牌 PSP）** | DPO Group、Cellulant、Flutterwave、Pesapal | 接收 USD、换汇、通过 M-Pesa API 入账商户 |
| **结算银行** | HSBC、Citi、StanChart、Equity、NCBA | SWIFT 转账 + 本地换汇 |
| **M-Pesa（Safaricom）** | Daraja API | 最后一公里入账商户 |

### 7.4 收款流程（消费者扫码 → 商户到账）

```
① 游客打开支付宝 → 扫商户 QR 码（或商户扫游客付款码）
② 支付宝识别"境外商户"标签 → 路由到 Alipay+ 网关
③ Alipay+ 实时查 CNY→USD→KES 汇率，锁价
④ 用户确认金额（CNY 计价）→ 支付宝扣款（CNY）
⑤ Alipay+ 返回支付成功 → 商户 POS / M-Pesa 端立刻显示"已收款"（KES 计价）
   ⚠️ 此时商户 M-Pesa 账户**还没真实到账**，只是"信用确认"
⑥ T+1：Alipay+ 汇总当日肯尼亚商户应付 → SWIFT 打 USD 到中转方
⑦ T+1：中转方在肯尼亚银行收到 USD → 换汇 KES → 调 M-Pesa B2B/B2C API
⑧ T+1 ~ T+2：每个商户的 M-Pesa Till/Paybill 实际到账 KES
```

**关键细节**：

- **二维码**：早期靠 Alipay 生成"绑定 M-Pesa 商户号"的特殊 QR；2023 年起逐步对齐 **EMVCo QR / KE-QR** 标准
- **商户体验**：商户看到的是 KES 金额和实时确认，游客看到 CNY；**汇率锁定在扫码瞬间**，由 Alipay+ 承担瞬时汇率波动
- **风控**：Alipay+ 做用户侧 KYC + AML；DPO/Cellulant 做商户侧 KYB + 本地合规

### 7.5 三层清算实现

#### 层 1：用户侧（CNY 计价）

- 用户支付宝账户扣 100 CNY
- 支付宝按当日**支付宝公布汇率**计算 KES 等值（如 1 CNY ≈ 18 KES → 1800 KES）
- 用户看到 "100 CNY ≈ 1800 KES"，**汇率风险由蚂蚁承担**

#### 层 2：批发清算（CNY → USD → 跨境）

- Alipay+ 每天 T+1 汇总所有境外消费
- 在国内通过支付牌照（蚂蚁国际 / 支付宝海外）做 **CNY → USD 批发换汇**
- 通过 **SWIFT / CHATS** 把 USD 打到中转方（DPO）在境外银行（如 HSBC 新加坡）的账户
- 一次结算几百万美金，规模化摊薄单笔成本

#### 层 3：本地清算（USD → KES → M-Pesa）

- DPO 在肯尼亚 NCBA / Stanbic 等银行收到 USD
- 通过自有换汇额度做 **USD → KES**（DPO 是 CBK 持牌 PSP，有外汇额度）
- 调 **M-Pesa B2C API（Daraja）**：批量 Disbursement → 入账各商户 Till/Paybill
- M-Pesa 每笔向 DPO 收 ~KES 5-50 的 B2C 转账费

#### 三层费率分配

| 环节 | 收费方 | 费率 |
|------|--------|------|
| 用户侧（CNY → KES 汇率加点）| 支付宝 / Alipay+ | ~0.5-1% |
| 国际汇款（CNY → USD → SWIFT）| 蚂蚁国际 + 银行 | ~0.2-0.3%（批量摊薄）|
| 本地换汇（USD → KES）| DPO / Cellulant | ~0.3-0.5% |
| M-Pesa B2C 入账 | Safaricom | KES 5-50/笔 或 ~0.1% |
| **商户实收** | — | **~97-98%** |

### 7.6 资金时序

```
T0     游客扫码 → Alipay+ 实时确认 → 商户 POS 显示成功
       （信用确认，钱仍在 Alipay+ 池子）

T+1 09:00  Alipay+ 汇总昨日肯尼亚商户应付
T+1 11:00  CNY → USD 批发换汇（蚂蚁国际境外资金池）
T+1 12:00  SWIFT 打款到 DPO 境外账户（HSBC 新加坡）

T+1 15:00  DPO 收 USD → 在 NCBA 换汇 KES
T+1 17:00  DPO 调 M-Pesa B2C API 批量入账

T+2 上午    商户 M-Pesa 实际到账（结算完成）
```

### 7.7 为什么不是"M-Pesa 直连支付宝/微信"？

| 障碍 | 说明 |
|------|------|
| **外汇管制** | Safaricom 非持牌外汇换汇商，无法直接收 USD/CNY |
| **合规牌照** | CBK 要求跨境收单必须由持牌 PSP（DPO/Cellulant）执行 KYB + AML |
| **汇率风险** | 蚂蚁/腾讯不愿承担直接对接的汇率波动，需中转方做日终对账 |
| **技术标准** | M-Pesa Daraja API 是 B2C 入账风格，不是收单 API；支付宝/微信侧需要"实时收单+异步清算"模式 |
| **责任划分** | 出现争议时，**商户 → DPO → Alipay+ → 用户**，需中转方做风险隔离 |

### 7.8 最新趋势

| 方向 | 说明 |
|------|------|
| **Alipay+ 标准化** | 2023+ Alipay+ 把"东南亚 + 非洲"对接统一到一个 SDK，肯尼亚商户接入 = 同时接入 10+ 亚洲钱包（GCash / Touch n Go / Kakao Pay 等）|
| **KE-QR 互通** | CBK 推 KE-QR Standard，未来 Alipay+/WeChat 可直接扫，无需特殊集成 |
| **PAPSS 衔接** | 远期可能通过 PAPSS 实现非洲↔亚洲钱包直接清算，绕开 USD 中转 |
| **稳定币替代** | 部分小型 PSP 用 USDT 替代 USD 做 SWIFT 中段，T+0 到账、成本降 60% — 但 VASP 合规仍受限 |

### 7.9 对 EX 平台的启示

如果 EX 要做类似"中国钱包 → 肯尼亚 M-Pesa"的跨境收单，需要的能力：

| 能力 | EX 需要建/购买 |
|------|--------------|
| 国际钱包接入 | 接 **Alipay+ / WeChat Cross-Border** SDK（蚂蚁/腾讯白名单准入）|
| 本地落地通道 | 接 **DPO Group / Cellulant** 等 SP，或自己拿肯尼亚 PSP 牌照 |
| 换汇 | CNY/USD/KES 三段换汇能力，或与蚂蚁国际/HSBC 合作 |
| 商户 Onboarding | 商户填写 M-Pesa Till/Paybill → EX 帮配置到落地通道后台 |
| 三方对账 | Alipay+ 流水 ↔ 中转方流水 ↔ M-Pesa 到账 三方对齐 |
| 资金归集 | EX Treasury 中心统一清算，给商户提供合并报表 |

---

## 八、参考资料与数据来源

- Central Bank of Kenya (CBK) — 年度报告、季度数据
- Communications Authority of Kenya (CA) — 移动支付季报
- Safaricom 年报（FY2024）
- World Bank Remittance Data 2024
- KPMG / EY / GSMA — 非洲移动支付报告
- Chainalysis Geography of Crypto 2024
- AfDB / Afreximbank PAPSS 报告
- Alipay+ / Ant International 公开资料
- DPO Group / Cellulant / Flutterwave 官方文档

---

## 附：关键术语对照

| 中文 | 英文 | 说明 |
|------|------|------|
| 央行 | CBK (Central Bank of Kenya) | 监管机构 |
| 银行家协会 | KBA (Kenya Bankers Association) | 推动 PesaLink/KE-QR |
| 移动钱包 | Mobile Money / MMO | M-Pesa 等 |
| 商户收款（账单类）| Paybill | M-Pesa 商户编号 |
| 商户收款（POS 类）| Till Number / Buy Goods | M-Pesa 实体收款 |
| 银行间实时转账 | PesaLink | KBA/IPSL 运营 |
| 大额清算 | KEPSS (RTGS) | CBK 运营 |
| 东非支付 | EAPS | EAC 5 国 RTGS 互联 |
| 非洲跨境清算 | PAPSS | Afreximbank 主导 |
| 国家支付战略 | NPS 2022-2025 | CBK 五大支柱 |
| 快速支付系统 | FPS / NFPS | 类印度 UPI |
| 虚拟资产服务商 | VASP | 加密牌照 |
| 数字信贷牌照 | DCP (Digital Credit Provider) | CBK 监管 |

---

> **结论**：肯尼亚是**移动钱包驱动型**的成熟数字支付市场，M-Pesa 是绕不过的核心基础设施。市场机会主要在 **跨境最后一公里**、**多渠道聚合**、**合规加密通道** 三个方向。EX 平台进入肯尼亚的最佳路径是 **API 聚合 + 持牌 SP 合作 + M-Pesa 深度集成**。
