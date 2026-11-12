# 会话交接：达博理（network-learning）

> 给下一个会话窗口的上下文交接。你接手时**先读这份**，再读 `PLAN.md`，然后按"下一步"里的优先级继续。
> 不要从零重新调研——下面的事实都已经验证过，重复核实只会浪费上下文。

---

## 0. 环境事实（先记住这几条）

| 项 | 值 |
|---|---|
| 仓库 | `C:\Users\李光为\network-learning`（Windows，git 分支 `master`） |
| 远端 | `https://github.com/langyou124-sudo/network-learning.git` |
| 当前 HEAD | `1c59454`，已与 origin 同步 |
| Node | 系统装了 Node 24（`C:\Program Files\nodejs\node.exe`），没有 pnpm，用 npm |
| dev server | `npm run dev` → **用 `http://localhost:3000`**（别用 127.0.0.1，见坑 #1） |
| **git push 必须走代理** | `git -c http.proxy=http://127.0.0.1:10081 -c https.proxy=http://127.0.0.1:10081 push origin master`（直连会被 reset） |
| 环境变量 | `.env.local` 已有 Supabase / MIMO / ZHIPUAI 四个键；`.env.example` 是模板 |

**验证命令（每次改完必跑）**

```bash
npm run typecheck                      # 内部会先 next typegen
npx eslint src/ --max-warnings=0       # CI 是 0 容忍
npm test                               # 199 用例 / 18 文件
$env:NODE_OPTIONS="--max-old-space-size=4096"; npm run build
```

---

## 1. 这个项目是什么

多学科学习平台（Next.js 16 App Router + React 19 + Tailwind 4 + Supabase + MiMo 问答）。
5 个学科：网络工程、软考（网络工程师/软件设计师）、马克思主义、考研 802、考研 303。
内容全是静态 TypeScript：**339 个课题**，`src/data/*/topics/*.ts`。

数据流：页面读 `localStorage`（`src/lib/storage.ts`）→ 登录后与 Supabase `learning_state` 同步；
AI 问答走 `/api/v1/chat`（MiMo，Anthropic 格式）；语义搜索走 `/api/v1/search`（智谱 embedding + pgvector RPC `search_knowledge`）。

---

## 2. 已经做完的事（不要重做）

| 能力 | 落点 | 状态 |
|---|---|---|
| 质量门禁 | `npm run typecheck` = `next typegen && tsc`；CI 同款 | ✅ |
| 内容索引自动化 | `scripts/build-content-index.mjs` → `src/data/network/topics.generated.ts` | ✅ 加课题=放文件+`npm run content:index` |
| 内容完整性测试 | `tests/course-data.test.ts`（id 唯一、选项字母范围、解析非空…） | ✅ |
| 云同步 | `src/lib/sync.ts` + `sync-merge.ts` + `supabase/migrations/*learning_state.sql` | ✅ **已用真实账号端到端验证** |
| 学习日历 | `src/components/StudyCalendar.tsx` + `src/lib/study-stats.ts` | ✅ |
| 薄弱点推荐 | `src/lib/suggestions.ts`（错题+正确率+未完成加权） | ✅ |
| 学科人格 | `src/lib/chat-persona.ts`（按学科注入 prompt + 检索按学科过滤） | ✅ |
| 搜索学科筛选 | `/api/v1/search?subject=` + explore 页 chip | ✅（但检索本身因额度不可用） |
| embedding 可配置 | `src/lib/api/embedding.ts`（`EMBEDDING_PROVIDER=zhipu\|openai`） | ✅ |
| CI | `.github/workflows/ci.yml` 9 步全绿（含 coverage、env 占位符） | ✅ |

**验证过的结论**（别再怀疑）：
- `learning_state` 表存在、RLS 生效：匿名 `GET` 返回 `200 []`，匿名 `POST` 被 `42501` 拒绝
- 同步双向可用：点「标记完成」→ 服务端行 `completed` 增加；清空 localStorage → 刷新 → 从云端恢复
- 199 个测试通过；CI 绿

---

## 3. 当前唯一的硬阻塞

**知识库是坏的，搜索和 RAG 都不可用。**

| 事实 | 值 |
|---|---|
| `knowledge_chunks` 行数 | 约 41 行（应为 3988） |
| 每个课题的分块 | **1 块**（单块 3614 字，旧脚本分块逻辑坏了） |
| 向量维度 | `vector(2048)`（智谱 embedding-3） |
| 直接原因 | 智谱额度用尽：`429 {"code":1113,"message":"余额不足或无可用资源包,请充值。"}` |
| 影响 | 搜索接口 500；问答的 RAG 静默降级为空 |

代码侧已经准备好了：`npm run content:embed` 是 dry-run（339 课题 / 3988 块），加 `--write --reset` 才真正重灌。

---

## 4. 下一步（按优先级，不要跳）

### P0 · 恢复 embedding 并重灌知识库

需要外部条件之一：

1. **给智谱充值** → 什么都不用改：`npm run content:embed -- --write --reset`
2. **换 OpenAI 兼容供应商**（硅基流动 bge-m3 等），改 `.env.local`：

   ```bash
   EMBEDDING_PROVIDER=openai
   EMBEDDING_BASE_URL=https://api.siliconflow.cn/v1
   EMBEDDING_MODEL=BAAI/bge-m3
   EMBEDDING_API_KEY=sk-xxx
   EMBEDDING_DIMENSIONS=1024
   ```

   **但 1024 ≠ 现有 2048**，必须先改库：

   ```sql
   -- 先看清现状（Supabase SQL Editor）
   select format_type(atttypid, atttypmod) from pg_attribute
   where attrelid='knowledge_chunks'::regclass and attname='embedding';
   select pg_get_functiondef(oid) from pg_proc where proname='search_knowledge';

   alter table knowledge_chunks alter column embedding type vector(1024);
   -- 若原来有 ivfflat/hnsw 索引，按新维度重建
   ```

   脚本里有维度守卫：`EMBEDDING_DIMENSIONS` 与库里不一致会**提前报错**而不是写一半失败。

