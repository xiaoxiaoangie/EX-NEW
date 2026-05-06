1. # 版本管理

| 版本 | 修改人 | 修改时间   | 修改内容 |
| ---- | ------ | ---------- | -------- |
| V1.0 | 刘潇潇 | 2025-06-03 | 创建文档 |

2. # 名词解释

| 名词                  | 解释                                                                                                                                           |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| 资金转入产品`` | 为了代付，而进行“充值”，是基础产品* 因为“充值”比较敏感，所以先用“资金转入”代替* 付款可以付款到体系外的钱包/银行账户，也可以付款到IPL账户 |
| 付款到IPL产品         | 付款到IPL账户，是基础产品* 资金来源可以是转入的资金，也可以是``                                                                         |
| MCT                   | 新加坡做线下pos 收单的机构                                                                                                                     |

3. # 主要功能列表

| 端        | 模块                      | 功能列表                                               | 备注                           | `` |
| --------- | ------------------------- | ------------------------------------------------------ | ------------------------------ | --------- |
| MCT 租户  | 会员账户``         | 参考现在的账号中心``                            | 本期，权限可以先不开，后续再开 | `` |
| `` | 资金账户``         | 余额账户展示流水``                              | ``                      | `` |
| `` | 入账管理``         | 资金转入- 账户展示入账管理                             | 需要补充材料等                 | `` |
| `` | 商户结算``         | 批次处理记账增加交易类型                               | ``                      | `` |
| `` | 交易查询``         | 入账记录结算批次结算记录导出                           | ``                      | `` |
| `` | 商户管理                  | 商户入网信息-参考现在                                  | ``                      | `` |
| `` | 商户结算账户查询`` | 结算账户查询``                                  | ``                      | `` |
| `` | 商户账户管理``     | 余额查询冻结/解冻                                      | ``                      | `` |
| `` | 商户计费与汇率``   | 商户结算计费（a2a)商户结汇费率商户外币出款费率商户汇率 | A2A 计费是否可以暂缓？         | `` |
| `` | 商户交易查询``     | 换汇记录查询出款记录查询                               | ``                      | `` |
| `` | ``                 | 商户订单管理``                                  | 可以 传送订单，生成结汇额度    | `` |
| 子商户    | 结算账户                  | ``                                              | ``                      | `` |
| `` | 账户余额                  | 新交互                                                 | ``                      | `` |
| `` | 账户流水                  | ``                                              | ``                      | `` |
| `` | 换汇                      | 参考之前- 创建页面                                     | ``                      | `` |
| `` | 提现/结汇/极速结汇        | 参考之前* 创建页面                                     | ``                      | `` |
| `` | 交易查询                  | 结算+换汇+出款* 导出                                   | ``                      | `` |
| `` | 账号中心                  | 参考之前                                               | ``                      | `` |
| OP        | 资金转入                  | 产品配置                                               | ``                      | `` |
| `` | ``                 | 机构资金转入交易                                       | ``                      | `` |
| `` | ``                 | 资金转入工单                                           | ``                      | `` |
| `` | 结算代发                  | 商户结算账户                                           | ``                      | `` |
| `` | ``                 | 产品配置                                               | ``                      | `` |
| `` | ``                 | 结算交易查询                                           | ``                      | `` |
| `` | ``                 | 结算审核工单                                           | ``                      | `` |
| `` | ``                 | 结算批次查询                                           | ``                      | `` |
| `` | 商户计费                  | 新增2个计费                                            | ``                      | `` |
| `` | 子商户额度                | 用现在站点额度查询                                     | ``                      | `` |
| `` | 子商户结算金额            | ``                                              | ``                      | `` |
| `` | 主子账户关系              | 原来的页面                                             | ``                      | `` |
| `` | 账户余额账户流水          | 原来的页面                                             | ``                      | `` |

4. # 需求描述
5. ## MCT现有流程

   * 有自己的收单平台，只有收单订单，和结算报表
   * 结算线下处理，收单行结算给机构，机构一笔笔结算给到商户（个别有本地账户，大部分是其他支付机构va)；
     * 结算周期T+3, 但是结束T+4（打款后，t+1)到账
     * 本地商户不走我们，都是大陆商户
