# EX 平台通知设计

> On/Off-Ramp 产品线全量通知规则，覆盖产品开通、交易全生命周期。

---

## 目录

1. [通知渠道与角色](#1-通知渠道与角色)
2. [产品开通通知](#2-产品开通通知)
3. [交易类通知](#3-交易类通知)
   - 3.1 [开VA](#31-开va)
   - 3.2 [充币（链上收款）](#32-充币链上收款)
   - 3.3 [入账（VA收款/法币收款）](#33-入账va收款法币收款)
   - 3.4 [付款（法币付款/提现）](#34-付款法币付款提现)
   - 3.5 [提币（链上转出）](#35-提币链上转出)
   - 3.6 [承兑（On-Ramp/Off-Ramp）](#36-承兑on-rampoff-ramp)
   - 3.7 [收款人管理](#37-收款人管理)
4. [退款通知](#4-退款通知)
5. [通知模板汇总](#5-通知模板汇总)

---

## 1. 通知渠道与角色

### 1.1 通知对象与渠道

| 通知对象 | 渠道 | 说明 |
| --- | --- | --- |
| **客户（商户）** | 邮件 + 站内信 | 商户MP端用户收到 |
| **销售** | 邮件 | 负责该商户的销售人员 |
| **运营** | 飞书通知 | 按飞书通知模板推送到运营群 |
| **合规** | 邮件 | 合规审核人员 |

### 1.2 通知触发状态

| 状态 | 英文 | 触发场景 |
| --- | --- | --- |
| 提交 | Submitted | 客户提交申请/发起交易 |
| 成功 | Approved / Success | 审核通过/交易成功 |
| 失败 | Rejected / Failed | 审核拒绝/交易失败 |
| 补充材料 | Action Required | 需要客户补充资料/材料 |

---

## 2. 产品开通通知

### 2.1 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） | 运营（飞书） | 合规（邮件） |
| --- | --- | --- | --- | --- |
| 提交申请 | - | ✅ | ✅ | ✅ |
| 审核通过 | ✅ | ✅ | ✅ | - |
| 审核拒绝 | ✅ | ✅ | ✅ | - |
| 补充材料 | ✅ | ✅ | - | - |

### 2.2 通知模板

#### 2.2.1 提交申请 → 通知销售

**邮件（中文）：**

> **主题：** 【产品开通申请】商户 {{merchant_name}} 提交了产品开通申请
>
> 您好，
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）已提交产品开通申请，请关注审核进度。
>
> - **申请产品：** {{product_name}}
> - **提交时间：** {{submit_time}}
> - **租户：** {{tenant_name}}
>
> 请登录系统查看详情。

**邮件（English）：**

> **Subject:** [Product Activation Request] Merchant {{merchant_name}} submitted a product activation request
>
> Hi,
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) has submitted a product activation request. Please follow up on the review progress.
>
> - **Product:** {{product_name}}
> - **Submitted at:** {{submit_time}}
> - **Tenant:** {{tenant_name}}
>
> Please log in to the system for details.

#### 2.2.2 提交申请 → 通知合规

**邮件（中文）：**

> **主题：** 【待审核】商户 {{merchant_name}} 产品开通申请待合规审核
>
> 您好，
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）已提交产品开通申请，需要合规审核。
>
> - **申请产品：** {{product_name}}
> - **提交时间：** {{submit_time}}
> - **租户：** {{tenant_name}}
>
> 请尽快登录系统完成审核。

**邮件（English）：**

> **Subject:** [Pending Review] Merchant {{merchant_name}} product activation pending compliance review
>
> Hi,
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) has submitted a product activation request that requires compliance review.
>
> - **Product:** {{product_name}}
> - **Submitted at:** {{submit_time}}
> - **Tenant:** {{tenant_name}}
>
> Please log in to the system to complete the review.

#### 2.2.3 提交申请 → 通知运营（飞书）

**飞书通知（中文）：**

> 📋 **产品开通申请**
>
> 商户：{{merchant_name}}（{{merchant_id}}）
> 产品：{{product_name}}
> 租户：{{tenant_name}}
> 时间：{{submit_time}}
>
> 请关注审核进度。

**飞书通知（English）：**

> 📋 **Product Activation Request**
>
> Merchant: {{merchant_name}} ({{merchant_id}})
> Product: {{product_name}}
> Tenant: {{tenant_name}}
> Time: {{submit_time}}
>
> Please follow up on the review progress.

---

#### 2.2.4 审核通过 → 通知客户

**邮件（中文）：**

> **主题：** 【产品已开通】您的 {{product_name}} 已成功开通
>
> 尊敬的客户，
>
> 您申请的 **{{product_name}}** 已审核通过并成功开通。
>
> - **产品：** {{product_name}}
> - **开通时间：** {{approved_time}}
>
> 您现在可以登录平台使用该产品。如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Product Activated] Your {{product_name}} has been successfully activated
>
> Dear Customer,
>
> Your application for **{{product_name}}** has been approved and activated.
>
> - **Product:** {{product_name}}
> - **Activated at:** {{approved_time}}
>
> You can now log in to the platform to use this product. If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 产品已开通
>
> 您的 **{{product_name}}** 已成功开通，可立即使用。

**站内信（English）：**

> **Title:** Product Activated
>
> Your **{{product_name}}** has been successfully activated and is ready to use.

#### 2.2.5 审核通过 → 通知销售

**邮件（中文）：**

> **主题：** 【产品开通成功】商户 {{merchant_name}} 的 {{product_name}} 已开通
>
> 您好，
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的 **{{product_name}}** 已审核通过并开通。
>
> - **开通时间：** {{approved_time}}
> - **租户：** {{tenant_name}}

**邮件（English）：**

> **Subject:** [Product Activated] Merchant {{merchant_name}}'s {{product_name}} has been activated
>
> Hi,
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s **{{product_name}}** has been approved and activated.
>
> - **Activated at:** {{approved_time}}
> - **Tenant:** {{tenant_name}}

#### 2.2.6 审核通过 → 通知运营（飞书）

**飞书通知（中文）：**

> ✅ **产品开通成功**
>
> 商户：{{merchant_name}}（{{merchant_id}}）
> 产品：{{product_name}}
> 开通时间：{{approved_time}}

**飞书通知（English）：**

> ✅ **Product Activated**
>
> Merchant: {{merchant_name}} ({{merchant_id}})
> Product: {{product_name}}
> Activated at: {{approved_time}}

---

#### 2.2.7 审核拒绝 → 通知客户

**邮件（中文）：**

> **主题：** 【产品开通未通过】您的 {{product_name}} 申请未通过审核
>
> 尊敬的客户，
>
> 很遗憾，您申请的 **{{product_name}}** 未通过审核。
>
> - **产品：** {{product_name}}
> - **拒绝原因：** {{reject_reason}}
> - **审核时间：** {{review_time}}
>
> 如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Product Activation Rejected] Your {{product_name}} application was not approved
>
> Dear Customer,
>
> We regret to inform you that your application for **{{product_name}}** has not been approved.
>
> - **Product:** {{product_name}}
> - **Reason:** {{reject_reason}}
> - **Reviewed at:** {{review_time}}
>
> If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 产品开通未通过
>
> 您的 **{{product_name}}** 申请未通过审核。原因：{{reject_reason}}。请联系客户经理了解详情。

**站内信（English）：**

> **Title:** Product Activation Rejected
>
> Your **{{product_name}}** application was not approved. Reason: {{reject_reason}}. Please contact your account manager for details.

#### 2.2.8 审核拒绝 → 通知销售

**邮件（中文）：**

> **主题：** 【产品开通拒绝】商户 {{merchant_name}} 的 {{product_name}} 审核未通过
>
> 您好，
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的 **{{product_name}}** 审核未通过。
>
> - **拒绝原因：** {{reject_reason}}
> - **审核时间：** {{review_time}}
>
> 请跟进商户沟通。

**邮件（English）：**

> **Subject:** [Product Activation Rejected] Merchant {{merchant_name}}'s {{product_name}} was rejected
>
> Hi,
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s **{{product_name}}** application has been rejected.
>
> - **Reason:** {{reject_reason}}
> - **Reviewed at:** {{review_time}}
>
> Please follow up with the merchant.

#### 2.2.9 审核拒绝 → 通知运营（飞书）

**飞书通知（中文）：**

> ❌ **产品开通拒绝**
>
> 商户：{{merchant_name}}（{{merchant_id}}）
> 产品：{{product_name}}
> 拒绝原因：{{reject_reason}}
> 审核时间：{{review_time}}

**飞书通知（English）：**

> ❌ **Product Activation Rejected**
>
> Merchant: {{merchant_name}} ({{merchant_id}})
> Product: {{product_name}}
> Reason: {{reject_reason}}
> Reviewed at: {{review_time}}

---

#### 2.2.10 补充材料 → 通知客户

**邮件（中文）：**

> **主题：** 【需补充材料】您的 {{product_name}} 申请需要补充材料
>
> 尊敬的客户，
>
> 您申请的 **{{product_name}}** 需要补充以下材料才能继续审核：
>
> - **需补充内容：** {{required_documents}}
> - **截止时间：** {{deadline}}
>
> 请尽快登录平台提交补充材料。如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Action Required] Additional documents needed for your {{product_name}} application
>
> Dear Customer,
>
> Your application for **{{product_name}}** requires additional documents to proceed with the review:
>
> - **Required documents:** {{required_documents}}
> - **Deadline:** {{deadline}}
>
> Please log in to the platform to submit the required documents. If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 需补充材料
>
> 您的 **{{product_name}}** 申请需要补充材料：{{required_documents}}。请在 {{deadline}} 前提交。

**站内信（English）：**

> **Title:** Action Required
>
> Your **{{product_name}}** application requires additional documents: {{required_documents}}. Please submit before {{deadline}}.

#### 2.2.11 补充材料 → 通知销售

**邮件（中文）：**

> **主题：** 【待补充材料】商户 {{merchant_name}} 的 {{product_name}} 申请需补充材料
>
> 您好，
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的 **{{product_name}}** 申请需要补充材料。
>
> - **需补充内容：** {{required_documents}}
> - **截止时间：** {{deadline}}
>
> 请协助商户尽快提交。

**邮件（English）：**

> **Subject:** [Action Required] Merchant {{merchant_name}}'s {{product_name}} application needs additional documents
>
> Hi,
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s **{{product_name}}** application requires additional documents.
>
> - **Required documents:** {{required_documents}}
> - **Deadline:** {{deadline}}
>
> Please assist the merchant in submitting the documents promptly.

---

## 3. 交易类通知

### 3.0 交易类通知矩阵（通用）

| 状态 | 客户（邮件+站内信） | 销售（邮件） | 运营（飞书） | 合规（邮件） |
| --- | --- | --- | --- | --- |
| 提交 | - | ✅ | - | - |
| 成功 | ✅ | ✅ | - | - |
| 失败 | ✅ | ✅ | - | - |
| 补充资料 | ✅ | ✅ | - | - |

> 注：风控/合规拦截场景会额外通知运营（飞书）和合规（邮件），见各交易类型具体说明。

---

### 3.1 开VA

#### 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） |
| --- | --- | --- |
| 提交申请 | - | ✅ |
| 开通成功 | ✅ | ✅ |
| 开通失败 | ✅ | ✅ |

#### 3.1.1 提交申请 → 通知销售

**邮件（中文）：**

> **主题：** 【VA申请】商户 {{merchant_name}} 提交了VA开通申请
>
> 您好，
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）已提交VA开通申请。
>
> - **VA币种：** {{currency}}
> - **提交时间：** {{submit_time}}
>
> 请关注处理进度。

**邮件（English）：**

> **Subject:** [VA Application] Merchant {{merchant_name}} submitted a VA application
>
> Hi,
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) has submitted a VA application.
>
> - **Currency:** {{currency}}
> - **Submitted at:** {{submit_time}}
>
> Please follow up on the processing progress.

#### 3.1.2 开通成功 → 通知客户

**邮件（中文）：**

> **主题：** 【VA已开通】您的 {{currency}} 虚拟账户已开通
>
> 尊敬的客户，
>
> 您的 **{{currency}}** 虚拟账户（VA）已成功开通。
>
> - **VA账号：** {{va_account_number}}
> - **银行名称：** {{bank_name}}
> - **开通时间：** {{activated_time}}
>
> 您现在可以使用该VA接收汇款。

**邮件（English）：**

> **Subject:** [VA Activated] Your {{currency}} Virtual Account is now active
>
> Dear Customer,
>
> Your **{{currency}}** Virtual Account (VA) has been successfully activated.
>
> - **VA Account Number:** {{va_account_number}}
> - **Bank Name:** {{bank_name}}
> - **Activated at:** {{activated_time}}
>
> You can now use this VA to receive payments.

**站内信（中文）：**

> **标题：** VA已开通
>
> 您的 {{currency}} 虚拟账户已开通。账号：{{va_account_number}}。

**站内信（English）：**

> **Title:** VA Activated
>
> Your {{currency}} Virtual Account is now active. Account: {{va_account_number}}.

#### 3.1.3 开通成功 → 通知销售

**邮件（中文）：**

> **主题：** 【VA开通成功】商户 {{merchant_name}} 的 {{currency}} VA已开通
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的 {{currency}} VA已成功开通。
> VA账号：{{va_account_number}}

**邮件（English）：**

> **Subject:** [VA Activated] Merchant {{merchant_name}}'s {{currency}} VA is now active
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s {{currency}} VA has been activated.
> VA Account: {{va_account_number}}

#### 3.1.4 开通失败 → 通知客户

**邮件（中文）：**

> **主题：** 【VA开通失败】您的 {{currency}} 虚拟账户开通未成功
>
> 尊敬的客户，
>
> 很遗憾，您的 **{{currency}}** 虚拟账户开通未成功。
>
> - **失败原因：** {{fail_reason}}
>
> 请联系您的客户经理了解详情。

**邮件（English）：**

> **Subject:** [VA Activation Failed] Your {{currency}} Virtual Account activation was unsuccessful
>
> Dear Customer,
>
> We regret to inform you that your **{{currency}}** Virtual Account activation was unsuccessful.
>
> - **Reason:** {{fail_reason}}
>
> Please contact your account manager for details.

**站内信（中文）：**

> **标题：** VA开通失败
>
> 您的 {{currency}} 虚拟账户开通失败。原因：{{fail_reason}}。

**站内信（English）：**

> **Title:** VA Activation Failed
>
> Your {{currency}} Virtual Account activation failed. Reason: {{fail_reason}}.

#### 3.1.5 开通失败 → 通知销售

**邮件（中文）：**

> **主题：** 【VA开通失败】商户 {{merchant_name}} 的 {{currency}} VA开通失败
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的 {{currency}} VA开通失败。
> 失败原因：{{fail_reason}}
>
> 请跟进商户沟通。

**邮件（English）：**

> **Subject:** [VA Activation Failed] Merchant {{merchant_name}}'s {{currency}} VA activation failed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s {{currency}} VA activation failed.
> Reason: {{fail_reason}}
>
> Please follow up with the merchant.

---

### 3.2 充币（链上收款）

#### 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） | 运营（飞书） | 合规（邮件） |
| --- | --- | --- | --- | --- |
| 到账成功 | ✅ | ✅ | - | - |
| 合规拦截 | ✅ | ✅ | ✅ | ✅ |
| 补充资料 | ✅ | ✅ | - | - |

#### 3.2.1 到账成功 → 通知客户

**邮件（中文）：**

> **主题：** 【充币到账】您收到一笔 {{amount}} {{coin}} 充币
>
> 尊敬的客户，
>
> 您的数币钱包已收到一笔充币。
>
> - **币种：** {{coin}}
> - **金额：** {{amount}}
> - **来源地址：** {{from_address}}
> - **交易哈希：** {{tx_hash}}
> - **到账时间：** {{arrival_time}}
>
> 当前钱包余额：{{balance}} {{coin}}

**邮件（English）：**

> **Subject:** [Deposit Received] You received {{amount}} {{coin}}
>
> Dear Customer,
>
> Your crypto wallet has received a deposit.
>
> - **Coin:** {{coin}}
> - **Amount:** {{amount}}
> - **From Address:** {{from_address}}
> - **TX Hash:** {{tx_hash}}
> - **Received at:** {{arrival_time}}
>
> Current wallet balance: {{balance}} {{coin}}

**站内信（中文）：**

> **标题：** 充币到账
>
> 收到 {{amount}} {{coin}} 充币。来源：{{from_address}}。余额：{{balance}} {{coin}}。

**站内信（English）：**

> **Title:** Deposit Received
>
> Received {{amount}} {{coin}} deposit. From: {{from_address}}. Balance: {{balance}} {{coin}}.

#### 3.2.2 到账成功 → 通知销售

**邮件（中文）：**

> **主题：** 【充币到账】商户 {{merchant_name}} 收到 {{amount}} {{coin}}
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）收到一笔充币。
> 金额：{{amount}} {{coin}} | 来源：{{from_address}} | 时间：{{arrival_time}}

**邮件（English）：**

> **Subject:** [Deposit Received] Merchant {{merchant_name}} received {{amount}} {{coin}}
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) received a deposit.
> Amount: {{amount}} {{coin}} | From: {{from_address}} | Time: {{arrival_time}}

#### 3.2.3 合规拦截 → 通知客户

**邮件（中文）：**

> **主题：** 【充币审核中】您的 {{amount}} {{coin}} 充币正在审核
>
> 尊敬的客户，
>
> 您收到的 **{{amount}} {{coin}}** 充币因合规要求正在审核中，资金暂时冻结。
>
> - **交易哈希：** {{tx_hash}}
> - **来源地址：** {{from_address}}
>
> 我们可能需要您提供额外资料，请留意后续通知。如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Deposit Under Review] Your {{amount}} {{coin}} deposit is under review
>
> Dear Customer,
>
> Your deposit of **{{amount}} {{coin}}** is currently under compliance review and the funds are temporarily frozen.
>
> - **TX Hash:** {{tx_hash}}
> - **From Address:** {{from_address}}
>
> We may require additional documents from you. Please watch for further notifications. If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 充币审核中
>
> 您的 {{amount}} {{coin}} 充币正在合规审核中，资金暂时冻结。请留意后续通知。

**站内信（English）：**

> **Title:** Deposit Under Review
>
> Your {{amount}} {{coin}} deposit is under compliance review. Funds are temporarily frozen. Please watch for further notifications.

#### 3.2.4 合规拦截 → 通知销售

**邮件（中文）：**

> **主题：** 【充币合规拦截】商户 {{merchant_name}} 的 {{amount}} {{coin}} 充币被合规拦截
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的充币被合规拦截。
> 金额：{{amount}} {{coin}} | 来源：{{from_address}} | TX: {{tx_hash}}
>
> 请协助跟进。

**邮件（English）：**

> **Subject:** [Deposit Compliance Hold] Merchant {{merchant_name}}'s {{amount}} {{coin}} deposit held by compliance
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s deposit was held by compliance.
> Amount: {{amount}} {{coin}} | From: {{from_address}} | TX: {{tx_hash}}
>
> Please assist in following up.

#### 3.2.5 合规拦截 → 通知运营（飞书）

**飞书通知（中文）：**

> ⚠️ **充币合规拦截**
>
> 商户：{{merchant_name}}（{{merchant_id}}）
> 金额：{{amount}} {{coin}}
> 来源地址：{{from_address}}
> TX Hash：{{tx_hash}}
> 时间：{{arrival_time}}
>
> 资金已冻结，请关注合规处理进度。

**飞书通知（English）：**

> ⚠️ **Deposit Compliance Hold**
>
> Merchant: {{merchant_name}} ({{merchant_id}})
> Amount: {{amount}} {{coin}}
> From: {{from_address}}
> TX Hash: {{tx_hash}}
> Time: {{arrival_time}}
>
> Funds frozen. Please follow up on compliance processing.

#### 3.2.6 合规拦截 → 通知合规

**邮件（中文）：**

> **主题：** 【待合规审核】商户 {{merchant_name}} 充币 {{amount}} {{coin}} 需合规审核
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的充币需要合规审核。
>
> - **金额：** {{amount}} {{coin}}
> - **来源地址：** {{from_address}}
> - **TX Hash：** {{tx_hash}}
>
> 请尽快登录系统完成审核。

**邮件（English）：**

> **Subject:** [Pending Compliance Review] Merchant {{merchant_name}} deposit {{amount}} {{coin}} requires review
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s deposit requires compliance review.
>
> - **Amount:** {{amount}} {{coin}}
> - **From Address:** {{from_address}}
> - **TX Hash:** {{tx_hash}}
>
> Please log in to the system to complete the review.

#### 3.2.7 补充资料 → 通知客户

**邮件（中文）：**

> **主题：** 【需补充资料】您的充币交易需要补充资料
>
> 尊敬的客户，
>
> 您的 **{{amount}} {{coin}}** 充币交易需要补充以下资料：
>
> - **需补充内容：** {{required_documents}}
> - **截止时间：** {{deadline}}
> - **交易哈希：** {{tx_hash}}
>
> 请尽快登录平台提交。

**邮件（English）：**

> **Subject:** [Action Required] Additional documents needed for your deposit
>
> Dear Customer,
>
> Your deposit of **{{amount}} {{coin}}** requires additional documents:
>
> - **Required documents:** {{required_documents}}
> - **Deadline:** {{deadline}}
> - **TX Hash:** {{tx_hash}}
>
> Please log in to the platform to submit.

**站内信（中文）：**

> **标题：** 充币交易需补充资料
>
> 您的 {{amount}} {{coin}} 充币需补充资料：{{required_documents}}。请在 {{deadline}} 前提交。

**站内信（English）：**

> **Title:** Deposit - Action Required
>
> Your {{amount}} {{coin}} deposit requires additional documents: {{required_documents}}. Please submit before {{deadline}}.

#### 3.2.8 补充资料 → 通知销售

**邮件（中文）：**

> **主题：** 【充币待补充资料】商户 {{merchant_name}} 的充币需补充资料
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的 {{amount}} {{coin}} 充币需补充资料。
> 需补充：{{required_documents}} | 截止：{{deadline}}
>
> 请协助商户尽快提交。

**邮件（English）：**

> **Subject:** [Deposit - Action Required] Merchant {{merchant_name}}'s deposit needs additional documents
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s {{amount}} {{coin}} deposit needs additional documents.
> Required: {{required_documents}} | Deadline: {{deadline}}
>
> Please assist the merchant in submitting promptly.

---

### 3.3 入账（VA收款/法币收款）

#### 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） | 运营（飞书） | 合规（邮件） |
| --- | --- | --- | --- | --- |
| 入账成功 | ✅ | ✅ | - | - |
| 合规拦截 | ✅ | ✅ | ✅ | ✅ |
| 补充资料 | ✅ | ✅ | - | - |
| 入账失败 | ✅ | ✅ | - | - |

#### 3.3.1 入账成功 → 通知客户

**邮件（中文）：**

> **主题：** 【收款到账】您收到一笔 {{amount}} {{currency}} 汇款
>
> 尊敬的客户，
>
> 您的法币账户已收到一笔汇款。
>
> - **金额：** {{amount}} {{currency}}
> - **汇款人：** {{remitter_name}}
> - **汇款参考号：** {{reference}}
> - **到账时间：** {{arrival_time}}
>
> 当前账户余额：{{balance}} {{currency}}

**邮件（English）：**

> **Subject:** [Payment Received] You received {{amount}} {{currency}}
>
> Dear Customer,
>
> Your fiat account has received a payment.
>
> - **Amount:** {{amount}} {{currency}}
> - **Remitter:** {{remitter_name}}
> - **Reference:** {{reference}}
> - **Received at:** {{arrival_time}}
>
> Current account balance: {{balance}} {{currency}}

**站内信（中文）：**

> **标题：** 收款到账
>
> 收到 {{amount}} {{currency}} 汇款。汇款人：{{remitter_name}}。余额：{{balance}} {{currency}}。

**站内信（English）：**

> **Title:** Payment Received
>
> Received {{amount}} {{currency}}. Remitter: {{remitter_name}}. Balance: {{balance}} {{currency}}.

#### 3.3.2 入账成功 → 通知销售

**邮件（中文）：**

> **主题：** 【收款到账】商户 {{merchant_name}} 收到 {{amount}} {{currency}}
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）收到一笔汇款。
> 金额：{{amount}} {{currency}} | 汇款人：{{remitter_name}} | 时间：{{arrival_time}}

**邮件（English）：**

> **Subject:** [Payment Received] Merchant {{merchant_name}} received {{amount}} {{currency}}
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) received a payment.
> Amount: {{amount}} {{currency}} | Remitter: {{remitter_name}} | Time: {{arrival_time}}

#### 3.3.3 合规拦截 → 通知客户

**邮件（中文）：**

> **主题：** 【收款审核中】您的 {{amount}} {{currency}} 收款正在审核
>
> 尊敬的客户，
>
> 您收到的 **{{amount}} {{currency}}** 汇款因合规要求正在审核中。
>
> - **汇款人：** {{remitter_name}}
> - **汇款参考号：** {{reference}}
>
> 我们可能需要您提供额外资料，请留意后续通知。

**邮件（English）：**

> **Subject:** [Payment Under Review] Your {{amount}} {{currency}} payment is under review
>
> Dear Customer,
>
> Your incoming payment of **{{amount}} {{currency}}** is currently under compliance review.
>
> - **Remitter:** {{remitter_name}}
> - **Reference:** {{reference}}
>
> We may require additional documents from you. Please watch for further notifications.

**站内信（中文）：**

> **标题：** 收款审核中
>
> 您的 {{amount}} {{currency}} 收款正在合规审核中。请留意后续通知。

**站内信（English）：**

> **Title:** Payment Under Review
>
> Your {{amount}} {{currency}} payment is under compliance review. Please watch for further notifications.

#### 3.3.4 合规拦截 → 通知销售/运营/合规

**销售邮件、运营飞书、合规邮件** 模板与 3.2 充币合规拦截类似，替换币种/金额/汇款人信息即可。

#### 3.3.5 补充资料 → 通知客户

**邮件（中文）：**

> **主题：** 【需补充资料】您的收款交易需要补充资料
>
> 尊敬的客户，
>
> 您的 **{{amount}} {{currency}}** 收款交易需要补充以下资料：
>
> - **需补充内容：** {{required_documents}}
> - **截止时间：** {{deadline}}
> - **汇款参考号：** {{reference}}
>
> 请尽快登录平台提交。

**邮件（English）：**

> **Subject:** [Action Required] Additional documents needed for your incoming payment
>
> Dear Customer,
>
> Your incoming payment of **{{amount}} {{currency}}** requires additional documents:
>
> - **Required documents:** {{required_documents}}
> - **Deadline:** {{deadline}}
> - **Reference:** {{reference}}
>
> Please log in to the platform to submit.

**站内信（中文）：**

> **标题：** 收款交易需补充资料
>
> 您的 {{amount}} {{currency}} 收款需补充资料：{{required_documents}}。请在 {{deadline}} 前提交。

**站内信（English）：**

> **Title:** Payment - Action Required
>
> Your {{amount}} {{currency}} payment requires additional documents: {{required_documents}}. Please submit before {{deadline}}.

#### 3.3.6 补充资料 → 通知销售

**邮件模板** 与 3.2.8 类似，替换交易类型和金额信息。

#### 3.3.7 入账失败 → 通知客户

**邮件（中文）：**

> **主题：** 【收款失败】您的 {{amount}} {{currency}} 收款未成功
>
> 尊敬的客户，
>
> 您的 **{{amount}} {{currency}}** 收款未成功入账。
>
> - **失败原因：** {{fail_reason}}
> - **汇款人：** {{remitter_name}}
>
> 如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Payment Failed] Your {{amount}} {{currency}} payment was unsuccessful
>
> Dear Customer,
>
> Your incoming payment of **{{amount}} {{currency}}** was not successfully credited.
>
> - **Reason:** {{fail_reason}}
> - **Remitter:** {{remitter_name}}
>
> If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 收款失败
>
> 您的 {{amount}} {{currency}} 收款未成功。原因：{{fail_reason}}。

**站内信（English）：**

> **Title:** Payment Failed
>
> Your {{amount}} {{currency}} payment was unsuccessful. Reason: {{fail_reason}}.

#### 3.3.8 入账失败 → 通知销售

**邮件（中文）：**

> **主题：** 【收款失败】商户 {{merchant_name}} 的 {{amount}} {{currency}} 收款失败
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的收款失败。
> 金额：{{amount}} {{currency}} | 原因：{{fail_reason}}
>
> 请跟进商户沟通。

**邮件（English）：**

> **Subject:** [Payment Failed] Merchant {{merchant_name}}'s {{amount}} {{currency}} payment failed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s payment failed.
> Amount: {{amount}} {{currency}} | Reason: {{fail_reason}}
>
> Please follow up with the merchant.

---

### 3.4 付款（法币付款/提现）

#### 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） |
| --- | --- | --- |
| 提交 | - | ✅ |
| 成功 | ✅ | ✅ |
| 失败 | ✅ | ✅ |

#### 3.4.1 提交 → 通知销售

**邮件（中文）：**

> **主题：** 【付款申请】商户 {{merchant_name}} 提交了 {{amount}} {{currency}} 付款
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）提交了一笔付款申请。
>
> - **金额：** {{amount}} {{currency}}
> - **收款人：** {{beneficiary_name}}
> - **提交时间：** {{submit_time}}

**邮件（English）：**

> **Subject:** [Payout Request] Merchant {{merchant_name}} submitted a {{amount}} {{currency}} payout
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) submitted a payout request.
>
> - **Amount:** {{amount}} {{currency}}
> - **Beneficiary:** {{beneficiary_name}}
> - **Submitted at:** {{submit_time}}

#### 3.4.2 成功 → 通知客户

**邮件（中文）：**

> **主题：** 【付款成功】您的 {{amount}} {{currency}} 付款已完成
>
> 尊敬的客户，
>
> 您的付款已成功处理。
>
> - **金额：** {{amount}} {{currency}}
> - **收款人：** {{beneficiary_name}}
> - **交易单号：** {{order_id}}
> - **完成时间：** {{complete_time}}
>
> 当前账户余额：{{balance}} {{currency}}

**邮件（English）：**

> **Subject:** [Payout Successful] Your {{amount}} {{currency}} payout has been completed
>
> Dear Customer,
>
> Your payout has been successfully processed.
>
> - **Amount:** {{amount}} {{currency}}
> - **Beneficiary:** {{beneficiary_name}}
> - **Order ID:** {{order_id}}
> - **Completed at:** {{complete_time}}
>
> Current account balance: {{balance}} {{currency}}

**站内信（中文）：**

> **标题：** 付款成功
>
> 您的 {{amount}} {{currency}} 付款已完成。收款人：{{beneficiary_name}}。余额：{{balance}} {{currency}}。

**站内信（English）：**

> **Title:** Payout Successful
>
> Your {{amount}} {{currency}} payout has been completed. Beneficiary: {{beneficiary_name}}. Balance: {{balance}} {{currency}}.

#### 3.4.3 成功 → 通知销售

**邮件（中文）：**

> **主题：** 【付款成功】商户 {{merchant_name}} 的 {{amount}} {{currency}} 付款已完成
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的付款已完成。
> 金额：{{amount}} {{currency}} | 收款人：{{beneficiary_name}} | 时间：{{complete_time}}

**邮件（English）：**

> **Subject:** [Payout Successful] Merchant {{merchant_name}}'s {{amount}} {{currency}} payout completed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s payout completed.
> Amount: {{amount}} {{currency}} | Beneficiary: {{beneficiary_name}} | Time: {{complete_time}}

#### 3.4.4 失败 → 通知客户

**邮件（中文）：**

> **主题：** 【付款失败】您的 {{amount}} {{currency}} 付款未成功
>
> 尊敬的客户，
>
> 您的付款未成功处理。
>
> - **金额：** {{amount}} {{currency}}
> - **收款人：** {{beneficiary_name}}
> - **失败原因：** {{fail_reason}}
> - **交易单号：** {{order_id}}
>
> 资金已退回您的账户。如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Payout Failed] Your {{amount}} {{currency}} payout was unsuccessful
>
> Dear Customer,
>
> Your payout was not successfully processed.
>
> - **Amount:** {{amount}} {{currency}}
> - **Beneficiary:** {{beneficiary_name}}
> - **Reason:** {{fail_reason}}
> - **Order ID:** {{order_id}}
>
> Funds have been returned to your account. If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 付款失败
>
> 您的 {{amount}} {{currency}} 付款失败。原因：{{fail_reason}}。资金已退回。

