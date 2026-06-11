'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { validatePassword } from '@/lib/validate';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const validation = validatePassword(password);
    if (!validation.valid) {
      setError(validation.error);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('两次输入的密码不一致');
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message === 'New password should be different from the old password'
        ? '新密码不能与旧密码相同' : error.message);
    } else {
      setSuccess(true);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-md px-8 py-10 animate-in">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-[var(--text)]">重置密码</h1>
          <p className="text-[13px] text-[var(--text-muted)] mt-1">设置你的新密码</p>
        </div>

        {success ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--success-bg)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <p className="text-[14px] text-[var(--text)] mb-2">密码已重置</p>
            <p className="text-[13px] text-[var(--text-muted)] mb-6">现在可以用新密码登录了。</p>
            <Link href="/login" className="btn btn-primary text-[14px]">
              前往登录
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="text-[13px] text-[var(--text-secondary)] mb-1.5 block">新密码</label>
                <input
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="6-64个字符，仅限英文、数字和符号"
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-[14px] focus:outline-none"
                  style={{ border: '1.5px solid var(--border)', background: 'var(--surface)' }}
                />
              </div>

              <div>
                <label className="text-[13px] text-[var(--text-secondary)] mb-1.5 block">确认密码</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="再次输入新密码"
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
                {loading ? '重置中...' : '重置密码'}
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
