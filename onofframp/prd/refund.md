# 退款流程 v3.0

## 文档概述

本文档描述EX平台所有退款场景的详细流程。

**核心设计原则：**

- **商户端一致性**：商户只看到1笔退款商户单 + 1笔账户/钱包流水，内部多笔交易单是内部记账，商户不可见
- **退票 = 新渠道单**：渠道退票时生成一笔新的退款渠道单，关联原渠道单（原渠道单状态已结束）
- **清算先行**：涉及手续费退还的退款，先由清算处理完再执行退款
- **退款不再收承兑手续费**：承兑后付款失败退回数币钱包时，不再收承兑手续费；但默认付款手续费不退

**商户退款配置（承兑相关）：**

商户需配置退款时的汇率规则，决定承兑后付款失败时退回数币还是法币：

```
退款汇率规则算法（Off-Ramp退款：原交易 USDT→USD，付款失败需退回）：

输入：
  original_rate = 原交易时 1 USDT 的 USD 价格
  realtime_rate = 退款时 1 USDT 的 USD 价格
  refund_usd    = 需退回的 USD 金额
  threshold     = 商户配置的容忍阈值（默认1%）

判断逻辑：
  diff = (realtime_rate - original_rate) / original_rate

  情况1: realtime_rate ≤ original_rate（USDT贬值，同样USD能买回更多USDT，BB不亏）
    → 按实时汇率退回数币钱包：退回 refund_usd / realtime_rate 个 USDT
  
  情况2: diff ≤ threshold（USDT小幅升值，BB小亏≤阈值，可接受）
    → 按原汇率退回数币钱包：退回 refund_usd / original_rate 个 USDT
  
  情况3: diff > threshold（USDT大幅升值，BB亏损超阈值）
    → 退回到法币账户（不做反向承兑，避免BB大亏）

总结：只要BB不亏或小亏，就退回数币钱包；BB亏太多就退法币账户。
```

---

## 目录