**站内信（English）：**

> **Title:** Payout Failed
>
> Your {{amount}} {{currency}} payout failed. Reason: {{fail_reason}}. Funds have been returned.

#### 3.4.5 失败 → 通知销售

**邮件（中文）：**

> **主题：** 【付款失败】商户 {{merchant_name}} 的 {{amount}} {{currency}} 付款失败
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的付款失败。
> 金额：{{amount}} {{currency}} | 原因：{{fail_reason}}
>
> 请跟进商户沟通。

**邮件（English）：**

> **Subject:** [Payout Failed] Merchant {{merchant_name}}'s {{amount}} {{currency}} payout failed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s payout failed.
> Amount: {{amount}} {{currency}} | Reason: {{fail_reason}}
>
> Please follow up with the merchant.

---

### 3.5 提币（链上转出）

#### 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） |
| --- | --- | --- |
| 提交 | - | ✅ |
| 成功 | ✅ | ✅ |
| 失败 | ✅ | ✅ |

#### 3.5.1 提交 → 通知销售

**邮件（中文）：**

> **主题：** 【提币申请】商户 {{merchant_name}} 提交了 {{amount}} {{coin}} 提币
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）提交了一笔提币申请。
>
> - **金额：** {{amount}} {{coin}}
> - **目标地址：** {{to_address}}
> - **提交时间：** {{submit_time}}

