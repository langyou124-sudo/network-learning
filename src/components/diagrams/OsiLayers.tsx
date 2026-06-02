'use client';

import { useState } from 'react';

interface Layer {
  num: number;
  name: string;
  nameEn: string;
  color: string;
  protocols: string[];
  description: string;
  example: string;
}

const layers: Layer[] = [
  {
    num: 7, name: '应用层', nameEn: 'Application',
    color: '#6366f1',
    protocols: ['HTTP', 'FTP', 'SMTP', 'DNS', 'HTTPS'],
    description: '用户与网络的直接接口，提供各种网络服务',
    example: '你在浏览器输入网址，浏览器用HTTP协议请求网页',
  },
  {
    num: 6, name: '表示层', nameEn: 'Presentation',
    color: '#8b5cf6',
    protocols: ['JPEG', 'ASCII', 'SSL/TLS', 'MPEG'],
    description: '数据格式转换、加密解密、压缩解压',
    example: '把JPEG图片解码显示，或用SSL加密你的密码',
  },
  {
    num: 5, name: '会话层', nameEn: 'Session',
    color: '#a855f7',
    protocols: ['NetBIOS', 'RPC', 'PPTP'],
    description: '建立、管理和终止会话连接',
    example: '登录网站后保持会话状态，不用每次都重新登录',
  },
  {
    num: 4, name: '传输层', nameEn: 'Transport',
    color: '#d946ef',
    protocols: ['TCP', 'UDP'],
    description: '端到端的可靠数据传输，流量控制',
    example: 'TCP保证文件完整传输，UDP用于视频直播（允许少量丢包）',
  },
  {
    num: 3, name: '网络层', nameEn: 'Network',
    color: '#ec4899',
    protocols: ['IP', 'ICMP', 'ARP', 'OSPF'],
    description: '路由选择、逻辑寻址、跨网络转发',
    example: '路由器根据IP地址决定数据包走哪条路',
  },
  {
    num: 2, name: '数据链路层', nameEn: 'Data Link',
    color: '#f43f5e',
    protocols: ['Ethernet', 'PPP', 'Wi-Fi', 'VLAN'],
    description: '帧传输、差错检测、MAC寻址',
    example: '交换机根据MAC地址把数据帧送到目标设备',
  },
  {
    num: 1, name: '物理层', nameEn: 'Physical',
    color: '#ef4444',
    protocols: ['光纤', '双绞线', '无线电波', 'USB'],
    description: '原始比特流的传输，定义电气和物理规范',
    example: '网线里的电信号、光纤里的光脉冲',
  },
];

export default function OsiLayers() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);

  return (
    <div className="osi-diagram">
      <div className="flex flex-col gap-[3px]">
        {layers.map((layer) => {
          const isActive = activeLayer === layer.num;
          return (
            <button
              key={layer.num}
              onClick={() => setActiveLayer(isActive ? null : layer.num)}
              className="group relative text-left transition-all duration-300"
              style={{
                transform: isActive ? 'scale(1.01)' : 'scale(1)',
              }}
            >
              <div
                className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300 cursor-pointer"
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${layer.color}18, ${layer.color}08)`
                    : 'var(--surface)',
                  border: `1.5px solid ${isActive ? layer.color + '40' : 'var(--border)'}`,
                  boxShadow: isActive ? `0 4px 16px ${layer.color}15` : 'none',
                }}
              >
                {/* 层号 */}
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0 transition-transform duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${layer.color}, ${layer.color}cc)`,
                    transform: isActive ? 'scale(1.1)' : 'scale(1)',
                  }}
                >
                  {layer.num}
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
                  <div className="text-[12.5px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {layer.description}
                  </div>
                </div>

                {/* 协议标签 */}
                <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[200px] justify-end">
                  {layer.protocols.slice(0, 3).map(p => (
                    <span
                      key={p}
                      className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                      style={{
                        background: layer.color + '12',
                        color: layer.color,
                        border: `1px solid ${layer.color}25`,
                      }}
                    >
                      {p}
                    </span>
                  ))}
                  {layer.protocols.length > 3 && (
                    <span className="text-[11px] px-1.5 py-0.5" style={{ color: 'var(--text-muted)' }}>
                      +{layer.protocols.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-5 mb-1 px-5 py-4 rounded-b-xl text-[13.5px] leading-relaxed"
                  style={{
                    background: layer.color + '06',
                    border: `1.5px solid ${layer.color}20`,
                    borderTop: 'none',
                    color: 'var(--text-secondary)',
                  }}
                >
                  <div className="font-medium mb-1" style={{ color: 'var(--text)' }}>实际场景</div>
                  {layer.example}
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {layer.protocols.map(p => (
                      <span
                        key={p}
                        className="text-[11px] px-2 py-0.5 rounded-md"
                        style={{
                          background: layer.color + '10',
                          color: layer.color,
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各层查看详情 · 从上到下：用户侧 → 物理传输
      </div>
    </div>
  );
}
