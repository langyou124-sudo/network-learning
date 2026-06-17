'use client';

import Link from 'next/link';
import { networkModules } from '@/data/courses';
import { getProgress } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function LearnPage() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const loadData = () => {
      const progress = getProgress();
      setCompletedTopics(progress.completedTopics);
    };
    loadData();
  }, []);

  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">网络工程</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">选择模块开始学习</p>
      </div>

      <div className="space-y-5">
        {networkModules.map((mod, index) => {
          const completedCount = mod.topics.filter(t =>
            completedTopics.includes(t.id)
          ).length;
          const progressPercent = mod.topics.length > 0
            ? Math.round((completedCount / mod.topics.length) * 100)
            : 0;

          return (
            <div
              key={mod.id}
              className="card-lift overflow-hidden animate-in"
              style={{ animationDelay: `${index * 0.06}s` }}
            >
              <div className="px-6 py-5">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                      style={{ background: 'var(--accent-light)' }}>
                      {mod.icon}
                    </div>
                    <div>
                      <h2 className="text-[15px] font-semibold text-[var(--text)]">
                        模块 {index + 1}：{mod.title}
                      </h2>
                      <p className="text-[13px] text-[var(--text-muted)]">{mod.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[13px] font-medium text-[var(--text-secondary)]">
                      {completedCount}/{mod.topics.length}
                    </div>
                    <div className="progress-bar w-20 mt-1.5">
                      <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
                    </div>
                  </div>
                </div>

                {mod.topics.length > 0 ? (
                  <div className="space-y-1">
                    {mod.topics.map((topic) => {
                      const isCompleted = completedTopics.includes(topic.id);
                      return (
                        <Link
                          key={topic.id}
                          href={`/learn/network/${mod.id}/${topic.id}`}
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
