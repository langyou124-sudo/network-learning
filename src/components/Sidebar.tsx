'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { modules } from '@/data/courses';

const navItems = [
  { href: '/', label: '首页', icon: '🏠' },
  { href: '/learn', label: '知识库', icon: '📚' },
  { href: '/quiz', label: '练习题', icon: '✏️' },
  { href: '/mistakes', label: '错题本', icon: '📝' },
  { href: '/progress', label: '学习进度', icon: '📊' },
  { href: '/settings', label: '设置', icon: '⚙️' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4 fixed left-0 top-0">
      <div className="mb-8">
        <h1 className="text-xl font-bold">📡 通信知识学习平台</h1>
        <p className="text-sm text-gray-400 mt-1">网络工程 · 通信工程</p>
      </div>

      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/' && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 pt-4 border-t border-gray-700">
        <h3 className="text-sm font-semibold text-gray-400 mb-2">课程模块</h3>
        <div className="space-y-1 max-h-[40vh] overflow-y-auto">
          {modules.map((mod) => (
            <Link
              key={mod.id}
              href={`/learn/${mod.id}`}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded transition-colors ${
                pathname === `/learn/${mod.id}`
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
              }`}
            >
              <span>{mod.icon}</span>
              <span>{mod.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
