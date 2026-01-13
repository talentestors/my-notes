---
# 当前页面内容标题
title: Git Commit Message 规范文档
# 当前页面图标
icon: git
# 分类
category:
  - devtool
  - Git
# 标签
tag:
  - Git
  - devtool
  - 版本控制
sticky: false
# 是否收藏在博客主题的文章列表中，当填入数字时，数字越大，排名越靠前。
star: false
# 是否将该文章添加至文章列表中
article: false
# 目录顺序
order: 3
# 是否将该文章添加至时间线中
timeline: false
---

## 1. 规范背景

在日常开发中，不规范的 commit message 会导致：

- 代码维护成本增加
- 提交历史难以追溯
- 无法自动生成 Change Log
- 团队协作效率降低

本规范基于 Angular 提交规范，结合阿里巴巴高德地图相关部门实践经验，旨在提高代码质量和研发效率。

## 2. Commit Message 格式

### 基本格式

```Plain
<type>(<scope>): <subject>
```

### 完整格式（含 Body 和 Footer）

```Plain
<emoji> <type>(<scope>): <subject>

<body>

<footer>
```

## 3. 字段说明

### 3.1 Emoji (表情符号 - 可选但推荐)

在 commit message 开头添加表情符号，使提交记录更直观、易读。

| Type     | Emoji | 说明               |
| -------- | ----- | ------------------ |
| feat     | ✨     | 新功能             |
| fix      | 🐛     | 修复 bug           |
| docs     | 📝     | 文档更新           |
| style    | 💄     | 代码格式调整       |
| refactor | ♻️     | 代码重构           |
| perf     | ⚡     | 性能优化           |
| test     | ✅     | 添加测试           |
| chore    | 🔧     | 构建/工具变更      |
| revert   | ⏪     | 代码回滚           |
| merge    | 🔄     | 代码合并           |
| sync     | 🎯     | 同步主线或分支 Bug |
| release  | 🚀     | 版本发布           |
| ci       | 🤖     | CI/CD 配置变更     |
| security | 🔒     | 安全相关修复       |

### 3.2 Type (必须)

用于说明 commit 的类别，只允许使用以下标识：

| Type         | 说明                                             | Emoji 示例                   |
| ------------ | ------------------------------------------------ | ---------------------------- |
| **feat**     | 新功能（feature）                                | ✨ feat: 添加用户登录功能     |
| **fix**      | 修复 bug，产生 diff 并自动修复此问题             | 🐛 fix: 修复用户信息显示错误  |
| **to**       | 修复 bug，只产生 diff 不自动修复（适合多次提交） | 🐛 to: 修复用户权限问题       |
| **docs**     | 文档更新（documentation）                        | 📝 docs: 更新 API 文档        |
| **style**    | 代码格式调整（不影响代码运行）                   | 💄 style: 代码格式化          |
| **refactor** | 代码重构（非新功能非 bug 修复）                  | ♻️ refactor: 重构用户服务层   |
| **perf**     | 性能优化（提升性能、体验）                       | ⚡ perf: 优化数据库查询性能   |
| **test**     | 添加测试用例                                     | ✅ test: 添加用户注册单元测试 |
| **chore**    | 构建过程或辅助工具变更                           | 🔧 chore: 更新依赖版本        |
| **revert**   | 回滚到上一个版本                                 | ⏪ revert: 回滚错误的配置更改 |
| **merge**    | 代码合并操作                                     | 🔄 merge: 合并 develop 分支   |
| **sync**     | 同步主线或分支的 Bug                             | 🎯 sync: 同步主线 bug 修复    |

### 3.3 Scope (可选)

说明 commit 影响的范围，根据项目特点定义。例如：

- **前端项目**: `auth`, `user`, `dashboard`, `api`, `ui`
- **后端项目**: `DAO`, `Controller`, `Service`, `DTO`, `config`
- **微服务**: `user-service`, `order-service`, `payment-service`

如果修改影响多个 scope，可以使用`*`代替。

### 3.4 Subject (必须)

commit 目的的简短描述，要求：

- 不超过 50 个字符
- 使用**祈使句**，描述做了什么（不是做了什么的过去式）
- 首字母小写
- 结尾不加句号或其他标点符号
- 使用**英文**（推荐）或**中文**（根据团队约定）

**正确示例**：

```Plain
✨ feat(auth): add two-factor authentication
🐛 fix(user): resolve null pointer in profile update
📝 docs: update installation guide
```

**错误示例**：

```Plain
❌ feat(auth): Added two factor authentication. (句号结尾)
❌ fix(user): fixed user profile bug (过去式)
❌ feat: 新增用户注册功能 (缺少scope)
```

### 3.5 Body (可选)

对本次提交的详细描述，可以包含：

- 为什么要做这个改动
- 具体做了什么
- 与之前行为的对比
- 相关的技术细节

**格式要求**：

- 每行不超过 72 个字符
- 可以使用多行
- 使用空白行与 subject 分隔

**示例**：

