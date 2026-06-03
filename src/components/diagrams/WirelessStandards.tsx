'use client';

import { useState } from 'react';

interface WirelessStandard {
  id: string;
  name: string;
  nameEn: string;
  year: string;
  frequency: string;
  maxSpeed: string;
  speedMbps: number;
  color: string;
  mimo: string;
  channelWidth: string;
  modulation: string;
  range: string;
  usage: string[];
  frequencyBands: string[];
}

const standards: WirelessStandard[] = [
  {
    id: '802.11a',
    name: '802.11a',
    nameEn: 'Wi-Fi 1',
    year: '1999',
    frequency: '5 GHz',
    maxSpeed: '54 Mbps',
    speedMbps: 54,
    color: '#f97316',
    mimo: '不支持',
    channelWidth: '20 MHz',
    modulation: 'OFDM',
    range: '约35米（室内）',
    usage: ['早期企业无线网络', '对干扰敏感的环境'],
    frequencyBands: ['5GHz'],
  },
  {
    id: '802.11b',
    name: '802.11b',
    nameEn: 'Wi-Fi 1',
    year: '1999',
    frequency: '2.4 GHz',
    maxSpeed: '11 Mbps',
    speedMbps: 11,
    color: '#ea580c',
    mimo: '不支持',
    channelWidth: '22 MHz',
    modulation: 'DSSS / CCK',
    range: '约38米（室内）',
    usage: ['早期家用无线网络', '低带宽物联网设备'],
    frequencyBands: ['2.4GHz'],
  },
  {
    id: '802.11g',
    name: '802.11g',
    nameEn: 'Wi-Fi 3',
    year: '2003',
    frequency: '2.4 GHz',
    maxSpeed: '54 Mbps',
    speedMbps: 54,
    color: '#eab308',
    mimo: '不支持',
    channelWidth: '20 MHz',
    modulation: 'OFDM',
    range: '约38米（室内）',
    usage: ['家用无线路由器', '兼容802.11b设备'],
    frequencyBands: ['2.4GHz'],
  },
  {
    id: '802.11n',
    name: '802.11n',
    nameEn: 'Wi-Fi 4',
    year: '2009',
    frequency: '2.4 / 5 GHz',
    maxSpeed: '600 Mbps',
    speedMbps: 600,
    color: '#84cc16',
    mimo: 'MIMO（最多4×4）',
    channelWidth: '20 / 40 MHz',
    modulation: 'OFDM',
    range: '约70米（室内）',
    usage: ['高清视频流媒体', '家庭多设备联网', '中小型企业网络'],
    frequencyBands: ['2.4GHz', '5GHz'],
  },
  {
    id: '802.11ac',
    name: '802.11ac',
    nameEn: 'Wi-Fi 5',
    year: '2013',
    frequency: '5 GHz',
    maxSpeed: '6.93 Gbps',
    speedMbps: 6930,
    color: '#0ea5e9',
    mimo: 'MU-MIMO（最多8×8）',
    channelWidth: '20 / 40 / 80 / 160 MHz',
    modulation: '256-QAM OFDM',
    range: '约35米（室内）',
    usage: ['4K视频串流', '大型文件传输', '高密度用户环境'],
    frequencyBands: ['5GHz'],
  },
  {
    id: '802.11ax',
    name: '802.11ax',
    nameEn: 'Wi-Fi 6',
    year: '2019',
    frequency: '2.4 / 5 / 6 GHz',
    maxSpeed: '9.6 Gbps',
    speedMbps: 9600,
    color: '#6366f1',
    mimo: 'MU-MIMO（最多8×8）+ OFDMA',
    channelWidth: '20 / 40 / 80 / 160 MHz',
    modulation: '1024-QAM OFDMA',
    range: '约70米（室内）',
    usage: ['密集场所（体育馆、机场）', '8K视频串流', '智能家居大量设备', '低延迟游戏'],
    frequencyBands: ['2.4GHz', '5GHz', '6GHz'],
  },
];

const frequencyBands = [
  { name: '2.4 GHz', color: '#f97316', pros: '穿墙能力强，覆盖范围广', cons: '信道拥挤，干扰多，速度较低', standards: ['802.11b', '802.11g', '802.11n', '802.11ax'] },
  { name: '5 GHz', color: '#0ea5e9', pros: '信道多，干扰少，速度快', cons: '穿墙弱，覆盖范围较小', standards: ['802.11a', '802.11n', '802.11ac', '802.11ax'] },
  { name: '6 GHz', color: '#6366f1', pros: '全新频段，信道极多，速度最快', cons: '覆盖最小，设备支持有限', standards: ['802.11ax (Wi-Fi 6E)'] },
];

