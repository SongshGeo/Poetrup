# 前端代码更新指南

本文档说明如何从 `Poetrupfrontend` 仓库同步更新前端代码到 Next.js 项目。

## 📋 更新流程概述

当前集成方式：**直接复制 + 自动转换**

- ✅ 优点：简单直接，易于理解
- ⚠️ 注意：需要手动处理一些 Next.js 特定的转换

## 🚀 快速更新（推荐）

使用提供的更新脚本：

```bash
# 在项目根目录运行
./scripts/update-frontend.sh
```

脚本会自动：
1. 拉取前端仓库最新代码
2. 创建备份
3. 复制 UI 组件和业务组件
4. 应用基本的路径转换
5. 提示需要手动处理的部分

## 📝 手动更新步骤

如果脚本无法满足需求，可以手动更新：

### 1. 拉取前端代码

```bash
# 如果还没有配置远程仓库
git remote add frontend https://github.com/SongshGeo/Poetrupfrontend.git

# 拉取最新代码
git fetch frontend
git checkout frontend/main -- tmp/poetrupfrontend
# 或者直接克隆
git clone https://github.com/SongshGeo/Poetrupfrontend.git tmp/poetrupfrontend
cd tmp/poetrupfrontend
git pull origin main
```

### 2. 更新 UI 组件

```bash
# 从临时目录复制 UI 组件
rm -rf nextjs/src/components/ui
cp -r tmp/poetrupfrontend/src/components/ui nextjs/src/components/
```

### 3. 更新业务组件

需要更新的组件列表：
- `DraggableWord.tsx`
- `DroppableFolder.tsx`
- `DroppableTag.tsx`
- `PoemCollectionView.tsx`
- `PoemEditView.tsx`
- `PropertiesPanel.tsx`
- `SelectionBox.tsx`
- `Sidebar.tsx`
- `TornWordCard.tsx`
- `WordCard.tsx`
- `WordListItem.tsx`
- `WorkPanel.tsx`

```bash
# 批量复制
for file in DraggableWord DroppableFolder DroppableTag PoemCollectionView PoemEditView PropertiesPanel SelectionBox Sidebar TornWordCard WordCard WordListItem WorkPanel; do
  cp tmp/poetrupfrontend/src/components/${file}.tsx nextjs/src/components/
done
```

### 4. 应用 Next.js 转换

#### 4.1 修复导入路径

```bash
# 在 nextjs/src/components 目录下运行
find . -name "*.tsx" -o -name "*.ts" | xargs sed -i '' \
  -e 's|from "\./ui/|from "@/components/ui/|g' \
  -e 's|from "\.\./ui/|from "@/components/ui/|g' \
  -e 's|from "\./TornWordCard|from "@/components/TornWordCard|g' \
  -e 's|from "\./WordCard|from "@/components/WordCard|g'
```

#### 4.2 移除版本号

```bash
# 移除导入路径中的版本号（如 sonner@2.0.3 -> sonner）
find nextjs/src/components -name "*.tsx" -o -name "*.ts" | xargs sed -i '' 's/@[0-9][0-9.]*//g'
```

#### 4.3 修复图标导入

```bash
# XIcon -> X (lucide-react)
find nextjs/src/components -name "*.tsx" | xargs sed -i '' 's/XIcon/X/g'
```

### 5. 更新主页面（如果 App.tsx 有变化）

如果前端同事更新了 `App.tsx`，需要手动转换为 Next.js 页面：

**源文件结构（Vite + React）：**
```tsx
// src/App.tsx
export default function App() {
  // ... 组件逻辑
}
```

**目标文件结构（Next.js）：**
```tsx
// nextjs/src/app/app/page.tsx
"use client";
import { useRouter } from "next/navigation";
// ... 其他导入

export default function PoetryPage() {
  const router = useRouter();
  // ... 组件逻辑
  // 注意：路由跳转需要使用 router.push() 而不是内部状态
}
```

**主要转换点：**
1. 添加 `"use client"` 指令
2. 使用 `useRouter()` 替代内部路由状态
3. 将 `setAppViewMode('poem-collection')` 改为 `router.push('/app/poetry/collection')`
4. 集成 `useGlobal()` 获取用户信息
5. 集成 `createSPASassClient()` 处理登出等功能

### 6. 更新样式文件

如果 `globals.css` 有纸张纹理相关的更新，需要手动合并：

```bash
# 查看前端样式
cat tmp/poetrupfrontend/src/index.css

# 手动合并到
# nextjs/src/app/globals.css
```

需要保留的样式：
- `:root` 中的纸张纹理变量
- `.paper-bg`, `.paper-card` 等工具类
- 动画定义（`@keyframes`）

### 7. 更新依赖

检查前端 `package.json` 是否有新依赖：

```bash
# 对比依赖
diff <(cat tmp/poetrupfrontend/package.json | jq '.dependencies') \
     <(cat nextjs/package.json | jq '.dependencies')
```

如果有新依赖，添加到 `nextjs/package.json` 并运行：

```bash
cd nextjs
yarn install
```

## ⚠️ 常见问题

### 1. 导入路径错误

**问题：** `Module not found: Can't resolve './utils'`

**解决：** 确保所有相对导入都改为 `@/` 别名：
```bash
find nextjs/src -name "*.tsx" | xargs sed -i '' 's|from "\./utils|from "@/lib/utils|g'
```

### 2. 版本号导入

**问题：** `Module not found: Can't resolve 'sonner@2.0.3'`

**解决：** 移除导入路径中的版本号：
```bash
find nextjs/src -name "*.tsx" | xargs sed -i '' 's/@[0-9][0-9.]*//g'
```

### 3. 路由跳转问题

**问题：** 页面跳转不工作

**解决：** 确保使用 Next.js 的 `useRouter`：
```tsx
import { useRouter } from "next/navigation";
const router = useRouter();
router.push('/app/poetry/collection');
```

### 4. 样式丢失

**问题：** 纸张纹理样式不显示

**解决：** 检查 `globals.css` 中的 CSS 变量和工具类是否完整。

## 🔄 更新检查清单

更新完成后，请检查：

- [ ] 所有组件导入路径正确（使用 `@/` 别名）
- [ ] 没有版本号在导入路径中
- [ ] 路由跳转使用 `useRouter()`
- [ ] 用户信息正确显示（使用 `useGlobal()`）
- [ ] 样式文件完整（纸张纹理相关）
- [ ] 依赖已更新（`yarn install`）
- [ ] TypeScript 无错误（`yarn lint`）
- [ ] 应用可以正常运行（`yarn dev`）

## 📞 需要帮助？

如果遇到问题：
1. 检查备份目录：`backups/YYYYMMDD_HHMMSS/`
2. 查看前端仓库的变更：`git log tmp/poetrupfrontend`
3. 对比文件差异：`diff -r nextjs/src/components tmp/poetrupfrontend/src/components`

## 🎯 最佳实践

1. **更新前备份**：脚本会自动创建备份
2. **小步更新**：每次只更新一部分，测试通过后再继续
3. **保留转换记录**：记录手动修改的部分，便于后续参考
4. **测试优先**：更新后立即测试，确保功能正常

