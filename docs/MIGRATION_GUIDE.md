# 拼贴诗项目数据库迁移指南

本指南将帮助你设置拼贴诗项目的数据库结构和配置。

## 前置要求

1. 已安装 Supabase CLI
2. 已创建 Supabase 项目（项目 ID: `qsqohnmpxuxgeijjosrg`）
3. 已获取 Supabase 项目 URL 和 API 密钥

## 步骤 1: 连接 Supabase 项目

在项目根目录运行以下命令：

```bash
# 登录 Supabase（如果尚未登录）
npx supabase login

# 连接到你的 Supabase 项目
npx supabase link --project-ref qsqohnmpxuxgeijjosrg
```

系统会提示你输入数据库密码（可在 Supabase 控制台的 `项目设置` -> `数据库` -> `数据库密码` 中重置）。

## 步骤 2: 推送配置

将本地配置推送到 Supabase 项目：

```bash
npx supabase config push
```

## 步骤 3: 运行数据库迁移

执行所有迁移文件以创建数据库结构：

```bash
npx supabase migrations up --linked
```

这将按顺序执行以下迁移：

1. `20250201000000_poetry_core_schema.sql` - 创建核心表结构（词语、收藏册、作品等）
2. `20250201000001_poetry_indexes_triggers.sql` - 创建索引和触发器（全文搜索、更新时间戳等）
3. `20250201000002_poetry_rls_policies.sql` - 创建 RLS 策略（行级安全策略）
4. `20250201000003_poetry_storage_buckets.sql` - 创建存储桶（用于存储作品封面等文件）
5. `20250201000004_poetry_seed_data.sql` - 插入测试数据（30个词语、4个收藏册、3首示例作品）
6. `20250201000005_auto_create_profile.sql` - 自动创建用户档案（当用户注册时自动创建 profile）

## 步骤 4: 验证迁移

在 Supabase 控制台的 SQL Editor 中运行以下查询，验证表是否已创建：

```sql
-- 检查表是否存在
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'words', 'collections', 'collection_words', 'poetry', 'poetry_collections', 'favorites')
ORDER BY table_name;

-- 检查测试数据
SELECT COUNT(*) as word_count FROM words;
SELECT COUNT(*) as collection_count FROM collections;
SELECT COUNT(*) as poetry_count FROM poetry;
```

## 步骤 5: 配置环境变量

在 `nextjs/.env.local` 文件中配置以下环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=https://qsqohnmpxuxgeijjosrg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
PRIVATE_SUPABASE_SERVICE_KEY=your_service_role_key_here
```

你可以在 Supabase 控制台的 `项目设置` -> `API` 中找到这些密钥。

## 步骤 6: 部署 Edge Functions（可选）

如果你需要使用中文分词功能，部署 Edge Function：

```bash
# 部署分词函数
npx supabase functions deploy tokenize-chinese

# 或者本地测试
npx supabase functions serve tokenize-chinese
```

## 步骤 7: 创建测试用户

在运行 seed 数据之前，你需要至少创建一个用户：

1. 通过 Supabase Auth 创建用户（在 Supabase 控制台的 Authentication 页面）
2. 或者通过你的应用注册页面创建用户

**注意**：迁移 `20250201000005_auto_create_profile.sql` 会自动为所有新注册的用户创建 profile 记录。如果你有已存在的用户，该迁移也会为这些用户创建 profile。

seed 数据脚本会自动使用第一个可用的用户来创建测试数据。

## 测试数据说明

seed 数据包含：

- **30 个中文词语**：涵盖自然、情感、时间、动作、地点等主题
- **4 个收藏册**：包括公开、共享、私密等不同可见性设置
- **3 首示例拼贴诗**：展示不同的内容结构

所有测试数据都会关联到第一个可用的用户。

## 常见问题

### Q: 迁移失败，提示 "relation already exists"

A: 某些表可能已存在。你可以：
1. 删除现有表（谨慎操作）
2. 或者修改迁移文件，使用 `CREATE TABLE IF NOT EXISTS`

### Q: RLS 策略导致无法访问数据

A: 确保：
1. 用户已通过 Supabase Auth 认证
2. 用户的 profile 已创建（seed 脚本会自动创建）
3. 检查 RLS 策略是否正确应用

### Q: seed 数据未创建

A: 检查：
1. 是否至少有一个用户存在于 `auth.users` 中
2. 运行 seed 迁移时是否有错误日志
3. 在 Supabase 控制台的 SQL Editor 中手动运行 seed 脚本

### Q: 存储桶无法访问

A: 确保：
1. 存储桶已创建（检查 `storage.buckets` 表）
2. 存储策略已正确应用
3. 文件路径格式正确（例如：`{user_id}/filename.jpg`）

## 下一步

迁移完成后，你可以：

1. 启动 Next.js 开发服务器：`cd nextjs && yarn dev`
2. 访问应用并测试功能
3. 查看 Supabase 控制台中的数据
4. 开始开发前端功能

## 回滚迁移（如果需要）

如果需要回滚迁移：

```bash
# 查看迁移历史
npx supabase migrations list

# 回滚到特定版本（谨慎操作）
npx supabase migration repair --status reverted <migration_name>
```

## 生产环境部署

在生产环境部署时：

1. 确保所有迁移已在 staging 环境测试
2. 备份生产数据库
3. 在维护窗口期间运行迁移
4. 验证所有功能正常
5. 监控错误日志

## 相关文档

- [Supabase 迁移文档](https://supabase.com/docs/guides/cli/local-development#database-migrations)
- [RLS 策略文档](https://supabase.com/docs/guides/auth/row-level-security)
- [存储策略文档](https://supabase.com/docs/guides/storage)

