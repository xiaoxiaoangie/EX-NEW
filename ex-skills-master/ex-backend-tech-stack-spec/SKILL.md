---
name: ex-backend-tech-stack-spec
description: 后端微服务技术栈规范，定义项目允许使用的技术框架、版本号和禁止项。此skill不由用户直接触发，由其他职责skill触发加载。
---

# 技术栈规范

后端微服务统一技术栈规范，所有代码生成和技术选型必须遵循本规范。

## 核心约束

### 必须遵守
- JDK 11，不使用Java 8或更高版本特性
- Spring Boot 2.3.12.RELEASE 作为基础框架
- 使用MyBatis-Plus 3.4.1 作为ORM，禁止使用JPA/Hibernate
- 使用Jackson作为JSON序列化，禁止使用Fastjson
- 使用Lombok简化Java类构建
- 使用MapStruct进行DTO与领域对象转换

### 禁止使用
- JPA / Hibernate
- Fastjson / Gson
- Apache HttpClient（使用Feign或OkHttp替代）
- JDK 8以下或17以上语法特性

## 技术栈速查

| 类别 | 技术 | 版本 |
|------|------|------|
| JDK | Java | 11 |
| 构建工具 | Maven | - |
| 应用框架 | Spring Boot | 2.3.12.RELEASE |
| 微服务 | Spring Cloud | Hoxton.SR12 |
| 微服务扩展 | Spring Cloud Alibaba | 2.1.1.RELEASE |
| 编程语言 | Kotlin | 1.8.20 |
| 服务调用 | OpenFeign | 2.1.5.RELEASE |
| 负载均衡 | Netflix Ribbon | (随Spring Cloud) |
| 分布式追踪 | Spring Cloud Sleuth | (随Spring Cloud) |
| 注册/配置中心 | Nacos | (随Spring Cloud Alibaba) |
| ORM | MyBatis-Plus | 3.4.1 |
| 分页 | PageHelper | 5.2.0 |
| 数据库版本管理 | Liquibase | 3.10.3 |
| 数据库 | PostgreSQL Driver | 42.2.20 |
| 连接池 | HikariCP | (Spring Boot默认) |
| 缓存 | Redis + Lettuce | (Spring Boot默认) |
| 消息队列 | Kafka | (Spring Boot默认) |
| 任务调度 | XXL-Job | 2.4.1 |
| JSON序列化 | Jackson | (Spring Boot默认) |
| 对象映射 | MapStruct | 1.5.x |
| HTTP客户端 | OkHttp | 3.14.9 |
| 单元测试 | JUnit 5 | 5.9.3 |
| Mock框架 | Mockito | 3.9.0 |
| 辅助工具 | Lombok | (最新稳定版) |
| 工具库 | Apache Commons Lang3 | (最新稳定版) |
| 日志 | SLF4J | 1.7.36 |

## 代码生成规则

### pom.xml依赖声明
生成pom.xml时，获取完整的BOM和依赖声明。

### Spring Boot配置
- 使用`application.yml`或`application.properties`
- 数据库连接使用PostgreSQL，连接池为HikariCP
- Redis使用Lettuce客户端
- Kafka配置遵循Spring Boot默认集成方式

### 数据访问层
- 使用MyBatis-Plus的BaseMapper和IService
- 分页使用PageHelper插件
- 数据库变更使用Liquibase管理

### 服务间调用
- 内部服务调用使用OpenFeign声明式接口
- 外部HTTP调用使用OkHttp
- 负载均衡由Ribbon提供

### 序列化与对象映射
- Controller层JSON序列化使用Jackson，配置支持Java 8日期时间类型
- DTO与领域对象转换使用MapStruct接口
- 简单属性复制可使用BeanUtils

### 单元测试
- 使用JUnit 5编写测试
- 使用Mockito进行Mock
- 测试类命名：`XxxTest`或`XxxTests`

### 日志使用
- 统一使用SLF4J接口
- 配合Lombok的`@Slf4j`注解
- 禁止直接使用`System.out.println`