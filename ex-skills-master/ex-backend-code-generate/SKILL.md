---
name: ex-backend-code-generate
description: 后端微服务代码生成规范，基于设计文档和接口定义自动生成符合DDD架构的Java代码。此skill会自动触发 ex-backend-project-structure-spec、ex-backend-coding-standards-spec、ex-backend-tech-stack-spec skill。当需要根据设计生成代码时使用。触发场景：用户提到生成代码、代码生成、初始化代码。
---

# 代码生成规范

本 skill 聚焦于代码生成的流程编排和各层生成步骤。

## 生成流程

### 第1步：触发规范 Skill 并确认输入

1. 触发工程结构规范 Skill（`ex-backend-project-structure-spec`）
2. 触发编码规范 Skill（`ex-backend-coding-standards-spec`）
3. 触发技术栈规范 Skill（`ex-backend-tech-stack-spec`）
4. 确认以下输入：
   - 业务需求文档（`docs/designs/full-prd.md`）：本服务业务设计的全量文档，理解本服务完整的业务需求和验收标准
   - 设计文档（领域模型、功能设计）
   - 接口定义（API接口、DTO定义）
   - 工程代码（如 bsp-calendar）

### 第2步：按层生成代码（生成代码时要有注释和必要的日志信息，英文）

#### Facade层
1. 生成Feign接口（@FeignClient声明，路径定义）
2. 生成Request/Response DTO（Bean Validation注解）

#### Domain层
1. 生成聚合根（包含基础属性，遵循 `ex-backend-coding-standards-spec` 实体规范）
2. 生成实体和值对象
3. 生成工厂类（静态工厂方法创建领域对象）
4. 生成领域服务接口和实现
5. 生成仓储接口（查询单个返回Optional）
6. 生成防腐层接口（如有）
7. 生成其他

#### App层
1. 生成应用服务接口和实现
2. 编排领域服务调用，处理事务边界
3. 禁止直接调用Repository，禁止业务规则判断

#### Infrastructure层
1. 生成PO对象（对应数据库表结构）
2. 生成MyBatis-Plus Mapper接口（继承BaseMapper）
3. 生成仓储实现（实现Domain层Repository接口，遵循 `ex-backend-coding-standards-spec` 仓储规范）
4. 生成PO转换器（MapStruct）
5. 生成防腐层实现（如有）

#### Web层
1. 生成Controller（实现Facade接口，不声明路径）
2. 生成DTO转换器（MapStruct）
3. 生成启动类（@EnableErrors注解）

#### Common层
1. 生成业务枚举类
2. 生成异常枚举类（使用Error框架，遵循 `ex-backend-coding-standards-spec` 异常处理规范）

#### 数据库脚本
1. 生成Liquibase changelog XML（遵循 `ex-backend-coding-standards-spec` 数据库规范）

### 第3步：生成单元测试

按 `ex-backend-coding-standards-spec` 中的单元测试规范生成：
1. Web层测试（@WebMvcTest + MockMvc）
2. APP层测试（@ExtendWith(MockitoExtension.class)）

### 第4步：更新数据库表结构全景

生成 Liquibase changelog 后，自动更新 `docs/designs/full-database-schema.md`：
1. 读取现有 full-database-schema.md（如存在）
2. 根据本次生成的 changelog，增量更新涉及的表结构
3. 未变更的表保持不变
4. 每张表记录格式：表名、用途说明、字段清单（字段名、类型、说明、约束）