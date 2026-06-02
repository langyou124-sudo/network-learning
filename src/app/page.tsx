'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { modules } from '@/data/courses';
import { getStats } from '@/lib/storage';

export default function Home() {
  const [stats, setStats] = useState({
    completedCount: 0,
    totalTopics: 43,
    completionRate: 0,
    avgScore: 0,
    totalMistakes: 0,
    unreviewedMistakes: 0,
    totalStudyHours: 0,
  });

  useEffect(() => {
    setStats(getStats());
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">通信知识学习平台</h1>
        <p className="text-gray-600 mt-2">网络工程 · 通信工程 · 系统学习</p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-blue-600">{stats.completionRate}%</div>
          <div className="text-sm text-gray-500 mt-1">学习进度</div>
          <div className="text-xs text-gray-400">{stats.completedCount}/{stats.totalTopics} 课题</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-green-600">{stats.avgScore}</div>
          <div className="text-sm text-gray-500 mt-1">平均分</div>
          <div className="text-xs text-gray-400">测验成绩</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-orange-600">{stats.totalMistakes}</div>
          <div className="text-sm text-gray-500 mt-1">错题数</div>
          <div className="text-xs text-gray-400">{stats.unreviewedMistakes} 未复习</div>
        </div>
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="text-3xl font-bold text-purple-600">{stats.totalStudyHours}h</div>
          <div className="text-sm text-gray-500 mt-1">学习时长</div>
          <div className="text-xs text-gray-400">累计</div>
        </div>
      </div>

      {/* 快速入口 */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Link href="/learn" className="bg-blue-600 text-white rounded-xl p-6 hover:bg-blue-700 transition-colors">
          <div className="text-2xl mb-2">📚</div>
          <div className="font-semibold">继续学习</div>
          <div className="text-sm text-blue-100">从上次停止的地方开始</div>
        </Link>
        <Link href="/quiz" className="bg-green-600 text-white rounded-xl p-6 hover:bg-green-700 transition-colors">
          <div className="text-2xl mb-2">✏️</div>
          <div className="font-semibold">开始练习</div>
          <div className="text-sm text-green-100">巩固所学知识</div>
        </Link>
        <Link href="/mistakes" className="bg-orange-600 text-white rounded-xl p-6 hover:bg-orange-700 transition-colors">
          <div className="text-2xl mb-2">📝</div>
          <div className="font-semibold">错题复习</div>
          <div className="text-sm text-orange-100">查漏补缺</div>
        </Link>
      </div>

      {/* 课程模块 */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">课程模块</h2>
        <div className="grid grid-cols-2 gap-4">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              href={`/learn/${mod.id}`}
              className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{mod.icon}</span>
                <div>
                  <div className="font-semibold text-gray-900">{mod.title}</div>
                  <div className="text-sm text-gray-500">{mod.description}</div>
                  <div className="text-xs text-gray-400 mt-1">
                    {mod.topics.length} 个课题
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 学习建议 */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
        <h3 className="font-semibold text-gray-900 mb-2">💡 学习建议</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• 每天坚持学习 1-2 个课题，积少成多</li>
          <li>• 学完后做练习题巩固，错题要及时复习</li>
          <li>• 遇到不懂的概念，可以查看参考资料</li>
          <li>• 建议按顺序学习，后面的知识会用到前面的</li>
        </ul>
      </div>
    </div>
  );
}
