---
name: ex-common-table-query
description: Text2SQL 查询数据库表数据。用户用自然语言描述查询需求，自动连接数据库、解析表结构、生成 SQL 并执行查询，返回格式化结果。触发场景：用户提到查询数据库、查数据、SQL查询、数据库查询、text2sql、查表数据、数据查询。
---

# Text2SQL 查询数据库

将用户的自然语言查询需求转换为 SQL 语句，连接数据库执行查询并返回格式化结果。

## 前置条件

| 条件 | 说明 |
|------|------|
| 数据库连接信息 | 需要 `host`、`port`、`database`、`username`、`password` |
| 数据库类型 | 支持 MySQL、PostgreSQL、Oracle、SQL Server |
| 网络可达 | 当前环境能访问目标数据库 |

## 执行流程

### 第1步：获取数据库连接信息

1. 从以下来源按优先级获取连接信息：
   - 项目配置文件（`application.yml`、`application.properties`、`.env` 等）
   - 用户当前会话中已提供的连接信息
   - 向用户询问
2. 需要确认的信息：
   - 数据库类型（MySQL / PostgreSQL / Oracle / SQL Server）
   - 连接地址（host:port）
   - 数据库名称（database / schema）
   - 用户名和密码
3. 使用对应数据库客户端工具测试连接是否可用：
   - MySQL：`mysql -h {host} -P {port} -u {username} -p{password} -e "SELECT 1"`
   - PostgreSQL：`PGPASSWORD={password} psql -h {host} -p {port} -U {username} -d {database} -c "SELECT 1"`
   - SQL Server：`sqlcmd -S {host},{port} -U {username} -P {password} -Q "SELECT 1"`

### 第2步：获取数据库表结构

连接成功后，获取目标数据库的表结构元数据，为 SQL 生成提供上下文：

**MySQL**：

```sql
-- 获取所有表名和注释
SELECT TABLE_NAME, TABLE_COMMENT
FROM INFORMATION_SCHEMA.TABLES
WHERE TABLE_SCHEMA = '{database}'
ORDER BY TABLE_NAME;

-- 获取指定表的列信息
SELECT COLUMN_NAME, COLUMN_TYPE, IS_NULLABLE, COLUMN_DEFAULT, COLUMN_COMMENT
FROM INFORMATION_SCHEMA.COLUMNS
WHERE TABLE_SCHEMA = '{database}' AND TABLE_NAME = '{table_name}'
ORDER BY ORDINAL_POSITION;
```

**PostgreSQL**：

```sql
-- 获取所有表名和注释
SELECT c.relname AS table_name, d.description AS table_comment
FROM pg_class c
LEFT JOIN pg_description d ON d.objoid = c.oid AND d.objsubid = 0
WHERE c.relkind = 'r' AND c.relnamespace = (SELECT oid FROM pg_namespace WHERE nspname = '{schema}')
ORDER BY c.relname;

-- 获取指定表的列信息
SELECT column_name, data_type, is_nullable, column_default,
       col_description((table_schema||'.'||table_name)::regclass, ordinal_position) AS column_comment
FROM INFORMATION_SCHEMA.COLUMNS
WHERE table_schema = '{schema}' AND table_name = '{table_name}'
ORDER BY ordinal_position;
```

**结构缓存策略**：

- 首次查询时获取完整表结构，缓存在当前会话中
- 后续查询复用缓存的表结构，无需重复获取
- 用户可通过"刷新表结构"指令强制重新获取

### 第3步：理解用户查询意图并生成 SQL

1. 解析用户的自然语言查询需求
2. 结合表结构元数据（表名、列名、注释、类型），识别涉及的表和字段
3. 生成 SQL 语句，遵循以下规则：

**SQL 生成规则**：

