# Supabase 安全警告修复指南

## 概述

本文档说明如何修复 Supabase 数据库安全警告，确保生产环境的安全性。

## 警告类型

### 1. Function Search Path Mutable (函数搜索路径可变)

**问题**：函数没有设置 `search_path`，可能导致 SQL 注入攻击。

**影响**：安全风险 - 攻击者可能通过修改 `search_path` 来执行恶意代码。

**修复**：在所有函数中添加 `SET search_path = public` 或 `SET search_path = public, auth`（如果函数需要访问 auth schema）。

### 2. Extension in Public (扩展在公共模式中)

**问题**：`pg_trgm` 扩展安装在 `public` schema 中。

**影响**：安全风险 - 扩展在 public schema 中可能被滥用。

**修复**：将扩展移动到 `extensions` schema。

### 3. Leaked Password Protection Disabled (泄露密码保护已禁用)

**问题**：泄露密码保护功能被禁用。

**影响**：安全风险 - 用户可能使用已被泄露的密码。

**修复**：在 Supabase Dashboard 中手动启用。

## 修复步骤

### 步骤 1: 测试本地环境

在应用修复之前，先测试当前状态：

```bash
# 运行测试脚本
./scripts/test-security-fixes.sh
```

这会检查：
- 函数是否存在
- `search_path` 是否已设置
- 扩展位置是否正确
- 索引是否正常

### 步骤 2: 应用数据库迁移

已创建两个迁移文件来修复函数和扩展问题：

1. `20250202000000_fix_security_warnings.sql` - 修复所有函数的 `search_path`
2. `20250202000001_move_pg_trgm_extension.sql` - 移动 `pg_trgm` 扩展

**应用迁移到本地：**

```bash
# 使用脚本（推荐）
./scripts/apply-security-fixes.sh

# 或手动应用
cd supabase
npx supabase migration up
```

**验证修复：**

```bash
# 再次运行测试
./scripts/test-security-fixes.sh
```

### 步骤 3: 测试应用功能

确保迁移没有破坏现有功能：

```bash
# 启动开发服务器
cd nextjs
yarn dev

# 测试以下功能：
# 1. 用户注册/登录 ✅
# 2. 创建词语
# 3. 创建收藏册
# 4. 创建作品
# 5. 搜索功能（使用 trigram）
```

### 步骤 4: 同步到云端

**⚠️ 重要：在生产环境应用前，请先在本地完整测试！**

```bash
# 使用同步脚本（推荐）
./scripts/sync-to-cloud.sh

# 或手动推送
cd supabase
npx supabase db push
```

**验证云端修复：**

1. 访问 Supabase Dashboard: https://supabase.com/dashboard/project/qsqohnmpxuxgeijjosrg
2. 进入 `Database` -> `Linter`
3. 检查是否还有相关警告

### 步骤 5: 启用泄露密码保护

1. 访问 Supabase Dashboard: https://supabase.com/dashboard/project/qsqohnmpxuxgeijjosrg
2. 进入 `Authentication` -> `Settings` -> `Password`
3. 找到 `Leaked Password Protection` 或 `HaveIBeenPwned` 设置
4. 启用该功能

## 修复的函数列表

以下函数已修复：

1. ✅ `public.handle_new_user()` - 自动创建用户档案
   - **search_path**: `public, auth` (需要访问 auth.users)
2. ✅ `public.update_updated_at_column()` - 更新时间戳触发器
   - **search_path**: `public`
3. ✅ `public.generate_tsvector_from_normalized()` - 生成全文搜索向量
   - **search_path**: `public`
4. ✅ `public.generate_poetry_tsvector()` - 生成诗歌全文搜索向量
   - **search_path**: `public`
5. ✅ `public.update_collection_word_count()` - 更新收藏册词语计数
   - **search_path**: `public`
6. ✅ `authenticative.is_user_authenticated()` - 检查用户认证状态
   - **search_path**: `public, auth` (需要访问 auth.mfa_factors 和 auth.jwt())

## 修复的扩展

1. ✅ `pg_trgm` - 从 `public` schema 移动到 `extensions` schema

## 重要说明

### search_path 设置原则

- **只使用 public schema 的函数**：`SET search_path = public`
- **需要访问 auth schema 的函数**：`SET search_path = public, auth`
  - `handle_new_user` - 需要访问 `auth.users` 表
  - `is_user_authenticated` - 需要访问 `auth.mfa_factors` 和 `auth.jwt()`

### 如果登录失败

如果应用安全修复后无法登录，请检查：

