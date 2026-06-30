# 达博理 — Harness 工程手册

## 什么是 Harness Engineering

一句话：**Agent = Model + Harness**。每当 agent 犯错，就构建一个机制确保它永远不再犯同样的错。

来源：
- Mitchell Hashimoto (HashiCorp/Terraform) — 2026年2月提出概念
- OpenAI Ryan Lopopolo — 2026年2月11日正式定义
- Addy Osmani — 最佳实践总结

## 核心原则

### 1. 棘轮机制（Ratchet）

每条 AGENTS.md 中的规则必须可追溯到具体失败。不要预防性添加规则，只在真正出错后添加。

```
agent 犯错 → 分析根因 → 添加约束（规则/hook/子agent）→ 约束可验证
```

### 2. PEV 循环（Plan-Execute-Verify）

- **Plan** — 将目标分解为明确步骤，写入 PLAN.md
- **Execute** — agent 按计划执行，每个步骤有明确的验收标准
- **Verify** — 自动化验证（typecheck/test/build）+ 人工复核

### 3. 地图而非百科

CLAUDE.md 只做目录，指向 docs/ 下的详细文档。太长的指令会被 agent 忽略或误解。

### 4. 确定性约束优先

能用 hook 拦截的不要靠提示词。能用测试验证的不要靠人工检查。

## 项目中的 Harness 组件

| 组件 | 文件 | 作用 |
|------|------|------|
| 知识地图 | `CLAUDE.md` | agent 入口，指向详细文档 |
| 行为规则 | `AGENTS.md` | 可追溯的约束集 |
| Claude Code 配置 | `.claude/settings.json` | hooks、权限、自动化 |
| Pre-commit hooks | `lefthook.yml` | 提交前自动检查 |
| 执行计划 | `PLAN.md` | 复杂任务的持久化状态 |
| 验证命令 | `npm test` / `npx tsc` | agent 自验证 |
| CI 流水线 | `.github/workflows/ci.yml` | 最后一道防线 |
| 测试套件 | `tests/` | 行为回归检测 |

## 如何添加新规则

1. **观察失败** — agent 犯了什么错？
2. **分析根因** — 缺少什么能力/约束？
3. **选择约束类型**：
   - 纯行为约束 → 加到 `AGENTS.md`
   - 可机器验证 → 加 hook 或 pre-commit
   - 复杂逻辑 → 拆子 agent 或加测试
4. **记录来源** — 在 AGENTS.md 中标注失败案例
5. **验证生效** — 确保约束能拦截同样的错误

## 规则演进记录

| 日期 | 规则 | 来源 | 类型 |
|------|------|------|------|
| 2026-06-30 | R-001: 改完必须类型检查 | agent 提交类型错误代码 | pre-commit |
| 2026-06-30 | R-002: 改完必须跑测试 | agent 重构后未跑测试 | pre-commit |
| 2026-06-30 | R-003: 课程改动后必须构建 | 数据格式错误导致构建失败 | AGENTS.md |
| 2026-06-30 | R-004: 代码块跳过高亮 | 术语高亮破坏代码样式 | AGENTS.md |
| 2026-06-30 | R-005: 反引号转义 | 模板字面量编译错误 | AGENTS.md |

> 新增规则时请更新此表。