```Plain
✨ feat(user): implement user profile editing

- Add profile editing form with validation
- Integrate with backend API for profile updates
- Add success/error toast notifications

This change allows users to update their personal information
including name, email, and avatar. Previously, users could only
view their profile but not edit it.
```

### 3.6 Footer (可选)

用于关联 issue 或 break changes：

**关联 Issue**：

```Plain
Closes #123
Fixes #456
Resolves #789
```

**BREAKING CHANGE**：

如果提交包含不兼容的 API 变更，需要在 footer 中说明：

```Plain
BREAKING CHANGE: The user authentication method has been changed from JWT to OAuth2.0. All clients need to update their authentication logic.
```

## 4. 完整示例

### 4.1 简单示例

```Plain
✨ feat(auth): add password strength meter
🐛 fix(DAO): user query missing username property
📝 docs: update API documentation for v2.0
```

### 4.2 完整示例

```Plain
✨ feat(user): implement profile picture upload

- Add file upload component with preview
- Implement image compression before upload
- Add validation for file size and format
- Update user profile API to handle image data

The profile picture upload feature allows users to customize
their avatar. Images are compressed to reduce storage usage
and bandwidth consumption.

Closes #234
🐛 fix(payment): resolve transaction timeout issue

- Increase API timeout from 30s to 60s
- Add retry mechanism for failed transactions
- Improve error logging for timeout scenarios

This fix addresses the frequent transaction failures reported by
users during peak hours.

BREAKING CHANGE: The payment API now returns different error
codes for timeout scenarios. Clients need to handle new error codes.

Fixes #567
```

## 5. 规范好处

### 5.1 提高代码质量

- **强制思考**：每次提交都需要明确目的，避免随意提交
- **原子提交**：鼓励小而精的提交，每个 commit 只做一件事
- **可追溯性**：清晰的提交历史便于问题定位和代码审查

### 5.2 提升团队效率

- **统一标准**：团队成员使用相同规范，降低沟通成本
- **快速理解**：通过 emoji 和 type 快速了解提交类型
- **自动生成文档**：基于规范化的 commit 自动生成 Change Log

### 5.3 自动化支持

- **Change Log 生成**：工具可以自动解析 commit message 生成发布日志
- **版本管理**：基于 commit 类型自动确定版本号（Semantic Versioning）
- **CI/CD 集成**：在 CI 流程中验证 commit message 规范

## 6. 工具支持

### 6.1 提交验证工具

- **commitlint**：验证 commit message 是否符合规范
- **husky**：Git hooks 工具，在 commit 时自动验证
- **@commitlint/config-conventional**：Angular 规范的 commitlint 配置

### 6.2 IDE 插件

- **VS Code**: "Conventional Commits" 插件
- **IntelliJ IDEA**: "Git Commit Template" 插件
- **WebStorm**: 内置 commit 模板支持

### 6.3 配置示例

**package.json**:

```JSON
{
  "devDependencies": {
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0",
    "husky": "^8.0.0"
  },
  "commitlint": {
    "extends": ["@commitlint/config-conventional"]
  }
}
```

**.husky/commit-msg**:

```Bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"
npx --no -- commitlint --edit "$1"
```

## 7. 常见问题解答

### Q: 中英文混用怎么办？

**A**: 团队统一约定使用**英文**（推荐）或**中文**。不建议混用。推荐英文因为：

- 国际化团队友好
- 工具支持更好
- 避免编码问题

### Q: 简单修改是否需要严格遵循规范？

**A**: **是的**。即使是简单的修改（如 typo 修复），也应该遵循规范：

```Plain
💄 style: fix typo in user profile page
```

### Q: 如何处理紧急修复？

**A**: 紧急修复同样需要规范提交，可以使用 hotfix 前缀：

```Plain
🐛 fix(auth): hotfix - fix authentication bypass vulnerability
```

### Q: 多人协作时如何避免冲突？

**A**:

- 频繁拉取最新代码
- 使用 feature 分支开发
- 小步提交，避免大范围修改
- 提交前 rebase 最新代码

## 8. 附录

### 8.1 gitmoji 完整列表

> 参考：
>
> https://gitmoji.dev/

[gitmoji](./gitmoji.md)

### 8.2 快速参考卡

```Plain
✨ feat(scope): add new feature
🐛 fix(scope): fix bug description
📝 docs: update documentation
💄 style: format code
♻️ refactor(scope): refactor code structure
⚡ perf(scope): improve performance
✅ test(scope): add tests
🔧 chore: update build/script
⏪ revert: revert changes
🔄 merge: merge branches
🎯 sync: sync bug fixes
```

**实施建议**：

1. **团队培训**：组织团队成员学习本规范
2. **工具配置**：配置 commitlint 和 husky 进行自动验证
3. **Code Review**：在 Code Review 中检查 commit message 规范
4. **持续改进**：根据团队反馈定期优化规范

本规范旨在提高代码质量和团队效率，请根据项目实际情况灵活调整。规范的执行需要团队共同努力，逐步培养良好的提交习惯。
