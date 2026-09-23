import { Module, Quiz } from '@/types';
import { softwareDesignerModulesMeta } from './modules';
import { topics as m01 } from './topics/module-01';
import { topics as m02 } from './topics/module-02';
import { topics as m03 } from './topics/module-03';
import { topics as m04 } from './topics/module-04';
import { topics as m05 } from './topics/module-05';
import { topics as m06 } from './topics/module-06';
import { topics as m07 } from './topics/module-07';
import { topics as m08 } from './topics/module-08';
import { topics as m09 } from './topics/module-09';
import { topics as m10 } from './topics/module-10';
import { topics as m11 } from './topics/module-11';
import { topics as m12 } from './topics/module-12';

const moduleTopicsMap: Record<string, typeof m01> = {
  'sd-computer-system': m01,
  'sd-programming-language': m02,
  'sd-data-structures': m03,
  'sd-operating-system': m04,
  'sd-software-engineering': m05,
  'sd-structured-method': m06,
  'sd-oo-tech': m07,
  'sd-algorithms': m08,
  'sd-database': m09,
  'sd-network-security': m10,
  'sd-ip-standards': m11,
  'sd-case-study': m12,
};

export const softwareDesignerModules: Module[] = softwareDesignerModulesMeta.map((mod) => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  icon: mod.icon,
  topics: (moduleTopicsMap[mod.id] || []).map((t) => ({
    ...t,
    quizzes: t.quizzes as Quiz[],
  })),
}));

export function getSoftwareDesignerTopicById(topicId: string) {
  for (const mod of softwareDesignerModules) {
    const topic = mod.topics.find((t) => t.id === topicId);
    if (topic) return topic;
  }
  return undefined;
}
