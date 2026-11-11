# 当前执行计划

> 复杂任务使用此文件记录计划、验收标准和进度。agent 和人都可以读写。
> **状态真源 = 本文件 + git 提交。** 每轮开始先读这里，结束后写回这里。

## 当前阶段

- [已完成] 阶段 0 — 恢复质量门禁（提交 349b260）
- [已完成] 阶段 1 — 内容流水线（提交 5e16ef4）
- [已完成] 阶段 2 — 学习闭环（云同步 8ba75bb、学习日历 05a62c9、薄弱点推荐 9fdb1c2）
- [部分完成] 阶段 3 — AI 对齐多学科（人格 + 检索过滤已完成；未登录试用待决策）

## 验收标准

### 阶段 0：恢复质量门禁

- [x] `npm run typecheck` 零错（内部走 `next typegen && tsc --noEmit`）
- [x] `npm run build` 成功
- [x] 启动脚本不会重复拉起 `next dev`（TCP/HTTP 探测）
- [x] CI 的类型检查与本地一致（同样先 typegen）

### 阶段 1：内容流水线

- [x] `scripts/embed-knowledge.ts` 数据源为真实内容、默认 dry-run、默认不清库、可用 service_role
- [x] 内容完整性测试替换掉两个空转测试（id 唯一、选项字母范围、解析非空、每题最少一题）
- [x] 删除 `src/data/sdn-nfv/`、根目录 `_gen_*.mjs`、`_backup/`
- [x] 新增课题 = 放 1 个文件 + 跑 `npm run content:index`，不再手改索引
- [x] CI 校验索引是否最新

## 阶段 1 收尾数据

- 全库课题：323 个（网络 63、马理论 14 模块、软考 12 模块、802 三科、303 三科）
- 向量化分块：3710 块（size=500 overlap=80），全量约 12 分钟
- 测试：8 文件 / 80 用例全绿（原 75，新增 5 条内容完整性断言）
- 构建：`✓ Compiled successfully`

## 下一阶段（阶段 2）待办

1. [x] localStorage → Supabase：整块存储 + 客户端字段级合并（`supabase/migrations/20261111000000_learning_state.sql`）
2. [ ] 学习日历与时长图表（数据已在记，只差展示）
3. [ ] 错题 → 薄弱知识点 → 推荐练习（现在推荐是硬编码 3 条 + 随机）

### 阶段 2 上线动作（已完成）

- [x] 在 Supabase SQL Editor 执行 `supabase/migrations/20261111000000_learning_state.sql`
- [x] 验证（2026-11-11）：匿名 `GET /rest/v1/learning_state` 返回 `200 []`（RLS 过滤，无泄漏）；
      匿名 `POST` 被拒 `42501 new row violates row-level security policy`，说明 RLS 生效且策略正确

## 待决策（需要人拍板，agent 不自行决定）

1. **未登录试用额度**：现在 chat 强制登录，未登录直接 401。放开需要定「每人多少次、
   按 IP 还是按浏览器指纹、超限后如何引导注册」，直接影响 API 成本，暂不实现。
2. **Supabase 迁移**：已执行并验证（见上）。
3. **马理论是否继续投入**：内容最重（915 KB），无考试锚点，建议冻结增量。

## 已知问题（按优先级）

- 未登录用户看不到 AI 助手（产品决策，见上）
- `C:\Users\李光为\package.json` / `package-lock.json` / `node_modules` 让 Next 把家目录当成 workspace 根，
  构建时会警告并忽略项目的 lockfile；确认无用后可删掉这三项
- env 缺 `UPSTASH_*`，限流静默降级为进程内 Map；缺 `ZHIPUAI_API_KEY` 时 RAG 静默失效
- `rate-limit.ts` 用 `config.max` 魔法值选 limiter，改限额会静默切错
- 笔记冲突保留本机：两台设备同时改同一课题笔记时，另一端的内容会被覆盖（整块存储的已知代价）

## 决策日志

- [2026-11-11] 云同步采用「本地优先 + 登录后合并」：页面里几百处同步 localStorage 调用不动，
  冲突策略集中在 `src/lib/sync-merge.ts`（并集 / 较晚者优先 / 时长取大不累加 / 笔记本机优先）
- [2026-11-11] 学科收敛：软考网络工程师（主）+ 考研 802/303（副），马理论冻结扩内容
- [2026-11-11] 长期任务的状态放磁盘（本文件 + git），不依赖对话上下文
- [2026-11-11] 阶段 0 用 `next typegen` 而不是删 `.next` 了事，让 CI 与本地行为一致
- [2026-11-11] 引入 `tsx` 跑内容脚本：Node 无法直接 import 带 `@/` 别名的 TS 数据
- [2026-11-11] topic id 统一取文件名（网络工程课题对象里没有 id 字段）
- [2026-11-11] 向量化默认 dry-run、清库必须显式 `--reset`：旧脚本会清库后灌 0 条
- [2026-06-30] 选择 lefthook 而非 husky — 更轻量，无运行时依赖
- [2026-06-30] 选择 @testing-library/react 而非 Enzyme — React 19 官方推荐
- [2026-06-30] CLAUDE.md 控制在 ~50 行 — 地图而非百科，避免上下文污染

## 历史（已完成）

Harness Engineering 改造：CLAUDE.md / AGENTS.md / .claude hooks / lefthook / .env.example /
组件测试 / 工具测试 / CI 增强 / docs/harness.md。
