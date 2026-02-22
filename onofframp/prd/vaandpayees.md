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

### 4.2 VA 展示排序与重复能力处理

#### 4.2.1 背景

商户同时开通 BB 和 IPL 后，两个 SP 可能都提供 VA 收款能力。需要明确：

1. 商户端展示多个 VA 时的排序规则
2. BB 和 IPL 提供重复 VA 能力时的处理策略

#### 4.2.2 本期规则

**VA 展示排序：**

```
本期规则（业务侧不做自定义排序）：
- BB 的 VA/代收付账户统一排在上面（优先展示）
- IPL 的 VA 账户排在下面
- 同一 SP 内的多个 VA 按创建时间正序排列

排序优先级：BB > IPL（固定，本期不可配置）
```

**重复 VA 能力去重：**

```
当 BB 和 IPL 对同一币种/地区提供了重复的 VA 能力时：
- 本期统一使用 BB 的能力（BB 优先）
- IPL 的重复能力不展示给商户
- 仅 IPL 独有的能力（BB 不具备的币种/地区）才展示 IPL VA

示例：
┌──────────────────────────────────────────────────────┐
│  BB VA 能力          IPL VA 能力        商户端展示     │
├──────────────────────────────────────────────────────┤
│  USD (HK)            USD (HK)          BB USD (HK)   │  ← 重复，用BB
│  HKD (HK)            HKD (HK)          BB HKD (HK)   │  ← 重复，用BB
│  —                   EUR (HK)          IPL EUR (HK)   │  ← IPL独有，展示
│  —                   CNH (HK)          IPL CNH (HK)   │  ← IPL独有，展示
└──────────────────────────────────────────────────────┘
```

**去重判断维度：**

| 维度 | 说明                                |
| ---- | ----------------------------------- |
| 币种 | VA 支持的收款币种（USD/HKD/EUR 等） |
| 地区 | VA 所在地区（HK/SG/UK 等）          |

> 同一币种+同一地区 = 重复能力，本期统一用 BB。

#### 4.2.3 技术实现建议

```
排序字段建议：
- VA 记录增加 sort_order 字段（int），用于控制展示顺序
- 本期默认值：BB 的 VA sort_order = 100，IPL 的 VA sort_order = 200
- 前端按 sort_order 升序排列
- sort_order 值越小越靠前

去重逻辑：
- 查询商户所有可用 VA 时，按 (currency, region) 分组
- 同组内如果 BB 和 IPL 都有，只返回 BB 的
- 同组内如果只有 IPL 有，返回 IPL 的

代码层面建议确认：
✅ sort_order 字段是否已支持（或需新增）
✅ 去重逻辑是否在查询层做（推荐）还是前端做
```

#### 4.2.4 下期规划

```
下期（Phase 2）考虑：
☐ TP 端配置 VA 展示优先级（覆盖默认的 BB 优先）
☐ 商户端选择隐藏/显示特定 VA
☐ 去重策略可配置（不一定 BB 优先，可按 TP 配置）
```

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
