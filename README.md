# 达博理 Daboli

多学科知识学习平台 — 网络工程 · 软考备考 · AI 教育

## 功能

- 63 个网络工程课题（OSI/TCP-IP 到 5G/零信任/TSN）
- 软考网络工程师中级备考（6 模块、55 课题）
- AI 智能问答（MiMo API，上下文感知当前课题）
- 语义搜索（Supabase pgvector）
- 交互式图表（16 个：OSI、VLAN、STP、加密流程等）
- 练习系统（选择/填空/简答 + 自动评分 + 错题本）
- 学习进度追踪 + 笔记

## 技术栈

| 层 | 技术 |
|----|------|
| 框架 | Next.js 16 (App Router) + TypeScript |
| UI | React 19 + Tailwind CSS 4 |
| 认证 | Supabase Auth |
| 数据库 | Supabase PostgreSQL + pgvector |
| AI | MiMo API (流式问答) |
| 限流 | Upstash Redis |
| 部署 | Vercel |

## 快速开始

```bash
npm install
cp .env.example .env.local   # 填入 Supabase 和 MiMo 密钥
npm run dev                   # http://localhost:3000
```

## 项目文档

- [系统架构](docs/architecture.md)
- [代码规范](docs/conventions.md)
- [开发工作流](docs/workflow.md)
- [产品路线图](docs/roadmap.md)
- [运维手册](docs/ops.md)

## 部署

```bash
git push origin master        # 自动部署
# 或手动
npx vercel --prod --yes
```

## 目录结构

```
src/
├── app/              # 页面和 API
├── components/       # UI 组件和图表
├── data/             # 课程数据（静态 TypeScript）
│   ├── network/      # 网络工程（15 模块、63 课题）
│   └── ruankao/      # 软考备考
├── hooks/            # React Hooks
├── lib/              # 工具函数（Supabase、存储、校验）
└── types/            # 类型定义
```
