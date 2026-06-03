'use client';

import { useState } from 'react';

interface FirewallType {
  id: string;
  name: string;
  nameEn: string;
  osiLayer: string;
  color: string;
  speed: number;
  security: number;
  principle: string;
  pros: string[];
  cons: string[];
  useCase: string;
}

const firewallTypes: FirewallType[] = [
  {
    id: 'packet-filter',
    name: '包过滤防火墙',
    nameEn: 'Packet Filter',
    osiLayer: 'L3/L4 网络层/传输层',
    color: '#38bdf8',
    speed: 5,
    security: 2,
    principle: '工作在网络层和传输层，检查每个数据包的包头信息（源IP、目标IP、源端口、目标端口、协议类型）。根据预设的ACL（访问控制列表）规则决定放行或丢弃。无状态——每个包独立判断，不跟踪连接状态。',
    pros: ['处理速度极快，对网络性能影响小', '配置简单，规则直观易懂', '对用户完全透明，无需安装客户端'],
    cons: ['无法检测应用层攻击（如SQL注入）', '不能跟踪连接状态，容易被IP欺骗', '规则管理复杂时容易出错和冲突', '不支持深度包检测'],
    useCase: '小型网络的边界防护、路由器内置的基本过滤、作为其他防火墙的第一道防线',
  },
  {
    id: 'stateful',
    name: '状态检测防火墙',
    nameEn: 'Stateful Inspection',
    osiLayer: 'L3/L4 网络层/传输层',
    color: '#3b82f6',
    speed: 4,
    security: 3,
    principle: '在包过滤基础上增加了"状态表"（State Table）。跟踪每个连接的完整生命周期（建立→传输→断开），只允许属于已建立连接的数据包通过。例如：内部主机主动发起的TCP连接，回程流量自动放行。',
    pros: ['跟踪连接状态，防止IP欺骗和端口扫描', '自动处理回程流量，减少规则数量', '比包过滤更安全，性能损失可控'],
    cons: ['无法检查应用层内容', '状态表消耗内存，高并发时可能成为瓶颈', '对UDP和ICMP等无连接协议的状态跟踪有限'],
    useCase: '企业网络边界防火墙（最常用的类型）、中小型数据中心入口防护',
  },
  {
    id: 'application',
    name: '应用层防火墙',
    nameEn: 'Application Proxy',
    osiLayer: 'L7 应用层',
    color: '#6366f1',
    speed: 2,
    security: 4,
    principle: '工作在应用层，作为客户端和服务器之间的"代理"。客户端先与防火墙建立连接，防火墙检查应用层数据内容后，再以自己的身份与服务器建立连接。能理解HTTP、FTP、SMTP等应用协议的语义。',
    pros: ['能检测应用层攻击（SQL注入、XSS、恶意文件）', '可以记录详细的审计日志', '能过滤特定内容（如URL、文件类型）'],
    cons: ['性能开销大，每个连接都需要代理处理', '需要针对每种应用协议编写代理程序', '对加密流量（HTTPS）检查需要解密，增加延迟', '可能破坏某些应用协议的正常工作'],
    useCase: 'Web应用防火墙（WAF）、邮件安全网关、需要内容审计的场景',
  },
  {
    id: 'ngfw',
    name: '下一代防火墙',
    nameEn: 'NGFW',
    osiLayer: 'L3-L7 全层',
    color: '#a855f7',
    speed: 3,
    security: 5,
    principle: '集传统防火墙、IPS、应用识别、URL过滤、恶意软件防护于一体。通过DPI（深度包检测）识别具体应用（如区分Skype和正常HTTPS流量），结合威胁情报和签名库进行实时防护。支持SSL/TLS解密检查。',
    pros: ['应用层可视化，能识别和控制6000+应用', '集成IPS/IDS，主动防御入侵', '支持SSL解密检查加密威胁', '统一策略管理，减少设备堆叠'],
    cons: ['价格昂贵，许可费用高', '功能复杂，配置和维护需要专业知识', '全功能开启时性能下降明显', 'SSL解密可能引发隐私和合规问题'],
    useCase: '大型企业全面安全防护、数据中心边界、需要满足等保要求的场景',
  },
];

