'use client';

import { useState } from 'react';

interface FiberType {
  id: string;
  name: string;
  nameEn: string;
  coreSize: string;
  distance: string;
  bandwidth: string;
  color: string;
  wavelength: string;
  lightSource: string;
  connectors: string[];
  principle: string;
  application: string;
  pros: string[];
  cons: string[];
}

const fiberTypes: FiberType[] = [
  {
    id: 'smf',
    name: '单模光纤',
    nameEn: 'Single-Mode Fiber (SMF)',
    coreSize: '8-10 μm',
    distance: '可达100km+（无中继）',
    bandwidth: '极高（100 Gbps+）',
    color: '#3b82f6',
    wavelength: '1310nm / 1550nm',
    lightSource: '激光二极管（LD）',
    connectors: ['SC', 'LC', 'FC'],
    principle: '纤芯极细（8-10μm），只允许一种模式的光传播，消除了模间色散，信号传输距离远、带宽极大。',
    application: '长途骨干网、城域网、海底光缆、FTTH（光纤到户）中的长距离段',
    pros: ['传输距离极远（100km+无需中继）', '带宽极大（Tbps级WDM）', '信号衰减小', '不受电磁干扰'],
    cons: ['光纤和连接器成本高', '对准精度要求极高', '需要激光光源', '弯曲半径要求严格'],
  },
  {
    id: 'mmf',
    name: '多模光纤',
    nameEn: 'Multi-Mode Fiber (MMF)',
    coreSize: '50-62.5 μm',
    distance: '约550m（10Gbps）',
    bandwidth: '中等（10 Gbps）',
    color: '#22c55e',
    wavelength: '850nm / 1300nm',
    lightSource: '发光二极管（LED）/ VCSEL',
    connectors: ['SC', 'LC', 'ST'],
    principle: '纤芯较粗（50-62.5μm），允许多种模式的光同时传播。多条光路导致模间色散，限制了传输距离和带宽。',
    application: '数据中心内部互联、局域网（LAN）、校园网、短距离骨干连接',
    pros: ['成本比单模低', '连接对准要求低', '可用LED光源（便宜）', '安装维护简单'],
    cons: ['传输距离有限（<2km）', '模间色散限制带宽', '不适合长距离传输'],
  },
  {
    id: 'pof',
    name: '塑料光纤',
    nameEn: 'Plastic Optical Fiber (POF)',
    coreSize: '980 μm（约1mm）',
    distance: '约100m',
    bandwidth: '较低（1-10 Gbps）',
    color: '#f97316',
    wavelength: '650nm',
    lightSource: '红色LED',
    connectors: ['F05', 'Versatile Link'],
    principle: '纤芯极粗（约1mm），使用塑料（PMMA）材料制成。芯径大使得连接非常简单，但衰减大、带宽低。',
    application: '家庭网络布线、汽车内部网络、工业控制、短距离消费电子连接',
    pros: ['极粗纤芯，连接最简单', '成本最低', '柔韧性好，不易断裂', '对准要求最低'],
    cons: ['衰减最大（传输距离最短）', '带宽最低', '不适合高速长距离', '耐温性差'],
  },
];

const tirSteps = [
  { step: 1, title: '光从高折射率介质射向低折射率介质', desc: '光从纤芯（n≈1.48）射向包层（n≈1.46），纤芯折射率高于包层。' },
  { step: 2, title: '入射角大于临界角', desc: '当入射角超过临界角（约82°），光线不会折射出去，而是全部反射回纤芯内部。' },
  { step: 3, title: '光在纤芯中反复全反射', desc: '光像在"光管"中一样，以锯齿形路径不断反射前进，几乎无损耗地传播数十甚至上百公里。' },
  { step: 4, title: '到达接收端', desc: '光信号到达光纤另一端，由光电探测器转换回电信号，完成信息传输。' },
];

const comparison = [
  { aspect: '传输速度', fiber: '100 Gbps ~ Tbps', copper: '最高 10 Gbps', advantage: 'fiber' },
  { aspect: '传输距离', fiber: '100km+（单模）', copper: '100m（以太网）', advantage: 'fiber' },
  { aspect: '抗电磁干扰', fiber: '完全免疫', copper: '易受干扰', advantage: 'fiber' },
  { aspect: '安全性', fiber: '极难窃听', copper: '可被电磁窃听', advantage: 'fiber' },
  { aspect: '重量', fiber: '极轻（玻璃纤维）', copper: '较重（铜线）', advantage: 'fiber' },
  { aspect: '安装成本', fiber: '高（需专业工具）', copper: '低（简单压接）', advantage: 'copper' },
  { aspect: '设备成本', fiber: '高（光模块昂贵）', copper: '低（成熟廉价）', advantage: 'copper' },
  { aspect: '维护难度', fiber: '需专业仪器', copper: '简单工具即可', advantage: 'copper' },
];

