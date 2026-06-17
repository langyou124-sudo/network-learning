'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { marxismModules, getQuestionsByModule } from '@/data/marxism';
import { EssayQuestion } from '@/data/marxism/types';

const difficultyMap = {
  basic: { label: '基础', color: 'var(--success)' },
  intermediate: { label: '中等', color: 'var(--warning)' },
  advanced: { label: '进阶', color: 'var(--danger)' },
};

export default function MarxismModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [module, setModule] = useState<{ id: string; title: string; icon: string } | null>(null);
  const [questions, setQuestions] = useState<EssayQuestion[]>([]);

  useEffect(() => {
    const mod = marxismModules.find((m) => m.id === moduleId);
    setModule(mod || null);
    if (mod) {
      setQuestions(getQuestionsByModule(moduleId));
    }
  }, [moduleId]);

  if (!module) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--text-muted)]">模块不存在</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 animate-in">
        <Link href="/learn/marxism" className="text-[13px] text-[var(--accent)] hover:underline">
          ← 返回马克思主义基本原理
        </Link>
        <div className="flex items-center gap-3 mt-3">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'var(--accent-light)' }}
          >
            {module.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">
              {module.title}
            </h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">
              {questions.length} 道论述题
            </p>
          </div>
        </div>
      </div>

      {questions.length > 0 ? (
        <div className="space-y-3">
          {questions.map((q, index) => {
            const diff = difficultyMap[q.difficulty];
            return (
              <Link
                key={q.id}
                href={`/learn/marxism/${moduleId}/${q.id}`}
                className="card-lift flex items-center justify-between px-5 py-4 animate-in"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold bg-[var(--accent-light)] text-[var(--accent)]"
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[14.5px] font-semibold text-[var(--text)] line-clamp-2">
                      {q.question}
                    </h3>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span
                        className="text-[11px] px-2 py-0.5 rounded-full"
                        style={{ background: diff.color + '20', color: diff.color }}
                      >
                        {diff.label}
                      </span>
                      {q.tags.map((tag) => (
                        <span key={tag} className="text-[11px] text-[var(--text-muted)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-[var(--text-muted)] ml-3">→</span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="card text-center py-16">
          <p className="text-[var(--text-muted)]">内容正在准备中…</p>
          <p className="text-[var(--text-muted)] text-sm mt-1 opacity-60">敬请期待</p>
        </div>
      )}
    </div>
  );
}
