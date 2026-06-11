# 达博理 — 系统架构文档

## 项目概述

达博理是一个多学科知识学习平台，面向网络工程师、软考备考者及中小学 AI 教育。平台集成 AI 智能问答、语义搜索、交互式图表和练习系统，提供个性化的学习体验。

## 技术栈

| 层级 | 技术 | 版本 | 用途 |
|------|------|------|------|
| 框架 | Next.js (App Router) | 16.2.7 | SSR/SSG、路由、API Routes |
| 语言 | TypeScript | 5.x | 类型安全 |
| UI | React | 19.2.4 | 前端渲染 |
| 样式 | Tailwind CSS | 4.x | 原子化 CSS |
| 认证 | Supabase Auth | @supabase/ssr 0.10.3 | 邮箱登录、Magic Link、OAuth |
| 数据库 | Supabase (PostgreSQL) | — | 用户数据、向量搜索 |
| AI | MiMo API | — | 智能问答、知识解释 |
| 向量搜索 | Supabase pgvector | — | 知识点语义检索 |
| 限流 | Upstash Redis | @upstash/ratelimit 2.x | API 速率限制 |
| 部署 | Vercel | — | 生产环境 |
| 测试 | Vitest | 4.x | 单元测试 |

## 系统架构图

```
┌─────────────────────────────────────────────────────────┐
│                      用户浏览器                          │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐  │
│  │ 学习页面  │ │ 练习系统  │ │ AI 助手  │ │ 进度追踪  │  │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └─────┬─────┘  │
└───────┼────────────┼────────────┼──────────────┼────────┘
        │            │            │              │
        ▼            ▼            ▼              ▼
┌─────────────────────────────────────────────────────────┐
│                   Next.js App Router                     │
│  ┌─────────────────────────────────────────────────┐   │
│  │  前端页面 (React SSR/SSG)                        │   │
│  │  /learn  /quiz  /mistakes  /progress  /explore  │   │
│  └─────────────────────┬───────────────────────────┘   │
│                        │                                │
│  ┌─────────────────────┼───────────────────────────┐   │
│  │  API Routes (/api/*) │                           │   │
│  │  /api/v1/chat  /api/v1/search  /api/auth/*     │   │
│  └──────┬──────────────┬───────────────┬───────────┘   │
└─────────┼──────────────┼───────────────┼───────────────┘
          │              │               │
          ▼              ▼               ▼
   ┌────────────┐ ┌────────────┐ ┌──────────────┐
   │ Supabase   │ │ MiMo API   │ │ Upstash      │
   │ Auth       │ │ (AI Chat)  │ │ Redis        │
   │ PostgreSQL │ │            │ │ (Rate Limit) │
   │ pgvector   │ │            │ │              │
   └────────────┘ └────────────┘ └──────────────┘
```

## 目录结构

