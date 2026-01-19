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

每次进行 `git` 提交时，都需要编写Commit Message，否则是不允许提交的。书写良好的Commit Message能大大提高代码维护的效率，编写Commit Message需要遵循一定的范式，内容应该清晰明了，指明本次提交的目的，便于日后追踪问题。

规范提交说明的好处如下

- 更加结构化的提交历史
- 保证每次信息都有确切的含义
- 方便直接生成`changelog`
- 方便信息搜索和过滤

当前业界应用的比较广泛的是 [Angular Contributing](https://github.com/angular/angular/blob/main/CONTRIBUTING.md)，还有就是[Conventional Commits(约定式提交)](https://www.conventionalcommits.org/zh-hans/v1.0.0/)，后者脱胎于Angular提交信息准则，提供了更加通用、简洁和灵活的提交规范。

## 2. Commit Message 格式

每次提交，Commit Message 都包括三个部分：`Header`，`Body` 和 `Footer`。

### 基本格式

```plain
<type>(<scope>): <subject>
```

### 完整格式（含 Body 和 Footer）

```plain
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

### 提交说明

```shell
# 标题行：50个字符以内，描述主要变更内容
#
# 主体内容：更详细的说明文本，建议72个字符以内。 需要描述的信息包括:
#
# * 为什么这个变更是必须的? 它可能是用来修复一个bug，增加一个feature，提升性能、可靠性、稳定性等等
# * 他如何解决这个问题? 具体描述解决问题的步骤
# * 是否存在副作用、风险?
#
# 尾部：如果需要的化可以添加一个链接到issue地址或者其它文档，或者关闭某个issue。
```

## 3. 字段说明

### 3.1 Emoji (表情符号 - 可选)

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
| merge    | 🔀     | 代码合并           |
| sync     | 🎯     | 同步主线或分支 Bug |
| release  | 🚀     | 版本发布           |
| ci       | 🤖     | CI/CD 配置变更     |
| security | 🔒     | 安全相关修复       |

### 3.2 Type (必须)

用于说明 commit 的类别，只允许使用以下标识：

主要类型：

| Type     | 说明                                 | Emoji 示例                  |
| -------- | ------------------------------------ | --------------------------- |
| **feat** | 新功能（feature）                    | ✨ feat: 添加用户登录功能    |
| **fix**  | 修复 bug，产生 diff 并自动修复此问题 | 🐛 fix: 修复用户信息显示错误 |

特殊类型：

| Type | 说明 | Emoji 示例 |
| **docs** | 文档更新（documentation） | 📝 docs: 更新 API 文档 |
| **style** | 代码格式调整（不影响代码运行） | 💄 style: 代码格式化 |
| **refactor** | 代码重构（非新功能非 bug 修复） | ♻️ refactor: 重构用户服务层 |
| **test** | 添加测试用例 | ✅ test: 添加用户注册单元测试 |
| **chore** | 构建过程或辅助工具变更 | 🔧 chore: 更新依赖版本 |

扩展类型：

| Type | 说明 | Emoji 示例 |
| **perf** | 性能优化（提升性能、体验） | ⚡ perf: 优化数据库查询性能 |
| **revert** | 回滚到上一个版本 | ⏪ revert: 回滚错误的配置更改 |
| **merge** | 代码合并操作 | 🔀 merge: 合并 develop 分支 |
| **sync** | 同步主线或分支的 Bug | 🎯 sync: 同步主线 bug 修复 |
| **ci** | CI/CD 配置变更 | 💚 ci: 更新 GitHub Actions 配置 |
| **build** | 构建流程变更 | 🛠 build: 更新构建脚本 |
| **conf** | 仅配置变化 | ⚙️ conf: 更新 Spring 配置文件 |

> 如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

### 3.3 Scope (可选)

英文，小写。说明 commit 影响的范围，根据项目特点定义。例如：

- **前端项目**: `auth`, `user`, `dashboard`, `api`, `ui`
- **后端项目**: `DAO`, `Controller`, `Service`, `DTO`, `config`
- **微服务**: `user-service`, `order-service`, `payment-service`

如果修改影响多个 scope，可以使用`*`代替。

### 3.4 Subject (必须)

`subject` 是 commit 目的的简短描述，要求：

- 不超过 50 个字符
- 使用**祈使句**，描述做了什么（不是做了什么的过去式）
- 以动词开头，使用第一人称现在时。比如change，而不是changed或changes
- 首字母小写
- 结尾不加句号或其他标点符号
- 使用**英文**（推荐）或**中文**（根据团队约定）

**正确示例**：

```plain
✨ feat(auth): add two-factor authentication
🐛 fix(user): resolve null pointer in profile update
📝 docs: update installation guide
```

**错误示例**：

```plain
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
- 第2行是空行
- 和 **subject** 一样, 使用第一人称现在时

**示例**：

```plain
✨ feat(user): implement user profile editing

- Add profile editing form with validation
- Integrate with backend API for profile updates
- Add success/error toast notifications

This change allows users to update their personal information
including name, email, and avatar. Previously, users could only
view their profile but not edit it.
```

### 3.6 Footer (可选)

Footer 部分可用于以下两种情况：

#### 3.6.1 不兼容变动(Breaking changes)

指的是本次提交修改了不兼容之前版本的变动修改。如果当前代码与上一个版本不兼容，则 Footer 部分以`BREAKING CHANGE`开头，后面是对变动的描述、以及变动理由和迁移方法

```
BREAKING CHANGE: isolate scope bindings definition has changed.

    To migrate the code follow the example below:

    Before:

    scope: {
      myAttr: 'attribute',
    }

    After:

    scope: {
      myAttr: '@',
    }

    The removed `inject` wasn't generaly useful for directives so there should be no code using it.
```

#### 3.6.2 引用提交的问题（affect issues）

如果当前 commit 针对某些 issue，那么可以在 Footer 部分关闭这些相关的 issue。以关键字`Closes`开头，比如

```
Closes #234

# 如果修改了多个bug，以逗号隔开
Closes #123, #245, #992
```

### 3.7 Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以 `revert:` 开头，**后面跟着被撤销 Commit 的 Header**。

```
revert: feat(pencil): add 'xxxxx' `option`

This reverts commit <hash>.
```

Body部分的格式是固定的，必须写成 `This reverts commit <hash>.`

其中的hash是被撤销 commit 的 SHA 标识符。

- 如果当前 commit 与被撤销的 commit，在同一个发布（release）里面，那么它们都不会出现在 Change log 里面。
- 如果两者在不同的发布，那么当前 commit，会出现在 Change log 的 Reverts 小标题下面。

## 4. 完整示例

### 4.1 简单示例

```plain
✨ feat(auth): add password strength meter
🐛 fix(DAO): user query missing username property
📝 docs: update API documentation for v2.0
```

### 4.2 完整示例

```plain
✨ feat(user): implement profile picture upload

- Add file upload component with preview
- Implement image compression before upload
- Add validation for file size and format
- Update user profile API to handle image data

The profile picture upload feature allows users to customize
their avatar. Images are compressed to reduce storage usage
and bandwidth consumption.

Closes #234
```

```plain
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
- [**commitizen**](https://github.com/commitizen/cz-cli)：支持多种不同的提交规范，可以安装和配置不同的适配器实现。
  - 安装完成后，提交的时候可以使用`git cz`（全局）或者`npm run commit`（项目）来代替`git commit`

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

```plain
💄 style: fix typo in user profile page
```

### Q: 如何处理紧急修复？

**A**: 紧急修复同样需要规范提交，可以使用 hotfix 前缀：

```plain
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

```plain
✨ feat(scope): add new feature
🐛 fix(scope): fix bug description
📝 docs: update documentation
💄 style: format code
♻️ refactor(scope): refactor code structure
⚡ perf(scope): improve performance
✅ test(scope): add tests
🔧 chore: update build/script
⏪ revert: revert changes
🔀 merge: merge branches
🎯 sync: sync bug fixes
```

**实施建议**：

1. **团队培训**：组织团队成员学习本规范
2. **工具配置**：配置 commitlint 和 husky 进行自动验证
3. **Code Review**：在 Code Review 中检查 commit message 规范
4. **持续改进**：根据团队反馈定期优化规范

本规范旨在提高代码质量和团队效率，请根据项目实际情况灵活调整。规范的执行需要团队共同努力，逐步培养良好的提交习惯。
