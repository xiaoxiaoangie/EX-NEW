# 交易流程设计 v2

## 文档概述

本文档详细描述了EX平台的完整交易流程，基于**3单模型**（商户单→交易单→渠道单）设计。

**核心设计理念：**

- ✅ **3单模型**：商户单 → 交易单 → 渠道单，清晰的单据层级
- ✅ **业务侧定义**：每种交易类型定义需要调用的步骤，交易引擎按定义编排执行
- ✅ **双向流程**：支持商户主动发起和渠道被动通知两种模式
- ✅ **全链路风控**：收付款,va,收款人均需通过风控检查
- ✅ **白牌预处理**：白牌页面支持预计费、预路由

---

## 目录

1. [3单模型设计](#3单模型设计)
2. [交易类型分类](#交易类型分类)
3. [业务侧定义与交易引擎](#业务侧定义与交易引擎)
4. [各交易类型详细流程](#各交易类型详细流程)
5. On-Ramp / Off-Ramp 承兑流程 → 见独立文档 [on-offramp.md](./on-offramp.md)
   - 模式A：BB自己完成（1.1~1.4）
   - 模式B：IPL-BB打通（2.1~2.4）
6. 退款流程 → 见独立文档 [refund.md](./refund.md)
7. [状态设计](#状态设计)

---

## 3单模型设计

### 1.1 单据层级

```
EX 构建所有单据：
┌─────────────────────────────────────────────────────────────────┐
│  商户单 (Merchant Order)                                        │
│  - 商户可见                                                      │
│  - EX创建，聚合交易单信息                                         │
│  - 1个商户单可能对应多个SP（如IPL-BB打通承兑，2个sp 都可以看到）                      │
│      │                                                          │
│      │ 1:N                                                      │
│      ▼                                                          │
│  交易单 (Transaction Order)                                      │
│  - 一定在同一个SP内                                               │
│  - 计费、预扣余额在交易单上                                        │
│  - 业务侧定义的步骤在交易单上执行                                   │
│      │                                                          │
│      │ 1:N (仅IPL/BB有渠道单)                                    │
│      ▼                                                          │
│  渠道单 (Channel Order)                                          │
│  - 仅IPL和BB有（EX帮他们对接下游渠道）                             │
│  - 其他SP自己对接渠道，无渠道单                                    │
└─────────────────────────────────────────────────────────────────┘
```

### 1.2 SP分类与单据可见性

| SP类型 | 商户单 | 交易单 | 渠道单 | 说明                      |
| ------ | ------ | ------ | ------ | ------------------------- |
| BB     | EX构建 | EX构建 | EX构建 | EX帮BB对接XPAY等下游渠道  |
| IPL    | EX构建 | EX构建 | EX构建 | EX帮IPL对接银行等下游渠道 |
| 其他SP | EX构建 | EX构建 | ❌ 无  | SP自己对接渠道            |

### 1.3 单据关系示意

**单SP场景（如提币）：**

```
商户单 M001
    └── 交易单 T001 (BB)
            └── 渠道单 C001 (BB→链上)
```

**双SP场景（如IPL-BB打通承兑）：**

```
商户单 M001 ← BB和IPL同时看到
    ├── 交易单 T001 (BB): 数币侧
    │       └── 渠道单 C001 (BB)
    └── 交易单 T002 (IPL): 法币侧
            └── 渠道单 C002 (IPL)

✅ 同时创建，并行处理
✅ 都成功 → 商户单成功
✅ BB和IPL之间有清算协议
```

---

## 交易类型分类

### 2.1 按单据流转方向分类

#### **类型A：商户主动发起（商户单 → 交易单 → 渠道单）**

| 交易类型     | 触发方式 | 单据流转                                                   |
| ------------ | -------- | ---------------------------------------------------------- |
| VA申请       | 商户申请 | 商户单 → 交易单 → 计费 → 记账 → 风控 → 路由 → 渠道单 |
| 付款/提现    | 商户发起 | 商户单 → 交易单 → 计费 → 记账 → 风控 → 路由 → 渠道单 |
| 数币钱包付款 | 商户发起 | 商户单 → 交易主单 → 子单1(承兑) + 子单2(出款) → 渠道单  |
| 提币         | 商户发起 | 商户单 → 交易单 → 计费 → 记账 → 风控 → 路由 → 渠道单 |
| 数转法       | 商户发起 | 商户单 → 交易单 → 计费 → 记账 → 风控 → 路由 → 渠道单 |
| 法转数       | 商户发起 | 商户单 → 交易单 → 计费 → 记账 → 风控 → 路由 → 渠道单 |

#### **类型B：渠道被动通知（渠道单 → 交易单 → 商户单）**

| 交易类型 | 触发方式     | 单据流转                                           |
| -------- | ------------ | -------------------------------------------------- |
| 收款     | 渠道入账通知 | 渠道单 → 风控 → 交易单 → 商户单 → 计费 → 记账 |
| 充币     | 链上入账通知 | 渠道单 → 风控 → 交易单 → 商户单 → 计费 → 记账 |

## 业务侧定义与交易引擎

### 3.1 业务侧定义

每种交易类型在业务侧定义需要调用的步骤，交易引擎按定义编排执行。

```json
{
  "transaction_type": "WITHDRAWAL",
  "steps": [
    {"step": "CREATE_MERCHANT_ORDER", "required": true},
    {"step": "CREATE_TRANSACTION_ORDER", "required": true},
    {"step": "PRICING", "required": true},
    {"step": "ACCOUNTING_FREEZE", "required": true},
    {"step": "RISK_CHECK", "required": true},
    {"step": "ROUTING", "required": true},
    {"step": "CREATE_CHANNEL_ORDER", "required": true, "condition": "SP_TYPE in (BB, IPL)"},
    {"step": "CALL_CHANNEL", "required": true},
    {"step": "ACCOUNTING_CONFIRM", "required": true},
    {"step": "NOTIFY", "required": true}
  ]
}
```

### 3.2 交易引擎职责

交易引擎是**编排工具**，不决定走什么步骤，只负责按业务侧定义执行：

```
业务侧定义步骤 → 交易引擎读取 → 按顺序调用各服务 → 返回业务反馈
```

### 3.3 白牌预处理

白牌页面在商户确认前会进行预处理：

- **预计费**：展示预估费用
- **预路由**：展示可用SP和预估到账时间

---

## 各交易类型详细流程

### 4.1 VA申请（商户主动发起）

**单据流转：** 商户单 → 交易单 → 渠道单

```mermaid
sequenceDiagram
    participant WP as 白牌/API
    participant HUB as EX HUB
    participant BL as 业务层
    participant TE as 交易引擎
    participant Pricing as 计费服务
    participant Account as 账户服务
    participant Risk as 风控服务
    participant Router as 路由引擎
    participant CO as 渠道服务
    participant Channel as 渠道
  
    WP->>HUB: 1. 申请VA
  
    rect rgb(240, 248, 255)
        Note over HUB,Channel: 阶段1：创建商户单(聚合层)
        HUB->>HUB: 2. 创建商户单
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段2：业务层校验
        HUB->>BL: 3. 请求业务校验
    end
  
    rect rgb(250, 250, 250)
        Note over HUB,Channel: 阶段3：业务层-基础校验
        BL->>BL: 4. 基础校验(余额、账户状态、权限、产品启用、有效期)
    end
  
    rect rgb(245, 245, 245)
        Note over HUB,Channel: 阶段4：业务层-产品配置检查
        BL->>BL: 5. 产品配置(限额、产品能力)
        BL-->>HUB: 6. 校验通过
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段5：交易引擎创建交易单
        HUB->>TE: 7. 请求创建交易单
        TE->>TE: 8. 创建交易单
    end
  
    rect rgb(240, 255, 240)
        Note over HUB,Channel: 阶段6：交易引擎执行-计费
        TE->>Pricing: 9. 计算VA申请费用
        Pricing-->>TE: 10. 返回费用明细
        TE->>TE: 11. 更新交易单(费用信息)
    end
  
    rect rgb(255, 245, 238)
        Note over HUB,Channel: 阶段7：交易引擎执行-记账
        TE->>Account: 12. 预扣费用
        Account-->>TE: 13. 预扣成功
        TE->>TE: 14. 更新交易单(冻结信息)
    end
  
    rect rgb(230, 240, 255)
        Note over HUB,Channel: 阶段8：交易引擎执行-风控
        TE->>Risk: 15. 风控检查
        Risk-->>TE: 16. 风控通过
        TE->>TE: 17. 更新交易单(风控通过)
    end
  
    rect rgb(255, 240, 245)
        Note over HUB,Channel: 阶段9：交易引擎执行-路由+渠道调用
        TE->>Router: 18. 请求路由
        Router-->>TE: 19. 返回目标渠道
        TE->>CO: 20. 创建渠道单
        CO-->>TE: 21. 返回渠道单ID
        TE->>Channel: 22. 调用渠道创建VA
        Channel-->>TE: 23. 返回VA信息
        TE->>CO: 24. 更新渠道单状态(SUCCESS)
    end
  
    rect rgb(240, 248, 255)
        Note over HUB,Channel: 阶段10：交易引擎处理渠道结果
        CO->>TE: 25. 渠道单成功通知
        TE->>TE: 26. 更新交易单(VA信息)
        TE->>TE: 27. 更新交易单状态(SUCCESS)
    end
  
    rect rgb(255, 245, 238)
        Note over HUB,Channel: 阶段11：确认记账
        TE->>Account: 28. 确认扣款(冻结→扣除)
        Account-->>TE: 29. 记账完成
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段12：聚合到商户单+返回+同步
        TE->>HUB: 30. 通知交易单完成
        HUB->>HUB: 31. 更新商户单状态(SUCCESS)
        HUB-->>WP: 32. 返回VA账号
        Note over HUB,Channel: 数据同步到TP Portal和PP Portal供租户和SP查看
    end
```

**说明：**

- **商户单**：聚合层，汇总交易单结果
- **交易单**：核心执行层，交易引擎驱动执行计费、记账、风控、路由等所有业务逻辑
  - 先记账冻结费用，失败后返回
- **渠道单**：渠道调用层
- 商户通过白牌或API接入EX系统
- 数据通过Portal展示：MP(商户)、TP(租户)、PP(SP)

---

### 4.2 VA收款（渠道被动通知）

**单据流转：** 渠道单 → 交易单 → (计费∥风控) → 商户单 → 记账

```mermaid
sequenceDiagram
    participant Payer as 付款方
    participant Channel as 渠道
    participant CO as 渠道服务
    participant TE as 交易引擎
    participant Pricing as 计费服务
    participant Risk as 风控服务
    participant HUB as EX HUB
    participant Account as 账户服务
    participant WP as 白牌/API
  
    Payer->>Channel: 1. 汇款到VA账户
    Channel->>CO: 2. 入账通知
  
    rect rgb(240, 248, 255)
        Note over Channel,WP: 阶段1：创建渠道单
        CO->>CO: 3. 创建渠道单(记录入账信息)
        CO->>CO: 4. 更新渠道单状态(SUCCESS)
    end
  
    rect rgb(255, 250, 240)
        Note over Channel,WP: 阶段2：业务层校验
        CO->>BL: 5. 请求业务校验
    end
  
    rect rgb(250, 250, 250)
        Note over Channel,WP: 阶段3：业务层-基础校验
        BL->>BL: 6. 基础校验(账户状态、权限、产品启用、有效期)
    end
  
    rect rgb(245, 245, 245)
        Note over Channel,WP: 阶段4：业务层-产品配置检查
        BL->>BL: 7. 产品配置(限额、币种支持)
        BL-->>CO: 8. 校验通过
    end
  
    rect rgb(255, 250, 240)
        Note over Channel,WP: 阶段5：创建交易单
        CO->>TE: 9. 请求创建交易单
        TE->>TE: 10. 创建交易单
    end
  
    rect rgb(240, 255, 240)
        Note over Channel,WP: 阶段6：交易引擎执行-计费∥风控(并行)
        par 并行执行
            TE->>Pricing: 11a. 计算收款手续费
            Pricing-->>TE: 12a. 返回费用明细
        and
            TE->>Risk: 11b. 风控检查(AML/KYC)
            Risk-->>TE: 12b. 返回风控结果
        end
        TE->>TE: 13. 更新交易单(费用+风控结果)
    end
  
    alt 风控通过
        rect rgb(255, 245, 238)
            Note over Channel,WP: 阶段7：商户单产生(费用已确定)
            TE->>HUB: 14a. 创建商户单
            HUB->>HUB: 15a. 商户单产生(PROCESSING)
        end
  
        rect rgb(230, 240, 255)
            Note over Channel,WP: 阶段8：记账(入账)
            TE->>Account: 16a. 商户记账(余额+，扣手续费)
            Account-->>TE: 17a. 记账成功
            TE->>TE: 18a. 更新交易单状态(SUCCESS)
        end
  
        rect rgb(255, 240, 245)
            Note over Channel,WP: 阶段9：更新商户单+通知
            TE->>HUB: 19a. 通知交易单完成
            HUB->>HUB: 20a. 更新商户单状态(SUCCESS)
            HUB-->>WP: 21a. 收款通知(Webhook)
            Note over Channel,WP: 数据同步到TP Portal和PP Portal
        end
  
    else 风控需要补充材料(RFI)
        rect rgb(255, 245, 238)
            Note over Channel,WP: 阶段7：商户单产生(待补充材料)
            TE->>HUB: 14b. 创建商户单
            HUB->>HUB: 15b. 商户单产生(PROCESSING, 合规状态=PENDING_SUPPLEMENT)
        end
  
        rect rgb(230, 240, 255)
            Note over Channel,WP: 阶段8：记账(入账但冻结)
            TE->>Account: 16b. 商户记账(余额+，冻结状态)
            Account-->>TE: 17b. 记账成功(冻结)
            TE->>TE: 18b. 更新交易单状态(PROCESSING)
        end
  
        rect rgb(255, 240, 245)
            Note over Channel,WP: 阶段9：通知商户补充材料
            TE->>HUB: 19b. 通知交易单状态
            HUB->>HUB: 20b. 更新商户单状态(PROCESSING)
            HUB-->>WP: 21b. 收款通知(需补充材料)
            Note over Channel,WP: 数据同步到TP Portal和PP Portal
        end
    end
```

**说明：**

- **计费和风控并行执行**：提升性能，两者都只依赖交易单
- **商户单在计费风控完成后产生**：确保费用已确定
- **情况1：风控通过**

  - 风控状态：PASSED
  - 商户单最终状态：SUCCESS
  - 正常入账完成
- **情况2：风控需要补充材料(RFI)**

  - 风控状态：PENDING_SUPPLEMENT
  - 商户单合规状态：PENDING_SUPPLEMENT
  - 资金入账但冻结，待补充材料后解冻
- 数据展示在PP Portal（服务商）、TP Portal（租户）、MP Portal（商户）

---

### 4.3 收款人添加（商户主动发起）

**单据流转：** 收款人数据 → EX风控 → SP风控 → 人工审核（可选）→ RFI流程（可选）

```mermaid
sequenceDiagram
    participant WP as 白牌/API
    participant HUB as EX HUB
    participant Payee as 收款人服务
    participant Risk as 风控服务
    participant SP as SP(通过PP Portal)
    participant Manual as 人工审核
  
    WP->>HUB: 1. 添加收款人(银行账户/数币地址)
  
    rect rgb(240, 248, 255)
        Note over WP,Manual: 阶段1：保存收款人数据
        HUB->>Payee: 2. 保存收款人信息
        Payee-->>HUB: 3. 返回收款人ID
    end
  
    rect rgb(255, 250, 240)
        Note over WP,Manual: 阶段2：同步到SP
        HUB->>SP: 4. 同步收款人信息到PP Portal
        Note over SP: SP通过PP Portal查看
    end
  
    rect rgb(240, 255, 240)
        Note over WP,Manual: 阶段3：SP风控审核
        SP->>Risk: 5. SP风控审核(KYC/黑名单)
    end
  
    alt SP风控直接通过
        rect rgb(255, 245, 238)
            Note over WP,Manual: 情况1：风控通过
            Risk-->>HUB: 6a. 风控通过
            HUB->>Payee: 7a. 更新收款人状态(VERIFIED)
            HUB-->>WP: 8a. 返回成功
            Note over WP,Manual: 数据同步到TP Portal
        end
  
    else SP风控直接拒绝
        rect rgb(255, 245, 238)
            Note over WP,Manual: 情况2：风控拒绝
            Risk-->>HUB: 6b. 风控拒绝
            HUB->>Payee: 7b. 更新收款人状态(REJECTED)
            HUB-->>WP: 8b. 返回失败(附原因)
            Note over WP,Manual: 数据同步到TP Portal
        end
  
    else SP风控进入人工审核
        rect rgb(230, 240, 255)
            Note over WP,Manual: 情况3：进入人工审核
            Risk-->>HUB: 6c. 需要人工审核
            HUB->>Payee: 7c. 更新收款人状态(MANUAL_REVIEW)
            HUB->>Manual: 8c. 提交人工审核
        end
  
        alt 人工审核通过
            rect rgb(255, 240, 245)
                Note over WP,Manual: 情况3.1：人工通过
                Manual-->>HUB: 9c1. 人工审核通过
                HUB->>Payee: 10c1. 更新收款人状态(VERIFIED)
                HUB-->>WP: 11c1. 返回成功
                Note over WP,Manual: 数据同步到TP Portal
            end
  
        else 人工审核拒绝
            rect rgb(255, 240, 245)
                Note over WP,Manual: 情况3.2：人工拒绝
                Manual-->>HUB: 9c2. 人工审核拒绝
                HUB->>Payee: 10c2. 更新收款人状态(REJECTED)
                HUB-->>WP: 11c2. 返回失败(附原因)
                Note over WP,Manual: 数据同步到TP Portal
            end
  
        else 人工发起RFI
            rect rgb(240, 248, 255)
                Note over WP,Manual: 情况3.3：发起RFI
                Manual-->>HUB: 9c3. 发起RFI(需补充材料)
                HUB->>Payee: 10c3. 更新收款人状态(PENDING_SUPPLEMENT)
                HUB-->>WP: 11c3. 通知需补充材料
                Note over WP,Manual: 数据同步到TP Portal
            end
  
            rect rgb(255, 250, 240)
                Note over WP,Manual: 阶段4：商户提交补充材料
                WP->>HUB: 12c3. 提交补充材料
                HUB->>Payee: 13c3. 保存补充材料
                HUB->>Manual: 14c3. 提交人工审核
            end
  
            alt RFI后人工通过
                rect rgb(240, 255, 240)
                    Note over WP,Manual: 情况3.3.1：补充材料后通过
                    Manual-->>HUB: 15c3a. 人工审核通过
                    HUB->>Payee: 16c3a. 更新收款人状态(VERIFIED)
                    HUB-->>WP: 17c3a. 返回成功
                    Note over WP,Manual: 数据同步到TP Portal
                end
  
            else RFI后人工拒绝
                rect rgb(240, 255, 240)
                    Note over WP,Manual: 情况3.3.2：补充材料后拒绝
                    Manual-->>HUB: 15c3b. 人工审核拒绝
                    HUB->>Payee: 16c3b. 更新收款人状态(REJECTED)
                    HUB-->>WP: 17c3b. 返回失败(附原因)
                    Note over WP,Manual: 数据同步到TP Portal
                end
            end
        end
    end
```

**说明：**

- **阶段1：保存收款人数据** → EX HUB保存
- **阶段2：同步到SP** → 通过PP Portal展示给SP
- **阶段3：SP风控审核** → SP通过PP Portal进行风控审核

**审核结果：**

1. **风控直接通过** → 收款人状态：VERIFIED
2. **风控直接拒绝** → 收款人状态：REJECTED
3. **进入人工审核** → 收款人状态：MANUAL_REVIEW
   - 3.1 **人工通过** → 收款人状态：VERIFIED
   - 3.2 **人工拒绝** → 收款人状态：REJECTED
   - 3.3 **发起RFI** → 收款人状态：PENDING_SUPPLEMENT
     - 商户提交补充材料
     - 人工再次审核
     - 3.3.1 **补充材料后通过** → 收款人状态：VERIFIED
     - 3.3.2 **补充材料后拒绝** → 收款人状态：REJECTED

- 所有状态变更同步到TP Portal供租户查看
- SP通过PP Portal查看和审核收款人信息

---

### 4.4 充币（渠道被动通知）

**单据流转：** 渠道单 → 交易单 → (计费∥风控) → 商户单 → 记账

```mermaid
sequenceDiagram
    participant Sender as 发送方
    participant Channel as 渠道
    participant CO as 渠道服务
    participant BL as 业务层
    participant TE as 交易引擎
    participant Pricing as 计费服务
    participant Risk as 风控服务
    participant HUB as EX HUB
    participant Account as 账户服务
    participant WP as 白牌/API
  
    Sender->>Channel: 1. 链上转账(USDT)
    Channel->>CO: 2. 入账通知(含TxHash)
  
    rect rgb(240, 248, 255)
        Note over Channel,WP: 阶段1：创建渠道单
        CO->>CO: 3. 创建渠道单(记录链上信息)
        CO->>CO: 4. 更新渠道单状态(SUCCESS)
    end
  
    rect rgb(255, 250, 240)
        Note over Channel,WP: 阶段2：业务层校验
        CO->>BL: 5. 请求业务校验
    end
  
    rect rgb(250, 250, 250)
        Note over Channel,WP: 阶段3：业务层-基础校验
        BL->>BL: 6. 基础校验(账户状态、权限、产品启用、有效期)
    end
  
    rect rgb(245, 245, 245)
        Note over Channel,WP: 阶段4：业务层-产品配置检查
        BL->>BL: 7. 产品配置(限额、币种支持)
        BL-->>CO: 8. 校验通过
    end
  
    rect rgb(255, 250, 240)
        Note over Channel,WP: 阶段5：创建交易单
        CO->>TE: 9. 请求创建交易单
        TE->>TE: 10. 创建交易单
    end
  
    rect rgb(240, 255, 240)
        Note over Channel,WP: 阶段6：交易引擎执行-计费∥风控(并行)
        par 并行执行
            TE->>Pricing: 11a. 计算充币手续费
            Pricing-->>TE: 12a. 返回费用明细
        and
            TE->>Risk: 11b. 风控检查(来源地址/AML)
            Risk-->>TE: 12b. 返回风控结果
        end
        TE->>TE: 13. 更新交易单(费用+风控结果)
    end
  
    alt 风控通过
        rect rgb(255, 245, 238)
            Note over Channel,WP: 阶段7：商户单产生(费用已确定)
            TE->>HUB: 14a. 创建商户单
            HUB->>HUB: 15a. 商户单产生(PROCESSING)
        end
  
        rect rgb(230, 240, 255)
            Note over Channel,WP: 阶段8：记账(入账)
            TE->>Account: 16a. 商户记账(USDT+，扣手续费)
            Account-->>TE: 17a. 记账成功
            TE->>CO: 18a. 更新渠道单状态(SUCCESS)
            TE->>TE: 19a. 更新交易单状态(SUCCESS)
        end
  
        rect rgb(255, 240, 245)
            Note over Channel,WP: 阶段9：更新商户单+通知
            TE->>HUB: 20a. 通知交易单完成
            HUB->>HUB: 21a. 更新商户单状态(SUCCESS)
            HUB-->>WP: 22a. 充币通知(Webhook)
            Note over Channel,WP: 数据同步到TP Portal和PP Portal
        end
  
    else 风控需要补充材料(RFI)
        rect rgb(255, 245, 238)
            Note over Channel,WP: 阶段7：商户单产生(待补充材料)
            TE->>HUB: 14b. 创建商户单
            HUB->>HUB: 15b. 商户单产生(PROCESSING, 合规状态=PENDING_SUPPLEMENT)
        end
  
        rect rgb(230, 240, 255)
            Note over Channel,WP: 阶段8：记账(入账但冻结)
            TE->>Account: 16b. 商户记账(USDT+，冻结状态)
            Account-->>TE: 17b. 记账成功(冻结)
            TE->>TE: 18b. 更新交易单状态(PROCESSING)
        end
  
        rect rgb(255, 240, 245)
            Note over Channel,WP: 阶段9：通知商户补充材料
            TE->>HUB: 19b. 通知交易单状态
            HUB->>HUB: 20b. 更新商户单状态(PROCESSING)
            HUB-->>WP: 21b. 充币通知(需补充材料)
            Note over Channel,WP: 数据同步到TP Portal和PP Portal
        end
    end
```

---

### 4.5 提币（商户主动发起）

**单据流转：** 商户单 → 交易单 → 渠道单

```mermaid
sequenceDiagram
    participant WP as 白牌/API
    participant HUB as EX HUB
    participant BL as 业务层
    participant TE as 交易引擎
    participant Pricing as 计费服务
    participant Account as 账户服务
    participant Risk as 风控服务
    participant Router as 路由引擎
    participant CO as 渠道服务
    participant Channel as 渠道
  
    WP->>HUB: 1. 申请提币(USDT, 目标地址)
  
    Note over WP,HUB: 白牌已预计费、预路由
  
    rect rgb(240, 248, 255)
        Note over HUB,Channel: 阶段1：创建商户单(聚合层)
        HUB->>HUB: 2. 创建商户单
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段2：业务层校验
        HUB->>BL: 3. 请求业务校验
    end
  
    rect rgb(250, 250, 250)
        Note over HUB,Channel: 阶段3：业务层-基础校验
        BL->>BL: 4. 基础校验(余额、账户状态、权限、产品启用、有效期)
    end
  
    rect rgb(245, 245, 245)
        Note over HUB,Channel: 阶段4：业务层-产品配置检查
        BL->>BL: 5. 产品配置(限额、产品能力)
        BL-->>HUB: 6. 校验通过
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段5：交易引擎创建交易单
        HUB->>TE: 7. 请求创建交易单
        TE->>TE: 8. 创建交易单
    end
  
    rect rgb(240, 255, 240)
        Note over HUB,Channel: 阶段6：交易引擎执行-计费
        TE->>Pricing: 9. 计算提币费用
        Pricing-->>TE: 10. 返回费用明细
        TE->>TE: 11. 更新交易单(费用信息)
    end
  
    rect rgb(255, 245, 238)
        Note over HUB,Channel: 阶段7：交易引擎执行-记账
        TE->>Account: 12. 预扣余额(金额+手续费)
        Account-->>TE: 13. 冻结成功
        TE->>TE: 14. 更新交易单(冻结信息)
    end
  
    rect rgb(230, 240, 255)
        Note over HUB,Channel: 阶段8：交易引擎执行-风控
        TE->>Risk: 15. 风控检查
        Risk-->>TE: 16. 风控通过
        TE->>TE: 17. 更新交易单(风控通过)
    end
  
    rect rgb(255, 240, 245)
        Note over HUB,Channel: 阶段9：交易引擎执行-路由+渠道调用
        TE->>Router: 18. 请求路由
        Router-->>TE: 19. 返回目标渠道
        TE->>CO: 20. 创建渠道单
        CO-->>TE: 21. 返回渠道单ID
        TE->>Channel: 22. 调用渠道执行链上转账
        Channel-->>TE: 23. 返回TxHash
        TE->>TE: 24. 更新交易单(渠道结果)
    end
  
    rect rgb(240, 248, 255)
        Note over HUB,Channel: 阶段10：交易引擎执行-确认记账
        TE->>Account: 25. 确认扣款(冻结→扣除)
        Account-->>TE: 26. 记账成功
        TE->>CO: 27. 更新渠道单状态(SUCCESS)
        TE->>TE: 28. 更新交易单状态(SUCCESS)
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段11：聚合到商户单+通知
        TE->>HUB: 29. 通知交易单完成
        HUB->>HUB: 30. 更新商户单状态(SUCCESS)
        HUB-->>WP: 31. 返回提币结果
        Note over HUB,Channel: 数据同步到TP Portal和PP Portal
    end
```

---

### 4.6 法币付款/提现（商户主动发起）

**单据流转：** 商户单 → 交易单 → 渠道单

```mermaid
sequenceDiagram
    participant WP as 白牌/API
    participant HUB as EX HUB
    participant BL as 业务层
    participant TE as 交易引擎
    participant Pricing as 计费服务
    participant Account as 账户服务
    participant Risk as 风控服务
    participant Router as 路由引擎
    participant CO as 渠道服务
    participant Channel as 渠道
    participant Payee as 收款方
  
    WP->>HUB: 1. 申请付款(USD, 收款人ID)
  
    Note over WP,HUB: 白牌已预计费、预路由
  
    rect rgb(240, 248, 255)
        Note over HUB,Payee: 阶段1：创建商户单(聚合层)
        HUB->>HUB: 2. 创建商户单
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Payee: 阶段2：业务层校验
        HUB->>BL: 3. 请求业务校验
    end
  
    rect rgb(250, 250, 250)
        Note over HUB,Payee: 阶段3：业务层-基础校验
        BL->>BL: 4. 基础校验(余额、账户状态、权限、产品启用、有效期)
    end
  
    rect rgb(245, 245, 245)
        Note over HUB,Payee: 阶段4：业务层-产品配置检查
        BL->>BL: 5. 产品配置(限额、产品能力)
        BL-->>HUB: 6. 校验通过
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Payee: 阶段5：交易引擎创建交易单
        HUB->>TE: 7. 请求创建交易单
        TE->>TE: 8. 创建交易单
    end
  
    rect rgb(240, 255, 240)
        Note over HUB,Payee: 阶段6：交易引擎执行-计费
        TE->>Pricing: 9. 计算付款费用
        Pricing-->>TE: 10. 返回费用明细
        TE->>TE: 11. 更新交易单(费用信息)
    end
  
    rect rgb(255, 245, 238)
        Note over HUB,Payee: 阶段7：交易引擎执行-记账
        TE->>Account: 12. 预扣余额(金额+手续费)
        Account-->>TE: 13. 冻结成功
        TE->>TE: 14. 更新交易单(冻结信息)
    end
  
    rect rgb(230, 240, 255)
        Note over HUB,Payee: 阶段8：交易引擎执行-风控
        TE->>Risk: 15. 风控检查
        Risk-->>TE: 16. 风控通过
        TE->>TE: 17. 更新交易单(风控通过)
    end
  
    rect rgb(255, 240, 245)
        Note over HUB,Payee: 阶段9：交易引擎执行-路由
        TE->>Router: 18. 请求路由(金额/币种/商户信息)
        Router->>Router: 19. 路由计算(成本/成功率/限额)
        Router-->>TE: 20. 返回目标渠道(如BB)
    end
  
    rect rgb(240, 248, 255)
        Note over HUB,Payee: 阶段10：交易引擎调用渠道服务
        TE->>CO: 21. 调用渠道服务(TXN_123, BB, 金额等)
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Payee: 阶段11：渠道服务创建渠道单
        CO->>CO: 22. 创建渠道单(CH_BB_789)
        CO->>CO: 23. 生成渠道请求号(REQ_BB_001)
        Note over CO: 渠道单用于平台内部管理<br/>请求号用于调用真实渠道(幂等性保证)
    end
  
    rect rgb(240, 255, 240)
        Note over HUB,Payee: 阶段12：渠道服务调用真实渠道
        CO->>Channel: 24. 调用真实渠道(REQ_BB_001, 金额等)
        Channel->>Channel: 25. 真实渠道处理(银行转账)
        Channel->>Payee: 26. 银行转账到收款方
        Channel-->>CO: 27. 返回真实渠道单号(BANK_XYZ)
    end
  
    rect rgb(255, 245, 238)
        Note over HUB,Payee: 阶段13：渠道服务返回结果
        CO->>CO: 28. 更新渠道单(关联BANK_XYZ)
        CO->>CO: 29. 更新渠道单状态(SUCCESS)
        CO-->>TE: 30. 返回渠道结果(CH_BB_789, BANK_XYZ)
    end
  
    rect rgb(230, 240, 255)
        Note over HUB,Payee: 阶段14：交易引擎处理渠道结果
        TE->>TE: 31. 更新交易单(关联渠道单CH_BB_789)
        TE->>TE: 32. 更新交易单(渠道结果)
    end
  
    rect rgb(255, 240, 245)
        Note over HUB,Payee: 阶段15：交易引擎执行-确认记账
        TE->>Account: 33. 确认扣款(冻结→扣除)
        Account-->>TE: 34. 记账成功
        TE->>TE: 35. 更新交易单状态(SUCCESS)
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Payee: 阶段16：聚合到商户单+通知
        TE->>HUB: 36. 通知交易完成
        HUB->>HUB: 37. 更新商户单状态(SUCCESS)
        HUB-->>WP: 38. 返回付款结果
        Note over HUB,Payee: 数据同步到TP Portal和PP Portal
    end
```

---

### 4.7 IPL法币换汇

**场景：** 商户在IPL法币账户之间进行换汇（如USD→EUR）

**单据流转：** 商户单 → 交易单 → 渠道单（调用外部换汇渠道）

**特点：**

- 不需要过风控（法币换汇）
- 不需要计费（无手续费）
- 需要查询实时汇率
- 调用外部换汇渠道

```mermaid
sequenceDiagram
    participant WP as 白牌/API
    participant HUB as EX HUB
    participant BL as 业务层
    participant TE as 交易引擎
    participant FX as 汇率服务
    participant Account as IPL账户服务
    participant Router as 路由引擎
    participant CO as 渠道服务
    participant Channel as 换汇渠道
  
    WP->>HUB: 1. 申请换汇(USD→EUR)
  
    Note over WP,HUB: 白牌已预汇率
  
    rect rgb(240, 248, 255)
        Note over HUB,Channel: 阶段1：创建商户单(聚合层)
        HUB->>HUB: 2. 创建商户单
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段2：业务层校验
        HUB->>BL: 3. 请求业务校验
    end
  
    rect rgb(250, 250, 250)
        Note over HUB,Channel: 阶段3：业务层-基础校验
        BL->>BL: 4. 基础校验(余额、账户状态、权限、产品启用、有效期)
    end
  
    rect rgb(245, 245, 245)
        Note over HUB,Channel: 阶段4：业务层-产品配置检查
        BL->>BL: 5. 产品配置(限额、货币对支持)
        BL-->>HUB: 6. 校验通过
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段5：交易引擎创建交易单
        HUB->>TE: 7. 请求创建交易单
        TE->>TE: 8. 创建交易单
    end
  
    rect rgb(240, 255, 240)
        Note over HUB,Channel: 阶段6：交易引擎执行-查询汇率
        TE->>FX: 9. 查询实时汇率
        FX-->>TE: 10. 返回换汇汇率
        TE->>TE: 11. 更新交易单(汇率)
    end
  
    rect rgb(255, 245, 238)
        Note over HUB,Channel: 阶段7：交易引擎执行-记账(冻结)
        TE->>Account: 12. 冻结源币种账户余额(USD)
        Account-->>TE: 13. 冻结成功
        TE->>TE: 14. 更新交易单(冻结信息)
    end
  
    rect rgb(255, 240, 245)
        Note over HUB,Channel: 阶段8：交易引擎执行-路由+渠道调用
        TE->>Router: 15. 请求路由
        Router-->>TE: 16. 返回换汇渠道
        TE->>CO: 17. 创建渠道单
        CO-->>TE: 18. 返回渠道单ID
        TE->>Channel: 19. 调用换汇渠道执行换汇
        Channel-->>TE: 20. 返回换汇结果
        TE->>CO: 21. 更新渠道单状态(SUCCESS)
        TE->>TE: 22. 更新交易单(渠道结果)
    end
  
    rect rgb(240, 248, 255)
        Note over HUB,Channel: 阶段9：交易引擎执行-确认记账
        TE->>Account: 23. 确认扣款(USD-)
        TE->>Account: 24. 入账(EUR+)
        Account-->>TE: 25. 记账成功
        TE->>TE: 26. 更新交易单状态(SUCCESS)
    end
  
    rect rgb(255, 250, 240)
        Note over HUB,Channel: 阶段10：聚合到商户单+通知
        TE->>HUB: 27. 通知交易单完成
        HUB->>HUB: 28. 更新商户单状态(SUCCESS)
        HUB-->>WP: 29. 返回换汇结果
        Note over HUB,Channel: 数据同步到TP Portal和PP Portal
    end
```

**说明：**

- **IPL换汇调用外部渠道**：换汇渠道（如银行、换汇服务商）
- **不需要风控**：法币换汇不涉及风控检查
- **不需要计费**：换汇无手续费
- **需要查询汇率**：实时汇率查询

---
