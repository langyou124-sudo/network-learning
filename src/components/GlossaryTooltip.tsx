'use client';

import { useState, useRef, useEffect, ReactNode } from 'react';
import { glossary, GlossaryTerm } from '@/data/glossary';

// 构建匹配正则：按术语长度降序排列，长的优先匹配
const allTerms = [...glossary].sort((a, b) => b.term.length - a.term.length);
const termPatterns = allTerms.flatMap(t => [t.term, ...(t.aliases || [])]);
// 排序后再去重，长的在前
termPatterns.sort((a, b) => b.length - a.length);

// 构建正则：中文直接匹配，英文不区分大小写，要求前后是词边界
function buildRegex(): RegExp {
  const escaped = termPatterns.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  // 分为中文和英文两组
  const chinese = escaped.filter(t => /[一-鿿]/.test(t));
  const english = escaped.filter(t => !/[一-鿿]/.test(t));

  const parts: string[] = [];
  if (chinese.length) parts.push(`(${chinese.join('|')})`);
  if (english.length) parts.push(`\\b(${english.join('|')})\\b`);

  return new RegExp(parts.join('|'), 'gi');
}

const GLOSSARY_REGEX = buildRegex();

// 术语 → 定义的快速查找（不区分大小写）
const termMap = new Map<string, GlossaryTerm>();
for (const t of glossary) {
  termMap.set(t.term.toLowerCase(), t);
  if (t.aliases) {
    for (const a of t.aliases) termMap.set(a.toLowerCase(), t);
  }
}

function lookupTerm(text: string): GlossaryTerm | undefined {
  return termMap.get(text.toLowerCase());
}

// Tooltip 弹出层
function TooltipPopup({ term, definition, position }: {
  term: string;
  definition: string;
  position: { x: number; y: number };
}) {
  return (
    <div
      className="fixed z-[100] px-4 py-3 rounded-xl shadow-lg max-w-xs pointer-events-none animate-in"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: 'translate(-50%, -100%) translateY(-8px)',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        animationDuration: '0.15s',
      }}
    >
      <div className="text-[12px] font-semibold mb-1" style={{ color: 'var(--accent)' }}>
        {term}
      </div>
      <div className="text-[12.5px] text-[var(--text-secondary)] leading-relaxed">
        {definition}
      </div>
    </div>
  );
}

// 可悬浮的术语
export function GlossaryHighlight({ term: displayText, glossaryTerm }: {
  term: string;
  glossaryTerm: GlossaryTerm;
}) {
  const [show, setShow] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLSpanElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const handleEnter = () => {
    timerRef.current = setTimeout(() => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setPos({
          x: rect.left + rect.width / 2,
          y: rect.top,
        });
        setShow(true);
      }
    }, 200);
  };

  const handleLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setShow(false);
  };

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  return (
    <>
      <span
        ref={ref}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="cursor-help border-b border-dotted"
        style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}
      >
        {displayText}
      </span>
      {show && (
        <TooltipPopup
          term={glossaryTerm.term}
          definition={glossaryTerm.definition}
          position={pos}
        />
      )}
    </>
  );
}

// 将纯文本中的术语替换为带高亮的 React 元素
export function highlightTerms(text: string): ReactNode[] {
  if (!text || text.length < 2) return [text];

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  // 重置正则状态
  GLOSSARY_REGEX.lastIndex = 0;

  while ((match = GLOSSARY_REGEX.exec(text)) !== null) {
    const matched = match[0];
    const entry = lookupTerm(matched);
    if (!entry) continue;

    // 避免在 markdown 语法标记内匹配（如 **加粗** 内部）
    const before = text.slice(Math.max(0, match.index - 2), match.index);
    if (before.includes('**') || before.includes('`') || before.includes('[')) continue;

    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    parts.push(
      <GlossaryHighlight key={`g-${match.index}`} term={matched} glossaryTerm={entry} />
    );
    lastIndex = match.index + matched.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
}
