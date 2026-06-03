'use client';

import { useState } from 'react';

interface ProcessStep {
  step: number;
  title: string;
  detail: string;
}

interface EncryptionType {
  id: string;
  name: string;
  nameEn: string;
  icon: string;
  color: string;
  keyConcept: string;
  usage: string;
  process: ProcessStep[];
}

const encryptionTypes: EncryptionType[] = [
  {
    id: 'aes',
    name: '对称加密',
    nameEn: 'AES',
    icon: '🔑',
    color: '#3b82f6',
    keyConcept: '加密和解密使用同一把密钥。速度快，但密钥分发是最大难题——怎么安全地把密钥交给对方？',
    usage: 'HTTPS数据传输阶段、文件加密（如7z压缩包加密）、数据库字段加密、Wi-Fi WPA2加密',
    process: [
      { step: 1, title: '生成密钥', detail: '生成一个随机的对称密钥（AES-256为256位，即32字节）。密钥越长越安全，但计算开销也越大。' },
      { step: 2, title: '明文分块', detail: '将明文数据按128位（16字节）一块进行分组。最后一块不足128位时需要填充（Padding）。' },
      { step: 3, title: '多轮加密', detail: 'AES-256执行14轮加密运算：每轮包括字节替换（SubBytes）、行移位（ShiftRows）、列混合（MixColumns）、轮密钥加（AddRoundKey）。' },
      { step: 4, title: '输出密文', detail: '所有分块加密完成后，拼接密文。相同明文+相同密钥=相同密文，所以对称加密不具备"不可否认性"。' },
    ],
  },
  {
    id: 'rsa',
    name: '非对称加密',
    nameEn: 'RSA',
    icon: '🔐',
    color: '#22c55e',
    keyConcept: '使用一对密钥：公钥加密、私钥解密。公钥可以公开，私钥必须严格保密。解决了密钥分发问题，但速度比对称加密慢100-1000倍。',
    usage: 'HTTPS握手阶段（密钥交换）、SSH登录认证、数字证书验证、区块链交易签名',
    process: [
      { step: 1, title: '生成密钥对', detail: '选择两个大素数p和q，计算n=p*q。通过欧拉函数计算公钥(e,n)和私钥(d,n)。RSA-2048表示n为2048位。' },
      { step: 2, title: '公钥分发', detail: '将公钥(e,n)公开分发给任何人。私钥(d,n)严格保密，只有密钥持有者知道。' },
      { step: 3, title: '加密过程', detail: '发送方用接收方的公钥加密：密文C = M^e mod n（M为明文的数字表示）。只有对应的私钥才能解密。' },
      { step: 4, title: '解密过程', detail: '接收方用自己的私钥解密：明文M = C^d mod n。数学上保证没有私钥就无法在合理时间内破解。' },
    ],
  },
  {
    id: 'sha',
    name: '哈希算法',
    nameEn: 'SHA-256',
    icon: '🧬',
    color: '#a855f7',
    keyConcept: '单向函数，将任意长度的输入转换为固定长度的摘要（256位=32字节）。不可逆——无法从摘要反推出原文。用于完整性校验。',
    usage: '密码存储（数据库存哈希值而非明文）、文件完整性校验、区块链挖矿、数字签名中的摘要计算',
    process: [
      { step: 1, title: '消息预处理', detail: '对输入消息进行填充：先补一个"1"，再补若干"0"，最后64位记录原始消息长度。使总长度为512的倍数。' },
      { step: 2, title: '分块处理', detail: '将填充后的消息按516位分块。每个块再细分为16个32位字，扩展为80个字进行运算。' },
      { step: 3, title: '压缩函数', detail: '对每个512位块执行64轮压缩运算。使用8个初始哈希值（H0-H7），经过大量位运算和加法。' },
      { step: 4, title: '输出摘要', detail: '所有块处理完毕后，将最终的8个哈希值拼接，得到256位（64个十六进制字符）的哈希摘要。' },
    ],
  },
  {
    id: 'signature',
    name: '数字签名',
    nameEn: 'Digital Signature',
    icon: '✍️',
    color: '#f97316',
    keyConcept: '结合哈希和非对称加密：先对消息求哈希，再用私钥加密哈希值。验证者用公钥解密签名，对比哈希值。同时实现完整性验证和身份认证。',
    usage: 'SSL/TLS证书验证、软件发布签名（防止篡改）、电子合同签署、电子邮件签名（S/MIME）',
    process: [
      { step: 1, title: '消息哈希', detail: '发送方对原始消息计算SHA-256哈希值，得到固定长度的消息摘要。' },
      { step: 2, title: '私钥签名', detail: '发送方用自己的私钥对摘要进行加密（签名）。签名附在原始消息后面一起发送。' },
      { step: 3, title: '传输消息', detail: '将原始消息+数字签名一起发送给接收方。即使消息被截获，攻击者也无法伪造签名（没有私钥）。' },
      { step: 4, title: '公钥验证', detail: '接收方用发送方的公钥解密签名得到摘要A，再对收到的消息计算哈希得到摘要B。A=B则验证通过。' },
    ],
  },
];

