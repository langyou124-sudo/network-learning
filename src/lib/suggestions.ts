import { networkModules } from '@/data/network';
import { marxismModules } from '@/data/marxism';
import { getProgress, getMistakes } from './storage';

interface Suggestion {
  question: string;
  subject: string;
}

// 从所有学科收集全部 quiz 问题
function getAllQuizzes(): Suggestion[] {
  const quizzes: Suggestion[] = [];

  for (const mod of networkModules) {
    for (const topic of mod.topics) {
      for (const q of topic.quizzes) {
        quizzes.push({ question: q.question, subject: 'network' });
      }
    }
  }

  for (const mod of marxismModules) {
    for (const topic of mod.topics) {
      for (const q of topic.quizzes) {
        quizzes.push({ question: q.question, subject: 'marxism' });
      }
    }
  }

  return quizzes;
}

// 从 URL 路径推断当前学科
function detectSubject(pathname: string): string | null {
  if (pathname.includes('/learn/network')) return 'network';
  if (pathname.includes('/learn/marxism')) return 'marxism';
  if (pathname.includes('/learn/ruankao')) return 'ruankao';
  return null;
}

// 洗牌
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * 智能推荐问题
 * 优先级：
 * 1. 用户有错题 → 从错题相关问题中挑（复习）
 * 2. 当前在某学科页面 → 从该学科随机挑
 * 3. 兜底 → 全学科随机混合
 */
export function getSuggestions(pathname: string, count: number = 3): string[] {
  const allQuizzes = getAllQuizzes();
  if (allQuizzes.length === 0) return [];

  const subject = detectSubject(pathname);
  const progress = getProgress();
  const mistakes = getMistakes();
  const results: string[] = [];
  const usedQuestions = new Set<string>();

  // 第一优先：错题复习（如果有错题且数量够）
  if (mistakes.length > 0) {
    const mistakeQuizzes = shuffle(mistakes)
      .filter(m => !usedQuestions.has(m.question))
      .slice(0, 1); // 最多推1个错题
    for (const m of mistakeQuizzes) {
      results.push(m.question);
      usedQuestions.add(m.question);
    }
  }

  // 第二优先：当前学科的问题
  if (subject && results.length < count) {
    const subjectQuizzes = shuffle(
      allQuizzes.filter(q => q.subject === subject && !usedQuestions.has(q.question))
    );
    for (const q of subjectQuizzes) {
      if (results.length >= count) break;
      results.push(q.question);
      usedQuestions.add(q.question);
    }
  }

  // 补齐：全学科随机
  if (results.length < count) {
    const remaining = shuffle(
      allQuizzes.filter(q => !usedQuestions.has(q.question))
    );
    for (const q of remaining) {
      if (results.length >= count) break;
      results.push(q.question);
    }
  }

  return results;
}
