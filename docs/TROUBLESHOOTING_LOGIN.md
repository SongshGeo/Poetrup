# 登录问题排查指南

## 问题：无法在本地开发环境登录

### 快速修复步骤

1. **确保 Supabase 服务正在运行**：
   ```bash
   npx supabase status
   # 如果没有运行，执行：
   npx supabase start
   ```

2. **重新应用迁移**：
   ```bash
   cd supabase
   npx supabase migration up
   ```

3. **运行诊断脚本**：
   ```bash
   ./scripts/diagnose-login.sh
   ```

4. **检查浏览器控制台**：
   - 打开浏览器开发者工具 (F12)
   - 查看 Console 标签页的错误信息
   - 查看 Network 标签页，检查登录请求是否成功

### 常见问题及解决方案

#### 问题 1: 函数 search_path 未正确设置

**症状**：登录时没有错误，但用户信息无法加载

**解决方案**：
```bash
cd supabase
npx supabase migration up
```

确保迁移 `20250202000002_fix_handle_new_user_login.sql` 已应用。

#### 问题 2: 用户没有 profile 记录

**症状**：登录成功，但应用显示"无法加载用户信息"

**解决方案**：

1. **自动创建（推荐）**：
   - 注册新用户，触发器会自动创建 profile
   - 或者重置数据库：
     ```bash
     cd supabase
     npx supabase db reset
     ```

2. **手动创建**：
   - 访问 Supabase Studio: http://127.0.0.1:54323
   - 进入 `profiles` 表
   - 添加新记录：
     - `auth_uid`: 从 `auth.users` 表中获取用户 ID
     - `username`: 用户邮箱或用户名
     - `display_name`: 显示名称

#### 问题 3: 环境变量配置错误

**症状**：网络错误或连接失败

**解决方案**：

1. **检查 `.env.local` 文件**：
   ```bash
   cd nextjs
   cat .env.local
   ```

2. **确保配置正确**：
   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=你的本地anon key
   ```

3. **获取本地密钥**：
   ```bash
   npx supabase status
   # 查看输出中的 "Publishable key" 和 "Secret key"
   ```

#### 问题 4: 触发器未启用

**症状**：新用户注册后没有自动创建 profile

**解决方案**：

```sql
-- 检查触发器是否存在
SELECT tgname, tgrelid::regclass, tgenabled 
FROM pg_trigger 
WHERE tgname = 'on_auth_user_created';

-- 如果不存在，重新创建
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
```

#### 问题 5: 浏览器缓存问题

**症状**：登录后立即退出，或会话无法保持

**解决方案**：

1. 清除浏览器缓存和 cookies
2. 使用隐私模式测试
3. 检查浏览器控制台的错误信息

### 验证修复

修复后，按以下步骤验证：

1. **测试新用户注册**：
   - 访问 http://localhost:3001/auth/register
   - 注册新用户
   - 检查 Supabase Studio 中的 `profiles` 表是否有新记录

2. **测试现有用户登录**：
   - 访问 http://localhost:3001/auth/login
   - 使用已有账号登录
   - 检查是否能成功进入 `/app` 页面

3. **检查用户信息加载**：
   - 登录后，检查右上角是否显示用户信息
   - 检查应用功能是否正常

### 调试技巧

1. **查看 Supabase 日志**：
   ```bash
   npx supabase logs
   ```

2. **查看数据库日志**：
   - 访问 Supabase Studio: http://127.0.0.1:54323
   - 进入 Logs 标签页

3. **检查函数执行**：
   ```sql
   -- 在 Supabase Studio 的 SQL Editor 中执行
   SELECT * FROM pg_proc WHERE proname = 'handle_new_user';
   ```

4. **测试触发器**：
   ```sql
   -- 手动触发（仅用于测试）
   -- 注意：这会创建一个测试用户，请谨慎使用
   ```

### 如果问题仍然存在

1. **重置本地数据库**（⚠️ 会删除所有数据）：
   ```bash
   cd supabase
   npx supabase db reset
   ```

2. **检查迁移文件**：
   ```bash
   cd supabase
   npx supabase migration list
   ```

3. **查看详细错误信息**：
   - 浏览器控制台
   - Supabase Studio 的 Logs
   - 终端中的 Supabase 日志

4. **联系支持**：
   - 提供错误信息
   - 提供诊断脚本的输出
   - 提供浏览器控制台的错误截图

