#!/bin/bash

# 直接修复登录问题的脚本
# 使用 Docker 直接执行 SQL

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔧 直接修复登录问题...${NC}"

# 检查 Supabase 是否运行
if ! npx supabase status &> /dev/null; then
    echo -e "${RED}✗ Supabase 服务未运行${NC}"
    echo -e "${YELLOW}请运行: npx supabase start${NC}"
    exit 1
fi

# 获取数据库容器名称
DB_CONTAINER=$(docker ps --filter "name=supabase_db_poetry" --format "{{.Names}}" | head -1)

if [ -z "$DB_CONTAINER" ]; then
    echo -e "${RED}✗ 无法找到数据库容器${NC}"
    echo -e "${YELLOW}请确保 Supabase 正在运行${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 找到数据库容器: $DB_CONTAINER${NC}"

# 创建修复 SQL
cat > /tmp/fix_login.sql << 'EOF'
-- 修复 handle_new_user 函数
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth
AS $$
BEGIN
  INSERT INTO public.profiles (auth_uid, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', NEW.email),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1))
  );
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the user creation
    RAISE WARNING 'Error creating profile for user %: %', NEW.id, SQLERRM;
    RETURN NEW;
END;
$$;

-- 确保触发器存在
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 为现有用户创建 profile（如果不存在）
INSERT INTO public.profiles (auth_uid, username, display_name)
SELECT 
  id,
  COALESCE(raw_user_meta_data->>'username', email),
  COALESCE(raw_user_meta_data->>'display_name', split_part(email, '@', 1))
FROM auth.users
WHERE id NOT IN (SELECT auth_uid FROM public.profiles WHERE auth_uid IS NOT NULL)
ON CONFLICT (auth_uid) DO NOTHING;

-- 验证修复
DO $$
DECLARE
    func_exists boolean;
    trigger_exists boolean;
    profile_count integer;
    user_count integer;
BEGIN
    -- 检查函数
    SELECT EXISTS (
        SELECT 1 FROM pg_proc 
        WHERE proname = 'handle_new_user' 
        AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
    ) INTO func_exists;
    
    -- 检查触发器
    SELECT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'on_auth_user_created'
    ) INTO trigger_exists;
    
    -- 统计用户和 profile
    SELECT COUNT(*) INTO user_count FROM auth.users;
    SELECT COUNT(*) INTO profile_count FROM public.profiles;
    
    RAISE NOTICE '函数存在: %', func_exists;
    RAISE NOTICE '触发器存在: %', trigger_exists;
    RAISE NOTICE '用户数量: %', user_count;
    RAISE NOTICE 'Profile 数量: %', profile_count;
    
    IF NOT func_exists THEN
        RAISE EXCEPTION '函数 handle_new_user 不存在';
    END IF;
    
    IF NOT trigger_exists THEN
        RAISE EXCEPTION '触发器 on_auth_user_created 不存在';
    END IF;
END $$;
EOF

echo -e "\n${BLUE}📋 执行修复 SQL...${NC}"

# 执行 SQL
if docker exec -i "$DB_CONTAINER" psql -U postgres -d postgres < /tmp/fix_login.sql 2>&1 | tee /tmp/fix_result.log; then
    echo -e "\n${GREEN}✅ 修复完成！${NC}"
    
    # 检查结果
    if grep -q "NOTICE" /tmp/fix_result.log; then
        echo -e "\n${BLUE}修复结果：${NC}"
        grep "NOTICE" /tmp/fix_result.log
    fi
    
    echo -e "\n${YELLOW}📝 下一步：${NC}"
    echo -e "1. 清除浏览器缓存和 cookies"
    echo -e "2. 尝试重新登录"
    echo -e "3. 如果仍有问题，检查浏览器控制台的错误信息"
else
    echo -e "\n${RED}✗ 修复失败${NC}"
    echo -e "${YELLOW}查看错误日志: /tmp/fix_result.log${NC}"
    exit 1
fi

# 清理临时文件
rm -f /tmp/fix_login.sql

echo -e "\n${GREEN}✅ 完成！${NC}"

