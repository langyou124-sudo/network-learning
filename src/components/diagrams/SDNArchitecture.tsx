'use client';

import { useState } from 'react';

interface Component {
  name: string;
  role: string;
}

interface Layer {
  name: string;
  nameEn: string;
  color: string;
  subtitle: string;
  components: Component[];
  description: string;
  example: string;
  keyConcept: string;
  protocols: string[];
}

const layers: Layer[] = [
  {
    name: '应用层',
    nameEn: 'Application Plane',
    color: '#3b82f6',
    subtitle: '网络应用与业务逻辑',
    components: [
      { name: '网络监控', role: '实时监控网络状态、流量分析、故障告警。如Prometheus+Grafana监控方案。' },
      { name: '流量工程', role: '根据业务需求动态调整流量路径，优化带宽利用率，避免链路过载。' },
      { name: '安全策略', role: '集中管理防火墙规则、访问控制列表(ACL)，实现统一安全策略下发。' },
      { name: '负载均衡', role: '智能分配服务器流量，根据服务器负载、响应时间动态调整分配策略。' },
      { name: 'Intent-Based Networking', role: '基于意图的网络——管理员只需声明"我想要什么"，系统自动翻译为具体配置。例如"禁止研发部访问财务系统"。' },
    ],
    description: '这一层是网络管理者与SDN交互的界面。传统网络中，管理员需要逐台设备登录配置；SDN中，管理员通过应用层统一定义网络策略，控制器自动下发到所有设备。',
    example: '企业网络管理员通过SDN应用界面，定义"视频会议流量优先"的策略 → 应用层将意图翻译为QoS规则 → 通过北向API下发给控制器。',
    keyConcept: '北向API (Northbound API) 是应用层与控制器之间的接口，通常使用REST API。应用不需要知道底层网络细节，只需表达意图。',
    protocols: ['REST API', 'JSON/XML', 'Intent API'],
  },
  {
    name: '控制层',
    nameEn: 'Control Plane',
    color: '#22c55e',
    subtitle: 'SDN控制器 —— 网络的大脑',
    components: [
      { name: 'OpenDaylight (ODL)', role: 'Linux基金会主导的开源SDN控制器，Java编写，模块化架构。支持OpenFlow、NETCONF、BGP等多种南向协议。适用于企业和服务提供商网络。' },
      { name: 'ONOS', role: '面向运营商的开源SDN控制器，主打高性能和高可用。由ON.Lab开发，适合大规模网络部署。' },
      { name: 'Cisco ACI', role: 'Cisco的商业SDN解决方案，将策略模型与物理/虚拟基础设施结合。使用APIC控制器集中管理。' },
      { name: 'VMware NSX', role: 'VMware的网络虚拟化平台，专注于数据中心网络。在虚拟化层面实现SDN，不依赖物理交换机支持OpenFlow。' },
      { name: 'Floodlight', role: '轻量级开源SDN控制器，Java编写，适合学习和小型实验环境。Big Switch Networks出品。' },
    ],
    description: 'SDN控制器是整个架构的核心，相当于网络的"大脑"。它掌握全网拓扑、链路状态、设备信息，集中计算最优路径和策略，然后通过南向接口下发给基础设施层的设备。',
    example: '网络拓扑变化（某链路故障）→ 控制器立即感知 → 重新计算路由 → 通过OpenFlow下发新流表 → 所有受影响的交换机在毫秒内更新转发规则。',
    keyConcept: '控制器的核心价值在于"集中控制"——传统网络每台设备独立决策，SDN由控制器统一决策。这带来全局最优而非局部最优。',
    protocols: ['OpenFlow', 'NETCONF', 'RESTCONF', 'gRPC', 'YANG'],
  },
  {
    name: '基础设施层',
    nameEn: 'Infrastructure Plane',
    color: '#f97316',
    subtitle: '物理/虚拟网络设备',
    components: [
      { name: 'OpenFlow交换机', role: '支持OpenFlow协议的交换机，转发规则由控制器远程下发。分为"纯OpenFlow"和"混合"两种模式。' },
      { name: '白盒交换机', role: '通用硬件+开放NOS(网络操作系统)。如使用Cumulus Linux的交换机，成本远低于传统品牌交换机。' },
      { name: '虚拟交换机 (OVS)', role: 'Open vSwitch，运行在虚拟化平台上的软件交换机。支持OpenFlow，是云计算环境的核心组件。' },
      { name: '传统路由器/交换机', role: '在混合SDN环境中，传统设备可通过NETCONF/CLI被控制器管理，逐步向SDN过渡。' },
    ],
    description: '基础设施层是实际转发数据的网络设备。在SDN架构中，这些设备变成"哑转发器"——它们不自己做决策，只执行控制器下发的流表规则。',
    example: '交换机收到数据包 → 匹配流表 → 如果命中则按规则转发 → 如果未命中则发送Packet-In消息给控制器 → 控制器决定后下发新流表。',
    keyConcept: 'OpenFlow协议是南向接口的事实标准。它定义了交换机的流表(Flow Table)结构：匹配字段(Match) + 动作(Action) + 计数器(Counter) + 超时(Timeout)。',
    protocols: ['OpenFlow 1.3/1.5', 'OF-Config', 'OVSDB', 'P4'],
  },
];

