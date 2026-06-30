# Agent 行为规则

每条规则可追溯到具体的失败案例。新增规则必须标注来源。

## 必读（每次任务开始前）

1. **读 CLAUDE.md** — 获取文档地图和验证命令
2. **读相关文档** — 改代码读 conventions.md，新功能读 workflow.md
3. **理解当前任务上下文** — 检查 PLAN.md 是否有进行中的计划

## 操作守则

### 代码改动

- **R-001: 改完必须类型检查** — `npx tsc --noEmit` 通过才能提交
  > 来源: agent 提交了类型错误的代码，CI 挂掉
- **R-002: 改完必须跑测试** — `npm test` 全过才能提交
  > 来源: agent 重构 storage.ts 后破坏了现有测试但没跑
- **R-003: 课程内容改动后必须构建验证** — `npm run build` 成功
  > 来源: 课题数据文件格式错误导致构建失败，部署中断
- **R-004: 课题内容中的代码块必须跳过术语高亮** — 在 `processChildren()` 中处理
  > 来源: 代码块中的关键字被 GlossaryTooltip 替换，样式崩溃
- **R-005: 模板字面量中的反引号必须转义** — 用 `` \` `` 而非 `` ` ``
  > 来源: 课题内容中的模板字面量未转义，TypeScript 编译报错

### 组件开发

- **R-010: 新组件必须有对应测试文件** — 放在 `tests/components/` 下
  > 来源: ChatWidget 改动后无测试覆盖，回归 bug 未发现
- **R-011: 图表组件必须支持移动端** — 至少检查 768px 宽度下的显示
  > 来源: OsiLayers 在手机上溢出，用户反馈

### API 开发

- **R-020: API 路由必须有输入验证** — 使用 `src/lib/api/validate.ts`
  > 来源: chat API 缺少 body 验证，恶意请求导致 500 错误
- **R-021: API 路由必须有速率限制** — 使用 `src/lib/api/rate-limit.ts`
  > 来源: 无限制的 API 调用导致 Upstash 额度耗尽

### Git 操作

- **R-030: 提交信息遵循约定格式** — `type(scope): description`
  > 来源: agent 使用了不规范的提交信息，git log 难以阅读
- **R-031: 不要直接 push 到 master 的破坏性操作** — force push、reset --hard 等
  > 来源: 无（预防性规则）

## 验收标准（每个 PR 必须通过）

- [ ] `npx tsc --noEmit` — 类型检查通过
- [ ] `npm test` — 所有测试通过
- [ ] `npm run build` — 构建成功（需环境变量）
- [ ] 无新增 ESLint 错误
- [ ] 代码格式符合 Prettier 配置
- [ ] 新功能有对应测试
- [ ] 课程内容改动在浏览器中验证

## 禁止操作

- 不要删除 `.env.local` 或泄露环境变量
- 不要修改 `node_modules/` 下的文件
- 不要修改 `.vercel/project.json`（Vercel 绑定）
- 不要 force push 到 master
- 不要在没有测试的情况下删除现有代码
- 不要修改 `next.config.ts` 中的安全头配置（除非有充分理由）
