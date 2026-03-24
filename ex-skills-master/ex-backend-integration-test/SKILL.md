---
name: ex-backend-integration-test
description: 后端微服务集成测试规范，指导基于真实环境执行端到端接口集成测试。不使用Mock，从HTTP接口层发起请求，验证完整链路（Controller - AppService - DomainService - Repository - Database）。此skill会自动触发 ex-backend-tech-stack-spec、ex-backend-coding-standards-spec、ex-backend-test-analysis skill。当需要执行集成测试、端到端测试、接口联调测试时使用。触发场景：用户提到集成测试、端到端测试、E2E测试、接口联调、全链路测试、真实数据库测试。
---

# 集成测试规范

本 skill 聚焦于集成测试的编写和执行，与 `ex-backend-unit-test`（Mock单元测试）互补。

## 触发规范 Skill

开始编写集成测试前，必须先触发以下规范 Skill：
1. 触发技术栈规范 Skill（`ex-backend-tech-stack-spec`）
2. 触发编码规范 Skill（`ex-backend-coding-standards-spec`）
3. 触发测试分析 Skill（`ex-backend-test-analysis`）

## 与单元测试的区别

| 维度 | 单元测试（ex-backend-unit-test） | 集成测试（ex-backend-integration-test） |
|------|------------------------|-------------------------------|
| 测试范围 | 单个类/方法 | 完整请求链路 |
| 依赖处理 | Mock所有外部依赖 | 使用真实数据库和Spring上下文 |
| 启动方式 | @WebMvcTest / @ExtendWith(MockitoExtension) | @SpringBootTest(webEnvironment = RANDOM_PORT) |
| HTTP调用 | MockMvc（模拟） | TestRestTemplate / WebTestClient（真实HTTP） |
| 数据库 | 不涉及 | 真实测试库 |
| 数据管理 | Builder构建对象 | SQL脚本初始化 + 事务回滚 |
| 执行速度 | 快（毫秒级） | 慢（秒级） |
| 验证重点 | 业务逻辑正确性 | 全链路集成正确性 |

## 测试编写流程

### 第1步：确认输入

编写集成测试前必须确认：
1. 测试用例文档（来自 `ex-backend-test-analysis` 的输出）
2. 被测代码已生成并通过单元测试（来自 `ex-backend-unit-test` 的输出）
3. 数据库脚本已就绪（Liquibase changelog）
4. 接口设计文档（来自 `ex-backend-api-design` 的输出）

### 第2步：环境配置

#### 测试基类

在 `src/test/java` 下创建集成测试基类，所有集成测试类继承此基类。


#### 测试配置文件

`src/test/resources/application-test.yml` 配置测试环境。


### 第3步：编写集成测试

#### 测试类命名

- 集成测试类统一放在 `src/test/java/.../integration/` 包下
- 命名规则：`{Controller名}IntegrationTest`，如 `AccountControllerIntegrationTest`

#### 测试方法编写规则

每个测试方法对应测试用例文档中的一个用例，遵循以下模式：

```java
@Test
void {接口动作}_{场景描述}_{预期结果}() {
    // 1. 准备测试数据（直接插入数据库）
    jdbcTemplate.update("INSERT INTO bsp_account (...) VALUES (...)");

    // 2. 构建请求
    HttpEntity<RequestDTO> request = new HttpEntity<>(requestBody, buildHeaders("P001", "U001"));

    // 3. 发起HTTP请求
    ResponseEntity<RestApiResponse> response = restTemplate.exchange(
        "/api/bsp-account/accounts",
        HttpMethod.POST,
        request,
        new ParameterizedTypeReference<RestApiResponse>() {}
    );

    // 4. 验证HTTP响应
    assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    assertThat(response.getBody().getCode()).isEqualTo(0);

    // 5. 验证数据库状态（关键！单元测试无法覆盖的部分）
    Map<String, Object> row = jdbcTemplate.queryForMap(
        "SELECT * FROM bsp_account WHERE account_id = ?", accountId);
    assertThat(row.get("currency")).isEqualTo("USD");
    assertThat(row.get("provider_id")).isEqualTo("P001");
}
```

#### 测试数据管理

##### 数据准备
- 使用 `JdbcTemplate` 直接插入测试数据，不通过业务接口
- 每个测试方法独立准备数据，不依赖其他测试的数据
- 使用 `@Transactional` 自动回滚，保证测试隔离
- 对于需要验证事务提交后效果的场景，使用 `@Commit` 注解并在 `@AfterEach` 中手动清理

##### SQL辅助方法
在测试基类或测试类中定义辅助方法。


##### 数据清理
- 优先依赖 `@Transactional` 自动回滚
- 如果测试需要 `@Commit`，在 `@AfterEach` 中按外键依赖顺序清理表数据

### 第4步：测试分类

#### 按接口分组

每个 Controller 对应一个集成测试类，测试方法按以下顺序组织：
1. 正常场景（CRUD 基本流程）
2. 参数校验（缺失、格式错误、超长等）
3. 业务规则校验（重复、不存在、状态冲突等）
4. 数据隔离（跨服务商隔离验证）
5. 边界条件（空列表、最大值、并发等）

#### 测试标签

使用 JUnit 5 `@Tag` 区分测试类型，便于按需执行。


