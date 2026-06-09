import Link from 'next/link';

const features = [
  { icon: '📐', title: '网络工程', desc: '从网络基础到运维实战，10大模块循序渐进', href: '/learn' },
  { icon: '🧭', title: '知识探索', desc: '多领域知识库，AI智能问答，按需探索学习', href: '/explore' },
  { icon: '✏️', title: '练习与错题', desc: '每课配套练习，错题自动收录，查漏补缺', href: '/quiz' },
  { icon: '📊', title: '学习追踪', desc: '进度、分数、笔记一站式管理', href: '/progress' },
];

export default function LandingPage() {
  return (
    <div>
      {/* Hero */}
      <section className="mb-12 animate-in">
        <div className="card px-6 sm:px-10 py-10 sm:py-14">
          <h1 className="text-[28px] sm:text-[32px] font-bold text-[var(--text)] tracking-tight mb-3 leading-tight text-balance">
            达博理
          </h1>
          <p className="text-[15px] sm:text-base text-[var(--text-secondary)] mb-8 max-w-md leading-relaxed">
            AI驱动的智能知识学习平台，从网络工程出发，探索无限知识。
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/learn" className="btn btn-primary px-7 py-2.5 text-[14.5px]">
              开始学习
            </Link>
            <Link href="/explore" className="btn btn-secondary px-7 py-2.5 text-[14.5px]">
              知识探索
            </Link>
          </div>
        </div>
      </section>

      {/* 特性亮点 */}
      <section>
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
    </div>
  );
}