6. ## MCT需求

   * 节省成本，目前对中国客户的打款都是swift
   * 打款到收单商户的结算中账户
     * 目前MCT 不能接受结算账户是ipaylinks 账户
     * 只能接受va账户
     * 商户也要看到来款方是mct
   * 时效要求：到账时效要在T日或者T+1； 跟商户有基本的约定，违约后会有违约金；
   * 异常情况，控制客户资金；
     * 非常极端情况：有较大的罚款，下个结算周期的正向资金和循环保证金已不能cover
   * 提升处理效率
     * 客户的入网信息可以API 传送过来，不需要mct 一个个人工开户
     * 结算可以批量操作
     * 交易信息等可以传给对方，节省财务操作成本
7. ## MCT商户需求

* 操作简单
  * 不需要自己再在走一次开户流程
  * 结汇时不需要再自己上传一次还原订单
    * 通过别的渠道结汇，每笔入账需要提交还原订单明细

4. ## IPL- MCT 收益支出

* IPL与MCT
  * IPL 给MCT商户入账的代理底价
  * IPL 给MCT换汇和结汇的代理的汇率底价
  * IPL 给MCT结汇和付款的代理底价
* MCT 和商户
  * MCT 给商户报价：换汇，结汇汇率
  * MCT给商户定价：结算（入账），结汇，付款
* MCT 支出和收益
  * 支出
    * 银行打款结算给商户的费用
    * EX 费用：技术服务费
* IPL 收益
  * 商户入账收费- 入账底价
  * 汇率差= mct 给客户的报价- ipl给MCT的汇率底价
  * 费率差= MCT 收商户的结算费用- ipl 收MCT的入账费用

5. # 方案可以为收单机构做什么

