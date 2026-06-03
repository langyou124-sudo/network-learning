'use client';

import { useState } from 'react';

interface PacketHeader {
  srcIp: string;
  dstIp: string;
  srcMac: string;
  dstMac: string;
  ttl: number;
}

interface RoutingStep {
  id: number;
  name: string;
  nameEn: string;
  color: string;
  location: string;
  description: string;
  detail: string;
  header: PacketHeader;
  routeTable?: { destination: string; nextHop: string; interface: string; metric: number }[];
}

const steps: RoutingStep[] = [
  {
    id: 1,
    name: 'ARP请求',
    nameEn: 'ARP Request',
    color: '#3b82f6',
    location: '源PC (192.168.1.100)',
    description: '源PC要发送数据给10.0.0.2，但不知道下一跳路由器的MAC地址。PC查看自己的路由表，发现默认网关是192.168.1.1。于是发出ARP请求："谁是192.168.1.1？请告诉192.168.1.100"。',
    detail: 'ARP请求是广播帧（目标MAC=FF:FF:FF:FF:FF:FF），同一广播域的所有设备都会收到。路由器R1收到后发现ARP请求问的是自己的IP，于是单播回复自己的MAC地址。PC收到ARP回复后，将192.168.1.1的MAC地址存入ARP缓存。',
    header: { srcIp: '192.168.1.100', dstIp: '10.0.0.2', srcMac: 'AA:BB:CC:DD:01:01', dstMac: 'FF:FF:FF:FF:FF:FF', ttl: 128 },
  },
  {
    id: 2,
    name: '路由查找',
    nameEn: 'Route Lookup',
    color: '#22c55e',
    location: '路由器R1 (192.168.1.1)',
    description: 'R1收到数据包后，提取目标IP地址10.0.0.2，逐条匹配路由表。路由器使用最长前缀匹配原则：找到匹配位数最多的路由条目。匹配到10.0.0.0/24，下一跳为10.1.1.2，出接口为Serial0/0。',
    detail: '路由查找过程：1) 检查直连路由 → 不匹配。2) 检查静态路由 → 10.0.0.0/24匹配！下一跳10.1.1.2，出接口S0/0，metric=1。3) 如果没有匹配条目，则丢弃数据包并返回ICMP "Destination Unreachable"。最长前缀匹配确保选择最精确的路由。',
    header: { srcIp: '192.168.1.100', dstIp: '10.0.0.2', srcMac: 'AA:BB:CC:DD:01:01', dstMac: 'AA:BB:CC:DD:02:01', ttl: 128 },
    routeTable: [
      { destination: '192.168.1.0/24', nextHop: '直连', interface: 'Fa0/0', metric: 0 },
      { destination: '10.0.0.0/24', nextHop: '10.1.1.2', interface: 'Serial0/0', metric: 1 },
      { destination: '172.16.0.0/16', nextHop: '10.1.1.2', interface: 'Serial0/0', metric: 5 },
      { destination: '0.0.0.0/0', nextHop: '10.1.1.2', interface: 'Serial0/0', metric: 10 },
    ],
  },
  {
    id: 3,
    name: 'TTL递减',
    nameEn: 'TTL Decrement',
    color: '#f97316',
    location: '路由器R1',
    description: '每经过一个路由器，TTL值减1。TTL从128减到127。如果TTL减到0，路由器丢弃数据包并发送ICMP "Time Exceeded"消息给源PC。这是防止数据包在网络中无限循环的保护机制。',
    detail: 'TTL（Time To Live）是IP报头中的8位字段，最大值255。Windows默认初始TTL=128，Linux默认TTL=64。traceroute/tracert工具就是利用TTL机制：依次发送TTL=1,2,3...的包，每个路由器返回ICMP超时消息，从而发现路径上的每个路由器。',
    header: { srcIp: '192.168.1.100', dstIp: '10.0.0.2', srcMac: 'AA:BB:CC:DD:01:01', dstMac: 'AA:BB:CC:DD:02:01', ttl: 127 },
  },
  {
    id: 4,
    name: 'MAC重写',
    nameEn: 'MAC Rewrite',
    color: '#a855f7',
    location: '路由器R2 (10.1.1.2)',
    description: '数据包到达R2后，R2需要将数据包转发给直连网段10.0.0.0/24中的目标主机10.0.0.2。R2用自己的MAC地址作为新的源MAC，用目标主机的MAC地址作为新的目标MAC。IP地址不变，但帧的MAC地址完全改变了。',
    detail: '关键概念：IP地址是端到端不变的（源→目标始终是192.168.1.100→10.0.0.2），但MAC地址是逐跳改变的（每经过一个路由器，源MAC变成当前路由器的出接口MAC，目标MAC变成下一跳的MAC）。这就是为什么IP叫"逻辑地址"，MAC叫"物理地址"——MAC只在本地链路上有意义。',
    header: { srcIp: '192.168.1.100', dstIp: '10.0.0.2', srcMac: 'AA:BB:CC:DD:03:01', dstMac: 'AA:BB:CC:DD:04:01', ttl: 127 },
  },
  {
    id: 5,
    name: '数据交付',
    nameEn: 'Delivery',
    color: '#ef4444',
    location: '目标主机 (10.0.0.2)',
    description: '数据包到达目标主机10.0.0.2。目标主机检查：1) 目标MAC是自己的 → 接收帧。2) 目标IP是自己的 → 处理数据。3) TTL>0 → 有效。4) 校验和正确 → 提取上层数据交给传输层处理。',
    detail: '交付过程：目标主机的网卡收到帧 → 数据链路层检查目标MAC → 匹配！→ 去掉帧头，把IP包交给网络层 → 网络层检查目标IP → 匹配！→ 检查协议字段（TCP=6/UDP=17）→ 去掉IP头，把段/数据报交给传输层 → 传输层根据端口号交给对应的应用程序。整个过程完成了从源PC到目标主机的数据传输。',
    header: { srcIp: '192.168.1.100', dstIp: '10.0.0.2', srcMac: 'AA:BB:CC:DD:03:01', dstMac: 'AA:BB:CC:DD:04:01', ttl: 127 },
  },
];

