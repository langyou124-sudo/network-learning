/**
 * 跨课程数据隔离回归测试
 *
 * 进度、笔记、错题、学习时长都以 topicId / quizId 为键存 localStorage。
 * 如果两个课程的 id 撞号，学习数据会互相串号：
 * 在 A 课程标记完成，B 课程也显示已完成；错题本里的题目可能来自另一个课程。
 *
 * 此测试保证全站所有课程的 topicId、quizId 互不重叠。
 */
import { describe, it, expect } from 'vitest';
import type { Quiz, Module } from '@/types';

import { networkModules } from '@/data/network';
import { networkEngineerModules } from '@/data/ruankao/network-engineer';
import { softwareDesignerModules } from '@/data/ruankao/software-designer';
import { marxismModules } from '@/data/marxism';
import { peExam303Modules } from '@/data/pe-exam-303';
import { peExam802Modules } from '@/data/pe-exam-802';

interface Group {
  name: string;
  modules: Module[];
}

const groups: Group[] = [
  { name: '网络工程', modules: networkModules as Module[] },
  { name: '软考网络工程师', modules: networkEngineerModules as Module[] },
  { name: '软考软件设计师', modules: softwareDesignerModules as Module[] },
  { name: '马克思主义', modules: marxismModules as Module[] },
  { name: '303数学三', modules: peExam303Modules as Module[] },
  { name: '802经济学', modules: peExam802Modules as Module[] },
];

function collectIds() {
  const topicOwners = new Map<string, string>();
  const quizOwners = new Map<string, string>();
  const dupTopics: string[] = [];
  const dupQuizzes: string[] = [];

  for (const g of groups) {
    for (const mod of g.modules) {
      for (const topic of mod.topics as {
        id: string;
        quizzes?: Quiz[];
      }[]) {
        const prevTopic = topicOwners.get(topic.id);
        if (prevTopic) {
          dupTopics.push(`topicId "${topic.id}" 同时出现在「${prevTopic}」与「${g.name}」`);
        } else {
          topicOwners.set(topic.id, g.name);
        }

        for (const quiz of topic.quizzes || []) {
          const prevQuiz = quizOwners.get(quiz.id);
          if (prevQuiz) {
            dupQuizzes.push(`quizId "${quiz.id}" 同时出现在「${prevQuiz}」与「${g.name}」`);
          } else {
            quizOwners.set(quiz.id, g.name);
          }
        }
      }
    }
  }

  return { topicOwners, quizOwners, dupTopics, dupQuizzes };
}

describe('跨课程数据隔离', () => {
  it('全站 topicId 互不重叠', () => {
    const { dupTopics } = collectIds();
    expect(
      dupTopics,
      `topicId 撞号会导致进度/笔记/时长串号:\n${dupTopics.join('\n')}`
    ).toEqual([]);
  });

  it('全站 quizId 互不重叠', () => {
    const { dupQuizzes } = collectIds();
    expect(
      dupQuizzes,
      `quizId 撞号会导致错题本串号:\n${dupQuizzes.join('\n')}`
    ).toEqual([]);
  });

  it('软考网络工程师课题带 ne- 前缀（与网络工程隔离）', () => {
    const ruankaoTopics = (networkEngineerModules as Module[]).flatMap(
      (m) => m.topics as { id: string }[]
    );
    expect(ruankaoTopics.length).toBeGreaterThan(50);
    const notPrefixed = ruankaoTopics.filter((t) => !t.id.startsWith('ne-'));
    expect(
      notPrefixed.map((t) => t.id),
      '软考网络工程师的课题 id 必须带 ne- 前缀，否则与网络工程共享学习数据'
    ).toEqual([]);
  });

  it('每个课程的课题 id 都非空且唯一（课程内也不能重复）', () => {
    for (const g of groups) {
      const ids = (g.modules as Module[]).flatMap(
        (m) => (m.topics as { id: string }[]).map((t) => t.id)
      );
      expect(ids.every(Boolean), `${g.name} 存在空 topicId`).toBe(true);
      expect(new Set(ids).size, `${g.name} 内部 topicId 有重复`).toBe(ids.length);
    }
  });
});