**邮件（English）：**

> **Subject:** [Withdrawal Request] Merchant {{merchant_name}} submitted a {{amount}} {{coin}} withdrawal
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) submitted a withdrawal request.
>
> - **Amount:** {{amount}} {{coin}}
> - **To Address:** {{to_address}}
> - **Submitted at:** {{submit_time}}

#### 3.5.2 成功 → 通知客户

**邮件（中文）：**

> **主题：** 【提币成功】您的 {{amount}} {{coin}} 提币已完成
>
> 尊敬的客户，
>
> 您的提币已成功处理。
>
> - **金额：** {{amount}} {{coin}}
> - **目标地址：** {{to_address}}
> - **交易哈希：** {{tx_hash}}
> - **完成时间：** {{complete_time}}
>
> 当前钱包余额：{{balance}} {{coin}}

**邮件（English）：**

> **Subject:** [Withdrawal Successful] Your {{amount}} {{coin}} withdrawal has been completed
>
> Dear Customer,
>
> Your withdrawal has been successfully processed.
>
> - **Amount:** {{amount}} {{coin}}
> - **To Address:** {{to_address}}
> - **TX Hash:** {{tx_hash}}
> - **Completed at:** {{complete_time}}
>
> Current wallet balance: {{balance}} {{coin}}

