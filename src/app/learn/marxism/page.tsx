'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { marxismModules, getQuestionsByModule } from '@/data/marxism';

export default function MarxismLearnPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const difficultyStats = {
    basic: { label: '基础', color: 'var(--success)' },
    intermediate: { label: '中等', color: 'var(--warning)' },
    advanced: { label: '进阶', color: 'var(--danger)' },
  };

  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">马克思主义基本原理</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">选择模块开始学习论述题</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8 animate-in" style={{ animationDelay: '0.06s' }}>
        {[
          {
            value: marxismModules.reduce((sum, m) => sum + getQuestionsByModule(m.id).length, 0),
            label: '总题目数',
            color: 'var(--accent)',
          },
          { value: marxismModules.length, label: '课程模块', color: 'var(--success)' },
          {
            value: Object.entries(difficultyStats).filter(
              ([key]) => marxismModules.some(m =>
                getQuestionsByModule(m.id).some(q => q.difficulty === key)
              )
            ).length,
            label: '难度覆盖',
            color: 'var(--warning)',
          },
        ].map((s, i) => (
          <div key={i} className="card px-5 py-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[var(--text-muted)]">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Module list */}
      <div className="space-y-5">
        {marxismModules.map((mod, index) => {
          const questions = getQuestionsByModule(mod.id);

          return (
            <div
              key={mod.id}
              className="card-lift overflow-hidden animate-in"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: 'var(--accent-light)' }}
                    >
                      {mod.icon}
                    </div>
                    <div>
                      <h2 className="text-[15px] font-semibold text-[var(--text)]">
                        模块 {index + 1}：{mod.title}
                      </h2>
                      <p className="text-[13px] text-[var(--text-muted)]">
                        {questions.length} 道论述题
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-medium text-[var(--text-secondary)]">
                      {questions.length} 题
                    </span>
                  </div>
                </div>

                {questions.length > 0 ? (
                  <div className="space-y-1">
                    {questions.map((q) => {
                      const diff = difficultyStats[q.difficulty];
                      return (
                        <Link
                          key={q.id}
                          href={`/learn/marxism/${mod.id}/${q.id}`}
                          className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-[var(--bg-warm)] group"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] bg-[var(--border-light)] text-[var(--text-muted)]"
                            >
                              ○
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="text-[14px] font-medium text-[var(--text)] line-clamp-1">
                                {q.question}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span
                                  className="text-[11px] px-2 py-0.5 rounded-full"
                                  style={{ background: diff.color + '20', color: diff.color }}
                                >
                                  {diff.label}
                                </span>
                                {q.tags.slice(0, 2).map((tag) => (
                                  <span key={tag} className="text-[11px] text-[var(--text-muted)]">
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors ml-3">
                            →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-[var(--text-muted)] text-sm">
                    内容正在准备中…
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
