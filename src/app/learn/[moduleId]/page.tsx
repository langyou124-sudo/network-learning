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
    const mod = getModuleById(moduleId);
    setModule(mod || null);
    const progress = getProgress();
    setCompletedTopics(progress.completedTopics);
  }, [moduleId]);

  if (!module) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <p className="text-gray-500">模块不存在</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/learn" className="text-blue-600 hover:text-blue-700 text-sm">
          ← 返回知识库
        </Link>
        <h1 className="text-3xl font-bold text-gray-900 mt-2">
          {module.icon} {module.title}
        </h1>
        <p className="text-gray-600 mt-2">{module.description}</p>
      </div>

      {module.topics.length > 0 ? (
        <div className="space-y-4">
          {module.topics.map((topic, index) => {
            const isCompleted = completedTopics.includes(topic.id);
            return (
              <Link
                key={topic.id}
                href={`/learn/${moduleId}/${topic.id}`}
                className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg font-semibold ${
                      isCompleted
                        ? 'bg-green-100 text-green-600'
                        : 'bg-blue-100 text-blue-600'
                    }`}>
                      {isCompleted ? '✓' : index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{topic.title}</h3>
                      <p className="text-sm text-gray-500">{topic.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">
                      {topic.quizzes.length} 道练习题
                    </span>
                    <span className="text-gray-400">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 text-center shadow-sm">
          <p className="text-gray-500 text-lg">内容正在准备中...</p>
          <p className="text-gray-400 text-sm mt-2">敬请期待</p>
        </div>
      )}
    </div>
  );
}
