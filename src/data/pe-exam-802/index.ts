import { Module, Quiz } from '@/types';
import { modulesMeta802 } from './modules';

// Import topics from each module file
import { topics as politicalEconomyTopics } from './political-economy/topics';
import { topics as microeconomicsTopics } from './microeconomics/topics';
import { topics as macroeconomicsTopics } from './macroeconomics/topics';

// Topic data map by module
const moduleTopicsMap: Record<string, typeof politicalEconomyTopics> = {
  'pe-exam-802-political-economy': politicalEconomyTopics,
  'pe-exam-802-microeconomics': microeconomicsTopics,
  'pe-exam-802-macroeconomics': macroeconomicsTopics,
};

export const peExam802Modules: Module[] = modulesMeta802.map(mod => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  icon: mod.icon,
  topics: moduleTopicsMap[mod.id] || [],
}));

// Helper functions
export function getQuestionsByModule(moduleId: string) {
  const mod = peExam802Modules.find(m => m.id === moduleId);
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

export function getTopicById(topicId: string) {
  for (const mod of peExam802Modules) {
    const topic = mod.topics.find(t => t.id === topicId);
    if (topic) return topic;
  }
  return undefined;
}

export function getQuestionById(id: string) {
  for (const mod of peExam802Modules) {
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
