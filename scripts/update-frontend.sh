#!/bin/bash

# 更新前端代码脚本
# 从 Poetrupfrontend 仓库同步最新代码到 Next.js 项目

set -e

echo "🔄 开始更新前端代码..."

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FRONTEND_REPO="$PROJECT_ROOT/tmp/poetrupfrontend"
NEXTJS_DIR="$PROJECT_ROOT/nextjs"
TRANSFORMER_DIR="$PROJECT_ROOT/scripts/code-transformer"
TRANSFORMER_SCRIPT="$TRANSFORMER_DIR/transformer.ts"

# 创建临时目录
mkdir -p "$PROJECT_ROOT/tmp"

# 1. 拉取前端仓库最新代码
echo -e "${YELLOW}📥 拉取前端仓库最新代码...${NC}"
if [ -d "$FRONTEND_REPO" ]; then
    cd "$FRONTEND_REPO"
    git fetch origin
    git checkout main
    git pull origin main
else
    git clone https://github.com/SongshGeo/Poetrupfrontend.git "$FRONTEND_REPO"
    cd "$FRONTEND_REPO"
fi

echo -e "${GREEN}✓ 前端代码已更新到最新版本${NC}"

# 2. 备份当前文件（可选）
echo -e "${YELLOW}💾 创建备份...${NC}"
BACKUP_DIR="$PROJECT_ROOT/backups/$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r "$NEXTJS_DIR/src/components" "$BACKUP_DIR/" 2>/dev/null || true
cp -r "$NEXTJS_DIR/src/app/app" "$BACKUP_DIR/" 2>/dev/null || true
echo -e "${GREEN}✓ 备份已创建: $BACKUP_DIR${NC}"

# 3. 复制 UI 组件
echo -e "${YELLOW}📦 更新 UI 组件...${NC}"
if [ -d "$FRONTEND_REPO/src/components/ui" ]; then
    rm -rf "$NEXTJS_DIR/src/components/ui"
    cp -r "$FRONTEND_REPO/src/components/ui" "$NEXTJS_DIR/src/components/"
    echo -e "${GREEN}✓ UI 组件已更新${NC}"
else
    echo -e "${RED}✗ 未找到 UI 组件目录${NC}"
fi

# 4. 检测文件是否需要转换
needs_transformation() {
    local file=$1
    # 检测是否包含 Supabase 调用
    if grep -qE "createClient|createBrowserClient|supabase\.from" "$file" 2>/dev/null; then
        return 0  # 需要转换
    fi
    return 1  # 不需要转换
}

# 转换文件
transform_component() {
    local src_file=$1
    local dest_file=$2
    
    if needs_transformation "$src_file"; then
        echo -e "  🔄 转换 $src_file..."
        # 使用 tsx 运行转换器
        if command -v npx &> /dev/null; then
            npx tsx "$TRANSFORMER_SCRIPT" "$src_file" > "$dest_file" 2>/dev/null || {
                echo -e "    ${RED}✗ 转换失败，直接复制${NC}"
                cp "$src_file" "$dest_file"
            }
        else
            echo -e "    ${YELLOW}⚠  tsx 未找到，直接复制（需要手动转换）${NC}"
            cp "$src_file" "$dest_file"
        fi
        return 0
    else
        # 直接复制
        cp "$src_file" "$dest_file"
        return 1
    fi
}

# 4. 复制业务组件
echo -e "${YELLOW}📦 更新业务组件...${NC}"
COMPONENTS_TO_COPY=(
    "DraggableWord.tsx"
    "DroppableFolder.tsx"
    "DroppableTag.tsx"
    "PoemCollectionView.tsx"
    "PoemEditView.tsx"
    "PropertiesPanel.tsx"
    "SelectionBox.tsx"
    "Sidebar.tsx"
    "TornWordCard.tsx"
    "WordCard.tsx"
    "WordListItem.tsx"
    "WorkPanel.tsx"
)

TRANSFORMED_FILES=()
COPIED_FILES=()

