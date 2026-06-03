'use client';

import { useState } from 'react';

interface VlanPort {
  port: string;
  type: 'access' | 'trunk';
  description: string;
}

interface Vlan {
  id: number;
  name: string;
  nameEn: string;
  color: string;
  subnet: string;
  ports: VlanPort[];
  purpose: string;
  devices: string[];
  example: string;
}

const vlans: Vlan[] = [
  {
    id: 10,
    name: '管理部',
    nameEn: 'Management',
    color: '#3b82f6',
    subnet: '192.168.10.0/24',
    ports: [
      { port: 'Fa0/1', type: 'access', description: '经理PC' },
      { port: 'Fa0/2', type: 'access', description: 'HR电脑' },
      { port: 'Fa0/3', type: 'access', description: '财务电脑' },
      { port: 'Fa0/4', type: 'access', description: '行政打印机' },
      { port: 'Fa0/5', type: 'access', description: '前台电脑' },
    ],
    purpose: '隔离管理部的网络流量，确保财务数据、人事资料等敏感信息不会被其他部门监听。管理部通常需要访问公司内部服务器和外网。',
    devices: ['经理PC', 'HR电脑', '财务电脑', '行政打印机', '前台电脑'],
    example: '经理的电脑（Fa0/1）和财务电脑（Fa0/3）在同一个VLAN，可以直接通信。但销售部的电脑无法直接访问管理部的打印机——即使它们插在同一台交换机上。',
  },
  {
    id: 20,
    name: '技术部',
    nameEn: 'Engineering',
    color: '#22c55e',
    subnet: '192.168.20.0/24',
    ports: [
      { port: 'Fa0/6', type: 'access', description: '开发服务器' },
      { port: 'Fa0/7', type: 'access', description: '测试电脑A' },
      { port: 'Fa0/8', type: 'access', description: '测试电脑B' },
      { port: 'Fa0/9', type: 'access', description: '代码仓库服务器' },
      { port: 'Fa0/10', type: 'access', description: '开发电脑' },
    ],
    purpose: '技术部需要大量内部通信和服务器访问。单独的VLAN可以防止广播风暴影响其他部门，也方便对开发/测试环境做特殊的QoS策略。',
    devices: ['开发服务器', '测试电脑A/B', '代码仓库服务器', '开发电脑'],
    example: '开发人员通过Fa0/10访问代码仓库服务器（Fa0/9），流量完全在VLAN 20内部，不会流到管理部或销售部，既安全又高效。',
  },
  {
    id: 30,
    name: '销售部',
    nameEn: 'Sales',
    color: '#f97316',
    subnet: '192.168.30.0/24',
    ports: [
      { port: 'Fa0/11', type: 'access', description: '销售电脑A' },
      { port: 'Fa0/12', type: 'access', description: '销售电脑B' },
      { port: 'Fa0/13', type: 'access', description: 'CRM服务器' },
      { port: 'Fa0/14', type: 'access', description: '会议室投影仪' },
      { port: 'Fa0/15', type: 'access', description: '销售打印机' },
    ],
    purpose: '销售部经常有外勤人员用VPN接入，需要独立管理。VLAN可以限制销售部只能访问CRM系统和外网，不能访问技术部的开发服务器。',
    devices: ['销售电脑A/B', 'CRM服务器', '会议室投影仪', '销售打印机'],
    example: '销售电脑A（Fa0/11）访问CRM服务器（Fa0/13），流量在VLAN 30内部。如果销售想访问技术部的开发服务器，必须经过路由器做VLAN间路由——路由器上可以设置ACL策略控制访问权限。',
  },
  {
    id: 40,
    name: '访客网络',
    nameEn: 'Guest',
    color: '#a855f7',
    subnet: '192.168.40.0/24',
    ports: [
      { port: 'Fa0/16', type: 'access', description: '访客Wi-Fi AP' },
      { port: 'Fa0/17', type: 'access', description: '会议室访客端口' },
      { port: 'Fa0/18', type: 'access', description: '大厅访客端口' },
    ],
    purpose: '访客网络必须与公司内网完全隔离。访客只能访问互联网，不能访问任何内部资源。这是企业网络安全的基本要求。',
    devices: ['访客Wi-Fi AP', '会议室访客端口', '大厅访客端口'],
    example: '客户在会议室用自己的笔记本连Wi-Fi（Fa0/17），获取192.168.40.x的IP地址，只能上网不能访问公司服务器。即使客户电脑中毒，也不会影响公司内网。',
  },
];

