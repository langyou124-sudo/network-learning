'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import { exportData, importData, resetStudyTime, clearAllData, getProgress } from '@/lib/storage';

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [importError, setImportError] = useState('');

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        setUser(data.user);
        setDisplayName(data.user.user_metadata?.display_name || '');
      }
    });
  }, []);

  const handleSaveName = async () => {
    if (!displayName.trim()) return;
    setSaving(true);
    setSaveMsg('');
    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ data: { display_name: displayName.trim() } });
    if (error) {
      setSaveMsg('保存失败');
    } else {
      setSaveMsg('已保存');
    }
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 3000);
  };
  const handleExport = () => {
    exportData();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonStr = event.target?.result as string;
      const result = importData(jsonStr);
      setImportStatus(result.ok ? 'success' : 'error');
      setImportError(result.ok ? '' : result.error || '未知错误');
      setTimeout(() => { setImportStatus('idle'); setImportError(''); }, 5000);
    };
    reader.readAsText(file);
  };

  const handleResetStudyTime = () => {
    if (confirm('确定要重置学习时间记录吗？')) {
      resetStudyTime();
      alert('学习时间已重置');
      window.location.reload();
    }
  };

  const handleClearData = () => {
    if (confirm('确定要清除所有学习数据吗？此操作不可恢复。')) {
      clearAllData();
      alert('数据已清除');
      window.location.reload();
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">设置</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">管理你的学习数据</p>
      </div>

      <div className="space-y-5">
        {/* 个人资料 */}
        {user && (
          <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.06s' }}>
            <h2 className="text-[15px] font-semibold text-[var(--text)] mb-1">个人资料</h2>
            <p className="text-[13px] text-[var(--text-muted)] mb-4">
              设置你的显示名称，其他地方会用这个名字来称呼你。
            </p>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={displayName}
                onChange={e => setDisplayName(e.target.value)}
                placeholder="输入昵称"
                className="flex-1 px-4 py-2 rounded-xl text-[14px] focus:outline-none"
                style={{ border: '1.5px solid var(--border)', background: 'var(--surface)' }}
              />
              <button
                onClick={handleSaveName}
                disabled={saving || !displayName.trim()}
                className="btn btn-primary px-5 py-2 text-[13px] disabled:opacity-50"
              >
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
            {saveMsg && (
              <p className="text-[13px] mt-2" style={{ color: saveMsg === '已保存' ? 'var(--success)' : 'var(--danger)' }}>
                {saveMsg}
              </p>
            )}
          </div>
        )}

        {/* 导出 */}
        <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.06s' }}>
          <h2 className="text-[15px] font-semibold text-[var(--text)] mb-1">导出数据</h2>
          <p className="text-[13px] text-[var(--text-muted)] mb-4">
            将学习进度、错题记录导出为 JSON 文件，用于备份或迁移。
          </p>
          <button onClick={handleExport} className="btn btn-primary">导出备份文件</button>
        </div>

        {/* 导入 */}
        <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.12s' }}>
          <h2 className="text-[15px] font-semibold text-[var(--text)] mb-1">导入数据</h2>
          <p className="text-[13px] text-[var(--text-muted)] mb-4">
            从备份文件恢复学习数据。导入会覆盖当前数据。
          </p>
          <label className="btn btn-primary cursor-pointer inline-flex">
            选择备份文件
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          {importStatus === 'success' && (
            <p className="text-[13px] mt-2" style={{ color: 'var(--success)' }}>导入成功！</p>
          )}
          {importStatus === 'error' && (
            <p className="text-[13px] mt-2" style={{ color: 'var(--danger)' }}>
              导入失败：{importError || '请检查文件格式'}
            </p>
          )}
        </div>

        {/* 学习时长 */}
        <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.18s' }}>
          <h2 className="text-[15px] font-semibold text-[var(--text)] mb-1">学习时长</h2>
          <p className="text-[13px] text-[var(--text-muted)] mb-4">
            学习时间由系统自动记录，进入知识库或错题页时自动计时。
          </p>
          <div className="text-[13px] text-[var(--text-secondary)] mb-4">
            累计学习：{(() => {
              const hours = getProgress().totalStudyHours;
              if (hours < 1) return `${Math.round(hours * 60)} 分钟`;
              return `${hours.toFixed(1)} 小时`;
            })()}
          </div>
          <button onClick={handleResetStudyTime} className="btn btn-secondary">
            重置学习时间
          </button>
        </div>

        {/* 危险操作 */}
        <div className="card px-6 py-5 animate-in" style={{ animationDelay: '0.24s', borderColor: 'var(--danger)', borderWidth: '1px' }}>
          <h2 className="text-[15px] font-semibold mb-1" style={{ color: 'var(--danger)' }}>危险操作</h2>
          <p className="text-[13px] text-[var(--text-muted)] mb-4">
            清除所有学习数据，包括进度、成绩、错题和笔记。不可恢复。
          </p>
          <button onClick={handleClearData} className="btn"
            style={{ background: 'var(--danger)', color: 'white' }}>
            清除所有数据
          </button>
        </div>
      </div>
    </div>
  );
}
