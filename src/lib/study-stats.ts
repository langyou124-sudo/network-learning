import type { DayStudyTime } from '@/types';

/**
 * 学习日历的数据整形（纯函数，便于测试）。
 * 以周一为一周起点，返回从起始周到本周的矩阵。
 */

export interface CalendarCell {
  /** YYYY-MM-DD（本地时区） */
  date: string;
  seconds: number;
  /** 当天学过的课题数 */
  topics: number;
  /** 0 = 没学，4 = 学得最多，用于配色分档 */
  level: 0 | 1 | 2 | 3 | 4;
  future: boolean;
}

/** 用本地时间取日期串，避免 toISOString 的 UTC 偏移把晚上记到前一天。 */
export function toLocalISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 分档阈值（秒）：15 分钟 / 30 分钟 / 60 分钟。 */
export function levelOf(seconds: number): CalendarCell['level'] {
  if (seconds <= 0) return 0;
  if (seconds < 15 * 60) return 1;
  if (seconds < 30 * 60) return 2;
  if (seconds < 60 * 60) return 3;
  return 4;
}

/**
 * 生成最近若干周的学习日历。
 * @param records 进度里的 studyTimeRecords（已按天归档）
 * @param today 参考日（一般传 new Date()）
 * @param weeks 需要几周，默认 5 周（进度只保留 30 天）
 */
export function buildCalendar(
  records: Record<string, DayStudyTime> = {},
  today: Date = new Date(),
  weeks = 5,
): CalendarCell[][] {
  const cursor = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const todayIso = toLocalISODate(cursor);

  // 回退到本周周一，再往前推到 weeks 周前的周一
  const weekday = (cursor.getDay() + 6) % 7; // 周一 = 0
  cursor.setDate(cursor.getDate() - weekday - (weeks - 1) * 7);

  const matrix: CalendarCell[][] = [];
  for (let w = 0; w < weeks; w++) {
    const row: CalendarCell[] = [];
    for (let d = 0; d < 7; d++) {
      const date = toLocalISODate(cursor);
      const record = records[date];
      const seconds = record?.total ?? 0;
      row.push({
        date,
        seconds,
        topics: Object.values(record?.byTopic ?? {}).filter((v) => v > 0).length,
        level: levelOf(seconds),
        future: date > todayIso,
      });
      cursor.setDate(cursor.getDate() + 1);
    }
    matrix.push(row);
  }
  return matrix;
}
