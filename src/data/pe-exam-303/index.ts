import { Module } from '@/types';
import { modulesMeta303 } from './modules';

import { topics as calculusTopics } from './calculus/topics';
import { topics as linearAlgebraTopics } from './linear-algebra/topics';
import { topics as probabilityTopics } from './probability/topics';

const moduleTopicsMap: Record<string, typeof calculusTopics> = {
  'pe-exam-303-calculus': calculusTopics,
  'pe-exam-303-linear-algebra': linearAlgebraTopics,
  'pe-exam-303-probability': probabilityTopics,
};

export const peExam303Modules: Module[] = modulesMeta303.map(mod => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  icon: mod.icon,
  topics: moduleTopicsMap[mod.id] || [],
}));

export function getTopicById(topicId: string) {
  for (const mod of peExam303Modules) {
    const topic = mod.topics.find(t => t.id === topicId);
    if (topic) return topic;
  }
  return undefined;
}
