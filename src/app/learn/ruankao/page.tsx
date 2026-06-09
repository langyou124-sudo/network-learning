import Link from 'next/link';

export default function RuankaoPage() {
  return (
    <div>
      <div className="mb-8 animate-in">
        <Link href="/learn" className="text-[13px] text-[var(--accent)] hover:underline">
          ← 返回学习中心
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight mt-3">软考备考</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">覆盖初级/中级/高级全级别软考科目</p>
      </div>

      <div className="card text-center py-16 animate-in">
        <div className="text-4xl mb-4">📝</div>
        <h2 className="text-lg font-semibold text-[var(--text)] mb-2">内容即将上线</h2>
        <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
          软考备考内容正在紧锣密鼓地准备中，首批将覆盖网络工程师、软件设计师、系统架构设计师三个科目。
        </p>
        <Link href="/learn/network" className="btn btn-primary mt-6 inline-flex">
          先学习网络工程 →
        </Link>
      </div>
    </div>
  );
}
