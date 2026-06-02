'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getMistakes, markMistakeReviewed } from '@/lib/storage';
import { MistakeRecord } from '@/types';

export default function MistakesPage() {
  const [mistakes, setMistakes] = useState<MistakeRecord[]>([]);
  const [filter, setFilter] = useState<'all' | 'unreviewed' | 'reviewed'>('all');

  useEffect(() => {
    setMistakes(getMistakes());
  }, []);

  const handleMarkReviewed = (quizId: string) => {
    markMistakeReviewed(quizId);
    setMistakes(prev => prev.map(m =>
      m.quizId === quizId ? { ...m, reviewed: true } : m
    ));
  };

  const filteredMistakes = mistakes.filter(m => {
    if (filter === 'unreviewed') return !m.reviewed;
    if (filter === 'reviewed') return m.reviewed;
    return true;
  });

  const unreviewedCount = mistakes.filter(m => !m.reviewed).length;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">错题本</h1>
        <p className="text-gray-600 mt-2">复习做错的题目，查漏补缺</p>
      </div>

      {/* 统计 */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-orange-600">{mistakes.length}</div>
          <div className="text-sm text-gray-500">总错题数</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-red-600">{unreviewedCount}</div>
          <div className="text-sm text-gray-500">未复习</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm text-center">
          <div className="text-2xl font-bold text-green-600">{mistakes.length - unreviewedCount}</div>
          <div className="text-sm text-gray-500">已复习</div>
        </div>
      </div>

      {/* 筛选 */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'all' as const, label: '全部' },
          { key: 'unreviewed' as const, label: '未复习' },
          { key: 'reviewed' as const, label: '已复习' },
        ].map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* 错题列表 */}
      {filteredMistakes.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <div className="text-4xl mb-4">{mistakes.length === 0 ? '🎉' : '📝'}</div>
          <p className="text-gray-500 text-lg">
            {mistakes.length === 0 ? '还没有错题，继续保持！' : '没有符合条件的错题'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMistakes.map((mistake, index) => (
            <div
              key={`${mistake.quizId}-${index}`}
              className={`bg-white rounded-xl p-6 shadow-sm border-l-4 ${
                mistake.reviewed ? 'border-green-400' : 'border-red-400'
              }`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    mistake.reviewed
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {mistake.reviewed ? '已复习' : '未复习'}
                  </span>
                  <span className="text-xs text-gray-400">{mistake.date}</span>
                </div>
                <Link
                  href={`/learn/${mistake.topicId.split('-').slice(0, 2).join('-')}/${mistake.topicId}`}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  返回课题 →
                </Link>
              </div>

              <p className="font-medium text-gray-900 mb-3">{mistake.question}</p>

              <div className="grid grid-cols-2 gap-4 mb-3">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-xs text-red-600 font-medium mb-1">你的答案</div>
                  <div className="text-sm text-red-700">
                    {Array.isArray(mistake.userAnswer) ? mistake.userAnswer.join(', ') : mistake.userAnswer}
                  </div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-xs text-green-600 font-medium mb-1">正确答案</div>
                  <div className="text-sm text-green-700">
                    {Array.isArray(mistake.correctAnswer) ? mistake.correctAnswer.join(', ') : mistake.correctAnswer}
                  </div>
                </div>
              </div>

              {!mistake.reviewed && (
                <div className="flex justify-end">
                  <button
                    onClick={() => handleMarkReviewed(mistake.quizId)}
                    className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                  >
                    标记已复习
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