export default function FirewallTypes() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [compareItems, setCompareItems] = useState<string[]>([]);

  const toggleCompare = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCompareItems((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const renderStars = (count: number, max: number, color: string) => (
    <div className="flex gap-0.5">
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 14 14">
          <polygon
            points="7,1 8.8,5 13,5.5 9.9,8.2 10.8,12.5 7,10.3 3.2,12.5 4.1,8.2 1,5.5 5.2,5"
            fill={i < count ? color : 'transparent'}
            stroke={i < count ? color : 'var(--border)'}
            strokeWidth="1"
          />
        </svg>
      ))}
    </div>
  );

  const compareA = compareItems.length >= 1 ? firewallTypes.find((f) => f.id === compareItems[0]) : null;
  const compareB = compareItems.length >= 2 ? firewallTypes.find((f) => f.id === compareItems[1]) : null;

  return (
    <div className="firewall-diagram">
      {/* 安全等级进度条 */}
      <div className="mb-4 px-5 py-3 rounded-xl" style={{ background: 'var(--surface)', border: '1.5px solid var(--border)' }}>
        <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>安全等级演进</div>
        <div className="flex items-center gap-1">
          {firewallTypes.map((fw, i) => (
            <div key={fw.id} className="flex items-center flex-1">
              <div
                className="h-2 flex-1 rounded-full transition-all duration-300"
                style={{
                  background: `linear-gradient(90deg, ${fw.color}40, ${fw.color})`,
                  opacity: 0.3 + (i + 1) * 0.175,
                }}
              />
              {i < firewallTypes.length - 1 && (
                <svg width="16" height="12" viewBox="0 0 16 12" className="flex-shrink-0 mx-0.5">
                  <path d="M2 6 L12 6 M9 3 L12 6 L9 9" stroke={fw.color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                </svg>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-1.5">
          {firewallTypes.map((fw) => (
            <span key={fw.id} className="text-[10px]" style={{ color: fw.color }}>{fw.nameEn}</span>
          ))}
        </div>
      </div>

      {/* 防火墙类型卡片 */}
      <div className="flex flex-col gap-[3px]">
        {firewallTypes.map((fw) => {
          const isActive = activeType === fw.id;
          const isCompare = compareItems.includes(fw.id);
          return (
            <div key={fw.id}>
              <button
                onClick={() => {
                  setActiveType(isActive ? null : fw.id);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${fw.color}10, ${fw.color}05)`
                      : isCompare
                      ? `${fw.color}06`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive || isCompare ? fw.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${fw.color}12` : 'none',
                  }}
                >
                  {/* 图标 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${fw.color}, ${fw.color}cc)` }}
                  >
                    {firewallTypes.indexOf(fw) + 1}
                  </div>

                  {/* 名称和OSI层 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? fw.color : 'var(--text)' }}>
                        {fw.name}
                      </span>
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {fw.nameEn}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span
                        className="text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                        style={{ background: fw.color + '10', color: fw.color, border: `1px solid ${fw.color}20` }}
                      >
                        {fw.osiLayer}
                      </span>
                    </div>
                  </div>

                  {/* 评分 */}
                  <div className="hidden sm:flex flex-col items-end gap-1 ml-4 flex-shrink-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>速度</span>
                      {renderStars(fw.speed, 5, fw.color)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>安全</span>
                      {renderStars(fw.security, 5, fw.color)}
                    </div>
                  </div>

                  {/* 对比按钮 */}
                  <button
                    onClick={(e) => toggleCompare(fw.id, e)}
                    className="ml-3 w-6 h-6 rounded-md flex items-center justify-center text-[11px] transition-all duration-200 flex-shrink-0"
                    style={{
                      background: isCompare ? fw.color + '20' : 'var(--surface)',
                      color: isCompare ? fw.color : 'var(--text-muted)',
                      border: `1px solid ${isCompare ? fw.color + '40' : 'var(--border)'}`,
                    }}
                    title="选中对比"
                  >
                    {isCompare ? (compareItems.indexOf(fw.id) + 1) : '+'}
                  </button>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-4 mt-1 mb-2 px-5 py-5 rounded-xl"
                  style={{ background: fw.color + '05', border: `1.5px solid ${fw.color}20` }}
                >
                  {/* 工作原理 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: fw.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: fw.color }}>工作原理</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {fw.principle}
                    </div>
                  </div>

                  {/* 优缺点 */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="px-4 py-3 rounded-lg" style={{ background: '#22c55e08', border: '1px solid #22c55e15' }}>
                      <div className="text-[12px] font-semibold mb-2" style={{ color: '#22c55e' }}>优势</div>
                      <ul className="space-y-1">
                        {fw.pros.map((p, i) => (
                          <li key={i} className="text-[12.5px] flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span style={{ color: '#22c55e' }}>+</span>
                            {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="px-4 py-3 rounded-lg" style={{ background: '#ef444408', border: '1px solid #ef444415' }}>
                      <div className="text-[12px] font-semibold mb-2" style={{ color: '#ef4444' }}>局限</div>
                      <ul className="space-y-1">
                        {fw.cons.map((c, i) => (
                          <li key={i} className="text-[12.5px] flex items-start gap-2" style={{ color: 'var(--text-secondary)' }}>
                            <span style={{ color: '#ef4444' }}>-</span>
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 典型场景 */}
                  <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>典型场景：</span>
                    {fw.useCase}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 对比面板 */}
      {compareA && compareB && (
        <div className="mt-5 mx-4 px-5 py-4 rounded-xl" style={{ background: 'var(--surface)', border: '1.5px solid var(--border)' }}>
          <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text)' }}>
            对比：{compareA.name} vs {compareB.name}
          </div>
          <div className="space-y-0">
            {[
              { label: 'OSI层级', a: compareA.osiLayer, b: compareB.osiLayer },
              { label: '速度', a: '★'.repeat(compareA.speed) + '☆'.repeat(5 - compareA.speed), b: '★'.repeat(compareB.speed) + '☆'.repeat(5 - compareB.speed) },
              { label: '安全', a: '★'.repeat(compareA.security) + '☆'.repeat(5 - compareA.security), b: '★'.repeat(compareB.security) + '☆'.repeat(5 - compareB.security) },
              { label: '优势', a: compareA.pros[0], b: compareB.pros[0] },
              { label: '局限', a: compareA.cons[0], b: compareB.cons[0] },
              { label: '场景', a: compareA.useCase.slice(0, 25) + '...', b: compareB.useCase.slice(0, 25) + '...' },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-[70px_1fr_1fr] gap-3 py-2.5 text-[12.5px]"
                style={{ borderBottom: i < 5 ? '1px solid var(--border)' : 'none' }}
              >
                <div className="font-semibold" style={{ color: 'var(--text)' }}>{row.label}</div>
                <div style={{ color: compareA.color }}>{row.a}</div>
                <div style={{ color: compareB.color }}>{row.b}</div>
              </div>
            ))}
          </div>
          <button
            onClick={() => setCompareItems([])}
            className="mt-3 text-[11px] px-3 py-1 rounded-md transition-all duration-200"
            style={{ background: 'var(--surface)', color: 'var(--text-muted)', border: '1px solid var(--border)' }}
          >
            清除对比
          </button>
        </div>
      )}

      {compareItems.length === 1 && (
        <div className="mt-3 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
          再选择一种防火墙类型进行对比
        </div>
      )}

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击展开详情 · 点击 [+ ] 按钮选择两种类型进行对比
      </div>
    </div>
  );
}
