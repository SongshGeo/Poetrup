# Figma 前端开发指南（给前端同事）

本文档为前端同事提供 Figma 开发时的最佳实践和规范，确保生成的代码可以无缝集成到后端项目。

## 🎯 核心原则

**一句话：写纯 UI 组件，数据通过 props 传入，不要直接调用 Supabase API**

## 📋 组件开发规范

### ✅ 推荐做法

#### 1. 纯 UI 组件设计

```typescript
// ✅ 好的组件：只负责展示，通过 props 接收数据
interface WordCardProps {
  word: {
    id: string;
    text: string;
    category: string;
  };
  onClick?: () => void;
}

export const WordCard = ({ word, onClick }: WordCardProps) => {
  return (
    <div onClick={onClick} className="word-card">
      {word.text}
    </div>
  );
};
```

#### 2. 使用 TypeScript 类型

```typescript
// ✅ 好的做法：明确的类型定义
interface Word {
  id: string;
  text: string;
  category: string;
  tags: string[];
}

// ❌ 避免：使用 any
function processWord(word: any) { ... }
```

#### 3. 导入路径规范

```typescript
// ✅ 推荐：使用绝对路径（脚本会自动转换为 @/ 别名）
import { Button } from '@/components/ui/button';
import { WordCard } from '@/components/WordCard';

// ⚠️ 相对路径也可以（脚本会自动转换）
import { Button } from './ui/button';
```

### ❌ 避免的做法

#### 1. 不要在组件中直接调用 Supabase

```typescript
// ❌ 不推荐：组件中包含数据获取逻辑
export const WordList = () => {
  const [words, setWords] = useState([]);
  
  useEffect(() => {
    const supabase = createClient(url, key);
    supabase.from('words').select('*').then(({ data }) => {
      setWords(data);
    });
  }, []);
  
  return <div>{words.map(...)}</div>;
};

// ✅ 推荐：数据通过 props 传入
interface WordListProps {
  words: Word[];
}

export const WordList = ({ words }: WordListProps) => {
  return <div>{words.map(...)}</div>;
};
```

#### 2. 不要硬编码配置

```typescript
// ❌ 避免：硬编码 URL 和密钥
const supabase = createClient(
  'https://xxx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
);

// ✅ 推荐：使用环境变量（脚本会自动转换）
const supabase = createSPAClient();
```

#### 3. 不要使用复杂的查询链

```typescript
// ❌ 避免：复杂的查询链（脚本无法自动转换）
const result = await supabase
  .from('words')
  .select('*, collections(*)')
  .eq('creator_id', userId)
  .order('created_at', { ascending: false })
  .limit(10);

// ✅ 推荐：简单的查询（脚本会添加 TODO，需要手动替换）
const { data } = await supabase.from('words').select('*');
```

## 🤖 AI 生成代码时的提示词

### 标准提示词模板

```
请生成一个 React + TypeScript 组件，要求：

1. **组件设计**：
   - 组件应该是纯 UI 组件，只负责展示
   - 所有数据通过 props 传入
   - 不要包含任何数据获取逻辑（如 fetch、Supabase 调用）

2. **类型定义**：
   - 使用 TypeScript 定义所有 props 的类型
   - 不要使用 `any` 类型
   - 使用 interface 或 type 定义数据结构

3. **导入规范**：
   - 使用绝对路径导入（如 `@/components/ui/button`）
   - 如果使用相对路径，确保路径清晰（脚本会自动转换）

4. **样式**：
   - 使用 Tailwind CSS
   - 遵循项目的设计系统（纸张纹理主题，颜色：#6b9e8d, #1a2e29）

5. **如果必须使用 Supabase**（不推荐）：
   - 使用标准的 `createClient` 初始化
   - 使用简单的查询方式
   - 脚本会自动转换，但会添加 TODO 注释需要手动检查

6. **组件命名**：
   - 使用 PascalCase（如 `WordCard.tsx`）
   - 文件名与组件名一致

7. **代码质量**：
   - 不要有未使用的导入
   - 不要有未使用的变量
   - 遵循 React Hooks 规则
```

### 示例：生成 WordCard 组件

```
请生成一个 WordCard 组件，要求：

- 组件接收一个 word 对象作为 prop（包含 id, text, category, tags）
- 显示词语文本和分类
- 支持点击事件（通过 onClick prop）
- 使用 Tailwind CSS 样式
- 遵循项目的纸张纹理设计风格
- 使用 TypeScript 类型定义
- 不要包含任何数据获取逻辑
```

## 📁 文件组织规范

### 推荐的目录结构

```
src/
├── components/
│   ├── ui/              # UI 组件库（可以直接复制）
│   │   ├── button.tsx
│   │   ├── dialog.tsx
│   │   └── ...
│   ├── interactive/     # 交互式业务组件
│   │   ├── WordGrid.tsx
│   │   ├── PoemCanvas.tsx
│   │   └── ...
│   └── layout/          # 布局组件
│       ├── Sidebar.tsx
│       └── Header.tsx
├── types.ts             # 类型定义
└── App.tsx              # 主应用组件
```

### 文件命名规范

- **组件文件**：PascalCase（如 `WordCard.tsx`）
- **工具文件**：camelCase（如 `utils.ts`）
- **类型文件**：camelCase（如 `types.ts`）

## 🎨 样式规范

### 颜色系统

```typescript
// 项目主色调
const colors = {
  primary: '#6b9e8d',      // 主绿色
  text: '#1a2e29',        // 深色文字
  background: '#f5faf8',  // 浅色背景
  border: '#c5dfd6',      // 边框色
};
```

### Tailwind 类名规范

```typescript
// ✅ 推荐：使用语义化的类名
<div className="bg-[#f5faf8] text-[#1a2e29] border border-[#c5dfd6]">
  
// ✅ 也可以：使用 Tailwind 默认颜色（如果项目配置了）
<div className="bg-background text-foreground border-border">
```

## 🔧 使用 Make 命令（如果前端也用 Make）

### 推荐的 Makefile

```makefile
.PHONY: help dev build export lint

help: ## 显示帮助信息
	@echo "可用命令："
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

dev: ## 启动开发服务器
	npm run dev

build: ## 构建生产版本
	npm run build

lint: ## 运行代码检查
	npm run lint

export: ## 导出 Figma 设计（手动步骤）
	@echo "请使用 Figma 插件导出代码，然后推送到 Git 仓库"
```

## ✅ 代码提交前检查清单

在提交代码前，请检查：

- [ ] 组件是否只负责 UI 展示？
- [ ] 是否通过 props 接收数据？
- [ ] 是否包含 TypeScript 类型定义？
- [ ] 是否避免使用 `any` 类型？
- [ ] 是否没有硬编码的 API URL 或密钥？
- [ ] 是否没有直接调用 Supabase API？（如果必须，使用标准方式）
- [ ] 导入路径是否清晰？
- [ ] 是否有未使用的导入或变量？

## 📞 需要帮助？

如果遇到问题：
1. 查看后端项目的 `docs/FIGMA_INTEGRATION_GUIDE.md`
2. 联系后端同事
3. 查看更新脚本的输出报告

