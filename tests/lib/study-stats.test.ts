import { describe, it, expect } from 'vitest';
import { buildCalendar, levelOf, toLocalISODate } from '@/lib/study-stats';

describe('buildCalendar', () => {
  const today = new Date(2026, 10, 11); // 2026-11-11 周三

  it('返回 5 周 × 7 天，且第一格是周一', () => {
    const weeks = buildCalendar({}, today, 5);
    expect(weeks).toHaveLength(5);
    expect(weeks.every(week => week.length === 7)).toBe(true);
    // 2026-11-11 是周三，所在周周一为 11-09
    expect(weeks[4][0].date).toBe('2026-11-09');
    expect(weeks[0][0].date).toBe('2026-10-12');
  });

  it('今天不再是未来，明天是未来', () => {
    const weeks = buildCalendar({}, today, 5);
    const flat = weeks.flat();
    const todayCell = flat.find(cell => cell.date === '2026-11-11');
    const tomorrowCell = flat.find(cell => cell.date === '2026-11-12');
    expect(todayCell?.future).toBe(false);
    expect(tomorrowCell?.future).toBe(true);
  });

  it('把当天记录映射成秒数、课题数与分档', () => {
    const weeks = buildCalendar(
      { '2026-11-10': { total: 1800, byTopic: { 'topic-1': 1200, 'topic-2': 600 } } },
      today,
      5,
    );
    const cell = weeks.flat().find(c => c.date === '2026-11-10');
    // 1800 秒正好 30 分钟，落在「30~60 分钟」这一档
    expect(cell).toMatchObject({ seconds: 1800, topics: 2, level: 3, future: false });
  });

  it('没有记录的日子是 0 档', () => {
    const weeks = buildCalendar({}, today, 5);
    expect(weeks.flat().every(cell => cell.level === 0)).toBe(true);
  });
});

describe('levelOf', () => {
  it('按 15/30/60 分钟分四档', () => {
    expect(levelOf(0)).toBe(0);
    expect(levelOf(60)).toBe(1);
    expect(levelOf(15 * 60 - 1)).toBe(1);
    expect(levelOf(15 * 60)).toBe(2);
    expect(levelOf(30 * 60)).toBe(3);
    expect(levelOf(60 * 60)).toBe(4);
  });
});

describe('toLocalISODate', () => {
  it('用本地时间格式化，避免 UTC 偏移把晚上记到前一天', () => {
    expect(toLocalISODate(new Date(2026, 0, 5))).toBe('2026-01-05');
    expect(toLocalISODate(new Date(2026, 10, 11, 23, 30))).toBe('2026-11-11');
  });
});
