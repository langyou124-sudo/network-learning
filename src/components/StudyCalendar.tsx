'use client';

import { buildCalendar, type CalendarCell } from '@/lib/study-stats';
import type { DayStudyTime } from '@/types';

const WEEKDAY_LABELS = ['一', '二', '三', '四', '五', '六', '日'];

const LEVEL_COLORS: Record<CalendarCell['level'], string> = {
  0: 'var(--border-light)',
  1: 'color-mix(in srgb, var(--accent) 25%, transparent)',
  2: 'color-mix(in srgb, var(--accent) 45%, transparent)',
  3: 'color-mix(in srgb, var(--accent) 70%, transparent)',
  4: 'var(--accent)',
};

function formatDuration(seconds: number): string {
  if (seconds <= 0) return '未学习';
  const minutes = Math.round(seconds / 60);
  if (minutes < 60) return `${minutes} 分钟`;
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  return rest > 0 ? `${hours} 小时 ${rest} 分钟` : `${hours} 小时`;
}

/**
 * 最近 5 周的学习日历（热力图）。
 * 数据来自 progress.studyTimeRecords，悬浮可看当天时长与课题数。
 */
export default function StudyCalendar({ records }: { records: Record<string, DayStudyTime> }) {
  const weeks = buildCalendar(records, new Date(), 5);
  const totalSeconds = weeks.flat().reduce((sum, cell) => sum + cell.seconds, 0);
  const activeDays = weeks.flat().filter((cell) => cell.seconds > 0).length;

  return (
    <div className="card px-6 py-5 mb-8 animate-in" style={{ animationDelay: '0.18s' }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[15px] font-semibold text-[var(--text)]">学习日历</h2>
        <span className="text-[13px] text-[var(--text-muted)]">
          近 5 周 {activeDays} 天有记录 · 共 {formatDuration(totalSeconds)}
        </span>
      </div>

      <div className="flex gap-2">
        <div className="flex flex-col gap-[6px] pt-[18px]">
          {WEEKDAY_LABELS.map((label) => (
            <span key={label} className="text-[10px] text-[var(--text-muted)] h-[18px] leading-[18px]">
              {label}
            </span>
          ))}
        </div>

        <div className="flex-1 flex gap-[6px] items-start">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-[6px]">
              {week.map((cell) => (
                <div
                  key={cell.date}
                  title={
                    cell.future
                      ? cell.date
                      : `${cell.date} · ${formatDuration(cell.seconds)}${cell.topics > 0 ? ` · ${cell.topics} 个课题` : ''}`
                  }
                  className="w-[18px] h-[18px] rounded-[4px] transition-colors"
                  style={{
                    background: cell.future ? 'transparent' : LEVEL_COLORS[cell.level],
                    border: cell.future ? '1px dashed var(--border-light)' : 'none',
                    opacity: cell.future ? 0.4 : 1,
                  }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-1 mt-3 text-[11px] text-[var(--text-muted)]">
        <span>少</span>
        {([0, 1, 2, 3, 4] as const).map((level) => (
          <span
            key={level}
            className="w-[10px] h-[10px] rounded-[2px] inline-block"
            style={{ background: LEVEL_COLORS[level] }}
          />
        ))}
        <span>多</span>
      </div>
    </div>
  );
}
