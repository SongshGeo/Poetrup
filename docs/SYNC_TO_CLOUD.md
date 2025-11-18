# 本地 Supabase 同步到云端指南

本指南将帮助你将本地 Supabase 开发环境的数据和配置同步到云端生产环境。

## 📋 同步前准备

### 0. 关于 Supabase CLI

**重要**：Supabase CLI **不支持**通过 `npm install -g supabase` 全局安装。

推荐使用方式：
- ✅ **使用 npx**（推荐）：`npx supabase <command>`
- ✅ **使用 Homebrew**（macOS）：`brew install supabase/tap/supabase`
- ✅ **使用 Scoop**（Windows）：`scoop bucket add supabase https://github.com/supabase/scoop-bucket.git && scoop install supabase`

本项目使用 `npx` 方式，无需额外安装。

### 1. 确认本地环境正常运行

```bash
# 检查本地 Supabase 是否运行
npx supabase status

# 如果未运行，启动本地环境
npx supabase start
```

### 2. 确认已连接到云端项目

```bash
# 检查是否已连接
npx supabase projects list

# 如果未连接，先连接项目
npx supabase login
npx supabase link --project-ref qsqohnmpxuxgeijjosrg
```

## 🚀 同步步骤

### 步骤 1: 同步数据库结构（迁移）

这是最重要的步骤，将本地的数据库 schema 同步到云端：

```bash
# 推送所有迁移到云端
npx supabase migrations up --linked
```

这将按顺序执行所有迁移文件，包括：
- 核心表结构（words, collections, poetry 等）
- 索引和触发器
- RLS 策略
- 存储桶配置
- 自动创建 profile 的触发器

**验证迁移：**

在 Supabase 控制台的 SQL Editor 中运行：

```sql
-- 检查所有表是否已创建
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('profiles', 'words', 'collections', 'collection_words', 'poetry', 'poetry_collections', 'favorites')
ORDER BY table_name;

-- 检查迁移历史
SELECT * FROM supabase_migrations.schema_migrations ORDER BY version;
```

### 步骤 2: 同步配置

将本地配置（如 API 设置、存储桶策略等）推送到云端：

```bash
# 推送配置到云端
npx supabase config push
```

这将同步：
- API 配置
- 存储桶配置
- 认证设置
- 其他 Supabase 配置

### 步骤 3: 部署 Edge Functions（可选）

如果你使用了 Edge Functions（如中文分词功能）：

```bash
# 部署分词函数
npx supabase functions deploy tokenize-chinese

# 或者部署所有函数
npx supabase functions deploy
```

### 步骤 4: 同步本地数据（可选）

如果你在本地创建了测试数据，想要同步到云端，可以使用以下方法：

#### 方法 1: 使用 Supabase CLI 导出/导入（推荐）

```bash
# 1. 从本地数据库导出数据
npx supabase db dump --local -f local_data.sql --data-only

# 2. 将数据导入到云端（需要先连接到云端）
npx supabase db push --linked --include-data
```

#### 方法 2: 使用 pg_dump 和 psql（更灵活）

```bash
# 1. 导出本地数据（仅数据，不包括结构）
pg_dump -h localhost -p 54322 -U postgres -d postgres \
  --data-only \
  --table=words \
  --table=collections \
  --table=collection_words \
  --table=poetry \
  --table=poetry_collections \
  --table=favorites \
  --table=profiles \
  > local_data.sql

# 2. 获取云端数据库连接信息
# 在 Supabase 控制台：项目设置 -> 数据库 -> Connection string

# 3. 导入到云端（替换 YOUR_CONNECTION_STRING）
psql "YOUR_CONNECTION_STRING" < local_data.sql
```

#### 方法 3: 手动导出特定表数据（小数据量）

如果数据量不大，可以手动导出：

```bash
# 导出为 CSV
npx supabase db dump --local --data-only --table words > words.csv

# 然后在 Supabase 控制台的 Table Editor 中手动导入
```

### 步骤 5: 验证同步结果

#### 5.1 检查数据库结构

在 Supabase 控制台的 SQL Editor 中：

```sql
-- 检查表结构
\d words
\d collections
\d poetry

-- 检查 RLS 策略
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- 检查触发器
SELECT * FROM pg_trigger WHERE tgname LIKE '%poetry%';
```

#### 5.2 检查数据

