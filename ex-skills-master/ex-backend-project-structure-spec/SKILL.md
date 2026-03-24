---
name: ex-backend-project-structure-spec
description: 后端微服务工程结构规范，基于DDD分层架构和Maven多Module管理。定义Facade、Web、App、Domain、Infrastructure、Util各层的职责、依赖规则、命名规范和代码结构。此skill不由用户直接触发，由其他职责skill触发加载。
---

1. 总体结构

```
{工程代码}/
├── README.md                                        # 服务概要、目标、验收标准、服务依赖关系[人维护]
├── pom.xml                                          # 父POM，聚合管理子模块
├── lombok.config                                    # Lombok全局配置
│
├── {工程代码第一段}-{工程代码第二段}-facade/                             # Facade模块：对外暴露的API接口与DTO
│   ├── pom.xml
│   ├── lombok.config
│   └── src/main/java/com/eurewax/{工程代码第一段}/{工程代码第二段}/
│       └── facade/
│           ├── api/                                 # Facade接口定义
│           │   └── XxxFacade.java
│           └── dto/                                 # 请求/响应DTO
│               ├── XxxRequest.java
│               └── XxxResponse.java
│
├── {工程代码第一段}-{工程代码第二段}-service/                            # Service模块：核心业务实现
│   ├── pom.xml
│   ├── lombok.config
│   └── src/
│       ├── main/
│       │   ├── java/com/eurewax/{工程代码第一段}/{工程代码第二段}/
│       │   │   ├── {工程代码第一段}{工程代码第二段}Application.java      # SpringBoot启动类
│       │   │   │
│       │   │   ├── web/                             # 接入层（Web）
│       │   │   │   ├── controller/
│       │   │   │   │   └── XxxController.java
│       │   │   │   ├── listener/                    # 事件监听器
│       │   │   │   │   └── XxxListener.java
│       │   │   │   ├── converter/                   # DTO转换器
│       │   │   │   │   └── XxxConverter.java
│       │   │   │   └── job/                         # 调度任务
│       │   │   │       └── XxxJobHandler.java
│       │   │   │
│       │   │   ├── app/                             # 应用服务层
│       │   │   │   └── service/
│       │   │   │       ├── XxxAppService.java
│       │   │   │       └── impl/
│       │   │   │           └── XxxAppServiceImpl.java
│       │   │   │
│       │   │   ├── domain/                          # 领域层（DDD核心）
│       │   │   │   ├── aggregate/                   # 聚合根
│       │   │   │   │   └── Order.java
│       │   │   │   ├── entity/                      # 领域实体
│       │   │   │   │   └── OrderItem.java
│       │   │   │   ├── vo/                          # 值对象
│       │   │   │   │   └── Money.java
│       │   │   │   ├── factory/                     # 工厂
│       │   │   │   │   └── XxxFactory.java
│       │   │   │   ├── repository/                  # 仓储接口
│       │   │   │   │   └── XxxRepository.java
│       │   │   │   ├── service/                     # 领域服务
│       │   │   │   │   ├── XxxDomainService.java
│       │   │   │   │   └── impl/
│       │   │   │   │       └── XxxDomainServiceImpl.java
│       │   │   │   ├── event/                       # 领域事件
│       │   │   │   │   └── XxxEvent.java
│       │   │   │   └── acl/                         # 防腐层接口
│       │   │   │       └── ExternalXxxService.java
│       │   │   │
│       │   │   ├── common/                          # 公共层
│       │   │   │   ├── enums/                       # 枚举定义
│       │   │   │   │   └── XxxEnum.java
│       │   │   │   └── error/                       # 错误码定义
│       │   │   │       └── {工程代码第一段}{工程代码第二段}Errors.java
│       │   │   │
│       │   │   └── infrastructure/                  # 基础设施层
│       │   │       ├── config/                      # 配置类
│       │   │       │   └── XxxConfig.java
│       │   │       ├── acl/                         # 防腐层实现
│       │   │       │   └── ExternalXxxAclImpl.java
│       │   │       └── repository/                  # 仓储实现
│       │   │           ├── XxxRepositoryImpl.java
│       │   │           ├── converter/               # PO与领域对象转换器
│       │   │           │   └── XxxConverter.java
│       │   │           ├── mapper/                  # MyBatis Mapper接口
│       │   │           │   └── XxxMapper.java
│       │   │           └── po/                      # 持久化对象
│       │   │               └── XxxPO.java
│       │   │
│       │   └── resources/
│       │       └── db/
│       │           └── changelog/                   # Liquibase数据库变更
│       │               ├── db.changelog-master.xml
│       │               └── 1.0.0/
│       │                   └── 001-create-tables.xml
│       │
│       └── test/
│           └── java/com/eurewax/{工程代码第一段}/{工程代码第二段}/
│               ├── unit/                            # 单元测试
│               │   ├── web/
│               │   │   └── controller/
│               │   │       └── XxxControllerTest.java
│               │   ├── app/
│               │   │   └── service/
│               │   │       └── XxxAppServiceTest.java
│               │   └── domain/
│               │       └── service/
│               │           └── XxxDomainServiceTest.java
│               └── integration/                     # 集成测试（针对API）
│                   └── XxxFacadeIntegrationTest.java
│
├── start_model/                                     # 启动模型（非Maven子模块）
│   ├── cabin/                                       # Cabin容器启动
│   │   ├── pom.xml
│   │   ├── biz-module.yml
│   │   └── {工程代码第一段}{工程代码第二段}Application.java
│   └── local/                                       # 本地独立启动
│       ├── pom.xml
│       └── {工程代码第一段}{工程代码第二段}Application.java
│
└── docs/                                            # 项目文档
    ├── tests/                                       # 测试文档
    │   └── full-testcases.md                        #【AI生成，人确认】增量累积
    ├── requirements/                                # 需求文档（仅保留每次任务单的增量需求描述）
    │   └── {JIRA}-{YYYYMMDD}-{需求简述}/           # 每个任务的文档目录
    │       ├── {JIRA}-prd-{YYYYMMDD}-{需求简述}.md   #【产品提供 或 AI 辅助生成，人确认】PRD
    │       ├── {JIRA}-reqanalysis-{YYYYMMDD}-{需求简述}.md #【AI生成】需求分析报告
    │       ├── {JIRA}-testcase-{YYYYMMDD}-{需求简述}.md    #【AI生成】测试用例
    │       ├── {JIRA}-testreport-{YYYYMMDD}-{需求简述}.md  #【AI生成】测试报告
    │       └── {JIRA}-changelog-{YYYYMMDD}-{需求简述}.md   #【AI生成】变更记录
    ├── designs/                                     # 设计文档
    │   ├── full-prd.md                              #【AI生成，人确认】本服务业务设计的全量文档，增量累积
    │   ├── full-architecture-design.md               #【AI生成，人确认】增量累积
    │   ├── full-api-design.md                       #【AI生成，人确认】增量累积，代码生成时严格遵循
    │   └── full-database-schema.md                  #【AI自动维护】数据库表结构全景
    ├── external-apis/                              # 外部系统接口文档【人维护】
    │   └── {外部系统名}/
    │       ├── README.md                            # 系统概述、对接方式
    │       ├── 原始文档.pdf                          # 原始接口文档（如有PDF）
    │       └── used-apis.md                         # 本项目使用的接口清单
    └── internal-apis/                               # 内部服务Facade契约【人维护】
        └── {服务名}/
            └── used-apis.md                         # 本项目使用的Facade接口清单
```

