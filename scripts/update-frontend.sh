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
NEXTJS_DIR="$PROJECT_ROOT/nextjs"
TRANSFORMER_DIR="$PROJECT_ROOT/scripts/code-transformer"
TRANSFORMER_SCRIPT="$TRANSFORMER_DIR/transformer.ts"

# 前端仓库配置（可以通过环境变量覆盖）
FRONTEND_REPO_URL="${FRONTEND_REPO_URL:-https://github.com/SongshGeo/Wordfallgemini.git}"
FRONTEND_REPO_BRANCH="${FRONTEND_REPO_BRANCH:-main}"
FRONTEND_REPO_DIR="$PROJECT_ROOT/tmp/wordfallgemini"

# 创建临时目录
mkdir -p "$PROJECT_ROOT/tmp"

# 1. 拉取前端仓库最新代码
echo -e "${YELLOW}📥 拉取前端仓库最新代码...${NC}"
echo -e "   仓库: $FRONTEND_REPO_URL"
echo -e "   分支: $FRONTEND_REPO_BRANCH"
if [ -d "$FRONTEND_REPO_DIR" ]; then
    cd "$FRONTEND_REPO_DIR"
    git fetch origin
    git checkout "$FRONTEND_REPO_BRANCH"
    git pull origin "$FRONTEND_REPO_BRANCH"
else
    git clone "$FRONTEND_REPO_URL" "$FRONTEND_REPO_DIR"
    cd "$FRONTEND_REPO_DIR"
    git checkout "$FRONTEND_REPO_BRANCH"
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
# 尝试多个可能的路径
UI_PATHS=(
    "$FRONTEND_REPO_DIR/src/components/ui"
    "$FRONTEND_REPO_DIR/src/src/components/ui"
    "$FRONTEND_REPO_DIR/components/ui"
)

UI_FOUND=false
for UI_PATH in "${UI_PATHS[@]}"; do
    if [ -d "$UI_PATH" ]; then
        rm -rf "$NEXTJS_DIR/src/components/ui"
        cp -r "$UI_PATH" "$NEXTJS_DIR/src/components/"
        echo -e "${GREEN}✓ UI 组件已更新（来源: $UI_PATH）${NC}"
        UI_FOUND=true
        break
    fi
done

if [ "$UI_FOUND" = false ]; then
    echo -e "${YELLOW}⚠  未找到 UI 组件目录，跳过${NC}"
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

# 尝试多个可能的组件目录路径
COMPONENT_DIRS=(
    "$FRONTEND_REPO_DIR/src/components"
    "$FRONTEND_REPO_DIR/src/src/components/interactive"
    "$FRONTEND_REPO_DIR/src/src/components"
    "$FRONTEND_REPO_DIR/components"
)

COMPONENT_DIR=""
for DIR in "${COMPONENT_DIRS[@]}"; do
    if [ -d "$DIR" ] && [ "$(find "$DIR" -maxdepth 1 -name "*.tsx" -o -name "*.tsx" | wc -l)" -gt 0 ]; then
        COMPONENT_DIR="$DIR"
        echo -e "  找到组件目录: $DIR"
        break
    fi
done

if [ -z "$COMPONENT_DIR" ]; then
    echo -e "${RED}✗ 未找到组件目录${NC}"
else
    TRANSFORMED_FILES=()
    COPIED_FILES=()
    
    # 复制所有 .tsx 文件（排除 ui 目录和特殊文件）
    find "$COMPONENT_DIR" -maxdepth 1 -name "*.tsx" -o -name "*.ts" | while read -r src_file; do
        component=$(basename "$src_file")
        # 跳过 UI 组件和特殊文件
        if [[ "$component" == *"ui"* ]] || [[ "$component" == "App.tsx" ]] || [[ "$component" == "main.tsx" ]]; then
            continue
        fi
        
        dest_file="$NEXTJS_DIR/src/components/$component"
        
        if transform_component "$src_file" "$dest_file"; then
            TRANSFORMED_FILES+=("$component")
            echo -e "  ${YELLOW}⚠  $component 已转换，请检查 API 调用是否正确${NC}"
        else
            COPIED_FILES+=("$component")
            echo -e "  ${GREEN}✓ $component${NC}"
        fi
    done
fi

# 5. 更新样式文件（合并 globals.css）
echo -e "${YELLOW}🎨 更新样式文件...${NC}"
STYLE_FILES=(
    "$FRONTEND_REPO_DIR/src/index.css"
    "$FRONTEND_REPO_DIR/src/styles/globals.css"
    "$FRONTEND_REPO_DIR/index.css"
)

STYLE_FOUND=false
for STYLE_FILE in "${STYLE_FILES[@]}"; do
    if [ -f "$STYLE_FILE" ]; then
        echo -e "${YELLOW}⚠  发现样式文件: $STYLE_FILE${NC}"
        echo -e "   请手动检查是否需要合并到 nextjs/src/app/globals.css"
        STYLE_FOUND=true
        break
    fi
done

if [ "$STYLE_FOUND" = false ]; then
    echo -e "${GREEN}✓ 未发现新的样式文件${NC}"
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
APP_FILES=(
    "$FRONTEND_REPO_DIR/src/App.tsx"
    "$FRONTEND_REPO_DIR/src/src/App.tsx"
)

for APP_FILE in "${APP_FILES[@]}"; do
    if [ -f "$APP_FILE" ]; then
        echo -e "${YELLOW}⚠  App.tsx 已更新，需要手动转换为 Next.js 页面${NC}"
        echo -e "   源文件: $APP_FILE"
        echo -e "   目标: $NEXTJS_DIR/src/app/app/page.tsx"
        break
    fi
done

# 7. 更新 package.json 依赖（如果需要）
echo -e "${YELLOW}📋 检查依赖更新...${NC}"
if [ -f "$FRONTEND_REPO_DIR/package.json" ]; then
    echo -e "${YELLOW}⚠  请检查前端 package.json 是否有新的依赖需要添加${NC}"
    echo -e "   源文件: $FRONTEND_REPO_DIR/package.json"
    echo -e "   运行: cd nextjs && yarn install"
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