1. **检查函数是否正确更新**：
   ```sql
   SELECT proname, proconfig 
   FROM pg_proc 
   WHERE proname = 'handle_new_user';
   ```
   应该显示 `{search_path=public,auth}`

2. **检查触发器是否存在**：
   ```sql
   SELECT tgname, tgrelid::regclass 
   FROM pg_trigger 
   WHERE tgname = 'on_auth_user_created';
   ```

3. **重置本地数据库**（如果需要）：
   ```bash
   cd supabase
   npx supabase db reset
   ```

## 验证修复

### 检查函数 search_path

```sql
-- 检查函数是否设置了 search_path
SELECT 
    p.proname as function_name,
    n.nspname as schema_name,
    p.proconfig as config
FROM pg_proc p
JOIN pg_namespace n ON p.pronamespace = n.oid
WHERE n.nspname IN ('public', 'authenticative')
AND p.proname IN (
    'handle_new_user',
    'update_updated_at_column',
    'generate_tsvector_from_normalized',
    'generate_poetry_tsvector',
    'update_collection_word_count',
    'is_user_authenticated'
)
ORDER BY n.nspname, p.proname;
```

`proconfig` 应该包含 `search_path` 设置。

### 检查扩展位置

```sql
-- 检查扩展位置
SELECT 
    extname as extension_name,
    n.nspname as schema_name
FROM pg_extension e
JOIN pg_namespace n ON e.extnamespace = n.oid
WHERE extname = 'pg_trgm';
```

应该显示 `extensions` schema，而不是 `public`。

### 检查 Supabase Linter

在 Supabase Dashboard 中：

1. 进入 `Database` -> `Linter`
2. 查看是否还有相关警告
3. 所有警告应该已解决（除了需要在 Dashboard 中手动启用的）

## 注意事项

### 1. 扩展移动的影响

移动 `pg_trgm` 扩展后：

- **索引重建**：迁移会临时删除并重建 trigram 索引，在此期间查询可能稍慢
- **查询兼容性**：通常不需要改变查询代码，PostgreSQL 会自动查找扩展
- **如果遇到问题**：可以明确指定 schema，但通常不需要

```sql
-- 正常使用（推荐）
SELECT * FROM words WHERE text % '搜索词';

-- 如果需要明确指定（通常不需要）
SELECT * FROM words WHERE text OPERATOR(extensions.%) '搜索词';
```

### 2. 函数 search_path 设置

- `SET search_path = public` - 只搜索 public schema（我们使用这个）
- `SET search_path = public, auth` - 搜索 public 和 auth schema（用于需要访问 auth 的函数）
- `SET search_path = ''` - 不搜索任何 schema（最安全，但需要完全限定所有对象）

我们使用 `SET search_path = public` 或 `SET search_path = public, auth`，因为我们的对象主要在 public schema 中，某些函数需要访问 auth schema。

### 3. SECURITY DEFINER 函数

对于 `SECURITY DEFINER` 函数（如 `handle_new_user` 和 `is_user_authenticated`），设置 `search_path` 尤其重要，因为它们以创建者的权限运行，容易被利用进行 SQL 注入攻击。

### 4. 迁移执行时间

- **函数修复**：几乎瞬间完成，无影响
- **扩展移动**：可能需要几秒到几分钟，取决于数据量（需要重建索引）

建议在低峰期执行扩展移动的迁移。

## 回滚

如果需要回滚这些更改：

```sql
-- 回滚扩展移动（如果需要）
DROP INDEX IF EXISTS public.idx_words_text_trgm;
DROP INDEX IF EXISTS public.idx_poetry_text_content_trgm;
DROP EXTENSION IF EXISTS pg_trgm CASCADE;
CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;

-- 重新创建索引
CREATE INDEX IF NOT EXISTS idx_words_text_trgm 
ON public.words 
USING GIN(text gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_poetry_text_content_trgm 
ON public.poetry 
USING GIN(text_content gin_trgm_ops);
```

## 参考文档

- [Supabase Database Linter](https://supabase.com/docs/guides/database/database-linter)
- [PostgreSQL search_path Security](https://www.postgresql.org/docs/current/ddl-schemas.html#DDL-SCHEMAS-PATH)
- [Supabase Password Security](https://supabase.com/docs/guides/auth/password-security)
- [Function Search Path Security](https://supabase.com/docs/guides/database/database-linter?lint=0011_function_search_path_mutable)

## 总结

✅ **已修复**：
- 所有函数的 `search_path` 设置
- `pg_trgm` 扩展位置

⚠️ **需要手动操作**：
- 在 Supabase Dashboard 启用泄露密码保护

这些修复将显著提高数据库的安全性，防止 SQL 注入攻击和其他安全风险。
