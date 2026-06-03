'use client';

import { useState } from 'react';

interface VpnType {
  id: string;
  name: string;
  nameEn: string;
  protocols: string[];
  encryption: string;
  color: string;
  description: string;
  tunnelSteps: string[];
  encapsulation: string[];
}

const vpnTypes: VpnType[] = [
  {
    id: 'remote',
    name: '远程访问VPN',
    nameEn: 'Remote Access VPN',
    protocols: ['PPTP', 'L2TP/IPSec', 'OpenVPN', 'WireGuard'],
    encryption: 'AES-256 / ChaCha20',
    color: '#3b82f6',
    description: '个人用户通过互联网安全接入企业内网。员工在家或出差时，通过VPN客户端建立加密隧道，像在公司内部一样访问内部资源。最常见的VPN类型。',
    tunnelSteps: [
      '用户启动VPN客户端，输入账号密码',
      '客户端与VPN网关进行身份认证（证书/用户名密码）',
      '协商加密算法和密钥（如AES-256）',
      '建立加密隧道，分配内网IP地址',
      '所有流量通过加密隧道传输到企业内网',
    ],
    encapsulation: ['原始数据包', '+ ESP安全头', '+ UDP头(端口500/4500)', '+ 外层IP头'],
  },
  {
    id: 'site-to-site',
    name: '站点到站点VPN',
    nameEn: 'Site-to-Site VPN',
    protocols: ['IPSec', 'GRE over IPSec', 'DMVPN', 'SD-WAN'],
    encryption: 'AES-256 / 3DES',
    color: '#22c55e',
    description: '连接两个不同地理位置的办公网络（如北京总部和上海分公司）。两端的VPN网关自动建立隧道，两端的员工无感知，像在同一个局域网内工作。',
    tunnelSteps: [
      '两端VPN网关配置相同的加密参数',
      'IKE Phase 1：建立安全通道（ISAKMP SA）',
      'IKE Phase 2：协商IPSec参数（IPSec SA）',
      '建立IPSec隧道（ESP封装）',
      '两端内网通过隧道互相通信',
    ],
    encapsulation: ['原始IP包', '+ ESP安全头', '+ UDP/ESP封装', '+ 新IP头(公网地址)'],
  },
  {
    id: 'ssl',
    name: 'SSL VPN',
    nameEn: 'SSL/TLS VPN',
    protocols: ['SSL 3.0', 'TLS 1.2', 'TLS 1.3', 'DTLS'],
    encryption: 'AES-128/256 / ChaCha20-Poly1305',
    color: '#a855f7',
    description: '基于浏览器的VPN，无需安装专用客户端。用户通过HTTPS网页登录即可访问内部Web应用或建立全隧道。部署简单，兼容性好，是目前增长最快的VPN类型。',
    tunnelSteps: [
      '用户通过浏览器访问VPN门户（HTTPS）',
      'SSL/TLS握手：验证服务器证书、协商加密套件',
      '用户通过身份认证（用户名密码+MFA）',
      '建立TLS加密通道',
      '通过Web代理或全隧道访问内部资源',
    ],
    encapsulation: ['应用数据', '+ TLS记录头', '+ TCP头(端口443)', '+ IP头'],
  },
];

interface ProtocolInfo {
  name: string;
  fullName: string;
  layer: string;
  encryption: string;
  speed: string;
  security: string;
  note: string;
}

const protocolTable: ProtocolInfo[] = [
  { name: 'PPTP', fullName: 'Point-to-Point Tunneling Protocol', layer: 'L2/L3', encryption: 'MPPE-128 (已不安全)', speed: '最快', security: '低', note: '已被破解，不建议使用' },
  { name: 'L2TP/IPSec', fullName: 'L2TP + IPSec', layer: 'L2/L3', encryption: 'AES-256', speed: '中等', security: '高', note: '最常见的企业VPN协议' },
  { name: 'IPSec', fullName: 'IP Security Protocol', layer: 'L3', encryption: 'AES-256/3DES', speed: '中等', security: '极高', note: '站点到站点VPN首选' },
  { name: 'OpenVPN', fullName: 'Open Source VPN', layer: 'L3/L4', encryption: 'AES-256 (OpenSSL)', speed: '中等', security: '极高', note: '开源、灵活、跨平台' },
  { name: 'WireGuard', fullName: 'WireGuard', layer: 'L3', encryption: 'ChaCha20', speed: '极快', security: '极高', note: '新一代VPN，代码量仅4000行' },
  { name: 'TLS 1.3', fullName: 'Transport Layer Security 1.3', layer: 'L5-L7', encryption: 'AES-256-GCM', speed: '快', security: '极高', note: 'SSL VPN首选，握手仅1-RTT' },
];

