/**
 * 判分自检回归测试
 *
 * 把全库每道客观题的"标准答案"回喂给判分器，必须判对。
 * 任何判分器不认识的数据形态都会在这里暴露——
 * 这是防止"正确答案被判错"的最后防线。
 */
import { describe, it, expect } from 'vitest';
import type { Quiz } from '@/types';
import {
  gradeAnswer,
  getGradingMode,
  parseAnswerSpec,
  blankCount,
} from '@/lib/quiz-grading';

import { networkModules } from '@/data/network';
import { networkEngineerModules } from '@/data/ruankao/network-engineer';
import { softwareDesignerModules } from '@/data/ruankao/software-designer';
import { marxismModules } from '@/data/marxism';
import { peExam303Modules } from '@/data/pe-exam-303';
import { peExam802Modules } from '@/data/pe-exam-802';

interface Group {
  name: string;
  modules: { topics?: { id: string; title: string; quizzes: Quiz[] }[] }[];
}

const groups: Group[] = [
  { name: '网络工程', modules: networkModules as any },
  { name: '软考网络工程师', modules: networkEngineerModules as any },
  { name: '软考软件设计师', modules: softwareDesignerModules as any },
  { name: '马克思主义', modules: marxismModules as any },
  { name: '303数学三', modules: peExam303Modules as any },
  { name: '802经济学', modules: peExam802Modules as any },
];

/** 为一道题构造"完美作答"，用于自检 */
function perfectAnswer(quiz: Quiz): string | string[] {
  const mode = getGradingMode(quiz);
  if (mode === 'choice') return String(quiz.answer);
  if (mode === 'per-blank') {
    return parseAnswerSpec(quiz).map((s) => s.variants[0] ?? '');
  }
  return Array.isArray(quiz.answer) ? quiz.answer[0] : String(quiz.answer);
}

describe('判分自检 — 全库客观题标准答案必须判对', () => {
  for (const group of groups) {
    it(`${group.name}`, () => {
      const failures: string[] = [];
      let total = 0;
      let auto = 0;

      for (const mod of group.modules) {
        for (const topic of mod.topics || []) {
          for (const quiz of topic.quizzes || []) {
            total++;
            const mode = getGradingMode(quiz);
            if (mode === 'self-assess') continue;
            auto++;

            const ua = perfectAnswer(quiz);
            const r = gradeAnswer(quiz, ua);
            if (!r.correct) {
              failures.push(
                `[${topic.id} / ${quiz.id}] mode=${mode} answer=${JSON.stringify(
                  quiz.answer
                ).slice(0, 70)} question=${quiz.question.slice(0, 40)}`
              );
            }
          }
        }
      }

      expect(
        failures,
        `有 ${failures.length} 道题标准答案被判错（共 ${auto} 道客观题 / ${total} 道题）:\n${failures
          .slice(0, 20)
          .join('\n')}`
      ).toEqual([]);
    });
  }
});

describe('判分自检 — 多空题的空格数与答案结构一致', () => {
  it('所有 per-blank 题的空格数等于答案空数', () => {
    const mismatches: string[] = [];
    for (const group of groups) {
      for (const mod of group.modules) {
        for (const topic of mod.topics || []) {
          for (const quiz of topic.quizzes || []) {
            if (quiz.type !== 'fill') continue;
            const mode = getGradingMode(quiz);
            if (mode !== 'per-blank') continue;
            const n = blankCount(quiz);
            const specs = parseAnswerSpec(quiz);
            if (n !== specs.length) {
              mismatches.push(
                `[${topic.id} / ${quiz.id}] blanks=${n} specs=${specs.length} q=${quiz.question.slice(
                  0,
                  50
                )}`
              );
            }
          }
        }
      }
    }
    expect(mismatches, mismatches.join('\n')).toEqual([]);
  });
});

describe('判分自检 — 没有空答案的题', () => {
  it('每道客观题都有可判定的正确答案', () => {
    const empty: string[] = [];
    for (const group of groups) {
      for (const mod of group.modules) {
        for (const topic of mod.topics || []) {
          for (const quiz of topic.quizzes || []) {
            const mode = getGradingMode(quiz);
            if (mode === 'self-assess') continue;
            const specs = parseAnswerSpec(quiz);
            if (specs.length === 0 || specs.some((s) => s.variants.length === 0)) {
              empty.push(`[${topic.id} / ${quiz.id}] ${quiz.question.slice(0, 40)}`);
            }
          }
        }
      }
    }
    expect(empty, empty.join('\n')).toEqual([]);
  });
});
