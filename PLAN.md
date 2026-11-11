# 当前执行计划

> 复杂任务使用此文件记录计划、验收标准和进度。agent 和人都可以读写。
> **状态真源 = 本文件 + git 提交。** 每轮开始先读这里，结束后写回这里。

## 当前阶段

- [进行中] 阶段 0 — 恢复质量门禁
- [未开始] 阶段 1 — 内容流水线
- [未排期] 阶段 2 — 学习闭环（localStorage → Supabase）
- [未排期] 阶段 3 — AI 对齐多学科

## 验收标准

### 阶段 0：恢复质量门禁

- [ ] `npm run typecheck` 零错（内部走 `next typegen && tsc --noEmit`）
- [ ] `npm run build` 成功一次
- [ ] 启动脚本不会重复拉起 `next dev`（端口探测改 HTTP 探测）
- [ ] CI 的类型检查与本地一致（同样先 typegen）

### 阶段 1：内容流水线

- [ ] `scripts/embed-knowledge.mjs` 数据源改为真实内容、默认 `--dry-run`、默认不清库、写库用 service_role
- [ ] 内容完整性测试替换掉两个空转测试（id 唯一、选择题选项、解析、每题最少题数）
- [ ] 删除 `src/data/sdn-nfv/`、根目录 `_gen_*.mjs`、`_backup/`
- [ ] 新增课题 = 放 1 个文件 + 跑 1 条命令，不再手改索引

## 进度

### 阶段 0

- [ ] 加 `next typegen` 与 `typecheck` 脚本
- [ ] 修启动脚本端口探测
- [ ] CI 类型检查步骤对齐
- [ ] 删 `.next` 重建并验证 typecheck / build

### 阶段 1

- [ ] 修 RAG 脚本
- [ ] 内容完整性测试
- [ ] 清理死代码与一次性产物
- [ ] 索引自动生成

## 已知地雷（下阶段前必须知道）

- `scripts/embed-knowledge.mjs` 用正则解析 `src/data/courses.ts`，但该文件只是聚合入口，
  提取结果为 0 条；而脚本会**先清空 `knowledge_chunks` 再灌入**，跑通即清库。
  目前因缺少 `dotenv` 依赖在第一步就抛错，地雷没有触发。
- `npx tsc --noEmit` 在本地必挂：`next-env.d.ts` 引用了 `.next/dev/types/routes.d.ts`，
  而该生成文件可能被并发写入写坏。CI 因为不提交 `.next` 与 `next-env.d.ts` 反而看不到这个问题。
- `chat/route.ts` 的 systemPrompt 仍只覆盖网络工程，与 5 个学科的现状不符。
- `course-data.test.ts` 里两个 "should be unique" 测试实际没有断言唯一性。

## 决策日志

- [2026-11-11] 学科收敛为两个战场：软考网络工程师（主）+ 考研 802/303（副），马理论冻结扩内容
- [2026-11-11] 长期任务的状态放磁盘（本文件 + git），不依赖对话上下文
- [2026-11-11] 阶段 0 用 `next typegen` 而不是删 `.next` 了事，让 CI 与本地行为一致
- [2026-06-30] 选择 lefthook 而非 husky — 更轻量，无运行时依赖
- [2026-06-30] 选择 @testing-library/react 而非 Enzyme — React 19 官方推荐
- [2026-06-30] CLAUDE.md 控制在 ~50 行 — 地图而非百科，避免上下文污染

## 历史（已完成）

Harness Engineering 改造：CLAUDE.md / AGENTS.md / .claude hooks / lefthook / .env.example /
组件测试 / 工具测试 / CI 增强 / docs/harness.md。测试 8 文件 75 用例全绿。