2. 分层说明
遵循DDD架构模式，代码分为外观层（Facade）、接入层（Web）、应用层（Application）、领域层（Domain）、基础设施层（Infrastructure），以及工程公共（Common）。分成两个Maven Module：facade（Facade层）和service（其他各层）进行管理。

2.1 外观层 (Facade)
职责：
- 仅用于定义系统对外提供的Restful接口和数据传输对象DTO
- 适用于Feign框架，不含业务逻辑和接口实现
关键规则：
- 不允许依赖任何其他层，数据类型只允许使用DTO或基本类型
- facade/api中只定义接口interface，interface需要添加如下声明：@FeignClient(value = {工程代码}, contextId = {Facade名称，首字母小写})
- 接口访问路径声明在facade中，Controller不要声明接口路径
- DTO必须与API定义信息的请求参数和响应参数保持一致
- DTO要声明参数的校验规则，使用Spring的Bean Validation机制
命名规范：
- DTO请求对象：{Action}{Resource}Request - 例如：CreateOrderRequest
- DTO响应对象：{Action}{Resource}Response - 例如：CreateOrderResponse
- API接口：{Resource/Domain}Facade - 例如：PaymentOrderFacade

2.2 接入层 (Web)
职责：
- 作为系统与外部世界的连接点，转换外部请求为内部命令
- 负责数据验证、转换和路由，不包含业务逻辑
关键规则：
- 只能依赖外观层、应用层、领域层和公共工具，禁止依赖基础设施层
- web/controller中的Controller实现Facade的interface
命名规范：
- 控制器：{Resource/Domain}Controller - 例如：PaymentOrderController
- 事件监听器：{Event}Listener - 例如：OrderEventListener
- 任务处理器：{Task}JobHandler 或 {Task}Scheduler - 例如：OrderExpiryJobHandler
- 转换器：{DomainObject}Converter - 例如：CustomerConverter

2.3 应用层 (App)
职责：
- 编排业务流程，协调领域对象，处理事务边界和安全控制
关键规则：
- 只能依赖领域层和公共工具，禁止依赖其他层
- 禁止在App层做业务规则判断
- 禁止在App服务里直接调用Repository
- 禁止在应用层定义和引入DTO
命名规范：
- 应用服务：{Domain}AppService - 例如：OrderAppService
- 应用服务实现：{Domain}AppServiceImpl - 例如：OrderAppServiceImpl

