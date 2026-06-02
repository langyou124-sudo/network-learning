'use client';

import { useState } from 'react';

interface Step {
  layer: string;
  layerEn: string;
  pdu: string;
  color: string;
  action: string;
  detail: string;
}

const steps: Step[] = [
  {
    layer: '应用层', layerEn: 'Application',
    pdu: '数据 (Data)', color: '#6366f1',
    action: '生成原始数据',
    detail: '你打开浏览器输入网址，浏览器生成HTTP请求报文',
  },
  {
    layer: '传输层', layerEn: 'Transport',
    pdu: '段 (Segment)', color: '#d946ef',
    action: '添加端口号',
    detail: '加上源端口和目标端口（如80），TCP还会添加序列号、确认号',
  },
  {
    layer: '网络层', layerEn: 'Network',
    pdu: '包 (Packet)', color: '#ec4899',
    action: '添加IP地址',
    detail: '加上源IP和目标IP地址，路由器根据这些地址决定转发路径',
  },
  {
    layer: '数据链路层', layerEn: 'Data Link',
    pdu: '帧 (Frame)', color: '#f43f5e',
    action: '添加MAC地址',
    detail: '加上源MAC和目标MAC地址，以及帧校验序列FCS',
  },
  {
    layer: '物理层', layerEn: 'Physical',
    pdu: '比特 (Bits)', color: '#ef4444',
    action: '转换为信号',
    detail: '把帧转换成电信号、光信号或无线电波，在线缆上传输',
  },
];

export default function Encapsulation() {
  const [activeStep, setActiveStep] = useState<number | null>(null);

  return (
    <div className="encapsulation-diagram">
      {/* 封装过程 - 从外到内 */}
      <div className="flex flex-col items-center gap-0">
        {steps.map((step, i) => {
          const isActive = activeStep === i;
          const indent = i * 24;

          return (
            <div
              key={i}
              className="w-full cursor-pointer transition-all duration-300"
              style={{ paddingLeft: indent, paddingRight: indent }}
              onClick={() => setActiveStep(isActive ? null : i)}
            >
              <div
                className="flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300"
                style={{
                  background: isActive ? step.color + '0a' : 'transparent',
                  border: `1.5px solid ${isActive ? step.color + '35' : 'var(--border)'}`,
                }}
              >
                {/* 步骤序号 */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                  style={{ background: step.color }}
                >
                  {i + 1}
                </div>

                {/* 层信息 */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[14px]" style={{ color: isActive ? step.color : 'var(--text)' }}>
                      {step.layer}
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                      {step.layerEn}
                    </span>
                  </div>
                  <div className="text-[12.5px]" style={{ color: 'var(--text-muted)' }}>
                    {step.action}
                  </div>
                </div>

                {/* PDU名称 */}
                <div
                  className="text-[12px] px-3 py-1 rounded-lg font-medium flex-shrink-0"
                  style={{
                    background: step.color + '10',
                    color: step.color,
                    border: `1px solid ${step.color}20`,
                  }}
                >
                  {step.pdu}
                </div>
              </div>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-4 mt-1 mb-2 px-5 py-3 rounded-xl text-[13px] leading-relaxed"
                  style={{
                    background: step.color + '06',
                    border: `1px solid ${step.color}15`,
                    color: 'var(--text-secondary)',
                  }}
                >
                  {step.detail}
                </div>
              )}

              {/* 箭头连接 */}
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <path d="M8 2 L8 12 M4 9 L8 13 L12 9" stroke="#d1d5db" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        封装过程：数据从应用层向下逐层添加头部信息 · 点击各层查看详情
      </div>
    </div>
  );
}
