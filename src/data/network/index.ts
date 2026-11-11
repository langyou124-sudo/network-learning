import { Module, Quiz } from '@/types';
import { modulesMeta } from './modules';
import { topicMap } from './topics.generated';

// topicMap 由 scripts/build-content-index.mjs 从 topics/ 目录生成。
// 新增课题：放 topic-XX.ts → 运行 npm run content:index，不需要改本文件。
export const networkModules: Module[] = modulesMeta.map(mod => ({
  id: mod.id,
  title: mod.title,
  description: mod.description,
  icon: mod.icon,
  topics: mod.topicIds.map(tid => {
    const topic = topicMap[tid];
    if (!topic) throw new Error(`模块 ${mod.id} 引用了不存在的课题：${tid}`);
    return {
      id: tid,
      moduleId: mod.id,
      title: topic.title,
      description: topic.description,
      content: topic.content,
      quizzes: topic.quizzes as Quiz[],
      references: topic.references,
    };
  })
}));
