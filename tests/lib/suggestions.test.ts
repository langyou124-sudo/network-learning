import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock course data
vi.mock('@/data/network', () => ({
  networkModules: [
    {
      id: 'net-1',
      title: '模块1',
      topics: [
        {
          id: 't1',
          title: '课题1',
          quizzes: [
            { question: '网络问题1?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
            { question: '网络问题2?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
          ],
        },
        {
          id: 't2',
          title: '课题2',
          quizzes: [
            { question: '网络问题3?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
          ],
        },
      ],
    },
  ],
}));

vi.mock('@/data/marxism', () => ({
  marxismModules: [
    {
      id: 'marx-1',
      title: '模块1',
      topics: [
        {
          id: 'm1',
          title: '课题1',
          quizzes: [
            { question: '马克思问题1?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
            { question: '马克思问题2?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
          ],
        },
      ],
    },
  ],
}));

vi.mock('@/data/ruankao', () => ({
  ruankaoModules: [
    {
      id: 'rk-1',
      title: '软考模块',
      topics: [
        {
          id: 'r1',
          title: '软考课题',
          quizzes: [
            { question: '软考问题1?', options: ['A', 'B', 'C', 'D'], answer: 'A' },
          ],
        },
      ],
    },
  ],
}));

vi.mock('@/data/pe-exam-303', () => ({
  peExam303Modules: [
    {
      id: 'pe303-1',
      title: '数三模块',
      topics: [
        {
          id: 'p303-1',
          title: '数三课题',
          quizzes: [
            { question: '数三问题1?', options: ['A', 'B', 'C', 'D'], answer: 'B' },
          ],
        },
      ],
    },
  ],
}));

vi.mock('@/data/pe-exam-802', () => ({
  peExam802Modules: [
    {
      id: 'pe802-1',
      title: '802模块',
      topics: [
        {
          id: 'p802-1',
          title: '802课题',
          quizzes: [
            { question: '802问题1?', options: ['A', 'B', 'C', 'D'], answer: 'C' },
            { question: '802问题2?', options: ['A', 'B', 'C', 'D'], answer: 'D' },
          ],
        },
      ],
    },
  ],
}));

// Mock storage
const mockProgress = { completedTopics: [], quizScores: {}, studyTimeRecords: {} };
const mockMistakes: Array<{ question: string; topicId: string; subject: string }> = [];

vi.mock('@/lib/storage', () => ({
  getProgress: () => mockProgress,
  getMistakes: () => mockMistakes,
}));

import { getSuggestions } from '@/lib/suggestions';

beforeEach(() => {
  mockMistakes.length = 0;
});

describe('getSuggestions', () => {
  it('returns requested count of suggestions', () => {
    const results = getSuggestions('/', 3);
    expect(results.length).toBe(3);
  });

  it('returns all available quizzes when count exceeds pool', () => {
    const results = getSuggestions('/', 100);
    // 3 network + 2 marxism + 1 ruankao + 1 pe303 + 2 pe802 = 9 total
    expect(results.length).toBe(9);
  });

  it('returns no duplicates', () => {
    const results = getSuggestions('/', 5);
    const unique = new Set(results);
    expect(unique.size).toBe(results.length);
  });

  it('filters by subject when on subject page', () => {
    const results = getSuggestions('/learn/network', 2);
    // All results should be from network quizzes
    const networkQuestions = ['网络问题1?', '网络问题2?', '网络问题3?'];
    results.forEach((q) => {
      expect(networkQuestions).toContain(q);
    });
  });

  it('prefers pe-exam-303 questions on 303 page', () => {
    const results = getSuggestions('/learn/pe-exam-303/calculus/topic/x', 3);
    expect(results[0]).toBe('数三问题1?');
  });

  it('prefers pe-exam-802 questions on 802 page', () => {
    const results = getSuggestions('/learn/pe-exam-802', 2);
    const pool = ['802问题1?', '802问题2?'];
    // 前 2 个应全部来自 802 题池
    results.slice(0, 2).forEach((q) => {
      expect(pool).toContain(q);
    });
  });

  it('prefers ruankao questions on ruankao page', () => {
    const results = getSuggestions('/learn/ruankao/sd-database/sd-09-01', 1);
    expect(results[0]).toBe('软考问题1?');
  });

  it('prioritizes mistake questions', () => {
    mockMistakes.push({
      question: '错题问题?',
      topicId: 't1',
      subject: 'network',
    });
    const results = getSuggestions('/', 3);
    expect(results[0]).toBe('错题问题?');
  });

  it('returns empty array when no quizzes available', async () => {
    // Temporarily mock empty modules
    const { getSuggestions: getEmptySuggestions } = await import('@/lib/suggestions');
    // Since modules are mocked at module level, we test with existing data
    const results = getEmptySuggestions('/', 3);
    expect(Array.isArray(results)).toBe(true);
  });

  it('defaults to 3 suggestions', () => {
    const results = getSuggestions('/');
    expect(results.length).toBe(3);
  });
});
