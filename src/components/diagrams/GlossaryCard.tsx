'use client';

import { useState } from 'react';

interface Term {
  term: string;
  english: string;
  definition: string;
}

interface GlossaryCardProps {
  terms: Term[];
}

export default function GlossaryCard({ terms }: GlossaryCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [activeTerm, setActiveTerm] = useState<string | null>(null);

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, var(--accent-light), var(--gold-light))',
        border: '1px solid var(--border)',
      }}
    >
      {/* 标题栏 */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-3.5 transition-colors"
        style={{ background: expanded ? 'rgba(255,255,255,0.5)' : 'transparent' }}
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">📖</span>
          <span className="text-[14px] font-semibold" style={{ color: 'var(--text)' }}>
            本课关键术语
          </span>
          <span className="text-[12px] px-2 py-0.5 rounded-full"
            style={{ background: 'var(--accent)' + '15', color: 'var(--accent)' }}>
            {terms.length} 个
          </span>
        </div>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          style={{
            color: 'var(--text-muted)',
            transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.25s ease',
          }}
        >
          <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* 术语列表 */}
      {expanded && (
        <div className="px-5 pb-5 pt-1">
          <div className="flex flex-wrap gap-2 mb-3">
            {terms.map(t => (
              <button
                key={t.term}
                onClick={() => setActiveTerm(activeTerm === t.term ? null : t.term)}
                className="text-[13px] px-3 py-1.5 rounded-lg transition-all duration-200"
                style={{
                  background: activeTerm === t.term ? 'var(--surface)' : 'rgba(255,255,255,0.6)',
                  border: `1px solid ${activeTerm === t.term ? 'var(--accent)' + '40' : 'var(--border)'}`,
                  color: activeTerm === t.term ? 'var(--accent)' : 'var(--text)',
                  boxShadow: activeTerm === t.term ? '0 2px 8px rgba(0,0,0,0.05)' : 'none',
                  fontWeight: activeTerm === t.term ? 600 : 400,
                }}
              >
                {t.term}
                <span className="ml-1.5 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {t.english}
                </span>
              </button>
            ))}
          </div>

          {activeTerm && (
            <div
              className="px-4 py-3.5 rounded-lg text-[13.5px] leading-relaxed animate-in"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)',
              }}
            >
              <div className="font-semibold mb-1" style={{ color: 'var(--text)' }}>
                {terms.find(t => t.term === activeTerm)?.term}
                <span className="ml-2 font-normal text-[12px]" style={{ color: 'var(--text-muted)' }}>
                  {terms.find(t => t.term === activeTerm)?.english}
                </span>
              </div>
              {terms.find(t => t.term === activeTerm)?.definition}
            </div>
          )}

          {!activeTerm && (
            <div className="text-[12px] text-center py-2" style={{ color: 'var(--text-muted)' }}>
              点击术语卡片查看释义
            </div>
          )}
        </div>
      )}
    </div>
  );
}
