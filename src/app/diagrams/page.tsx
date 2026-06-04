'use client';

import { useState } from 'react';
import { OsiLayers, TcpIpLayers, NetworkTopology, Encapsulation, RoutingTable, VlanDiagram, STPTopology, RoutingProcess, EncryptionFlow, FirewallTypes, VPNTunnel, WirelessStandards, CellularNetwork, FiberOptic, SDNArchitecture, SNMPDiagram, FaultDiagnosis } from '@/components/diagrams';

const diagrams = [
  { id: 'osi-layers', title: 'OSI 七层模型', category: '基础模型', Component: OsiLayers },
  { id: 'tcpip-layers', title: 'TCP/IP 四层模型', category: '基础模型', Component: TcpIpLayers },
  { id: 'encapsulation', title: '数据封装过程', category: '基础模型', Component: Encapsulation },
  { id: 'network-topology', title: '网络拓扑结构', category: '网络架构', Component: NetworkTopology },
  { id: 'routing-table', title: '路由表', category: '路由交换', Component: RoutingTable },
  { id: 'routing-process', title: '路由转发过程', category: '路由交换', Component: RoutingProcess },
  { id: 'vlan-diagram', title: 'VLAN 划分', category: '路由交换', Component: VlanDiagram },
  { id: 'stp-topology', title: 'STP 生成树', category: '路由交换', Component: STPTopology },
  { id: 'encryption-flow', title: '加密流程', category: '网络安全', Component: EncryptionFlow },
  { id: 'firewall-types', title: '防火墙类型', category: '网络安全', Component: FirewallTypes },
  { id: 'vpn-tunnel', title: 'VPN 隧道', category: '网络安全', Component: VPNTunnel },
  { id: 'wireless-standards', title: '无线标准', category: '无线通信', Component: WirelessStandards },
  { id: 'cellular-network', title: '蜂窝网络', category: '无线通信', Component: CellularNetwork },
  { id: 'fiber-optic', title: '光纤通信', category: '电信网络', Component: FiberOptic },
  { id: 'sdn-architecture', title: 'SDN 架构', category: '网络架构', Component: SDNArchitecture },
  { id: 'snmp-diagram', title: 'SNMP 管理', category: '网络运维', Component: SNMPDiagram },
  { id: 'fault-diagnosis', title: '故障诊断', category: '网络运维', Component: FaultDiagnosis },
];

const categories = ['全部', ...Array.from(new Set(diagrams.map(d => d.category)))];

export default function DiagramsPage() {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeCategory === '全部'
    ? diagrams
    : diagrams.filter(d => d.category === activeCategory);

  return (
    <div>
      <div className="mb-8 animate-in">
        <h1 className="text-2xl font-bold text-[var(--text)] tracking-tight">交互式图表</h1>
        <p className="text-[var(--text-muted)] text-sm mt-1">可视化理解网络概念，点击展开查看详情</p>
      </div>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2 mb-8 animate-in" style={{ animationDelay: '0.06s' }}>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-secondary'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 图表列表 */}
      <div className="space-y-4">
        {filtered.map((diagram, i) => {
          const isExpanded = expandedId === diagram.id;
          return (
            <div
              key={diagram.id}
              className="card overflow-hidden animate-in"
              style={{ animationDelay: `${(i + 2) * 0.06}s` }}
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : diagram.id)}
                className="w-full flex items-center justify-between px-5 sm:px-6 py-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="tag tag-blue">{diagram.category}</span>
                  <h3 className="font-semibold text-[14.5px] text-[var(--text)]">{diagram.title}</h3>
                </div>
                <span className="text-[var(--text-muted)] text-sm transition-transform duration-200"
                  style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0)' }}>
                  ▼
                </span>
              </button>

              {isExpanded && (
                <div className="px-3 sm:px-5 pb-5 pt-1 border-t" style={{ borderColor: 'var(--border-light)' }}>
                  <div className="p-4 sm:p-5 rounded-xl" style={{ background: 'var(--bg-warm)' }}>
                    <diagram.Component />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
