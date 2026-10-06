'use client';

import { useState } from 'react';

/**
 * 供需曲线与均衡 —— 微观经济学最基础的图。
 * SVG 绘制：纵轴价格 P、横轴数量 Q，需求曲线 D 向右下、供给曲线 S 向右上，
 * 交点即均衡 E。可切换曲线平移演示比较静态（需求/供给右移）。
 */

type Shift = 'none' | 'demand-right' | 'demand-left' | 'supply-right' | 'supply-left';

const SCENARIOS: { key: Shift; label: string; desc: string }[] = [
  { key: 'none', label: '初始均衡', desc: 'D 与 S 相交于 E，均衡价格 P*、均衡数量 Q*' },
  { key: 'demand-right', label: '需求右移', desc: '需求增加（如收入上升），D→D′，价格升、数量增' },
  { key: 'demand-left', label: '需求左移', desc: '需求减少，D→D′，价格降、数量减' },
  { key: 'supply-right', label: '供给右移', desc: '供给增加（如技术进步），S→S′，价格降、数量增' },
  { key: 'supply-left', label: '供给左移', desc: '供给减少（如原料涨价），S→S′，价格升、数量减' },
];

// 坐标映射：Q∈[0,10]→x，P∈[0,10]→y（y 轴向下）
const X0 = 70, Y0 = 40, W = 420, H = 320;
const qx = (q: number) => X0 + (q / 10) * W;
const py = (p: number) => Y0 + H - (p / 10) * H;

// 需求 P = 9 - 0.8Q，供给 P = 1 + 0.8Q（线性）
const dP = (q: number, shift: number) => 9 + shift - 0.8 * q;
const sP = (q: number, shift: number) => 1 + shift + 0.8 * q;

function equilibrium(dShift: number, sShift: number) {
  // 9+dShift-0.8Q = 1+sShift+0.8Q → 1.6Q = 8 + dShift - sShift
  const q = (8 + dShift - sShift) / 1.6;
  const p = dP(q, dShift);
  return { q, p };
}

function line(aq: number, ap: number, bq: number, bp: number) {
  return `M ${qx(aq)} ${py(ap)} L ${qx(bq)} ${py(bp)}`;
}

export default function SupplyDemand() {
  const [shift, setShift] = useState<Shift>('none');
  const dShift = shift === 'demand-right' ? 2 : shift === 'demand-left' ? -2 : 0;
  const sShift = shift === 'supply-right' ? -2 : shift === 'supply-left' ? 2 : 0;
  const eq = equilibrium(dShift, sShift);
  const eq0 = equilibrium(0, 0);
  const current = SCENARIOS.find((s) => s.key === shift)!;

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <svg viewBox="0 0 520 400" style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }}>
        {/* 坐标轴 */}
        <line x1={X0} y1={Y0} x2={X0} y2={Y0 + H} stroke="#94a3b8" strokeWidth="2" />
        <line x1={X0} y1={Y0 + H} x2={X0 + W} y2={Y0 + H} stroke="#94a3b8" strokeWidth="2" />
        <text x={X0 - 28} y={Y0 + 10} fill="#475569" fontSize="15" fontWeight="600">P</text>
        <text x={X0 + W + 8} y={Y0 + H + 5} fill="#475569" fontSize="15" fontWeight="600">Q</text>

        {/* 均衡虚线 */}
        <line x1={X0} y1={py(eq.p)} x2={qx(eq.q)} y2={py(eq.p)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1={qx(eq.q)} y1={py(eq.p)} x2={qx(eq.q)} y2={Y0 + H} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={X0 - 16} y={py(eq.p) + 4} fill="#b45309" fontSize="13" fontWeight="600" textAnchor="end">P*</text>
        <text x={qx(eq.q)} y={Y0 + H + 20} fill="#b45309" fontSize="13" fontWeight="600" textAnchor="middle">Q*</text>

        {/* 初始曲线（参考，淡显） */}
        {shift !== 'none' && (
          <>
            <path d={line(0, dP(0, 0), 10, dP(10, 0))} stroke="#93c5fd" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d={line(0, sP(0, 0), 10, sP(10, 0))} stroke="#86efac" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          </>
        )}

        {/* 需求曲线 D */}
        <path d={line(0, dP(0, dShift), 10, dP(10, dShift))} stroke="#2563eb" strokeWidth="3" fill="none" />
        <text x={qx(9.2)} y={py(dP(9.2, dShift)) - 8} fill="#2563eb" fontSize="15" fontWeight="700">D</text>

        {/* 供给曲线 S */}
        <path d={line(0, sP(0, sShift), 10, sP(10, sShift))} stroke="#16a34a" strokeWidth="3" fill="none" />
        <text x={qx(9.2)} y={py(sP(9.2, sShift)) + 18} fill="#16a34a" fontSize="15" fontWeight="700">S</text>

        {/* 均衡点 E */}
        <circle cx={qx(eq.q)} cy={py(eq.p)} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
        <text x={qx(eq.q) + 12} y={py(eq.p) - 10} fill="#b45309" fontSize="14" fontWeight="700">E</text>

        {/* 初始均衡点（移动时显示） */}
        {shift !== 'none' && (
          <circle cx={qx(eq0.q)} cy={py(eq0.p)} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        )}
      </svg>

      {/* 控制按钮 */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            onClick={() => setShift(s.key)}
            style={{
              padding: '6px 12px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1.5px solid',
              borderColor: shift === s.key ? '#2563eb' : '#e2e8f0',
              background: shift === s.key ? '#eff6ff' : '#fff',
              color: shift === s.key ? '#1d4ed8' : '#475569',
              fontWeight: shift === s.key ? 600 : 400,
            }}
          >
            {s.label}
          </button>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 10, lineHeight: 1.6 }}>
        <strong style={{ color: '#334155' }}>{current.label}：</strong>{current.desc}
      </p>
    </div>
  );
}