**站内信（中文）：**

> **标题：** 提币成功
>
> 您的 {{amount}} {{coin}} 提币已完成。目标地址：{{to_address}}。余额：{{balance}} {{coin}}。

**站内信（English）：**

> **Title:** Withdrawal Successful
>
> Your {{amount}} {{coin}} withdrawal completed. To: {{to_address}}. Balance: {{balance}} {{coin}}.

#### 3.5.3 成功 → 通知销售

**邮件（中文）：**

> **主题：** 【提币成功】商户 {{merchant_name}} 的 {{amount}} {{coin}} 提币已完成
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的提币已完成。
> 金额：{{amount}} {{coin}} | 目标：{{to_address}} | TX: {{tx_hash}}

**邮件（English）：**

> **Subject:** [Withdrawal Successful] Merchant {{merchant_name}}'s {{amount}} {{coin}} withdrawal completed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s withdrawal completed.
> Amount: {{amount}} {{coin}} | To: {{to_address}} | TX: {{tx_hash}}

#### 3.5.4 失败 → 通知客户

**邮件（中文）：**

> **主题：** 【提币失败】您的 {{amount}} {{coin}} 提币未成功
>
> 尊敬的客户，
>
> 您的提币未成功处理。
>
> - **金额：** {{amount}} {{coin}}
> - **目标地址：** {{to_address}}
> - **失败原因：** {{fail_reason}}
>
> 资金已退回您的钱包。如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Withdrawal Failed] Your {{amount}} {{coin}} withdrawal was unsuccessful
>
> Dear Customer,
>
> Your withdrawal was not successfully processed.
>
> - **Amount:** {{amount}} {{coin}}
> - **To Address:** {{to_address}}
> - **Reason:** {{fail_reason}}
>
> Funds have been returned to your wallet. If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 提币失败
>
> 您的 {{amount}} {{coin}} 提币失败。原因：{{fail_reason}}。资金已退回。