1. [充币退款](#1-充币退款)
   - 1.1 [渠道拦截未入账](#11-渠道拦截未入账)
   - 1.2 [渠道已入账，风控拦截未给商户入账](#12-渠道已入账风控拦截未给商户入账)
2. [VA收款退款](#2-va收款退款)
   - 2.1 [渠道直接拒绝](#21-渠道直接拒绝)
   - 2.2 [渠道已通知，内部风控拦截](#22-渠道已通知内部风控拦截)
3. [提币失败退款](#3-提币失败退款)
   - 3.1 [内部风控拦截](#31-内部风控拦截)
   - 3.2 [渠道退票](#32-渠道退票)
4. [付款失败退款](#4-付款失败退款)
   - 4.1 [内部风控拦截](#41-内部风控拦截)
   - 4.2 [渠道退票](#42-渠道退票)
5. [承兑后付款失败退款](#5-承兑后付款失败退款)
   - 5.1 [BB数币钱包直接Off-Ramp（模式A）](#51-bb数币钱包直接off-ramp模式a)
   - 5.2 [BB先承兑到法币账户再出款（模式A）](#52-bb先承兑到法币账户再出款模式a)
   - 5.3 [XPAY渠道（同BB模式A）](#53-xpay渠道同bb模式a)
   - 5.4 [IPL-BB打通模式：BB数币钱包直接Off-Ramp（模式B）](#54-ipl-bb打通模式bb数币钱包直接off-ramp模式b)
   - 5.5 [IPL-BB打通模式：商户先承兑到IPL法币再出款（模式B）](#55-ipl-bb打通模式商户先承兑到ipl法币再出款模式b)
6. [退款汇总表](#6-退款汇总表)

---

## 1. 充币退款

### 1.1 渠道拦截未入账

**场景：** 链上充币时，渠道风控拦截，币未入到商户账户。

**处理方式：** 合规收到邮件，直接在渠道后台操作退回。

**两种退回方式：**

| 退回方式 | 流程 | 要求 | 时效 |
| --- | --- | --- | --- |
| **原地址退** | 合规在渠道后台直接退回原地址 | 无额外要求 | 当天 |
| **新地址退** | 销售联系商户提供新地址 | 需KYT检查 + 保留7天观察期 | 7天 |

**单据：** 无商户单/交易单产生（渠道层直接退回，仅有渠道单记录）

```mermaid
sequenceDiagram
    participant Sender as 发送方
    participant Channel as 链上渠道
    participant CO as 渠道服务
    participant Compliance as 合规
    participant Sales as 销售

    Sender->>Channel: 0. 链上转入USDT
    Channel->>Channel: 1. 渠道风控拦截（未入账）
    Channel->>CO: 2. 通知拦截
    CO->>CO: 3. 创建渠道单(INTERCEPTED)
    CO->>Compliance: 4. 通知合规

    alt 原地址退
        Compliance->>Channel: 5a. 在渠道后台退回原地址
        Channel->>Sender: 6a. USDT退回原地址
        CO->>CO: 7a. 更新渠道单(REFUNDED)
    else 新地址退
        Compliance->>Sales: 5b. 联系销售获取新地址
        Sales-->>Compliance: 6b. 提供新地址
        Compliance->>Compliance: 7b. KYT检查新地址
        Note over Compliance: 保留7天观察期
        Compliance->>Channel: 8b. 7天后在渠道后台退回新地址
        Channel-->>CO: 9b. 退回成功
        CO->>CO: 10b. 更新渠道单(REFUNDED)
    end
```

---

### 1.2 渠道已入账，风控拦截未给商户入账

**场景：** 渠道已入账（产生渠道单），但内部风控/合规拦截，未给商户钱包入账。

**处理方式：** 生成退款单，商户可选择退回地址。

**两种退回方式：**

| 退回方式 | 流程 | 收费 | 时效 |
| --- | --- | --- | --- |
| **原地址退** | 商户选择原地址，直接退回 | 不收费 | 当天 |
| **新地址退** | 商户添加新地址，走**提币流程**（交易类型=退款） | 清算处理手续费后退款 | 风控拦截7天处理 |

**新地址退的关键设计：**

- 交易类型 = 退款（不是普通提币），但流程复用提币流程
- 清算先处理：确认是否收手续费、扣完费后再退
- 风控审核：新地址需KYT检查，拦截后7天处理
- 商户不自己发起提币（因为涉及收费问题，由清算统一处理）

**单据结构：**

```
退款商户单 RM001 (充币退款)  ← 商户可见，只看到1笔
    └── 退款交易单 RT001 (BB): 退款提币 — 退回到原地址/新地址
            └── 退款渠道单 RC001: 链上转账退回（关联原渠道单）
```

```mermaid
sequenceDiagram
    participant MP as 商户(MP)
    participant HUB as EX HUB
    participant Settlement as 清算
    participant Compliance as 合规
    participant TE as 交易引擎
    participant Account as BB账户服务
    participant CO as 渠道服务
    participant Channel as 链上渠道

    Note over MP,Channel: 前提：渠道已入账，风控拦截，商户钱包冻结状态

    rect rgb(240, 248, 255)
        Note over MP,Channel: 阶段1：商户选择退回方式
        HUB->>MP: 1. 通知：充币被风控拦截，请选择退回方式
        MP->>HUB: 2. 选择退回地址（原地址 或 添加新地址）
        HUB->>HUB: 3. 创建退款商户单 RM001
    end

    rect rgb(255, 250, 240)
        Note over MP,Channel: 阶段2：清算处理
        HUB->>Settlement: 4. 提交清算审核
        Settlement->>Settlement: 5. 确认手续费（原地址不收/新地址是否收）
        Settlement-->>HUB: 6. 清算确认（退款金额）
    end

    rect rgb(255, 245, 238)
        Note over MP,Channel: 阶段3：合规审核
        HUB->>Compliance: 7. 提交合规审核
        alt 新地址
            Compliance->>Compliance: 8. KYT检查新地址
            Note over Compliance: 风控拦截，7天处理期
        end
        Compliance-->>HUB: 9. 合规通过
    end

    rect rgb(240, 255, 240)
        Note over MP,Channel: 阶段4：执行退款
        HUB->>TE: 10. 执行退款
        TE->>TE: 11. 创建退款交易单 RT001
        TE->>Account: 12. 解冻并扣款(商户USDT钱包-)
        TE->>CO: 13. 创建退款渠道单 RC001（关联原渠道单）
        CO->>Channel: 14. 链上转账到目标地址
        Channel-->>CO: 15. 转账成功
        CO-->>TE: 16. RC001状态=SUCCESS
        TE->>TE: 17. RT001状态=SUCCESS
    end

    rect rgb(255, 250, 240)
        Note over MP,Channel: 阶段5：聚合+通知
        TE->>HUB: 18. 通知退款完成
        HUB->>HUB: 19. RM001状态=SUCCESS
        HUB-->>MP: 20. 退款通知(Webhook)
        Note over MP: 商户只看到1笔退款单 + 1笔钱包流水
    end
```

**说明：**

- **商户只看到1笔退款单**：退款商户单RM001，钱包流水只有1笔扣款
- **退款渠道单是新单**：RC001是新创建的退款渠道单，关联原充币渠道单
- **新地址退 = 提币流程**：复用提币的风控/渠道调用，但交易类型标记为"退款"
- **清算先行**：清算确认手续费后才执行退款

---

## 2. VA收款退款

### 2.1 渠道直接拒绝

**场景：** VA收款时渠道直接拒绝，未入账。

**处理方式：** 通知风控合规，风控直接在渠道处理。

**单据：** 仅渠道单(INTERCEPTED)，无商户单/交易单。

```mermaid
sequenceDiagram
    participant Remitter as 汇款人
    participant Channel as 渠道/银行
    participant CO as 渠道服务
    participant Compliance as 合规/风控

    Remitter->>Channel: 0. 汇款到VA
    Channel->>Channel: 1. 渠道拒绝（未入账）
    Channel->>CO: 2. 通知拒绝
    CO->>CO: 3. 创建渠道单(INTERCEPTED)
    CO->>Compliance: 4. 通知风控合规
    Compliance->>Channel: 5. 在渠道后台处理退回
    Channel->>Remitter: 6. 退回原汇款人
    CO->>CO: 7. 更新渠道单(REFUNDED)
```

---

### 2.2 渠道已通知，内部风控拦截

**场景：** 渠道通知入账（产生渠道单），但内部风控拦截，产生退款单。

**处理方式：** 参考IPL现有流程 — 联系销售确认退回方式（原路退/退到新人），清算确认手续费，合规审核后退款。

**流程：** 清算处理 → 合规审核 → 执行退款

| 确认项 | 由谁确认 | 说明 |
| --- | --- | --- |
| 原路退还 vs 退到新人 | 销售联系商户 | 退到新人需提供收款信息 |
| 手续费是否退 / 是否额外收费 | 清算 | 清算线下确认 |
| 合规审核 | 合规 | 审核退款合规性 |

```mermaid
sequenceDiagram
    participant Remitter as 汇款人
    participant Channel as 渠道/银行
    participant CO as 渠道服务
    participant TE as 交易引擎
    participant Account as 账户服务
    participant Sales as 销售
    participant Settlement as 清算
    participant Compliance as 合规
    participant HUB as EX HUB
    participant MP as 商户

    Remitter->>Channel: 0. 汇款到VA
    Channel->>CO: 1. 入账通知
    CO->>CO: 2. 创建渠道单(SUCCESS)
    CO->>TE: 3. 创建交易单
    TE->>Compliance: 4. 风控检查
    Compliance-->>TE: 5. 风控拦截
    TE->>Account: 6. 入账但冻结

    rect rgb(255, 250, 240)
        Note over Remitter,MP: 阶段1：销售确认退回方式
        Compliance->>Sales: 7. 通知销售：风控拦截需退回
        Sales->>MP: 8. 联系商户确认退回方式
        MP-->>Sales: 9. 确认（原路退 或 退到新收款人）
    end

    rect rgb(240, 248, 255)
        Note over Remitter,MP: 阶段2：清算处理
        Sales->>Settlement: 10. 提交清算
        Settlement->>Settlement: 11. 确认手续费（是否退/是否额外收）
        Settlement-->>Sales: 12. 清算确认（退款金额）
    end

    rect rgb(255, 245, 238)
        Note over Remitter,MP: 阶段3：合规审核
        Settlement->>Compliance: 13. 提交合规审核
        Compliance->>Compliance: 14. 审核退款合规性
        Compliance-->>HUB: 15. 合规通过
    end

    rect rgb(240, 255, 240)
        Note over Remitter,MP: 阶段4：执行退款
        HUB->>HUB: 16. 创建退款商户单
        HUB->>TE: 17. 创建退款交易单
        TE->>Account: 18. 解冻并扣款(商户法币账户-)
        TE->>CO: 19. 创建退款渠道单（关联原渠道单）
        CO->>Channel: 20. 调用渠道退款
        Channel->>Remitter: 21. 退款到账
        Channel-->>CO: 22. 退款成功
        TE->>TE: 23. 退款交易单=SUCCESS
        HUB->>HUB: 24. 退款商户单=SUCCESS
        HUB-->>MP: 25. 退款通知
    end
```

---

## 3. 提币失败退款

### 3.1 内部风控拦截

**场景：** 提币时内部风控拦截，未送到渠道。

**处理方式：** 直接退回商户数币钱包（解冻）。

**收费：** 不收费。

```mermaid
sequenceDiagram
    participant TE as 交易引擎
    participant Risk as 风控
    participant Account as BB账户服务
    participant HUB as EX HUB
    participant MP as 商户

    Note over TE,MP: 商户发起提币，USDT已冻结

    TE->>Risk: 1. 风控检查
    Risk-->>TE: 2. 风控拒绝
    TE->>Account: 3. 解冻(商户USDT钱包)
    TE->>TE: 4. 交易单状态=FAILED
    TE->>HUB: 5. 通知失败
    HUB->>HUB: 6. 商户单状态=FAILED
    HUB-->>MP: 7. 失败通知
    Note over MP: 商户钱包余额恢复，无额外流水
```

---

### 3.2 渠道退票

**场景：** 提币已送到渠道，渠道处理后退回（退票）。

**处理方式：**
1. 渠道发退票通知 → 生成**新的退款渠道单**（关联原渠道单）
2. 通知清算 → 清算线下确认退款金额（可能扣手续费）
3. 清算处理完 → 在原商户单下创建退款交易单 → 退回商户数币钱包

**单据层级：**

```
原商户单 M001 (提币)
    ├── 原交易单 T001 (BB): 提币 — 状态=SUCCESS（已完成）
    │       └── 原渠道单 C001: 链上转账 — 状态=SUCCESS（已完成）
    │
    └── 退款交易单 RT001 (BB): 退票退回 — 退回商户钱包
            └── 退款渠道单 RC001: 退票入账（新单，关联C001）
```

```mermaid
sequenceDiagram
    participant Channel as 链上渠道
    participant CO as 渠道服务
    participant Settlement as 清算
    participant TE as 交易引擎
    participant Account as BB账户服务
    participant HUB as EX HUB
    participant MP as 商户

    Channel->>CO: 1. 退票通知（原交易被退回）
    CO->>CO: 2. 创建退款渠道单 RC001（关联原渠道单C001）

    rect rgb(255, 250, 240)
        Note over Channel,MP: 阶段1：清算线下处理
        CO->>Settlement: 3. 通知清算：渠道退票
        Settlement->>Settlement: 4. 线下确认退款金额（是否扣手续费）
        Settlement-->>TE: 5. 清算确认（实际退款金额）
    end

    rect rgb(240, 255, 240)
        Note over Channel,MP: 阶段2：创建退款单+退回商户
        TE->>TE: 6. 在原商户单M001下创建退款交易单RT001
        TE->>TE: 7. RT001关联RC001
        TE->>Account: 8. 入账(商户USDT钱包+, 清算确认的退款金额)
        Account-->>TE: 9. 入账成功
        TE->>TE: 10. RT001状态=SUCCESS
    end

    rect rgb(255, 250, 240)
        Note over Channel,MP: 阶段3：更新状态+通知
        TE->>HUB: 11. 通知退款完成
        HUB->>HUB: 12. 更新原商户单M001状态=REFUNDED
        HUB-->>MP: 13. 退款通知
        Note over MP: 商户看到原提币单变为"已退款"<br/>钱包流水只有1笔退款入账
    end
```

**说明：**

- **退款渠道单是新单**：RC001是新创建的，关联原渠道单C001，原C001状态不变（已SUCCESS）
- **退款交易单挂在原商户单下**：商户看到的是原提币商户单状态变为REFUNDED
- **清算先行**：清算线下确认退款金额后才执行退回
- **商户只看到1笔流水**：钱包流水只有1笔退款入账

---

## 4. 付款失败退款

> 参考提币流程，逻辑相同。

### 4.1 内部风控拦截

**场景：** 法币付款时内部风控拦截，未送到渠道。

**处理方式：** 直接退回商户法币账户（解冻）。不收费。

流程与 [3.1 提币风控拦截](#31-内部风控拦截) 相同，区别：退回到法币账户而非数币钱包。

---

### 4.2 渠道退票

**场景：** 付款已送到渠道，渠道退票（银行拒绝/退汇等）。

**处理方式：** 与 [3.2 提币渠道退票](#32-渠道退票) 相同：

1. 渠道退票通知 → 生成**新的退款渠道单**（关联原渠道单）
2. 通知清算 → 清算线下确认退款金额
3. 在原商户单下创建退款交易单 → 退回商户法币账户

**单据层级：**

```
原商户单 M001 (付款)
    ├── 原交易单 T001: 付款 — 状态=SUCCESS
    │       └── 原渠道单 C001 — 状态=SUCCESS
    │
    └── 退款交易单 RT001: 退票退回 — 退回商户法币账户
            └── 退款渠道单 RC001（新单，关联C001）
```

---

## 5. 承兑后付款失败退款

> 这是最复杂的退款场景。商户先做了承兑（数币→法币），然后付款失败，需要退回。
> 核心问题：退回数币还是法币？用什么汇率？

### 商户退款配置

每个商户需要在产品配置中设置退款汇率规则：

| 配置项 | 默认值 | 说明 |
| --- | --- | --- |
| `refund_rate_mode` | `smart` | `smart`=智能判断 / `original`=始终按原汇率 / `realtime`=始终按实时汇率 |
| `refund_rate_threshold` | `1%` | smart模式下的容忍阈值 |
| `refund_fee_policy` | `no_refund` | 付款手续费：`no_refund`=不退 / `refund`=退回 |

**smart模式算法（默认）：**

```
Off-Ramp退款（原交易 USDT→USD，付款失败退回）：
  original_rate = 原交易时 1 USDT = X USD
  realtime_rate = 退款时 1 USDT = Y USD

  如果 Y ≤ X（USDT贬值，BB不亏）：
    → 按实时汇率退回 refund_usd / Y 个USDT 到数币钱包 ✅
  如果 Y > X 且 (Y-X)/X ≤ 1%（BB小亏≤1%）：
    → 按原汇率退回 refund_usd / X 个USDT 到数币钱包 ✅
  如果 Y > X 且 (Y-X)/X > 1%（BB亏损超阈值）：
    → 退回 refund_usd 到法币账户（不做反向承兑）⚠️
```

**通用规则：**
- 退回数币钱包时，**不再收承兑手续费**
- **默认付款手续费不退**（特殊情况需走清算特殊流程）

---

### 5.1 BB数币钱包直接Off-Ramp（模式A）

**场景：** 商户从BB数币钱包直接Off-Ramp（on-offramp.md 1.4场景），承兑USDT→USD后通过BB/XPAY付款，付款失败。

**退回目标：** 退回到BB数币钱包（根据汇率规则，可能退到法币账户）。

**单据结构：**

```
原商户单 M001 (Off-Ramp: USDT→USD→付款)
    ├── 原交易单 T001 (BB): 承兑 USDT→USD — SUCCESS
    ├── 原交易单 T002 (BB): 付款 — FAILED/退票
    │       └── 原渠道单 C001 — SUCCESS→退票
    │
    └── 退款交易单 RT001 (BB): 反向承兑退回 — USD→USDT退回数币钱包
            └── 退款渠道单 RC001（如退票场景，新单关联C001）

商户可见：原商户单M001状态=REFUNDED，钱包流水只有1笔退款入账
内部记账：RT001记录反向承兑汇率、退款USDT金额
```

```mermaid
sequenceDiagram
    participant Channel as BB/XPAY渠道
    participant CO as 渠道服务
    participant Settlement as 清算
    participant TE as 交易引擎
    participant FX as 汇率服务
    participant Account as BB账户服务
    participant HUB as EX HUB
    participant MP as 商户

    Note over Channel,MP: T001承兑已成功(USDT→USD)，T002付款失败/退票

    alt 风控拦截（未送渠道）
        TE->>TE: 1a. T002状态=FAILED
    else 渠道退票
        Channel->>CO: 1b. 退票通知
        CO->>CO: 2b. 创建退款渠道单RC001（关联原C001）
        CO->>Settlement: 3b. 通知清算
        Settlement->>Settlement: 4b. 确认退款金额
        Settlement-->>TE: 5b. 清算确认
    end

    rect rgb(240, 255, 240)
        Note over Channel,MP: 退款处理：读取商户退款配置
        TE->>TE: 6. 读取商户退款配置(refund_rate_mode)
        TE->>FX: 7. 查询实时汇率
        FX-->>TE: 8. 返回 realtime_rate

        alt 退回数币钱包（BB不亏或小亏）
            TE->>TE: 9a. 计算退款USDT金额（按smart算法）
            TE->>TE: 10a. 创建退款交易单RT001(反向承兑退回)
            TE->>Account: 11a. 扣款(商户BB USD账户-)
            TE->>Account: 12a. 入账(商户BB USDT钱包+)
            Note over TE: 不收承兑手续费
        else 退回法币账户（BB亏损超阈值）
            TE->>TE: 9b. 创建退款交易单RT001(法币退回)
            TE->>Account: 10b. 退回(商户BB USD账户，金额不变)
            Note over TE: 不做反向承兑，USD留在法币账户
        end
        TE->>TE: 13. RT001状态=SUCCESS
    end

    rect rgb(255, 250, 240)
        Note over Channel,MP: 聚合+通知
        TE->>HUB: 14. 通知退款完成
        HUB->>HUB: 15. M001状态=REFUNDED
        HUB-->>MP: 16. 退款通知
        Note over MP: 商户只看到1笔退款单<br/>账户/钱包流水只有1笔
    end
```

**说明：**

- **商户只看到1笔退款**：M001状态变为REFUNDED，钱包/账户流水只有1笔
- **不收承兑手续费**：退回数币钱包时的反向承兑不收费
- **默认付款手续费不退**：如需退回，走清算特殊流程
- **内部RT001记录**：反向承兑汇率、原汇率、退款金额等，内部记账用

---

### 5.2 BB先承兑到法币账户再出款（模式A）

**场景：** 商户先做了BB承兑（on-offramp.md 1.3场景，USDT→USD到BB法币账户），然后从法币账户发起付款，付款失败。

**退回目标：** 退回到BB法币账户（不做反向承兑）。

**原因：** 承兑和付款是两个独立的商户单，付款失败只退付款部分，退回法币账户即可。商户如需换回数币，自行发起On-Ramp。

**单据结构：**

```
原付款商户单 M002 (付款: USD→收款人)  ← 与承兑商户单M001无关
    ├── 原交易单 T001: 付款 — FAILED/退票
    │       └── 原渠道单 C001
    │
    └── 退款交易单 RT001: 退回法币账户
            └── 退款渠道单 RC001（如退票，新单关联C001）
```

**处理方式：** 与 [4. 付款失败退款](#4-付款失败退款) 完全相同，退回到BB法币账户。

- **默认付款手续费不退**，特殊情况走清算流程
- 商户如需换回USDT，自行发起承兑（on-offramp.md 1.1场景）

---

### 5.3 XPAY渠道（同BB模式A）

**说明：** XPAY是BB的下发通道之一，与BB自己的通道逻辑完全相同。

- BB有2个下发通道：BB自己 + XPAY
- 退款流程与 [5.1](#51-bb数币钱包直接off-ramp模式a) / [5.2](#52-bb先承兑到法币账户再出款模式a) 完全一致
- 区别仅在渠道单调用的是XPAY渠道

---

### 5.4 IPL-BB打通模式：BB数币钱包直接Off-Ramp（模式B）

**场景：** 商户从BB数币钱包直接Off-Ramp通过IPL付款（on-offramp.md 2.4场景），IPL付款失败，需退回到BB数币钱包。

**这是最复杂的退款场景**，涉及跨SP逆向资金流：

```
原交易资金流（正向）：
BB USDT钱包 → 中间户 → 商户IPL USD → 外部收款人
  (T001)      (T002)      (T003: 失败)

退款资金流（逆向）：
外部收款人退回 → 商户IPL USD → 中间户 → BB USD → BB USDT钱包
               (RT001: IPL退款)  (RT002: IPL→BB)  (RT003: 反向承兑)
```

**单据结构（商户只看到1笔退款）：**

```
原商户单 M001 (Off-Ramp: BB USDT→IPL USD→付款)
    ├── 原T001 (BB): 承兑+划转 — SUCCESS
    ├── 原T002 (IPL): 同名收款 — SUCCESS
    ├── 原T003 (IPL): 付款 — FAILED/退票
    │       └── 原渠道单 C001
    │
    ├── RT001 (IPL): 付款退款 — 退回商户IPL USD账户 [内部记账]
    ├── RT002 (IPL→BB): 入账退款 — 中间户退回到BB [内部记账]
    └── RT003 (BB): 反向承兑 — USD→USDT退回数币钱包 [内部记账]
            └── RC001: 退款渠道单（如退票，新单关联C001）

商户可见：M001状态=REFUNDED，BB USDT钱包流水只有1笔退款入账
内部记账：RT001+RT002+RT003各自独立，但商户不可见
```

```mermaid
sequenceDiagram
    participant Channel as 渠道/银行
    participant CO as 渠道服务
    participant Settlement as 清算
    participant TE as 交易引擎
    participant FX as 汇率服务
    participant IPL_Account as IPL账户服务
    participant BB_Account as BB账户服务
    participant HUB as EX HUB
    participant MP as 商户

    Note over Channel,MP: 原T001承兑+T002入账已成功，T003 IPL付款失败/退票

    alt 风控拦截
        TE->>TE: 1a. T003状态=FAILED
    else 渠道退票
        Channel->>CO: 1b. 退票通知
        CO->>CO: 2b. 创建退款渠道单RC001（关联原C001）
        CO->>Settlement: 3b. 通知清算
        Settlement->>Settlement: 4b. 确认退款金额
        Settlement-->>TE: 5b. 清算确认
    end

    rect rgb(240, 255, 240)
        Note over Channel,MP: ══ RT001: IPL付款退款（退回商户IPL USD）══
        TE->>TE: 6. 创建RT001(IPL付款退款)
        TE->>IPL_Account: 7. 入账(商户IPL USD账户+)
        TE->>TE: 8. RT001=SUCCESS [内部记账]
    end

    rect rgb(230, 240, 255)
        Note over Channel,MP: ══ RT002: IPL入账退款（中间户退回BB）══
        TE->>TE: 9. 创建RT002(IPL→BB退回)
        TE->>IPL_Account: 10. 扣款(商户IPL USD- → BB中间户(在IPL)+)
        TE->>BB_Account: 11. 扣款(IPL中间户(在BB)- → 商户BB USD+)
        TE->>TE: 12. RT002=SUCCESS [内部记账]
    end

    rect rgb(255, 240, 245)
        Note over Channel,MP: ══ RT003: 反向承兑退回数币钱包 ══
        TE->>TE: 13. 读取商户退款配置
        TE->>FX: 14. 查询实时汇率
        FX-->>TE: 15. 返回汇率

        alt 退回数币钱包（BB不亏或小亏）
            TE->>TE: 16a. 创建RT003(反向承兑)
            TE->>BB_Account: 17a. 扣款(商户BB USD-)
            TE->>BB_Account: 18a. 入账(商户BB USDT钱包+)
            Note over TE: 不收承兑手续费
        else 退回法币账户
            TE->>TE: 16b. 创建RT003(法币退回)
            Note over TE: USD留在BB法币账户，不做反向承兑
        end
        TE->>TE: 19. RT003=SUCCESS [内部记账]
    end

    rect rgb(255, 250, 240)
        Note over Channel,MP: 聚合+通知
        TE->>HUB: 20. 通知退款完成
        HUB->>HUB: 21. M001状态=REFUNDED
        HUB-->>MP: 22. 退款通知
        Note over MP: 商户只看到1笔退款<br/>BB USDT钱包流水只有1笔入账
    end
```

**说明：**

- **商户只看到1笔退款**：M001状态=REFUNDED，钱包流水只有1笔
- **内部3笔退款交易单**：RT001(IPL付款退款) + RT002(IPL→BB中间户退回) + RT003(反向承兑)，全部内部记账
- **IPL侧有1笔付款退款交易**：RT001退回商户IPL USD账户
- **IPL侧有1笔入账退款**：RT002产生退款单，通过中间户退回BB
- **BB侧有1笔反向承兑**：RT003根据汇率规则决定退数币还是法币
- **不收承兑手续费**：反向承兑退回不收费
- **默认付款手续费不退**

---

### 5.5 IPL-BB打通模式：商户先承兑到IPL法币再出款（模式B）

**场景：** 商户先做了BB→IPL承兑（on-offramp.md 2.3场景，BB USDT→IPL USD），然后从IPL法币账户发起付款，付款失败。

**退回目标：** 退回到IPL法币账户（不做反向承兑）。

**原因：** 承兑和付款是两个独立的商户单，付款失败只退付款部分。商户如需换回数币，自行发起On-Ramp（on-offramp.md 2.1场景）。

**处理方式：** 与 [4. 付款失败退款](#4-付款失败退款) 相同，退回到IPL法币账户。

```
原付款商户单 M002 (IPL付款: USD→收款人)
    ├── 原交易单 T001 (IPL): 付款 — FAILED/退票
    └── 退款交易单 RT001 (IPL): 退回IPL法币账户
```

- **默认付款手续费不退**
- 商户如需换回USDT，自行发起承兑

---

## 6. 退款汇总表

| # | 退款场景 | 触发 | 退回目标 | 交易单数 | 收费 | 商户可见 |
| --- | --- | --- | --- | --- | --- | --- |
| 1.1 | 充币-渠道拦截-原地址 | 合规操作 | 原地址 | 无(渠道层) | 不收 | 无单据 |
| 1.1 | 充币-渠道拦截-新地址 | 合规操作 | 新地址(KYT+7天) | 无(渠道层) | 不收 | 无单据 |
| 1.2 | 充币-风控拦截-原地址 | 商户选择 | 原地址 | 1笔RT | 不收 | 1笔退款单 |
| 1.2 | 充币-风控拦截-新地址 | 商户选择 | 新地址(提币流程) | 1笔RT | 清算确认 | 1笔退款单 |
| 2.1 | VA收款-渠道拒绝 | 合规操作 | 原汇款人 | 无(渠道层) | 不收 | 无单据 |
| 2.2 | VA收款-风控拦截 | 销售+清算+合规 | 原路/新人 | 1笔RT | 清算确认 | 1笔退款单 |
| 3.1 | 提币-风控拦截 | 系统自动 | 商户USDT钱包 | 无(解冻) | 不收 | 失败单 |
| 3.2 | 提币-渠道退票 | 清算确认 | 商户USDT钱包 | 1笔RT+1笔RC | 清算确认 | 原单退款 |
| 4.1 | 付款-风控拦截 | 系统自动 | 商户法币账户 | 无(解冻) | 不收 | 失败单 |
| 4.2 | 付款-渠道退票 | 清算确认 | 商户法币账户 | 1笔RT+1笔RC | 清算确认 | 原单退款 |
| 5.1 | 承兑后付款-BB直接offramp | 汇率规则 | BB USDT钱包/法币 | 1笔RT | 不收承兑费 | 1笔退款 |
| 5.2 | 承兑后付款-BB先承兑再出款 | 同付款退款 | BB法币账户 | 1笔RT | 清算确认 | 原单退款 |
| 5.3 | 承兑后付款-XPAY | 同5.1/5.2 | 同上 | 同上 | 同上 | 同上 |
| 5.4 | 承兑后付款-IPL-BB直接offramp | 汇率规则 | BB USDT钱包/法币 | 3笔RT(内部) | 不收承兑费 | 1笔退款 |
| 5.5 | 承兑后付款-IPL先承兑再出款 | 同付款退款 | IPL法币账户 | 1笔RT | 清算确认 | 原单退款 |

### 商户端展示一致性规则

| 规则 | 说明 |
| --- | --- |
| **退款商户单** | 商户只看到1笔退款（原商户单状态=REFUNDED 或 独立退款商户单） |
| **账户/钱包流水** | 只生成1笔汇总流水（最终退到商户账户/钱包的金额） |
| **内部交易单** | 多笔退款交易单（如5.4的RT001+RT002+RT003）标记为"内部记账"，不产生商户可见流水 |
| **退款详情** | 商户可在退款单详情中看到：退款金额、退款汇率（如有）、退回目标账户 |

---

*最后更新：2026-02-14*
*文档版本：v3.0 — 重构退款流程，按交易类型分类，新增承兑后付款失败退款的汇率规则算法和商户端展示一致性设计*
