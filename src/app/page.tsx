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
    <div>
      {/* Hero 区 */}
      <div className="gradient-hero rounded-2xl px-8 py-8 mb-8 relative overflow-hidden animate-in">
        {/* 装饰 */}
        <div className="absolute top-0 right-0 w-64 h-64 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(74,111,165,0.8) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 opacity-5"
          style={{ background: 'radial-gradient(circle, rgba(199,146,62,0.8) 0%, transparent 70%)' }} />

        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white tracking-tight mb-1">
            通信知识学习平台
          </h1>
          <p className="text-gray-400 text-sm mb-6">
            网络工程 · 通信工程 · 从零到精通
          </p>

          {/* 统计卡片 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: `${stats.completionRate}%`, label: '学习进度', sub: `${stats.completedCount}/${stats.totalTopics} 课题`, color: '#6b9fff' },
              { value: stats.avgScore || '—', label: '平均分', sub: '测验成绩', color: '#5cc68a' },
              { value: stats.totalMistakes, label: '错题数', sub: `${stats.unreviewedMistakes} 未复习`, color: '#e8a838' },
              { value: `${stats.totalStudyHours}h`, label: '学习时长', sub: '累计', color: '#b088f4' },
            ].map((item, i) => (
              <div
                key={i}
                className="rounded-xl px-5 py-4 animate-in"
                style={{
                  animationDelay: `${(i + 1) * 0.06}s`,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div className="text-2xl font-bold tracking-tight" style={{ color: item.color }}>
                  {item.value}
                </div>
                <div className="text-[13px] text-gray-300 mt-0.5">{item.label}</div>
                <div className="text-[11px] text-gray-500 mt-0.5">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 快速入口 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { href: '/learn', icon: '📚', title: '继续学习', desc: '从上次停止的地方开始', gradient: 'linear-gradient(135deg, #3b5998 0%, #5a7cc2 100%)' },
          { href: '/quiz', icon: '✏️', title: '开始练习', desc: '巩固所学知识', gradient: 'linear-gradient(135deg, #2d8a56 0%, #4aad6e 100%)' },
          { href: '/mistakes', icon: '📝', title: '错题复习', desc: '查漏补缺', gradient: 'linear-gradient(135deg, #c7923e 0%, #e0b06a 100%)' },
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group rounded-xl px-6 py-5 text-white relative overflow-hidden transition-all duration-300 hover:shadow-lg animate-in"
            style={{
              background: item.gradient,
              animationDelay: `${(i + 3) * 0.06}s`,
            }}
          >
            <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity"
              style={{ background: 'radial-gradient(circle, white 0%, transparent 70%)' }} />
            <div className="text-2xl mb-2">{item.icon}</div>
            <div className="font-semibold text-[15px]">{item.title}</div>
            <div className="text-sm opacity-75">{item.desc}</div>
          </Link>
        ))}
      </div>

      {/* 课程模块 */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-[var(--text)]">课程模块</h2>
          <Link href="/learn" className="text-sm text-[var(--accent)] hover:underline">
            查看全部 →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modules.map((mod, i) => (
            <Link
              key={mod.id}
              href={`/learn/${mod.id}`}
              className="card-lift px-5 py-4 animate-in"
              style={{ animationDelay: `${(i + 6) * 0.06}s` }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
                  style={{ background: 'var(--accent-light)' }}>
                  {mod.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14.5px] text-[var(--text)]">{mod.title}</div>
                  <div className="text-[13px] text-[var(--text-muted)] truncate">{mod.description}</div>
                </div>
                <div className="tag tag-blue">{mod.topics.length} 课题</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* 学习建议 */}
      <div
        className="rounded-xl px-6 py-5 animate-in"
        style={{
          background: 'linear-gradient(135deg, var(--gold-light) 0%, var(--accent-light) 100%)',
          border: '1px solid var(--border)',
          animationDelay: '0.72s',
        }}
      >
        <h3 className="font-semibold text-[var(--text)] mb-3 text-[15px]">学习建议</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
          {[
            '每天坚持学习 1-2 个课题，积少成多',
            '学完后做练习题巩固，错题要及时复习',
            '遇到不懂的概念，可以查看参考资料',
            '建议按顺序学习，后面的知识会用到前面的',
          ].map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-[13.5px] text-[var(--text-secondary)]">
              <span className="text-[var(--gold)] mt-0.5">·</span>
              <span>{tip}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
