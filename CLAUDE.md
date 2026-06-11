# 达博理 (Daboli) — 项目指南

多学科知识学习平台，面向网络工程师、软考备考者及中小学 AI 教育。

## 快速参考

- **技术栈**: Next.js 16 + React 19 + TypeScript + Tailwind CSS 4 + Supabase + MiMo API
- **部署**: Vercel (生产) → `npx vercel --prod --yes`
- **仓库**: `https://github.com/langyou124-sudo/network-learning`
- **构建**: `NODE_OPTIONS="--max-old-space-size=4096" npm run build`

## 项目文档

| 文档 | 内容 |
|------|------|
| [docs/architecture.md](docs/architecture.md) | 系统架构、技术栈、目录结构、数据流 |
| [docs/conventions.md](docs/conventions.md) | 代码规范、命名规则、提交规范 |
| [docs/workflow.md](docs/workflow.md) | 开发→测试→部署流程 |
| [docs/roadmap.md](docs/roadmap.md) | 功能规划、优先级、里程碑 |
| [docs/ops.md](docs/ops.md) | 运维手册、环境变量、灾备恢复 |

## 核心架构

- **课程数据**: TypeScript 静态文件 (`src/data/`)，编译时类型安全
- **认证**: Supabase Auth (邮箱/密码 + Magic Link)
- **AI**: MiMo API 流式问答，上下文感知当前课题
- **搜索**: Supabase pgvector 语义检索
- **用户数据**: localStorage (进度/笔记/错题)
- **多学科**: 学科注册表 + 模块化数据源，新增学科只需加数据目录

## 关键约束

- Next.js 16.2.7 是非标准版本，改动前读 `node_modules/next/dist/docs/`
- 课题内容中的代码块必须在 `processChildren()` 中跳过 (避免术语高亮破坏样式)
- 模板字面量中的反引号需要转义: `` \` ``
- 构建需要增大内存: `--max-old-space-size=4096`
- 课程改动后必须: build → 浏览器验证 → commit → push → vercel --prod

## 行为准则

1. **不要假设** — 不确定就问
2. **最简方案** — 200 行能解决的事别写 500 行
3. **手术刀改动** — 只改该改的
4. **目标驱动** — 改完要能验证
