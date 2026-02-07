# 商户入网和产品开通流程设计

## 文档概述

本文档详细描述了EX平台中商户入网和产品开通的完整流程，包括：

- 前置条件（TP-SP签约、规则配置）
- 商户入网流程（白牌模式 + API模式）
- 多SP场景下的入网推送逻辑
- 交易路由配置和执行逻辑

**核心设计理念：**

- ✅ **产品驱动**：围绕"开通产品"组织流程，而非单纯"入网"
- ✅ **白牌友好**：注册即创建MID，无需TP审核，只需SP审核
- ✅ **多SP支持**：支持租户签约多个SP，灵活配置入网推送和交易路由
- ✅ **EX定位**：EX是科技平台，不做合规审核，审核由SP负责

---

## 目录

1. [前置条件](#前置条件)
   - 1.1 [SP产品上架](#11-sp产品上架)
   - 1.2 [TP与SP签约](#12-tp与sp签约)
   - 1.3 [TP配置入网推送规则](#13-tp配置入网推送规则)
   - 1.4 [TP配置交易路由规则](#14-tp配置交易路由规则)
2. [商户入网流程](#商户入网流程)
   - 2.1 [白牌模式（MP Portal）](#21-白牌模式mp-portal)
   - 2.2 [API模式](#22-api模式)
3. [多SP场景处理](#多sp场景处理)
   - 3.1 [入网推送逻辑](#31-入网推送逻辑)
   - 3.2 [SP审核结果处理](#32-sp审核结果处理)
4. [交易路由逻辑](#交易路由逻辑)
   - 4.1 [路由规则匹配](#41-路由规则匹配)
   - 4.2 [商户级路由调整](#42-商户级路由调整)
5. [数据表设计](#数据表设计)
6. [完整时序图](#完整时序图)

---

## 前置条件

在商户入网之前，需要完成以下前置配置：

### 1.1 SP产品上架

**说明：** SP需要先在EX平台上架产品，定义产品能力和规则。

```mermaid
sequenceDiagram
    participant SP as SP(BB/IPL)
    participant EX as EX平台
  
    SP->>EX: 1. 上架产品
    Note over SP,EX: 产品信息：<br/>- 产品名称：数币收款<br/>- 产品代码：CRYPTO_COLLECTION<br/>- 支持币种：USDT/USDC<br/>- 支持国家：US/UK/SG<br/>- 金额范围：100-100000 USD<br/>- 手续费率：0.5%<br/>- 审核时效：1-3个工作日
  
    EX->>EX: 2. 录入产品信息到sp_products表
    EX->>SP: 3. 产品上架成功
```

**数据示例：**

```json
{
  "sp_id": 1001,
  "sp_name": "BB",
  "product_name": "数币收款",
  "product_code": "CRYPTO_COLLECTION",
  "supported_currencies": ["USDT", "USDC"],
  "supported_countries": ["US", "UK", "SG"],
  "amount_min": 100,
  "amount_max": 100000,
  "fee_rate": 0.005,
  "status": "ACTIVE"
}
```

---

### 1.2 TP与SP签约

**说明：** 租户（TP）需要与SP签约，获得为商户开通该产品的权限。

```mermaid
sequenceDiagram
    participant TP as 租户(TP)
    participant EX as EX平台
    participant SP as SP(BB/IPL)
  
    TP->>EX: 1. 申请签约SP产品<br/>- SP: BB<br/>- 产品：数币收款
    EX->>SP: 2. 提交签约申请<br/>- TP信息<br/>- 申请产品
  
    Note over SP: 3. 审核TP资质<br/>- 企业资质<br/>- 业务合规性<br/>- 技术能力
  
    SP->>EX: 4. 签约审核通过<br/>- 签约协议<br/>- 费率信息
  
    EX->>EX: 5. 记录签约关系<br/>tenant_sp_contracts表
  
    EX->>TP: 6. 签约成功<br/>可为商户开通此产品
```

**数据示例：**

```json
{
  "tenant_id": 2001,
  "tenant_name": "TP001",
  "sp_id": 1001,
  "sp_name": "BB",
  "sp_product_id": 3001,
  "product_code": "CRYPTO_COLLECTION",
  "contract_status": "ACTIVE",
  "signed_at": "2026-02-01T10:00:00Z"
}
```

---

### 1.3 TP配置入网推送规则

**说明：** TP需要配置商户开通产品时，资料推送到哪个SP进行审核。

**配置原则：**

- 必须配置默认规则（兜底）
- 可配置条件规则（金额、国家等）
- 如果未配置，商户开通时会被拒绝

```mermaid
sequenceDiagram
    participant TP as 租户(TP)
    participant Portal as TP Portal
    participant EX as EX平台
  
    TP->>Portal: 1. 进入"入网推送规则配置"
    Portal->>EX: 2. 查询TP签约的SP产品
    EX->>Portal: 3. 返回可配置产品列表<br/>- 数币收款（BB/IPL）<br/>- 承兑服务（BB）
  
    TP->>Portal: 4. 配置规则
    Note over TP,Portal: 规则1（默认）：<br/>- 产品：数币收款<br/>- 条件：默认<br/>- 目标SP：BB<br/>- 优先级：100
  
    Note over TP,Portal: 规则2（条件）：<br/>- 产品：数币收款<br/>- 条件：金额>50000<br/>- 目标SP：IPL<br/>- 优先级：50
  
    Portal->>EX: 5. 保存规则到tenant_onboarding_rules表
    EX->>Portal: 6. 配置成功
```

**配置示例：**

```json
[
  {
    "tenant_id": 2001,
    "product_code": "CRYPTO_COLLECTION",
    "condition_type": "AMOUNT",
    "condition_value": {"amount_min": 50000},
    "target_sp_id": 1002,
    "target_sp_name": "IPL",
    "priority": 50,
    "status": "ACTIVE"
  },
  {
    "tenant_id": 2001,
    "product_code": "CRYPTO_COLLECTION",
    "condition_type": "DEFAULT",
    "condition_value": null,
    "target_sp_id": 1001,
    "target_sp_name": "BB",
    "priority": 100,
    "status": "ACTIVE"
  }
]
```

**规则匹配逻辑：**

1. 按优先级从小到大排序（数字越小优先级越高）
2. 依次匹配条件
3. 第一个匹配成功的规则生效
4. 如果都不匹配，使用DEFAULT规则

---

### 1.4 TP配置交易路由规则

**说明：** TP需要配置商户交易时，路由到哪个SP执行。

**配置原则：**

- 支持默认规则（租户级）
- 支持商户级规则（针对特定商户）
- 商户级规则优先级高于默认规则

```mermaid
sequenceDiagram
    participant TP as 租户(TP)
    participant Portal as TP Portal
    participant EX as EX平台
  
    TP->>Portal: 1. 进入"交易路由规则配置"
  
    rect rgb(240, 248, 255)
        Note over TP,EX: 配置默认路由规则
        TP->>Portal: 2. 配置默认规则
        Note over TP,Portal: 规则1：<br/>- 产品：数币收款<br/>- 币种：USDT<br/>- 金额：>10000<br/>- 目标SP：BB<br/>- 优先级：100
    
        Note over TP,Portal: 规则2：<br/>- 产品：数币收款<br/>- 币种：USDT<br/>- 金额：<10000<br/>- 目标SP：IPL<br/>- 优先级：100
    
        Portal->>EX: 3. 保存规则到tenant_routing_rules表<br/>(merchant_id = NULL)
    end
  
    rect rgb(255, 250, 240)
        Note over TP,EX: 配置商户级路由规则
        TP->>Portal: 4. 选择商户M001
        TP->>Portal: 5. 配置商户级规则
        Note over TP,Portal: 规则：<br/>- 商户：M001<br/>- 产品：数币收款<br/>- 条件：全部<br/>- 目标SP：IPL<br/>- 优先级：10（高优先级）
    
        Portal->>EX: 6. 保存规则到tenant_routing_rules表<br/>(merchant_id = M001)
    end
  
    EX->>Portal: 7. 配置成功
```

**配置示例：**

```json
[
  {
    "tenant_id": 2001,
    "merchant_id": null,
    "product_code": "CRYPTO_COLLECTION",
    "currency": "USDT",
    "amount_min": 10000,
    "amount_max": null,
    "target_sp_id": 1001,
    "target_sp_name": "BB",
    "priority": 100,
    "status": "ACTIVE"
  },
  {
    "tenant_id": 2001,
    "merchant_id": "M001",
    "product_code": "CRYPTO_COLLECTION",
    "currency": null,
    "amount_min": null,
    "amount_max": null,
    "target_sp_id": 1002,
    "target_sp_name": "IPL",
    "priority": 10,
    "status": "ACTIVE"
  }
]
```

**路由规则优先级：**

1. 商户级规则（merchant_id不为NULL）
2. 条件匹配规则（币种、金额、国家等）
3. 默认规则
4. 如果都不匹配，使用第一个可用SP

---

## 商户入网流程

### 2.1 白牌模式（MP Portal）

**说明：** 商户通过EX提供的白牌Portal完成入网和产品开通。

```mermaid
sequenceDiagram
    participant MP as 商户
    participant Portal as MP Portal
    participant EX as EX系统
    participant BB as BB(SP)
  
    rect rgb(240, 248, 255)
        Note over MP,BB: 第一步：快速注册（30秒）
        MP->>Portal: 1. 访问注册页面
        MP->>Portal: 2. 填写基础信息<br/>- 公司名称<br/>- 联系人姓名<br/>- 联系邮箱<br/>- 联系电话<br/>- 设置密码
        Portal->>EX: 3. 提交注册
    
        Note over EX: 4. 校验信息<br/>- 邮箱格式<br/>- 手机号格式<br/>- 密码强度<br/>- 邮箱/手机号唯一性
    
        EX->>EX: 5. 创建商户记录<br/>- 生成MID<br/>- 状态: REGISTERED<br/>⚡ 无需等待审核
    
        EX->>Portal: 6. 注册成功<br/>返回MID和Token
        Portal->>MP: 7. 跳转到产品选择页面
    end
  
    rect rgb(255, 250, 240)
        Note over MP,BB: 第二步：选择产品
        Portal->>EX: 8. 查询可开通产品<br/>（基于TP签约的SP产品）
        EX->>Portal: 9. 返回产品列表<br/>☐ 数币收款（USDT/USDC）<br/>☐ 承兑服务<br/>☐ 法币VA收款<br/>☐ 法币代付出款
    
        MP->>Portal: 10. 选择产品<br/>(数币收款)
    
        Portal->>MP: 11. 显示资料提交页面<br/>💡 根据产品要求显示对应资料项
    end
  
    rect rgb(240, 255, 240)
        Note over MP,BB: 第三步：提交资料并审核
        MP->>Portal: 12. 上传资料<br/>【基础资料】<br/>- 营业执照<br/>- 法人身份证<br/>- 公司地址证明<br/>【业务资料】<br/>- 业务类型<br/>- 预计月交易量<br/>- 主要交易国家
    
        Portal->>EX: 13. 提交产品开通申请
    
        Note over EX: 14. 校验资料完整性<br/>- 必填项检查<br/>- 文件格式检查<br/>- 文件大小检查
    
        Note over EX: 15. 查询TP入网推送规则<br/>- 产品：数币收款<br/>- 预计月交易量：30000<br/>✅ 匹配默认规则 → BB
    
        alt TP未配置规则
            EX->>Portal: ❌ 开通失败
            Portal->>MP: "请联系租户配置入网规则"
        else TP已配置规则
            EX->>BB: 16. 推送商户入网申请<br/>- MID: M001<br/>- 产品：数币收款<br/>- KYC/KYB资料<br/>- 业务信息
        
            Note over BB: 17. SP审核<br/>- 资质审核<br/>- 合规审核<br/>- 风控审核<br/>⏱️ 1-3个工作日
        
            BB->>EX: 18. 审核结果<br/>- 状态：通过/拒绝<br/>- SP商户ID：BB_M001<br/>- 审核意见
        
            alt 审核通过
                EX->>EX: 19. 更新商户产品状态<br/>- 产品：数币收款<br/>- SP：BB<br/>- 状态：ACTIVE<br/>- SP商户ID：BB_M001
            
                EX->>Portal: 20. 发送通知<br/>- 站内信<br/>- 邮件
            
                Portal->>MP: 21. 🎉 产品开通成功<br/>引导商户开始使用
            else 审核拒绝
                EX->>EX: 19. 更新商户产品状态<br/>- 状态：REJECTED<br/>- 拒绝原因
            
                EX->>Portal: 20. 发送通知
                Portal->>MP: 21. ❌ 产品开通失败<br/>显示拒绝原因
            end
        end
    end
```

---

### 2.2 API模式

**说明：** 租户通过API为商户完成入网和产品开通。

#### 方式1：分步调用（推荐）

```mermaid
sequenceDiagram
    participant Tenant as 租户系统
    participant API as EX API
    participant EX as EX系统
    participant SP as SP层
  
    rect rgb(240, 248, 255)
        Note over Tenant,SP: Step 1: 创建商户（获得MID）
        Tenant->>API: POST /api/v1/merchants<br/>{<br/>  "company_name": "ABC公司",<br/>  "contact_name": "张三",<br/>  "email": "zhang@abc.com",<br/>  "phone": "+86 138xxxx"<br/>}
    
        API->>EX: 创建商户
        EX->>EX: 生成MID<br/>状态: REGISTERED
        EX->>API: 返回MID
    
        API->>Tenant: {<br/>  "merchant_id": "M202602030001",<br/>  "status": "REGISTERED",<br/>  "created_at": "2026-02-03T10:00:00Z"<br/>}
    end
  
    rect rgb(255, 250, 240)
        Note over Tenant,SP: Step 2: 为商户开通产品
        Tenant->>API: POST /api/v1/merchants/{mid}/products<br/>{<br/>  "products": ["CRYPTO_COLLECTION"],<br/>  "kyc_documents": {...},<br/>  "business_info": {<br/>    "business_type": "电商",<br/>    "monthly_volume": 30000<br/>  }<br/>}
    
        API->>EX: 提交产品开通
        EX->>EX: 校验资料完整性
        EX->>EX: 查询入网推送规则<br/>✅ 匹配 → BB
        EX->>SP: 自动提交SP入网
    
        Note over SP: SP审核<br/>⏱️ 1-3个工作日
    
        SP->>EX: 审核结果
        EX->>API: 返回状态
    
        API->>Tenant: {<br/>  "status": "PENDING_APPROVAL",<br/>  "products": [{<br/>    "product_code": "CRYPTO_COLLECTION",<br/>    "sp_name": "BB",<br/>    "status": "PENDING"<br/>  }]<br/>}
    end
  
    Note over Tenant,SP: 后续通过Webhook接收审核结果
```

#### 方式2：一次性调用（便捷）

```mermaid
sequenceDiagram
    participant Tenant as 租户系统
    participant API as EX API
    participant EX as EX系统
    participant SP as SP层
  
    Tenant->>API: POST /api/v1/merchants/create-with-products<br/>{<br/>  "merchant_info": {...},<br/>  "products": ["CRYPTO_COLLECTION"],<br/>  "kyc_documents": {...},<br/>  "business_info": {...}<br/>}
  
    API->>EX: 一次性处理
  
    rect rgb(240, 248, 255)
        EX->>EX: 1. 创建MID<br/>状态: REGISTERED
    end
  
    rect rgb(255, 250, 240)
        EX->>EX: 2. 校验资料
        EX->>EX: 3. 查询入网推送规则
        EX->>SP: 4. 提交SP入网
    end
  
    Note over SP: 5. SP审核<br/>⏱️ 1-3个工作日
  
    SP->>EX: 6. 审核结果
    EX->>API: 7. 返回完整结果
  
    API->>Tenant: {<br/>  "merchant_id": "M202602030001",<br/>  "status": "PENDING_APPROVAL",<br/>  "products": [...]<br/>}
```

---

## 多SP场景处理

### 3.1 入网推送逻辑

**场景：** 租户签约了BB和IPL两个SP，都支持"数币收款"产品。

```mermaid
sequenceDiagram
    participant MP as 商户M001
    participant EX as EX系统
    participant BB as BB(SP)
    participant IPL as IPL(SP)
  
    MP->>EX: 1. 提交产品开通申请<br/>- 产品：数币收款<br/>- 预计月交易量：30000
  
    Note over EX: 2. 查询TP签约的SP<br/>✅ BB: 数币收款<br/>✅ IPL: 数币收款
  
    Note over EX: 3. 查询TP入网推送规则<br/>规则1: 数币收款+金额>50000 → IPL (优先级50)<br/>规则2: 数币收款+默认 → BB (优先级100)
  
    Note over EX: 4. 匹配规则<br/>❌ 30000 < 50000，规则1不匹配<br/>✅ 规则2匹配（默认）<br/>🎯 推送到BB
  
    EX->>BB: 5. 推送商户入网申请
  
    Note over BB: 6. BB审核
  
    BB->>EX: 7. 审核结果：通过
  
    EX->>EX: 8. 记录商户产品SP关联<br/>- 商户：M001<br/>- 产品：数币收款<br/>- SP：BB<br/>- 状态：ACTIVE
```

**关键点：**

- 只推送到匹配规则的SP，不会同时推送到多个SP
- 如果TP未配置规则，拒绝开通
- 如果规则匹配失败，使用DEFAULT规则

---

### 3.2 SP审核结果处理

#### 场景1：单个SP审核通过

```
商户M001 → 推送到BB → BB审核通过 → 商户在BB开通成功
```

**商户侧显示：**

- 产品状态：✅ 数币收款已开通
- 可用SP：BB

#### 场景2：SP审核拒绝，TP调整规则

```mermaid
sequenceDiagram
    participant MP as 商户M001
    participant EX as EX系统
    participant BB as BB(SP)
    participant IPL as IPL(SP)
    participant TP as 租户TP
  
    MP->>EX: 1. 提交产品开通申请
    EX->>BB: 2. 推送到BB（默认规则）
  
    Note over BB: 3. BB审核
    BB->>EX: 4. 审核拒绝<br/>原因：业务类型不符
  
    EX->>MP: 5. 通知商户开通失败
  
    Note over TP: 6. TP查看失败原因<br/>决定调整规则
  
    TP->>EX: 7. 为商户M001配置<br/>商户级入网规则<br/>数币收款 → IPL
  
    MP->>EX: 8. 重新提交申请
  
    Note over EX: 9. 查询规则<br/>✅ 商户级规则：M001 → IPL
  
    EX->>IPL: 10. 推送到IPL
  
    Note over IPL: 11. IPL审核
    IPL->>EX: 12. 审核通过
  
    EX->>MP: 13. 🎉 产品开通成功
```

#### 场景3：商户在多个SP都开通

**前提：** 商户先后在BB和IPL都开通了"数币收款"产品。

```
商户M001:
  - 数币收款 @ BB: ACTIVE
  - 数币收款 @ IPL: ACTIVE
```

**交易时的处理：** 根据交易路由规则选择SP（见下一章节）

---

## 交易路由逻辑

### 4.1 路由规则匹配

**场景：** 商户M001在BB和IPL都开通了"数币收款"，发起一笔交易。

```mermaid
sequenceDiagram
    participant MP as 商户M001
    participant EX as EX系统
    participant BB as BB(SP)
    participant IPL as IPL(SP)
  
    MP->>EX: 1. 发起交易<br/>- 产品：数币收款<br/>- 币种：USDT<br/>- 金额：15000
  
    Note over EX: 2. 查询商户已开通的SP<br/>✅ BB: 数币收款 ACTIVE<br/>✅ IPL: 数币收款 ACTIVE
  
    Note over EX: 3. 查询TP路由规则<br/>【商户级规则】<br/>- 无<br/>【默认规则】<br/>- USDT+金额>10000 → BB (优先级100)<br/>- USDT+金额<10000 → IPL (优先级100)
  
    Note over EX: 4. 匹配规则<br/>✅ 币种=USDT, 金额15000>10000<br/>🎯 路由到BB
  
    EX->>BB: 5. 创建交易<br/>- 商户：M001 (BB_M001)<br/>- 币种：USDT<br/>- 金额：15000
  
    BB->>EX: 6. 返回收款地址
    EX->>MP: 7. 返回收款信息
  
    Note over MP,BB: 后续交易流程...
```

**路由规则优先级：**

1. **商户级规则**（merchant_id不为NULL）- 优先级最高
2. **条件匹配规则**（币种、金额、国家等）- 按priority排序
3. **默认规则**（无条件）- 兜底
4. **第一个可用SP** - 如果都不匹配

---

### 4.2 商户级路由调整

**场景：** VIP商户M001要求所有交易走IPL。

```mermaid
sequenceDiagram
    participant TP as 租户TP
    participant Portal as TP Portal
    participant EX as EX系统
    participant MP as 商户M001
    participant IPL as IPL(SP)
  
    Note over TP,MP: TP为VIP商户配置专属路由
  
    TP->>Portal: 1. 选择商户M001
    TP->>Portal: 2. 配置商户级路由规则<br/>- 商户：M001<br/>- 产品：数币收款<br/>- 条件：全部<br/>- 目标SP：IPL<br/>- 优先级：10（高优先级）
  
    Portal->>EX: 3. 保存规则<br/>tenant_routing_rules表<br/>(merchant_id = M001)
  
    Note over EX: 4. 规则生效<br/>优先级：商户级(10) > 默认(100)
  
    MP->>EX: 5. 发起交易<br/>- 币种：USDT<br/>- 金额：15000
  
    Note over EX: 6. 查询路由规则<br/>✅ 商户级规则：M001 → IPL (优先级10)<br/>⚠️ 默认规则：金额>10000 → BB (优先级100)<br/>🎯 使用商户级规则
  
    EX->>IPL: 7. 路由到IPL
    IPL->>EX: 8. 返回交易信息
    EX->>MP: 9. 返回结果
```

**商户级路由的典型场景：**

- VIP商户专属通道
- 大客户费率优惠
- 高风险商户特殊处理
- 测试商户路由到沙箱环境

---

## 完整时序图

### 端到端流程：从TP签约到商户交易

```mermaid
sequenceDiagram
    participant SP as SP(BB)
    participant EX as EX平台
    participant TP as 租户TP
    participant MP as 商户M001
  
    rect rgb(245, 245, 245)
        Note over SP,MP: 阶段0：前置准备
        SP->>EX: 1. SP上架产品
        TP->>EX: 2. TP签约SP产品
        TP->>EX: 3. TP配置入网推送规则
        TP->>EX: 4. TP配置交易路由规则
    end
  
    rect rgb(240, 248, 255)
        Note over SP,MP: 阶段1：商户注册（30秒）
        MP->>EX: 5. 填写基础信息
        EX->>EX: 6. 创建MID<br/>状态: REGISTERED
        EX->>MP: 7. 注册成功
    end
  
    rect rgb(255, 250, 240)
        Note over SP,MP: 阶段2：选择产品
        MP->>EX: 8. 选择"数币收款"
        EX->>MP: 9. 显示资料提交页面
    end
  
    rect rgb(240, 255, 240)
        Note over SP,MP: 阶段3：提交资料并审核
        MP->>EX: 10. 上传KYC资料
        EX->>EX: 11. 查询入网推送规则<br/>✅ 匹配 → BB
        EX->>SP: 12. 推送到BB审核
        Note over SP: 13. SP审核<br/>⏱️ 1-3个工作日
        SP->>EX: 14. 审核通过
        EX->>EX: 15. 更新状态: ACTIVE
        EX->>MP: 16. 🎉 产品开通成功
    end
  
    rect rgb(255, 245, 240)
        Note over SP,MP: 阶段4：商户发起交易
        MP->>EX: 17. 发起交易<br/>币种: USDT, 金额: 15000
        EX->>EX: 18. 查询路由规则<br/>✅ USDT+金额>10000 → BB
        EX->>SP: 19. 创建交易
        SP->>EX: 20. 返回收款地址
        EX->>MP: 21. 返回收款信息
    end
```

---

## 附录

### A. 规则匹配算法

**入网推送规则匹配：**

```python
def match_onboarding_rule(tenant_id, product_code, merchant_data):
    # 1. 查询所有规则，按优先级排序
    rules = query_rules(tenant_id, product_code).order_by('priority ASC')
  
    # 2. 依次匹配
    for rule in rules:
        if rule.condition_type == 'DEFAULT':
            return rule.target_sp_id
        elif rule.condition_type == 'AMOUNT':
            if merchant_data.monthly_volume >= rule.condition_value['amount_min']:
                return rule.target_sp_id
        elif rule.condition_type == 'COUNTRY':
            if merchant_data.country in rule.condition_value['countries']:
                return rule.target_sp_id
  
    # 3. 无匹配规则，拒绝开通
    raise Exception("No matching onboarding rule found")
```

**交易路由规则匹配：**

```python
def match_routing_rule(tenant_id, merchant_id, transaction):
    # 1. 查询商户级规则（优先级最高）
    merchant_rules = query_routing_rules(tenant_id, merchant_id).order_by('priority ASC')
    for rule in merchant_rules:
        if match_conditions(rule, transaction):
            return rule.target_sp_id
  
    # 2. 查询默认规则
    default_rules = query_routing_rules(tenant_id, None).order_by('priority ASC')
    for rule in default_rules:
        if match_conditions(rule, transaction):
            return rule.target_sp_id
  
    # 3. 使用第一个可用SP
    available_sps = query_merchant_active_sps(merchant_id, transaction.product_code)
    if available_sps:
        return available_sps[0].sp_id
  
    raise Exception("No available SP found")

def match_conditions(rule, transaction):
    if rule.currency and rule.currency != transaction.currency:
        return False
    if rule.amount_min and transaction.amount < rule.amount_min:
        return False
    if rule.amount_max and transaction.amount > rule.amount_max:
        return False
    if rule.country and rule.country != transaction.country:
        return False
    return True
```

---

### B. 状态机

**商户产品状态机：**

```
REGISTERED → PENDING → ACTIVE
                    ↓
                 REJECTED
```

- **REGISTERED**: 商户已注册，未提交产品申请
- **PENDING**: 已提交产品申请，等待SP审核
- **ACTIVE**: SP审核通过，产品已开通
- **REJECTED**: SP审核拒绝

---

### C. API接口列表

#### 1. 创建商户

```http
POST /api/v1/merchants
Content-Type: application/json

{
  "company_name": "ABC公司",
  "contact_name": "张三",
  "email": "zhang@abc.com",
  "phone": "+86 138xxxx"
}

Response:
{
  "merchant_id": "M202602030001",
  "status": "REGISTERED",
  "created_at": "2026-02-03T10:00:00Z"
}
```

#### 2. 为商户开通产品

```http
POST /api/v1/merchants/{merchant_id}/products
Content-Type: application/json

{
  "products": ["CRYPTO_COLLECTION"],
  "kyc_documents": {
    "business_license": "https://...",
    "id_card": "https://..."
  },
  "business_info": {
    "business_type": "电商",
    "monthly_volume": 30000,
    "main_countries": ["US", "UK"]
  }
}

Response:
{
  "status": "PENDING_APPROVAL",
  "products": [{
    "product_code": "CRYPTO_COLLECTION",
    "sp_name": "BB",
    "sp_id": 1001,
    "status": "PENDING",
    "submitted_at": "2026-02-03T10:05:00Z"
  }]
}
```

#### 3. 查询商户产品状态

```http
GET /api/v1/merchants/{merchant_id}/products

Response:
{
  "merchant_id": "M202602030001",
  "products": [{
    "product_code": "CRYPTO_COLLECTION",
    "product_name": "数币收款",
    "sp_id": 1001,
    "sp_name": "BB",
    "sp_merchant_id": "BB_M001",
    "status": "ACTIVE",
    "approved_at": "2026-02-03T12:00:00Z"
  }]
}
```

---

## 总结

本文档详细描述了EX平台的商户入网和产品开通流程，核心特点：

✅ **产品驱动**：围绕产品开通组织流程，而非单纯入网
✅ **白牌友好**：注册即创建MID，无需TP审核，体验流畅
✅ **多SP支持**：灵活配置入网推送和交易路由规则
✅ **规则可配**：支持默认规则和商户级规则，满足不同场景
✅ **职责清晰**：EX是科技平台，合规审核由SP负责

**关键流程：**

1. **前置准备**：SP上架产品 → TP签约 → TP配置规则
2. **商户入网**：注册 → 选择产品 → 提交资料 → SP审核 → 开通成功
3. **交易路由**：发起交易 → 匹配路由规则 → 路由到SP → 执行交易

---

*最后更新：2026-02-03*
*文档版本：v1.0*
