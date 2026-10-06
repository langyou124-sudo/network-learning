// 统一判分内核 —— 全部学科的练习题判分走这里，不要在页面里各写一套。
//
// 设计原则：宁可误判为对，也不要误判为错。
// 练习工具的核心价值是"答对能得到确认"，把正确答案判错会直接毁掉学习闭环。
// 因此对模糊输入（大小写、全半角、同义变体、多空打包）一律宽容处理。

import type { Quiz } from '@/types';

export type UserAnswer = string | string[];

export interface BlankSpec {
  /** 该空可接受的所有答案（已归一化） */
  variants: string[];
}

export type GradingMode =
  /** 选择题：比对字母（也兼容选项原文） */
  | 'choice'
  /** 单空填空：任一变体命中即对 */
  | 'single'
  /** 多空填空：逐空比对 */
  | 'per-blank'
  /** 简答/论述：不自动判分，由用户自评 */
  | 'self-assess';

export interface GradingResult {
  mode: GradingMode;
  /** 是否判对（self-assess 恒为 false，由用户自评决定） */
  correct: boolean;
  /** 是否可自动判分 */
  autoGradable: boolean;
  /** 逐空对错（per-blank 模式才有） */
  blankResults?: boolean[];
  /** 展示给用户看的"正确答案"文本 */
  displayAnswer: string;
}

/* ------------------------------------------------------------------ */
/* 归一化                                                              */
/* ------------------------------------------------------------------ */

/** 全角 → 半角，统一空白，统一减号，去首尾空白，小写 */
export function normalizeAnswer(raw: string): string {
  if (typeof raw !== 'string') return '';
  let s = raw.trim();
  // 全角字符（！-～）转半角
  s = s.replace(/[！-～]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) - 0xfee0)
  );
  // 全角空格、不换行空格 → 普通空格
  s = s.replace(/[　 ]/g, ' ');
  // Unicode 减号/负号/连字符统一为 ASCII 减号
  s = s.replace(/[−‐‑‒–—―﹣－]/g, '-');
  // 中文顿号/逗号 → 英文逗号（答案里的 "4、12" 与 "4,12" 等价）
  s = s.replace(/[、，]/g, ',');
  // 折叠空白
  s = s.replace(/\s+/g, ' ').trim();
  return s.toLowerCase();
}

/** 去掉所有空白与标点，用于"52.56" vs "52.5 6"、"X=25" vs "x=25" 这类 */
function squeeze(s: string): string {
  return normalizeAnswer(s).replace(/[\s,，、;；:：.。]/g, '');
}

function looseMatch(user: string, expected: string): boolean {
  const u = normalizeAnswer(user);
  const e = normalizeAnswer(expected);
  if (u === e) return true;
  // 允许用户多写单位/等式前后缀，如 "25" 对 "X=25"、"10m" 对 "10"
  if (u && e && (u.includes(e) || e.includes(u))) return true;
  return squeeze(u) === squeeze(e);
}

/* ------------------------------------------------------------------ */
/* 空格数与答案解析                                                     */
/* ------------------------------------------------------------------ */

/** 从题干数出填空处数量。支持 "____" / "＿＿" / "______" / "( )" 式 */
export function blankCount(quiz: Quiz): number {
  const q = quiz.question || '';
  const underscores = q.match(/_{2,}|＿{2,}/g);
  if (underscores) return underscores.length;
  // 数学题常见 "f(x) 在 x=0 处是 ___ 的间断点" 已被覆盖；
  // 仅当题干没有下划线时，回退到 0（表示无法判断）
  return 0;
}

/** 把数据里的 answer 解析成"逐空可接受答案"列表 */
export function parseAnswerSpec(quiz: Quiz): BlankSpec[] {
  const ans = quiz.answer;
  const nBlanks = blankCount(quiz);

  // 1) 竖线打包的多空：'具体|抽象' 或 'MAC|IP'
  //    注意：| 也可能是答案内容本身（如数学绝对值 '1/|E|'），
  //    因此只有当分割段数恰好等于题干空格数时才视为分隔符。
  if (typeof ans === 'string' && ans.includes('|') && nBlanks >= 2) {
    const parts = ans.split('|').map((s) => s.trim()).filter(Boolean);
    if (parts.length === nBlanks) {
      return parts.map((p) => ({ variants: [normalizeAnswer(p)] }));
    }
  }

  // 2) 数组答案
  if (Array.isArray(ans)) {
    const items = ans.map((s) => String(s)).filter(Boolean);

    // 2a) 逗号打包的多空："4, 12" —— 当数组只有 1 项且该项含逗号、且题干是多空
    if (items.length === 1 && nBlanks >= 2 && items[0].includes(',')) {
      const parts = items[0].split(',').map((s) => s.trim()).filter(Boolean);
      if (parts.length === nBlanks) {
        return parts.map((p) => ({ variants: [normalizeAnswer(p)] }));
      }
    }

    // 2b) 数组长度 == 空格数 → 逐空答案
    if (nBlanks >= 2 && items.length === nBlanks) {
      return items.map((it) => ({ variants: [normalizeAnswer(it)] }));
    }

    // 2c) 单空多变体（含数组长度 == 1 的情况）→ 任一命中即对
    return [{ variants: items.map(normalizeAnswer).filter(Boolean) }];
  }

  // 3) 普通字符串答案
  return [{ variants: [normalizeAnswer(String(ans))] }];
}

