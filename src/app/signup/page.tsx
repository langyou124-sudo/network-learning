'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function SignupPage() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    if (password.length < 6) {
      setError('密码至少需要 6 个字符');
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: { display_name: nickname.trim() || email.split('@')[0] },
      },
    });

    if (error) {
      setError(error.message === 'User already registered' ? '该邮箱已注册，请直接登录' : error.message);
    } else {
      setMessage('注册成功！请检查邮箱完成验证，或直接登录');
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
          <h1 className="text-xl font-bold text-[var(--text)]">注册达博理</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">开始你的学习之旅</p>
        </div>

        <form onSubmit={handleSignup}>
          <div className="space-y-4">
            <div>
              <label className="text-[13px] text-[var(--text-secondary)] mb-1.5 block">昵称</label>
              <input
                type="text"
                value={nickname}
                onChange={e => setNickname(e.target.value)}
                placeholder="给自己起个名字"
                className="w-full px-4 py-2.5 rounded-xl text-[14px] focus:outline-none"
                style={{ border: '1.5px solid var(--border)', background: 'var(--surface)' }}
              />
            </div>

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

            <div>
              <label className="text-[13px] text-[var(--text-secondary)] mb-1.5 block">密码</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="至少 6 个字符"
                required
                className="w-full px-4 py-2.5 rounded-xl text-[14px] focus:outline-none"
                style={{ border: '1.5px solid var(--border)', background: 'var(--surface)' }}
              />
            </div>

            {error && <p className="text-[13px] text-[var(--danger)]">{error}</p>}
            {message && <p className="text-[13px] text-[var(--success)]">{message}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-2.5 text-[14px] disabled:opacity-50"
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </div>
        </form>

        <div className="mt-6 text-center text-[13px] text-[var(--text-muted)]">
          已有账号？{' '}
          <Link href="/login" className="text-[var(--accent)] hover:underline">登录</Link>
        </div>
      </div>
    </div>
  );
}
