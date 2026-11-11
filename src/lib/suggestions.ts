import { networkModules } from '@/data/network';
import { marxismModules } from '@/data/marxism';
import { ruankaoModules } from '@/data/ruankao';
import { peExam303Modules } from '@/data/pe-exam-303';
import { peExam802Modules } from '@/data/pe-exam-802';
import { Module, MistakeRecord, Progress } from '@/types';
import { getProgress, getMistakes } from './storage';

export interface SuggestionQuiz {
  question: string;
  subject: string;
  topicId: string;
}

function collectFromModules(modules: Module[], subject: string, out: SuggestionQuiz[]) {
  for (const mod of modules) {
    for (const topic of mod.topics) {
      for (const q of topic.quizzes) {
        out.push({ question: q.question, subject, topicId: topic.id });
      }
    }
  }
}

export function getAllQuizzes(): SuggestionQuiz[] {
  const quizzes: SuggestionQuiz[] = [];
  collectFromModules(networkModules, 'network', quizzes);
  collectFromModules(marxismModules, 'marxism', quizzes);
  collectFromModules(ruankaoModules, 'ruankao', quizzes);
  collectFromModules(peExam303Modules, 'pe-exam-303', quizzes);
  collectFromModules(peExam802Modules, 'pe-exam-802', quizzes);
  return quizzes;
}

/** 从 URL 路径推断当前学科。 */
export function detectSubject(pathname: string): string | null {
  const prefixes: [string, string][] = [
    ['/learn/pe-exam-303', 'pe-exam-303'],
    ['/learn/pe-exam-802', 'pe-exam-802'],
    ['/learn/network', 'network'],
    ['/learn/marxism', 'marxism'],
    ['/learn/ruankao', 'ruankao'],
  ];
  for (const [prefix, subject] of prefixes) {
    if (pathname.startsWith(prefix)) return subject;
  }
  return null;
}

function shuffle<T>(arr: T[], random: () => number = Math.random): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 按薄弱度给课题排序（纯函数，便于测试）。
 * 权重来源：
 *   - 错题：每题 +3（错得越多越该复习）
 *   - 正确率低于 70% 的成绩：(1 - 正确率) × 2
 *   - 未完成：+0.5，只作为同分时的倾向，不压过真实错题
 */
export function rankWeakTopics(input: {
  mistakes: MistakeRecord[];
  progress: Pick<Progress, 'quizScores' | 'completedTopics'>;
}): string[] {
  const weights = new Map<string, number>();
  const bump = (topicId: string, value: number) => {
    weights.set(topicId, (weights.get(topicId) ?? 0) + value);
  };

  for (const mistake of input.mistakes) {
    if (mistake.topicId) bump(mistake.topicId, 3);
  }

  for (const [topicId, score] of Object.entries(input.progress.quizScores ?? {})) {
    if (!score || score.total <= 0) continue;
    const accuracy = score.correct / score.total;
    if (accuracy < 0.7) bump(topicId, (1 - accuracy) * 2);
  }

  const completed = new Set(input.progress.completedTopics ?? []);
  for (const topicId of [...weights.keys()]) {
    if (!completed.has(topicId)) bump(topicId, 0.5);
  }

  return [...weights.entries()].sort((a, b) => b[1] - a[1]).map(([topicId]) => topicId);
}

/**
 * 挑选推荐问题（纯函数）。
 * 顺序：薄弱课题（最多占一半名额）→ 当前学科 → 全库兜底，全程去重。
 */
export function pickSuggestionQuestions(
  input: {
    quizzes: SuggestionQuiz[];
    mistakes: MistakeRecord[];
    progress: Pick<Progress, 'quizScores' | 'completedTopics'>;
    subject: string | null;
    count: number;
  },
  random: () => number = Math.random,
): string[] {
  const { quizzes, subject, count } = input;
  if (quizzes.length === 0 || count <= 0) return [];

  const byTopic = new Map<string, SuggestionQuiz[]>();
  for (const quiz of quizzes) {
    const list = byTopic.get(quiz.topicId) ?? [];
    list.push(quiz);
    byTopic.set(quiz.topicId, list);
  }

  const picked: string[] = [];
  const used = new Set<string>();
  const take = (candidates: SuggestionQuiz[]) => {
    for (const candidate of shuffle(candidates, random)) {
      if (picked.length >= count) return;
      if (used.has(candidate.question)) continue;
      picked.push(candidate.question);
      used.add(candidate.question);
    }
  };

  const maxWeak = Math.max(1, Math.ceil(count / 2));
  for (const topicId of rankWeakTopics(input)) {
    if (picked.length >= maxWeak) break;
    take(byTopic.get(topicId) ?? []);
  }

  if (subject) take(quizzes.filter((q) => q.subject === subject));
  take(quizzes);

  return picked;
}

/**
 * 智能推荐问题。
 * 有错题/低分时优先推相关课题；否则按当前学科；再不行全库随机。
 */
export function getSuggestions(pathname: string, count: number = 3): string[] {
  return pickSuggestionQuestions({
    quizzes: getAllQuizzes(),
    mistakes: getMistakes(),
    progress: getProgress(),
    subject: detectSubject(pathname),
    count,
  });
}
