# 当前执行计划

> 复杂任务使用此文件记录计划、验收标准和进度。agent 和人都可以读写。
> 简单任务不需要更新此文件。

## 目标

Harness Engineering 改造 — 将项目升级为 agent 自驱的 PEV 循环开发模式。

## 验收标准

- [x] CLAUDE.md 重写为 agent 地图格式
- [x] AGENTS.md 扩充为可追溯规则集
- [x] .claude/settings.json 配置 hooks 和权限
- [x] lefthook.yml 配置 pre-commit hooks
- [x] .env.example 环境变量模板
- [x] 组件测试：Sidebar、ChatWidget
- [x] 工具测试：suggestions 推荐引擎
- [x] CI 增强：lint + coverage
- [x] PLAN.md 执行计划模板
- [x] docs/harness.md 工程手册
- [x] 所有测试通过（8 文件，72 用例）
- [ ] 构建成功（需 Supabase 环境变量）
- [ ] 部署验证

## 进度

- [x] 阶段 1：知识地图重构 — CLAUDE.md + AGENTS.md
- [x] 阶段 2：确定性拦截 — hooks + pre-commit + .env.example
- [x] 阶段 3：验证循环扩展 — 组件测试 + CI 增强
- [x] 阶段 4：执行计划体系 — PLAN.md + docs/harness.md
- [ ] 最终验证：typecheck + test + build + deploy

## 决策日志

- [2026-06-30] 选择 lefthook 而非 husky — 更轻量，无运行时依赖
- [2026-06-30] 选择 @testing-library/react 而非 Enzyme — React 19 官方推荐
- [2026-06-30] CLAUDE.md 控制在 ~50 行 — 地图而非百科，避免上下文污染
