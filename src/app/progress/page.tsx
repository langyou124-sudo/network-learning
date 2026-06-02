'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { modules, getAllTopics } from '@/data/courses';
import { getProgress, getStats } from '@/lib/storage';
import { Progress, Topic } from '@/types';

export default function ProgressPage() {
  const [progress, setProgress] = useState<Progress | null>(null);
  const [stats, setStats] = useState<ReturnType<typeof getStats> | null>(null);

  useEffect(() => {
    setProgress(getProgress());
    setStats(getStats());
  }, []);

  if (!progress || !stats) return null;

  const allTopics = getAllTopics();

  const getTopicScore = (topicId: string) => {
    const score = progress.quizScores[topicId];
    if (!score) return null;
    return Math.round((score.correct / score.total) * 100);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">学习进度</h1>
        <p className="text-gray-600 mt-2">查看你的学习情况和成绩统计</p>
      </div>

      {/* 总览卡片 */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-blue-600">{stats.completionRate}%</div>
          <div className="text-sm text-gray-500 mt-1">完成率</div>
          <div className="text-xs text-gray-400">{stats.completedCount}/{stats.totalTopics} 课题</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-green-600">{stats.avgScore}</div>
          <div className="text-sm text-gray-500 mt-1">平均分</div>
          <div className="text-xs text-gray-400">满分100</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-orange-600">{stats.totalMistakes}</div>
          <div className="text-sm text-gray-500 mt-1">错题数</div>
          <div className="text-xs text-gray-400">{stats.unreviewedMistakes} 未复习</div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm text-center">
          <div className="text-3xl font-bold text-purple-600">{progress.totalStudyHours}h</div>
          <div className="text-sm text-gray-500 mt-1">学习时长</div>
          <div className="text-xs text-gray-400">累计</div>
        </div>
      </div>

      {/* 整体进度条 */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">总体进度</h2>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
          <div
            className="bg-blue-600 h-4 rounded-full transition-all"
            style={{ width: `${stats.completionRate}%` }}
          />
        </div>
        <div className="text-sm text-gray-500 text-right">
          {stats.completedCount} / {stats.totalTopics} 课题已完成
        </div>
      </div>

      {/* 各模块进度 */}
      <div className="space-y-4 mb-8">
        <h2 className="text-lg font-semibold text-gray-900">模块详情</h2>
        {modules.map(mod => {
          const completedInModule = mod.topics.filter(t =>
            progress.completedTopics.includes(t.id)
          ).length;
          const pct = mod.topics.length > 0
            ? Math.round((completedInModule / mod.topics.length) * 100)
            : 0;

          // 计算模块平均分
          const moduleScores = mod.topics
            .map(t => progress.quizScores[t.id])
            .filter(Boolean);
          const moduleAvg = moduleScores.length > 0
            ? Math.round(moduleScores.reduce((s, sc) => s + (sc.correct / sc.total * 100), 0) / moduleScores.length)
            : null;

          return (
            <div key={mod.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{mod.icon}</span>
                  <div>
                    <h3 className="font-semibold text-gray-900">{mod.title}</h3>
                    <p className="text-sm text-gray-500">{completedInModule}/{mod.topics.length} 完成</p>
                  </div>
                </div>
                {moduleAvg !== null && (
                  <div className={`text-lg font-bold ${
                    moduleAvg >= 80 ? 'text-green-600' : moduleAvg >= 60 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {moduleAvg}分
                  </div>
                )}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>

              {/* 课题详情 */}
              {mod.topics.length > 0 && (
                <div className="mt-4 space-y-2">
                  {mod.topics.map(topic => {
                    const isCompleted = progress.completedTopics.includes(topic.id);
                    const score = getTopicScore(topic.id);
                    return (
                      <div key={topic.id} className="flex items-center justify-between py-1.5 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={isCompleted ? 'text-green-500' : 'text-gray-300'}>
                            {isCompleted ? '●' : '○'}
                          </span>
                          <span className={isCompleted ? 'text-gray-900' : 'text-gray-500'}>
                            {topic.title}
                          </span>
                        </div>
                        {score !== null && (
                          <span className={`font-medium ${
                            score >= 80 ? 'text-green-600' : score >= 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}>
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

      {/* 最近学习 */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">学习记录</h2>
        <div className="text-sm text-gray-600">
          <p>最后学习日期：{progress.lastStudyDate || '暂无记录'}</p>
          <p className="mt-2">已保存笔记：{Object.keys(progress.notes).filter(k => progress.notes[k]).length} 篇</p>
        </div>
      </div>
    </div>
  );
}
