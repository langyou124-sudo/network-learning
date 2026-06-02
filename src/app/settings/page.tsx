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
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">设置</h1>
        <p className="text-gray-600 mt-2">管理你的学习数据</p>
      </div>

      <div className="space-y-6">
        {/* 数据导出 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">导出数据</h2>
          <p className="text-sm text-gray-500 mb-4">
            将你的学习进度、错题记录导出为 JSON 文件，用于备份或迁移到其他设备。
          </p>
          <button
            onClick={handleExport}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            导出备份文件
          </button>
        </div>

        {/* 数据导入 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">导入数据</h2>
          <p className="text-sm text-gray-500 mb-4">
            从之前导出的备份文件恢复学习数据。导入会覆盖当前数据。
          </p>
          <label className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer">
            选择备份文件
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>
          {importStatus === 'success' && (
            <p className="text-sm text-green-600 mt-2">导入成功！</p>
          )}
          {importStatus === 'error' && (
            <p className="text-sm text-red-600 mt-2">导入失败，请检查文件格式</p>
          )}
        </div>

        {/* 学习时长 */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">学习时长</h2>
          <p className="text-sm text-gray-500 mb-4">
            手动记录你的累计学习时长（小时）。
          </p>
          <div className="flex gap-3">
            <input
              type="number"
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
              placeholder="输入小时数"
              min="0"
              step="0.5"
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={handleUpdateHours}
              className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              更新
            </button>
          </div>
        </div>

        {/* 危险操作 */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-red-100">
          <h2 className="text-lg font-semibold text-red-600 mb-2">危险操作</h2>
          <p className="text-sm text-gray-500 mb-4">
            清除所有学习数据，包括进度、成绩、错题和笔记。此操作不可恢复。
          </p>
          <button
            onClick={handleClearData}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            清除所有数据
          </button>
        </div>
      </div>
    </div>
  );
}
