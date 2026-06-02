import { Progress, MistakeRecord } from '@/types';

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
};

// 获取学习进度
export function getProgress(): Progress {
  if (typeof window === 'undefined') return defaultProgress;
  const stored = localStorage.getItem(PROGRESS_KEY);
  if (!stored) return defaultProgress;
  try {
    return JSON.parse(stored);
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