| 规则 | 说明 |
|------|------|
| 只读查询 | 只生成 `SELECT` 语句，禁止生成 `INSERT`、`UPDATE`、`DELETE`、`DROP`、`ALTER`、`TRUNCATE` 等写操作 |
| 结果限制 | 默认添加 `LIMIT 100`（用户明确指定数量时使用用户指定值） |
| 表名匹配 | 优先通过表注释匹配用户描述的业务含义，其次通过表名匹配 |
| 字段匹配 | 优先通过列注释匹配用户描述的字段含义，其次通过列名匹配 |
| 关联查询 | 根据外键关系或命名约定（如 `xxx_id`）推断表关联关系 |
| 聚合查询 | 用户提到"统计"、"汇总"、"平均"、"最大"、"最小"、"数量"等词时，使用对应聚合函数 |
| 排序 | 用户提到"最新"、"最近"时按时间字段降序，提到"最早"时按时间字段升序 |
| 条件过滤 | 用户提到时间范围、状态、类型等条件时，生成对应 `WHERE` 子句 |

4. 向用户展示生成的 SQL 语句，等待确认后再执行
5. 如果用户对 SQL 有修改意见，根据反馈调整 SQL 后重新确认

### 第4步：执行查询并返回结果

用户确认 SQL 后，执行查询：

**MySQL**：

```bash
mysql -h {host} -P {port} -u {username} -p{password} {database} -e "{SQL}" --batch --raw
```

**PostgreSQL**：

```bash
PGPASSWORD={password} psql -h {host} -p {port} -U {username} -d {database} -c "{SQL}"
```

**结果格式化**：

1. 将查询结果格式化为 Markdown 表格展示
2. 如果结果列数过多（超过 8 列），采用纵向展示（每行记录单独展示各字段）
3. 如果结果行数超过 50 行，展示前 50 行并提示总行数
4. 对特殊字段进行可读性处理：
   - 时间戳字段转换为可读日期格式
   - 金额字段保留 2 位小数
   - 状态码字段如有注释则附加状态说明
5. 展示查询耗时和返回行数

### 第5步：支持追问和深入查询

1. 用户可基于当前结果继续追问，如"按月统计"、"只看状态为成功的"、"关联用户表"
2. 基于上一次查询的上下文，理解追问意图并生成新的 SQL
3. 每次新查询仍需展示 SQL 并等待用户确认

## 安全约束

| 约束 | 说明 |
|------|------|
| 只读操作 | 严格限制为 SELECT 查询，拒绝任何写操作请求 |
| SQL 注入防护 | 对用户输入中的特殊字符进行转义处理 |
| 敏感字段脱敏 | 列名包含 `password`、`secret`、`token`、`credential` 等关键词的字段，查询结果中用 `***` 替代 |
| 连接信息保护 | 数据库密码不在对话中明文回显，展示时用 `****` 替代 |
| 查询超时 | 设置查询超时时间为 30 秒，超时则终止查询并提示用户优化查询条件 |
| 结果集限制 | 单次查询最大返回 10000 行，超出时提示用户添加过滤条件 |

## 错误处理

| 错误场景 | 处理方式 |
|----------|---------|
| 数据库连接失败 | 检查网络连通性、端口、用户名密码，给出具体排查建议 |
| 数据库客户端未安装 | 提示用户安装对应客户端工具（mysql-client、psql、sqlcmd） |
| 表名无法匹配 | 列出所有可用表名及注释，让用户选择目标表 |
| 字段名无法匹配 | 列出目标表的所有字段及注释，让用户明确查询字段 |
| SQL 语法错误 | 展示数据库返回的错误信息，自动修正后重新确认 |
| 查询超时 | 提示用户缩小查询范围或添加过滤条件 |
| 权限不足 | 提示用户确认数据库账号是否有目标表的查询权限 |
| 结果为空 | 提示无匹配数据，建议放宽查询条件 |

## 使用示例

用户输入示例：

| 用户输入 | 预期行为 |
|----------|---------|
| "查一下最近7天的订单数据" | 识别订单表，按创建时间过滤最近7天，默认返回100条 |
| "统计每个商户的交易总额" | 识别交易表和商户字段，生成 GROUP BY + SUM 聚合查询 |
| "查用户张三的所有订单" | 关联用户表和订单表，按用户名过滤 |
| "这个表有哪些字段" | 展示指定表的完整字段列表及注释 |
| "帮我看看 payment_order 表的结构" | 直接查询该表的列信息并格式化展示 |
