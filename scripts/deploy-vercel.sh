#!/bin/bash

# Vercel CLI 部署脚本
# 完全使用命令行部署，无需网页操作

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NEXTJS_DIR="$PROJECT_ROOT/nextjs"

echo "🚀 开始部署到 Vercel..."
echo "🚀 Starting deployment to Vercel..."

cd "$NEXTJS_DIR"

# 检查 Vercel CLI
if ! command -v vercel &> /dev/null && ! npx vercel --version &> /dev/null; then
    echo -e "${YELLOW}⚠  Vercel CLI 未安装${NC}"
    echo -e "${YELLOW}正在使用 npx vercel...${NC}"
    VERCEL_CMD="npx vercel"
else
    if command -v vercel &> /dev/null; then
        VERCEL_CMD="vercel"
    else
        VERCEL_CMD="npx vercel"
    fi
fi

# 检查登录状态
echo -e "\n${BLUE}📋 步骤 1: 检查登录状态${NC}"
if ! $VERCEL_CMD whoami &> /dev/null; then
    echo -e "${YELLOW}⚠  未登录，请先登录...${NC}"
    $VERCEL_CMD login
else
    echo -e "${GREEN}✓ 已登录${NC}"
    $VERCEL_CMD whoami
fi

# 检查项目链接
echo -e "\n${BLUE}📋 步骤 2: 检查项目链接${NC}"
if [ ! -f ".vercel/project.json" ]; then
    echo -e "${YELLOW}⚠  项目未链接，正在链接...${NC}"
    echo -e "${YELLOW}提示：${NC}"
    echo -e "  - Set up and deploy? → Y"
    echo -e "  - Which scope? → 选择你的账号"
    echo -e "  - Link to existing project? → N (首次) 或 Y (已有项目)"
    echo -e "  - Project name? → poetrup (或你喜欢的名字)"
    echo -e "  - Directory? → . (当前目录)"
    $VERCEL_CMD link
else
    echo -e "${GREEN}✓ 项目已链接${NC}"
    cat .vercel/project.json
fi

# 检查环境变量
echo -e "\n${BLUE}📋 步骤 3: 检查环境变量${NC}"
ENV_VARS=(
    "NEXT_PUBLIC_SUPABASE_URL"
    "NEXT_PUBLIC_SUPABASE_ANON_KEY"
    "PRIVATE_SUPABASE_SERVICE_KEY"
)

MISSING_VARS=()
for var in "${ENV_VARS[@]}"; do
    if ! $VERCEL_CMD env ls production 2>/dev/null | grep -q "$var"; then
        MISSING_VARS+=("$var")
    fi
done

if [ ${#MISSING_VARS[@]} -gt 0 ]; then
    echo -e "${YELLOW}⚠  缺少以下环境变量：${NC}"
    for var in "${MISSING_VARS[@]}"; do
        echo -e "  - $var"
    done
    echo -e "\n${YELLOW}请手动添加环境变量：${NC}"
    echo -e "${BLUE}$VERCEL_CMD env add <VAR_NAME> production${NC}"
    echo -e "\n或者从 .env.local 读取（如果存在）："
    if [ -f ".env.local" ]; then
        read -p "是否从 .env.local 添加环境变量? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            source .env.local
            for var in "${MISSING_VARS[@]}"; do
                if [ -n "${!var}" ]; then
                    echo -e "${YELLOW}添加 $var...${NC}"
                    echo "${!var}" | $VERCEL_CMD env add "$var" production
                fi
            done
        fi
    fi
else
    echo -e "${GREEN}✓ 所有环境变量已配置${NC}"
fi

# 部署
echo -e "\n${BLUE}📋 步骤 4: 部署到生产环境${NC}"
read -p "是否现在部署? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}正在部署...${NC}"
    if $VERCEL_CMD --prod --yes; then
        echo -e "\n${GREEN}✅ 部署成功！${NC}"
        echo -e "\n${YELLOW}📝 后续步骤：${NC}"
        echo -e "1. 在 Supabase Dashboard 配置重定向 URL"
        echo -e "   - 项目设置 -> Authentication -> URL Configuration"
        echo -e "   - 添加你的 Vercel URL: https://your-project.vercel.app/**"
        echo -e "2. 访问部署的 URL 测试功能"
        echo -e "3. 查看部署详情: $VERCEL_CMD inspect"
    else
        echo -e "${RED}✗ 部署失败${NC}"
        echo -e "${YELLOW}查看日志: $VERCEL_CMD logs${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}已取消部署${NC}"
    echo -e "\n手动部署命令："
    echo -e "  ${BLUE}cd nextjs${NC}"
    echo -e "  ${BLUE}$VERCEL_CMD --prod${NC}"
fi

