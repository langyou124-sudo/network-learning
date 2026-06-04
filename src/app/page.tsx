'use client';

import Link from 'next/link';
import { modules } from '@/data/courses';

const features = [
  { icon: '📐', title: '系统化课程', desc: '从网络基础到运维实战，10大模块循序渐进', href: '/learn' },
  { icon: '🧩', title: '交互式图表', desc: 'OSI模型、拓扑结构、加密流程可视化呈现', href: '/diagrams' },
  { icon: '✏️', title: '练习与错题', desc: '每课配套练习，错题自动收录，查漏补缺', href: '/quiz' },
  { icon: '📊', title: '学习追踪', desc: '进度、分数、笔记一站式管理', href: '/progress' },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mb-16 animate-in"
        style={{ background: 'linear-gradient(160deg, #0f1219 0%, #1a2540 40%, #243660 100%)' }}>
        {/* 装饰光晕 */}
        <div className="absolute -top-20 -right-20 w-80 h-80 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(74,111,165,0.8) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 left-1/4 w-60 h-60 opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, rgba(199,146,62,0.8) 0%, transparent 70%)' }} />

        <div className="relative z-10 px-6 sm:px-12 py-14 sm:py-20">
          <p className="text-[13px] tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            Network Engineering · Telecommunications
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight max-w-xl">
            通信知识学习平台
          </h1>
          <p className="text-base sm:text-lg mb-10 max-w-md leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            网络工程与通信工程系统化学习，<br className="hidden sm:block" />
            从零基础到独立掌握核心知识。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn" className="btn btn-primary px-8 py-3 text-[15px]">
              开始学习
            </Link>
            <Link href="/quiz" className="btn px-8 py-3 text-[15px]"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.12)' }}>
              练习题库
            </Link>
          </div>
        </div>
      </section>

      {/* 特性亮点 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <Link key={i} href={f.href} className="card-lift px-5 py-5 animate-in block" style={{ animationDelay: `${(i + 1) * 0.06}s` }}>
              <div className="text-xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-[14.5px] text-[var(--text)] mb-1">{f.title}</h3>
              <p className="text-[13px] text-[var(--text-muted)] leading-relaxed">{f.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 课程模块 */}
      <section className="mb-16">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold text-[var(--text)] tracking-tight">课程模块</h2>
            <p className="text-[13px] text-[var(--text-muted)] mt-1">10 大模块 · 43 个课题 · 覆盖核心知识体系</p>
          </div>
          <Link href="/learn" className="text-[13px] text-[var(--accent)] hover:underline hidden sm:block">
            查看全部 →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod, i) => (
            <Link
              key={mod.id}
              href={`/learn/${mod.id}`}
              className="card-lift px-5 py-5 animate-in"
              style={{ animationDelay: `${(i + 2) * 0.06}s` }}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                  style={{ background: 'var(--accent-light)' }}>
                  {mod.icon}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-[14.5px] text-[var(--text)] mb-0.5">{mod.title}</h3>
                  <p className="text-[13px] text-[var(--text-muted)] leading-relaxed line-clamp-2">{mod.description}</p>
                  <span className="inline-block mt-2 text-[12px] text-[var(--accent)]">{mod.topics.length} 个课题</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 底部留白区域 — 后续可填充推荐、动态、公告等 */}
    </div>
  );
}