const comparisonItems = [
  { aspect: '控制方式', traditional: '分布式：每台设备独立运行路由协议，各自决策', sdn: '集中式：控制器掌握全局视图，统一决策下发' },
  { aspect: '配置管理', traditional: '逐台设备SSH登录配置，CLI命令行操作', sdn: '控制器统一配置，应用层批量下发策略' },
  { aspect: '网络创新', traditional: '依赖设备厂商开发新功能，周期长、成本高', sdn: '应用层可自行开发，开放API快速迭代' },
  { aspect: '故障处理', traditional: '人工逐跳排查，效率低', sdn: '控制器全局感知，自动重路由' },
  { aspect: '灵活性', traditional: '设备与控制紧密耦合，更换厂商成本高', sdn: '控制与转发分离，硬件可替换' },
];

const openFlowEntries = [
  { match: 'src_ip=10.0.0.1, dst_ip=10.0.0.2', action: 'output:port3', priority: 100, description: '主机1到主机2的流量从端口3转发' },
  { match: 'eth_type=0x0800, tcp_dst=80', action: 'output:port1', priority: 50, description: '所有HTTP流量从端口1转发' },
  { match: 'src_mac=AA:BB:CC:DD:EE:FF', action: 'drop', priority: 200, description: '丢弃特定MAC地址的所有流量（黑名单）' },
  { match: 'in_port=1, vlan_id=100', action: 'push_vlan:200, output:port2', priority: 80, description: 'VLAN标签转换：100→200后转发' },
];

