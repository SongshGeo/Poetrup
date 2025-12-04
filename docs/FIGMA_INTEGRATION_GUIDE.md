# Figma + Supabase 集成指南

## 🎯 一句话说明

**前端同事在 Figma 中更新代码 → 你运行 `make update-frontend` → 自动集成到项目**

就这么简单！

## 📋 快速开始

### 步骤 1: 前端同事更新代码

前端同事在 Figma 中设计并生成代码，推送到前端仓库（如 `Poetrupfrontend` 或 `Wordfallgemini`）

### 步骤 2: 你运行更新命令

```bash
make update-frontend
```

就这么简单！脚本会自动：
- ✅ 拉取最新前端代码
- ✅ 检测并转换 Supabase 调用
- ✅ 修复导入路径
- ✅ 生成更新报告

### 步骤 3: 检查并测试

```bash
cd nextjs && yarn install  # 安装新依赖（如果有）
yarn dev                   # 启动开发服务器测试
```

## 🔍 详细说明

### 概述

当使用 Figma 插件（如 Anima、App2）生成包含 Supabase 调用的 React 代码时，代码转换器可以自动将这些调用转换为项目标准的 API 调用模式。

## 架构设计

### 五层分离架构

```
┌─────────────────────────────────────────┐
│  UI Layer (Figma 生成层)                │
│  - 从 Figma 直接拉取                    │
│  - 可能包含 Supabase 调用               │
└─────────────────────────────────────────┘
           ↓ (代码转换器自动处理)
┌─────────────────────────────────────────┐
│  Code Transformer (代码转换层)          │
│  - AST 分析识别 Supabase 调用          │
│  - 自动替换为统一 Hooks                 │
└─────────────────────────────────────────┘
           ↓ (通过统一 Hooks)
┌─────────────────────────────────────────┐
│  Hooks Layer (业务逻辑层)                │
│  - useWords, useCollections, usePoetry │
└─────────────────────────────────────────┘
           ↓ (通过 Adapter)
┌─────────────────────────────────────────┐
│  Adapter Layer (数据适配层)              │
│  - 数据格式转换                          │
└─────────────────────────────────────────┘
           ↓ (调用)
┌─────────────────────────────────────────┐
│  Data Layer (数据层)                     │
│  - Supabase API 调用                     │
└─────────────────────────────────────────┘
```

## 📖 完整工作流程

### 前端同事的工作（Figma 端）

1. **在 Figma 中设计界面**
2. **使用插件（Anima/App2）生成代码**
3. **推送到 Git 仓库**

### 你的工作（后端集成端）

1. **运行更新命令**
   ```bash
   make update-frontend
   ```

2. **查看更新报告**
   - 脚本会告诉你哪些文件被转换了
   - 哪些文件需要手动检查

3. **安装依赖（如果有新依赖）**
   ```bash
   cd nextjs && yarn install
   ```

4. **测试应用**
   ```bash
   yarn dev
   ```

## ⚠️ 重要提示

### 脚本会自动做什么？

✅ **自动转换**：
- Supabase 客户端初始化（`createClient` → `createSPAClient`）
- 导入路径修复（相对路径 → `@/` 别名）

⚠️ **需要手动检查**：
- 数据库查询（`supabase.from().select()` → 需要替换为 Hooks）
- 数据操作（`insert/update/delete` → 需要替换为 Hooks 方法）

### 如果看到转换警告

脚本会在文件中添加 TODO 注释，告诉你需要手动替换的部分：

```typescript
// TODO: Manual review needed - contains Supabase database queries
// Replace with appropriate Hooks from @/lib/hooks/

// 原始代码（需要手动替换）
const { data } = await supabase.from('words').select('*');

// 应替换为
import { useWords } from '@/lib/hooks/useWords';
const { words, loading, error } = useWords();
```

## 转换规则

### 规则 1: Supabase 客户端初始化

**转换前：**
```typescript
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, key);
```

**转换后：**
```typescript
import { createSPAClient } from '@/lib/supabase/client';
const supabase = createSPAClient();
```

### 规则 2: 数据库查询（需要手动替换）

**转换前：**
```typescript
const { data } = await supabase.from('words').select('*');
```

**转换后（手动）：**
```typescript
import { useWords } from '@/lib/hooks/useWords';
const { words, loading, error } = useWords();
```

### 规则 3: 数据操作（需要手动替换）

**转换前：**
```typescript
await supabase.from('words').insert({ text: '新词' });
```

**转换后（手动）：**
```typescript
import { useWords } from '@/lib/hooks/useWords';
const { addWord } = useWords();
await addWord({ text: '新词', category: 'life', partOfSpeech: 'n', tags: [], collectionIds: [] });
```

## 可用的 Hooks

### useWords

```typescript
import { useWords } from '@/lib/hooks/useWords';

const { words, loading, error, addWord, updateWord, deleteWord, refresh } = useWords();
```

### useCollections

```typescript
import { useCollections } from '@/lib/hooks/useCollections';

const { collections, loading, error, addCollection, updateCollection, deleteCollection, refresh } = useCollections();
```

### usePoetry

```typescript
import { usePoetry } from '@/lib/hooks/usePoetry';

const { poetry, loading, error, addPoetry, updatePoetry, deletePoetry, refresh } = usePoetry();
```

## 使用 AppDataContext

对于需要访问所有数据的组件，可以使用 `AppDataContext`：

```typescript
import { useAppData } from '@/lib/context/AppDataContext';

export const MyComponent = () => {
  const { words, collections, poetry } = useAppData();
  
  // 使用 words.words, collections.collections, poetry.poetry
  // 调用 words.addWord(), collections.addCollection(), poetry.addPoetry()
};
```

