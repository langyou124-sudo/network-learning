'use client';

import { useState } from 'react';

interface Port {
  name: string;
  role: 'root' | 'designated' | 'blocked' | 'alternate';
  cost: number;
  connectedTo: string;
}

interface Switch {
  id: string;
  name: string;
  mac: string;
  priority: number;
  role: 'root' | 'designated' | 'blocked';
  color: string;
  ports: Port[];
  description: string;
  detail: string;
}

const switches: Switch[] = [
  {
    id: 'A', name: 'Switch A', mac: '00:1A:2B:3C:4D:01', priority: 4096,
    role: 'root', color: '#22c55e',
    ports: [
      { name: 'Fa0/1', role: 'designated', cost: 0, connectedTo: 'B' },
      { name: 'Fa0/2', role: 'designated', cost: 0, connectedTo: 'C' },
      { name: 'Fa0/3', role: 'designated', cost: 0, connectedTo: 'D' },
      { name: 'Fa0/4', role: 'designated', cost: 0, connectedTo: 'E' },
    ],
    description: '根交换机(Root Bridge)——整个生成树的中心。所有其他交换机到根交换机的路径成本最低。根交换机的所有端口都是指定端口(Designated)，处于转发状态。',
    detail: '选举规则：优先级(默认32768)+MAC地址，值最小的成为根。A的优先级被手动设为4096，加上最小的MAC地址，所以A成为根交换机。',
  },
  {
    id: 'B', name: 'Switch B', mac: '00:1A:2B:3C:4D:02', priority: 32768,
    role: 'designated', color: '#3b82f6',
    ports: [
      { name: 'Fa0/1', role: 'root', cost: 4, connectedTo: 'A' },
      { name: 'Fa0/2', role: 'designated', cost: 4, connectedTo: 'C' },
      { name: 'Fa0/3', role: 'blocked', cost: 19, connectedTo: 'E' },
    ],
    description: '指定交换机(Designated)。到根交换机的路径成本为4（直连千兆链路）。Fa0/3被阻塞，因为通过E到根的路径成本(19+4=23)远高于直连A的成本(4)。',
    detail: 'B的根端口是Fa0/1（到A成本最低=4）。Fa0/2是指定端口（到C的最优路径经过B）。Fa0/3被阻塞，因为B-E链路的替代路径不优。',
  },
  {
    id: 'C', name: 'Switch C', mac: '00:1A:2B:3C:4D:03', priority: 32768,
    role: 'designated', color: '#3b82f6',
    ports: [
      { name: 'Fa0/1', role: 'root', cost: 4, connectedTo: 'A' },
      { name: 'Fa0/2', role: 'designated', cost: 4, connectedTo: 'D' },
      { name: 'Fa0/3', role: 'designated', cost: 4, connectedTo: 'B' },
    ],
    description: '指定交换机(Designated)。到根交换机直连，路径成本4。所有端口都在转发状态，因为C是A-D和A-B路径上的关键节点。',
    detail: 'C的根端口是Fa0/1（直连A，成本4）。Fa0/2是指定端口（C是D到根的最优下一跳）。Fa0/3是指定端口（到B的路径C比D更优）。',
  },
  {
    id: 'D', name: 'Switch D', mac: '00:1A:2B:3C:4D:04', priority: 32768,
    role: 'designated', color: '#3b82f6',
    ports: [
      { name: 'Fa0/1', role: 'root', cost: 4, connectedTo: 'A' },
      { name: 'Fa0/2', role: 'blocked', cost: 19, connectedTo: 'E' },
      { name: 'Fa0/3', role: 'designated', cost: 4, connectedTo: 'C' },
    ],
    description: '指定交换机(Designated)。到根交换机直连，路径成本4。Fa0/2被阻塞，因为D-E路径不是到根的最优路径——E通过B到根更近。',
    detail: 'D的根端口是Fa0/1（直连A，成本4）。Fa0/3是指定端口（D是C的第二条路径选择）。Fa0/2被阻塞，避免D-E-C-B-A形成环路。',
  },
  {
    id: 'E', name: 'Switch E', mac: '00:1A:2B:3C:4D:05', priority: 32768,
    role: 'designated', color: '#3b82f6',
    ports: [
      { name: 'Fa0/1', role: 'root', cost: 4, connectedTo: 'A' },
      { name: 'Fa0/2', role: 'blocked', cost: 19, connectedTo: 'B' },
      { name: 'Fa0/3', role: 'blocked', cost: 19, connectedTo: 'D' },
    ],
    description: '指定交换机(Designated)。到根交换机直连，路径成本4。Fa0/2和Fa0/3都被阻塞——E直连A就够了，多余的链路会造成环路。',
    detail: 'E的根端口是Fa0/1（直连A，成本4）。Fa0/2和Fa0/3被阻塞，因为E-B和E-D路径的替代成本远高于直连A。阻塞这些端口彻底消除了E-B-C-A和E-D-C-A的环路可能。',
  },
];

