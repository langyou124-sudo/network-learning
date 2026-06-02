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
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">练习题</h1>
        <p className="text-gray-600 mt-2">选择课题开始练习，巩固所学知识</p>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-blue-600">{topics.length}</div>
          <div className="text-sm text-gray-500">总练习题数</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">{attemptedCount}</div>
          <div className="text-sm text-gray-500">已尝试</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">{lowScoreCount}</div>
          <div className="text-sm text-gray-500">需加强</div>
        </div>
      </div>

      {/* 筛选 */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all' as const, label: '全部' },
          { key: 'unattempted' as const, label: '未尝试' },
          { key: 'low-score' as const, label: '低于80分' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 课题列表 */}
      <div className="space-y-3">
        {filteredTopics.map(topic => {
          const scorePct = getScorePercent(topic.id);
          const module = modules.find(m => m.id === topic.moduleId);

          return (
            <Link
              key={topic.id}
              href={`/learn/${topic.moduleId}/${topic.id}?tab=quiz`}
              className="block bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-500 rounded">
                      {module?.title}
                    </span>
                    <span className="text-xs text-gray-400">{topic.quizzes.length} 题</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{topic.title}</h3>
                </div>
                <div className="flex items-center gap-3">
                  {scorePct !== null ? (
                    <div className="text-right">
                      <div className={`text-lg font-bold ${
                        scorePct >= 80 ? 'text-green-600' : scorePct >= 60 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {scorePct}分
                      </div>
                      <div className="text-xs text-gray-400">
                        {quizScores[topic.id].correct}/{quizScores[topic.id].total} 正确
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">未作答</span>
                  )}
                  <span className="text-gray-400">→</span>
                </div>
              </div>
            </Link>
          );
        })}

        {filteredTopics.length === 0 && (
          <div className="bg-white rounded-xl p-12 text-center shadow-sm">
            <p className="text-gray-500">没有符合条件的练习题</p>
          </div>
        )}
      </div>
    </div>
  );
}
