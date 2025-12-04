# Figma + Supabase 集成指南

本文档说明如何使用 Figma 生成的代码，并通过代码转换器自动集成到项目中。

## 概述

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

## 使用流程

### 1. 从 Figma 导出代码

使用 Figma 插件（Anima/App2）导出 React 代码，代码可能包含：

```typescript
// Figma 生成的代码示例
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(url, key);
const { data } = await supabase.from('words').select('*');
```

### 2. 运行更新脚本

```bash
./scripts/update-frontend.sh
```

脚本会自动：
- 检测文件是否包含 Supabase 调用
- 自动转换 Supabase 客户端初始化
- 添加 TODO 注释标记需要手动检查的数据库查询
- 生成更新报告

### 3. 手动检查和修复

转换器会标记需要手动检查的部分：

```typescript
// TODO: Manual review needed - contains Supabase database queries
// Replace with appropriate Hooks from @/lib/hooks/

// 原始代码
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

## 相关文件

- 代码转换器：`scripts/code-transformer/`
- Hooks：`nextjs/src/lib/hooks/`
- 适配器：`nextjs/src/lib/adapters/`
- Context：`nextjs/src/lib/context/AppDataContext.tsx`
- 更新脚本：`scripts/update-frontend.sh`

