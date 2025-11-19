#!/bin/bash

# 应用安全修复迁移脚本
# 修复 Supabase 数据库安全警告

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔒 开始应用安全修复...${NC}"
echo -e "${BLUE}🔒 Applying security fixes...${NC}"

# 检查 Supabase 是否运行
if ! npx supabase status &> /dev/null; then
    echo -e "${YELLOW}⚠  Supabase 本地服务未运行${NC}"
    echo -e "${YELLOW}正在启动 Supabase...${NC}"
    npx supabase start
fi

# 应用迁移
echo -e "\n${BLUE}📋 步骤 1: 应用安全修复迁移${NC}"
echo -e "${YELLOW}这将修复以下问题：${NC}"
echo -e "  - 函数 search_path 设置"
echo -e "  - pg_trgm 扩展位置"
echo ""

read -p "是否应用到本地数据库? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}正在应用迁移...${NC}"
    npx supabase migration up
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ 迁移应用成功！${NC}"
    else
        echo -e "${RED}✗ 迁移应用失败${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}已跳过本地迁移${NC}"
fi

# 提示同步到云端
echo -e "\n${BLUE}📋 步骤 2: 同步到云端${NC}"
echo -e "${YELLOW}要将这些修复同步到云端，请运行：${NC}"
echo -e "  ${BLUE}./scripts/sync-to-cloud.sh${NC}"
echo ""

# 提示启用泄露密码保护
echo -e "${BLUE}📋 步骤 3: 启用泄露密码保护（需要在 Dashboard 中手动操作）${NC}"
echo -e "${YELLOW}请按照以下步骤操作：${NC}"
echo -e "  1. 访问 Supabase Dashboard: https://supabase.com/dashboard/project/qsqohnmpxuxgeijjosrg"
echo -e "  2. 进入 ${BLUE}Authentication${NC} -> ${BLUE}Settings${NC} -> ${BLUE}Password${NC}"
echo -e "  3. 找到 ${BLUE}Leaked Password Protection${NC} 或 ${BLUE}HaveIBeenPwned${NC}"
echo -e "  4. 启用该功能"
echo ""

echo -e "${GREEN}✅ 安全修复指南完成！${NC}"
echo -e "${YELLOW}详细文档请查看: ${BLUE}docs/SECURITY_FIXES.md${NC}"