**站内信（English）：**

> **Title:** Withdrawal Failed
>
> Your {{amount}} {{coin}} withdrawal failed. Reason: {{fail_reason}}. Funds have been returned.

#### 3.5.5 失败 → 通知销售

**邮件（中文）：**

> **主题：** 【提币失败】商户 {{merchant_name}} 的 {{amount}} {{coin}} 提币失败
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的提币失败。
> 金额：{{amount}} {{coin}} | 原因：{{fail_reason}}
>
> 请跟进商户沟通。

**邮件（English）：**

> **Subject:** [Withdrawal Failed] Merchant {{merchant_name}}'s {{amount}} {{coin}} withdrawal failed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s withdrawal failed.
> Amount: {{amount}} {{coin}} | Reason: {{fail_reason}}
>
> Please follow up with the merchant.

---

### 3.6 承兑（On-Ramp/Off-Ramp）

#### 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） |
| --- | --- | --- |
| 提交 | - | ✅ |
| 成功 | ✅ | ✅ |
| 失败 | ✅ | ✅ |

#### 3.6.1 提交 → 通知销售

**邮件（中文）：**

> **主题：** 【承兑申请】商户 {{merchant_name}} 提交了 {{from_amount}} {{from_currency}} → {{to_currency}} 承兑
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）提交了一笔承兑申请。
>
> - **方向：** {{direction}}（On-Ramp / Off-Ramp）
> - **源金额：** {{from_amount}} {{from_currency}}
> - **目标币种：** {{to_currency}}
> - **提交时间：** {{submit_time}}

**邮件（English）：**

> **Subject:** [Exchange Request] Merchant {{merchant_name}} submitted a {{from_amount}} {{from_currency}} → {{to_currency}} exchange
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) submitted an exchange request.
>
> - **Direction:** {{direction}} (On-Ramp / Off-Ramp)
> - **From:** {{from_amount}} {{from_currency}}
> - **To:** {{to_currency}}
> - **Submitted at:** {{submit_time}}

