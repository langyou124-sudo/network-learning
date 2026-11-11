import { describe, it, expect } from 'vitest';
import { mergeProgress, mergeMistakes } from '@/lib/sync-merge';
import type { Progress, MistakeRecord } from '@/types';

function progress(partial: Partial<Progress> = {}): Progress {
  return {
    completedTopics: [],
    quizScores: {},
    weakPoints: [],
    notes: {},
    lastStudyDate: '2026-01-01',
    totalStudyHours: 0,
    studyTimeRecords: {},
    ...partial,
  };
}

function mistake(partial: Partial<MistakeRecord> = {}): MistakeRecord {
  return {
    quizId: 'quiz-1',
    topicId: 'topic-1',
    question: '题目',
    userAnswer: 'A',
    correctAnswer: 'B',
    date: '2026-01-01',
    reviewed: false,
    ...partial,
  };
}

describe('mergeProgress', () => {
  it('已完成课题取并集且不重复', () => {
    const merged = mergeProgress(
      progress({ completedTopics: ['topic-1', 'topic-2'] }),
      progress({ completedTopics: ['topic-2', 'topic-3'] }),
    );
    expect(merged.completedTopics).toEqual(['topic-1', 'topic-2', 'topic-3']);
  });

  it('同一课题的成绩取较晚的一次', () => {
    const merged = mergeProgress(
      progress({ quizScores: { 'topic-1': { correct: 5, total: 5, date: '2026-01-01' } } }),
      progress({ quizScores: { 'topic-1': { correct: 2, total: 5, date: '2026-03-01' } } }),
    );
    expect(merged.quizScores['topic-1']).toEqual({ correct: 2, total: 5, date: '2026-03-01' });
  });

  it('同一天的成绩取对得更多的一次', () => {
    const merged = mergeProgress(
      progress({ quizScores: { 'topic-1': { correct: 3, total: 5, date: '2026-01-01' } } }),
      progress({ quizScores: { 'topic-1': { correct: 5, total: 5, date: '2026-01-01' } } }),
    );
    expect(merged.quizScores['topic-1'].correct).toBe(5);
  });

  it('笔记：一边为空用另一边，两边都有保留本地', () => {
    const merged = mergeProgress(
      progress({ notes: { 'topic-1': '本机写的', 'topic-2': '' } }),
      progress({ notes: { 'topic-1': '云端写的', 'topic-2': '云端补的' } }),
    );
    expect(merged.notes['topic-1']).toBe('本机写的');
    expect(merged.notes['topic-2']).toBe('云端补的');
  });

  it('学习时长按天取较大值而不是相加', () => {
    const merged = mergeProgress(
      progress({
        studyTimeRecords: {
          '2026-01-01': { total: 600, byTopic: { 'topic-1': 600 } },
        },
      }),
      progress({
        studyTimeRecords: {
          '2026-01-01': { total: 900, byTopic: { 'topic-1': 300, 'topic-2': 600 } },
        },
      }),
    );
    expect(merged.studyTimeRecords['2026-01-01'].total).toBe(900);
    expect(merged.studyTimeRecords['2026-01-01'].byTopic).toEqual({ 'topic-1': 600, 'topic-2': 600 });
  });

  it('总时长与最后学习日期取较大者', () => {
    const merged = mergeProgress(
      progress({ totalStudyHours: 3, lastStudyDate: '2026-02-01' }),
      progress({ totalStudyHours: 5, lastStudyDate: '2026-01-15' }),
    );
    expect(merged.totalStudyHours).toBe(5);
    expect(merged.lastStudyDate).toBe('2026-02-01');
  });

  it('自身合并保持稳定（幂等，反复同步不会漂移）', () => {
    const one = progress({
      completedTopics: ['topic-1'],
      quizScores: { 'topic-1': { correct: 4, total: 5, date: '2026-01-01' } },
      notes: { 'topic-1': '笔记' },
      studyTimeRecords: { '2026-01-01': { total: 300, byTopic: { 'topic-1': 300 } } },
    });
    expect(mergeProgress(one, one)).toEqual(one);
    expect(mergeProgress(mergeProgress(one, one), one)).toEqual(one);
  });
});

describe('mergeMistakes', () => {
  it('按 quizId 去重，同一题保留一条', () => {
    const merged = mergeMistakes([mistake({ quizId: 'q1' })], [mistake({ quizId: 'q1' }), mistake({ quizId: 'q2' })]);
    expect(merged.map(m => m.quizId).sort()).toEqual(['q1', 'q2']);
  });

  it('任一端复习过就算复习过', () => {
    const merged = mergeMistakes(
      [mistake({ quizId: 'q1', reviewed: false })],
      [mistake({ quizId: 'q1', reviewed: true })],
    );
    expect(merged[0].reviewed).toBe(true);
  });

  it('保留较晚的日期', () => {
    const merged = mergeMistakes(
      [mistake({ quizId: 'q1', date: '2026-01-01' })],
      [mistake({ quizId: 'q1', date: '2026-05-01' })],
    );
    expect(merged[0].date).toBe('2026-05-01');
  });
});