for component in "${COMPONENTS_TO_COPY[@]}"; do
    if [ -f "$FRONTEND_REPO/src/components/$component" ]; then
        src_file="$FRONTEND_REPO/src/components/$component"
        dest_file="$NEXTJS_DIR/src/components/$component"
        
        if transform_component "$src_file" "$dest_file"; then
            TRANSFORMED_FILES+=("$component")
            echo -e "  ${YELLOW}⚠  $component 已转换，请检查 API 调用是否正确${NC}"
        else
            COPIED_FILES+=("$component")
            echo -e "  ${GREEN}✓ $component${NC}"
        fi
    fi
done

# 5. 更新样式文件（合并 globals.css）
echo -e "${YELLOW}🎨 更新样式文件...${NC}"
if [ -f "$FRONTEND_REPO/src/index.css" ]; then
    # 提取纸张纹理相关的样式（这部分需要手动合并）
    echo -e "${YELLOW}⚠  globals.css 需要手动合并纸张纹理样式${NC}"
    echo -e "   请检查: $FRONTEND_REPO/src/index.css"
fi

# 6. 应用必要的转换
echo -e "${YELLOW}🔧 应用 Next.js 转换...${NC}"

# 6.1 修复导入路径（相对路径 -> @/ 别名）
find "$NEXTJS_DIR/src/components" -name "*.tsx" -o -name "*.ts" | while read file; do
    # 修复相对导入路径
    sed -i '' 's|from "\./ui/|from "@/components/ui/|g' "$file"
    sed -i '' 's|from "\.\./ui/|from "@/components/ui/|g' "$file"
    sed -i '' 's|from "\./TornWordCard|from "@/components/TornWordCard|g' "$file"
    sed -i '' 's|from "\./WordCard|from "@/components/WordCard|g' "$file"
    sed -i '' 's|from "\./DraggableWord|from "@/components/DraggableWord|g' "$file"
    
    # 移除版本号从导入路径
    sed -i '' 's/@[0-9][0-9.]*//g' "$file"
    
    # 修复 XIcon -> X
    sed -i '' 's/XIcon/X/g' "$file"
done

# 6.2 如果更新了 App.tsx，需要手动转换为页面
if [ -f "$FRONTEND_REPO/src/App.tsx" ]; then
    echo -e "${YELLOW}⚠  App.tsx 已更新，需要手动转换为 Next.js 页面${NC}"
    echo -e "   源文件: $FRONTEND_REPO/src/App.tsx"
    echo -e "   目标: $NEXTJS_DIR/src/app/app/page.tsx"
fi

# 7. 更新 package.json 依赖（如果需要）
echo -e "${YELLOW}📋 检查依赖更新...${NC}"
if [ -f "$FRONTEND_REPO/package.json" ]; then
    echo -e "${YELLOW}⚠  请检查前端 package.json 是否有新的依赖需要添加${NC}"
    echo -e "   源文件: $FRONTEND_REPO/package.json"
fi

echo -e "\n${GREEN}✅ 更新完成！${NC}"

# 生成更新报告
if [ ${#TRANSFORMED_FILES[@]} -gt 0 ]; then
    echo -e "\n${YELLOW}🔄 已转换的文件（包含 Supabase 调用）：${NC}"
    for file in "${TRANSFORMED_FILES[@]}"; do
        echo -e "  - $file"
    done
    echo -e "\n${YELLOW}⚠  这些文件需要手动检查 API 调用是否正确${NC}"
fi

if [ ${#COPIED_FILES[@]} -gt 0 ]; then
    echo -e "\n${GREEN}✓ 直接复制的文件（纯 UI 组件）：${NC}"
    for file in "${COPIED_FILES[@]}"; do
        echo -e "  - $file"
    done
fi

echo -e "\n${YELLOW}📝 后续步骤：${NC}"
echo -e "1. 检查是否有冲突需要解决"
echo -e "2. 检查已转换文件的 API 调用"
echo -e "3. 运行: cd nextjs && yarn install"
echo -e "4. 测试应用: yarn dev"
echo -e "5. 检查 TypeScript 错误: yarn lint"