3. 用户还有一台机器（RX 9070 GRE 12GB / 7800X3D / 24G DDR5），计划本地部署
   `bge-m3`（1024 维）+ `qwen3:14b`。细节见 `docs/handoff-2026-11-12.md` 第四节。

**重灌后必须验证**：`GET /api/v1/search?q=VLAN` 返回非空、`/api/v1/chat` 的回答里出现【课题名】片段。

### P1 · 把问答从 MiMo 换成本地/其他 OpenAI 兼容模型

`src/app/api/v1/chat/route.ts` 现在写死：
- `MIMO_ENDPOINT = https://token-plan-cn.xiaomimimo.com/anthropic/v1/messages`
- 派发 Anthropic 格式（`system` 顶层字段、`anthropic-version` 头）

换 Ollama/DeepSeek 需要改成 OpenAI 兼容：`/v1/chat/completions`、`system` 放进 `messages[0]`、去掉
`anthropic-version`。SSE 解析在 `src/components/ChatWidget.tsx` 的 `readSSEStream`，两边格式不同要一起改。

### P2 · 未登录试用额度（产品决策，未做）

现在 `/api/v1/chat` 与 `/search` 都强制登录（401）。要放开需先定：每人几次、按 IP 还是指纹、
超限怎么引导注册。会直接影响 API 成本，**没有明确指示不要自己拍板**。

### P3 · 其他已知问题

- 笔记冲突保留本机（整块存储的代价，两台设备同时改会覆盖）
- `eslint` 的 `react-hooks/set-state-in-effect` 被关闭（11 处历史写法），彻底修要改 `useSyncExternalStore`
- 家目录有游离 `package.json`/`package-lock.json`，Next 会把它当 workspace 根（构建告警，不影响功能）

---

## 5. 踩过的坑（会浪费时间，照着避）

1. **`127.0.0.1` 打不开页面 / 点登录没反应**：Next 16 只认 `localhost`，`/_next` 资源被跨源拦，React 不水合。
   已在 `next.config.ts` 加 `allowedDevOrigins: ['127.0.0.1']`，但**仍建议用 localhost**。
   判断是否水合：`document.querySelector('form')` 上有 `__reactFiber$` 属性。
2. **不要同时跑两个 `next dev`**：会并发写坏 `.next/dev/types/routes.d.ts`（表现为 tsc 报语法错误）。
   启动脚本已改成 TCP 探测，别手动再起。
3. **`tsc` 必须先 `next typegen`**：`next-env.d.ts` 引用 `.next/types`，不生成就漏检路由类型。
4. **改课题后必须 `npm run content:index`**：`topics.generated.ts` 是生成物，CI 有 `--check` 会拦。
5. **不要用 PowerShell 的 `Get-Content`/`Set-Content` 改含中文的文件**：会把中文写成乱码、
   甚至把下一行吞进注释（本项目踩过三次）。改代码用编辑工具直接写，批量操作用 Node 脚本。
6. **CI 的 `--max-warnings=0`**：哪怕 warning 也会红，改完顺手跑一次 eslint。
7. **push 必须带代理**（见第 0 节），否则 `Connection was reset`。
8. **不要 force push**；远端曾有并行提交，合并冲突只在生成的索引文件上。

---

## 6. 关键文件地图

```
src/lib/
  sync.ts / sync-merge.ts     云同步与合并策略（纯函数在 sync-merge）
  storage.ts                  localStorage 读写 + 变更通知（onLocalDataChanged）
  study-stats.ts              日历数据整形（buildCalendar/levelOf）
  suggestions.ts              薄弱点排序 + 推荐（rankWeakTopics/pickSuggestionQuestions）
  chat-persona.ts             学科人格 prompt + 检索过滤（moduleIdsOfSubject/pickRelevantChunks）
  api/embedding.ts            embedding provider 解析（EMBEDDING_* 环境变量）
  api/validate.ts             chat/search 入参校验
  quiz-grading.ts             统一判分内核（远端提交带入）
scripts/
  build-content-index.mjs     生成 topics.generated.ts
  embed-knowledge.ts          向量化（默认 dry-run，--write/--reset 才落库）
supabase/migrations/          学习数据表 + RLS
docs/handoff-2026-11-12.md    给人看的部署/硬件文档
PLAN.md                       阶段计划与验收（状态真源）
```

---

## 7. 工作方式约定（沿用）

- **分阶段推进**：每个阶段跑完 typecheck + lint + test + build，然后 `git commit`（`type(scope): 描述`），
  并把结论写回 `PLAN.md`。不要一口气改很多东西再验证。
- **先验证再声称**：本会话里曾把"答案必须是选项全文"写成断言，跑挂 200 条才发现 UI 存的是字母——
  断言错了，代码没错。遇到大面积失败先怀疑自己的假设。
- **给用户的结论要带证据**：命令输出、HTTP 状态码、行号，不要"应该可以"。
- 用户不接受"清库式"操作：向量化脚本默认 dry-run、清库必须显式 `--reset`，这是硬约定。

---

## 8. 一句话接手

> 门禁和同步都好了，CI 绿；现在卡在 embedding 额度——先让用户给出一个可用的 embedding key（或充值），
> 然后重灌 3988 块并验证搜索/问答，再谈把对话模型换成本地。
