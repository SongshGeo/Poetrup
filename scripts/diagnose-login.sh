#!/bin/bash

# 诊断登录问题脚本

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 诊断登录问题...${NC}"

# 检查 Supabase 是否运行
echo -e "\n${BLUE}1. 检查 Supabase 服务状态${NC}"
if npx supabase status &> /dev/null; then
    echo -e "${GREEN}✓ Supabase 服务正在运行${NC}"
    npx supabase status | grep -E "(API URL|Database URL)"
else
    echo -e "${RED}✗ Supabase 服务未运行${NC}"
    echo -e "${YELLOW}请运行: npx supabase start${NC}"
    exit 1
fi

# 检查环境变量
echo -e "\n${BLUE}2. 检查环境变量${NC}"
cd nextjs

if [ -f ".env.local" ]; then
    echo -e "${GREEN}✓ .env.local 文件存在${NC}"
    
    if grep -q "NEXT_PUBLIC_SUPABASE_URL" .env.local; then
        URL=$(grep "NEXT_PUBLIC_SUPABASE_URL" .env.local | cut -d'=' -f2 | tr -d '"' | tr -d "'")
        echo -e "${GREEN}✓ NEXT_PUBLIC_SUPABASE_URL: ${URL}${NC}"
        
        if [[ "$URL" == *"127.0.0.1"* ]] || [[ "$URL" == *"localhost"* ]]; then
            echo -e "${GREEN}✓ 使用本地 Supabase${NC}"
        else
            echo -e "${YELLOW}⚠ 使用远程 Supabase${NC}"
        fi
    else
        echo -e "${RED}✗ NEXT_PUBLIC_SUPABASE_URL 未设置${NC}"
    fi
    
    if grep -q "NEXT_PUBLIC_SUPABASE_ANON_KEY" .env.local; then
        echo -e "${GREEN}✓ NEXT_PUBLIC_SUPABASE_ANON_KEY 已设置${NC}"
    else
        echo -e "${RED}✗ NEXT_PUBLIC_SUPABASE_ANON_KEY 未设置${NC}"
    fi
else
    echo -e "${RED}✗ .env.local 文件不存在${NC}"
    echo -e "${YELLOW}请创建 .env.local 文件并设置环境变量${NC}"
fi

cd ..

# 检查函数
echo -e "\n${BLUE}3. 检查 handle_new_user 函数${NC}"
cd supabase

# 使用 migration 来检查（通过创建一个临时检查）
cat > /tmp/check_function.sql << 'EOF'
DO $$
DECLARE
    func_config text;
BEGIN
    SELECT array_to_string(proconfig, ', ') INTO func_config
    FROM pg_proc
    WHERE proname = 'handle_new_user' AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public');
    
    IF func_config IS NULL THEN
        RAISE NOTICE '函数 handle_new_user 不存在';
    ELSIF func_config LIKE '%search_path%' THEN
        RAISE NOTICE '函数配置: %', func_config;
    ELSE
        RAISE NOTICE '函数存在但 search_path 未设置';
    END IF;
END $$;
EOF

if npx supabase db execute --file /tmp/check_function.sql 2>&1 | grep -q "NOTICE"; then
    npx supabase db execute --file /tmp/check_function.sql 2>&1 | grep "NOTICE"
else
    echo -e "${YELLOW}⚠ 无法检查函数状态（可能需要手动检查）${NC}"
fi

rm -f /tmp/check_function.sql

# 检查触发器
echo -e "\n${BLUE}4. 检查触发器${NC}"
cat > /tmp/check_trigger.sql << 'EOF'
SELECT 
    CASE 
        WHEN COUNT(*) > 0 THEN '触发器 on_auth_user_created 存在'
        ELSE '触发器 on_auth_user_created 不存在'
    END as status
FROM pg_trigger
WHERE tgname = 'on_auth_user_created';
EOF

if npx supabase db execute --file /tmp/check_trigger.sql 2>&1 | grep -q "触发器"; then
    npx supabase db execute --file /tmp/check_trigger.sql 2>&1 | grep "触发器"
else
    echo -e "${YELLOW}⚠ 无法检查触发器状态${NC}"
fi

rm -f /tmp/check_trigger.sql

cd ..

# 提供诊断建议
echo -e "\n${BLUE}📋 诊断建议：${NC}"
echo -e "${YELLOW}1. 检查浏览器控制台的错误信息${NC}"
echo -e "${YELLOW}2. 检查网络请求是否成功（F12 -> Network）${NC}"
echo -e "${YELLOW}3. 尝试清除浏览器缓存和 cookies${NC}"
echo -e "${YELLOW}4. 检查用户是否已创建 profile：${NC}"
echo -e "   ${BLUE}访问: http://127.0.0.1:54323 (Supabase Studio)${NC}"
echo -e "   ${BLUE}查看 profiles 表是否有对应用户的记录${NC}"
echo -e "${YELLOW}5. 如果用户没有 profile，可以手动创建：${NC}"
echo -e "   ${BLUE}在 Supabase Studio 中，进入 profiles 表，添加新记录${NC}"
echo -e "   ${BLUE}auth_uid 应该对应 auth.users 表中的用户 ID${NC}"

echo -e "\n${GREEN}✅ 诊断完成${NC}"

