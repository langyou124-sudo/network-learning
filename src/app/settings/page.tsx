'use client';

import { useState } from 'react';
import { exportData, importData, resetStudyTime, getProgress } from '@/lib/storage';

export default function SettingsPage() {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const handleExport = () => {
    exportData();
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const jsonStr = event.target?.result as string;
      const success = importData(jsonStr);
      setImportStatus(success ? 'success' : 'error');
      setTimeout(() => setImportStatus('idle'), 3000);
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
      localStorage.removeItem('network-learning-progress');
      localStorage.removeItem('network-learning-mistakes');
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
            <p className="text-[13px] mt-2" style={{ color: 'var(--danger)' }}>导入失败，请检查文件格式</p>
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