export default function SDNArchitecture() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);
  const [showOpenFlow, setShowOpenFlow] = useState(false);
  const [showNFV, setShowNFV] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  return (
    <div className="sdn-diagram">
      {/* 三层架构 */}
      <div className="flex flex-col gap-[3px]">
        {layers.map((layer, idx) => {
          const isActive = activeLayer === idx;
          return (
            <div key={idx}>
              <button
                onClick={() => {
                  setActiveLayer(isActive ? null : idx);
                  setActiveComponent(null);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${layer.color}10, ${layer.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? layer.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${layer.color}12` : 'none',
                  }}
                >
                  {/* 层标识 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${layer.color}, ${layer.color}cc)` }}
                  >
                    {idx + 1}
                  </div>

                  {/* 协议标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 mr-4 flex-shrink-0">
                    {layer.protocols.slice(0, 2).map(p => (
                      <span
                        key={p}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: layer.color + '10', color: layer.color, border: `1px solid ${layer.color}20` }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? layer.color : 'var(--text)' }}>
                        {layer.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {layer.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {layer.subtitle}
                    </div>
                  </div>

                  {/* 组件数 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium flex-shrink-0 hidden md:block"
                    style={{ background: layer.color + '10', color: layer.color, border: `1px solid ${layer.color}20` }}
                  >
                    {layer.components.length} 组件
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{ background: layer.color + '05', border: `1.5px solid ${layer.color}20` }}
                >
                  {/* 核心概念 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: layer.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: layer.color }}>核心概念</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {layer.keyConcept}
                    </div>
                  </div>

                  {/* 详细说明 */}
                  <div className="mb-4 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {layer.description}
                  </div>

                  {/* 实际场景 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>实际场景：</span>
                    {layer.example}
                  </div>

                  {/* 组件详情 */}
                  <div className="space-y-2">
                    <div className="text-[12px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                      {idx === 0 ? '应用类型' : idx === 1 ? '主流控制器' : '网络设备'}
                    </div>
                    {layer.components.map(c => (
                      <button
                        key={c.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveComponent(activeComponent === c.name ? null : c.name);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          background: activeComponent === c.name ? 'var(--surface)' : 'transparent',
                          border: `1px solid ${activeComponent === c.name ? layer.color + '30' : 'var(--border-light)'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold" style={{ color: layer.color }}>{c.name}</span>
                        </div>
                        {activeComponent === c.name && (
                          <div className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {c.role}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 层间连接示意 */}
      <div className="mt-3 flex items-center justify-center gap-2 text-[12px]" style={{ color: 'var(--text-muted)' }}>
        <span className="px-2.5 py-0.5 rounded-md font-medium" style={{ background: '#3b82f6' + '10', color: '#3b82f6', border: '1px solid #3b82f620' }}>应用层</span>
        <span>—</span>
        <span className="font-mono text-[11px]">北向 REST API</span>
        <span>—</span>
        <span className="px-2.5 py-0.5 rounded-md font-medium" style={{ background: '#22c55e' + '10', color: '#22c55e', border: '1px solid #22c55e20' }}>控制层</span>
        <span>—</span>
        <span className="font-mono text-[11px]">南向 OpenFlow</span>
        <span>—</span>
        <span className="px-2.5 py-0.5 rounded-md font-medium" style={{ background: '#f97316' + '10', color: '#f97316', border: '1px solid #f9731620' }}>基础设施层</span>
      </div>

      {/* 附加内容区 */}
      <div className="mt-6 space-y-[3px]">
        {/* 传统 vs SDN 对比 */}
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full text-left transition-all duration-300"
        >
          <div
            className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
            style={{
              background: showComparison ? 'linear-gradient(135deg, #8b5cf610, #8b5cf605)' : 'var(--surface)',
              border: `1.5px solid ${showComparison ? '#8b5cf640' : 'var(--border)'}`,
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #8b5cf6, #8b5cf6cc)' }}>
              vs
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[15px]" style={{ color: showComparison ? '#8b5cf6' : 'var(--text)' }}>
                传统网络 vs SDN 对比
              </span>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                了解SDN相比传统网络的核心优势
              </div>
            </div>
          </div>
        </button>

        {showComparison && (
          <div className="mx-4 mb-2 px-5 py-5 rounded-xl" style={{ background: '#8b5cf605', border: '1.5px solid #8b5cf620' }}>
            <div className="space-y-3">
              {comparisonItems.map((item, i) => (
                <div key={i} className="px-4 py-3 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="text-[12px] font-semibold mb-2" style={{ color: '#8b5cf6' }}>{item.aspect}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div className="text-[12px] px-3 py-2 rounded-md" style={{ background: '#ef4444' + '08', border: '1px solid #ef4444' + '15' }}>
                      <span className="font-medium" style={{ color: '#ef4444' }}>传统：</span>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>{item.traditional}</span>
                    </div>
                    <div className="text-[12px] px-3 py-2 rounded-md" style={{ background: '#22c55e' + '08', border: '1px solid #22c55e' + '15' }}>
                      <span className="font-medium" style={{ color: '#22c55e' }}>SDN：</span>{' '}
                      <span style={{ color: 'var(--text-secondary)' }}>{item.sdn}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* OpenFlow 流表 */}
        <button
          onClick={() => setShowOpenFlow(!showOpenFlow)}
          className="w-full text-left transition-all duration-300"
        >
          <div
            className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
            style={{
              background: showOpenFlow ? 'linear-gradient(135deg, #f9731610, #f9731605)' : 'var(--surface)',
              border: `1.5px solid ${showOpenFlow ? '#f9731640' : 'var(--border)'}`,
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #f97316, #f97316cc)' }}>
              FT
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[15px]" style={{ color: showOpenFlow ? '#f97316' : 'var(--text)' }}>
                OpenFlow 流表 (Flow Table)
              </span>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Match-Action Table 示例
              </div>
            </div>
          </div>
        </button>

        {showOpenFlow && (
          <div className="mx-4 mb-2 px-5 py-5 rounded-xl" style={{ background: '#f9731605', border: '1.5px solid #f9731620' }}>
            <div className="mb-3 px-4 py-3 rounded-lg" style={{ background: '#f9731608' }}>
              <div className="text-[12px] font-semibold mb-1" style={{ color: '#f97316' }}>Match-Action 工作原理</div>
              <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                交换机收到数据包后，依次匹配流表条目。优先级高的先匹配。命中则执行对应动作（转发、丢弃、修改报文）；未命中则通过Packet-In发送给控制器。
              </div>
            </div>
            <div className="space-y-2">
              {openFlowEntries.map((entry, i) => (
                <div key={i} className="px-4 py-3 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[11px] font-mono px-2 py-0.5 rounded-md" style={{ background: '#f97316' + '10', color: '#f97316' }}>
                      优先级: {entry.priority}
                    </span>
                  </div>
                  <div className="text-[12px] font-mono" style={{ color: 'var(--text)' }}>
                    <span style={{ color: '#3b82f6' }}>Match:</span> {entry.match}
                  </div>
                  <div className="text-[12px] font-mono mt-0.5" style={{ color: 'var(--text)' }}>
                    <span style={{ color: '#22c55e' }}>Action:</span> {entry.action}
                  </div>
                  <div className="text-[12px] mt-1" style={{ color: 'var(--text-muted)' }}>
                    {entry.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* NFV 关系 */}
        <button
          onClick={() => setShowNFV(!showNFV)}
          className="w-full text-left transition-all duration-300"
        >
          <div
            className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
            style={{
              background: showNFV ? 'linear-gradient(135deg, #06b6d410, #06b6d405)' : 'var(--surface)',
              border: `1.5px solid ${showNFV ? '#06b6d440' : 'var(--border)'}`,
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #06b6d4cc)' }}>
              NFV
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[15px]" style={{ color: showNFV ? '#06b6d4' : 'var(--text)' }}>
                SDN 与 NFV 的关系
              </span>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Network Function Virtualization — 网络功能虚拟化
              </div>
            </div>
          </div>
        </button>

        {showNFV && (
          <div className="mx-4 mb-2 px-5 py-5 rounded-xl" style={{ background: '#06b6d405', border: '1.5px solid #06b6d420' }}>
            <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: '#06b6d408' }}>
              <div className="text-[12px] font-semibold mb-1" style={{ color: '#06b6d4' }}>什么是NFV？</div>
              <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                传统网络中，防火墙、负载均衡器、路由器都是专用硬件设备。NFV将这些网络功能从专用硬件中解耦出来，以软件形式运行在通用服务器上。一台x86服务器可以同时运行多个虚拟网络功能(VNF)。
              </div>
            </div>
            <div className="space-y-3 mb-4">
              <div className="px-4 py-3 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="text-[13px] font-semibold mb-1" style={{ color: '#06b6d4' }}>SDN vs NFV</div>
                <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  SDN关注的是&ldquo;控制与转发分离&rdquo;——把网络设备的决策权集中到控制器。NFV关注的是&ldquo;软硬件分离&rdquo;——把网络功能从专用设备搬到通用服务器。两者互补：SDN提供灵活的网络控制，NFV提供灵活的网络功能部署。
                </div>
              </div>
              <div className="px-4 py-3 rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
                <div className="text-[13px] font-semibold mb-1" style={{ color: '#06b6d4' }}>典型应用场景</div>
                <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  运营商网络：SDN控制器管理流量路径 + NFV部署虚拟CPE（客户端设备）、虚拟防火墙、虚拟路由器。企业无需购买专用设备，按需开通网络服务，大幅降低CAPEX和OPEX。
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各层展开详情和组件说明 · 附加内容展示SDN核心技术对比
      </div>
    </div>
  );
}