#### 3.6.2 成功 → 通知客户

**邮件（中文）：**

> **主题：** 【承兑成功】您的 {{from_amount}} {{from_currency}} → {{to_amount}} {{to_currency}} 承兑已完成
>
> 尊敬的客户，
>
> 您的承兑已成功完成。
>
> - **方向：** {{direction}}
> - **源金额：** {{from_amount}} {{from_currency}}
> - **到账金额：** {{to_amount}} {{to_currency}}
> - **汇率：** {{exchange_rate}}
> - **手续费：** {{fee}}
> - **完成时间：** {{complete_time}}

**邮件（English）：**

> **Subject:** [Exchange Successful] Your {{from_amount}} {{from_currency}} → {{to_amount}} {{to_currency}} exchange completed
>
> Dear Customer,
>
> Your exchange has been successfully completed.
>
> - **Direction:** {{direction}}
> - **From:** {{from_amount}} {{from_currency}}
> - **To:** {{to_amount}} {{to_currency}}
> - **Exchange Rate:** {{exchange_rate}}
> - **Fee:** {{fee}}
> - **Completed at:** {{complete_time}}

**站内信（中文）：**

> **标题：** 承兑成功
>
> {{from_amount}} {{from_currency}} → {{to_amount}} {{to_currency}} 承兑完成。汇率：{{exchange_rate}}。

**站内信（English）：**

> **Title:** Exchange Successful
>
> {{from_amount}} {{from_currency}} → {{to_amount}} {{to_currency}} exchange completed. Rate: {{exchange_rate}}.

#### 3.6.3 成功 → 通知销售

**邮件（中文）：**

> **主题：** 【承兑成功】商户 {{merchant_name}} 的承兑已完成
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的承兑已完成。
> {{from_amount}} {{from_currency}} → {{to_amount}} {{to_currency}} | 汇率：{{exchange_rate}} | 时间：{{complete_time}}

**邮件（English）：**

> **Subject:** [Exchange Successful] Merchant {{merchant_name}}'s exchange completed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s exchange completed.
> {{from_amount}} {{from_currency}} → {{to_amount}} {{to_currency}} | Rate: {{exchange_rate}} | Time: {{complete_time}}

#### 3.6.4 失败 → 通知客户

**邮件（中文）：**

> **主题：** 【承兑失败】您的 {{from_amount}} {{from_currency}} → {{to_currency}} 承兑未成功
>
> 尊敬的客户，
>
> 您的承兑未成功处理。
>
> - **源金额：** {{from_amount}} {{from_currency}}
> - **目标币种：** {{to_currency}}
> - **失败原因：** {{fail_reason}}
>
> 资金已退回您的原账户。如有疑问，请联系您的客户经理。

**邮件（English）：**

> **Subject:** [Exchange Failed] Your {{from_amount}} {{from_currency}} → {{to_currency}} exchange was unsuccessful
>
> Dear Customer,
>
> Your exchange was not successfully processed.
>
> - **From:** {{from_amount}} {{from_currency}}
> - **To:** {{to_currency}}
> - **Reason:** {{fail_reason}}
>
> Funds have been returned to your original account. If you have any questions, please contact your account manager.

**站内信（中文）：**

> **标题：** 承兑失败
>
> {{from_amount}} {{from_currency}} → {{to_currency}} 承兑失败。原因：{{fail_reason}}。资金已退回。

**站内信（English）：**

> **Title:** Exchange Failed
>
> {{from_amount}} {{from_currency}} → {{to_currency}} exchange failed. Reason: {{fail_reason}}. Funds returned.

#### 3.6.5 失败 → 通知销售

**邮件（中文）：**

> **主题：** 【承兑失败】商户 {{merchant_name}} 的承兑失败
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的承兑失败。
> {{from_amount}} {{from_currency}} → {{to_currency}} | 原因：{{fail_reason}}
>
> 请跟进商户沟通。

**邮件（English）：**

> **Subject:** [Exchange Failed] Merchant {{merchant_name}}'s exchange failed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s exchange failed.
> {{from_amount}} {{from_currency}} → {{to_currency}} | Reason: {{fail_reason}}
>
> Please follow up with the merchant.

---

### 3.7 收款人管理

#### 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） |
| --- | --- | --- |
| 提交 | - | ✅ |
| 审核通过 | ✅ | ✅ |
| 审核拒绝 | ✅ | ✅ |
| 补充资料 | ✅ | ✅ |

#### 3.7.1 提交 → 通知销售

**邮件（中文）：**

> **主题：** 【收款人申请】商户 {{merchant_name}} 提交了收款人 {{beneficiary_name}} 的审核申请
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）提交了一个收款人审核申请。
>
> - **收款人：** {{beneficiary_name}}
> - **银行：** {{bank_name}}
> - **账号：** {{account_number_masked}}
> - **提交时间：** {{submit_time}}

**邮件（English）：**

> **Subject:** [Beneficiary Application] Merchant {{merchant_name}} submitted beneficiary {{beneficiary_name}} for review
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}}) submitted a beneficiary for review.
>
> - **Beneficiary:** {{beneficiary_name}}
> - **Bank:** {{bank_name}}
> - **Account:** {{account_number_masked}}
> - **Submitted at:** {{submit_time}}

#### 3.7.2 审核通过 → 通知客户

**邮件（中文）：**

> **主题：** 【收款人已通过】收款人 {{beneficiary_name}} 已审核通过
>
> 尊敬的客户，
>
> 您提交的收款人 **{{beneficiary_name}}** 已审核通过，可以用于付款。
>
> - **收款人：** {{beneficiary_name}}
> - **银行：** {{bank_name}}
> - **通过时间：** {{approved_time}}

**邮件（English）：**

> **Subject:** [Beneficiary Approved] Beneficiary {{beneficiary_name}} has been approved
>
> Dear Customer,
>
> Your beneficiary **{{beneficiary_name}}** has been approved and is ready for payouts.
>
> - **Beneficiary:** {{beneficiary_name}}
> - **Bank:** {{bank_name}}
> - **Approved at:** {{approved_time}}

**站内信（中文）：**

> **标题：** 收款人已通过
>
> 收款人 {{beneficiary_name}} 已审核通过，可用于付款。

**站内信（English）：**

> **Title:** Beneficiary Approved
>
> Beneficiary {{beneficiary_name}} has been approved and is ready for payouts.

#### 3.7.3 审核通过 → 通知销售

**邮件（中文）：**

> **主题：** 【收款人通过】商户 {{merchant_name}} 的收款人 {{beneficiary_name}} 已通过
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的收款人 {{beneficiary_name}} 已审核通过。

**邮件（English）：**

> **Subject:** [Beneficiary Approved] Merchant {{merchant_name}}'s beneficiary {{beneficiary_name}} approved
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s beneficiary {{beneficiary_name}} has been approved.

#### 3.7.4 审核拒绝 → 通知客户

**邮件（中文）：**

> **主题：** 【收款人未通过】收款人 {{beneficiary_name}} 审核未通过
>
> 尊敬的客户，
>
> 您提交的收款人 **{{beneficiary_name}}** 未通过审核。
>
> - **拒绝原因：** {{reject_reason}}
>
> 请修改信息后重新提交，或联系您的客户经理。

**邮件（English）：**

> **Subject:** [Beneficiary Rejected] Beneficiary {{beneficiary_name}} was not approved
>
> Dear Customer,
>
> Your beneficiary **{{beneficiary_name}}** has not been approved.
>
> - **Reason:** {{reject_reason}}
>
> Please update the information and resubmit, or contact your account manager.

**站内信（中文）：**

> **标题：** 收款人未通过
>
> 收款人 {{beneficiary_name}} 审核未通过。原因：{{reject_reason}}。

**站内信（English）：**

> **Title:** Beneficiary Rejected
>
> Beneficiary {{beneficiary_name}} was not approved. Reason: {{reject_reason}}.

