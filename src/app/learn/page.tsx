'use client';

import Link from 'next/link';
import { modules } from '@/data/courses';
import { getProgress } from '@/lib/storage';
import { useEffect, useState } from 'react';

export default function LearnPage() {
  const [completedTopics, setCompletedTopics] = useState<string[]>([]);

  useEffect(() => {
    const progress = getProgress();
    setCompletedTopics(progress.completedTopics);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">知识库</h1>
        <p className="text-gray-600 mt-2">选择模块开始学习</p>
      </div>

      <div className="space-y-6">
        {modules.map((mod, index) => {
          const completedCount = mod.topics.filter(t =>
            completedTopics.includes(t.id)
          ).length;
          const progressPercent = mod.topics.length > 0
            ? Math.round((completedCount / mod.topics.length) * 100)
            : 0;

          return (
            <div key={mod.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{mod.icon}</span>
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        模块 {index + 1}：{mod.title}
                      </h2>
                      <p className="text-sm text-gray-500">{mod.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-600">
                      {completedCount}/{mod.topics.length} 完成
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>

                {mod.topics.length > 0 ? (
                  <div className="space-y-2">
                    {mod.topics.map((topic) => {
                      const isCompleted = completedTopics.includes(topic.id);
                      return (
                        <Link
                          key={topic.id}
                          href={`/learn/${mod.id}/${topic.id}`}
                          className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                              isCompleted
                                ? 'bg-green-100 text-green-600'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {isCompleted ? '✓' : '○'}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{topic.title}</div>
                              <div className="text-sm text-gray-500">{topic.description}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400">
                              {topic.quizzes.length} 题
                            </span>
                            <span className="text-gray-400">→</span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400">
                    <p>内容正在准备中...</p>
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
