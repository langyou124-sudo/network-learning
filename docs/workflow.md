# 达博理 — 开发工作流

## 开发环境

### 前置条件

- Node.js 18+
- npm 9+
- Git
- Supabase 账号（用于 Auth 和数据库）
- Vercel 账号（用于部署）

### 本地启动

```bash
git clone https://github.com/langyou124-sudo/network-learning.git
cd network-learning
npm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local 填入 Supabase 和 MiMo API 密钥

npm run dev
# 访问 http://localhost:3000
```

### 环境变量

在 `.env.local` 中配置（不提交到 Git）：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJxxx
MIMO_API_KEY=sk-xxx
UPSTASH_REDIS_REST_URL=https://xxx.upstash.io    # 可选
UPSTASH_REDIS_REST_TOKEN=AXxx                      # 可选
```

## 分支策略

```
master (生产)
  │
  ├── feat/xxx    功能分支
  ├── fix/xxx     修复分支
  └── refactor/xxx 重构分支
```

- **master**：主分支，直接部署到 Vercel 生产环境
- **功能分支**：从 master 切出，完成后合并回 master
- 当前规模较小，暂不使用 PR 流程，直接 push master

## 开发流程

### 1. 新增课题

```bash
# 1. 创建课题文件
#    src/data/network/topics/topic-XX.ts

# 2. 注册到模块
#    src/data/network/modules.ts → 对应模块的 topicIds 数组

# 3. 注册到数据源
#    src/data/network/index.ts → import + topicMap

# 4. 本地验证
npm run dev
# 访问 /learn/network/{moduleId}/{topicId}

# 5. 构建验证
NODE_OPTIONS="--max-old-space-size=4096" npm run build

# 6. 提交部署
git add src/data/network/topics/topic-XX.ts src/data/network/modules.ts src/data/network/index.ts
git commit -m "feat: add topic-XX {课题标题}"
git push origin master
npx vercel --prod --yes
```

### 2. 新增学科

```bash
# 1. 创建数据目录
#    src/data/{学科名}/
#    ├── index.ts
#    ├── modules.ts
#    └── topics/

# 2. 在 courses.ts 聚合
#    import { xxxModules } from './{学科名}';
#    export const modules = [...networkModules, ...ruankaoModules, ...xxxModules];

# 3. 创建路由页面
#    src/app/learn/{学科名}/page.tsx
#    src/app/learn/{学科名}/[moduleId]/page.tsx
#    src/app/learn/{学科名}/[moduleId]/[topicId]/page.tsx

# 4. 更新侧边栏和探索页

# 5. 构建 + 部署
```

### 3. 修改现有功能

```bash
# 1. 修改代码
# 2. 本地验证：npm run dev，浏览器测试
# 3. 构建验证：npm run build
# 4. 提交：git commit -m "type: description"
# 5. 推送：git push origin master
# 6. 部署：npx vercel --prod --yes
```

## 构建与部署

### 本地构建

```bash
NODE_OPTIONS="--max-old-space-size=4096" npm run build
```

- 需要增大内存限制（课题内容较多）
- 构建产出在 `.next/` 目录

### 部署到 Vercel

```bash
# 方式一：CLI 手动部署
npx vercel --prod --yes

# 方式二：Git 推送自动部署
git push origin master
# Vercel 监听 master 分支，自动构建部署
```

### 部署回滚

1. 打开 Vercel Dashboard → 项目
2. Deployments 标签页
3. 找到目标版本 → ⋯ → Promote to Production
4. 即时生效

## 测试

### 单元测试

```bash
npm run test        # 运行一次
npm run test:watch  # 监听模式
```

- 测试框架：Vitest
- 测试文件：`tests/` 目录
- 覆盖：工具函数（storage.ts, validate.ts）

### 手动测试清单

每次改动后至少验证：

- [ ] `npm run build` 通过
- [ ] 受影响页面在浏览器中正常渲染
- [ ] 术语高亮不破坏代码块
- [ ] AI 助手正常响应
- [ ] 搜索功能正常
- [ ] 练习题提交和评分正常
- [ ] 移动端布局正常

## 调试

### 常见问题

| 问题 | 排查 |
|------|------|
| 构建 OOM | 加 `--max-old-space-size=4096` |
| 术语高亮破坏代码块 | 检查 `processChildren()` 是否跳过 code/pre |
| 模板字面量语法错误 | 检查反引号转义 `\`` |
| Supabase 连接失败 | 检查 .env.local 和 Supabase 项目状态 |
| Vercel 部署失败 | 检查构建日志，通常是类型错误或 OOM |

### 日志查看

```bash
# Vercel 函数日志
vercel logs <deployment-url>

# 本地开发日志
# 浏览器 DevTools Console + Terminal 输出
```

## AI 协作规范

本项目大量使用 AI 辅助开发。与 AI 协作时：

1. **明确需求**：告诉 AI 具体要改什么，不要模糊描述
2. **小步迭代**：每次改 1-2 个文件，不要一次性改太多
3. **验证优先**：改完必须 `npm run build` + 浏览器验证
4. **上下文管理**：长对话时让 AI 读文件确认当前状态
5. **部署确认**：推送后确认 Vercel 部署成功

### AI 改动后的标准流程

```
AI 修改代码
    │
    ▼
npm run build (验证编译)
    │
    ▼
浏览器验证 (验证功能)
    │
    ▼
git add + commit + push
    │
    ▼
npx vercel --prod --yes
    │
    ▼
线上验证
```
