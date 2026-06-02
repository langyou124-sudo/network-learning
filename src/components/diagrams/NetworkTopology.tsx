'use client';

import { useState } from 'react';

interface Node {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  type: 'device' | 'network' | 'server';
}

interface Link {
  from: string;
  to: string;
  label?: string;
}

const defaultNodes: Node[] = [
  { id: 'pc1', label: '你的电脑', icon: '💻', x: 50, y: 280, type: 'device' },
  { id: 'phone', label: '手机', icon: '📱', x: 180, y: 350, type: 'device' },
  { id: 'router', label: '家用路由器', icon: '📡', x: 180, y: 200, type: 'device' },
  { id: 'isp', label: '运营商网络', icon: '🏢', x: 380, y: 200, type: 'network' },
  { id: 'core', label: '骨干网', icon: '🌐', x: 530, y: 200, type: 'network' },
  { id: 'server', label: '百度服务器', icon: '🖥️', x: 650, y: 200, type: 'server' },
];

const defaultLinks: Link[] = [
  { from: 'pc1', to: 'router', label: 'Wi-Fi' },
  { from: 'phone', to: 'router', label: 'Wi-Fi' },
  { from: 'router', to: 'isp', label: '光纤' },
  { from: 'isp', to: 'core', label: '骨干线路' },
  { from: 'core', to: 'server' },
];

export default function NetworkTopology() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'device': return { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af' };
      case 'network': return { bg: '#f0fdf4', border: '#86efac', text: '#166534' };
      case 'server': return { bg: '#fef3c7', border: '#fcd34d', text: '#92400e' };
      default: return { bg: '#f5f5f5', border: '#d4d4d4', text: '#404040' };
    }
  };

  return (
    <div className="network-topology">
      <svg viewBox="0 0 750 420" className="w-full" style={{ maxHeight: '380px' }}>
        <defs>
          <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#94a3b8" />
          </marker>
        </defs>

        {/* 连接线 */}
        {defaultLinks.map((link, i) => {
          const fromNode = defaultNodes.find(n => n.id === link.from)!;
          const toNode = defaultNodes.find(n => n.id === link.to)!;
          const isHighlighted = hoveredNode === link.from || hoveredNode === link.to;

          return (
            <g key={i}>
              <line
                x1={fromNode.x}
                y1={fromNode.y}
                x2={toNode.x}
                y2={toNode.y}
                stroke={isHighlighted ? '#3b82f6' : '#cbd5e1'}
                strokeWidth={isHighlighted ? 2.5 : 1.5}
                strokeDasharray={isHighlighted ? 'none' : '6,4'}
                markerEnd="url(#arrowhead)"
                className="transition-all duration-300"
              />
              {link.label && (
                <text
                  x={(fromNode.x + toNode.x) / 2}
                  y={(fromNode.y + toNode.y) / 2 - 10}
                  textAnchor="middle"
                  className="text-[11px]"
                  fill={isHighlighted ? '#3b82f6' : '#94a3b8'}
                  fontFamily="var(--font-sans)"
                >
                  {link.label}
                </text>
              )}
            </g>
          );
        })}

        {/* 节点 */}
        {defaultNodes.map((node) => {
          const colors = getNodeColor(node.type);
          const isHovered = hoveredNode === node.id;

          return (
            <g
              key={node.id}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
              style={{ transition: 'transform 0.2s' }}
            >
              <rect
                x={node.x - 50}
                y={node.y - 28}
                width={100}
                height={56}
                rx={12}
                fill={colors.bg}
                stroke={isHovered ? '#3b82f6' : colors.border}
                strokeWidth={isHovered ? 2 : 1.5}
                className="transition-all duration-200"
              />
              <text
                x={node.x}
                y={node.y - 4}
                textAnchor="middle"
                fontSize="18"
              >
                {node.icon}
              </text>
              <text
                x={node.x}
                y={node.y + 16}
                textAnchor="middle"
                fontSize="11"
                fontWeight="500"
                fill={colors.text}
                fontFamily="var(--font-sans)"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="flex justify-center gap-6 mt-2 text-[12px]" style={{ color: 'var(--text-muted)' }}>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: '#eff6ff', border: '1.5px solid #93c5fd' }} />
          终端设备
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: '#f0fdf4', border: '1.5px solid #86efac' }} />
          网络节点
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded" style={{ background: '#fef3c7', border: '1.5px solid #fcd34d' }} />
          服务器
        </span>
      </div>
    </div>
  );
}
