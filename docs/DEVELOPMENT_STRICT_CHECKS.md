# 开发环境严格检查配置指南

## 问题说明

### 为什么 `yarn dev` 不会显示类型错误？

Next.js 在开发模式和生产构建模式下的行为不同：

1. **开发模式 (`yarn dev`)**:
   - 使用增量编译，只检查修改的文件
   - 类型检查更宽松，主要关注快速反馈
   - 不会进行完整的类型验证
   - 允许一些类型错误存在，以便快速开发

2. **生产构建 (`yarn build`)**:
   - 进行完整的类型检查和优化
   - 所有类型错误都会被捕获
   - 更严格的检查确保代码质量

这就是为什么在开发环境中看起来正常，但构建时会出现类型错误的原因。

## 解决方案

我们已经配置了以下工具来确保开发和生产环境的一致性：

### 1. 类型检查脚本

在 `nextjs/package.json` 中添加了以下脚本：

```json
{
  "scripts": {
    "type-check": "tsc --noEmit",           // 完整类型检查（不生成文件）
    "type-check:watch": "tsc --noEmit --watch",  // 监听模式类型检查
    "verify": "yarn type-check && yarn lint",     // 完整检查（类型 + 代码规范）
    "check:staged": "lint-staged"                // 只检查暂存的文件
  }
}
```

### 2. Pre-commit 钩子

使用 `husky` + `lint-staged` 在提交前自动检查：

- **只检查暂存的文件**（快速）
- **自动修复可修复的问题**
- **阻止有错误的提交**

### 3. Pre-push 钩子

在推送前进行完整检查：

- **完整的类型检查**
- **完整的代码规范检查**
- **确保代码质量**

## 使用方法

### 开发时手动检查

```bash
cd nextjs

# 完整类型检查
yarn type-check

# 监听模式类型检查（推荐在开发时使用）
yarn type-check:watch

# 完整检查（类型 + 代码规范）
yarn check
```

### 提交代码

当你执行 `git commit` 时：

1. **自动运行 `lint-staged`**
   - 只检查你修改的文件
   - 自动修复可修复的问题
   - 如果有无法自动修复的错误，会阻止提交

2. **如果检查失败**：
   ```bash
   # 修复错误后重新提交
   git add .
   git commit -m "your message"
   ```

### 推送代码

当你执行 `git push` 时：

1. **自动运行完整检查**
   - 类型检查所有文件
   - 代码规范检查所有文件

2. **如果检查失败**：
   ```bash
   # 修复错误后重新推送
   git push
   ```

## 推荐工作流程

### 方案 1: 开发时使用监听模式（推荐）

在一个终端运行：
```bash
cd nextjs
yarn type-check:watch
```

在另一个终端运行：
```bash
cd nextjs
yarn dev
```

这样你可以在开发时实时看到类型错误。

### 方案 2: 提交前手动检查

在提交前运行：
```bash
cd nextjs
yarn verify
```

确保没有错误后再提交。

### 方案 3: 依赖 Git 钩子（最简单）

直接提交，让 Git 钩子自动检查。如果有错误，修复后重新提交。

## 配置说明

### lint-staged 配置

在 `nextjs/package.json` 中配置了 `lint-staged`：

```json
{
  "lint-staged": {
    "*.{ts,tsx}": [
      "eslint --fix",                    // 自动修复 ESLint 问题
      "bash -c 'tsc --noEmit --pretty'" // 类型检查
    ],
    "*.{js,jsx}": [
      "eslint --fix"
    ]
  }
}
```

### TypeScript 配置

`nextjs/tsconfig.json` 已经启用了严格模式：

```json
{
  "compilerOptions": {
    "strict": true,  // 启用所有严格检查
    // ... 其他配置
  }
}
```

### Husky 配置

Git 钩子配置在项目根目录的 `.husky/` 目录：

- `.husky/pre-commit` - 提交前检查暂存文件
- `.husky/pre-push` - 推送前完整检查

## 常见问题

### Q: 如何跳过 Git 钩子？

**不推荐**，但如果有紧急情况：

```bash
# 跳过 pre-commit
git commit --no-verify

# 跳过 pre-push
git push --no-verify
```

### Q: 如何临时禁用某个检查？

在代码中添加注释：

```typescript
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const data = something as any;
```

### Q: 类型检查太慢怎么办？

- 使用 `yarn type-check:watch` 只检查修改的文件
- 或者只在提交前运行 `yarn check`

### Q: 如何更新 husky 配置？

```bash
cd nextjs
yarn husky install
```

### Q: 为什么 lint-staged 中的 tsc 检查失败？

`lint-staged` 中的 `tsc` 只检查暂存的文件，可能会因为缺少依赖的类型定义而失败。这是正常的，因为 TypeScript 需要完整的项目上下文。pre-push 钩子会进行完整的类型检查。

## 总结

现在你的开发环境已经配置了：

✅ **开发时类型检查** - `yarn type-check:watch`  
✅ **提交前自动检查** - Git pre-commit 钩子（只检查暂存文件）  
✅ **推送前完整检查** - Git pre-push 钩子（完整检查）  
✅ **与生产环境一致** - 使用相同的检查规则

这样可以确保：
- 开发时就能发现类型错误
- 提交的代码都是经过检查的
- 生产构建不会因为类型错误失败

## 工具说明

我们使用的工具都是业界标准：

- **Husky**: 最流行的 Git hooks 工具，被广泛使用
- **lint-staged**: 只检查暂存的文件，提高效率
- **TypeScript**: 使用 `tsc --noEmit` 进行类型检查

这些工具都是现成的、经过验证的解决方案，不需要自己编写复杂的脚本。