#### 3.7.5 审核拒绝 → 通知销售

**邮件（中文）：**

> **主题：** 【收款人拒绝】商户 {{merchant_name}} 的收款人 {{beneficiary_name}} 未通过
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的收款人 {{beneficiary_name}} 审核未通过。
> 原因：{{reject_reason}}
>
> 请跟进商户沟通。

**邮件（English）：**

> **Subject:** [Beneficiary Rejected] Merchant {{merchant_name}}'s beneficiary {{beneficiary_name}} rejected
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s beneficiary {{beneficiary_name}} was rejected.
> Reason: {{reject_reason}}
>
> Please follow up with the merchant.

#### 3.7.6 补充资料 → 通知客户

**邮件（中文）：**

> **主题：** 【需补充资料】收款人 {{beneficiary_name}} 需要补充资料
>
> 尊敬的客户，
>
> 您提交的收款人 **{{beneficiary_name}}** 需要补充以下资料：
>
> - **需补充内容：** {{required_documents}}
> - **截止时间：** {{deadline}}
>
> 请尽快登录平台提交。

**邮件（English）：**

> **Subject:** [Action Required] Additional documents needed for beneficiary {{beneficiary_name}}
>
> Dear Customer,
>
> Your beneficiary **{{beneficiary_name}}** requires additional documents:
>
> - **Required documents:** {{required_documents}}
> - **Deadline:** {{deadline}}
>
> Please log in to the platform to submit.

**站内信（中文）：**

> **标题：** 收款人需补充资料
>
> 收款人 {{beneficiary_name}} 需补充资料：{{required_documents}}。请在 {{deadline}} 前提交。

**站内信（English）：**

> **Title:** Beneficiary - Action Required
>
> Beneficiary {{beneficiary_name}} requires additional documents: {{required_documents}}. Please submit before {{deadline}}.

#### 3.7.7 补充资料 → 通知销售

**邮件（中文）：**

> **主题：** 【收款人待补充资料】商户 {{merchant_name}} 的收款人 {{beneficiary_name}} 需补充资料
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的收款人 {{beneficiary_name}} 需补充资料。
> 需补充：{{required_documents}} | 截止：{{deadline}}
>
> 请协助商户尽快提交。

**邮件（English）：**

> **Subject:** [Beneficiary - Action Required] Merchant {{merchant_name}}'s beneficiary {{beneficiary_name}} needs documents
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s beneficiary {{beneficiary_name}} needs additional documents.
> Required: {{required_documents}} | Deadline: {{deadline}}
>
> Please assist the merchant in submitting promptly.

---

## 4. 退款通知

### 4.1 通知矩阵

| 状态 | 客户（邮件+站内信） | 销售（邮件） | 运营（飞书） |
| --- | --- | --- | --- |
| 退款发起 | ✅ | ✅ | ✅ |
| 退款成功 | ✅ | ✅ | - |
| 退款失败 | ✅ | ✅ | ✅ |

### 4.2 退款发起 → 通知客户

**邮件（中文）：**

> **主题：** 【退款处理中】您的交易 {{order_id}} 正在退款处理
>
> 尊敬的客户，
>
> 您的交易正在退款处理中。
>
> - **原交易单号：** {{order_id}}
> - **退款金额：** {{refund_amount}} {{currency}}
> - **退款原因：** {{refund_reason}}
> - **预计到账：** {{estimated_arrival}}
>
> 请留意后续到账通知。

**邮件（English）：**

> **Subject:** [Refund Processing] Your transaction {{order_id}} is being refunded
>
> Dear Customer,
>
> Your transaction is being refunded.
>
> - **Original Order ID:** {{order_id}}
> - **Refund Amount:** {{refund_amount}} {{currency}}
> - **Reason:** {{refund_reason}}
> - **Estimated Arrival:** {{estimated_arrival}}
>
> Please watch for the arrival notification.

**站内信（中文）：**

> **标题：** 退款处理中
>
> 交易 {{order_id}} 正在退款，金额 {{refund_amount}} {{currency}}。

**站内信（English）：**

> **Title:** Refund Processing
>
> Transaction {{order_id}} is being refunded. Amount: {{refund_amount}} {{currency}}.

### 4.3 退款发起 → 通知销售

**邮件（中文）：**

> **主题：** 【退款处理】商户 {{merchant_name}} 的交易 {{order_id}} 正在退款
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的交易正在退款。
> 原单号：{{order_id}} | 退款金额：{{refund_amount}} {{currency}} | 原因：{{refund_reason}}

**邮件（English）：**

> **Subject:** [Refund Processing] Merchant {{merchant_name}}'s transaction {{order_id}} is being refunded
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s transaction is being refunded.
> Order: {{order_id}} | Amount: {{refund_amount}} {{currency}} | Reason: {{refund_reason}}

### 4.4 退款发起 → 通知运营（飞书）

**飞书通知（中文）：**

> 🔄 **退款处理**
>
> 商户：{{merchant_name}}（{{merchant_id}}）
> 原单号：{{order_id}}
> 退款金额：{{refund_amount}} {{currency}}
> 原因：{{refund_reason}}
> 时间：{{refund_time}}

**飞书通知（English）：**

> 🔄 **Refund Processing**
>
> Merchant: {{merchant_name}} ({{merchant_id}})
> Order: {{order_id}}
> Amount: {{refund_amount}} {{currency}}
> Reason: {{refund_reason}}
> Time: {{refund_time}}

### 4.5 退款成功 → 通知客户

**邮件（中文）：**

> **主题：** 【退款成功】您的交易 {{order_id}} 退款已到账
>
> 尊敬的客户，
>
> 您的退款已成功到账。
>
> - **原交易单号：** {{order_id}}
> - **退款金额：** {{refund_amount}} {{currency}}
> - **退回账户：** {{refund_target}}
> - **到账时间：** {{arrival_time}}

**邮件（English）：**

> **Subject:** [Refund Successful] Your transaction {{order_id}} refund has been credited
>
> Dear Customer,
>
> Your refund has been successfully credited.
>
> - **Original Order ID:** {{order_id}}
> - **Refund Amount:** {{refund_amount}} {{currency}}
> - **Credited to:** {{refund_target}}
> - **Credited at:** {{arrival_time}}

**站内信（中文）：**

> **标题：** 退款成功
>
> 交易 {{order_id}} 退款 {{refund_amount}} {{currency}} 已到账。

**站内信（English）：**

> **Title:** Refund Successful
>
> Transaction {{order_id}} refund of {{refund_amount}} {{currency}} has been credited.

### 4.6 退款成功 → 通知销售

**邮件（中文）：**

> **主题：** 【退款成功】商户 {{merchant_name}} 的交易 {{order_id}} 退款已完成
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的退款已完成。
> 原单号：{{order_id}} | 退款金额：{{refund_amount}} {{currency}} | 退回：{{refund_target}}

**邮件（English）：**

> **Subject:** [Refund Successful] Merchant {{merchant_name}}'s transaction {{order_id}} refund completed
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s refund completed.
> Order: {{order_id}} | Amount: {{refund_amount}} {{currency}} | Credited to: {{refund_target}}

### 4.7 退款失败 → 通知客户

**邮件（中文）：**

> **主题：** 【退款异常】您的交易 {{order_id}} 退款处理异常
>
> 尊敬的客户，
>
> 您的退款处理遇到异常。
>
> - **原交易单号：** {{order_id}}
> - **退款金额：** {{refund_amount}} {{currency}}
> - **异常原因：** {{fail_reason}}
>
> 我们正在处理中，请联系您的客户经理了解详情。

**邮件（English）：**

> **Subject:** [Refund Issue] Your transaction {{order_id}} refund encountered an issue
>
> Dear Customer,
>
> Your refund has encountered an issue.
>
> - **Original Order ID:** {{order_id}}
> - **Refund Amount:** {{refund_amount}} {{currency}}
> - **Reason:** {{fail_reason}}
>
> We are working on it. Please contact your account manager for details.

