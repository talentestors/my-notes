---
# 当前页面内容标题
title: Git进阶
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
order: 2
# 是否将该文章添加至时间线中
timeline: false
---

## 第一节 git worktree：管理多个工作区的利器

> [Reference: git-scm.com](https://git-scm.com/docs/git-worktree/zh_HANS-CN)

在现代开发中，例如使用 Node.js 的项目中，我们常常需要同时处理多个分支或版本。这时，git worktree 就成为了一个非常有用的工具。它允许你在同一仓库中创建多个工作区，从而方便地进行多任务开发。

假设你正在开发一个 Node.js 应用，并且需要同时处理多个功能分支。在这种情况下，你可能会有如下需求：

- 在一个分支上修复 bug。
- 在另一个分支上开发新特性。
- 确保 node_modules 不会因为频繁切换分支而被污染。

这时，git worktree 就能帮助你轻松实现这些需求。

### 什么是 `git worktree`？

`git worktree` 是 Git 的一个命令，允许你在同一个 Git 仓库中创建多个工作目录。这意味着你可以在不同的目录中检出不同的分支，而不必频繁地切换分支。这对于需要同时开发多个功能或修复多个问题的开发者来说，极为便利。

#### 基本命令

以下是一些常用的 `git worktree` 命令：

1. **添加工作区**：
   ```bash
   git worktree add <路径> [<提交号>]
   ```
   这个命令会在指定路径下创建一个新的工作区，并检出相应的分支或提交。例如，如果你要在 `node_modules` 文件夹外创建一个新工作区，可以这样做：
   ```bash
   git worktree add ../new-feature-branch new-feature
   ```

2. **列出工作区**：
   ```bash
   git worktree list
   ```
   这个命令会列出当前所有的工作区及其状态。

3. **锁定工作区**：
   ```bash
   git worktree lock <工作区>
   ```
   如果你想防止某个工作区被意外删除或移动，可以使用此命令进行锁定。

4. **移动工作区**：
   ```bash
   git worktree move <工作区> <新路径>
   ```
   可以用此命令将已有的工作区移动到新的位置。

5. **删除工作区**：
   ```bash
   git worktree remove <工作区>
   ```
   当某个工作区不再需要时，可以使用此命令将其删除。

### 实际应用：Node.js 项目中的 `node_modules`

通过使用 `git worktree`，你可以为每个分支创建独立的工作区。例如：

1. **为 bug 修复创建工作区**：
   ```bash
   git worktree add ../bug-fix-branch bug-fix
   ```

2. **为新特性创建工作区**：
   ```bash
   git worktree add ../feature-branch feature
   ```

现在，你可以在不同的工作区中独立安装依赖，这样就不会出现 `node_modules` 之间的冲突。每个工作区都可以有自己的依赖环境，确保你的开发过程更加顺畅。

> [!TIP]
>
> - 使用 `--detach` 选项，可以在没有创建新分支的情况下检出特定提交。
> - 通过 `prune` 命令清理已删除的工作区，以保持环境整洁。
> - 定期使用 `list` 命令检查当前的工作区状态，避免混淆。

## 第二节 git补丁

### 什么是 `git am`

`git am` 用于应用邮件格式的补丁，通常用于将来自邮件的补丁文件应用到 Git 仓库中。这在开源项目中非常常见，因为开发者经常通过邮件发送补丁。

### 基本语法

```bash
git am [options] [<patch>...]
```

### 常用选项

- **`--signoff`**：在提交消息中添加 `Signed-off-by` 行。
- **`--3way`**：如果补丁无法直接应用，尝试进行三方合并。
- **`--abort`**：取消当前操作并恢复到之前的状态。
- **`--continue`**：在解决完冲突后，继续应用补丁。
- **`--skip`**：跳过当前补丁，继续应用下一个补丁。

### 应用补丁的步骤

#### 1. 准备补丁文件

确保您有一个有效的补丁文件。补丁文件通常由 `git format-patch` 命令生成，格式如下：

```bash
git format-patch -1 <commit-hash>
```

这将创建一个以提交消息命名的 `.patch` 文件。

#### 2. 应用补丁

使用 `git am` 命令应用补丁：

```bash
git am <path-to-patch-file>
```

例如：

```bash
git am fix.patch
```

#### 3. 处理冲突

如果在应用补丁时遇到冲突，您会看到类似于以下的错误消息：

```
Applying: Your commit message here
error: could not apply <commit-hash>
```

##### 解决冲突的步骤：

1. **查看冲突文件**：
   使用 `git status` 查看哪些文件存在冲突。

2. **手动解决冲突**：
   打开有冲突的文件，按照您的需求修改冲突部分。

3. **标记冲突已解决**：
   使用以下命令标记冲突已解决：

   ```bash
   git add <resolved-file>
   ```

4. **继续应用补丁**：
   运行以下命令继续应用剩余的补丁：

   ```bash
   git am --continue
   ```

5. **如果需要放弃补丁**：
   如果决定不继续应用补丁，可以使用：

   ```bash
   git am --abort
   ```

#### 4. 查看提交历史

成功应用补丁后，使用以下命令查看提交历史，以确认补丁已被正确添加：

```bash
git log --oneline
```

### 示例

1. **从文件应用补丁**：

   假设您有一个补丁文件 `fix.patch`，可以使用以下命令：

   ```bash
   git am fix.patch
   ```

2. **从标准输入应用补丁**：

   如果您想直接从邮件中应用补丁，可以使用：

   ```bash
   git am < email.txt
   ```

3. **使用选项**：

   应用一个补丁并添加签名：

   ```bash
   git am --signoff fix.patch
   ```

### 总结

`git am` 是一个强大的工具，可以方便地将邮件格式的补丁应用到您的 Git 项目中。确保在应用补丁之前，工作目录是干净的，并准备好处理可能出现的冲突。通过上述步骤和示例，您应该能够有效地使用 `git am`。

<Waiting/>
