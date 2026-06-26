'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { marxismModules } from '@/data/marxism';
import { Topic } from '@/types';

export default function MarxismModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;

  const [module, setModule] = useState<{ id: string; title: string; icon: string; description: string } | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const mod = marxismModules.find((m) => m.id === moduleId);
    setModule(mod || null);
    if (mod) {
      setTopics(mod.topics);
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
              {module.description}
            </p>
          </div>
        </div>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-2 gap-4 mb-8 animate-in" style={{ animationDelay: '0.06s' }}>
        <div className="card px-5 py-4 text-center">
          <div className="text-2xl font-bold text-[var(--accent)]">{topics.length}</div>
          <div className="text-[13px] text-[var(--text-muted)]">课题</div>
        </div>
        <div className="card px-5 py-4 text-center">
          <div className="text-2xl font-bold text-[var(--success)]">
            {topics.reduce((sum, t) => sum + t.quizzes.length, 0)}
          </div>
          <div className="text-[13px] text-[var(--text-muted)]">练习题</div>
        </div>
      </div>

      {/* 课题列表 */}
      {topics.length > 0 ? (
        <div className="space-y-3">
          {topics.map((topic, index) => (
            <Link
              key={topic.id}
              href={`/learn/marxism/${moduleId}/topic/${topic.id}`}
              className="card-lift flex items-center justify-between px-5 py-4 animate-in"
              style={{ animationDelay: `${(index + 2) * 0.06}s` }}
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold bg-[var(--accent-light)] text-[var(--accent)]">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-[14.5px] font-semibold text-[var(--text)] line-clamp-1">
                    {topic.title}
                  </h3>
                  <p className="text-[13px] text-[var(--text-muted)] mt-0.5 line-clamp-1">
                    {topic.description}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0 ml-3">
                {topic.quizzes.length > 0 && (
                  <span className="text-[11px] px-2 py-0.5 rounded-full"
                    style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                    {topic.quizzes.length} 题
                  </span>
                )}
                <span className="text-[var(--text-muted)]">→</span>
              </div>
            </Link>
          ))}
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
