# 达博理 — 代码规范

## 基本原则

1. **先想后写** — 不确定就问，别猜
2. **最简方案** — 200 行能解决的事别写 500 行
3. **手术刀改动** — 只改该改的，别顺手"优化"别的
4. **目标驱动** — 改完要能验证，别做完就算了

## 技术栈约束

| 工具 | 版本 | 注意事项 |
|------|------|----------|
| Next.js | 16.2.7 | 非标准版本，改动前读 `node_modules/next/dist/docs/` |
| React | 19.x | 并发特性可用 |
| Tailwind CSS | 4.x | 无 tailwind.config，用 `@import "tailwindcss"` |
| TypeScript | 5.x | 严格模式 |

## 文件命名

| 类型 | 规范 | 示例 |
|------|------|------|
| 页面组件 | `page.tsx` | `src/app/learn/network/page.tsx` |
| 布局组件 | `layout.tsx` | `src/app/layout.tsx` |
| API 路由 | `route.ts` | `src/app/api/v1/chat/route.ts` |
| React 组件 | PascalCase | `ChatWidget.tsx` |
| 工具函数 | camelCase | `storage.ts`, `validate.ts` |
| 课题数据 | kebab-case + 编号 | `topic-01.ts`, `topic-06-01.ts` |
| 模块元数据 | `modules.ts` | 每个学科目录下一个 |
| 类型定义 | `index.ts` | `src/types/index.ts` |

## 课题文件结构

每个课题文件导出一个对象，结构如下：

```typescript
export const topic_XX = {
  title: "课题标题",
  description: "一句话描述",
  content: `# Markdown 内容
    <Glossary terms="..." />    // 术语卡片（URL 编码的 JSON）
    <Diagram type="xxx" />      // 交互式图表
  `,
  quizzes: [
    {
      id: 'quiz-XX-01',
      type: 'choice' | 'fill' | 'short-answer',
      question: '题目文本',
      options: ['A', 'B', 'C', 'D'],  // choice 类型必需
      answer: 'B',                      // 或 ['答案1', '答案2'] 填空题
      explanation: '解析'
    }
  ],
  references: ['参考链接或书目']
};
```

### content 编写规范

- 使用 Markdown 格式，支持 GFM 表格
- 代码块用 `\`\`\`语言` 标记
- `<Glossary terms="..."/>` 嵌入术语卡片，terms 值为 `encodeURIComponent(JSON.stringify([...]))`
- `<Diagram type="xxx"/>` 嵌入交互式图表
- 术语高亮会自动应用到纯文本，但跳过 `<code>` 和 `<pre>` 元素

### Quiz 编写规范

- 每课题 3-5 道题
- 题型混合：至少 1 道选择题、1 道填空题或简答题
- answer 字段：选择题用字母（'A'/'B'/'C'/'D'），填空题用数组
- explanation 要解释为什么这个答案正确

## 组件规范

### 页面组件
- 使用 `'use client'` 声明客户端组件
- 通过 `useParams()` 获取路由参数
- 通过 `getModuleById()` / `getTopicById()` 获取数据
- 支持 3 个 Tab：知识讲解、练习题、笔记

### 图表组件
- 放在 `src/components/diagrams/`
- 在 `index.ts` 中统一导出
- 在 `diagramComponents` map 中注册 type → Component 映射
- 使用 CSS 动画，支持 `prefers-reduced-motion`

### API 路由
- 版本化路径：`/api/v1/{resource}`
- 旧路径保留 re-export 向后兼容
- 鉴权：`supabase.auth.getUser()` 检查
- 限流：Upstash Redis 或内存降级
- 错误返回：`{ error: '中文错误信息' }` + 对应 HTTP 状态码

## 样式规范

- 使用 CSS 变量（`var(--text)`, `var(--accent)` 等）
- 不写自定义 CSS，优先用 Tailwind 工具类
- 响应式：sm (640px), md (768px), lg (1024px)
- 动画：使用 `.animate-in` 类 + `animationDelay` 做渐入效果

## Git 提交规范

```
<type>: <简短描述>

<可选的详细说明>
```

| type | 用途 |
|------|------|
| feat | 新功能 |
| fix | Bug 修复 |
| refactor | 重构（不改变功能） |
| docs | 文档 |
| style | 格式调整 |
| test | 测试 |
| chore | 构建/工具链 |

示例：
```
feat: add forgot-password flow and password format validation
fix: prevent glossary highlight from breaking code blocks
refactor: split monolithic network/index.ts into per-topic files
```

## 命名约定

- **模块 ID**：kebab-case，如 `network-basics`, `ne-computer-network-basics`
- **课题 ID**：`topic-{两位数}` 或 `topic-{模块编号}-{两位数}`，如 `topic-01`, `topic-06-01`
- **Quiz ID**：`quiz-{课题ID后缀}-{两位序号}`，如 `quiz-62-01`
- **学科前缀**：网络工程无前缀，软考网络工程师用 `ne-`，软件设计师用 `sd-`

## 禁止事项

- 不在 `courses.ts` 以外的地方硬编码课题数据
- 不在组件中直接 import 课题文件（通过 `getTopicById()` 访问）
- 不在 localStorage 中存储敏感信息（密码、token）
- 不在前端暴露 Supabase service_role key
- 不使用 `any` 类型（除非有注释说明原因）