```
src/
├── app/                          # Next.js App Router 页面
│   ├── layout.tsx                # 根布局（字体、主题、ChatWidget）
│   ├── page.tsx                  # 首页（学习仪表盘）
│   ├── explore/page.tsx          # 知识探索页（学科卡片 + 语义搜索）
│   ├── learn/
│   │   ├── page.tsx              # 学科选择页
│   │   ├── network/              # 网络工程
│   │   │   ├── page.tsx          # 模块列表
│   │   │   └── [moduleId]/
│   │   │       ├── page.tsx      # 课题列表
│   │   │       └── [topicId]/
│   │   │           └── page.tsx  # 课题详情（知识/练习/笔记）
│   │   └── ruankao/              # 软考备考
│   │       ├── page.tsx          # 科目分组列表
│   │       └── [moduleId]/
│   │           ├── page.tsx      # 模块详情
│   │           └── [topicId]/
│   │               └── page.tsx  # 课题详情
│   ├── quiz/page.tsx             # 练习题库
│   ├── mistakes/page.tsx         # 错题本
│   ├── progress/page.tsx         # 学习进度
│   ├── diagrams/page.tsx         # 交互式图表
│   ├── settings/page.tsx         # 设置（数据导入导出）
│   ├── login/page.tsx            # 登录
│   ├── signup/page.tsx           # 注册
│   ├── forgot-password/page.tsx  # 忘记密码
│   ├── reset-password/page.tsx   # 重置密码
│   ├── privacy/page.tsx          # 隐私政策
│   ├── terms/page.tsx            # 用户协议
│   ├── api/
│   │   ├── v1/chat/route.ts      # AI 问答 API
│   │   ├── v1/search/route.ts    # 语义搜索 API
│   │   ├── auth/callback/route.ts # OAuth 回调
│   │   └── auth/confirm/route.ts  # 邮箱验证确认
│   └── auth/callback/route.ts    # Supabase Auth 回调
├── components/
│   ├── Sidebar.tsx               # 侧边导航栏
│   ├── ChatWidget.tsx            # AI 助手浮窗
│   ├── GlossaryTooltip.tsx       # 术语高亮 + 气泡解释
│   ├── ErrorBoundary.tsx         # React 错误边界
│   └── diagrams/                 # 交互式图表组件
│       ├── index.ts              # 统一导出
│       ├── OsiLayers.tsx         # OSI 七层模型
│       ├── TcpIpLayers.tsx       # TCP/IP 四层模型
│       ├── NetworkTopology.tsx   # 网络拓扑
│       ├── Encapsulation.tsx     # 数据封装过程
│       ├── RoutingTable.tsx      # 路由表
│       ├── VlanDiagram.tsx       # VLAN 划分
│       ├── STPTopology.tsx       # STP 生成树
│       ├── RoutingProcess.tsx    # 路由过程
│       ├── EncryptionFlow.tsx    # 加密流程
│       ├── FirewallTypes.tsx     # 防火墙类型
│       ├── VPNTunnel.tsx         # VPN 隧道
│       ├── WirelessStandards.tsx # 无线标准
│       ├── CellularNetwork.tsx   # 蜂窝网络
│       ├── FiberOptic.tsx        # 光纤通信
│       ├── SDNArchitecture.tsx   # SDN 架构
│       ├── SNMPDiagram.tsx       # SNMP 管理
│       └── FaultDiagnosis.tsx    # 故障诊断
├── data/
│   ├── courses.ts                # 课程聚合入口（导出所有学科 modules）
│   ├── subjects.ts               # 学科注册表
│   ├── network/
│   │   ├── index.ts              # 网络工程数据聚合
│   │   ├── modules.ts            # 模块元数据（15 个模块）
│   │   └── topics/               # 63 个课题文件
│   │       ├── topic-01.ts ~ topic-22.ts
│   │       ├── topic-06-01.ts ~ topic-10-04.ts
│   │       ├── topic-41.ts ~ topic-62.ts
│   │       └── ...
│   └── ruankao/
│       ├── index.ts              # 软考数据聚合
│       ├── network-engineer/
│       │   ├── index.ts          # 网络工程师模块（复用网络工程课题）
│       │   └── modules.ts        # 考纲模块元数据（6 个模块）
│       └── software-designer/
│           └── index.ts          # 软件设计师（待扩充）
├── hooks/
│   └── useStudyTimer.ts          # 学习计时 Hook
├── lib/
│   ├── supabase.ts               # Supabase 客户端入口
│   ├── supabase/
│   │   ├── client.ts             # 浏览器端 Supabase 客户端
│   │   ├── server.ts             # 服务端 Supabase 客户端
│   │   └── middleware.ts         # Session 刷新（未启用）
│   ├── storage.ts                # localStorage 封装（进度/笔记/错题）
│   └── validate.ts               # 输入校验（密码格式）
└── types/
    └── index.ts                  # 全局类型定义（Module/Topic/Quiz）
```

