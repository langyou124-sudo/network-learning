import { Module } from '@/types';
import { networkModules } from './network';
import { ruankaoModules } from './ruankao';
import { marxismModules } from './marxism';

export { networkModules } from './network';
export { ruankaoModules } from './ruankao';
export { marxismModules } from './marxism';

export const modules: Module[] = [...networkModules, ...ruankaoModules, ...marxismModules];

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