export function getGradingMode(quiz: Quiz): GradingMode {
  if (quiz.type === 'short-answer') return 'self-assess';
  if (quiz.type === 'choice') return 'choice';
  return parseAnswerSpec(quiz).length > 1 ? 'per-blank' : 'single';
}

/** 需要渲染多个输入框 */
export function isMultiBlank(quiz: Quiz): boolean {
  return getGradingMode(quiz) === 'per-blank';
}

/** 简答/论述题不由机器判分 */
export function isSelfAssess(quiz: Quiz): boolean {
  return getGradingMode(quiz) === 'self-assess';
}

/** 客观题（会进错题本的题） */
export function isObjective(quiz: Quiz): boolean {
  return !isSelfAssess(quiz);
}

/* ------------------------------------------------------------------ */
/* 判分                                                                */
/* ------------------------------------------------------------------ */

/** 选择题：用户答案应为 'A'/'B'…，也接受选项原文 */
function gradeChoice(quiz: Quiz, userAnswer: UserAnswer): GradingResult {
  const raw = Array.isArray(userAnswer) ? userAnswer[0] || '' : userAnswer;
  const expected = normalizeAnswer(String(quiz.answer));
  const opts = quiz.options || [];
  const displayAnswer = renderAnswer(quiz);

  // 1) 直接比对字母
  if (normalizeAnswer(raw) === expected) {
    return { mode: 'choice', correct: true, autoGradable: true, displayAnswer };
  }

  // 2) 兼容存了选项原文的情况（303/802 旧 UI）
  const idx = opts.findIndex((o) => normalizeAnswer(o) === normalizeAnswer(raw));
  if (idx >= 0) {
    const letter = String.fromCharCode(65 + idx);
    if (normalizeAnswer(letter) === expected) {
      return { mode: 'choice', correct: true, autoGradable: true, displayAnswer };
    }
  }

  // 3) 兼容 answer 是选项原文的情况（数据不规范）
  const expIdx = opts.findIndex((o) => normalizeAnswer(o) === expected);
  if (expIdx >= 0) {
    const letter = String.fromCharCode(65 + expIdx);
    if (normalizeAnswer(raw) === normalizeAnswer(letter)) {
      return { mode: 'choice', correct: true, autoGradable: true, displayAnswer };
    }
  }

  return { mode: 'choice', correct: false, autoGradable: true, displayAnswer };
}

/** 填空题 */
function gradeFill(quiz: Quiz, userAnswer: UserAnswer): GradingResult {
  const specs = parseAnswerSpec(quiz);
  const displayAnswer = renderAnswer(quiz);

  if (specs.length === 1) {
    const raw = Array.isArray(userAnswer) ? userAnswer.join(' ') : userAnswer;
    const ok = specs[0].variants.some((v) => looseMatch(raw, v));
    return { mode: 'single', correct: ok, autoGradable: true, displayAnswer };
  }

  // 逐空比对
  const inputs = Array.isArray(userAnswer) ? userAnswer : [userAnswer];
  const blankResults = specs.map((spec, i) =>
    spec.variants.some((v) => looseMatch(inputs[i] ?? '', v))
  );
  return {
    mode: 'per-blank',
    correct: blankResults.every(Boolean),
    autoGradable: true,
    blankResults,
    displayAnswer,
  };
}

export function gradeAnswer(quiz: Quiz, userAnswer: UserAnswer): GradingResult {
  const mode = getGradingMode(quiz);
  if (mode === 'self-assess') {
    return {
      mode,
      correct: false,
      autoGradable: false,
      displayAnswer: renderAnswer(quiz),
    };
  }
  if (mode === 'choice') return gradeChoice(quiz, userAnswer);
  return gradeFill(quiz, userAnswer);
}

/* ------------------------------------------------------------------ */
/* 展示                                                                */
/* ------------------------------------------------------------------ */

/** 生成"正确答案"的展示文本 */
export function renderAnswer(quiz: Quiz): string {
  const ans = quiz.answer;
  if (Array.isArray(ans)) return ans.join(' / ');
  return String(ans);
}

/** 生成分空展示，per-blank 时用于逐空显示 */
export function renderBlankAnswers(quiz: Quiz): string[] {
  return parseAnswerSpec(quiz).map((spec) => spec.variants.join(' / '));
}
