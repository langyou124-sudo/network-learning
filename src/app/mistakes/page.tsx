'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMistakes, markMistakeReviewed } from '@/lib/storage';
import { MistakeRecord } from '@/types';
import { useStudyTimer } from '@/hooks/useStudyTimer';

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [filter, setFilter] = useState<'all' | 'unreviewed' | 'reviewed'>('all');

  // 静默学习计时
  useStudyTimer({ enabled: true });

  useEffect(() => {
    setMistakes(getMistakes());
  }, []);

  const handleMarkReviewed = (quizId: string) => {
    markMistakeReviewed(quizId);
    setMistakes(prev => prev.map(m =>
      m.quizId === quizId ? { ...m, reviewed: true } : m
    ));
  };

  const filteredMistakes = mistakes.filter(m => {
    if (filter === 'unreviewed') return !m.reviewed;
    if (filter === 'reviewed') return m.reviewed;
    return true;
  });

  const unreviewedCount = mistakes.filter(m => !m.reviewed).length;

  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">错题本</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">复习做错的题目，查漏补缺</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
        {[
          { value: mistakes.length, label: '总错题', color: 'var(--warning)' },
          { value: unreviewedCount, label: '未复习', color: 'var(--danger)' },
          { value: mistakes.length - unreviewedCount, label: '已复习', color: 'var(--success)' },
        ].map((s, i) => (
          <div key={i} className="card px-5 py-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 mb-6 animate-in" style={{ animationDelay: '0.12s' }}>
        {[
          { key: 'all' as const, label: '全部' },
          { key: 'unreviewed' as const, label: '未复习' },
          { key: 'reviewed' as const, label: '已复习' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`btn ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`}
            style={filter === f.key ? { background: 'var(--warning)' } : {}}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredMistakes.length === 0 ? (
        <div className="card text-center py-16 animate-in" style={{ animationDelay: '0.18s' }}>
          <div className="text-4xl mb-3">{mistakes.length === 0 ? '🎉' : '📝'}</div>
          <p className="text-[var(--text-muted)]">
            {mistakes.length === 0 ? '还没有错题，继续保持！' : '没有符合条件的错题'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((mistake, index) => (
            <div
              key={`${mistake.quizId}-${index}`}
              className="card px-6 py-5 animate-in"
              style={{
                borderLeft: `3px solid ${mistake.reviewed ? 'var(--success)' : 'var(--danger)'}`,
                animationDelay: `${(index + 3) * 0.06}s`,
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`tag ${mistake.reviewed ? 'tag-green' : 'tag-red'}`}>
                    {mistake.reviewed ? '已复习' : '未复习'}
                  </span>
                  <span className="text-[12px] text-[var(--text-muted)]">{mistake.date}</span>
                </div>
              </div>

              <p className="font-medium text-[var(--text)] text-[14.5px] mb-3">{mistake.question}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                <div className="rounded-xl px-4 py-3" style={{ background: 'var(--danger-bg)' }}>
                  <div className="text-[11px] font-medium mb-1" style={{ color: 'var(--danger)' }}>你的答案</div>
                  <div className="text-[13px]" style={{ color: 'var(--danger)' }}>
                    {Array.isArray(mistake.userAnswer) ? mistake.userAnswer.join(', ') : mistake.userAnswer}
                  </div>
                </div>
                <div className="rounded-xl px-4 py-3" style={{ background: 'var(--success-bg)' }}>
                  <div className="text-[11px] font-medium mb-1" style={{ color: 'var(--success)' }}>正确答案</div>
                  <div className="text-[13px]" style={{ color: 'var(--success)' }}>
                    {Array.isArray(mistake.correctAnswer) ? mistake.correctAnswer.join(', ') : mistake.correctAnswer}
                  </div>
                </div>
              </div>

              {!mistake.reviewed && (
                <div className="flex justify-end">
                  <button onClick={() => handleMarkReviewed(mistake.quizId)} className="btn btn-primary"
                    style={{ background: 'var(--success)', padding: '7px 16px', fontSize: '13px' }}>
                    标记已复习
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