![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTkyOTA0MTM5YjI4OGIzZWU0ZjY4NmVhOTllMDY2M2JfMUx5YnFBRFcyYjg4RDJ6clpFUkVJQk4wQ3FLVmY0TkRfVG9rZW46UXFCVmI5Rm96b29ZWTR4bUtYMGNxWDJ6bkFoXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

6. # 业务流程
7. ## 业务流程
8. 时序图

**暂时无法在飞书文档外展示此内容**

2. ## 资金流

**暂时无法在飞书文档外展示此内容**

7. # 账户关系与商户入网
8. ## MCT机构商户 身份

   * EX 租户- 开通白牌业务以及部分API 技术能力
   * 主子账户- 机构主账户，可以向子商户结算，管理子商户账户
   * 代理商- 代理EX 合作支付机构（IPL）的收付款产品，拿EX返点
9. ### 机构客户入网-开主账户

* MCT 入网，开通“收单机构与子商户”产品

  * 利用IPL的主子账户，创建一个新账户关系
  * 注意商户新加坡主体，签约的也是pte(新加坡主体），不能开通预约付款产品
    ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=NmIzNTQwZDRjZmQyZWMyMzIyNjBiMmUxMzQ0YmI4MDdfbjMzU0RBc1hxOWFwbmZoYUtuQWpWd2lWRUxYbzdyTEdfVG9rZW46VjRhT2IxcDd6b1UxRFd4YzZ3VmN3dHRUbktmXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

  ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=MzBiODZiYjZhODE4YWEwMjcwMTYwMTJjMGM0MjFlZWVfQlhXNFhqZXpQVkkxWEx2UDlBQmdYNXo2Mm5HaVNSNURfVG9rZW46QTdEMmJ6Rktib25Hd1N4WFFpUGNDcmFSbmtiXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

  ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTlmODc2ZThlYjlhNTJiNWFkYWYyYjgzYzcwMWVmMGRfM2lJNEp3b0NBQWljZVptbHFqOVV6S0FLalRFSjE1a0JfVG9rZW46TzA2RmIydXFMb1JXQWZ4bnozZ2NIczYwblFkXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)
* MCT 需要绑定邮箱，因为跟mct 间的通知，是通过邮箱通知的；

2. ## 子商户入网

* 通过api 方式入网

**暂时无法在飞书文档外展示此内容**

1. 针对mct /traxx的客户，API推送信息后，登录租户mp, 系统判断是否有设置密码，如果没有设置密码，输入手机号后，会跳转这是密码页面，设置密码。然后登录。
2. # 产品结构

**暂时无法在飞书文档外展示此内容**

1. ## 资金转入产品
2. ### 交易流程

* **本期暂不增加账户，入账到B2B 账户**
* 交易按照入账交易流程

**暂时无法在飞书文档外展示此内容**

2. ### 状态图

**暂时无法在飞书文档外展示此内容**

3. ### 资金转入产品能力


   * 产品能力
     * 产品能力：定义资金转入产品能为提供什么能力，有什么限制；
     * ben

   | 产品              | 产品形态                  | 转入币种         | 限额                                                                     | 商户主体要求                                                                                                                                                 | 汇款方要求                                            | 交易币种-账户币种                                                                     | 备注      |
   | ----------------- | ------------------------- | ---------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- | ------------------------------------------------------------------------------------- | --------- |
   | 资金转入`` | 转入到客资大账户`` | USD,SGD`` | * 单笔/单日* 可以选择无限额* - 本期都是无限额* 可以输入具体限额`` | * 主体所在国家* 枚举跟kyc 主体所在国家一致* 主体类型=个人/企业* 跟kyc 一致* 商户身份类型=psp/普通客户* 历史数据都是普通客户* Mct 入网后搭上psp 标签`` | * 没举：同名，法人/董事/其他人* MCT 只能同名`` | * 可以同币种* 本期只支持同币种* 可以不同币种* 暂不支持，后续支持需要关注汇率`` | `` |
   | ``         | 转入到va账户``     | 同上本期暂不支持 | ``                                                                | ``                                                                                                                                                    | ``                                             | ``                                                                             | `` |

   * 交互
     * 见交互图
4. ### 渠道路由


   * 现有渠道路由，配置资金转入（原来的充值）；

     * DBSSG 配置一条充值的渠道能力
       ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=OGRhODlmZTBjNGJiNzNkZDY3MDJmNmZjZWI5NzgzN2RfOWt0cFhURG5rN1JXdGhXQ3QycTdTWVN4aWNMSG1XNFVfVG9rZW46RE5Hd2JicEhYb2Z2V2J4SlYzamNyU0VsbjliXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

     ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=NzFiMzg5MTc1MDMzOTRlNGRlN2I0NmZiNmM1M2M2NDhfamdOclJkVjcxZEVIZUNBRHFNS05VRUZtSXhBZ1FObGVfVG9rZW46SFdSc2JuQUNpb2g3VTR4aEFtS2NDakRCbkVrXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

     * 针对mct 商户特殊配置路由到具体的渠道，比如DBSSG
       * 参考原来预约付款，或者是浙商银行大账户的方式
5. ### 产品计费


   * 计费配置

![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZTA4YmZjNTU5NDZjZDM1MGQ1YTQ0ZWM1ZGJmY2Q2NTlfOElreHhKVDA0Sm1tTFlyNE5PNDhNb2thSjBJamlkS3BfVG9rZW46Q256cmJmVzJZb1ZtUW94ZkFNdWNtcVhzbmZlXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

* 计费因子
  * 指定费用，
    * 费用项：交易手续费
  * 计费因子
    * 银行
    * 收款账户类型（大账户/va)
    * 收款币种
    * 汇款国家

6. ### 审核工单

* 用例名称：机构账户充值交易工单审核
* 使用者：op合规运营
* 使用场景：1） 进人工后审核，2）查询所有审核工单
* 优先级：P1
* 审核状态图

**暂时无法在飞书文档外展示此内容**

7. ### 入账记账

   * 使用现在的入账交易的记账
8. ### ADMIN交互

* 见交互图

9. ### OP 交互

   * 见交互图
   * 资金转入工单跟普通入账工单区分
10. ### 通知

* 通过邮件通知；

2. ## 结算代发

* 资金性质为独立站来款，所以结算到子商户到B2C账户
* 结算交易字段- api| 字段           | 是否必填 | 解释                                     | 格式要求                           |
  | -------------- | -------- | ---------------------------------------- | ---------------------------------- |
  | 结算交易ID     | 必填     | MCT 侧的交易编号                         | 开发定义                           |
  | 交易类型       | 必填     | * 结算* 扣回                             | ``                          |
  | 交易金额       | 必填     | 结算代发的金额                           | 符合币种精度要求                   |
  | 交易币种       | 必填     | 机构账户的出金账户币种                   | 币种三字码                         |
  | 商户唯一标识号 | 必填     | 商户在收单机构的唯一标识号               | ``                          |
  | 商户结算账户   | 必填     | 当前商户的结算账户                       | 跟商户唯一标识号匹配               |
  | 结算账单ID     | 必填     | keyi                                     | ``                          |
  | 结算日期：     | 非必填   | 扩展字段                                 | 日期格式，可以兼容多种正常日期格式 |
  | 关联交易编号   | 非必填   | 如果是反向交易，可填写关联的正向交易编号 | 开发定义                           |
  | 转账备注       | 非必填   | 商户可见                                 | 开发定义                           |

3. ## 结算账户（va账户）

   * 子商户：
     * 商户审核通过后，自动分配一个bc-dk的全球收款账号
     * 子商户展示，复制自己结算账户信息
       * 原因：这个va 实际不会做入账，只是给mct 一个结算账户，进件收单行，分配MID；
       * Dk 账号需要测试，mct 背后收单行不一定认可；不认可再找其他银行；
   * Va 账户不能做入账
     * 风控规则配置，这些va 入账自动拒绝；
4. ### 基础校验

**暂时无法在飞书文档外展示此内容**

2. ### 结算流程

**暂时无法在飞书文档外展示此内容**

* 业务规则
  * 背景：子商户所有的资金都是来自mct，所以出现风险事件，需要补充资料等，都是需要MCT 提供；
  * 风险点：结算给子商户的金额大于 子商户在mct 交易产生的结算款；
  * 风控
    * 进人工，会耽误结算时效；
    * 因为双方都做了kyc ，子商户清楚了解是从mct 机构入网
    * 提交mct 核对过的结算单；
      * 可以后置调单，补充；

3. ### 状态图


   * 批次状态图
     * 参考批量付款
   * 交易状态图

   **暂时无法在飞书文档外展示此内容**
4. ### 产品能力

* 产品能力持续补充| 产品      | 结算到账币种     | 结算交易限额    | 服务时间  | 处理时效      | 费用承担方                         | 备注      |
  | --------- | ---------------- | --------------- | --------- | ------------- | ---------------------------------- | --------- |
  | 结算代发  | = 主账户转出币种 | 无限额`` | 7*24小时  | 实时`` | 单选：收款方/ 转出方；发起方指定； | `` |
  | `` | ``        | ``       | `` | ``     | ``                          | `` |

5. ### 计费配置

![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=NzY2ZTY2YzhmZGZkNmRiOTNhYzIyZjdjOTE5M2Q4OTlfU0o0MG1IeGdDQ01PRUJnTUhVNkx0NWtoYXg3d2lPeWZfVG9rZW46VXc4aGJlUmNFb3BUZVF4Z2VZdGNsVmxFbmhoXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

* 计费参数
  * 指定费用
  * 计费因子：结算币种，交易类型（结算/扣回）
  * 费用项名称：交易手续费

6. ### 交互


   * ADMIN 交互
     * 参考批量付款交互
   * 商户端交互
     * 参考交互图
   * OP交互
     * 参考交互图

   7. ### 通知

      * 结算验证通知
7. ## 账户相关内容
8. ### 基本规则

* 本期主账户B2B账户，子商户用B2C-  账户
* 基本规则：  可用余额+冻结余额=总余额
* 机构主账户余额账户业务规则
  * 默认展示**配置的充值币种**
    * 优先展示余额大于0 ，按照余额数字大小 排列，展示数字最大的；
      * 主账户的账户币种目前不多，因为不能换汇
    * 默认顺序：USD, EUR, GBP,SGD ,CNH...
* 子商户余额账户业务规则
  * 默认展示跟主账户一样的币种账户
  * 优先展示余额大于0 ，按照余额数字大小 排列，展示数字最大的；
    * 子账户的账户币种会多，因为可以换汇等
  * 默认顺序：USD, EUR, GBP,SGD ,CNH...

2. ### Admin 管理子商户的账户

* 冻结，解冻逻辑
  * 冻结金额不能超过可用余额
  * 针对每一条冻结记录进行解冻
  * 记录冻结方，如果是op （system ) 冻结的余额，主账户不能给子账户解冻
  * 展示冻结原因（op 输入的对外展示原因，租户填写的冻结备注）

3. ### Admin 和商户账户流水

| 名称      | 解释/例子                                | 备注                                                                                                                                                                         |
| --------- | ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 交易编号  | 资金转入交易编号换汇交易编号结算交易编号 | ``                                                                                                                                                               |
| 交易类型  | 资金转入/换汇/结算/冻结/解冻             | ``                                                                                                                                                                    |
| 明细类型  | 资金转入/退回                            |                                                                                                                                                                              |
| 换汇      |                                          |                                                                                                                                                                              |
| 结算/扣回 | ``                                |                                                                                                                                                                              |
| 资金类型  | 本金手续费                               | ``                                                                                                                                                                    |
| 金额      | 金额                                     | ``                                                                                                                                                                    |
| 币种      | 币种                                     | ``                                                                                                                                                                    |
| 创建时间  | 创建时间                                 | ``                                                                                                                                                                    |
| 交易描述  | 交易描述                                 | 不同交易类型展示不一样结算：* 主账户展示交易批次号，和交易对手方* 子账户：展示交易对手方换汇：展示换汇货币对出款：收款人名称资金转入：汇款方名称冻结：展示冻结原因解冻：留空 |

4. ### 记账规则


   * 结算代发：增加交易类型=结算代发
5. ### 交互


   * ADMIN 交互
     * 参考交互图
   * 商户交互
     * 参考交互图
   * OP 交互
     * 使用现在的余额和流水
6. ## 子商户换汇/结汇


   * 参考现在
   * 包括实时换汇和极速结汇
7. ## 子商户提现/付款


   * 参考现在的提现/付款流程
   * 包括添加收款人
8. ## 子商户结汇额度
9. ### 获取订单方式


   * 需要mct 提供以下API 接口，
     * 订单信息+ 物流信息：查询接口
       * 用途：生成子商户的结汇额度
     * 获取结算账单：
       * 结算账单具体字段 待跟对方核对
       * 用途：确认实际 从ipl 结算的资金是否可以跟 收单系统的结算账单匹配起来；
10. ### 业务逻辑


    * MCT 侧保存EX 返回的子账户号码，子账户的结算账户；EX侧保存mct 商户返回的子商户唯一标识号
      * MCT 一个账号，对应一个MCC;  所以一个商户的贸易模式是固定的，不会出现一个客户既有服贸，又有货物贸；
    * 子商户的b2c站点=其他独立站
11. ### 交互


    * ADMN交互
      * 参考交互图
    * 商户交互
      * 参考交互图
    * OP交互
      * 使用现在的商户站点额度统计
12. ## 租户给子商户计费


    * 结算代发 计费
      * 租户代理产品增加：结算代发

    ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=MDU1YTQ0NThkNmFlNzAxYmU1ZjUzMmMwYjE5M2M5ZTJfbGxNeEhNSDMyeFRNMWliYlZnSmQwTU5UZHNZZlFKRkhfVG9rZW46T2ZuaWJDTGNpb2pvenB4eEdsdmN0am1lbkxiXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

    * 代理商底价，增加产品，底价是0
    * 收入全部返给代理商

    ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=NTdiMGU2MjNlMzgxNmMwNGY3N2U1YTZkNThiYzQxMjJfbVEyV1hCZXBqSUJUUmlWUzltbXF2cUtDSXFhZ3g4SE1fVG9rZW46THloaGJZamxKb2cxeE14OXhoSWNWdkJ2bkRiXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

    * 全球付款和本地付款计费
      * 参考新的计费逻辑和交互
    * 结汇计费
      * 参考新的结汇交互
    * 汇率
      * 参考现在的汇率报价
13. ## 通知
14. ### 通知方式

* 背景：mct 时新加坡的psp,  子商户用大陆手机注册；无法实现境外主体向境内发短信
* 方案
  * 验证码类的，使用验证器接收验证码（类似现在境外主体的otp 登录验证）
    * 避免了短信签名等
  * 其他通知类
    * 用邮件通知

2. ### 通知内容

   | 通知场景 | 类型 | 通知内容 | 备注 |
   | -------- | ---- | -------- | ---- |
   | ``       | ``   | ``       | ``   |
   | ``       | ``   | ``       | ``   |
   | ``       | ``   | ``       | ``   |
3. ### 验证方式配置


   * 沿用现在的模式，资金操作类的交易，交易逻辑中，一定需要验证
   * 账户验证，增加验证方式“验证器”；
     * 历史的都为短信验证
     * MCT 的子商户为验证器； what'app

   ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGIyZDI4MWNjOWM5Zjk0OTFhOTM5NjI0OWE5OTZkZmNfUzVrdUxZWWc5ZlRHdnZqZVRueVU4ZWRRRjg1QlhYc1FfVG9rZW46THhrRmJwbVRXb0RSNEl4d2JSOWMwckRHbnBkXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)
