'use client';

import { useState } from 'react';
import { exportData, importData, getProgress, saveProgress } from '@/lib/storage';

export default function SettingsPage() {
  const [importStatus, setImportStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [studyHours, setStudyHours] = useState('');

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

  const handleUpdateHours = () => {
    const hours = parseFloat(studyHours);
    if (isNaN(hours) || hours < 0) return;
    const progress = getProgress();
    progress.totalStudyHours = hours;
    saveProgress(progress);
    setStudyHours('');
    alert('学习时长已更新');
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
            手动记录累计学习时长（小时）。
          </p>
          <div className="flex gap-3">
            <input
              type="number"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
              placeholder="输入小时数"
              min="0"
              step="0.5"
              className="flex-1 px-4 py-2.5 rounded-xl text-[14px] focus:outline-none"
              style={{ border: '1.5px solid var(--border)', background: 'var(--surface)' }}
            />
            <button onClick={handleUpdateHours} className="btn btn-primary"
              style={{ background: 'linear-gradient(135deg, #7c5cbf 0%, #b088f4 100%)' }}>
              更新
            </button>
          </div>
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