## 数据流

### 课程数据流

```
src/data/network/topics/*.ts  →  network/index.ts  →  courses.ts
  (单课题内容)                    (模块聚合)          (全学科聚合)
       │                                              │
       ▼                                              ▼
  getModuleById() / getTopicById()    ←    页面组件调用
```

课程数据是**静态编译时数据**，不走数据库。新增课题只需：
1. 创建 `topics/topic-XX.ts`
2. 在 `modules.ts` 的 topicIds 数组中添加 ID
3. 在 `index.ts` 中 import 并加入 topicMap

### 认证数据流

```
用户 → Supabase Auth (邮箱/密码 或 Magic Link)
         │
         ▼
    session cookie (httpOnly)
         │
         ▼
    API Routes: supabase.auth.getUser() → 401 或继续
    前端组件: supabase.auth.onAuthStateChange() → UI 更新
```

### AI 问答数据流

```
用户输入问题
    │
    ▼
ChatWidget → POST /api/v1/chat
    │
    ├─ 鉴权: supabase.auth.getUser()
    ├─ 限流: Upstash Redis (10 req/min)
    ├─ 构建 prompt: 系统提示 + 课题上下文 + 用户消息
    │
    ▼
MiMo API (streaming response)
    │
    ▼
前端逐字渲染 AI 回复
```

### 搜索数据流

```
用户输入关键词
    │
    ▼
Explore 页 → GET /api/v1/search?q=...
    │
    ├─ 鉴权 + 限流
    ├─ 构建查询嵌入（可选）
    │
    ▼
Supabase pgvector 语义搜索
    │
    ▼
返回匹配的知识片段 + 相似度分数
```

## 关键设计决策

### 1. 课程数据用 TypeScript 文件而非数据库
- 优势：编译时类型检查、版本控制（Git diff）、无数据库依赖
- 适用：内容相对固定、需要 AI 生成的教育内容

### 2. 用户进度用 localStorage
- 优势：无需登录即可使用、零服务器成本
- 局限：换设备数据丢失
- 规划：未来可迁移到 Supabase 用户表

### 3. Supabase 一体化
- Auth：邮箱/密码、Magic Link、OAuth
- Database：PostgreSQL + pgvector
- RLS：行级安全策略
- 减少运维复杂度，适合小团队

### 4. AI 助手嵌入式设计
- ChatWidget 全局浮窗，不切换页面
- 上下文感知：自动携带当前课题内容
- 流式响应：逐字显示，体验流畅

## 环境变量

| 变量 | 用途 | 必需 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | 是 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | 是 |
| `MIMO_API_KEY` | MiMo AI API 密钥 | 是 |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL | 否（降级到内存限流） |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis Token | 否 |

## 部署架构

```
GitHub (langyou124-sudo/network-learning)
    │
    ▼  git push
Vercel (自动构建 + 部署)
    │
    ├─ Static: 首页、模块列表等预渲染页面
    ├─ Dynamic: 课题详情（含 URL 参数）
    └─ Serverless: API Routes (chat, search, auth)
         │
         ├─→ Supabase Cloud (Auth + DB + 向量搜索)
         ├─→ MiMo API (AI 推理)
         └─→ Upstash Redis (限流)
```

构建命令：`NODE_OPTIONS="--max-old-space-size=4096" npm run build`

## 多学科扩展架构

新增学科只需 3 步：

```
src/data/
  新学科/
    index.ts        ← 导出 Module[]
    modules.ts      ← 模块元数据
    topics/         ← 课题文件
```

1. 创建数据目录和课题文件
2. 在 `courses.ts` 中聚合导出
3. 在 `src/app/learn/` 下创建路由页面

现有学科：
- **网络工程**（15 模块、63 课题）
- **软考 — 网络工程师**（6 模块、55 课题，复用网络工程数据）
- **软考 — 软件设计师**（待扩充）
