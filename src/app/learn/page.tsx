import Link from 'next/link';
import { subjects } from '@/data/subjects';

export default function LearnPage() {
  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">学习中心</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">选择学科方向开始学习</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {subjects.map((subject, i) => (
          <Link
            key={subject.id}
            href={subject.status === 'active' ? subject.href : '#'}
            className={`card-lift px-6 py-6 animate-in block ${subject.status === 'coming' ? 'opacity-60 pointer-events-none' : ''}`}
            style={{ animationDelay: `${i * 0.06}s` }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: 'var(--accent-light)' }}>
                {subject.icon}
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[var(--text)]">{subject.title}</h2>
                <p className="text-[13px] text-[var(--text-muted)] mt-0.5">{subject.description}</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[12px] text-[var(--text-muted)]">
                {subject.status === 'active' ? `${subject.moduleCount} 个模块` : '即将上线'}
              </span>
              {subject.status === 'active' ? (
                <span className="text-[var(--accent)] text-[13px]">开始学习 →</span>
              ) : (
                <span className="tag tag-gold">敬请期待</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
