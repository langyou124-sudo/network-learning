'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { modules, getAllTopics } from '@/data/courses';
import { getProgress } from '@/lib/storage';
import { Topic } from '@/types';

export default function QuizPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [quizScores, setQuizScores] = useState<Record<string, { correct: number; total: number; date: string }>>({});
  const [filter, setFilter] = useState<'all' | 'unattempted' | 'low-score'>('all');

  useEffect(() => {
    const allTopics = getAllTopics().filter(t => t.quizzes.length > 0);
    setTopics(allTopics);
    const progress = getProgress();
    setQuizScores(progress.quizScores);
  }, []);

  const getScorePercent = (topicId: string) => {
    const score = quizScores[topicId];
    if (!score) return null;
    return Math.round((score.correct / score.total) * 100);
  };

  const filteredTopics = topics.filter(topic => {
    if (filter === 'unattempted') return !quizScores[topic.id];
    if (filter === 'low-score') {
      const pct = getScorePercent(topic.id);
      return pct !== null && pct < 80;
    }
    return true;
  });

  const attemptedCount = topics.filter(t => quizScores[t.id]).length;
  const lowScoreCount = topics.filter(t => {
    const pct = getScorePercent(t.id);
    return pct !== null && pct < 80;
  }).length;

  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">练习题</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">选择课题开始练习</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 animate-in" style={{ animationDelay: '0.06s' }}>
        {[
          { value: topics.length, label: '总练习题', color: 'var(--accent)' },
          { value: attemptedCount, label: '已尝试', color: 'var(--success)' },
          { value: lowScoreCount, label: '需加强', color: 'var(--warning)' },
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
          { key: 'unattempted' as const, label: '未尝试' },
          { key: 'low-score' as const, label: '低于80分' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`btn ${filter === f.key ? 'btn-primary' : 'btn-secondary'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filteredTopics.map((topic, idx) => {
          const scorePct = getScorePercent(topic.id);
          const module = modules.find(m => m.id === topic.moduleId);

          return (
            <Link
              key={topic.id}
              href={`/learn/${topic.moduleId}/${topic.id}?tab=quiz`}
              className="card-lift flex items-center justify-between px-5 py-4 animate-in"
              style={{ animationDelay: `${(idx + 3) * 0.06}s` }}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="tag tag-blue">{module?.title}</span>
                  <span className="text-[12px] text-[var(--text-muted)]">{topic.quizzes.length} 题</span>
                </div>
                <h3 className="font-semibold text-[14.5px] text-[var(--text)]">{topic.title}</h3>
              </div>
              <div className="flex items-center gap-3">
                {scorePct !== null ? (
                  <div className="text-right">
                    <div className="text-lg font-bold" style={{
                      color: scorePct >= 80 ? 'var(--success)' : scorePct >= 60 ? 'var(--warning)' : 'var(--danger)'
                    }}>
                      {scorePct}分
                    </div>
                    <div className="text-[12px] text-[var(--text-muted)]">
                      {quizScores[topic.id].correct}/{quizScores[topic.id].total}
                    </div>
                  </div>
                ) : (
                  <span className="text-[13px] text-[var(--text-muted)]">未作答</span>
                )}
                <span className="text-[var(--text-muted)]">→</span>
              </div>
            </Link>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-[var(--text-muted)]">没有符合条件的练习题</p>
          </div>
        )}
      </div>
    </div>
  );
}
