#!/bin/bash

# 同步本地 Supabase 到云端脚本
# Sync local Supabase to cloud script

set -e

echo "🚀 开始同步本地 Supabase 到云端..."
echo "🚀 Starting sync from local Supabase to cloud..."

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 项目根目录
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PROJECT_ROOT"

# 检查 Supabase CLI（使用 npx，因为不支持全局安装）
if ! npx supabase --version &> /dev/null; then
    echo -e "${RED}✗ Supabase CLI 不可用${NC}"
    echo -e "${YELLOW}Supabase CLI 不支持全局安装，请使用 npx${NC}"
    echo -e "${YELLOW}如果 npx 不可用，请安装 Node.js 和 npm${NC}"
    exit 1
fi

# 步骤 1: 检查登录状态
echo -e "\n${BLUE}📋 步骤 1: 检查登录状态${NC}"
if ! npx supabase projects list &> /dev/null; then
    echo -e "${YELLOW}⚠ 未登录，请先登录...${NC}"
    npx supabase login
fi

# 步骤 2: 检查项目连接
echo -e "\n${BLUE}📋 步骤 2: 检查项目连接${NC}"
if [ ! -f ".supabase/config.toml" ] || ! grep -q "project_id" .supabase/config.toml 2>/dev/null; then
    echo -e "${YELLOW}⚠ 未连接到云端项目${NC}"
    echo -e "${YELLOW}请运行: npx supabase link --project-ref qsqohnmpxuxgeijjosrg${NC}"
    read -p "是否现在连接? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        npx supabase link --project-ref qsqohnmpxuxgeijjosrg
    else
        echo -e "${RED}✗ 已取消${NC}"
        exit 1
    fi
fi

# 步骤 3: 同步数据库迁移
echo -e "\n${BLUE}📋 步骤 3: 同步数据库迁移${NC}"
echo -e "${YELLOW}正在推送所有迁移到云端...${NC}"
if npx supabase migrations up --linked; then
    echo -e "${GREEN}✓ 数据库迁移已同步${NC}"
else
    echo -e "${RED}✗ 数据库迁移失败${NC}"
    echo -e "${YELLOW}请检查错误信息并手动修复${NC}"
    exit 1
fi

# 步骤 4: 同步配置
echo -e "\n${BLUE}📋 步骤 4: 同步配置${NC}"
echo -e "${YELLOW}正在推送配置到云端...${NC}"
if npx supabase config push; then
    echo -e "${GREEN}✓ 配置已同步${NC}"
else
    echo -e "${YELLOW}⚠ 配置推送失败（可能没有需要同步的配置）${NC}"
fi

# 步骤 5: 部署 Edge Functions（如果存在）
echo -e "\n${BLUE}📋 步骤 5: 部署 Edge Functions${NC}"
if [ -d "supabase/functions" ] && [ "$(ls -A supabase/functions)" ]; then
    echo -e "${YELLOW}正在部署 Edge Functions...${NC}"
    for func_dir in supabase/functions/*/; do
        if [ -d "$func_dir" ]; then
            func_name=$(basename "$func_dir")
            echo -e "  部署函数: $func_name"
            if npx supabase functions deploy "$func_name"; then
                echo -e "  ${GREEN}✓ $func_name 部署成功${NC}"
            else
                echo -e "  ${YELLOW}⚠ $func_name 部署失败（可能已存在）${NC}"
            fi
        fi
    done
else
    echo -e "${YELLOW}⚠ 未找到 Edge Functions${NC}"
fi

# 步骤 6: 数据同步（可选）
echo -e "\n${BLUE}📋 步骤 6: 数据同步（可选）${NC}"
read -p "是否同步本地数据到云端? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}⚠ 数据同步需要手动操作${NC}"
    echo -e "${YELLOW}请参考 docs/SYNC_TO_CLOUD.md 中的数据同步部分${NC}"
    echo -e "\n快速命令："
    echo -e "  ${BLUE}# 导出本地数据${NC}"
    echo -e "  npx supabase db dump --local -f local_data.sql --data-only"
    echo -e "\n  ${BLUE}# 导入到云端（需要数据库连接字符串）${NC}"
    echo -e "  psql \"YOUR_CONNECTION_STRING\" < local_data.sql"
fi

# 完成
echo -e "\n${GREEN}✅ 同步完成！${NC}"
echo -e "\n${YELLOW}📝 后续步骤：${NC}"
echo -e "1. 在 Supabase 控制台验证数据：https://supabase.com/dashboard/project/qsqohnmpxuxgeijjosrg"
echo -e "2. 更新 nextjs/.env.local 中的云端配置"
echo -e "3. 测试应用功能"
echo -e "4. 查看详细文档: docs/SYNC_TO_CLOUD.md"