### 第5步：验证要点

集成测试重点验证单元测试无法覆盖的内容：

| 验证维度 | 验证内容 | 示例 |
|---------|---------|------|
| 全链路正确性 | 请求从Controller到数据库的完整流程 | 创建账户后查询数据库确认记录存在 |
| 数据库约束 | CHECK约束、UNIQUE约束、NOT NULL约束 | 插入不支持的币种触发CHECK约束 |
| 事务一致性 | 多表操作的事务完整性 | 批量开户部分失败时的回滚行为 |
| Liquibase脚本 | 数据库迁移脚本的正确性 | 表结构、索引、约束是否正确创建 |
| 数据隔离 | 多租户数据隔离的正确性 | 服务商A无法查到服务商B的数据 |
| 响应格式 | 完整的JSON响应结构 | 嵌套对象、列表、分页结构 |
| 错误码映射 | 业务异常到HTTP响应的映射 | 业务异常返回正确的错误码和消息 |

## 测试执行

### 执行命令

```bash
# 执行所有集成测试
mvn test -Dgroups=integration

# 执行指定集成测试类
mvn test -Dtest=AccountControllerIntegrationTest

# 执行指定测试方法
mvn test -Dtest=AccountControllerIntegrationTest#createAccount_validRequest_returnsSuccessAndPersisted

# 跳过单元测试，只执行集成测试
mvn test -Dgroups=integration -DexcludedGroups=unit
```

### 前置条件

执行集成测试前必须确认：
1. 测试数据库已启动且可连接
2. `application-test.yml` 配置正确
3. Liquibase脚本可正常执行
4. 单元测试已全部通过

### 验证标准

- 所有集成测试必须通过（0 failures, 0 errors）
- 每个接口至少覆盖：1个正常场景 + 1个业务异常场景 + 1个数据隔离场景
- 数据库状态验证必须包含在正常场景测试中
- 测试之间无数据依赖，可独立执行、可乱序执行

### 测试覆盖要求

| 维度 | 最低覆盖 | 重点覆盖 |
|------|---------|---------|
| 接口覆盖 | 每个接口至少3个用例 | 正常+异常+隔离 |
| 数据库验证 | 每个写操作验证DB状态 | INSERT/UPDATE/DELETE后查询确认 |
| 约束验证 | 每个CHECK/UNIQUE约束至少1个用例 | 触发约束的边界值 |
| 事务验证 | 每个多表操作至少1个用例 | 部分失败的回滚场景 |

## 测试结果文档

测试执行完成后，在任务目录 `docs/requirements/{JIRA}-{YYYYMMDD}-{变更简述}/` 下生成本次集成测试报告文档。

### 文件命名

当由开发流程（`ex-backend-develop-workflow`）调度时，会传入 JIRA 单号 `{JIRA}`，文件名加上 JIRA 前缀：
```
{JIRA}-testreport-{YYYYMMDD}-{变更简述}.md
```
- `{JIRA}`：JIRA 单号（由开发流程传入，独立调度时可省略前缀）

### 文档结构

```markdown
# 集成测试报告

## 基本信息

| 项目 | 内容 |
|------|------|
| 执行日期 | {YYYY-MM-DD HH:mm} |
| 触发方式 | 开发流程 / 手动执行 |
| 测试范围 | {描述本次测试覆盖的模块或功能} |
| 测试环境 | {数据库类型及版本} |

## 执行结果汇总

| 指标 | 数值 |
|------|------|
| 测试类总数 | {N} |
| 测试方法总数 | {N} |
| 通过 | {N} |
| 失败 | {N} |
| 错误 | {N} |
| 跳过 | {N} |
| 执行耗时 | {N}s |

## 测试明细

### {测试类名}

| 测试方法 | 结果 | 耗时 | 验证维度 | 备注 |
|----------|------|------|---------|------|
| {方法名} | 通过 / 失败 / 错误 | {N}ms | 全链路/约束/事务/隔离 | {失败原因，通过则留空} |

## 失败用例分析（如有）

### {失败的测试方法名}

- **测试类**：{类名}
- **失败类型**：断言失败 / 异常抛出 / 数据库错误
- **期望结果**：{expected}
- **实际结果**：{actual}
- **关键堆栈**：
  ```
  {关键的异常堆栈信息，最多5行}
  ```
- **数据库状态**：{如涉及数据库验证失败，附上实际查询结果}

## 覆盖情况

| 接口 | 测试方法数 | 正常场景 | 异常场景 | 隔离场景 | DB验证 | 通过率 |
|------|-----------|---------|---------|---------|--------|--------|
| {接口路径} | {N} | {N} | {N} | {N} | {N} | {N}% |
```

### 生成规则

1. **解析 Maven 测试输出**：从 `mvn test -Dgroups=integration` 的控制台输出中提取测试结果数据
2. **按测试类分组**：将测试方法按所属测试类分组展示
3. **标注验证维度**：每个测试方法标注其验证维度（全链路/约束/事务/隔离）
4. **失败用例详情**：对每个失败或错误的用例，提取断言信息、关键堆栈和数据库状态
5. **覆盖情况统计**：按接口分别统计各维度的覆盖数量
6. **目录自动创建**：如任务目录不存在则自动创建