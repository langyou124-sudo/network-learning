'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { modules } from '@/data/courses';

const navItems = [
  { href: '/', label: '首页', icon: HomeIcon },
  { href: '/learn', label: '知识库', icon: BookIcon },
  { href: '/quiz', label: '练习题', icon: PenIcon },
  { href: '/mistakes', label: '错题本', icon: AlertIcon },
  { href: '/progress', label: '学习进度', icon: ChartIcon },
  { href: '/settings', label: '设置', icon: GearIcon },
];

function HomeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
}
function BookIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
}
function PenIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>;
}
function AlertIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
}
function ChartIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>;
}
function GearIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>;
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="fixed left-0 top-0 w-60 h-screen flex flex-col glass-dark"
      style={{ borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* 品牌区 */}
      <div className="px-5 pt-6 pb-5">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-lg gradient-accent flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          </div>
          <div>
            <div className="text-white text-sm font-semibold tracking-tight">NetCom</div>
            <div className="text-[11px] text-gray-500">通信知识学习平台</div>
          </div>
        </div>
      </div>

      {/* 主导航 */}
      <nav className="px-3 flex-1">
        <div className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-[13.5px] transition-all duration-150 ${
                  isActive
                    ? 'bg-white/10 text-white font-medium'
                    : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
                }`}
              >
                <Icon />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* 课程模块 */}
        <div className="mt-6 pt-5 border-t border-white/6">
          <div className="px-3 mb-2 text-[11px] font-medium text-gray-500 uppercase tracking-wider">
            课程模块
          </div>
          <div className="space-y-0.5 max-h-[42vh] overflow-y-auto">
            {modules.map((mod) => {
              const isActive = pathname === `/learn/${mod.id}`;
              return (
                <Link
                  key={mod.id}
                  href={`/learn/${mod.id}`}
                  className={`flex items-center gap-2.5 px-3 py-1.5 text-[13px] rounded-lg transition-all duration-150 ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                  }`}
                >
                  <span className="text-sm opacity-70">{mod.icon}</span>
                  <span>{mod.title}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* 底部 */}
      <div className="px-5 py-4 border-t border-white/6">
        <div className="text-[11px] text-gray-600">
          NetCom Academy v1.0
        </div>
      </div>
    </aside>
  );
}
