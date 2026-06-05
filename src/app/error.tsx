'use client';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="text-center py-20">
      <div className="text-5xl mb-4">💥</div>
      <h1 className="text-xl font-bold text-[var(--text)] mb-2">出错了</h1>
      <p className="text-[var(--text-muted)] text-sm mb-6 max-w-md mx-auto">
        {error.message || '页面加载时发生了意外错误'}
      </p>
      <div className="flex gap-3 justify-center">
        <button onClick={reset} className="btn btn-primary">
          重试
        </button>
        <a href="/" className="btn btn-secondary">
          返回首页
        </a>
      </div>
    </div>
  );
}
