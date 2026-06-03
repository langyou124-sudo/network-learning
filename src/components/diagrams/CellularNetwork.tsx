'use client';

import { useState } from 'react';

interface Generation {
  id: string;
  name: string;
  generation: string;
  year: string;
  technology: string;
  speed: string;
  speedMbps: number;
  color: string;
  keyTech: string;
  useCase: string;
  latency: string;
  spectrum: string;
  milestone: string;
}

const generations: Generation[] = [
  {
    id: '1g',
    name: '1G',
    generation: '第一代移动通信',
    year: '1980s',
    technology: 'AMPS',
    speed: '2.4 Kbps',
    speedMbps: 0.0024,
    color: '#6b7280',
    keyTech: '模拟信号调频（FM），频分多址（FDMA）',
    useCase: '模拟语音通话——仅此而已。没有短信，没有数据，打电话是唯一功能。',
    latency: '不适用',
    spectrum: '800 MHz',
    milestone: '1979年日本NTT开通世界首个商用蜂窝网络',
  },
  {
    id: '2g',
    name: '2G',
    generation: '第二代移动通信',
    year: '1991',
    technology: 'GSM / CDMA',
    speed: '64 Kbps',
    speedMbps: 0.064,
    color: '#3b82f6',
    keyTech: '数字信号调制，时分多址（TDMA）/ 码分多址（CDMA），短信（SMS）',
    useCase: '数字语音通话、短信（SMS）、彩信（MMS）、WAP上网。手机从"大哥大"变成了人人用得起的通讯工具。',
    latency: '约300-1000ms',
    spectrum: '900 / 1800 MHz',
    milestone: '1991年芬兰开通首个GSM网络，短信从此诞生',
  },
  {
    id: '3g',
    name: '3G',
    generation: '第三代移动通信',
    year: '2001',
    technology: 'WCDMA / CDMA2000 / TD-SCDMA',
    speed: '2 Mbps',
    speedMbps: 2,
    color: '#22c55e',
    keyTech: '宽带码分多址（WCDMA），扩频技术，支持移动数据业务',
    useCase: '移动互联网起步——手机上网、视频通话、移动电视、应用商店。iPhone和Android的出现让3G成为必需品。',
    latency: '约100-500ms',
    spectrum: '1.9 / 2.1 GHz',
    milestone: '2001年日本NTT DoCoMo开通首个3G网络，2007年iPhone发布',
  },
  {
    id: '4g',
    name: '4G',
    generation: '第四代移动通信',
    year: '2009',
    technology: 'LTE / LTE-Advanced',
    speed: '1 Gbps（理论峰值）',
    speedMbps: 1000,
    color: '#f97316',
    keyTech: '正交频分多址（OFDMA），MIMO多天线技术，全IP网络架构，扁平化核心网',
    useCase: '移动宽带时代——高清视频流媒体（抖音、B站）、移动支付、网约车、直播、在线游戏。4G让手机真正成为"口袋电脑"。',
    latency: '约30-50ms',
    spectrum: '700 / 1800 / 2600 MHz',
    milestone: '2009年瑞典开通首个LTE商用网络，2013年中国发放4G牌照',
  },
  {
    id: '5g',
    name: '5G',
    generation: '第五代移动通信',
    year: '2019',
    technology: 'NR (New Radio)',
    speed: '20 Gbps（理论峰值）',
    speedMbps: 20000,
    color: '#a855f7',
    keyTech: '毫米波（mmWave），大规模MIMO（Massive MIMO），网络切片，边缘计算（MEC），波束赋形',
    useCase: '万物互联——三大场景：eMBB（增强移动宽带）、URLLC（超可靠低延迟通信）、mMTC（海量机器通信）。',
    latency: '约1ms（URLLC场景）',
    spectrum: 'Sub-6 GHz / 毫米波（24-100 GHz）',
    milestone: '2019年韩国/美国率先商用，2020年中国三大运营商全面开通5G',
  },
];

const techEvolution = [
  { from: 'AMPS', to: 'GSM', year: '1991', desc: '模拟→数字' },
  { from: 'GSM', to: 'WCDMA', year: '2001', desc: '窄带→宽带' },
  { from: 'WCDMA', to: 'LTE', year: '2009', desc: 'CDMA→OFDMA' },
  { from: 'LTE', to: 'NR', year: '2019', desc: 'Sub-6→毫米波' },
];

const fiveGUseCases = [
  { name: 'eMBB', fullName: '增强移动宽带', desc: '超高速数据传输，支持4K/8K视频、VR/AR', color: '#a855f7' },
  { name: 'URLLC', fullName: '超可靠低延迟通信', desc: '1ms延迟，99.999%可靠性，用于自动驾驶、远程手术', color: '#ec4899' },
  { name: 'mMTC', fullName: '海量机器通信', desc: '每平方公里100万设备连接，用于智慧城市、工业物联网', color: '#6366f1' },
];

