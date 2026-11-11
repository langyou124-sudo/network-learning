import { describe, it, expect } from 'vitest';
import { pickSuggestionQuestions, rankWeakTopics, detectSubject, type SuggestionQuiz } from '@/lib/suggestions';

const quizzes: SuggestionQuiz[] = [
  { question: '网络-基础-1', subject: 'network', topicId: 'net-base' },
  { question: '网络-基础-2', subject: 'network', topicId: 'net-base' },
  { question: '网络-路由-1', subject: 'network', topicId: 'net-route' },
  { question: '马克思-1', subject: 'marxism', topicId: 'marx-1' },
  { question: '软考-1', subject: 'ruankao', topicId: 'rk-1' },
];

const noData = { quizScores: {}, completedTopics: [] };
const fixed = () => 0; // 固定随机数，让结果可断言

describe('rankWeakTopics', () => {
  it('错题多的课题排在前面', () => {
    const ranked = rankWeakTopics({
      mistakes: [
        { topicId: 'net-route' } as never,
        { topicId: 'net-route' } as never,
        { topicId: 'marx-1' } as never,
      ],
      progress: noData,
    });
    expect(ranked[0]).toBe('net-route');
  });

  it('正确率低的课题即使没有错题也会进入排序', () => {
    const ranked = rankWeakTopics({
      mistakes: [],
      progress: { quizScores: { 'net-base': { correct: 1, total: 5, date: '2026-01-01' } }, completedTopics: [] },
    });
    expect(ranked).toContain('net-base');
  });

  it('正确率高的课题不被推荐', () => {
    const ranked = rankWeakTopics({
      mistakes: [],
      progress: { quizScores: { 'net-base': { correct: 5, total: 5, date: '2026-01-01' } }, completedTopics: [] },
    });
    expect(ranked).toEqual([]);
  });
});

describe('pickSuggestionQuestions', () => {
  it('优先推薄弱课题，且不超过一半名额', () => {
    const picked = pickSuggestionQuestions(
      {
        quizzes,
        mistakes: [{ topicId: 'net-route' } as never],
        progress: noData,
        subject: null,
        count: 4,
      },
      fixed,
    );
    // 名额 4 → 薄弱课题最多占 2 个，但只有一个薄弱课题，所以只推 1 个
    expect(picked[0]).toBe('网络-路由-1');
    expect(picked).toHaveLength(4);
  });

  it('当前学科优先于全库兜底', () => {
    const picked = pickSuggestionQuestions(
      { quizzes, mistakes: [], progress: noData, subject: 'marxism', count: 1 },
      fixed,
    );
    expect(picked).toEqual(['马克思-1']);
  });

  it('去重且不超过请求数量', () => {
    const picked = pickSuggestionQuestions(
      { quizzes, mistakes: [], progress: noData, subject: null, count: 3 },
      fixed,
    );
    expect(picked).toHaveLength(3);
    expect(new Set(picked).size).toBe(3);
  });

  it('题目总数少于请求数量时返回全部', () => {
    const picked = pickSuggestionQuestions(
      { quizzes, mistakes: [], progress: noData, subject: null, count: 100 },
      fixed,
    );
    expect(picked).toHaveLength(quizzes.length);
  });

  it('没有题库时返回空数组', () => {
    expect(
      pickSuggestionQuestions({ quizzes: [], mistakes: [], progress: noData, subject: null, count: 3 }),
    ).toEqual([]);
  });
});

describe('detectSubject', () => {
  it('识别各学科路径，且不会把 303 误判成网络', () => {
    expect(detectSubject('/learn/network/topic-01')).toBe('network');
    expect(detectSubject('/learn/pe-exam-303/calculus/topic/ca-1')).toBe('pe-exam-303');
    expect(detectSubject('/learn/pe-exam-802')).toBe('pe-exam-802');
    expect(detectSubject('/progress')).toBeNull();
  });
});