```sql
-- 检查数据量
SELECT 
  'words' as table_name, COUNT(*) as count FROM words
UNION ALL
SELECT 'collections', COUNT(*) FROM collections
UNION ALL
SELECT 'poetry', COUNT(*) FROM poetry
UNION ALL
SELECT 'profiles', COUNT(*) FROM profiles;
```

#### 5.3 测试功能

1. 在应用中测试创建词语、收藏册、作品
2. 测试拖拽功能
3. 测试标签创建和保存
4. 验证数据持久化

## 🔄 增量同步（后续更新）

当你对本地数据库做了修改后，需要同步到云端：

### 创建新的迁移

```bash
# 1. 在本地进行修改（通过 SQL 或应用）

# 2. 生成迁移文件（自动检测差异）
npx supabase db diff -f new_migration_name

# 3. 检查生成的迁移文件
# 文件位置：supabase/migrations/YYYYMMDDHHMMSS_new_migration_name.sql

# 4. 应用迁移到云端
npx supabase migrations up --linked
```

### 手动创建迁移

如果你知道具体的 SQL 变更：

```bash
# 1. 创建新的迁移文件
npx supabase migration new your_migration_name

# 2. 编辑迁移文件
# 文件位置：supabase/migrations/YYYYMMDDHHMMSS_your_migration_name.sql

# 3. 先在本地测试
npx supabase migration up

# 4. 确认无误后推送到云端
npx supabase migrations up --linked
```

## ⚠️ 注意事项

### 1. 数据冲突处理

如果云端已有数据，同步时可能会遇到冲突：

- **表结构冲突**：迁移会自动处理（使用 `IF NOT EXISTS`）
- **数据冲突**：需要手动处理或使用 `ON CONFLICT` 策略

### 2. 用户数据

- **Auth 用户**：不会自动同步，需要在云端手动创建或通过应用注册
- **Profile 数据**：如果使用 `auto_create_profile` 触发器，新用户注册时会自动创建

### 3. 存储桶文件

存储桶中的文件（如图片）不会自动同步，需要：

```bash
# 1. 从本地导出文件列表
# 2. 手动上传到云端存储桶
# 或使用 Supabase Storage API 批量上传
```

### 4. 环境变量

确保 `nextjs/.env.local` 中的云端配置正确：

```env
NEXT_PUBLIC_SUPABASE_URL=https://qsqohnmpxuxgeijjosrg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_cloud_anon_key
PRIVATE_SUPABASE_SERVICE_KEY=your_cloud_service_key
```

## 🔍 故障排查

### 问题 1: 迁移失败

```bash
# 查看迁移状态
npx supabase migrations list --linked

# 查看详细错误
npx supabase migrations up --linked --debug
```

### 问题 2: 连接失败

```bash
# 重新连接
npx supabase link --project-ref qsqohnmpxuxgeijjosrg

# 检查网络连接
ping qsqohnmpxuxgeijjosrg.supabase.co
```

### 问题 3: 权限错误

确保：
1. 已正确登录 Supabase CLI
2. 有项目的管理员权限
3. 数据库密码正确

### 问题 4: 数据不一致

```bash
# 比较本地和云端的结构差异
npx supabase db diff --linked

# 生成同步迁移
npx supabase db diff --linked -f sync_changes
```

## 📝 最佳实践

1. **定期备份**：在同步前备份云端数据
2. **测试迁移**：先在本地测试迁移，确认无误后再同步到云端
3. **版本控制**：所有迁移文件都应该提交到 Git
4. **小步提交**：每次只同步相关的变更，避免大范围修改
5. **文档记录**：记录每次同步的内容和原因

## 🎯 快速同步命令总结

```bash
# 完整同步流程（推荐）
npx supabase login                    # 登录
npx supabase link --project-ref qsqohnmpxuxgeijjosrg  # 连接项目
npx supabase migrations up --linked   # 同步数据库结构
npx supabase config push              # 同步配置
npx supabase functions deploy         # 部署函数（如果有）

# 验证
# 在 Supabase 控制台检查数据和结构
```

## 📚 相关文档

- [Supabase CLI 文档](https://supabase.com/docs/reference/cli)
- [数据库迁移指南](./MIGRATION_GUIDE.md)
- [Supabase 迁移最佳实践](https://supabase.com/docs/guides/cli/local-development#database-migrations)

