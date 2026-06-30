'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { peExam303Modules } from '@/data/pe-exam-303';

export default function PeExam303Page() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const totalTopics = peExam303Modules.reduce((sum, m) => sum + m.topics.length, 0);
  const totalQuizzes = peExam303Modules.reduce((sum, m) => sum + m.topics.reduce((s, t) => s + t.quizzes.length, 0), 0);

  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">303数学三</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">微积分(90分) + 线性代数(30分) + 概率论(30分)</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8 animate-in" style={{ animationDelay: '0.06s' }}>
        <div className="card px-5 py-4 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--accent)' }}>{totalTopics}</div>
          <div className="text-[13px] text-[var(--text-muted)]">课题</div>
        </div>
        <div className="card px-5 py-4 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--success)' }}>{peExam303Modules.length}</div>
          <div className="text-[13px] text-[var(--text-muted)]">子科目</div>
        </div>
        <div className="card px-5 py-4 text-center">
          <div className="text-2xl font-bold" style={{ color: 'var(--warning)' }}>{totalQuizzes}</div>
          <div className="text-[13px] text-[var(--text-muted)]">练习题</div>
        </div>
      </div>

      <div className="space-y-5">
        {peExam303Modules.map((mod, index) => (
          <Link
            key={mod.id}
            href={`/learn/pe-exam-303/${mod.id}`}
            className="card-lift overflow-hidden animate-in block"
            style={{ animationDelay: `${(index + 2) * 0.06}s` }}
          >
            <div className="px-6 py-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{ background: 'var(--accent-light)' }}>
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-[15px] font-semibold text-[var(--text)]">{mod.title}</h2>
                  <p className="text-[13px] text-[var(--text-muted)] line-clamp-1">{mod.description}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[13px] font-medium text-[var(--text-secondary)]">{mod.topics.length} 课题</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {mod.topics.slice(0, 5).map((topic) => (
                  <span key={topic.id} className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--bg-warm)', color: 'var(--text-muted)', border: '1px solid var(--border-light)' }}>
                    {topic.title}
                  </span>
                ))}
                {mod.topics.length > 5 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--bg-warm)', color: 'var(--text-muted)' }}>
                    +{mod.topics.length - 5}
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
