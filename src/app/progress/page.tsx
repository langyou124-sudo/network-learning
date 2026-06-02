'use client';

import { useEffect, useState } from 'react';
import { modules } from '@/data/courses';
import { getProgress, getStats } from '@/lib/storage';
import { Progress } from '@/types';

export default function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    setStats(getStats());
  }, []);

  if (!progress || !stats) return null;

  const getTopicScore = (topicId: string) => {
    const score = progress.quizScores[topicId];
    if (!score) return null;
    return Math.round((score.correct / score.total) * 100);
  };

  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">学习进度</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">查看学习情况和成绩统计</p>
      </div>

      {/* 总览卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-8 animate-in" style={{ animationDelay: '0.06s' }}>
        {[
          { value: `${stats.completionRate}%`, label: '完成率', sub: `${stats.completedCount}/${stats.totalTopics}`, color: 'var(--accent)' },
          { value: stats.avgScore || '—', label: '平均分', sub: '满分100', color: 'var(--success)' },
          { value: stats.totalMistakes, label: '错题数', sub: `${stats.unreviewedMistakes} 未复习`, color: 'var(--warning)' },
          { value: `${progress.totalStudyHours}h`, label: '学习时长', sub: '累计', color: '#b088f4' },
        ].map((s, i) => (
          <div key={i} className="card px-5 py-4 text-center">
            <div className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</div>
            <div className="text-[13px] text-[var(--text-muted)]">{s.label}</div>
            <div className="text-[11px] text-[var(--text-muted)] opacity-60">{s.sub}</div>
          </div>
        ))}
      </div>

      {/* 总进度条 */}
      <div className="card px-6 py-5 mb-8 animate-in" style={{ animationDelay: '0.12s' }}>
        <h2 className="text-[15px] font-semibold text-[var(--text)] mb-4">总体进度</h2>
        <div className="progress-bar h-3 mb-2">
          <div className="progress-bar-fill" style={{ width: `${stats.completionRate}%` }} />
        </div>
        <div className="text-[13px] text-[var(--text-muted)] text-right">
          {stats.completedCount} / {stats.totalTopics} 课题已完成
        </div>
      </div>

      {/* 各模块详情 */}
      <div className="space-y-4 mb-8">
        <h2 className="text-[15px] font-semibold text-[var(--text)] animate-in" style={{ animationDelay: '0.18s' }}>模块详情</h2>
        {modules.map((mod, idx) => {
          const completedInModule = mod.topics.filter(t =>
            progress.completedTopics.includes(t.id)
          ).length;
          const pct = mod.topics.length > 0
            ? Math.round((completedInModule / mod.topics.length) * 100)
            : 0;

          const moduleScores = mod.topics
            .map(t => progress.quizScores[t.id])
            .filter(Boolean);
          const moduleAvg = moduleScores.length > 0
            ? Math.round(moduleScores.reduce((s, sc) => s + (sc.correct / sc.total * 100), 0) / moduleScores.length)
            : null;

          return (
            <div key={mod.id} className="card px-6 py-5 animate-in" style={{ animationDelay: `${(idx + 4) * 0.06}s` }}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-base"
                    style={{ background: 'var(--accent-light)' }}>
                    {mod.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-[14.5px] text-[var(--text)]">{mod.title}</h3>
                    <p className="text-[12px] text-[var(--text-muted)]">{completedInModule}/{mod.topics.length} 完成</p>
                  </div>
                </div>
                {moduleAvg !== null && (
                  <div className="text-lg font-bold" style={{
                    color: moduleAvg >= 80 ? 'var(--success)' : moduleAvg >= 60 ? 'var(--warning)' : 'var(--danger)'
                  }}>
                    {moduleAvg}分
                  </div>
                )}
              </div>
              <div className="progress-bar mb-3">
                <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
              </div>

              {mod.topics.length > 0 && (
                <div className="space-y-1.5">
                  {mod.topics.map(topic => {
                    const isCompleted = progress.completedTopics.includes(topic.id);
                    const score = getTopicScore(topic.id);
                    return (
                      <div key={topic.id} className="flex items-center justify-between py-1 text-[13.5px]">
                        <div className="flex items-center gap-2">
                          <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] ${
                            isCompleted
                              ? 'bg-[var(--success-bg)] text-[var(--success)]'
                              : 'bg-[var(--border-light)] text-[var(--text-muted)]'
                          }`}>
                            {isCompleted ? '✓' : '○'}
                          </span>
                          <span className={isCompleted ? 'text-[var(--text)]' : 'text-[var(--text-muted)]'}>
                            {topic.title}
                          </span>
                        </div>
                        {score !== null && (
                          <span className="font-medium" style={{
                            color: score >= 80 ? 'var(--success)' : score >= 60 ? 'var(--warning)' : 'var(--danger)'
                          }}>
                            {score}分
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 学习记录 */}
      <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.6s' }}>
        <h2 className="text-[15px] font-semibold text-[var(--text)] mb-3">学习记录</h2>
        <div className="text-[13.5px] text-[var(--text-secondary)] space-y-1">
          <p>最后学习：{progress.lastStudyDate || '暂无记录'}</p>
          <p>已保存笔记：{Object.keys(progress.notes).filter(k => progress.notes[k]).length} 篇</p>
        </div>
      </div>
    </div>
  );
}