export default function CellularNetwork() {
  const [activeGen, setActiveGen] = useState<string | null>(null);
  const [activeUseCase, setActiveUseCase] = useState<string | null>(null);

  return (
    <div className="cellular-network">
      {/* 速度对比条形图 */}
      <div className="mb-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          速度进化对比
        </div>
        <div className="space-y-2">
          {generations.map((g) => {
            const widthPercent = Math.min((Math.log10(g.speedMbps) / Math.log10(20000)) * 100, 100);
            return (
              <div key={g.id} className="flex items-center gap-3">
                <div className="w-8 text-[12px] font-mono font-semibold text-right flex-shrink-0" style={{ color: g.color }}>
                  {g.name}
                </div>
                <div className="flex-1 h-5 rounded-md overflow-hidden" style={{ background: 'var(--border)' }}>
                  <div
                    className="h-full rounded-md transition-all duration-500 flex items-center px-2"
                    style={{
                      width: `${Math.max(widthPercent, 6)}%`,
                      background: `linear-gradient(90deg, ${g.color}cc, ${g.color})`,
                    }}
                  >
                    <span className="text-[10px] text-white font-medium whitespace-nowrap">
                      {g.speed}
                    </span>
                  </div>
                </div>
                <div className="w-12 text-[11px] text-right flex-shrink-0" style={{ color: 'var(--text-muted)' }}>
                  {g.year}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 技术演进路线 */}
      <div className="mb-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          技术演进路线
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {techEvolution.map((e, i) => (
            <div key={i} className="flex items-center gap-2">
              <span
                className="text-[12px] px-2.5 py-1 rounded-md font-mono font-medium"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)' }}
              >
                {e.from}
              </span>
              <div className="flex flex-col items-center">
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{e.year}</span>
                <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>{e.desc}</span>
                <span style={{ color: 'var(--text-muted)' }}>→</span>
              </div>
              {i === techEvolution.length - 1 && (
                <span
                  className="text-[12px] px-2.5 py-1 rounded-md font-mono font-medium"
                  style={{ background: '#a855f7' + '15', border: '1px solid #a855f730', color: '#a855f7' }}
                >
                  {e.to}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 代际卡片 */}
      <div className="flex flex-col gap-[3px]">
        {generations.map((g) => {
          const isActive = activeGen === g.id;
          return (
            <div key={g.id}>
              <button
                onClick={() => {
                  setActiveGen(isActive ? null : g.id);
                  setActiveUseCase(null);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${g.color}10, ${g.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? g.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${g.color}12` : 'none',
                  }}
                >
                  {/* 代际标识 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${g.color}, ${g.color}cc)` }}
                  >
                    {g.name}
                  </div>

                  {/* 年份标签 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: g.color + '10', color: g.color, border: `1px solid ${g.color}20` }}
                  >
                    {g.year}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? g.color : 'var(--text)' }}>
                        {g.generation}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {g.technology} · {g.speed}
                    </div>
                  </div>

                  {/* 技术标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[180px] justify-end">
                    <span
                      className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                      style={{ background: g.color + '10', color: g.color, border: `1px solid ${g.color}20` }}
                    >
                      {g.technology.split(' / ')[0]}
                    </span>
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-4 mt-1 mb-2 px-5 py-5 rounded-xl"
                  style={{ background: g.color + '05', border: `1.5px solid ${g.color}20` }}
                >
                  {/* 关键技术 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: g.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: g.color }}>关键技术</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {g.keyTech}
                    </div>
                  </div>

                  {/* 技术参数网格 */}
                  <div className="mb-4 grid grid-cols-2 gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                    <div><span className="font-medium" style={{ color: 'var(--text)' }}>速度：</span>{g.speed}</div>
                    <div><span className="font-medium" style={{ color: 'var(--text)' }}>延迟：</span>{g.latency}</div>
                    <div><span className="font-medium" style={{ color: 'var(--text)' }}>频谱：</span>{g.spectrum}</div>
                    <div><span className="font-medium" style={{ color: 'var(--text)' }}>技术：</span>{g.technology}</div>
                  </div>

                  {/* 使用场景 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>使用场景：</span>
                    {g.useCase}
                  </div>

                  {/* 里程碑 */}
                  <div className="text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>里程碑：</span>
                    {g.milestone}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 5G三大场景 */}
      <div className="mt-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          5G 三大应用场景
        </div>
        <div className="flex flex-col gap-[3px]">
          {fiveGUseCases.map((uc) => {
            const isActive = activeUseCase === uc.name;
            return (
              <button
                key={uc.name}
                onClick={() => setActiveUseCase(isActive ? null : uc.name)}
                className="w-full text-left transition-all duration-300"
              >
                <div
                  className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${uc.color}10, ${uc.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? uc.color + '40' : 'var(--border)'}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${uc.color}, ${uc.color}cc)` }}
                  >
                    {uc.name.slice(0, 2)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[14px]" style={{ color: isActive ? uc.color : 'var(--text)' }}>
                        {uc.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {uc.fullName}
                      </span>
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div
                    className="mx-4 mt-1 mb-2 px-5 py-4 rounded-xl text-[13.5px] leading-relaxed"
                    style={{ background: uc.color + '05', border: `1.5px solid ${uc.color}20`, color: 'var(--text-secondary)' }}
                  >
                    {uc.desc}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各代际展开技术详情 · 从1G到5G：从语音通话到万物互联
      </div>
    </div>
  );
}