export default function RoutingProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [playingStep, setPlayingStep] = useState<number | null>(null);

  const handlePlay = () => {
    setPlayingStep(0);
    let current = 0;
    const interval = setInterval(() => {
      current++;
      if (current >= steps.length) {
        clearInterval(interval);
        setTimeout(() => setPlayingStep(null), 1500);
        return;
      }
      setPlayingStep(current);
    }, 1800);
  };

  return (
    <div className="routing-process">
      {/* 路径示意 */}
      <div className="flex items-center justify-center gap-1 mb-5 overflow-x-auto">
        <div className="flex items-center gap-1 flex-shrink-0">
          {['PC', 'R1', 'R2', 'PC'].map((node, i) => (
            <div key={i} className="flex items-center gap-1">
              <div
                className="px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all duration-300"
                style={{
                  background: i === 0 ? '#3b82f610' : i === 3 ? '#ef444410' : '#6366f110',
                  border: `1.5px solid ${i === 0 ? '#3b82f630' : i === 3 ? '#ef444430' : '#6366f130'}`,
                  color: i === 0 ? '#3b82f6' : i === 3 ? '#ef4444' : '#6366f1',
                }}
              >
                {i === 0 ? '源 192.168.1.100' : i === 3 ? '目标 10.0.0.2' : node}
              </div>
              {i < 3 && <span className="text-[14px]" style={{ color: 'var(--text-muted)' }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      {/* 播放按钮 */}
      <div className="flex justify-center mb-5">
        <button
          onClick={handlePlay}
          disabled={playingStep !== null}
          className="text-[12px] font-medium px-5 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
          style={{
            background: playingStep !== null ? '#6366f110' : '#6366f1',
            color: playingStep !== null ? '#6366f1' : 'white',
            border: `1.5px solid ${playingStep !== null ? '#6366f130' : '#6366f1'}`,
            opacity: playingStep !== null ? 0.7 : 1,
          }}
        >
          <span className="text-[14px]">{playingStep !== null ? '▶' : '▶'}</span>
          {playingStep !== null ? `正在演示步骤 ${playingStep + 1}/${steps.length}` : '播放数据包转发过程'}
        </button>
      </div>

      {/* 步骤卡片列表 */}
      <div className="flex flex-col gap-[3px]">
        {steps.map((step) => {
          const isActive = activeStep === step.id;
          const isPlaying = playingStep === step.id - 1;
          return (
            <div key={step.id}>
              <button
                onClick={() => setActiveStep(isActive ? null : step.id)}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive || isPlaying ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive || isPlaying
                      ? `linear-gradient(135deg, ${step.color}10, ${step.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive || isPlaying ? step.color + '40' : 'var(--border)'}`,
                    boxShadow: (isActive || isPlaying) ? `0 4px 20px ${step.color}12` : 'none',
                  }}
                >
                  {/* 步骤号 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                  >
                    {step.id}
                  </div>

                  {/* 位置标签 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: step.color + '10', color: step.color, border: `1px solid ${step.color}20` }}
                  >
                    {step.location}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive || isPlaying ? step.color : 'var(--text)' }}>
                        {step.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {step.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {step.description.slice(0, 55)}...
                    </div>
                  </div>

                  {/* TTL标签 */}
                  <div className="hidden sm:flex items-center gap-1 ml-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-md font-mono font-medium" style={{ background: step.color + '10', color: step.color, border: `1px solid ${step.color}20` }}>
                      TTL: {step.header.ttl}
                    </span>
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {(isActive || isPlaying) && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{ background: step.color + '05', border: `1.5px solid ${step.color}20` }}
                >
                  {/* 详细说明 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: step.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: step.color }}>过程详解</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {step.description}
                    </div>
                  </div>

                  {/* 补充说明 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>技术细节：</span>
                    {step.detail}
                  </div>

                  {/* 报文头变化 */}
                  <div className="mb-4">
                    <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>报文头部</div>
                    <div
                      className="rounded-lg overflow-hidden"
                      style={{ border: `1px solid ${step.color}15` }}
                    >
                      <div className="grid grid-cols-2 gap-[1px]" style={{ background: step.color + '10' }}>
                        <div className="px-4 py-2.5" style={{ background: 'var(--surface)' }}>
                          <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>源IP</div>
                          <div className="text-[12px] font-mono font-semibold" style={{ color: 'var(--text)' }}>{step.header.srcIp}</div>
                        </div>
                        <div className="px-4 py-2.5" style={{ background: 'var(--surface)' }}>
                          <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>目标IP</div>
                          <div className="text-[12px] font-mono font-semibold" style={{ color: 'var(--text)' }}>{step.header.dstIp}</div>
                        </div>
                        <div className="px-4 py-2.5" style={{ background: 'var(--surface)' }}>
                          <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>源MAC</div>
                          <div className="text-[12px] font-mono font-semibold" style={{ color: step.color }}>{step.header.srcMac}</div>
                        </div>
                        <div className="px-4 py-2.5" style={{ background: 'var(--surface)' }}>
                          <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>目标MAC</div>
                          <div className="text-[12px] font-mono font-semibold" style={{ color: step.color }}>{step.header.dstMac}</div>
                        </div>
                        <div className="px-4 py-2.5 col-span-2" style={{ background: 'var(--surface)' }}>
                          <div className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>TTL</div>
                          <div className="text-[12px] font-mono font-semibold" style={{ color: step.header.ttl < 128 ? '#f97316' : 'var(--text)' }}>
                            {step.header.ttl}
                            {step.id === 3 && <span className="text-[10px] ml-2" style={{ color: '#f97316' }}>(128 → 127)</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 路由表（仅路由查找步骤） */}
                  {step.routeTable && (
                    <div>
                      <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>R1 路由表</div>
                      <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${step.color}15` }}>
                        <div className="grid grid-cols-4 text-[10px] font-semibold px-4 py-2" style={{ background: step.color + '10', color: step.color }}>
                          <span>目标网络</span>
                          <span>下一跳</span>
                          <span>出接口</span>
                          <span>Metric</span>
                        </div>
                        {step.routeTable.map((route, i) => (
                          <div
                            key={i}
                            className="grid grid-cols-4 text-[11px] font-mono px-4 py-2"
                            style={{
                              background: route.destination === '10.0.0.0/24' ? step.color + '08' : 'var(--surface)',
                              borderTop: `1px solid ${step.color}10`,
                              color: 'var(--text-secondary)',
                            }}
                          >
                            <span className={route.destination === '10.0.0.0/24' ? 'font-semibold' : ''} style={{ color: route.destination === '10.0.0.0/24' ? step.color : undefined }}>
                              {route.destination}
                              {route.destination === '10.0.0.0/24' && <span className="text-[9px] ml-1" style={{ color: step.color }}>← 匹配</span>}
                            </span>
                            <span>{route.nextHop}</span>
                            <span>{route.interface}</span>
                            <span>{route.metric}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
          <span>ARP请求</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#22c55e' }} />
          <span>路由查找</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#f97316' }} />
          <span>TTL递减</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#a855f7' }} />
          <span>MAC重写</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-sm" style={{ background: '#ef4444' }} />
          <span>数据交付</span>
        </div>
      </div>

      <div className="mt-3 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各步骤展开报文头变化 · 点击播放按钮查看顺序演示
      </div>
    </div>
  );
}
