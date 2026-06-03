'use client';

import { useState } from 'react';

interface Protocol {
  name: string;
  fullName: string;
  role: string;
}

interface Layer {
  num: number;
  name: string;
  nameEn: string;
  color: string;
  pdu: string;
  protocols: Protocol[];
  description: string;
  example: string;
  keyConcept: string;
}

const layers: Layer[] = [
  {
    num: 7, name: '应用层', nameEn: 'Application',
    color: '#6366f1',
    pdu: '数据 (Data)',
    protocols: [
      { name: 'HTTP', fullName: 'HyperText Transfer Protocol', role: '网页传输的基础协议。浏览器输入网址后，用HTTP向服务器请求网页内容。默认端口80。' },
      { name: 'HTTPS', fullName: 'HTTP Secure', role: '加密版HTTP，在HTTP基础上加了SSL/TLS加密。网上银行、购物网站必须用HTTPS。默认端口443。' },
      { name: 'DNS', fullName: 'Domain Name System', role: '域名系统，把人类可读的域名（baidu.com）翻译成机器可识别的IP地址（110.242.68.66）。没有DNS，你得记一串数字才能上网。' },
      { name: 'FTP', fullName: 'File Transfer Protocol', role: '文件传输协议，用于在客户端和服务器之间上传/下载文件。端口20（数据）和21（控制）。' },
      { name: 'SMTP', fullName: 'Simple Mail Transfer Protocol', role: '简单邮件传输协议，负责发送电子邮件。你点"发送"按钮时，邮件客户端用SMTP把邮件送到邮件服务器。' },
      { name: 'SSH', fullName: 'Secure Shell', role: '安全远程登录协议，管理员用它远程管理服务器。所有数据加密传输。端口22。' },
    ],
    description: '用户与网络的直接接口。这一层直接为应用程序提供网络服务——你用浏览器上网、用微信聊天、用邮件客户端收发邮件，都是应用层在工作。',
    example: '你在浏览器输入www.baidu.com → 浏览器用DNS协议解析域名 → 用HTTP协议构造请求报文 → 发送给百度服务器。这三步全在应用层完成。',
    keyConcept: '应用层定义了应用程序之间"说什么话"——用什么格式、什么语法交流。',
  },
  {
    num: 6, name: '表示层', nameEn: 'Presentation',
    color: '#8b5cf6',
    pdu: '数据 (Data)',
    protocols: [
      { name: 'SSL/TLS', fullName: 'Secure Sockets Layer / Transport Layer Security', role: '加密协议，对数据进行加密和解密。HTTPS的"S"就是靠SSL/TLS实现的。' },
      { name: 'JPEG', fullName: 'Joint Photographic Experts Group', role: '图片压缩格式，表示层负责把JPEG图片解码成像素数据显示在屏幕上。' },
      { name: 'ASCII', fullName: 'American Standard Code', role: '字符编码标准，把字母、数字转换成计算机能处理的二进制编码。' },
      { name: 'MPEG', fullName: 'Moving Picture Experts Group', role: '视频压缩标准，表示层负责解码MPEG视频流。' },
    ],
    description: '数据的"翻译官"。负责数据格式转换、加密解密、压缩解压。不同系统可能用不同的数据格式，表示层确保双方能互相理解。',
    example: '你收到一张JPEG照片 → 表示层把压缩的JPEG数据解码成像素 → 屏幕显示出来。或者你输入密码 → 表示层用SSL加密后才传输出去。',
    keyConcept: '表示层解决"用什么格式说"——编码、加密、压缩都在这层。',
  },
  {
    num: 5, name: '会话层', nameEn: 'Session',
    color: '#a855f7',
    pdu: '数据 (Data)',
    protocols: [
      { name: 'NetBIOS', fullName: 'Network Basic Input/Output System', role: '局域网内的名称服务，让局域网中的电脑能通过名称互相找到对方。' },
      { name: 'RPC', fullName: 'Remote Procedure Call', role: '远程过程调用，让一台电脑上的程序能调用另一台电脑上的函数，就像调用本地函数一样。' },
      { name: 'PPTP', fullName: 'Point-to-Point Tunneling Protocol', role: '点对点隧道协议，用于建立VPN连接。' },
    ],
    description: '会话的"管家"。负责建立、维护和终止会话。什么是会话？你登录淘宝后浏览商品、加购物车、下单——这一系列操作都在一个"会话"中进行，会话层确保服务器知道这些操作都是你一个人做的。',
    example: '你登录网站后 → 会话层建立会话 → 服务器给你一个会话ID（存在cookie里） → 之后每次请求都带上这个ID → 服务器就知道是你。如果会话超时，你需要重新登录。',
    keyConcept: '会话层管理"对话状态"——确保一系列请求被识别为同一个用户的连续操作。',
  },
  {
    num: 4, name: '传输层', nameEn: 'Transport',
    color: '#d946ef',
    pdu: '段 (Segment)',
    protocols: [
      { name: 'TCP', fullName: 'Transmission Control Protocol', role: '面向连接的可靠传输。发送前先建立连接（三次握手），传输过程保证数据不丢、不乱、不重复。适合文件传输、网页浏览、电子邮件。' },
      { name: 'UDP', fullName: 'User Datagram Protocol', role: '无连接的快速传输。不建立连接，直接发送，不保证可靠性但延迟极低。适合视频直播、在线游戏、DNS查询。' },
    ],
    description: '端到端通信的保障。"端到端"意味着从你电脑上的某个具体程序，到服务器上的某个具体程序。传输层通过端口号区分程序——就像一栋楼的门牌号，IP地址是楼的地址，端口号是房间号。',
    example: '你同时打开百度网页和微信 → 传输层用不同端口号区分这两个应用的数据 → 百度的数据走80端口，微信走自己的端口 → 各自互不干扰。',
    keyConcept: 'TCP保证"一个不少"，UDP追求"一个不等"。选哪个取决于应用需求。',
  },
  {
    num: 3, name: '网络层', nameEn: 'Network',
    color: '#ec4899',
    pdu: '包 (Packet)',
    protocols: [
      { name: 'IP', fullName: 'Internet Protocol', role: '给每台设备分配唯一地址（IP地址），负责把数据包从源地址传到目标地址。IP是无连接的——每个包独立路由，不保证顺序。' },
      { name: 'ICMP', fullName: 'Internet Control Message Protocol', role: '网络控制消息协议，用于报告错误和诊断网络。ping命令就是发ICMP回显请求，检测目标是否可达。' },
      { name: 'ARP', fullName: 'Address Resolution Protocol', role: '地址解析协议，把IP地址翻译成MAC地址。知道对方的IP还不够，还需要MAC地址才能在局域网内传输。' },
      { name: 'OSPF', fullName: 'Open Shortest Path First', role: '开放式最短路径优先，路由器之间交换路由信息的协议，帮助路由器找到到达目标网络的最优路径。' },
    ],
    description: '路由和寻址的核心。网络层解决的问题是：数据包从A地到B地，应该走哪条路？IP地址是逻辑地址（可以改变），MAC地址是物理地址（固定在网卡上）。路由器根据IP地址做路由决策。',
    example: '你从北京发数据到深圳 → 数据包到达第一个路由器 → 路由器查看目标IP → 查路由表 → 转发给下一个路由器 → 经过十几个路由器 → 到达深圳。每个路由器都做同样的事：查IP、查表、转发。',
    keyConcept: 'IP地址是"逻辑地址"（可以变），MAC地址是"物理地址"（固定）。路由器用IP做决策，交换机用MAC做转发。',
  },
  {
    num: 2, name: '数据链路层', nameEn: 'Data Link',
    color: '#f43f5e',
    pdu: '帧 (Frame)',
    protocols: [
      { name: 'Ethernet', fullName: '以太网', role: '最常用的局域网技术。定义了数据帧格式、MAC地址格式、CSMA/CD冲突检测机制。你家的有线网络就是以太网。' },
      { name: 'Wi-Fi', fullName: 'IEEE 802.11', role: '无线局域网标准。用无线电波代替网线，让你不用插线就能上网。802.11ac/ax是最新的Wi-Fi标准。' },
      { name: 'PPP', fullName: 'Point-to-Point Protocol', role: '点对点协议，用于两台设备之间的直接连接。早期拨号上网就用PPP。' },
      { name: 'VLAN', fullName: 'Virtual Local Area Network', role: '虚拟局域网，在一台物理交换机上划分出多个逻辑网络，提高安全性和效率。' },
    ],
    description: '帧传输和差错检测。数据链路层把网络层的"包"封装成"帧"，加上源MAC地址和目标MAC地址。交换机根据MAC地址把帧转发到正确的端口。',
    example: '你的电脑要发数据给同一局域网的打印机 → 数据链路层把数据封装成帧 → 帧头写上你电脑的MAC地址和打印机的MAC地址 → 交换机根据目标MAC地址把帧送到打印机的端口。',
    keyConcept: '交换机是这一层的设备，它根据MAC地址"记住"每台设备在哪个端口。',
  },
  {
    num: 1, name: '物理层', nameEn: 'Physical',
    color: '#ef4444',
    pdu: '比特 (Bits)',
    protocols: [
      { name: '光纤', fullName: 'Optical Fiber', role: '用光脉冲传输数据，速度极快（可达100Gbps以上），距离远，抗干扰。骨干网和数据中心大量使用。' },
      { name: '双绞线', fullName: 'Twisted Pair (Cat5e/Cat6)', role: '最常用的网线，8根铜线两两绞在一起减少干扰。Cat5e支持千兆，Cat6支持万兆。' },
      { name: '无线电波', fullName: 'Radio Waves', role: 'Wi-Fi和移动网络用无线电波传输数据。频率越高速度越快，但穿墙能力越弱。' },
      { name: 'USB', fullName: 'Universal Serial Bus', role: '通用串行总线，也工作在物理层，定义了数据线的电气特性。' },
    ],
    description: '最底层——原始比特流的传输。这一层不关心数据内容，只负责把0和1变成电信号、光信号或无线电波，在物理介质上传输。',
    example: '网线里的电信号：高电平代表1，低电平代表0。光纤里的光脉冲：有光代表1，无光代表0。这些就是物理层的工作。',
    keyConcept: '物理层只关心"怎么在线路上传输0和1"——电气特性、接口形状、线缆规格。',
  },
];

export default function OsiLayers() {
  const [activeLayer, setActiveLayer] = useState<number | null>(null);
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  return (
    <div className="osi-diagram">
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
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
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
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${layer.color}, ${layer.color}cc)` }}
                  >
                    {layer.num}
                  </div>

                  {/* PDU */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: layer.color + '10', color: layer.color, border: `1px solid ${layer.color}20` }}
                  >
                    {layer.pdu}
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
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {layer.description.slice(0, 50)}...
                    </div>
                  </div>

                  {/* 协议标签 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[200px] justify-end">
                    {layer.protocols.slice(0, 3).map(p => (
                      <span
                        key={p.name}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: layer.color + '10', color: layer.color, border: `1px solid ${layer.color}20` }}
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
                  style={{ background: layer.color + '05', border: `1.5px solid ${layer.color}20` }}
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
                    <div className="text-[12px] font-semibold" style={{ color: 'var(--text-muted)' }}>涉及协议</div>
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
                          <span className="text-[13px] font-semibold" style={{ color: layer.color }}>{p.name}</span>
                          <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{p.fullName}</span>
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

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各层展开详情和协议说明 · 从上到下：用户侧 → 物理传输
      </div>
    </div>
  );
}
