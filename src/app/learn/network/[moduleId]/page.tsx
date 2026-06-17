'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { getModuleById } from '@/data/courses';
import { getProgress } from '@/lib/storage';
import { Module } from '@/types';

export default function ModulePage() {
  const params = useParams();
  const moduleId = params.moduleId as string;
  const [module, setModule] = useState<Module | null>(null);
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const loadData = () => {
      const mod = getModuleById(moduleId);
      setModule(mod || null);
      const progress = getProgress();
      setCompletedTopics(progress.completedTopics);
    };
    loadData();
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
        <Link href="/learn/network" className="text-[13px] text-[var(--accent)] hover:underline">
          ← 返回网络工程
        </Link>
        <div className="flex items-center gap-3 mt-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
            style={{ background: 'var(--accent-light)' }}>
            {module.icon}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">{module.title}</h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{module.description}</p>
          </div>
        </div>
      </div>

      {module.topics.length > 0 ? (
        <div className="space-y-3">
          {module.topics.map((topic, index) => {
            const isCompleted = completedTopics.includes(topic.id);
            return (
              <Link
                key={topic.id}
                href={`/learn/network/${moduleId}/${topic.id}`}
                className="card-lift flex items-center justify-between px-5 py-4 animate-in"
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold ${
                    isCompleted
                      ? 'bg-[var(--success-bg)] text-[var(--success)]'
                      : 'bg-[var(--accent-light)] text-[var(--accent)]'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <div>
                    <h3 className="text-[14.5px] font-semibold text-[var(--text)]">{topic.title}</h3>
                    <p className="text-[13px] text-[var(--text-muted)]">{topic.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] text-[var(--text-muted)]">
                    {topic.quizzes.length} 道练习题
                  </span>
                  <span className="text-[var(--text-muted)]">→</span>
                </div>
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