export default function VPNTunnel() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showIKE, setShowIKE] = useState(false);
  const [ikePhase, setIkePhase] = useState<number | null>(null);
  const [showProtocols, setShowProtocols] = useState(false);

  return (
    <div className="vpn-diagram">
      {/* VPN类型卡片 */}
      <div className="flex flex-col gap-[3px]">
        {vpnTypes.map((vpn) => {
          const isActive = activeType === vpn.id;
          return (
            <div key={vpn.id}>
              <button
                onClick={() => {
                  setActiveType(isActive ? null : vpn.id);
                  setActiveStep(null);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${vpn.color}10, ${vpn.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? vpn.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${vpn.color}12` : 'none',
                  }}
                >
                  {/* 图标 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${vpn.color}, ${vpn.color}cc)` }}
                  >
                    {vpnTypes.indexOf(vpn) + 1}
                  </div>

                  {/* 加密级别 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: vpn.color + '10', color: vpn.color, border: `1px solid ${vpn.color}20` }}
                  >
                    {vpn.encryption.split(' / ')[0]}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? vpn.color : 'var(--text)' }}>
                        {vpn.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {vpn.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {vpn.description.slice(0, 50)}...
                    </div>
                  </div>

                  {/* 协议标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[200px] justify-end">
                    {vpn.protocols.slice(0, 3).map((p) => (
                      <span
                        key={p}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: vpn.color + '10', color: vpn.color, border: `1px solid ${vpn.color}20` }}
                      >
                        {p}
                      </span>
                    ))}
                    {vpn.protocols.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5" style={{ color: 'var(--text-muted)' }}>
                        +{vpn.protocols.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{ background: vpn.color + '05', border: `1.5px solid ${vpn.color}20` }}
                >
                  {/* 说明 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: vpn.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: vpn.color }}>工作方式</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {vpn.description}
                    </div>
                  </div>

                  {/* 隧道建立步骤 */}
                  <div className="mb-4">
                    <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>隧道建立过程</div>
                    <div className="space-y-2">
                      {vpn.tunnelSteps.map((step, i) => (
                        <button
                          key={i}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveStep(activeStep === i ? null : i);
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                          style={{
                            background: activeStep === i ? 'var(--surface)' : 'transparent',
                            border: `1px solid ${activeStep === i ? vpn.color + '30' : 'var(--border-light)'}`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                              style={{ background: vpn.color }}
                            >
                              {i + 1}
                            </div>
                            <span className="text-[13px]" style={{ color: activeStep === i ? vpn.color : 'var(--text)' }}>
                              {step}
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 数据封装示意 */}
                  <div className="mb-2">
                    <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>数据封装过程</div>
                    <div className="flex items-center gap-1 flex-wrap">
                      {vpn.encapsulation.map((layer, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <span
                            className="text-[12px] px-3 py-1.5 rounded-lg font-medium"
                            style={{
                              background: i === 0 ? vpn.color + '15' : vpn.color + (10 - i * 2).toString().padStart(2, '0'),
                              color: vpn.color,
                              border: `1px solid ${vpn.color}${i === 0 ? '30' : '20'}`,
                            }}
                          >
                            {layer}
                          </span>
                          {i < vpn.encapsulation.length - 1 && (
                            <svg width="16" height="12" viewBox="0 0 16 12" className="flex-shrink-0">
                              <path d="M2 6 L12 6 M9 3 L12 6 L9 9" stroke={vpn.color} strokeWidth="1.5" fill="none" strokeLinecap="round" />
                            </svg>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      原始数据被层层封装，外层头部用于在公网路由，内层数据被加密保护
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* IPSec IKE 流程 */}
      <div className="mt-5">
        <button
          onClick={() => setShowIKE(!showIKE)}
          className="w-full text-left rounded-xl px-5 py-3.5 transition-all duration-300"
          style={{
            background: showIKE ? 'linear-gradient(135deg, #22c55e10, #3b82f610)' : 'var(--surface)',
            border: `1.5px solid ${showIKE ? '#22c55e40' : 'var(--border)'}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: 'linear-gradient(135deg, #22c55e, #3b82f6)' }}
            >
              🔒
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[14px]" style={{ color: showIKE ? '#22c55e' : 'var(--text)' }}>
                IPSec IKE 密钥交换流程
              </span>
              <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                Internet Key Exchange — VPN隧道的核心协商机制
              </div>
            </div>
            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
              {showIKE ? '收起' : '展开'}
            </span>
          </div>
        </button>

        {showIKE && (
          <div className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl" style={{ background: '#22c55e04', border: '1.5px solid #22c55e15' }}>
            {/* Phase 1 */}
            <button
              onClick={() => setIkePhase(ikePhase === 1 ? null : 1)}
              className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200 mb-2"
              style={{
                background: ikePhase === 1 ? '#22c55e08' : 'transparent',
                border: `1px solid ${ikePhase === 1 ? '#22c55e30' : 'var(--border-light)'}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-bold" style={{ background: '#22c55e' }}>1</div>
                <span className="text-[13px] font-semibold" style={{ color: '#22c55e' }}>
                  IKE Phase 1 — 主模式（Main Mode）
                </span>
                <span className="text-[11px] ml-auto" style={{ color: 'var(--text-muted)' }}>建立ISAKMP SA</span>
              </div>
              {ikePhase === 1 && (
                <div className="mt-3 ml-9 space-y-2 text-[12.5px]" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: '#22c55e' }}>消息1-2</span>
                    <span>SA协商 — 双方交换安全提案（加密算法、哈希算法、认证方式、DH组）</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: '#22c55e' }}>消息3-4</span>
                    <span>DH密钥交换 — 交换DH公钥，各自计算出相同的共享密钥（pre-shared secret）</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: '#22c55e' }}>消息5-6</span>
                    <span>身份验证 — 用共享密钥加密并验证双方身份（预共享密钥或数字证书）</span>
                  </div>
                  <div className="mt-2 px-3 py-2 rounded-md text-[11px]" style={{ background: '#22c55e10', color: '#22c55e' }}>
                    结果：建立一条安全的ISAKMP SA通道，用于保护后续Phase 2的协商过程
                  </div>
                </div>
              )}
            </button>

            {/* Phase 2 */}
            <button
              onClick={() => setIkePhase(ikePhase === 2 ? null : 2)}
              className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
              style={{
                background: ikePhase === 2 ? '#3b82f608' : 'transparent',
                border: `1px solid ${ikePhase === 2 ? '#3b82f630' : 'var(--border-light)'}`,
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-bold" style={{ background: '#3b82f6' }}>2</div>
                <span className="text-[13px] font-semibold" style={{ color: '#3b82f6' }}>
                  IKE Phase 2 — 快速模式（Quick Mode）
                </span>
                <span className="text-[11px] ml-auto" style={{ color: 'var(--text-muted)' }}>建立IPSec SA</span>
              </div>
              {ikePhase === 2 && (
                <div className="mt-3 ml-9 space-y-2 text-[12.5px]" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: '#3b82f6' }}>步骤1</span>
                    <span>在Phase 1的安全通道内，协商IPSec SA参数（ESP/AH、加密算法、封装模式）</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: '#3b82f6' }}>步骤2</span>
                    <span>协商感兴趣流（Traffic Selector）—— 哪些流量需要通过VPN隧道传输</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: '#3b82f6' }}>步骤3</span>
                    <span>生成IPSec会话密钥，建立双向IPSec SA（入站SA和出站SA）</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-bold" style={{ color: '#3b82f6' }}>步骤4</span>
                    <span>开始数据传输 — 符合条件的流量被ESP封装后通过隧道传输</span>
                  </div>
                  <div className="mt-2 px-3 py-2 rounded-md text-[11px]" style={{ background: '#3b82f610', color: '#3b82f6' }}>
                    结果：建立IPSec SA，VPN隧道就绪，数据开始安全传输
                  </div>
                </div>
              )}
            </button>

            {/* 封装示意 */}
            <div className="mt-4 px-4 py-3 rounded-lg" style={{ background: '#a855f708' }}>
              <div className="text-[12px] font-semibold mb-2" style={{ color: '#a855f7' }}>ESP封装结构（传输模式）</div>
              <div className="flex items-center gap-1 overflow-x-auto pb-1">
                {['IP头', 'ESP头', 'TCP/UDP头', '原始数据', 'ESP尾+认证'].map((part, i) => (
                  <div key={i} className="flex items-center gap-1 flex-shrink-0">
                    <span
                      className="text-[11px] px-2.5 py-1.5 rounded-md font-medium whitespace-nowrap"
                      style={{
                        background: i >= 1 && i <= 3 ? '#a855f718' : '#a855f708',
                        color: i >= 1 && i <= 3 ? '#a855f7' : '#a855f790',
                        border: `1px solid ${i >= 1 && i <= 3 ? '#a855f730' : '#a855f715'}`,
                      }}
                    >
                      {part}
                    </span>
                    {i < 4 && (
                      <svg width="12" height="10" viewBox="0 0 12 10" className="flex-shrink-0">
                        <path d="M1 5 L9 5 M7 2 L9 5 L7 8" stroke="#a855f760" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-4 text-[11px]">
                <span style={{ color: '#a855f760' }}>明文</span>
                <span style={{ color: '#a855f7' }}>加密区域（ESP保护）</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 协议对比表 */}
      <div className="mt-5">
        <button
          onClick={() => setShowProtocols(!showProtocols)}
          className="w-full text-left rounded-xl px-5 py-3.5 transition-all duration-300"
          style={{
            background: showProtocols ? 'linear-gradient(135deg, #6366f110, #a855f710)' : 'var(--surface)',
            border: `1.5px solid ${showProtocols ? '#6366f140' : 'var(--border)'}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white text-[11px] font-bold"
              style={{ background: 'linear-gradient(135deg, #6366f1, #a855f7)' }}
            >
              📋
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[14px]" style={{ color: showProtocols ? '#6366f1' : 'var(--text)' }}>
                VPN协议对比
              </span>
            </div>
            <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
              {showProtocols ? '收起' : '展开'}
            </span>
          </div>
        </button>

        {showProtocols && (
          <div className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-4 rounded-xl" style={{ background: '#6366f104', border: '1.5px solid #6366f115' }}>
            <div className="space-y-0">
              {/* 表头 */}
              <div
                className="grid grid-cols-[70px_1fr_70px_80px_50px_50px] gap-2 py-2 text-[11px] font-semibold"
                style={{ color: 'var(--text-muted)', borderBottom: '1px solid var(--border)' }}
              >
                <div>协议</div>
                <div>说明</div>
                <div>加密</div>
                <div className="hidden sm:block">速度</div>
                <div>安全</div>
                <div className="hidden sm:block">备注</div>
              </div>
              {protocolTable.map((p, i) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[70px_1fr_70px_80px_50px_50px] gap-2 py-2.5 text-[12px]"
                  style={{ borderBottom: i < protocolTable.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <div className="font-semibold" style={{ color: '#6366f1' }}>{p.name}</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-secondary)' }}>{p.fullName}</div>
                  <div className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{p.encryption.split(' ')[0]}</div>
                  <div className="text-[11px] hidden sm:block" style={{ color: 'var(--text-muted)' }}>{p.speed}</div>
                  <div className="text-[11px]" style={{ color: p.security === '低' ? '#ef4444' : p.security === '极高' ? '#22c55e' : 'var(--text-muted)' }}>{p.security}</div>
                  <div className="text-[10px] hidden sm:block" style={{ color: 'var(--text-muted)' }}>{p.note}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各VPN类型查看隧道建立过程 · 展开IPSec IKE了解密钥交换细节
      </div>
    </div>
  );
}
