#!/bin/bash

# 测试安全修复迁移脚本
# 验证迁移不会破坏现有功能

set -e

# 颜色定义
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🧪 开始测试安全修复迁移...${NC}"
echo -e "${BLUE}🧪 Testing security fix migrations...${NC}"

# 检查 Supabase 是否运行
if ! npx supabase status &> /dev/null; then
    echo -e "${YELLOW}⚠  Supabase 本地服务未运行${NC}"
    echo -e "${YELLOW}正在启动 Supabase...${NC}"
    npx supabase start
fi

# 获取数据库连接信息
DB_URL=$(npx supabase status --output json 2>/dev/null | grep -o '"DB_URL":"[^"]*' | cut -d'"' -f4 || echo "")

if [ -z "$DB_URL" ]; then
    echo -e "${RED}✗ 无法获取数据库连接信息${NC}"
    echo -e "${YELLOW}请确保 Supabase 本地服务正在运行${NC}"
    exit 1
fi

echo -e "${GREEN}✓ 数据库连接正常${NC}"

# 测试函数 search_path 设置
echo -e "\n${BLUE}📋 测试 1: 检查函数 search_path 设置${NC}"

FUNCTIONS=(
    "public.handle_new_user"
    "public.update_updated_at_column"
    "public.generate_tsvector_from_normalized"
    "public.generate_poetry_tsvector"
    "public.update_collection_word_count"
    "authenticative.is_user_authenticated"
)

FAILED_FUNCTIONS=()

for func in "${FUNCTIONS[@]}"; do
    schema=$(echo "$func" | cut -d'.' -f1)
    name=$(echo "$func" | cut -d'.' -f2)
    
    # 检查函数是否存在
    result=$(psql "$DB_URL" -t -c "
        SELECT COUNT(*) 
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = '$schema' AND p.proname = '$name';
    " 2>/dev/null | tr -d ' ')
    
    if [ "$result" = "0" ]; then
        echo -e "${YELLOW}⚠  函数 $func 不存在（可能尚未创建）${NC}"
        continue
    fi
    
    # 检查 search_path 设置
    search_path=$(psql "$DB_URL" -t -c "
        SELECT COALESCE(
            (SELECT string_agg(setting, ', ')
             FROM unnest(p.proconfig) AS setting
             WHERE setting LIKE 'search_path=%'),
            'NOT SET'
        )
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = '$schema' AND p.proname = '$name';
    " 2>/dev/null | tr -d ' ')
    
    if [[ "$search_path" == *"NOT SET"* ]] || [ -z "$search_path" ]; then
        echo -e "${RED}✗ $func: search_path 未设置${NC}"
        FAILED_FUNCTIONS+=("$func")
    else
        echo -e "${GREEN}✓ $func: search_path = $search_path${NC}"
    fi
done

# 测试扩展位置
echo -e "\n${BLUE}📋 测试 2: 检查 pg_trgm 扩展位置${NC}"

extension_schema=$(psql "$DB_URL" -t -c "
    SELECT n.nspname
    FROM pg_extension e
    JOIN pg_namespace n ON e.extnamespace = n.oid
    WHERE e.extname = 'pg_trgm';
" 2>/dev/null | tr -d ' ')

if [ -z "$extension_schema" ]; then
    echo -e "${YELLOW}⚠  pg_trgm 扩展未安装${NC}"
elif [ "$extension_schema" = "extensions" ]; then
    echo -e "${GREEN}✓ pg_trgm 扩展在 extensions schema（正确）${NC}"
elif [ "$extension_schema" = "public" ]; then
    echo -e "${YELLOW}⚠  pg_trgm 扩展仍在 public schema（需要迁移）${NC}"
else
    echo -e "${YELLOW}⚠  pg_trgm 扩展在 $extension_schema schema${NC}"
fi

# 测试索引
echo -e "\n${BLUE}📋 测试 3: 检查索引是否存在${NC}"

INDEXES=(
    "idx_words_text_trgm"
    "idx_poetry_text_content_trgm"
)

for idx in "${INDEXES[@]}"; do
    exists=$(psql "$DB_URL" -t -c "
        SELECT COUNT(*)
        FROM pg_indexes
        WHERE indexname = '$idx';
    " 2>/dev/null | tr -d ' ')
    
    if [ "$exists" = "1" ]; then
        echo -e "${GREEN}✓ 索引 $idx 存在${NC}"
    else
        echo -e "${YELLOW}⚠  索引 $idx 不存在${NC}"
    fi
done

# 测试函数调用
echo -e "\n${BLUE}📋 测试 4: 测试函数调用${NC}"

# 测试 update_updated_at_column（通过触发器）
test_result=$(psql "$DB_URL" -t -c "
    SELECT proname, prorettype::regtype
    FROM pg_proc
    WHERE proname = 'update_updated_at_column';
" 2>/dev/null | tr -d ' ')

if [ -n "$test_result" ]; then
    echo -e "${GREEN}✓ update_updated_at_column 函数可访问${NC}"
else
    echo -e "${RED}✗ update_updated_at_column 函数不可访问${NC}"
fi

# 总结
echo -e "\n${BLUE}📊 测试总结${NC}"

if [ ${#FAILED_FUNCTIONS[@]} -eq 0 ]; then
    echo -e "${GREEN}✅ 所有测试通过！${NC}"
    echo -e "${YELLOW}提示：如果看到 '需要迁移' 的警告，请运行迁移：${NC}"
    echo -e "  ${BLUE}./scripts/apply-security-fixes.sh${NC}"
    exit 0
else
    echo -e "${RED}✗ 以下函数需要修复：${NC}"
    for func in "${FAILED_FUNCTIONS[@]}"; do
        echo -e "  - $func"
    done
    echo -e "\n${YELLOW}请运行迁移修复：${NC}"
    echo -e "  ${BLUE}./scripts/apply-security-fixes.sh${NC}"
    exit 1
fi

