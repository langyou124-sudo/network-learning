'use client';

import Link from 'next/link';

const features = [
  { icon: '🧭', title: '知识探索', desc: '多领域知识库，AI智能问答，按需探索学习', href: '/explore' },
  { icon: '📐', title: '网络工程', desc: '从网络基础到运维实战，10大模块循序渐进', href: '/learn' },
  { icon: '✏️', title: '练习与错题', desc: '每课配套练习，错题自动收录，查漏补缺', href: '/quiz' },
  { icon: '📊', title: '学习追踪', desc: '进度、分数、笔记一站式管理', href: '/progress' },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl mb-16 animate-in"
        style={{ background: 'linear-gradient(160deg, #0f1219 0%, #1a2540 40%, #243660 100%)' }}>
        <div className="absolute -top-20 -right-20 w-80 h-80 opacity-10"
          style={{ background: 'radial-gradient(circle, rgba(74,111,165,0.8) 0%, transparent 70%)' }} />
        <div className="absolute -bottom-16 left-1/4 w-60 h-60 opacity-[0.06]"
          style={{ background: 'radial-gradient(circle, rgba(199,146,62,0.8) 0%, transparent 70%)' }} />

        <div className="relative z-10 px-6 sm:px-12 py-14 sm:py-20">
          <p className="text-[13px] tracking-widest uppercase mb-4"
            style={{ color: 'rgba(255,255,255,0.4)' }}>
            Daboli · Smart Learning Platform
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight max-w-xl">
            达博理
          </h1>
          <p className="text-base sm:text-lg mb-10 max-w-md leading-relaxed"
            style={{ color: 'rgba(255,255,255,0.55)' }}>
            AI驱动的智能知识学习平台，<br className="hidden sm:block" />
            从网络工程出发，探索无限知识。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/explore" className="btn btn-primary px-8 py-3 text-[15px]">
              知识探索
            </Link>
            <Link href="/learn" className="btn px-8 py-3 text-[15px]"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.12)' }}>
              网络工程
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

      {/* 底部留白 — 后续可填充推荐、动态、公告等 */}
    </div>
  );
}
