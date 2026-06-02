# 通信知识学习平台 - 项目规划

## 核心功能

### 1. 知识库浏览
- 按模块/课题组织内容
- 支持搜索
- 支持收藏

### 2. 学习系统
- 学习进度追踪
- 学习时长统计
- 学习日历（哪天学了什么）

### 3. 练习题系统
- 选择题、填空题、简答题
- 自动评分
- 错题本
- 薄弱知识点分析

### 4. 笔记系统
- 每个课题可添加笔记
- 支持 Markdown 格式

### 5. 数据持久化
- 使用 localStorage 存储进度
- 支持导入/导出数据

## 页面结构

```
/                    - 首页（学习概览、进度统计）
/learn               - 知识库目录
/learn/[moduleId]    - 模块详情
/learn/[moduleId]/[topicId]  - 课题学习页
/quiz                - 练习题库
/quiz/[quizId]       - 做题页面
/mistakes            - 错题本
/progress            - 学习进度详情
/settings            - 设置（导入导出）
```

## 技术栈

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui 组件库
- localStorage 数据持久化
- react-markdown 渲染内容

## 内容结构

### 模块
1. 网络基础
2. 物理层与数据链路层
3. 网络层
4. 传输层
5. 应用层
6. 路由与交换
7. 网络安全
8. 无线网络
9. 通信工程基础
10. 网络管理与运维

### 每个课题包含
- 知识点讲解（Markdown）
- 练习题（JSON）
- 参考资料链接
