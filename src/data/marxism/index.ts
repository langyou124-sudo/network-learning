import { Module, Quiz } from '@/types';
import { modulesMeta } from './modules';
import { topic_01_01 } from './topics/module-01';

// Placeholder topics for modules 02-05 (to be filled with actual content later)
const topicDataMap: Record<string, { title: string; description: string; content: string; quizzes: { id: string; type: string; question: string; options?: string[]; answer: string | string[]; explanation: string }[]; references: string[] }> = {
  'marx-01-01': topic_01_01,
};

// Generate placeholder entries for topics without content yet
function getTopicData(topicId: string) {
  if (topicDataMap[topicId]) {
    return topicDataMap[topicId];
  }
  // Placeholder for future topics
  return {
    title: topicId,
    description: '待添加内容',
    content: '# 待添加内容\n\n此章节内容正在编写中，敬请期待。',
    quizzes: [] as { id: string; type: string; question: string; options?: string[]; answer: string | string[]; explanation: string }[],
    references: [] as string[]
  };
}

export const marxismModules: Module[] = modulesMeta.map(mod => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  icon: mod.icon,
  topics: mod.topicIds.map(tid => ({
    id: tid,
    moduleId: mod.id,
    title: getTopicData(tid).title,
    description: getTopicData(tid).description,
    content: getTopicData(tid).content,
    quizzes: getTopicData(tid).quizzes as Quiz[],
    references: getTopicData(tid).references
  }))
}));

// Helper functions for essay question pages (backward compatibility)

export function getQuestionsByModule(moduleId: string) {
  const mod = marxismModules.find(m => m.id === moduleId);
  if (!mod) return [];
  return mod.topics.flatMap(t =>
    t.quizzes
      .filter(q => q.type === 'short-answer')
      .map(q => ({
        id: q.id,
        moduleId: t.moduleId,
        moduleTitle: mod.title,
        question: q.question,
        keyPoints: Array.isArray(q.answer) ? q.answer : [q.answer],
        difficulty: 'intermediate' as const,
        tags: [],
      }))
  );
}

export function getQuestionById(id: string) {
  for (const mod of marxismModules) {
    for (const topic of mod.topics) {
      const quiz = topic.quizzes.find(q => q.id === id && q.type === 'short-answer');
      if (quiz) {
        return {
          id: quiz.id,
          moduleId: topic.moduleId,
          moduleTitle: mod.title,
          question: quiz.question,
          keyPoints: Array.isArray(quiz.answer) ? quiz.answer : [quiz.answer],
          difficulty: 'intermediate' as const,
          tags: [],
        };
      }
    }
  }
  return undefined;
}
