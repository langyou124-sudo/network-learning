import { EssayQuestion } from '../types';

export const questions: EssayQuestion[] = [
  {
    id: 'essay-01',
    moduleId: 'module-01',
    moduleTitle: '绪论',
    question: '为什么说马克思主义没有过时？请结合当代社会现实，论述马克思主义的当代价值。',
    keyPoints: [
      '方法论价值：辩证唯物主义和历史唯物主义提供了认识世界和改造世界的科学方法，具有跨越时代的指导意义',
      '对资本主义的批判力：马克思对资本逻辑、经济危机、贫富分化的分析在当代全球化背景下依然具有深刻解释力',
      '中国化马克思主义的实践成果：马克思主义基本原理与中国具体实际相结合，指导中国取得了革命、建设和改革的伟大成就，证明了马克思主义的生命力'
    ],
    difficulty: 'intermediate',
    tags: ['马克思主义当代价值', '方法论', '资本主义批判', '中国化马克思主义']
  }
];