const wdmTypes = [
  { name: 'WDM', fullName: '波分复用', desc: '在一根光纤中同时传输多个不同波长的光信号，每个波长承载独立数据流', color: '#6366f1' },
  { name: 'CWDM', fullName: '粗波分复用', desc: '波长间隔20nm，通常支持18个信道，成本较低，适用于城域网', color: '#0ea5e9' },
  { name: 'DWDM', fullName: '密集波分复用', desc: '波长间隔0.8nm，可支持80+信道，单纤容量达Tbps级，用于骨干网和海缆', color: '#a855f7' },
];

export default function FiberOptic() {
  const [activeFiber, setActiveFiber] = useState<string | null>(null);
  const [activeWdm, setActiveWdm] = useState<string | null>(null);
  const [activeTirStep, setActiveTirStep] = useState<number | null>(null);

  return (
    <div className="fiber-optic">
      {/* 全反射原理 */}
      <div className="mb-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          全反射（TIR）原理
        </div>
        <div className="flex flex-col gap-[3px]">
          {tirSteps.map((s) => {
            const isActive = activeTirStep === s.step;
            return (
              <button
                key={s.step}
                onClick={() => setActiveTirStep(isActive ? null : s.step)}
                className="w-full text-left transition-all duration-300"
              >
                <div
                  className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? 'linear-gradient(135deg, #6366f110, #6366f105)'
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? '#6366f140' : 'var(--border)'}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #6366f1cc)' }}
                  >
                    {s.step}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="font-semibold text-[14px]" style={{ color: isActive ? '#6366f1' : 'var(--text)' }}>
                      {s.title}
                    </span>
                  </div>
                </div>

                {isActive && (
                  <div
                    className="mx-4 mt-1 mb-2 px-5 py-4 rounded-xl text-[13.5px] leading-relaxed"
                    style={{ background: '#6366f105', border: '1.5px solid #6366f120', color: 'var(--text-secondary)' }}
                  >
                    {s.desc}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 光纤类型卡片 */}
      <div className="mb-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          光纤类型对比
        </div>
        <div className="flex flex-col gap-[3px]">
          {fiberTypes.map((f) => {
            const isActive = activeFiber === f.id;
            return (
              <div key={f.id}>
                <button
                  onClick={() => setActiveFiber(isActive ? null : f.id)}
                  className="w-full text-left transition-all duration-300"
                  style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
                >
                  <div
                    className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${f.color}10, ${f.color}05)`
                        : 'var(--surface)',
                      border: `1.5px solid ${isActive ? f.color + '40' : 'var(--border)'}`,
                      boxShadow: isActive ? `0 4px 20px ${f.color}12` : 'none',
                    }}
                  >
                    {/* 类型图标 */}
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[11px] font-bold mr-4 flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${f.color}, ${f.color}cc)` }}
                    >
                      {f.id.toUpperCase().slice(0, 3)}
                    </div>

                    {/* 芯径标签 */}
                    <div
                      className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                      style={{ background: f.color + '10', color: f.color, border: `1px solid ${f.color}20` }}
                    >
                      芯径 {f.coreSize}
                    </div>

                    {/* 名称 */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[15px]" style={{ color: isActive ? f.color : 'var(--text)' }}>
                          {f.name}
                        </span>
                        <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                          {f.nameEn}
                        </span>
                      </div>
                      <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {f.distance} · {f.bandwidth}
                      </div>
                    </div>

                    {/* 连接器标签 */}
                    <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[150px] justify-end">
                      {f.connectors.slice(0, 3).map(c => (
                        <span
                          key={c}
                          className="text-[11px] px-2 py-0.5 rounded-md font-mono font-medium"
                          style={{ background: f.color + '10', color: f.color, border: `1px solid ${f.color}20` }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </button>

                {/* 展开详情 */}
                {isActive && (
                  <div
                    className="mx-4 mt-1 mb-2 px-5 py-5 rounded-xl"
                    style={{ background: f.color + '05', border: `1.5px solid ${f.color}20` }}
                  >
                    {/* 传输原理 */}
                    <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: f.color + '08' }}>
                      <div className="text-[12px] font-semibold mb-1" style={{ color: f.color }}>传输原理</div>
                      <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                        {f.principle}
                      </div>
                    </div>

                    {/* 技术参数 */}
                    <div className="mb-4 grid grid-cols-2 gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>芯径：</span>{f.coreSize}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>传输距离：</span>{f.distance}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>带宽：</span>{f.bandwidth}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>工作波长：</span>{f.wavelength}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>光源：</span>{f.lightSource}</div>
                      <div><span className="font-medium" style={{ color: 'var(--text)' }}>连接器：</span>{f.connectors.join('、')}</div>
                    </div>

                    {/* 应用场景 */}
                    <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                      <span className="font-medium" style={{ color: 'var(--text)' }}>典型应用：</span>
                      {f.application}
                    </div>

                    {/* 优缺点 */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="px-3 py-2 rounded-lg" style={{ background: '#22c55e08', border: '1px solid #22c55e20' }}>
                        <div className="text-[11px] font-semibold mb-1.5" style={{ color: '#22c55e' }}>优势</div>
                        {f.pros.map(p => (
                          <div key={p} className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            + {p}
                          </div>
                        ))}
                      </div>
                      <div className="px-3 py-2 rounded-lg" style={{ background: '#ef444408', border: '1px solid #ef444420' }}>
                        <div className="text-[11px] font-semibold mb-1.5" style={{ color: '#ef4444' }}>劣势</div>
                        {f.cons.map(c => (
                          <div key={c} className="text-[12px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            - {c}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 光纤 vs 铜缆对比 */}
      <div className="mb-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          光纤 vs 铜缆
        </div>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: '1.5px solid var(--border)' }}
        >
          {/* 表头 */}
          <div
            className="grid grid-cols-4 gap-0 text-[12px] font-semibold"
            style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)' }}
          >
            <div className="px-4 py-2.5" style={{ color: 'var(--text-muted)' }}>对比项</div>
            <div className="px-4 py-2.5" style={{ color: '#3b82f6' }}>光纤</div>
            <div className="px-4 py-2.5" style={{ color: '#f97316' }}>铜缆</div>
            <div className="px-4 py-2.5" style={{ color: 'var(--text-muted)' }}>优势方</div>
          </div>
          {/* 数据行 */}
          {comparison.map((row, i) => (
            <div
              key={row.aspect}
              className="grid grid-cols-4 gap-0 text-[12px]"
              style={{
                borderBottom: i < comparison.length - 1 ? '1px solid var(--border)' : 'none',
                background: i % 2 === 0 ? 'transparent' : 'var(--surface)',
              }}
            >
              <div className="px-4 py-2.5 font-medium" style={{ color: 'var(--text)' }}>{row.aspect}</div>
              <div className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.fiber}</div>
              <div className="px-4 py-2.5" style={{ color: 'var(--text-secondary)' }}>{row.copper}</div>
              <div className="px-4 py-2.5">
                <span
                  className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                  style={{
                    background: row.advantage === 'fiber' ? '#3b82f615' : '#f9731615',
                    color: row.advantage === 'fiber' ? '#3b82f6' : '#f97316',
                    border: `1px solid ${row.advantage === 'fiber' ? '#3b82f630' : '#f9731630'}`,
                  }}
                >
                  {row.advantage === 'fiber' ? '光纤' : '铜缆'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WDM波分复用 */}
      <div className="mb-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text-muted)' }}>
          WDM 波分复用技术
        </div>
        <div className="flex flex-col gap-[3px]">
          {wdmTypes.map((w) => {
            const isActive = activeWdm === w.name;
            return (
              <button
                key={w.name}
                onClick={() => setActiveWdm(isActive ? null : w.name)}
                className="w-full text-left transition-all duration-300"
              >
                <div
                  className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${w.color}10, ${w.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? w.color + '40' : 'var(--border)'}`,
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-[10px] font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${w.color}, ${w.color}cc)` }}
                  >
                    {w.name.slice(0, 2)}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[14px]" style={{ color: isActive ? w.color : 'var(--text)' }}>
                        {w.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {w.fullName}
                      </span>
                    </div>
                  </div>
                </div>

                {isActive && (
                  <div
                    className="mx-4 mt-1 mb-2 px-5 py-4 rounded-xl text-[13.5px] leading-relaxed"
                    style={{ background: w.color + '05', border: `1.5px solid ${w.color}20`, color: 'var(--text-secondary)' }}
                  >
                    {w.desc}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各项目展开详情 · 光纤通信：光速传输的基石
      </div>
    </div>
  );
}
