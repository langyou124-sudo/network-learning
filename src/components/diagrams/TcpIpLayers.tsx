'use client';

import { useState } from 'react';

interface Layer {
  num: number;
  name: string;
  nameEn: string;
  color: string;
  osiMapping: string;
  protocols: { name: string; fullName: string; role: string }[];
  description: string;
  example: string;
  keyConcept: string;
}

const layers: Layer[] = [
  {
    num: 4,
    name: '应用层',
    nameEn: 'Application',
    color: '#6366f1',
    osiMapping: '对应OSI的应用层 + 表示层 + 会话层',
    protocols: [
      { name: 'HTTP', fullName: 'HyperText Transfer Protocol', role: '网页传输，浏览器和服务器之间的对话协议' },
      { name: 'HTTPS', fullName: 'HTTP Secure', role: '加密版HTTP，数据在传输过程中被加密保护' },
      { name: 'DNS', fullName: 'Domain Name System', role: '域名解析，把baidu.com翻译成IP地址' },
      { name: 'FTP', fullName: 'File Transfer Protocol', role: '文件传输，用于上传下载文件' },
      { name: 'SMTP', fullName: 'Simple Mail Transfer Protocol', role: '发送电子邮件' },
      { name: 'DHCP', fullName: 'Dynamic Host Configuration Protocol', role: '自动分配IP地址，设备连上Wi-Fi就能上网' },
    ],
    description: '直接面向用户的应用程序，提供各种网络服务。TCP/IP的应用层合并了OSI的三层——应用层、表示层、会话层的功能。这意味着应用程序自己要处理数据格式、加密和会话管理。',
    example: '你打开浏览器访问google.com，浏览器用HTTP协议构造请求，用DNS协议解析域名，用HTTPS加密数据——这些全在应用层完成。',
    keyConcept: '应用层协议定义了"说什么"——客户端和服务器之间用什么格式交流。',
  },
  {
    num: 3,
    name: '传输层',
    nameEn: 'Transport',
    color: '#d946ef',
    osiMapping: '对应OSI的传输层',
    protocols: [
      { name: 'TCP', fullName: 'Transmission Control Protocol', role: '可靠传输，保证数据不丢、不乱、不重复。适合文件下载、网页浏览' },
      { name: 'UDP', fullName: 'User Datagram Protocol', role: '快速传输，不保证可靠性但延迟低。适合视频直播、在线游戏' },
    ],
    description: '负责端到端的通信。"端到端"的意思是：从你电脑上的某个程序，到服务器上的某个程序。传输层通过端口号区分不同的程序——HTTP用80端口，HTTPS用443端口。',
    example: '你用微信视频通话——语音数据用UDP传输（丢几个包没关系，不能卡顿），而消息记录用TCP传输（每条消息都不能丢）。',
    keyConcept: 'TCP和UDP是传输层的两大协议。TCP像挂号信（保证送达），UDP像广播（发出去就行）。',
  },
  {
    num: 2,
    name: '网际层',
    nameEn: 'Internet',
    color: '#ec4899',
    osiMapping: '对应OSI的网络层',
    protocols: [
      { name: 'IP', fullName: 'Internet Protocol', role: '给每台设备分配地址（IP地址），决定数据包往哪转发' },
      { name: 'ICMP', fullName: 'Internet Control Message Protocol', role: '网络诊断，ping命令就是用ICMP检测目标是否可达' },
      { name: 'ARP', fullName: 'Address Resolution Protocol', role: '地址解析，把IP地址翻译成MAC地址' },
      { name: 'OSPF', fullName: 'Open Shortest Path First', role: '路由协议，路由器之间交换路由信息，找到最优路径' },
    ],
    description: '负责把数据包从源网络传送到目标网络。这一层的核心是IP地址——每台设备都有唯一的IP地址，路由器根据目标IP地址决定数据包下一步往哪走。',
    example: '你从北京发数据到深圳的服务器，数据包可能经过十几个路由器。每个路由器都查看目标IP，查路由表，决定下一个转发点。这就是网际层的工作。',
    keyConcept: 'IP地址是设备的"邮寄地址"，路由器是"邮局分拣中心"。',
  },
  {
    num: 1,
    name: '网络接口层',
    nameEn: 'Network Interface',
    color: '#ef4444',
    osiMapping: '对应OSI的数据链路层 + 物理层',
    protocols: [
      { name: 'Ethernet', fullName: '以太网', role: '最常用的局域网技术，定义了数据帧格式和MAC地址' },
      { name: 'Wi-Fi', fullName: 'IEEE 802.11', role: '无线局域网，用无线电波代替网线' },
      { name: 'PPP', fullName: 'Point-to-Point Protocol', role: '点对点协议，常用于拨号上网和专线连接' },
    ],
    description: '负责在物理网络上传输数据。这一层处理的是最"接地气"的事情：网线里的电信号、光纤里的光脉冲、空气中的无线电波。TCP/IP把OSI的数据链路层和物理层合并为一层。',
    example: '你的电脑通过Wi-Fi发送数据——数据被转换成无线电波，路由器的天线接收到信号，还原成数字数据。这就是网络接口层的工作。',
    keyConcept: '这一层关心的是"怎么在实际线路上传输"——不管是铜线、光纤还是空气。',
  },
];

