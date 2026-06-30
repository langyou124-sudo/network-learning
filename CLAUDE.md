# 达博理 (Daboli) — Agent 地图

多学科学习平台：网络工程 / 软考 / 马克思主义。面向 agent 的开发指南。

## 快速参考

| 项目 | 值 |
|------|-----|
| 技术栈 | Next.js 16 + React 19 + TypeScript + Tailwind 4 + Supabase + MiMo API |
| 仓库 | `https://github.com/langyou124-sudo/network-learning` |
| 部署 | Vercel，push to master 自动部署 |
| 构建 | `NODE_OPTIONS="--max-old-space-size=4096" npm run build` |

## 验证命令速查

```bash
npx tsc --noEmit          # 类型检查
npm test                   # 单元测试
npm run build              # 构建（需要 Supabase 环境变量）
npx eslint src/            # 代码规范
npx prettier --check src/  # 格式检查
npx vercel --prod --yes    # 手动部署
```

## 文档地图

按需读取，不要预加载全部。

| 何时读 | 文档 | 内容 |
|--------|------|------|
| 改代码前 | [docs/conventions.md](docs/conventions.md) | 命名规范、提交规范、技术栈约束 |
| 新功能开发 | [docs/workflow.md](docs/workflow.md) | 分支策略、开发流程、测试部署步骤 |
| 了解架构 | [docs/architecture.md](docs/architecture.md) | 系统架构、数据流、目录结构、设计决策 |
| 规划任务 | [docs/roadmap.md](docs/roadmap.md) | 功能规划、技术债、里程碑 |
| 运维问题 | [docs/ops.md](docs/ops.md) | 环境变量、灾备、回滚、API 版本 |
| Agent 规则 | [AGENTS.md](AGENTS.md) | agent 行为约束（每条可追溯到具体失败） |
| Harness 手册 | [docs/harness.md](docs/harness.md) | Harness 工程方法论、规则演进记录 |
| 当前任务 | [PLAN.md](PLAN.md) | 执行计划、验收标准、进度 |

## 关键约束

- **Next.js 16.2.7 非标准版本** — 改动前读 `node_modules/next/dist/docs/`
- **课题内容代码块** — 必须在 `processChildren()` 中跳过（避免术语高亮破坏样式）
- **模板字面量反引号** — 需要转义: `` \` ``
- **构建内存** — 需要 `--max-old-space-size=4096`
- **课程改动流程** — build → 浏览器验证 → commit → push → vercel --prod

## 行为准则

1. 不确定就问，别猜
2. 200 行能解决的事别写 500 行
3. 只改该改的，别顺手"优化"别的
4. 改完要能验证
