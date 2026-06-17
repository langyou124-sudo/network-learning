import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">🔍</div>
      <h1 className="text-xl font-bold text-[var(--text)] mb-2">页面不存在</h1>
      <p className="text-[var(--text-muted)] text-sm mb-6">
        你访问的页面不存在或已被移除
      </p>
      <Link href="/" className="btn btn-primary">
        返回首页
      </Link>
    </div>
  );
}
