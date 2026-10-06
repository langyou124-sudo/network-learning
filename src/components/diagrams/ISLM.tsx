'use client';

import { useState } from 'react';

/**
 * IS-LM 曲线 —— 宏观经济学核心模型图。
 * IS 曲线（产品市场均衡，向右下）、LM 曲线（货币市场均衡，向右上），
 * 交点 E 即一般均衡（收入 Y*、利率 r*）。可演示财政/货币政策使曲线平移。
 */

type Shift = 'none' | 'is-right' | 'is-left' | 'lm-right' | 'lm-left';

const SCENARIOS: { key: Shift; label: string; desc: string }[] = [
  { key: 'none', label: '初始均衡', desc: 'IS 与 LM 相交于 E，均衡收入 Y*、均衡利率 r*' },
  { key: 'is-right', label: '扩张性财政', desc: '政府支出增/减税使 IS 右移，收入增、利率升' },
  { key: 'is-left', label: '紧缩性财政', desc: '政府支出减/增税使 IS 左移，收入减、利率降' },
  { key: 'lm-right', label: '扩张性货币', desc: '货币供给增使 LM 右移，收入增、利率降' },
  { key: 'lm-left', label: '紧缩性货币', desc: '货币供给减使 LM 左移，收入减、利率升' },
];

const X0 = 70, Y0 = 40, W = 420, H = 320;
const qx = (y: number) => X0 + (y / 10) * W;
const py = (r: number) => Y0 + H - (r / 10) * H;

// IS: r = 9 - 0.7Y；LM: r = 1 + 0.7Y （线性，向右下 / 向右上）
const isR = (y: number, shift: number) => 9 + shift - 0.7 * y;
const lmR = (y: number, shift: number) => 1 + shift + 0.7 * y;

function equilibrium(isShift: number, lmShift: number) {
  // 9+isShift-0.7Y = 1+lmShift+0.7Y → 1.4Y = 8 + isShift - lmShift
  const y = (8 + isShift - lmShift) / 1.4;
  const r = isR(y, isShift);
  return { y, r };
}

function line(ay: number, ar: number, by: number, br: number) {
  return `M ${qx(ay)} ${py(ar)} L ${qx(by)} ${py(br)}`;
}

export default function ISLM() {
  const [shift, setShift] = useState<Shift>('none');
  const isShift = shift === 'is-right' ? 2 : shift === 'is-left' ? -2 : 0;
  const lmShift = shift === 'lm-right' ? -2 : shift === 'lm-left' ? 2 : 0;
  const eq = equilibrium(isShift, lmShift);
  const eq0 = equilibrium(0, 0);
  const current = SCENARIOS.find((s) => s.key === shift)!;

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <svg viewBox="0 0 520 400" style={{ width: '100%', maxWidth: 560, display: 'block', margin: '0 auto' }}>
        {/* 坐标轴 */}
        <line x1={X0} y1={Y0} x2={X0} y2={Y0 + H} stroke="#94a3b8" strokeWidth="2" />
        <line x1={X0} y1={Y0 + H} x2={X0 + W} y2={Y0 + H} stroke="#94a3b8" strokeWidth="2" />
        <text x={X0 - 26} y={Y0 + 10} fill="#475569" fontSize="15" fontWeight="600">r</text>
        <text x={X0 + W + 8} y={Y0 + H + 5} fill="#475569" fontSize="15" fontWeight="600">Y</text>

        {/* 均衡虚线 */}
        <line x1={X0} y1={py(eq.r)} x2={qx(eq.y)} y2={py(eq.r)} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
        <line x1={qx(eq.y)} y1={py(eq.r)} x2={qx(eq.y)} y2={Y0 + H} stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="5 4" />
        <text x={X0 - 14} y={py(eq.r) + 4} fill="#b45309" fontSize="13" fontWeight="600" textAnchor="end">r*</text>
        <text x={qx(eq.y)} y={Y0 + H + 20} fill="#b45309" fontSize="13" fontWeight="600" textAnchor="middle">Y*</text>

        {/* 初始曲线（移动时淡显参考） */}
        {shift !== 'none' && (
          <>
            <path d={line(0, isR(0, 0), 10, isR(10, 0))} stroke="#93c5fd" strokeWidth="2" strokeDasharray="4 4" fill="none" />
            <path d={line(0, lmR(0, 0), 10, lmR(10, 0))} stroke="#c4b5fd" strokeWidth="2" strokeDasharray="4 4" fill="none" />
          </>
        )}

        {/* IS 曲线 */}
        <path d={line(0, isR(0, isShift), 10, isR(10, isShift))} stroke="#2563eb" strokeWidth="3" fill="none" />
        <text x={qx(1.2)} y={py(isR(1.2, isShift)) - 10} fill="#2563eb" fontSize="15" fontWeight="700">IS</text>

        {/* LM 曲线 */}
        <path d={line(0, lmR(0, lmShift), 10, lmR(10, lmShift))} stroke="#7c3aed" strokeWidth="3" fill="none" />
        <text x={qx(1.2)} y={py(lmR(1.2, lmShift)) + 20} fill="#7c3aed" fontSize="15" fontWeight="700">LM</text>

        {/* 均衡点 */}
        <circle cx={qx(eq.y)} cy={py(eq.r)} r="6" fill="#f59e0b" stroke="#fff" strokeWidth="2" />
        <text x={qx(eq.y) + 12} y={py(eq.r) - 10} fill="#b45309" fontSize="14" fontWeight="700">E</text>

        {shift !== 'none' && (
          <circle cx={qx(eq0.y)} cy={py(eq0.r)} r="4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
        )}
      </svg>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
        {SCENARIOS.map((s) => (
          <button
            key={s.key}
            onClick={() => setShift(s.key)}
            style={{
              padding: '6px 12px', borderRadius: 8, fontSize: 13, cursor: 'pointer', border: '1.5px solid',
              borderColor: shift === s.key ? '#7c3aed' : '#e2e8f0',
              background: shift === s.key ? '#f5f3ff' : '#fff',
              color: shift === s.key ? '#6d28d9' : '#475569',
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