export default function TcpIpLayers() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  return (
    <div className="tcpip-diagram">
      {/* 四层堆叠 */}
      <div className="flex flex-col gap-[3px]">
        {layers.map((layer) => {
          const isActive = activeLayer === layer.num;
          return (
            <div key={layer.num}>
              <button
                onClick={() => {
                  setActiveLayer(isActive ? null : layer.num);
                  setActiveProtocol(null);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-5 py-4 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${layer.color}10, ${layer.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? layer.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${layer.color}12` : 'none',
                  }}
                >
                  {/* 层号 */}
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${layer.color}, ${layer.color}bb)`,
                    }}
                  >
                    {layer.num}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? layer.color : 'var(--text)' }}>
                        {layer.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {layer.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {layer.osiMapping}
                    </div>
                  </div>

                  {/* 协议标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[220px] justify-end">
                    {layer.protocols.slice(0, 3).map(p => (
                      <span
                        key={p.name}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{
                          background: layer.color + '10',
                          color: layer.color,
                          border: `1px solid ${layer.color}20`,
                        }}
                      >
                        {p.name}
                      </span>
                    ))}
                    {layer.protocols.length > 3 && (
                      <span className="text-[11px] px-1.5 py-0.5" style={{ color: 'var(--text-muted)' }}>
                        +{layer.protocols.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{
                    background: layer.color + '05',
                    border: `1.5px solid ${layer.color}20`,
                  }}
                >
                  {/* 核心概念 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: layer.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: layer.color }}>核心概念</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {layer.keyConcept}
                    </div>
                  </div>

                  {/* 详细说明 */}
                  <div className="mb-4 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {layer.description}
                  </div>

                  {/* 实际场景 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>实际场景：</span>
                    {layer.example}
                  </div>

                  {/* 协议详情 */}
                  <div className="space-y-2">
                    <div className="text-[12px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                      涉及协议
                    </div>
                    {layer.protocols.map(p => (
                      <button
                        key={p.name}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveProtocol(activeProtocol === p.name ? null : p.name);
                        }}
                        className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                        style={{
                          background: activeProtocol === p.name ? 'var(--surface)' : 'transparent',
                          border: `1px solid ${activeProtocol === p.name ? layer.color + '30' : 'var(--border-light)'}`,
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-[13px] font-semibold" style={{ color: layer.color }}>
                            {p.name}
                          </span>
                          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                            {p.fullName}
                          </span>
                        </div>
                        {activeProtocol === p.name && (
                          <div className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                            {p.role}
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

      {/* 对比提示 */}
      <div className="mt-5 px-5 py-4 rounded-xl" style={{ background: 'var(--accent-light)', border: '1px solid var(--accent)' + '20' }}>
        <div className="text-[12px] font-semibold mb-1.5" style={{ color: 'var(--accent)' }}>与OSI模型的关系</div>
        <div className="text-[12.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          TCP/IP是互联网实际使用的标准，OSI是理论教学模型。TCP/IP把OSI的7层合并为4层——应用层合并了上面三层，网络接口层合并了下面两层。工作中用TCP/IP，考试中考OSI。
        </div>
      </div>

      <div className="mt-3 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各层展开详情 · 点击协议查看说明
      </div>
    </div>
  );
}
