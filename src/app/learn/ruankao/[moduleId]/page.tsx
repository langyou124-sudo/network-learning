'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getModuleById } from '@/data/courses';
import { getProgress } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function RuankaoModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedTopics(progress.completedTopics);
  }, []);

  const mod = getModuleById(moduleId);

  if (!mod) {
    return (
      <div className="text-center py-16">
        <p className="text-[var(--text-muted)]">模块不存在</p>
        <Link href="/learn/ruankao" className="text-[var(--accent)] text-sm mt-2 inline-block hover:underline">
          返回软考备考
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* 面包屑 */}
      <div className="flex items-center gap-2 text-[13px] text-[var(--text-muted)] mb-5 animate-in">
        <Link href="/learn/ruankao" className="hover:text-[var(--accent)] transition-colors">软考备考</Link>
        <span className="opacity-40">/</span>
        <span className="text-[var(--text)]">{mod.title}</span>
      </div>

      <div className="mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
        <h1 className="text-xl font-bold text-[var(--text)] tracking-tight">{mod.title}</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">{mod.description}</p>
      </div>

      <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.12s' }}>
        <div className="space-y-1">
          {mod.topics.map((topic) => {
            const isCompleted = completedTopics.includes(topic.id);
            return (
              <Link
                key={topic.id}
                href={`/learn/ruankao/${moduleId}/${topic.id}`}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg transition-all duration-150 hover:bg-[var(--bg-warm)] group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    isCompleted
                      ? 'bg-[var(--success-bg)] text-[var(--success)]'
                      : 'bg-[var(--border-light)] text-[var(--text-muted)]'
                  }`}>
                    {isCompleted ? '✓' : '○'}
                  </div>
                  <div>
                    <div className="text-[14px] font-medium text-[var(--text)]">{topic.title}</div>
                    <div className="text-[12px] text-[var(--text-muted)]">{topic.description}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[12px] text-[var(--text-muted)]">
                    {topic.quizzes.length} 题
                  </span>
                  <span className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