**站内信（中文）：**

> **标题：** 退款异常
>
> 交易 {{order_id}} 退款异常。原因：{{fail_reason}}。请联系客户经理。

**站内信（English）：**

> **Title:** Refund Issue
>
> Transaction {{order_id}} refund issue. Reason: {{fail_reason}}. Please contact your account manager.

### 4.8 退款失败 → 通知销售

**邮件（中文）：**

> **主题：** 【退款异常】商户 {{merchant_name}} 的交易 {{order_id}} 退款异常
>
> 商户 **{{merchant_name}}**（MID: {{merchant_id}}）的退款异常。
> 原单号：{{order_id}} | 退款金额：{{refund_amount}} {{currency}} | 原因：{{fail_reason}}
>
> 请跟进处理。

**邮件（English）：**

> **Subject:** [Refund Issue] Merchant {{merchant_name}}'s transaction {{order_id}} refund issue
>
> Merchant **{{merchant_name}}** (MID: {{merchant_id}})'s refund issue.
> Order: {{order_id}} | Amount: {{refund_amount}} {{currency}} | Reason: {{fail_reason}}
>
> Please follow up.

### 4.9 退款失败 → 通知运营（飞书）

**飞书通知（中文）：**

> ❌ **退款异常**
>
> 商户：{{merchant_name}}（{{merchant_id}}）
> 原单号：{{order_id}}
> 退款金额：{{refund_amount}} {{currency}}
> 异常原因：{{fail_reason}}
> 时间：{{fail_time}}
>
> 请尽快跟进处理。

**飞书通知（English）：**

> ❌ **Refund Issue**
>
> Merchant: {{merchant_name}} ({{merchant_id}})
> Order: {{order_id}}
> Amount: {{refund_amount}} {{currency}}
> Reason: {{fail_reason}}
> Time: {{fail_time}}
>
> Please follow up immediately.

---

## 5. 通知模板汇总

### 5.1 全量通知清单

| # | 场景 | 状态 | 客户邮件 | 客户站内信 | 销售邮件 | 运营飞书 | 合规邮件 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | 产品开通 | 提交 | - | - | ✅ | ✅ | ✅ |
| 2 | 产品开通 | 通过 | ✅ | ✅ | ✅ | ✅ | - |
| 3 | 产品开通 | 拒绝 | ✅ | ✅ | ✅ | ✅ | - |
| 4 | 产品开通 | 补充材料 | ✅ | ✅ | ✅ | - | - |
| 5 | 开VA | 提交 | - | - | ✅ | - | - |
| 6 | 开VA | 成功 | ✅ | ✅ | ✅ | - | - |
| 7 | 开VA | 失败 | ✅ | ✅ | ✅ | - | - |
| 8 | 充币 | 到账 | ✅ | ✅ | ✅ | - | - |
| 9 | 充币 | 合规拦截 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 10 | 充币 | 补充资料 | ✅ | ✅ | ✅ | - | - |
| 11 | 入账(VA/法币) | 成功 | ✅ | ✅ | ✅ | - | - |
| 12 | 入账(VA/法币) | 合规拦截 | ✅ | ✅ | ✅ | ✅ | ✅ |
| 13 | 入账(VA/法币) | 补充资料 | ✅ | ✅ | ✅ | - | - |
| 14 | 入账(VA/法币) | 失败 | ✅ | ✅ | ✅ | - | - |
| 15 | 付款 | 提交 | - | - | ✅ | - | - |
| 16 | 付款 | 成功 | ✅ | ✅ | ✅ | - | - |
| 17 | 付款 | 失败 | ✅ | ✅ | ✅ | - | - |
| 18 | 提币 | 提交 | - | - | ✅ | - | - |
| 19 | 提币 | 成功 | ✅ | ✅ | ✅ | - | - |
| 20 | 提币 | 失败 | ✅ | ✅ | ✅ | - | - |
| 21 | 承兑 | 提交 | - | - | ✅ | - | - |
| 22 | 承兑 | 成功 | ✅ | ✅ | ✅ | - | - |
| 23 | 承兑 | 失败 | ✅ | ✅ | ✅ | - | - |
| 24 | 收款人 | 提交 | - | - | ✅ | - | - |
| 25 | 收款人 | 通过 | ✅ | ✅ | ✅ | - | - |
| 26 | 收款人 | 拒绝 | ✅ | ✅ | ✅ | - | - |
| 27 | 收款人 | 补充资料 | ✅ | ✅ | ✅ | - | - |
| 28 | 退款 | 发起 | ✅ | ✅ | ✅ | ✅ | - |
| 29 | 退款 | 成功 | ✅ | ✅ | ✅ | - | - |
| 30 | 退款 | 失败 | ✅ | ✅ | ✅ | ✅ | - |

### 5.2 通知变量清单

| 变量 | 说明 | 示例 |
| --- | --- | --- |
| `{{merchant_name}}` | 商户名称 | Acme Corp |
| `{{merchant_id}}` | 商户MID | M20260212001 |
| `{{tenant_name}}` | 租户名称 | Bonbil |
| `{{product_name}}` | 产品名称 | BB法币账户 |
| `{{currency}}` | 法币币种 | USD |
| `{{coin}}` | 数币币种 | USDT |
| `{{amount}}` | 金额 | 10,000.00 |
| `{{from_amount}}` | 源金额 | 10,000 |
| `{{from_currency}}` | 源币种 | USDT |
| `{{to_amount}}` | 目标金额 | 9,950.00 |
| `{{to_currency}}` | 目标币种 | USD |
| `{{exchange_rate}}` | 汇率 | 0.9950 |
| `{{fee}}` | 手续费 | $10.00 |
| `{{balance}}` | 余额 | 50,000.00 |
| `{{order_id}}` | 交易单号 | T20260212001 |
| `{{submit_time}}` | 提交时间 | 2026-02-12 13:00:00 |
| `{{complete_time}}` | 完成时间 | 2026-02-12 13:05:00 |
| `{{approved_time}}` | 审核通过时间 | 2026-02-12 14:00:00 |
| `{{review_time}}` | 审核时间 | 2026-02-12 14:00:00 |
| `{{arrival_time}}` | 到账时间 | 2026-02-12 13:02:00 |
| `{{activated_time}}` | 开通时间 | 2026-02-12 14:00:00 |
| `{{fail_reason}}` | 失败原因 | 收款人信息不匹配 |
| `{{reject_reason}}` | 拒绝原因 | KYC材料不完整 |
| `{{refund_reason}}` | 退款原因 | 银行退汇 |
| `{{refund_amount}}` | 退款金额 | 5,000.00 |
| `{{refund_target}}` | 退回目标 | BB法币账户 |
| `{{refund_time}}` | 退款时间 | 2026-02-12 15:00:00 |
| `{{fail_time}}` | 失败时间 | 2026-02-12 15:00:00 |
| `{{estimated_arrival}}` | 预计到账 | 1-3个工作日 |
| `{{required_documents}}` | 需补充材料 | 营业执照、交易合同 |
| `{{deadline}}` | 截止时间 | 2026-02-19 |
| `{{beneficiary_name}}` | 收款人名称 | John Smith |
| `{{bank_name}}` | 银行名称 | HSBC |
| `{{account_number_masked}}` | 脱敏账号 | ****1234 |
| `{{remitter_name}}` | 汇款人名称 | Jane Doe |
| `{{reference}}` | 汇款参考号 | REF20260212001 |
| `{{va_account_number}}` | VA账号 | 1234567890 |
| `{{from_address}}` | 来源地址 | 0x1234...abcd |
| `{{to_address}}` | 目标地址 | 0x5678...efgh |
| `{{tx_hash}}` | 交易哈希 | 0xabcd...1234 |
| `{{direction}}` | 承兑方向 | Off-Ramp |

---

*最后更新：2026-02-12*
*文档版本：v1.0*
