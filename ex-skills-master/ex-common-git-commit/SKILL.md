---
name: ex-common-git-commit
description: Git代码提交与推送规范。当开发流程完成所有阶段后，执行git add、commit、push操作将代码提交到GitLab。commit message格式为FEAT(JIRA单号):{变更简述}。当用户提到"提交代码"、"commit"、"push"、"推送代码"、"提交到git"时触发此skill。
---

# Git Commit & Push 流程

## Commit Message 格式

```
FEAT({JIRA}):{变更简述}
```

- `{JIRA}`：JIRA 单号（如 `BSP-1234`），由开发流程传入或向用户询问
- `{变更简述}`：一句话描述本次变更的核心内容，不超过 50 个字符

### 示例

```
FEAT(BSP-1234):新增商户入驻审核接口
FEAT(BSP-5678):修复订单状态流转异常
FEAT(PAY-100):重构支付渠道路由逻辑
```

## 执行流程

### 1. 获取 JIRA 单号

- 如果由开发流程调度，使用流程传入的 `{JIRA}`
- 如果独立调度，向用户询问 JIRA 单号

### 2. 获取变更简述

- 如果由开发流程调度，直接使用流程传入的 `{SUMMARY}`
- 如果独立调度，扫描当前工作区变更自动生成：
  1. 执行 `git status` 查看变更文件列表
  2. 执行 `git diff --stat` 查看变更统计
  3. 根据变更内容生成一句话简述

### 3. 执行提交

自动执行，无需用户确认：

```bash
git add -A
git commit -m "FEAT({JIRA}):{SUMMARY}"
git push
```

如果 push 失败（如远程有更新）：
1. 执行 `git pull --rebase`
2. 如有冲突，提示用户手动解决
3. 冲突解决后重新 push

### 4. 提交结果

展示提交结果：
- commit hash
- push 目标分支
- 是否成功
