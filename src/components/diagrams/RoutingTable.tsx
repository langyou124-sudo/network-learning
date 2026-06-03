'use client';

import { useState } from 'react';

interface RouteEntry {
  destination: string;
  mask: string;
  nextHop: string;
  interface: string;
  metric: number;
  type: 'static' | 'dynamic' | 'connected';
  description: string;
}

const routes: RouteEntry[] = [
  { destination: '192.168.1.0', mask: '/24', nextHop: '直连', interface: 'Fa0/0', metric: 0, type: 'connected', description: '本地局域网，直接连接在路由器接口上' },
  { destination: '192.168.2.0', mask: '/24', nextHop: '10.0.0.2', interface: 'Fa0/1', metric: 1, type: 'static', description: '管理员手动配置的静态路由' },
  { destination: '10.0.0.0', mask: '/8', nextHop: '172.16.0.1', interface: 'Fa0/2', metric: 20, type: 'dynamic', description: '通过OSPF协议自动学习到的路由' },
  { destination: '172.16.0.0', mask: '/16', nextHop: '直连', interface: 'Fa0/2', metric: 0, type: 'connected', description: '本地网络，直接连接' },
  { destination: '0.0.0.0', mask: '/0', nextHop: '203.0.113.1', interface: 'Fa0/3', metric: 1, type: 'static', description: '默认路由，当没有更精确匹配时使用' },
];

export default function RoutingTable() {
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [showMatching, setShowMatching] = useState(false);
  const [destIP, setDestIP] = useState('192.168.1.100');

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'connected': return { bg: '#f0fdf4', border: '#86efac', text: '#166534', label: '直连' };
      case 'static': return { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af', label: '静态' };
      case 'dynamic': return { bg: '#fef3c7', border: '#fcd34d', text: '#92400e', label: '动态' };
      default: return { bg: '#f5f5f5', border: '#d4d4d4', text: '#404040', label: '未知' };
    }
  };

  return (
    <div className="routing-table-diagram">
      {/* 路由表 */}
      <div className="overflow-x-auto">
        <div className="flex flex-col gap-[3px]">
          {routes.map((route, index) => {
            const colors = getTypeColor(route.type);
            const isActive = activeRoute === index;
            return (
              <div key={index}>
                <button
                  onClick={() => setActiveRoute(isActive ? null : index)}
                  className="w-full text-left transition-all duration-300"
                  style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
                >
                  <div
                    className="flex items-center rounded-xl px-4 py-3 transition-all duration-300"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${colors.bg}, ${colors.bg}80)`
                        : 'var(--surface)',
                      border: `1.5px solid ${isActive ? colors.border : 'var(--border)'}`,
                      boxShadow: isActive ? `0 4px 20px ${colors.border}30` : 'none',
                    }}
                  >
                    {/* 目标网络 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold text-[14px]" style={{ color: 'var(--text)' }}>
                          {route.destination}
                        </span>
                        <span className="font-mono text-[12px]" style={{ color: 'var(--text-muted)' }}>
                          {route.mask}
                        </span>
                      </div>
                    </div>

                    {/* 下一跳 */}
                    <div className="w-28 text-[13px] font-mono" style={{ color: 'var(--text-secondary)' }}>
                      {route.nextHop}
                    </div>

                    {/* 接口 */}
                    <div className="w-20 text-[12px] font-mono" style={{ color: 'var(--text-muted)' }}>
                      {route.interface}
                    </div>

                    {/* 度量值 */}
                    <div className="w-16 text-[12px] text-center" style={{ color: 'var(--text-muted)' }}>
                      {route.metric}
                    </div>

                    {/* 类型标签 */}
                    <div
                      className="text-[11px] px-2 py-0.5 rounded-md font-medium ml-3"
                      style={{ background: colors.bg, color: colors.text, border: `1px solid ${colors.border}` }}
                    >
                      {colors.label}
                    </div>
                  </div>
                </button>

                {/* 展开详情 */}
                {isActive && (
                  <div
                    className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-4 rounded-xl"
                    style={{ background: colors.bg, border: `1.5px solid ${colors.border}40` }}
                  >
                    <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {route.description}
                    </div>
                    {route.type === 'dynamic' && (
                      <div className="mt-2 text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        通过路由协议自动学习，网络变化时会自动更新
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 最长前缀匹配演示 */}
      <div className="mt-6 p-5 rounded-xl" style={{ background: 'var(--bg-warm)', border: '1px solid var(--border)' }}>
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text)' }}>
          最长前缀匹配演示
        </div>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>目标IP：</span>
          <input
            type="text"
            value={destIP}
            onChange={(e) => setDestIP(e.target.value)}
            className="font-mono text-[13px] px-3 py-1.5 rounded-lg"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', width: '140px' }}
          />
          <button
            onClick={() => setShowMatching(!showMatching)}
            className="text-[12px] px-3 py-1.5 rounded-lg font-medium"
            style={{ background: '#6366f1', color: 'white' }}
          >
            {showMatching ? '重置' : '匹配'}
          </button>
        </div>
        {showMatching && (
          <div className="text-[13px] p-3 rounded-lg" style={{ background: '#f0fdf4', border: '1px solid #86efac', color: '#166534' }}>
            ✓ 匹配路由：192.168.1.0/24（前缀长度24，最长匹配）
          </div>
        )}
      </div>

      {/* 图例 */}
      <div className="flex justify-center gap-6 mt-4 text-[12px]" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: '#f0fdf4', border: '1.5px solid #86efac' }} />
          直连路由
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: '#eff6ff', border: '1.5px solid #93c5fd' }} />
          静态路由
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: '#fef3c7', border: '1.5px solid #fcd34d' }} />
          动态路由
        </span>
      </div>
    </div>
  );
}
