---
name: ex-backend-unit-test
description: 后端微服务单元测试规范，指导基于测试用例执行单元测试。包括测试代码编写流程、测试数据准备和测试执行验证。此skill会自动触发 ex-backend-tech-stack-spec、ex-backend-coding-standards-spec、ex-backend-test-analysis skill。当需要执行单元测试时使用。触发场景：用户提到单元测试、Mock测试。
---

# 测试规范

本 skill 聚焦于测试数据准备和执行验证。

## 测试编写流程

### 第1步：触发规范 Skill 并确认输入

1. 触发技术栈规范 Skill（`ex-backend-tech-stack-spec`）
2. 触发编码规范 Skill（`ex-backend-coding-standards-spec`）
3. 触发测试分析 Skill（`ex-backend-test-analysis`）
4. 确认以下输入：
    - 测试用例文档（来自 `ex-backend-test-analysis` 的输出）
    - 被测代码已生成（来自 `ex-backend-code-generate` 的输出）
    - 明确每个测试用例对应的测试层（Controller/AppService/DomainService）

### 第2步：按层编写测试

#### Controller层测试

将测试用例文档中的用例转化为MockMvc测试代码：
- 正常场景用例 → 验证status().isOk()和jsonPath("$.code").value(0)
- 参数校验用例 → 验证jsonPath("$.code")不为0
- 数据隔离用例 → 验证Header缺失或不匹配时的响应

#### DomainService层测试

将业务规则相关用例转化为Mockito测试代码：
- 业务规则违反用例 → 验证assertThrows抛出预期异常
- 正常业务逻辑用例 → 验证返回值和Mock交互

#### AppService层测试

将流程编排相关用例转化为测试代码：
- 验证服务调用顺序（verify + InOrder）
- 验证参数传递正确性

### 第3步：准备测试数据

#### 原则
- 每个测试方法独立准备数据，不依赖其他测试
- 使用Builder模式或辅助方法构建测试对象
- Mock外部依赖，不依赖真实数据库和外部服务

#### 辅助方法
- 在测试类中定义private辅助方法构建常用测试对象
- 方法命名：`build{对象名}()`，如 `buildCalendar()`
- 需要变体时通过参数区分，如 `buildCalendarWithHoliday(LocalDate date)`

## 测试执行

### 执行命令
```bash
mvn test
mvn test -Dtest=CalendarControllerTest
mvn test -Dtest=CalendarControllerTest#createCalendar_validRequest_returnsSuccess
```

### 验证标准
- 所有测试必须通过（0 failures, 0 errors）
- Controller层：验证HTTP状态码、响应code、响应data关键字段
- DomainService层：验证业务规则执行、异常抛出、返回值正确性
- AppService层：验证服务编排顺序、参数传递正确性

### 测试覆盖要求
| 层 | 最低覆盖 | 重点覆盖 |
|---|---|---|
| Controller | 每个接口至少1个正常+1个异常 | 参数校验、响应格式 |
| DomainService | 每个方法至少1个正常+1个异常 | 业务规则、边界条件 |
| AppService | 每个方法至少1个正常 | 流程编排 |
