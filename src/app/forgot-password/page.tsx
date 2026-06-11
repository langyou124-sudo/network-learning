'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSent(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-md px-8 py-10 animate-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[var(--text)]">忘记密码</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">输入注册邮箱，我们将发送重置链接</p>
        </div>

        {sent ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--success-bg)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="text-[14px] text-[var(--text)] mb-2">重置链接已发送</p>
            <p className="text-[13px] text-[var(--text-muted)] mb-6">
              已向 <span className="font-medium text-[var(--text)]">{email}</span> 发送密码重置邮件，请查收。
            </p>
            <p className="text-[12px] text-[var(--text-muted)] mb-4">
              没收到？检查垃圾邮件文件夹，或重新发送。
            </p>
            <button
              onClick={() => { setSent(false); }}
              className="btn btn-secondary text-[13px]"
            >
              重新发送
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
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

              {error && <p className="text-[13px] text-[var(--danger)]">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full btn btn-primary py-2.5 text-[14px] disabled:opacity-50"
              >
                {loading ? '发送中...' : '发送重置链接'}
              </button>
            </div>
          </form>
        )}

        <div className="mt-6 text-center text-[13px] text-[var(--text-muted)]">
          <Link href="/login" className="text-[var(--accent)] hover:underline">返回登录</Link>
        </div>
      </div>
    </div>
  );
}