## 最佳实践

1. **优先使用 Hooks**：所有数据操作都应通过 Hooks 进行，而不是直接调用 Supabase API
2. **错误处理**：Hooks 已经包含了错误处理和 Toast 通知
3. **加载状态**：使用 Hooks 提供的 `loading` 状态显示加载指示器
4. **数据刷新**：调用 `refresh()` 方法手动刷新数据
5. **类型安全**：使用 TypeScript 类型确保数据格式正确

## 故障排除

### 转换失败

如果转换器无法处理某个文件：
1. 检查文件是否包含复杂的 Supabase 查询链
2. 手动替换为相应的 Hook 调用
3. 参考本文档的转换规则

### 类型错误

如果出现 TypeScript 类型错误：
1. 检查适配器是否正确转换了数据格式
2. 确保使用正确的类型导入
3. 检查 `components/types.ts` 中的类型定义

## 🎨 Figma 前端开发指南

### 给前端同事的建议

#### 1. 代码组织规范

**✅ 推荐做法：**
- 将 UI 组件放在 `src/components/` 目录
- 将业务逻辑组件放在 `src/components/interactive/` 或类似目录
- 使用清晰的组件命名（如 `WordGrid.tsx`, `PoemCanvas.tsx`）

**❌ 避免：**
- 不要在组件中直接调用 Supabase API（如果必须，脚本会自动转换）
- 不要使用硬编码的 API URL 或密钥
- 不要使用相对路径导入（脚本会自动修复）

#### 2. Supabase 调用规范

**如果必须使用 Supabase：**

```typescript
// ✅ 推荐：使用标准的 Supabase 客户端初始化
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, key);

// ✅ 推荐：使用标准的查询方式
const { data } = await supabase.from('words').select('*');
```

**脚本会自动转换为：**
```typescript
import { createSPAClient } from '@/lib/supabase/client';
const supabase = createSPAClient();
```

#### 3. 组件设计建议

**✅ 推荐：纯 UI 组件**
- 组件只负责展示，通过 props 接收数据
- 不包含任何数据获取逻辑
- 这样可以直接使用，无需转换

**示例：**
```typescript
// ✅ 好的组件设计
interface WordCardProps {
  word: Word;
  onClick?: () => void;
}

export const WordCard = ({ word, onClick }: WordCardProps) => {
  return <div onClick={onClick}>{word.text}</div>;
};
```

**⚠️ 如果包含数据操作：**
- 脚本会自动检测并添加 TODO 注释
- 需要手动替换为 Hooks 调用

#### 4. 使用 Make 命令（如果前端也用 Make）

如果前端项目也使用 Make，建议添加以下命令：

```makefile
# 前端项目的 Makefile 示例
.PHONY: dev build export

dev: ## 启动开发服务器
	npm run dev

build: ## 构建生产版本
	npm run build

export: ## 导出 Figma 设计到代码
	# 这里可以添加 Figma 插件导出命令
	# 或者手动导出后推送到 Git
```

## 🤖 AI 生成代码时的 Guideline

### 给 AI 的提示词模板

当使用 AI（如 ChatGPT、Claude）生成 Figma 组件代码时，可以使用以下提示词：

```
请生成一个 React 组件，要求：

1. **组件设计**：
   - 组件应该是纯 UI 组件，通过 props 接收数据
   - 不要包含数据获取逻辑
   - 使用 TypeScript 类型定义

2. **导入规范**：
   - 使用绝对路径导入（如 `@/components/ui/button`）
   - 不要使用相对路径（如 `./button` 或 `../button`）

3. **如果必须使用 Supabase**：
   - 使用标准的 `createClient` 初始化
   - 使用标准的查询方式（`supabase.from().select()`）
   - 脚本会自动转换，但会添加 TODO 注释需要手动检查

4. **样式规范**：
   - 使用 Tailwind CSS
   - 遵循项目的设计系统（纸张纹理主题）

5. **类型安全**：
   - 所有 props 都要有 TypeScript 类型
   - 不要使用 `any` 类型
```

### AI 生成代码检查清单

生成代码后，检查以下内容：

- [ ] 组件是否只负责 UI 展示？
- [ ] 是否通过 props 接收数据？
- [ ] 导入路径是否使用 `@/` 别名？
- [ ] 是否包含 TypeScript 类型定义？
- [ ] 是否避免使用 `any` 类型？
- [ ] 如果包含 Supabase 调用，是否使用标准方式？

## 📁 相关文件

- **更新命令**：`make update-frontend`（或 `./scripts/update-frontend.sh`）
- **代码转换器**：`scripts/code-transformer/`
- **Hooks**：`nextjs/src/lib/hooks/`
- **适配器**：`nextjs/src/lib/adapters/`
- **Context**：`nextjs/src/lib/context/AppDataContext.tsx`

## 🆘 常见问题

### Q: 更新后代码报错怎么办？

A: 
1. 检查是否有新的依赖需要安装：`cd nextjs && yarn install`
2. 检查 TypeScript 错误：`make type-check`
3. 检查 ESLint 错误：`make lint`
4. 查看更新报告中的转换文件，手动检查 API 调用

### Q: 脚本检测不到 Supabase 调用？

A: 脚本会检测以下模式：
- `createClient`
- `createBrowserClient`
- `supabase.from`

如果使用了其他方式，可能需要手动转换。

### Q: 前端仓库地址在哪里配置？

A: 在 `scripts/update-frontend.sh` 中配置：
```bash
FRONTEND_REPO="https://github.com/SongshGeo/Poetrupfrontend.git"
```

如果需要更改，编辑脚本文件即可。
