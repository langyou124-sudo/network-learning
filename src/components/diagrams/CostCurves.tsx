'use client';

import { useState } from 'react';

/**
 * 短期成本曲线 —— 生产者理论核心。
 * MC 自下而上穿过 AC、AVC 的最低点；AC = AVC + AFC，随 Q 增大 AC 与 AVC 趋近。
 * 可高亮各曲线与关键交点（收支平衡点、停止营业点）。
 */

type Highlight = 'all' | 'mc' | 'ac' | 'avc' | 'shutdown' | 'breakeven';

const HIGHLIGHTS: { key: Highlight; label: string; desc: string }[] = [
  { key: 'all', label: '全部曲线', desc: 'MC 自下而上穿过 AC、AVC 最低点' },
  { key: 'mc', label: '边际成本 MC', desc: 'MC = dTC/dQ，先降后升（U 形），是供给曲线的基础' },
  { key: 'ac', label: '平均总成本 AC', desc: 'AC = TC/Q = AVC + AFC，随 Q 增大渐近 AVC' },
  { key: 'avc', label: '平均可变成本 AVC', desc: 'AVC = VC/Q，U 形，最低点即停止营业点' },
  { key: 'shutdown', label: '停止营业点', desc: 'MC 与 AVC 交点，P 低于此厂商短期停产' },
  { key: 'breakeven', label: '收支平衡点', desc: 'MC 与 AC 交点，P 等于此时经济利润为零' },
];

const X0 = 70, Y0 = 40, W = 430, H = 320;
const qx = (q: number) => X0 + (q / 12) * W;
const py = (c: number) => Y0 + H - (c / 12) * H;

// 成本曲线（简化的 U 形，Q∈[0,12]）
const mc = (q: number) => 0.55 * q * q - 5.2 * q + 13;   // 最低约 q≈4.7
const avc = (q: number) => 0.28 * q * q - 3.0 * q + 11;  // 最低约 q≈5.4
const ac = (q: number) => avc(q) + 22 / (q + 0.6);        // AFC = 22/(q+0.6)

function curve(f: (q: number) => number) {
  const pts: string[] = [];
  for (let q = 0.3; q <= 11.8; q += 0.15) {
    pts.push(`${qx(q)} ${py(Math.min(f(q), 11.8))}`);
  }
  return 'M ' + pts.join(' L ');
}

// 找 MC 与 AVC、AC 的近似交点（最低点）
function findMin(f: (q: number) => number) {
  let best = { q: 0, v: 999 };
  for (let q = 0.5; q < 11; q += 0.1) {
    const v = f(q);
    if (v < best.v) best = { q, v };
  }
  return best;
}

export default function CostCurves() {
  const [hl, setHl] = useState<Highlight>('all');
  const shutdown = findMin(avc);
  const breakeven = findMin(ac);
  const current = HIGHLIGHTS.find((h) => h.key === hl)!;

  const show = (k: string) => hl === 'all' || hl === k;
  const dim = (k: string) => (hl === 'all' || hl === k ? 1 : 0.18);

  return (
    <div style={{ fontFamily: 'inherit' }}>
      <svg viewBox="0 0 530 400" style={{ width: '100%', maxWidth: 570, display: 'block', margin: '0 auto' }}>
        <line x1={X0} y1={Y0} x2={X0} y2={Y0 + H} stroke="#94a3b8" strokeWidth="2" />
        <line x1={X0} y1={Y0 + H} x2={X0 + W} y2={Y0 + H} stroke="#94a3b8" strokeWidth="2" />
        <text x={X0 - 24} y={Y0 + 10} fill="#475569" fontSize="15" fontWeight="600">C</text>
        <text x={X0 + W + 8} y={Y0 + H + 5} fill="#475569" fontSize="15" fontWeight="600">Q</text>

        {/* AC */}
        <path d={curve(ac)} stroke="#dc2626" strokeWidth="3" fill="none" opacity={dim('ac')} />
        <text x={qx(10.6)} y={py(ac(10.6)) - 8} fill="#dc2626" fontSize="14" fontWeight="700" opacity={dim('ac')}>AC</text>

        {/* AVC */}
        <path d={curve(avc)} stroke="#16a34a" strokeWidth="3" fill="none" opacity={dim('avc')} />
        <text x={qx(10.6)} y={py(avc(10.6)) + 2} fill="#16a34a" fontSize="14" fontWeight="700" opacity={dim('avc')}>AVC</text>

        {/* MC */}
        <path d={curve(mc)} stroke="#2563eb" strokeWidth="3" fill="none" opacity={dim('mc')} />
        <text x={qx(10.8)} y={py(mc(10.8)) - 8} fill="#2563eb" fontSize="14" fontWeight="700" opacity={dim('mc')}>MC</text>

        {/* 停止营业点（MC×AVC） */}
        {(show('shutdown') || hl === 'all') && (
          <>
            <circle cx={qx(shutdown.q)} cy={py(shutdown.v)} r="5.5" fill="#16a34a" stroke="#fff" strokeWidth="2" opacity={dim('shutdown')} />
            <text x={qx(shutdown.q) + 8} y={py(shutdown.v) + 16} fill="#15803d" fontSize="11.5" fontWeight="600" opacity={dim('shutdown')}>停止营业点</text>
          </>
        )}
        {/* 收支平衡点（MC×AC） */}
        {(show('breakeven') || hl === 'all') && (
          <>
            <circle cx={qx(breakeven.q)} cy={py(breakeven.v)} r="5.5" fill="#dc2626" stroke="#fff" strokeWidth="2" opacity={dim('breakeven')} />
            <text x={qx(breakeven.q) + 8} y={py(breakeven.v) - 10} fill="#b91c1c" fontSize="11.5" fontWeight="600" opacity={dim('breakeven')}>收支平衡点</text>
          </>
        )}
      </svg>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 12 }}>
        {HIGHLIGHTS.map((h) => (
          <button
            key={h.key}
            onClick={() => setHl(h.key)}
            style={{
              padding: '6px 11px', borderRadius: 8, fontSize: 12.5, cursor: 'pointer', border: '1.5px solid',
              borderColor: hl === h.key ? '#dc2626' : '#e2e8f0',
              background: hl === h.key ? '#fef2f2' : '#fff',
              color: hl === h.key ? '#b91c1c' : '#475569',
              fontWeight: hl === h.key ? 600 : 400,
            }}
          >
            {h.label}
          </button>
        ))}
      </div>
      <p style={{ textAlign: 'center', fontSize: 13, color: '#64748b', marginTop: 10, lineHeight: 1.6 }}>
        <strong style={{ color: '#334155' }}>{current.label}：</strong>{current.desc}
      </p>
    </div>
  );
}
