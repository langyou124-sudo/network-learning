'use client';

import { useState, Suspense } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'password' | 'magic'>('password');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handlePasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message === 'Invalid login credentials' ? '邮箱或密码错误' : error.message);
      setLoading(false);
      return;
    }

    window.location.href = redirect;
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });

    if (error) {
      setError(error.message);
    } else {
      setMessage('登录链接已发送到你的邮箱，请查收');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-md px-8 py-10 animate-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[var(--text)]">登录达博理</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">继续你的学习之旅</p>
        </div>

        {/* 登录方式切换 */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => { setMode('password'); setError(''); setMessage(''); }}
            className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              mode === 'password' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            邮箱密码
          </button>
          <button
            onClick={() => { setMode('magic'); setError(''); setMessage(''); }}
            className={`flex-1 py-2 rounded-lg text-[13px] font-medium transition-colors ${
              mode === 'magic' ? 'btn-primary' : 'btn-secondary'
            }`}
          >
            Magic Link
          </button>
        </div>

        <form onSubmit={mode === 'password' ? handlePasswordLogin : handleMagicLink}>
          <div className="space-y-4">
            <div>
              <label className="text-[13px] text-[var(--text-secondary)] mb-1.5 block">邮箱</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full px-4 py-2.5 rounded-xl text-[14px] focus:outline-none"
                style={{ border: '1.5px solid var(--border)', background: 'var(--surface)' }}
              />
            </div>

            {mode === 'password' && (
              <div>
                <label className="text-[13px] text-[var(--text-secondary)] mb-1.5 block">密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="输入密码"
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-[14px] focus:outline-none"
                  style={{ border: '1.5px solid var(--border)', background: 'var(--surface)' }}
                />
              </div>
            )}

            {error && (
              <p className="text-[13px] text-[var(--danger)]">{error}</p>
            )}

            {message && (
              <p className="text-[13px] text-[var(--success)]">{message}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-2.5 text-[14px] disabled:opacity-50"
            >
              {loading ? '处理中...' : mode === 'password' ? '登录' : '发送登录链接'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-[13px] text-[var(--text-muted)]">
          还没有账号？{' '}
          <Link href="/signup" className="text-[var(--accent)] hover:underline">注册</Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