export default function WirelessStandards() {
  const [activeStandard, setActiveStandard] = useState<string | null>(null);
  const [activeBand, setActiveBand] = useState<string | null>(null);

  return (
    <div className="wireless-standards">
      {/* 速度进化时间线 */}
      <div className="mb-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          速度进化时间线
        </div>
        <div className="space-y-2">
          {standards.map((s) => {
            const widthPercent = Math.min((Math.log10(s.speedMbps) / Math.log10(9600)) * 100, 100);
            return (
              <div key={s.id} className="flex items-center gap-3">
                <div className="w-20 text-[11px] font-mono text-right flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {s.name}
                </div>
                <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-full rounded-md transition-all duration-500 flex items-center px-2"
                    style={{
                      width: `${Math.max(widthPercent, 8)}%`,
                      background: `linear-gradient(90deg, ${s.color}cc, ${s.color})`,
                    }}
                  >
                    <span className="text-[10px] text-white font-medium whitespace-nowrap">
                      {s.maxSpeed}
                    </span>
                  </div>
                </div>
                <div className="w-10 text-[11px] text-right flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {s.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 标准卡片列表 */}
      <div className="flex flex-col gap-[3px]">
        {standards.map((s) => {
          const isActive = activeStandard === s.id;
          return (
            <div key={s.id}>
              <button
                onClick={() => {
                  setActiveStandard(isActive ? null : s.id);
                  setActiveBand(null);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${s.color}10, ${s.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? s.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${s.color}12` : 'none',
                  }}
                >
                  {/* 标准名 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}cc)` }}
                  >
                    {s.name.replace('802.11', '')}
                  </div>

                  {/* 年份标签 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: s.color + '10', color: s.color, border: `1px solid ${s.color}20` }}
                  >
                    {s.year}年
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? s.color : 'var(--text)' }}>
                        {s.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {s.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {s.frequency} · {s.maxSpeed}
                    </div>
                  </div>

                  {/* 频段标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[200px] justify-end">
                    {s.frequencyBands.map(band => (
                      <span
                        key={band}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: s.color + '10', color: s.color, border: `1px solid ${s.color}20` }}
                      >
                        {band}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{ background: s.color + '05', border: `1.5px solid ${s.color}20` }}
                >
                  {/* 技术参数 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: s.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-2" style={{ color: s.color }}>技术参数</div>
                    <div className="grid grid-cols-2 gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>频率：</span>{s.frequency}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>最大速度：</span>{s.maxSpeed}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>信道宽度：</span>{s.channelWidth}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>调制方式：</span>{s.modulation}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>MIMO：</span>{s.mimo}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>覆盖范围：</span>{s.range}</div>
                    </div>
                  </div>

                  {/* 使用场景 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>典型使用场景：</span>
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                      {s.usage.map(u => (
                        <span
                          key={u}
                          className="text-[12px] px-2.5 py-0.5 rounded-md"
                          style={{ background: s.color + '10', color: s.color, border: `1px solid ${s.color}20` }}
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 频段对比 */}
      <div className="mt-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          频段对比
        </div>
        <div className="flex flex-col gap-[3px]">
          {frequencyBands.map((band) => {
            const isActive = activeBand === band.name;
            return (
              <button
                key={band.name}
                onClick={() => setActiveBand(isActive ? null : band.name)}
                className="w-full text-left transition-all duration-300"
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${band.color}10, ${band.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? band.color + '40' : 'var(--border)'}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${band.color}, ${band.color}cc)` }}
                  >
                    {band.name.replace(' GHz', 'G')}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-[14px]" style={{ color: isActive ? band.color : 'var(--text)' }}>
                      {band.name}
                    </span>
                  </div>

                  <div className="hidden sm:flex gap-1.5">
                    {band.standards.slice(0, 2).map(s => (
                      <span
                        key={s}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: band.color + '10', color: band.color, border: `1px solid ${band.color}20` }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {isActive && (
                  <div
                    className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-4 rounded-xl text-[13px]"
                    style={{ background: band.color + '05', border: `1.5px solid ${band.color}20` }}
                  >
                    <div className="mb-2">
                      <span className="font-medium" style={{ color: '#22c55e' }}>优势：</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{band.pros}</span>
                    </div>
                    <div className="mb-2">
                      <span className="font-medium" style={{ color: '#ef4444' }}>劣势：</span>
                      <span style={{ color: 'var(--text-secondary)' }}>{band.cons}</span>
                    </div>
                    <div>
                      <span className="font-medium" style={{ color: 'var(--text)' }}>支持标准：</span>
                      <span style={{ color: 'var(--text-muted)' }}>{band.standards.join('、')}</span>
                    </div>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各标准展开技术详情 · 从旧到新：速度与效率不断提升
      </div>
    </div>
  );
}
