# 部署指南 - Deployment Guide

本指南将帮助你部署拼贴诗应用到生产环境。

## 🚀 快速部署到 Vercel（推荐）

Vercel 是部署 Next.js 应用最简单的方式，提供免费套餐和自动 HTTPS。

### 步骤 1: 准备代码仓库

确保代码已推送到 GitHub：

```bash
# 检查 Git 状态
git status

# 如果还没有提交，提交代码
git add .
git commit -m "准备部署"

# 推送到 GitHub
git push origin main
```

### 步骤 2: 在 Vercel 创建项目

1. 访问 [Vercel](https://vercel.com)
2. 使用 GitHub 账号登录
3. 点击 "Add New Project"
4. 选择你的仓库 `Poetrup`
5. 配置项目：
   - **Framework Preset**: Next.js
   - **Root Directory**: `nextjs`（重要！）
   - **Build Command**: `yarn build`（或 `npm run build`）
   - **Output Directory**: `.next`（默认）

### 步骤 3: 配置环境变量

在 Vercel 项目设置中添加以下环境变量：

```env
NEXT_PUBLIC_SUPABASE_URL=https://qsqohnmpxuxgeijjosrg.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=你的云端_anon_key
PRIVATE_SUPABASE_SERVICE_KEY=你的云端_service_role_key
```

**获取密钥：**
1. 访问 Supabase Dashboard: https://supabase.com/dashboard/project/qsqohnmpxuxgeijjosrg
2. 进入 `项目设置` -> `API`
3. 复制：
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `PRIVATE_SUPABASE_SERVICE_KEY`

### 步骤 4: 配置 Supabase 重定向 URL

在 Supabase Dashboard 中配置：

1. 进入 `项目设置` -> `Authentication` -> `URL Configuration`
2. 添加以下 URL：
   - **Site URL**: `https://your-project.vercel.app`
   - **Redirect URLs**: 
     ```
     https://your-project.vercel.app/**
     http://localhost:3000/**
     ```

### 步骤 5: 部署

点击 Vercel 的 "Deploy" 按钮，等待部署完成。

部署完成后，你会得到一个 URL，例如：`https://your-project.vercel.app`

## 👤 创建测试用户

### 方法 1: 通过 Supabase Dashboard（最简单）

1. 访问 Supabase Dashboard: https://supabase.com/dashboard/project/qsqohnmpxuxgeijjosrg
2. 进入 `Authentication` -> `Users`
3. 点击 "Add user" -> "Create new user"
4. 填写：
   - **Email**: `test@example.com`
   - **Password**: 设置一个密码
   - **Auto Confirm User**: ✅ 勾选（自动确认，无需邮箱验证）
5. 点击 "Create user"

### 方法 2: 通过应用注册页面

1. 访问部署后的应用 URL
2. 点击注册
3. 填写邮箱和密码
4. 如果启用了邮箱验证，需要检查邮箱并点击验证链接

### 方法 3: 使用 SQL（批量创建）

在 Supabase Dashboard 的 SQL Editor 中运行：

```sql
-- 创建测试用户（需要先通过 Dashboard 或应用创建，然后可以更新）
-- 注意：用户需要通过 Supabase Auth 创建，不能直接在 auth.users 表中插入
```

## 🧪 测试部署

### 1. 测试登录

1. 访问部署后的应用
2. 使用创建的测试账号登录
3. 验证登录成功

### 2. 测试功能

- ✅ 创建词语
- ✅ 创建收藏册
- ✅ 拖动词语到收藏册
- ✅ 创建作品
- ✅ 创建标签
- ✅ 刷新页面验证数据持久化

### 3. 检查数据

在 Supabase Dashboard 中：
- `Table Editor` -> `words` - 查看创建的词语
- `Table Editor` -> `collections` - 查看创建的收藏册
- `Table Editor` -> `poetry` - 查看创建的作品

## 🔧 其他部署选项

### 部署到其他平台

#### Railway

1. 连接 GitHub 仓库
2. 设置 Root Directory: `nextjs`
3. 添加环境变量
4. 部署

#### Netlify

1. 连接 GitHub 仓库
2. 设置：
   - Build command: `cd nextjs && yarn build`
   - Publish directory: `nextjs/.next`
3. 添加环境变量
4. 部署

#### 自托管服务器

```bash
# 1. 在服务器上克隆仓库
git clone https://github.com/SongshGeo/Poetrup.git
cd Poetrup

# 2. 安装依赖
cd nextjs
yarn install

# 3. 配置环境变量
cp .env.template .env.local
# 编辑 .env.local，填入云端 Supabase 配置

# 4. 构建
yarn build

# 5. 启动（使用 PM2 或其他进程管理器）
yarn start
# 或
pm2 start yarn --name "poetrup" -- start
```

## 📝 部署后检查清单

- [ ] 环境变量已正确配置
- [ ] Supabase 重定向 URL 已配置
- [ ] 应用可以正常访问
- [ ] 登录功能正常
- [ ] 数据可以正常创建和保存
- [ ] 刷新页面后数据仍然存在
- [ ] HTTPS 正常工作（Vercel 自动提供）

## 🔒 安全注意事项

1. **不要提交 `.env.local`**：确保 `.env.local` 在 `.gitignore` 中
2. **使用环境变量**：生产环境使用 Vercel 的环境变量，不要硬编码
3. **保护 Service Role Key**：`PRIVATE_SUPABASE_SERVICE_KEY` 只在服务器端使用
4. **启用 RLS**：确保数据库的 RLS 策略已正确配置

## 🐛 常见问题

### 问题 1: 登录后重定向失败

**解决**：检查 Supabase Dashboard 中的 Redirect URLs 配置，确保包含你的部署 URL。

### 问题 2: 数据无法保存

**解决**：
1. 检查环境变量是否正确
2. 检查 RLS 策略是否允许当前用户操作
3. 查看浏览器控制台的错误信息

### 问题 3: 构建失败

**解决**：
1. 检查 `nextjs/package.json` 中的依赖
2. 确保 Root Directory 设置为 `nextjs`
3. 查看 Vercel 构建日志

### 问题 4: 样式丢失

**解决**：确保 `globals.css` 已正确导入，检查 Tailwind 配置。

## 📚 相关文档

- [Vercel 部署文档](https://vercel.com/docs)
- [Supabase 生产环境指南](https://supabase.com/docs/guides/hosting/overview)
- [Next.js 部署文档](https://nextjs.org/docs/deployment)