2.4 领域层 (Domain)
职责：
- 封装核心业务逻辑和规则，定义与外部系统交互的接口(acl)
- 包含所有业务规则和逻辑，领域对象应保持状态一致性
关键规则：
- 只能依赖公共工具，禁止依赖其他层
- 禁止在领域层定义和引入DTO
命名规范：
- 实体/值对象/聚合：使用业务概念名称 - 例如：Order, Customer, Money, Address
- 工厂：{Product}Factory - 例如：OrderFactory
- 领域服务：{Domain}Service - 例如：OrderService
- 领域服务实现：{Domain}ServiceImpl - 例如：OrderServiceImpl
- 仓储接口：{Domain}Repository - 例如：OrderRepository
- 领域事件：{Aggregate}{Action}Event - 例如：OrderCreatedEvent
- 外部服务访问接口：{ExternalSystem}Acl - 例如：PaymentServiceAcl

2.5 基础设施层 (Infrastructure)
职责：
- 提供技术实现和外部系统集成，处理数据库访问、消息队列、外部API等
- 使用防腐层以隔离外部系统
- 实现领域层定义的接口(acl)和仓储接口(repository)
关键规则：
- 只能依赖应用层、领域层和公共工具，禁止依赖其他层
命名规范：
- 仓储实现：{Repository}Impl - 例如：OrderRepositoryImpl
- 持久化对象：{Entity}PO - 例如：OrderPO
- 外部服务访问实现：{ExternalSystem}AclImpl - 例如：PaymentServiceAclImpl
- MyBatisPlus Mapper：{Entity}Mapper - 例如：OrderMapper
- 转换器：{DomainObject}Converter - 例如：CustomerConverter

2.6 公共工具 (Common)
职责：
- 包含通用的枚举（状态、类型、错误码）等
关键规则：
- 禁止依赖其他任何层
- 错误码必须集中定义在一个枚举类中（{工程代码第一段}{工程代码第二段}Errors.java），禁止分散定义
命名规范：
- 枚举类：{Concept}Enum - 例如：OrderStatusEnum

3. 文档维护职责

项目文档分为两类：
- **【人维护】**：业务意图、目标、验收标准、外部依赖关系——AI 无法自行决定的方向性内容
- **【AI生成/维护】**：领域模型、接口设计、数据库 schema、测试用例等——AI 在开发流程中自动生成和增量更新

标注为【AI生成，人确认】的文档，AI 生成后需等待人确认才能作为后续阶段的输入。
标注为【AI自动维护】的文档，AI 在开发过程中自动更新，无需人确认。

4. 数据库表结构全景 (full-database-schema.md)
职责：
- 维护当前数据库所有表的结构全景，AI 做数据库变更时先读此文件理解现状
维护规则：
- AI 在代码生成阶段（生成 Liquibase changelog 后）自动更新此文件
- 每张表记录：表名、用途说明、字段清单（字段名、类型、说明、约束）
- 增量模式下仅更新变更涉及的表，不重写未变更的表

5. 外部系统接口管理 (External APIs)
职责：
- 管理本项目调用的外部系统接口文档，按外部系统分目录存放
目录结构：
- `docs/external-apis/{外部系统名}/` 每个外部系统一个子目录
文件说明：
- `README.md`：系统概述和对接方式，包括系统描述、环境地址、认证方式等
- `原始文档.pdf`：外部系统提供的原始接口文档（如有PDF文件）
- `used-apis.md`：本项目使用的接口清单，仅记录索引信息，不重复维护接口详情
`used-apis.md` 格式：

| 接口名称 | 本项目调用场景 | 文档链接 |
|---------|--------------|---------|

- 文档链接列：如果所有接口在同一文档/链接中，头部统一标注，该列可留空；如果每个接口有独立链接，各自标注
- 接口的请求参数、响应参数等详情不在此维护，开发时直接查阅原始文档或链接

6. 内部服务Facade契约管理 (Internal APIs)
职责：
- 管理本项目通过Feign调用的系统内其他微服务的Facade接口，按服务分目录存放
目录结构：
- `docs/internal-apis/{服务名}/` 每个依赖的内部服务一个子目录
文件说明：
- `used-apis.md`：本项目使用的Facade接口清单，记录调用了对方哪些Facade接口和方法
`used-apis.md` 格式：

| Facade接口 | 方法 | 本项目调用场景 |
|------------|------|--------------|

- Facade接口的详细定义以对方服务的facade jar包中的代码为准，不在此重复维护
- 代码层面，调用内部服务同样通过 `domain/acl/` 定义接口 + `infrastructure/acl/` 实现（通过Feign调用对方facade）