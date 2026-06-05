import { describe, it, expect, beforeEach } from 'vitest';
import {
  getProgress,
  saveProgress,
  completeTopic,
  toggleTopicComplete,
  saveQuizScore,
  getStats,
  addStudyTime,
  getStudyTimeByDate,
  getStudyTimeRange,
  getStudyStreak,
  resetStudyTime,
  getNote,
  saveNote,
  clearAllData,
  resetProgressCache,
} from '@/lib/storage';

beforeEach(() => {
  localStorage.clear();
  resetProgressCache();
});

describe('getProgress / saveProgress', () => {
  it('returns default progress when empty', () => {
    const p = getProgress();
    expect(p.completedTopics).toEqual([]);
    expect(p.quizScores).toEqual({});
    expect(p.studyTimeRecords).toEqual({});
  });

  it('saves and retrieves progress', () => {
    const p = getProgress();
    p.completedTopics.push('topic-1');
    saveProgress(p);
    const loaded = getProgress();
    expect(loaded.completedTopics).toContain('topic-1');
  });

  it('uses cache after first load', () => {
    const p = getProgress();
    p.completedTopics.push('t1');
    saveProgress(p);
    resetProgressCache();
    const p1 = getProgress();
    const p2 = getProgress();
    expect(p1).toBe(p2); // same reference from cache
  });
});

describe('completeTopic / toggleTopicComplete', () => {
  it('adds topic to completed list', () => {
    completeTopic('t1');
    expect(getProgress().completedTopics).toContain('t1');
  });

  it('does not duplicate', () => {
    completeTopic('t1');
    completeTopic('t1');
    expect(getProgress().completedTopics.filter(t => t === 't1')).toHaveLength(1);
  });

  it('toggle removes if already completed', () => {
    completeTopic('t1');
    toggleTopicComplete('t1');
    expect(getProgress().completedTopics).not.toContain('t1');
  });

  it('toggle adds if not completed', () => {
    toggleTopicComplete('t2');
    expect(getProgress().completedTopics).toContain('t2');
  });
});

describe('saveQuizScore', () => {
  it('saves score with date', () => {
    saveQuizScore('t1', 8, 10);
    const p = getProgress();
    expect(p.quizScores['t1']).toMatchObject({ correct: 8, total: 10 });
    expect(p.quizScores['t1'].date).toBeTruthy();
  });
});

describe('getStats', () => {
  it('calculates completion rate', () => {
    completeTopic('t1');
    completeTopic('t2');
    const stats = getStats(10);
    expect(stats.completedCount).toBe(2);
    expect(stats.completionRate).toBe(20);
    expect(stats.totalTopics).toBe(10);
  });

  it('calculates average score', () => {
    saveQuizScore('t1', 8, 10); // 80%
    saveQuizScore('t2', 6, 10); // 60%
    const stats = getStats(10);
    expect(stats.avgScore).toBe(70);
  });
});

describe('study time tracking', () => {
  it('adds and retrieves study time by date', () => {
    addStudyTime(120, 'topic-1');
    const today = new Date().toISOString().split('T')[0];
    const dayData = getStudyTimeByDate(today);
    expect(dayData.total).toBe(120);
    expect(dayData.byTopic['topic-1']).toBe(120);
  });

  it('accumulates time', () => {
    addStudyTime(60);
    addStudyTime(90);
    const today = new Date().toISOString().split('T')[0];
    expect(getStudyTimeByDate(today).total).toBe(150);
  });

  it('ignores zero or negative', () => {
    addStudyTime(0);
    addStudyTime(-10);
    const today = new Date().toISOString().split('T')[0];
    expect(getStudyTimeByDate(today).total).toBe(0);
  });

  it('getStudyTimeRange returns N days', () => {
    const range = getStudyTimeRange(7);
    expect(range).toHaveLength(7);
    expect(range[0].date).toBeTruthy();
  });

  it('getStudyStreak counts consecutive days', () => {
    addStudyTime(60);
    expect(getStudyStreak()).toBeGreaterThanOrEqual(1);
  });

  it('resetStudyTime clears records', () => {
    addStudyTime(100);
    resetStudyTime();
    const p = getProgress();
    expect(p.studyTimeRecords).toEqual({});
    expect(p.totalStudyHours).toBe(0);
  });
});

describe('notes', () => {
  it('saves and retrieves note', () => {
    saveNote('t1', 'hello');
    expect(getNote('t1')).toBe('hello');
  });

  it('returns empty string for missing note', () => {
    expect(getNote('nonexistent')).toBe('');
  });
});

describe('clearAllData', () => {
  it('clears all data and cache', () => {
    completeTopic('t1');
    clearAllData();
    const p = getProgress();
    expect(p.completedTopics).toEqual([]);
  });
});