4. ## 实名认证


   * MCT 主账户

     * MCT 主账户是一家psp,  实名认证需要增加字段“ 商户身份类型” ；展示在实名认证审核工单+ 实名认证查询列表和 详情
       ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=OGFjNWIwY2IxZTA0NTI0MjU2N2QwMTU5ZWUzNWE1MGZfeURLZ21OZEoySVJNMUxwTVBJczV0QVVPRlJqZVJGMnVfVG9rZW46R2ZtWGJqZm54b2JTR294Wk13SmNEdlpSbjRiXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

     ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=NDA1MjQxODI1ZTljOGQ4ZDU5NDkyYzBmYmVkMWE3NjZfeFJJdERNQzJOYk1lb2JrdURDZFI0ajZxQ1lJd3Z0clFfVG9rZW46R0JWRWJIOWd4b2ZBM2p4S04yQWNSNkw4bldmXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)

     * 并自动对mct 主账户打标签：PSP
       * 因为很多页面都是要知道客户的身份，如果每个页面都加就很麻烦，借助商户身份标签的能力在相关页面展示
         ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=YWI1YTkwOWRhNDI0ZDAwY2UzNWUwZGI2MDAxODAzNzVfcjZCYndxUGZvYWcwMW5temthSnJ1d3BtTjVVVG5EMWlfVG9rZW46WFRTeWJLYkdpb1NuRzB4c0c3QmNnTDNjbmtlXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)
   * Mct 的子账户

     * MCT 的子账户来源需要知道是MCT
     * Mct 开通了代理商产品，借助代理商账户号码，展示mct 的账户号码；
       ![](https://m0t7yytxafc.feishu.cn/space/api/box/stream/download/asynccode/?code=ZGFhMzljNjZhZDRlZGRkMmEyN2Q3NzkyNWZkOTY1NGFfcUhKYjRaQ0xpaGhHTkU0akFwMVN2TGFLSFNhMUJEWFhfVG9rZW46SjdWd2IxSjA0b1QyMnZ4WkxEbGN3VEg2bm9oXzE3Nzc5ODU2NDE6MTc3Nzk4OTI0MV9WNA)
5. ## 其他


   * 多语言
     * MCT （租户admin ) 是新加坡主体，会用到英文
     * 客户：本期是中国客户，用中文可以，后续会有新加坡客户，需要用到英文
6. ## 交互
