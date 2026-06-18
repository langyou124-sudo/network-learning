import { Module, Quiz } from '@/types';
import { modulesMeta } from './modules';

// Import topics from each module file
import { topics as topics01 } from './topics/module-01';
import { topics as topics02 } from './topics/module-02';
import { topics as topics03 } from './topics/module-03';
import { topics as topics04 } from './topics/module-04';
import { topics as topics05 } from './topics/module-05';
import { topics as topics06 } from './topics/module-06';
import { topics as topics07 } from './topics/module-07';
import { topics as topics08 } from './topics/module-08';
import { topics as topics09 } from './topics/module-09';
import { topics as topics10 } from './topics/module-10';
import { topics as topics11 } from './topics/module-11';
import { topics as topics12 } from './topics/module-12';
import { topics as topics13 } from './topics/module-13';
import { topics as topics14 } from './topics/module-14';

// Topic data map by module
const moduleTopicsMap: Record<string, typeof topics01> = {
  'marxism-intro': topics01,
  'marxism-dialectical-materialism': topics02,
  'marxism-dialectics': topics03,
  'marxism-epistemology': topics04,
  'marxism-historical-materialism': topics05,
  'marxism-political-economy': topics06,
  'marxism-surplus-value': topics07,
  'marxism-capitalist-superstructure': topics08,
  'marxism-imperialism': topics09,
  'marxism-from-utopia-to-science': topics10,
  'marxism-proletarian-revolution': topics11,
  'marxism-dictatorship-of-proletariat': topics12,
  'marxism-socialist-construction': topics13,
  'marxism-communism-ideals': topics14,
};

export const marxismModules: Module[] = modulesMeta.map(mod => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  icon: mod.icon,
  topics: moduleTopicsMap[mod.id] || [],
}));

// Helper functions for essay question pages
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
