---
name: ex-common-feishu-doc-reader
description: 读取飞书链接文档内容。用户提供飞书文档链接，自动解析文档类型和 token，通过飞书开放平台 API 获取文档纯文本内容并返回。触发场景：用户提到读取飞书文档、获取飞书链接内容、飞书文档导入、从飞书读取。
---

# 读取飞书文档

通过飞书开放平台 API，将用户提供的飞书文档链接转换为可读的纯文本内容。

## 前置条件

| 条件 | 说明 |
|------|------|
| 飞书应用凭证 | 需要 `app_id` 和 `app_secret`，从飞书开放平台的应用管理页面获取 |
| API 权限 | 应用需开通 `docx:document:readonly`（查看新版文档）权限 |
| 文档授权 | 目标文档需将应用添加为文档协作者（文档右上角「...」→「更多」→「添加文档应用」） |

## 支持的链接格式

飞书文档链接包含文档类型和 token，格式如下：

| 链接格式 | 文档类型 | token 位置 |
|----------|---------|-----------|
| `https://{domain}.feishu.cn/docx/{token}` | 新版文档（docx） | URL 路径最后一段 |
| `https://{domain}.feishu.cn/wiki/{token}` | 知识库文档（wiki） | URL 路径最后一段 |
| `https://{domain}.feishu.cn/doc/{token}` | 旧版文档（doc） | URL 路径最后一段 |
| `https://{domain}.feishu.cn/sheets/{token}` | 电子表格（sheet） | URL 路径最后一段 |

token 通常为 27 位字符串，如 `doxbcmEtbFrbbq10nPNu8gO1F3b`。

## 执行流程

### 第1步：解析飞书链接

1. 从用户输入中提取飞书文档 URL
2. 解析 URL 中的文档类型和 token：
   - 匹配路径中的类型标识：`docx`、`wiki`、`doc`、`sheets`
   - 提取路径最后一段作为 token（去除 URL 参数和锚点）
3. 如果链接格式无法识别，提示用户确认链接是否正确

### 第2步：获取访问凭证（tenant_access_token）

调用飞书认证接口获取应用级别的访问凭证：

```
POST https://open.feishu.cn/open-apis/auth/v3/tenant_access_token/internal
Content-Type: application/json; charset=utf-8

{
  "app_id": "{APP_ID}",
  "app_secret": "{APP_SECRET}"
}
```

响应中的 `tenant_access_token` 有效期为 2 小时。

凭证来源优先级：
1. 环境变量 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET`
2. 项目根目录 `.env` 文件中的配置
3. 向用户询问

### 第3步：获取文档内容

根据文档类型选择对应的 API：

**新版文档（docx）和旧版文档（doc）**：

```
GET https://open.feishu.cn/open-apis/docx/v1/documents/{document_id}/raw_content?lang=0
Authorization: Bearer {tenant_access_token}
```

返回文档纯文本内容。

**知识库文档（wiki）**：

知识库链接中的 token 是节点 token，需先获取实际文档信息：

```
GET https://open.feishu.cn/open-apis/wiki/v2/spaces/get_node?token={node_token}
Authorization: Bearer {tenant_access_token}
```

从响应中获取 `obj_token`（实际文档 token）和 `obj_type`（实际文档类型），再调用对应类型的文档内容接口。

**电子表格（sheet）**：

```
GET https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/{spreadsheet_token}/sheets/query
Authorization: Bearer {tenant_access_token}
```

先获取工作表列表，再逐个读取工作表内容。

### 第4步：返回文档内容

1. 将获取到的纯文本内容返回给调用方
2. 如果文档内容过长（超过 50000 字符），提示用户内容已截断
3. 如果获取失败，根据错误码给出排查建议：
   - `403 forbidden`：文档未授权给应用，需在文档中添加应用权限
   - `404 not found`：文档不存在或已删除，确认链接是否正确
   - `401`：访问凭证无效或过期，重新获取 token

## 错误处理

| 错误场景 | 处理方式 |
|----------|---------|
| 链接格式无法识别 | 提示用户确认链接格式，给出支持的链接格式示例 |
| 应用凭证未配置 | 提示用户配置 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET` |
| 文档无权限（403） | 提示用户在飞书文档中添加应用权限 |
| 文档不存在（404） | 提示用户确认文档是否已删除或链接是否正确 |
| API 频率限制 | 等待 1 秒后重试，最多重试 3 次 |
| 网络超时 | 重试 1 次，仍失败则报告错误 |
