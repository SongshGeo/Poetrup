.PHONY: help update-frontend install dev build

help: ## 显示帮助信息
	@echo "可用命令："
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

update-frontend: ## 更新前端代码（从 Figma/前端仓库同步到 Next.js 项目）
	@echo "🔄 开始更新前端代码..."
	@bash scripts/update-frontend.sh

install: ## 安装依赖
	@cd nextjs && yarn install

dev: ## 启动开发服务器
	@cd nextjs && yarn dev

build: ## 构建生产版本
	@cd nextjs && yarn build

lint: ## 运行代码检查
	@cd nextjs && yarn lint

type-check: ## 运行 TypeScript 类型检查
	@cd nextjs && yarn type-check

test: lint type-check ## 运行所有检查（lint + type-check）

