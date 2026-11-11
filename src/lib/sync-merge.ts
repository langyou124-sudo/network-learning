import type { Progress, MistakeRecord, DayStudyTime } from '@/types';

/**
 * 本地与云端学习数据的合并规则。
 *
 * 这些函数是纯函数，同步层只管调用它们，冲突策略集中在测试里可验证。
 * 没有“正确答案”的字段（笔记正文、总时长）做了明确取舍，见各函数注释。
 */

/** 日期字符串按 ISO 可比较，取较新者。 */
function laterDate(a: string, b: string): string {
  return a >= b ? a : b;
}

/** 并集，保留首次出现的顺序，避免每次同步顺序抖动。 */
function union(a: string[] = [], b: string[] = []): string[] {
  const out = [...a];
  for (const item of b) if (!out.includes(item)) out.push(item);
  return out;
}

/** 每天每课题取较大值：两台设备同一天都学过时，取更长的那个而不是相加（相加会重复计时）。 */
function mergeStudyRecords(
  a: Record<string, DayStudyTime> = {},
  b: Record<string, DayStudyTime> = {},
): Record<string, DayStudyTime> {
  const out: Record<string, DayStudyTime> = {};
  for (const date of new Set([...Object.keys(a), ...Object.keys(b)])) {
    const left = a[date];
    const right = b[date];
    if (!left) {
      out[date] = right;
      continue;
    }
    if (!right) {
      out[date] = left;
      continue;
    }
    const byTopic: Record<string, number> = { ...left.byTopic };
    for (const [topicId, seconds] of Object.entries(right.byTopic ?? {})) {
      byTopic[topicId] = Math.max(byTopic[topicId] ?? 0, seconds);
    }
    out[date] = { total: Math.max(left.total ?? 0, right.total ?? 0), byTopic };
  }
  return out;
}

/**
 * 合并进度。
 * - 完成课题 / 薄弱点：并集（两边学过的都不会丢）
 * - 成绩：同课题取日期更晚的一次；同一天取对得更多的一次
 * - 笔记：一边为空用另一边，两边都有且不同则保留本地（正文无法自动合并，
 *   宁可让用户在本机看到自己刚写的内容）
 * - 总时长：取较大值，避免两台设备各自累加导致翻倍
 */
export function mergeProgress(local: Progress, remote: Progress): Progress {
  const quizScores: Progress['quizScores'] = { ...remote.quizScores };
  for (const [topicId, score] of Object.entries(local.quizScores ?? {})) {
    const other = quizScores[topicId];
    if (!other) {
      quizScores[topicId] = score;
      continue;
    }
    const newer = score.date > other.date ? score : other;
    const sameDay = score.date === other.date;
    quizScores[topicId] = sameDay && score.correct > other.correct ? score : newer;
  }

  const notes: Record<string, string> = { ...remote.notes };
  for (const [topicId, text] of Object.entries(local.notes ?? {})) {
    notes[topicId] = text?.trim() ? text : (remote.notes?.[topicId] ?? '');
  }

  return {
    completedTopics: union(local.completedTopics, remote.completedTopics),
    quizScores,
    weakPoints: union(local.weakPoints, remote.weakPoints),
    notes,
    lastStudyDate: laterDate(local.lastStudyDate ?? '', remote.lastStudyDate ?? ''),
    totalStudyHours: Math.max(local.totalStudyHours ?? 0, remote.totalStudyHours ?? 0),
    studyTimeRecords: mergeStudyRecords(local.studyTimeRecords, remote.studyTimeRecords),
  };
}

/** 错题按 quizId 去重；已复习取或（任一端复习过就算复习过）。 */
export function mergeMistakes(local: MistakeRecord[], remote: MistakeRecord[]): MistakeRecord[] {
  const byId = new Map<string, MistakeRecord>();

  for (const record of [...remote, ...local]) {
    const existing = byId.get(record.quizId);
    if (!existing) {
      byId.set(record.quizId, record);
      continue;
    }
    byId.set(record.quizId, {
      ...existing,
      ...record,
      reviewed: Boolean(existing.reviewed) || Boolean(record.reviewed),
      date: laterDate(existing.date ?? '', record.date ?? ''),
    });
  }

  return [...byId.values()];
}
