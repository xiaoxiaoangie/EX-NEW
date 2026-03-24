---
name: ex-common-feishu-doc-writer
description: 将本地文档内容写入飞书创建新文档。读取本地 Markdown 或文本文件，通过飞书开放平台 API 创建飞书文档并写入内容。触发场景：用户提到写入飞书文档、创建飞书文档、同步到飞书、发布到飞书、上传到飞书文档。
---

# 写入飞书文档

读取本地文档内容，通过飞书开放平台 API 创建飞书文档并写入内容。

## 前置条件

| 条件 | 说明 |
|------|------|
| 飞书应用凭证 | 需要 `app_id` 和 `app_secret`，从飞书开放平台的应用管理页面获取 |
| API 权限 | 应用需开通 `docx:document`（创建及编辑新版文档）和 `drive:drive`（云空间文件管理）权限 |
| 目标文件夹授权 | 目标文件夹需将应用添加为协作者，应用才能在其中创建文档 |

## 支持的本地文件格式

| 格式 | 说明 |
|------|------|
| `.md` | Markdown 文件，自动解析标题、列表、表格等结构 |
| `.txt` | 纯文本文件，按段落写入 |

## 执行流程

### 第1步：确认输入

1. 获取本地文件路径（用户指定或从上下文推断）
2. 读取本地文件内容
3. 获取目标飞书文件夹链接（可选，不提供则创建在应用根目录）
   - 文件夹链接格式：`https://{domain}.feishu.cn/drive/folder/{folder_token}`
   - 从链接中提取 `folder_token`
4. 确认文档标题（默认使用本地文件名，用户可自定义）

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

凭证来源优先级：
1. 环境变量 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET`
2. 项目根目录 `.env` 文件中的配置
3. 向用户询问

### 第3步：创建飞书文档

调用新版文档创建接口，创建一个空文档：

```
POST https://open.feishu.cn/open-apis/docx/v1/documents
Authorization: Bearer {tenant_access_token}
Content-Type: application/json; charset=utf-8

{
  "title": "{文档标题}",
  "folder_token": "{folder_token}"
}
```

响应中获取 `document_id`，用于后续写入内容。

### 第4步：解析本地文档并写入内容

将本地文档内容转换为飞书文档块（Block），通过创建块接口写入：

```
POST https://open.feishu.cn/open-apis/docx/v1/documents/{document_id}/blocks/{document_id}/children
Authorization: Bearer {tenant_access_token}
Content-Type: application/json; charset=utf-8

{
  "children": [ ...blocks ],
  "index": -1
}
```

#### Markdown 到飞书 Block 的转换规则

| Markdown 元素 | 飞书 Block 类型 | block_type 值 |
|---------------|----------------|---------------|
| `# 标题` | heading1 | 3 |
| `## 标题` | heading2 | 4 |
| `### 标题` | heading3 | 5 |
| `#### 标题` | heading4 | 6 |
| `##### 标题` | heading5 | 7 |
| `###### 标题` | heading6 | 8 |
| 普通段落 | paragraph（text） | 2 |
| `- 无序列表` | bullet | 13 |
| `1. 有序列表` | ordered | 14 |
| `> 引用` | quote | 19 |
| ``` 代码块 ``` | code | 16 |
| `---` | divider | 22 |

#### 文本元素（TextElement）结构

每个文本块包含 `elements` 数组，每个元素为 `text_run` 类型：

```json
{
  "text_run": {
    "content": "文本内容",
    "text_element_style": {
      "bold": false,
      "italic": false,
      "underline": false,
      "strikethrough": false,
      "inline_code": false
    }
  }
}
```

#### 写入策略

由于飞书 API 对 Markdown 格式的转换存在已知问题（块顺序可能错乱），采用以下策略：

1. **逐段写入**：将文档按段落/块拆分，每次 API 调用写入少量块（建议每批不超过 50 个块）
2. **纯结构化写入**：不依赖飞书的 Markdown 转换，直接构造 Block JSON 结构
3. **顺序保证**：每批写入完成后再写入下一批，确保内容顺序正确
4. **表格特殊处理**：Markdown 表格需转换为飞书 table block，包含 rows、columns 和 cells 结构

### 第5步：返回结果

1. 返回创建成功的飞书文档链接：`https://{domain}.feishu.cn/docx/{document_id}`
2. 提示用户检查文档内容和格式
3. 如果写入过程中部分内容失败，报告失败的部分及原因

## 错误处理

| 错误场景 | 处理方式 |
|----------|---------|
| 本地文件不存在 | 提示用户确认文件路径 |
| 应用凭证未配置 | 提示用户配置 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET` |
| 文件夹无权限（403） | 提示用户在飞书文件夹中添加应用权限 |
| 文件夹不存在（folder not found） | 提示用户确认文件夹链接是否正确 |
| 文档创建失败 | 根据错误码给出排查建议 |
| 内容写入部分失败 | 报告失败的块，建议用户手动补充 |
| API 频率限制 | 等待 1 秒后重试，最多重试 3 次 |
| 文档内容超大 | 分批写入，每批不超过 50 个块 |

## 已知限制

| 限制 | 说明 |
|------|------|
| 图片不支持 | 本地 Markdown 中的图片引用无法自动上传，需手动处理 |
| 复杂表格 | 合并单元格等复杂表格结构可能无法完美还原 |
| 嵌套列表 | 飞书文档对多级嵌套列表的支持有限 |
| 文档大小 | 单个文档的 Block 数量有上限，超大文档需拆分 |