const trunkPorts = [
  { port: 'Fa0/24', description: '连接核心交换机', carries: [10, 20, 30, 40] },
  { port: 'Fa0/23', description: '连接路由器（VLAN间路由）', carries: [10, 20, 30, 40] },
];

export default function VlanDiagram() {
  const [activeVlan, setActiveVlan] = useState<number | null>(null);
  const [showMode, setShowMode] = useState<'with' | 'without'>('with');

  return (
    <div className="vlan-diagram">
      {/* 模式切换 */}
      <div className="flex items-center justify-center gap-3 mb-5">
        <button
          onClick={() => setShowMode('with')}
          className="text-[12px] font-medium px-4 py-1.5 rounded-lg transition-all duration-300"
          style={{
            background: showMode === 'with' ? 'var(--text)' : 'var(--surface)',
            color: showMode === 'with' ? 'var(--bg-warm)' : 'var(--text-muted)',
            border: `1.5px solid ${showMode === 'with' ? 'var(--text)' : 'var(--border)'}`,
          }}
        >
          有VLAN（逻辑隔离）
        </button>
        <button
          onClick={() => setShowMode('without')}
          className="text-[12px] font-medium px-4 py-1.5 rounded-lg transition-all duration-300"
          style={{
            background: showMode === 'without' ? 'var(--text)' : 'var(--surface)',
            color: showMode === 'without' ? 'var(--bg-warm)' : 'var(--text-muted)',
            border: `1.5px solid ${showMode === 'without' ? 'var(--text)' : 'var(--border)'}`,
          }}
        >
          无VLAN（物理隔离）
        </button>
      </div>

      {/* 广播域对比 */}
      {showMode === 'without' ? (
        <div
          className="rounded-xl px-5 py-4 mb-5 transition-all duration-300"
          style={{ background: '#ef444408', border: '1.5px solid #ef444420' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-bold" style={{ background: '#ef4444' }}>!</div>
            <span className="text-[13px] font-semibold" style={{ color: '#ef4444' }}>无VLAN：单一广播域</span>
          </div>
          <div className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            所有23个端口在同一个广播域。管理部的ARP广播会被销售部、技术部、访客全部收到。
            访客可以直接访问公司内部服务器。一个部门的广播风暴会影响整个网络。安全性和效率都无法保障。
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vlans.flatMap(v => v.ports).map(p => (
              <span key={p.port} className="text-[10px] px-2 py-0.5 rounded-md font-mono" style={{ background: '#ef444410', color: '#ef4444', border: '1px solid #ef444420' }}>
                {p.port}
              </span>
            ))}
            <span className="text-[10px] px-2 py-0.5 rounded-md font-mono" style={{ background: '#ef444410', color: '#ef4444', border: '1px solid #ef444420' }}>
              全部同一广播域
            </span>
          </div>
        </div>
      ) : (
        <div
          className="rounded-xl px-5 py-4 mb-5 transition-all duration-300"
          style={{ background: '#22c55e08', border: '1.5px solid #22c55e20' }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-bold" style={{ background: '#22c55e' }}>✓</div>
            <span className="text-[13px] font-semibold" style={{ color: '#22c55e' }}>有VLAN：4个独立广播域</span>
          </div>
          <div className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            23个端口被划分为4个VLAN，每个VLAN是一个独立的广播域。管理部的ARP广播只在VLAN 10内传播，
            销售部和访客完全收不到。访客只能上网，无法访问内部资源。各部门互不干扰，安全性大幅提升。
          </div>
        </div>
      )}

      {/* 中心交换机 */}
      <div className="flex justify-center mb-5">
        <div
          className="rounded-xl px-6 py-3 text-center"
          style={{ background: 'linear-gradient(135deg, #6366f110, #8b5cf605)', border: '1.5px solid #6366f130' }}
        >
          <div className="text-[14px] font-semibold" style={{ color: '#6366f1' }}>核心交换机</div>
          <div className="text-[11px] font-mono mt-1" style={{ color: 'var(--text-muted)' }}>Cisco 2960 · 24端口</div>
        </div>
      </div>

      {/* Trunk端口 */}
      <div className="flex justify-center gap-3 mb-5">
        {trunkPorts.map(tp => (
          <div
            key={tp.port}
            className="rounded-lg px-4 py-2 text-center"
            style={{ background: '#6366f108', border: '1.5px dashed #6366f130' }}
          >
            <div className="text-[11px] font-mono font-semibold" style={{ color: '#6366f1' }}>{tp.port}</div>
            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Trunk · {tp.description}</div>
            <div className="flex justify-center gap-1 mt-1">
              {tp.carries.map(id => (
                <span key={id} className="text-[9px] px-1.5 py-0.5 rounded font-mono" style={{ background: vlans.find(v => v.id === id)?.color + '15', color: vlans.find(v => v.id === id)?.color }}>
                  VLAN{id}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* VLAN卡片列表 */}
      <div className="flex flex-col gap-[3px]">
        {vlans.map((vlan) => {
          const isActive = activeVlan === vlan.id;
          return (
            <div key={vlan.id}>
              <button
                onClick={() => setActiveVlan(isActive ? null : vlan.id)}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${vlan.color}10, ${vlan.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? vlan.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${vlan.color}12` : 'none',
                  }}
                >
                  {/* VLAN ID */}
                  <div
                    className="w-12 h-9 rounded-lg flex flex-col items-center justify-center text-white mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${vlan.color}, ${vlan.color}cc)` }}
                  >
                    <span className="text-[9px] font-medium leading-none">VLAN</span>
                    <span className="text-[14px] font-bold leading-none mt-0.5">{vlan.id}</span>
                  </div>

                  {/* 子网 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-mono font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: vlan.color + '10', color: vlan.color, border: `1px solid ${vlan.color}20` }}
                  >
                    {vlan.subnet}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? vlan.color : 'var(--text)' }}>
                        {vlan.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {vlan.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {vlan.ports.length}个端口 · {vlan.purpose.slice(0, 40)}...
                    </div>
                  </div>

                  {/* 端口标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[180px] justify-end">
                    {vlan.ports.slice(0, 3).map(p => (
                      <span
                        key={p.port}
                        className="text-[10px] px-2 py-0.5 rounded-md font-mono font-medium"
                        style={{ background: vlan.color + '10', color: vlan.color, border: `1px solid ${vlan.color}20` }}
                      >
                        {p.port}
                      </span>
                    ))}
                    {vlan.ports.length > 3 && (
                      <span className="text-[10px] px-1.5 py-0.5" style={{ color: 'var(--text-muted)' }}>
                        +{vlan.ports.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-4 mt-1 mb-2 px-5 py-5 rounded-xl"
                  style={{ background: vlan.color + '05', border: `1.5px solid ${vlan.color}20` }}
                >
                  {/* 用途 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: vlan.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: vlan.color }}>VLAN用途</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {vlan.purpose}
                    </div>
                  </div>

                  {/* 实际场景 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>实际场景：</span>
                    {vlan.example}
                  </div>

                  {/* 端口分配表 */}
                  <div className="space-y-2">
                    <div className="text-[12px] font-semibold" style={{ color: 'var(--text-muted)' }}>端口分配</div>
                    {vlan.ports.map(p => (
                      <div
                        key={p.port}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-lg"
                        style={{ background: 'var(--surface)', border: `1px solid ${vlan.color}15` }}
                      >
                        <span className="text-[12px] font-mono font-semibold" style={{ color: vlan.color }}>{p.port}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md font-medium" style={{ background: vlan.color + '10', color: vlan.color, border: `1px solid ${vlan.color}20` }}>
                          {p.type}
                        </span>
                        <span className="text-[12px] flex-1" style={{ color: 'var(--text-secondary)' }}>{p.description}</span>
                      </div>
                    ))}
                  </div>

                  {/* Trunk端口说明 */}
                  <div className="mt-4 px-4 py-3 rounded-lg" style={{ background: '#6366f108', border: '1px solid #6366f115' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: '#6366f1' }}>Trunk端口概念</div>
                    <div className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      Trunk端口（Fa0/23、Fa0/24）不属于任何单一VLAN，它同时承载所有VLAN的数据。
                      交换机之间、交换机与路由器之间通过Trunk端口连接。数据帧通过802.1Q标签标记所属VLAN，
                      接收端交换机根据标签把数据送到正确的VLAN。这就是为什么2台交换机之间只需要1根网线就能传输所有VLAN的数据。
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 图例 */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4 text-[11px]" style={{ color: 'var(--text-muted)' }}>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#3b82f6' }} />
          <span>VLAN 10 管理</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#22c55e' }} />
          <span>VLAN 20 技术</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#f97316' }} />
          <span>VLAN 30 销售</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#a855f7' }} />
          <span>VLAN 40 访客</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm border border-dashed" style={{ borderColor: '#6366f1' }} />
          <span>Trunk端口</span>
        </div>
      </div>

      <div className="mt-3 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各VLAN展开详情 · 切换上方按钮对比有无VLAN的广播域差异
      </div>
    </div>
  );
}
