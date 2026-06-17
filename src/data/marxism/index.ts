// 马克思主义课程数据入口
import { EssayQuestion } from './types';

// 从各模块导入题目
import { questions as q1 } from './topics/module-01';
import { questions as q2 } from './topics/module-02';
import { questions as q3 } from './topics/module-03';
import { questions as q4 } from './topics/module-04';
import { questions as q5 } from './topics/module-05';

// 合并所有题目
export const allEssayQuestions: EssayQuestion[] = [
  ...q1,
  ...q2,
  ...q3,
  ...q4,
  ...q5,
];

// 按模块分组
export function getQuestionsByModule(moduleId: string): EssayQuestion[] {
  return allEssayQuestions.filter(q => q.moduleId === moduleId);
}

// 获取单个题目
export function getQuestionById(id: string): EssayQuestion | undefined {
  return allEssayQuestions.find(q => q.id === id);
}

// 获取模块列表
export const marxismModules = [
  { id: 'module-01', title: '绪论 — 为什么今天还要读马克思？', icon: '📖' },
  { id: 'module-02', title: '辩证唯物论 — 世界的物质性', icon: '🌍' },
  { id: 'module-03', title: '唯物辩证法 — 世界怎么发展', icon: '🔄' },
  { id: 'module-04', title: '认识论 — 人如何认识世界', icon: '🧠' },
  { id: 'module-05', title: '历史唯物主义 — 社会怎么发展', icon: '🏛️' },
];