interface ComparisonItem {
  aspect: string;
  symmetric: string;
  asymmetric: string;
}

const comparisonData: ComparisonItem[] = [
  { aspect: '加密速度', symmetric: '极快（硬件可达数GB/s）', asymmetric: '慢（比对称慢100-1000倍）' },
  { aspect: '密钥管理', symmetric: '困难：n人通信需要n(n-1)/2个密钥', asymmetric: '简单：每人一对密钥，n人只需2n个' },
  { aspect: '密钥分发', symmetric: '不安全：需要安全通道传递密钥', asymmetric: '安全：公钥可以公开传输' },
  { aspect: '典型算法', symmetric: 'AES-128/192/256, DES, 3DES', asymmetric: 'RSA, ECC, ElGamal' },
  { aspect: '密钥长度', symmetric: '128-256位', asymmetric: '2048-4096位' },
  { aspect: '适用场景', symmetric: '大量数据加密（文件、通信内容）', asymmetric: '密钥交换、数字签名、身份认证' },
];

export default function EncryptionFlow() {
  const [activeType, setActiveType] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [showComparison, setShowComparison] = useState(false);

  return (
    <div className="encryption-diagram">
      {/* 加密类型卡片 */}
      <div className="flex flex-col gap-[3px]">
        {encryptionTypes.map((enc) => {
          const isActive = activeType === enc.id;
          return (
            <div key={enc.id}>
              <button
                onClick={() => {
                  setActiveType(isActive ? null : enc.id);
                  setActiveStep(null);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${enc.color}10, ${enc.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? enc.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${enc.color}12` : 'none',
                  }}
                >
                  {/* 图标 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-base mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${enc.color}20, ${enc.color}10)` }}
                  >
                    {enc.icon}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? enc.color : 'var(--text)' }}>
                        {enc.name}
                      </span>
                      <span
                        className="text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                        style={{ background: enc.color + '10', color: enc.color, border: `1px solid ${enc.color}20` }}
                      >
                        {enc.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {enc.keyConcept.slice(0, 45)}...
                    </div>
                  </div>

                  {/* 步骤标签 */}
                  <div className="hidden sm:flex gap-1.5 ml-4 flex-shrink-0">
                    {enc.process.map((s) => (
                      <span
                        key={s.step}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: enc.color + '10', color: enc.color, border: `1px solid ${enc.color}20` }}
                      >
                        {s.step}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{ background: enc.color + '05', border: `1.5px solid ${enc.color}20` }}
                >
                  {/* 核心概念 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: enc.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: enc.color }}>核心概念</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {enc.keyConcept}
                    </div>
                  </div>

                  {/* 实际应用 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>典型应用：</span>
                    {enc.usage}
                  </div>

                  {/* 流程步骤 */}
                  <div className="space-y-2">
                    <div className="text-[12px] font-semibold" style={{ color: 'var(--text-muted)' }}>处理流程</div>
                    {enc.process.map((s) => (
                      <button
                        key={s.step}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveStep(activeStep === s.step ? null : s.step);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          background: activeStep === s.step ? 'var(--surface)' : 'transparent',
                          border: `1px solid ${activeStep === s.step ? enc.color + '30' : 'var(--border-light)'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0"
                            style={{ background: enc.color }}
                          >
                            {s.step}
                          </div>
                          <span className="text-[13px] font-semibold" style={{ color: enc.color }}>{s.title}</span>
                        </div>
                        {activeStep === s.step && (
                          <div className="mt-2 ml-9 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {s.detail}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 对称 vs 非对称 对比 */}
      <div className="mt-5">
        <button
          onClick={() => setShowComparison(!showComparison)}
          className="w-full text-left rounded-xl px-5 py-3.5 transition-all duration-300"
          style={{
            background: showComparison ? 'linear-gradient(135deg, #3b82f608, #22c55e08)' : 'var(--surface)',
            border: `1.5px solid ${showComparison ? '#3b82f640' : 'var(--border)'}`,
          }}
        >
          <div className="flex items-center gap-3">
            <div className="flex -space-x-1">
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: '#3b82f6' }}>S</div>
              <div className="w-6 h-6 rounded-md flex items-center justify-center text-white text-[10px] font-bold" style={{ background: '#22c55e' }}>A</div>
            </div>
            <span className="font-semibold text-[14px]" style={{ color: showComparison ? '#3b82f6' : 'var(--text)' }}>
              对称加密 vs 非对称加密 对比
            </span>
            <span className="text-[12px] ml-auto" style={{ color: 'var(--text-muted)' }}>
              {showComparison ? '收起' : '展开'}
            </span>
          </div>
        </button>

        {showComparison && (
          <div className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-4 rounded-xl" style={{ background: '#3b82f604', border: '1.5px solid #3b82f615' }}>
            <div className="space-y-0">
              {comparisonData.map((item, i) => (
                <div
                  key={i}
                  className="grid grid-cols-[100px_1fr_1fr] gap-3 py-3 text-[12.5px]"
                  style={{ borderBottom: i < comparisonData.length - 1 ? '1px solid var(--border)' : 'none' }}
                >
                  <div className="font-semibold" style={{ color: 'var(--text)' }}>{item.aspect}</div>
                  <div style={{ color: '#3b82f6' }}>{item.symmetric}</div>
                  <div style={{ color: '#22c55e' }}>{item.asymmetric}</div>
                </div>
              ))}
            </div>

            {/* 密钥交换流程说明 */}
            <div className="mt-4 px-4 py-3 rounded-lg" style={{ background: '#22c55e08' }}>
              <div className="text-[12px] font-semibold mb-2" style={{ color: '#22c55e' }}>实际应用：混合加密（TLS/HTTPS的做法）</div>
              <div className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                1) 客户端请求服务器的<strong>RSA公钥</strong><br />
                2) 客户端生成一个随机的<strong>对称密钥</strong>（会话密钥）<br />
                3) 用服务器的<strong>RSA公钥</strong>加密这个对称密钥，发送给服务器<br />
                4) 服务器用<strong>RSA私钥</strong>解密，得到对称密钥<br />
                5) 双方使用这个<strong>对称密钥</strong>进行快速数据加密传输
              </div>
              <div className="mt-2 text-[11px]" style={{ color: 'var(--text-muted)' }}>
                兼顾安全（非对称解决密钥分发）与速度（对称加密处理大量数据）
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各加密类型展开处理流程 · 展开对比表查看对称与非对称加密差异
      </div>
    </div>
  );
}
