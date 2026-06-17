import { EssayQuestion } from '../types';

export const questions: EssayQuestion[] = [
  {
    id: 'essay-02',
    moduleId: 'module-02',
    moduleTitle: '辩证唯物论',
    question: '试述物质与意识的辩证关系，并结合实际说明这一原理的方法论意义。',
    keyPoints: [
      '物质决定意识：物质是本原，意识是物质的产物和反映，物质第一性、意识第二性',
      '意识的能动反作用：意识对物质具有能动的反作用，正确的意识能够促进事物发展，错误的意识则阻碍事物发展',
      '一切从实际出发：必须尊重客观规律，从客观存在的事实出发来制定路线方针政策',
      '实事求是：在尊重客观规律的基础上充分发挥主观能动性，做到主观与客观的具体的历史的统一'
    ],
    difficulty: 'basic',
    tags: ['物质与意识', '辩证关系', '方法论', '实事求是']
  }
];
