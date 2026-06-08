# 达博理运维手册

## 数据加密策略

### localStorage（客户端）
- 存储内容：学习进度、练习成绩、错题记录、笔记
- 敏感级别：**低** — 不含 PII、密码、支付信息
- 加密状态：**明文**（浏览器 localStorage 限制）
- 风险评估：笔记字段可能含用户自定义内容，但无安全合规要求
- 结论：当前无需加密，未来如需云同步则迁移到 Supabase

### Supabase（服务端）
- 存储内容：知识库向量嵌入、用户认证信息
- 加密状态：Supabase 默认启用 **AES-256 静态加密** + TLS 传输加密
- RLS：已配置行级安全策略

## 灾备恢复

### 数据库备份
- Supabase 免费版：**7 天自动备份**（每日）
- 恢复方式：Supabase Dashboard → Database → Backups → Restore
- 手动备份：`pg_dump` 或 Supabase Dashboard 导出

### 用户数据
- 学习进度存储在客户端 localStorage
- 支持导出/导入 JSON 备份（设置页）
- 用户可随时导出自己的数据

### 知识库数据
- 源数据在 `src/data/courses.ts`
- 向量嵌入通过 `scripts/embed-knowledge.mjs` 生成
- 可随时从源数据重新生成嵌入

## 部署回滚

### Vercel
1. 打开 https://vercel.com/dashboard → 选项目
2. **Deployments** 标签页
3. 找到要回滚的部署 → 点 **⋯** → **Promote to Production**
4. 即时生效，无需重新构建

### GitHub
- 所有代码变更都有 Git 记录
- `git revert <commit-hash>` 可撤销任意提交
- `git log --oneline` 查看历史

## API 版本管理

- 当前版本：**v1**
- 路径格式：`/api/v1/{resource}`
- 旧路径 `/api/chat`、`/api/search` 保留 re-export 向后兼容
- 新版本规则：破坏性变更时创建 v2，旧版本保留兼容期

## 环境变量

| 变量 | 用途 | 必需 |
|------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | 是 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | 是 |
| `MIMO_API_KEY` | MiMo AI API 密钥 | 是 |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis URL | 否（降级到内存限流） |
| `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis Token | 否 |
