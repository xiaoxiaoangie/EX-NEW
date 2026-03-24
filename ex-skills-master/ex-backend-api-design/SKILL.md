---
name: ex-backend-api-design
description: 后端微服务API接口设计规范，指导接口设计流程和Swagger文档生成。此skill会自动触发 ex-backend-coding-standards-spec、ex-backend-project-structure-spec skill。当需要设计API接口、编写接口文档、生成Swagger定义时使用。触发场景：用户提到接口设计、API设计、接口定义、生成接口文档。
---

# API接口设计规范

本 skill 聚焦于接口设计的流程方法和Swagger文档生成。

## 触发规范 Skill

开始接口设计前，必须先触发以下规范 Skill：
1. 触发编码规范 Skill（`ex-backend-coding-standards-spec`）
2. 触发工程结构规范 Skill（`ex-backend-project-structure-spec`）

## 设计输入

接口设计基于以下输入材料：

1. **架构设计文档**（docs/designs/full-architecture-design.md）：核心输入，包含领域模型、业务规则和架构决策
2. **业务需求文档**（docs/designs/full-prd.md）：本服务业务设计的全量文档，辅助理解完整的业务场景、功能性需求和业务规则
3. **页面原型文件**（如有）：辅助理解前端交互需求
   - 从原型中提取：表单字段→请求参数、列表展示→响应字段、操作按钮→接口动作、页面跳转→接口调用顺序
4. **需求变更内容**（需求变更场景）：变更影响分析报告中涉及接口的部分

在开始设计前，必须确认可用的输入材料：
- 读取 docs/designs/ 目录下的架构设计文档
- 读取 docs/requirements/ 目录下的业务需求文档
- 检查是否存在页面原型文件（询问用户或扫描 docs/requirements/prototypes 目录）
- 如为需求变更场景，确认需要新增/修改/废弃的接口范围

## 接口设计流程

### 第1步：梳理接口清单

从架构设计文档的功能设计中提取接口清单，结合业务需求文档和页面原型（如有）：
- 每个功能点对应一个或多个接口
- 如有页面原型，从原型的页面操作和数据展示中补充接口需求
- 明确每个接口的HTTP方法和资源路径
- 标注接口的调用方（内部服务/外部系统/前端）

### 第2步：定义请求响应

针对每个接口定义：
1. 路径参数（Path Variable）
2. 查询参数（Query Parameter）
3. 请求体DTO（Request Body）
4. 响应体DTO（Response Body）
5. 所需的Header参数（x-provider-id或x-tenant-id等）

### 第3步：定义业务错误码

针对每个接口列出可能的业务异常：
- 异常场景描述
- 对应的异常码（遵循 `ex-backend-coding-standards-spec` 中的异常处理规范）
- 异常消息

### 第4步：场景验证

用业务场景验证接口设计的合理性：
- 外部服务是否能拿到所需参数
- 是否存在不必要的接口（无明确业务场景支撑）
- 接口粒度是否合适（不过粗也不过细）

## 设计输出
在项目 docs/designs/ 目录下生成接口设计文档
接口规范文档应包含：
1. 接口清单（路径、方法、描述、调用方）
2. 每个接口的详细定义（请求参数、响应参数、业务错误码）