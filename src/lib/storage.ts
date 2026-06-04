import { Progress, MistakeRecord, DayStudyTime } from '@/types';

const PROGRESS_KEY = 'network-learning-progress';
const MISTAKES_KEY = 'network-learning-mistakes';

// 默认进度
const defaultProgress: Progress = {
  completedTopics: [],
  quizScores: {},
  weakPoints: [],
  notes: {},
  lastStudyDate: new Date().toISOString().split('T')[0],
  totalStudyHours: 0,
  studyTimeRecords: {},
};

// 获取学习进度
export function getProgress(): Progress {
  if (typeof window === 'undefined') return defaultProgress;
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return defaultProgress;
  try {
    const parsed = JSON.parse(stored);
    // 兼容旧数据：补全缺失字段
    if (!parsed.studyTimeRecords) parsed.studyTimeRecords = {};
    if (typeof parsed.totalStudyHours !== 'number') parsed.totalStudyHours = 0;
    return parsed;
  } catch {
    return defaultProgress;
  }
}

// 保存学习进度
export function saveProgress(progress: Progress) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
}

// 标记课题完成
export function completeTopic(topicId: string) {
  const progress = getProgress();
  if (!progress.completedTopics.includes(topicId)) {
    progress.completedTopics.push(topicId);
  }
  progress.lastStudyDate = new Date().toISOString().split('T')[0];
  saveProgress(progress);
  return progress;
}

// 切换课题完成状态
export function toggleTopicComplete(topicId: string) {
  const progress = getProgress();
  const idx = progress.completedTopics.indexOf(topicId);
  if (idx >= 0) {
    progress.completedTopics.splice(idx, 1);
  } else {
    progress.completedTopics.push(topicId);
  }
  progress.lastStudyDate = new Date().toISOString().split('T')[0];
  saveProgress(progress);
  return progress;
}

// 保存测验成绩
export function saveQuizScore(topicId: string, correct: number, total: number) {
  const progress = getProgress();
  progress.quizScores[topicId] = {
    correct,
    total,
    date: new Date().toISOString().split('T')[0],
  };
  saveProgress(progress);
  return progress;
}

// 保存笔记
export function saveNote(topicId: string, content: string) {
  const progress = getProgress();
  progress.notes[topicId] = content;
  saveProgress(progress);
}

// 获取笔记
export function getNote(topicId: string): string {
  const progress = getProgress();
  return progress.notes[topicId] || '';
}

// 获取错题列表
export function getMistakes(): MistakeRecord[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(MISTAKES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

// 保存错题
export function saveMistake(mistake: MistakeRecord) {
  const mistakes = getMistakes();
  mistakes.push(mistake);
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(mistakes));
}

// 标记错题已复习
export function markMistakeReviewed(quizId: string) {
  const mistakes = getMistakes();
  const updated = mistakes.map(m =>
    m.quizId === quizId ? { ...m, reviewed: true } : m
  );
  localStorage.setItem(MISTAKES_KEY, JSON.stringify(updated));
}

// 计算统计数据
export function getStats() {
  const progress = getProgress();
  const mistakes = getMistakes();

  const totalTopics = 43; // 总课题数
  const completedCount = progress.completedTopics.length;
  const completionRate = Math.round((completedCount / totalTopics) * 100);

  // 计算平均分
  const scores = Object.values(progress.quizScores);
  const avgScore = scores.length > 0
    ? Math.round(scores.reduce((sum, s) => sum + (s.correct / s.total * 100), 0) / scores.length)
    : 0;

  // 未复习的错题数
  const unreviewedMistakes = mistakes.filter(m => !m.reviewed).length;

  return {
    completedCount,
    totalTopics,
    completionRate,
    avgScore,
    totalMistakes: mistakes.length,
    unreviewedMistakes,
    totalStudyHours: progress.totalStudyHours,
  };
}

// === 学习时间相关 ===

// 获取今天的日期字符串 YYYY-MM-DD
function today(): string {
  return new Date().toISOString().split('T')[0];
}

// 累加学习时间
export function addStudyTime(seconds: number, topicId?: string) {
  if (seconds <= 0) return;
  const progress = getProgress();
  const date = today();

  // 兼容旧数据：如果没有 studyTimeRecords 则初始化
  if (!progress.studyTimeRecords) {
    progress.studyTimeRecords = {};
  }

  if (!progress.studyTimeRecords[date]) {
    progress.studyTimeRecords[date] = { total: 0, byTopic: {} };
  }

  const dayRecord = progress.studyTimeRecords[date];
  dayRecord.total += seconds;

  if (topicId) {
    dayRecord.byTopic[topicId] = (dayRecord.byTopic[topicId] || 0) + seconds;
  }

  // 同步更新 totalStudyHours
  progress.totalStudyHours += seconds / 3600;

  // 清理30天前的记录
  const cutoff = new Date();
  cutoff.setDate(cutoff.getDate() - 30);
  const cutoffStr = cutoff.toISOString().split('T')[0];
  for (const key of Object.keys(progress.studyTimeRecords)) {
    if (key < cutoffStr) {
      delete progress.studyTimeRecords[key];
    }
  }

  // 更新 lastStudyDate
  progress.lastStudyDate = date;

  saveProgress(progress);
}

// 获取某天的学习时间
export function getStudyTimeByDate(date: string): DayStudyTime {
  const progress = getProgress();
  return progress.studyTimeRecords?.[date] || { total: 0, byTopic: {} };
}

// 获取最近N天的学习时间
export function getStudyTimeRange(days: number): { date: string; total: number }[] {
  const progress = getProgress();
  const result: { date: string; total: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString().split('T')[0];
    const record = progress.studyTimeRecords?.[dateStr];
    result.push({ date: dateStr, total: record?.total || 0 });
  }
  return result;
}

// 获取某课题的累计学习时间（秒）
export function getTopicStudyTime(topicId: string): number {
  const progress = getProgress();
  let total = 0;
  for (const record of Object.values(progress.studyTimeRecords || {})) {
    total += record.byTopic[topicId] || 0;
  }
  return total;
}

// 计算连续学习天数
export function getStudyStreak(): number {
  const progress = getProgress();
  const records = progress.studyTimeRecords || {};
  let streak = 0;
  const d = new Date();
  while (true) {
    const dateStr = d.toISOString().split('T')[0];
    if (records[dateStr] && records[dateStr].total > 0) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

// 重置学习时间
export function resetStudyTime() {
  const progress = getProgress();
  progress.studyTimeRecords = {};
  progress.totalStudyHours = 0;
  saveProgress(progress);
}

// 导出数据
export function exportData() {
  const data = {
    progress: getProgress(),
    mistakes: getMistakes(),
    exportDate: new Date().toISOString(),
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `network-learning-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// 导入数据
export function importData(jsonStr: string) {
  try {
    const data = JSON.parse(jsonStr);
    if (data.progress) {
      saveProgress(data.progress);
    }
    if (data.mistakes) {
      localStorage.setItem(MISTAKES_KEY, JSON.stringify(data.mistakes));
    }
    return true;
  } catch {
    return false;
  }
}