const stpStates = [
  { name: 'Blocking', nameCn: '阻塞', color: '#ef4444', duration: '20秒', description: '端口不转发数据帧，只接收BPDU。初始状态或检测到环路时进入。防止环路的关键状态。' },
  { name: 'Listening', nameCn: '侦听', color: '#f97316', duration: '15秒', description: '接收并发送BPDU，参与生成树计算，但不转发数据帧。交换机在此阶段确定端口角色。' },
  { name: 'Learning', nameCn: '学习', color: '#eab308', duration: '15秒', description: '开始学习MAC地址（记录源MAC到端口的映射），但仍不转发数据帧。为转发做准备。' },
  { name: 'Forwarding', nameCn: '转发', color: '#22c55e', duration: '持续', description: '正常工作状态。转发数据帧，学习MAC地址，接收和发送BPDU。指定端口和根端口的最终状态。' },
];

const meshLinks: [string, string, boolean][] = [
  ['A', 'B', false], ['A', 'C', false], ['A', 'D', false], ['A', 'E', false],
  ['B', 'C', false], ['B', 'E', true], ['D', 'E', true],
];

export default function STPTopology() {
  const [activeSwitch, setActiveSwitch] = useState<string | null>(null);
  const [highlightPath, setHighlightPath] = useState<string | null>(null);
  const [showStates, setShowStates] = useState(false);

  const getSwitchPos = (id: string): { x: number; y: number } => {
    const positions: Record<string, { x: number; y: number }> = {
      A: { x: 200, y: 60 },
      B: { x: 80, y: 170 },
      C: { x: 320, y: 170 },
      D: { x: 120, y: 290 },
      E: { x: 280, y: 290 },
    };
    return positions[id];
  };

  const getPathToRoot = (id: string): string[] => {
    if (id === 'A') return ['A'];
    const sw = switches.find(s => s.id === id)!;
    const rootPort = sw.ports.find(p => p.role === 'root');
    if (!rootPort) return [id];
    return [id, ...getPathToRoot(rootPort.connectedTo)];
  };

  const isLinkHighlighted = (from: string, to: string): boolean => {
    if (!highlightPath) return false;
    const path = getPathToRoot(highlightPath);
    for (let i = 0; i < path.length - 1; i++) {
      if ((path[i] === from && path[i + 1] === to) || (path[i] === to && path[i + 1] === from)) return true;
    }
    return false;
  };

  const getRoleLabel = (role: string): string => {
    const map: Record<string, string> = { root: 'Root', designated: 'Designated', blocked: 'Blocked', alternate: 'Alternate' };
    return map[role] || role;
  };

  const getRoleColor = (role: string): string => {
    const map: Record<string, string> = { root: '#22c55e', designated: '#3b82f6', blocked: '#ef4444', alternate: '#f97316' };
    return map[role] || '#6b7280';
  };

  return (
    <div className="stp-topology">
      {/* SVG拓扑图 */}
      <div className="flex justify-center mb-5">
        <svg viewBox="0 0 400 370" className="w-full max-w-[480px]" style={{ fontFamily: 'inherit' }}>
          {/* 链路 */}
          {meshLinks.map(([from, to, blocked]) => {
            const p1 = getSwitchPos(from);
            const p2 = getSwitchPos(to);
            const highlighted = highlightPath ? isLinkHighlighted(from, to) : false;
            return (
              <line
                key={`${from}-${to}`}
                x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                stroke={blocked ? '#ef444460' : highlighted ? '#6366f1' : 'var(--border)'}
                strokeWidth={highlighted ? 2.5 : blocked ? 1.5 : 1.5}
                strokeDasharray={blocked ? '6,4' : 'none'}
                className="transition-all duration-300"
              />
            );
          })}

          {/* 交换机节点 */}
          {switches.map(sw => {
            const pos = getSwitchPos(sw.id);
            const isActive = activeSwitch === sw.id;
            const isHighlighted = highlightPath === sw.id;
            return (
              <g
                key={sw.id}
                className="cursor-pointer transition-all duration-300"
                onClick={() => {
                  setActiveSwitch(isActive ? null : sw.id);
                  setHighlightPath(isActive ? null : sw.id);
                }}
              >
                <circle
                  cx={pos.x} cy={pos.y} r={isActive || isHighlighted ? 30 : 26}
                  fill={isActive || isHighlighted ? sw.color + '20' : 'var(--surface)'}
                  stroke={sw.color}
                  strokeWidth={isActive || isHighlighted ? 3 : 2}
                  className="transition-all duration-300"
                />
                <text x={pos.x} y={pos.y - 5} textAnchor="middle" className="text-[14px] font-bold" fill={sw.color}>
                  {sw.id}
                </text>
                <text x={pos.x} y={pos.y + 10} textAnchor="middle" className="text-[9px]" fill="var(--text-muted)">
                  {getRoleLabel(sw.role)}
                </text>
              </g>
            );
          })}

          {/* 阻塞端口标记 */}
          {switches.flatMap(sw =>
            sw.ports.filter(p => p.role === 'blocked').map(p => {
              const from = getSwitchPos(sw.id);
              const to = getSwitchPos(p.connectedTo);
              const mx = (from.x + to.x) / 2;
              const my = (from.y + to.y) / 2;
              return (
                <g key={`${sw.id}-${p.name}-block`}>
                  <circle cx={mx} cy={my} r={8} fill="#ef444415" stroke="#ef4444" strokeWidth={1.5} />
                  <text x={mx} y={my + 3.5} textAnchor="middle" className="text-[9px] font-bold" fill="#ef4444">X</text>
                </g>
              );
            })
          )}
        </svg>
      </div>

      {/* 提示 */}
      {highlightPath && (
        <div className="text-center mb-4">
          <span className="text-[12px] px-3 py-1 rounded-lg" style={{ background: '#6366f110', color: '#6366f1', border: '1px solid #6366f120' }}>
            Switch {highlightPath} → 根交换机路径: {getPathToRoot(highlightPath).join(' → ')}
          </span>
        </div>
      )}

      {/* 交换机卡片列表 */}
      <div className="flex flex-col gap-[3px]">
        {switches.map((sw) => {
          const isActive = activeSwitch === sw.id;
          return (
            <div key={sw.id}>
              <button
                onClick={() => {
                  setActiveSwitch(isActive ? null : sw.id);
                  setHighlightPath(isActive ? null : sw.id);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${sw.color}10, ${sw.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? sw.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${sw.color}12` : 'none',
                  }}
                >
                  {/* 交换机ID */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${sw.color}, ${sw.color}cc)` }}
                  >
                    {sw.id}
                  </div>

                  {/* 角色标签 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: sw.color + '10', color: sw.color, border: `1px solid ${sw.color}20` }}
                  >
                    {getRoleLabel(sw.role)} Bridge
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? sw.color : 'var(--text)' }}>
                        {sw.name}
                      </span>
                      <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>
                        {sw.mac}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      Priority: {sw.priority} · {sw.description.slice(0, 50)}...
                    </div>
                  </div>

                  {/* 端口角色标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[180px] justify-end">
                    {sw.ports.slice(0, 3).map(p => (
                      <span
                        key={p.name}
                        className="text-[10px] px-2 py-0.5 rounded-md font-mono font-medium"
                        style={{ background: getRoleColor(p.role) + '10', color: getRoleColor(p.role), border: `1px solid ${getRoleColor(p.role)}20` }}
                      >
                        {p.name} {getRoleLabel(p.role)}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{ background: sw.color + '05', border: `1.5px solid ${sw.color}20` }}
                >
                  {/* 核心信息 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: sw.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: sw.color }}>角色说明</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {sw.description}
                    </div>
                  </div>

                  {/* 选举过程 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>选举细节：</span>
                    {sw.detail}
                  </div>

                  {/* 端口详情表 */}
                  <div className="space-y-2">
                    <div className="text-[12px] font-semibold" style={{ color: 'var(--text-muted)' }}>端口角色</div>
                    {sw.ports.map(p => (
                      <div
                        key={p.name}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                        style={{ background: 'var(--surface)', border: `1px solid ${getRoleColor(p.role)}15` }}
                      >
                        <span className="text-[12px] font-mono font-semibold" style={{ color: getRoleColor(p.role) }}>{p.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: getRoleColor(p.role) + '10', color: getRoleColor(p.role), border: `1px solid ${getRoleColor(p.role)}20` }}>
                          {getRoleLabel(p.role)}
                        </span>
                        <span className="text-[11px] font-mono" style={{ color: 'var(--text-muted)' }}>→ {p.connectedTo}</span>
                        <span className="text-[11px] ml-auto" style={{ color: 'var(--text-muted)' }}>Cost: {p.cost}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* STP状态说明 */}
      <div className="mt-5">
        <button
          onClick={() => setShowStates(!showStates)}
          className="w-full text-left rounded-xl px-5 py-3.5 transition-all duration-300"
          style={{
            background: showStates ? '#6366f108' : 'var(--surface)',
            border: `1.5px solid ${showStates ? '#6366f130' : 'var(--border)'}`,
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-[13px] font-semibold" style={{ color: showStates ? '#6366f1' : 'var(--text)' }}>
              STP端口状态转换
            </span>
            <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              {showStates ? '收起' : '展开'} Blocking → Listening → Learning → Forwarding
            </span>
          </div>
        </button>

        {showStates && (
          <div className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl" style={{ background: '#6366f105', border: '1.5px solid #6366f120' }}>
            <div className="flex flex-col gap-2">
              {stpStates.map((state, i) => (
                <div key={state.name}>
                  <div
                    className="flex items-center gap-3 px-4 py-3 rounded-lg"
                    style={{ background: 'var(--surface)', border: `1px solid ${state.color}20` }}
                  >
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${state.color}, ${state.color}cc)` }}
                    >
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-semibold" style={{ color: state.color }}>{state.name}</span>
                        <span className="text-[11px] px-2 py-0.5 rounded-md font-medium" style={{ background: state.color + '10', color: state.color, border: `1px solid ${state.color}20` }}>
                          {state.nameCn}
                        </span>
                        <span className="text-[11px] ml-auto font-mono" style={{ color: 'var(--text-muted)' }}>{state.duration}</span>
                      </div>
                      <div className="text-[12px] mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {state.description}
                      </div>
                    </div>
                  </div>
                  {i < stpStates.length - 1 && (
                    <div className="flex justify-center my-1">
                      <span className="text-[14px]" style={{ color: 'var(--text-muted)' }}>↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-3 text-[12px]" style={{ color: 'var(--text-muted)' }}>
              注：直接连接终端设备的端口（Access Port）跳过Blocking和Listening，从Disabled直接进入Forwarding（PortFast特性）。
            </div>
          </div>
        )}
      </div>

      {/* 图例 */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[11px]" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
          <span>Root Bridge</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full" style={{ background: '#3b82f6' }} />
          <span>Designated</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-0.5" style={{ background: '#ef4444', borderTop: '1.5px dashed #ef4444' }} />
          <span>Blocked Link</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center text-[8px] font-bold" style={{ borderColor: '#ef4444', color: '#ef4444' }}>X</div>
          <span>Blocked Port</span>
        </div>
      </div>

      <div className="mt-3 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击交换机查看到根路径和端口详情 · 展开底部查看STP状态转换
      </div>
    </div>
  );
}
