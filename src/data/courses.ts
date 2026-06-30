import { Module } from '@/types';
import { networkModules } from './network';
import { ruankaoModules } from './ruankao';
import { marxismModules } from './marxism';
import { peExam802Modules } from './pe-exam-802';
import { peExam303Modules } from './pe-exam-303';

export { networkModules } from './network';
export { ruankaoModules } from './ruankao';
export { marxismModules } from './marxism';
export { peExam802Modules } from './pe-exam-802';
export { peExam303Modules } from './pe-exam-303';

export const modules: Module[] = [...networkModules, ...ruankaoModules, ...marxismModules, ...peExam802Modules, ...peExam303Modules];

export function getAllTopics() {
  return modules.flatMap(m => m.topics);
}

export function getModuleById(id: string) {
  return modules.find(m => m.id === id);
}

export function getTopicById(id: string) {
  for (const mod of modules) {
    const topic = mod.topics.find(t => t.id === id);
    if (topic) return topic;
  }
  return undefined;
}
