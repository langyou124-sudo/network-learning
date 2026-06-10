'use client';

import Link from 'next/link';
import { ruankaoModules } from '@/data/courses';
import { getProgress } from '@/lib/storage';
import { useEffect, useState } from 'react';

// 科目分组
const subjectGroups = [
  {
    id: 'network-engineer',
    title: '网络工程师（中级）',
    icon: '🌐',
    color: '#4a6fa5',
    moduleIds: ['rk-network-basics', 'rk-data-comm', 'rk-network-interconnect'],
  },
  {
    id: 'software-designer',
    title: '软件设计师（中级）',
    icon: '💻',
    color: '#6b8cce',
    moduleIds: ['rk-computer-system', 'rk-programming-lang', 'rk-data-structures'],
  },
];

export default function RuankaoPage() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedTopics(progress.completedTopics);
  }, []);

  return (
    <div>
      <div className="mb-8 animate-in">
        <Link href="/learn" className="text-[13px] text-[var(--accent)] hover:underline">
          ← 返回学习中心
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight mt-3">软考备考</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">覆盖中级/高级软考核心科目</p>
      </div>

      <div className="space-y-8">
        {subjectGroups.map((group, gi) => {
          const groupModules = ruankaoModules.filter(m => group.moduleIds.includes(m.id));
          if (groupModules.length === 0) return null;

          return (
            <section key={group.id} className="animate-in" style={{ animationDelay: `${gi * 0.1}s` }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: `${group.color}18` }}>
                  {group.icon}
                </div>
                <div>
                  <h2 className="text-[16px] font-semibold text-[var(--text)]">{group.title}</h2>
                  <p className="text-[12px] text-[var(--text-muted)]">{groupModules.length} 个模块</p>
                </div>
              </div>

              <div className="space-y-4">
                {groupModules.map((mod, index) => {
                  const completedCount = mod.topics.filter(t =>
                    completedTopics.includes(t.id)
                  ).length;
                  const progressPercent = mod.topics.length > 0
                    ? Math.round((completedCount / mod.topics.length) * 100)
                    : 0;

                  return (
                    <div
                      key={mod.id}
                      className="card-lift overflow-hidden"
                    >
                      <div className="px-6 py-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                              style={{ background: `${group.color}15` }}>
                              {mod.icon}
                            </div>
                            <div>
                              <h3 className="text-[15px] font-semibold text-[var(--text)]">
                                {mod.title}
                              </h3>
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
                                  href={`/learn/ruankao/${mod.id}/${topic.id}`}
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
            </section>
          );
        })}
      </div>

      {/* 底部提示 */}
      <div className="card px-6 py-5 text-center mt-8 animate-in">
        <p className="text-[13px] text-[var(--text-muted)]">
          更多科目持续上线中：系统架构设计师、信息系统项目管理师…
        </p>
      </div>
    </div>
  );
}
