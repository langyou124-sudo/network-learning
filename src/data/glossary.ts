// 网络工程术语表 — 用于内容中术语悬浮提示
// 匹配规则：英文不区分大小写，中文精确匹配

export interface GlossaryTerm {
  term: string;       // 显示的术语
  aliases?: string[]; // 别名（也会触发匹配）
  definition: string; // 简短解释（15-50字）
}

export const glossary: GlossaryTerm[] = [
  // === 网络基础 ===
  { term: 'OSI', definition: '开放系统互连模型，将网络通信分为7层的标准化框架。' },
  { term: 'TCP/IP', definition: '传输控制协议/网际协议，互联网的核心协议族，分为4层。' },
  { term: 'LAN', definition: '局域网，覆盖几百米到几公里的小范围网络，如家庭Wi-Fi。' },
  { term: 'WAN', definition: '广域网，覆盖跨城市/跨国的大范围网络，互联网就是最大的WAN。' },
  { term: 'MAN', definition: '城域网，覆盖一个城市的网络，如大学多校区互联。' },
  { term: 'PDU', definition: '协议数据单元，每一层传输的数据单位名称。' },
  { term: '封装', definition: '数据从上层到下层时，每层添加自己的头部信息的过程。', aliases: ['Encapsulation'] },
  { term: '解封装', definition: '接收端从下层到上层时，逐层去掉头部还原数据的过程。' },

  // === 物理层与数据链路层 ===
  { term: '以太网', definition: '当前最主流的局域网技术标准，使用CSMA/CD机制。', aliases: ['Ethernet'] },
  { term: 'MAC地址', definition: '网络设备的物理地址，48位，全球唯一，烧录在网卡中。', aliases: ['MAC Address'] },
  { term: 'ARP', definition: '地址解析协议，通过IP地址查询对应的MAC地址。' },
  { term: 'MTU', definition: '最大传输单元，以太网默认1500字节，超过需分片。' },
  { term: 'CRC', definition: '循环冗余校验，帧尾的校验码，用于检测传输错误。' },
  { term: 'VLAN', definition: '虚拟局域网，在交换机上逻辑划分广播域，隔离不同部门的流量。' },
  { term: 'Trunk', definition: '交换机之间的链路，可同时传输多个VLAN的数据帧。' },
  { term: 'STP', definition: '生成树协议，通过阻塞冗余链路消除交换机环路。' },
  { term: 'BPDU', definition: '网桥协议数据单元，STP交换机之间交换的控制报文。' },
  { term: 'CSMA/CD', definition: '载波监听多路访问/冲突检测，以太网的介质访问控制机制。' },

  // === 网络层 ===
  { term: 'IP地址', definition: '网络层逻辑地址，用于标识网络中的设备，IPv4为32位。' },
  { term: '子网掩码', definition: '用于区分IP地址中网络位和主机位的32位掩码。', aliases: ['Subnet Mask'] },
  { term: 'CIDR', definition: '无类域间路由，用/前缀长度代替传统子网掩码，如192.168.1.0/24。' },
  { term: 'VLSM', definition: '可变长子网掩码，允许在同一网络中使用不同大小的子网。' },
  { term: '网关', definition: '连接不同网络的出口设备，通常是路由器接口的IP地址。', aliases: ['Gateway', '默认网关'] },
  { term: '路由表', definition: '路由器中存储的转发决策表，记录目的网络和对应的下一跳。', aliases: ['Routing Table'] },
  { term: '下一跳', definition: '数据包到达目的网络路径上的下一个路由器接口地址。', aliases: ['Next Hop'] },
  { term: 'ICMP', definition: '互联网控制报文协议，用于网络诊断和错误报告，ping就是ICMP应用。' },
  { term: 'TTL', definition: '生存时间，IP包每经过一个路由器减1，防止无限循环。' },
  { term: 'NAT', definition: '网络地址转换，将私有IP转为公有IP，解决IPv4地址不足问题。' },
  { term: 'ACL', definition: '访问控制列表，路由器上基于规则过滤流量的安全机制。' },
  { term: 'OSPF', definition: '开放最短路径优先，链路状态路由协议，收敛快，适合大型网络。' },
  { term: 'RIP', definition: '路由信息协议，距离向量路由协议，最大15跳，适合小型网络。' },
  { term: 'BGP', definition: '边界网关协议，自治系统间的路由协议，互联网骨干网使用。' },
  { term: '管理距离', definition: '衡量路由来源可信度的数值，越小越可信。直连0，静态1。' },

  // === 传输层 ===
  { term: 'TCP', definition: '传输控制协议，面向连接、可靠传输，提供流量控制和拥塞控制。' },
  { term: 'UDP', definition: '用户数据报协议，无连接、不保证可靠，速度快，适合实时应用。' },
  { term: '三次握手', definition: 'TCP建立连接的过程：SYN→SYN+ACK→ACK，确保双方同步序列号。' },
  { term: '四次挥手', definition: 'TCP断开连接的过程：FIN→ACK→FIN→ACK，双方确认数据传完。' },
  { term: '滑动窗口', definition: 'TCP流量控制机制，接收方通过窗口大小告知发送方还能发多少数据。' },
  { term: '拥塞控制', definition: 'TCP防止网络过载的机制，包括慢启动、拥塞避免、快重传、快恢复。' },
  { term: '端口号', definition: '传输层标识应用进程的16位数字，0-1023为知名端口。', aliases: ['Port'] },
  { term: '套接字', definition: 'IP地址+端口号的组合，唯一标识网络中一个通信端点。', aliases: ['Socket'] },
  { term: '序列号', definition: 'TCP为每个字节编的号，用于保证数据按序到达和重传确认。', aliases: ['Sequence Number'] },
  { term: '确认号', definition: '接收方告知发送方"我已收到此号之前的所有数据"。', aliases: ['ACK'] },
  { term: 'RTT', definition: '往返时间，数据包从发送到收到确认的时间延迟。' },

  // === 应用层 ===
  { term: 'DNS', definition: '域名系统，将域名（如baidu.com）解析为IP地址。' },
  { term: 'HTTP', definition: '超文本传输协议，Web浏览器与服务器之间的通信协议，默认端口80。' },
  { term: 'HTTPS', definition: '加密的HTTP，使用TLS/SSL加密，默认端口443。' },
  { term: 'DHCP', definition: '动态主机配置协议，自动为设备分配IP地址、网关、DNS等参数。' },
  { term: 'FTP', definition: '文件传输协议，用于上传下载文件，使用20（数据）和21（控制）端口。' },
  { term: 'SMTP', definition: '简单邮件传输协议，用于发送邮件，默认端口25。' },
  { term: 'POP3', definition: '邮局协议第3版，用于接收邮件，默认端口110。' },
  { term: 'IMAP', definition: '互联网邮件访问协议，比POP3更先进，支持邮件同步，默认端口143。' },
  { term: 'URL', definition: '统一资源定位符，网页地址，如https://www.example.com/path。' },
  { term: 'TTL', definition: 'DNS缓存中记录的存活时间，到期后需重新查询。' },

  // === 网络安全 ===
  { term: '防火墙', definition: '网络安全设备，根据规则过滤进出网络的数据包。', aliases: ['Firewall'] },
  { term: 'IDS', definition: '入侵检测系统，监控网络流量发现异常行为并告警。' },
  { term: 'IPS', definition: '入侵防御系统，在IDS基础上能主动阻断攻击流量。' },
  { term: 'VPN', definition: '虚拟专用网络，在公共网络上建立加密隧道实现安全远程访问。' },
  { term: 'IPSec', definition: 'IP安全协议族，提供网络层加密和认证，常用于VPN。' },
  { term: 'SSL/TLS', definition: '安全套接层/传输层安全协议，HTTPS的加密基础。' },
  { term: '对称加密', definition: '加密解密使用同一把密钥，速度快，如AES、DES。' },
  { term: '非对称加密', definition: '使用公钥加密、私钥解密（或反之），如RSA、ECC。' },
  { term: '哈希', definition: '单向函数，将任意长度数据映射为固定长度摘要，如SHA-256。', aliases: ['Hash'] },
  { term: '数字证书', definition: '由CA签发的电子文件，绑定公钥和身份信息，用于身份验证。' },
  { term: 'CA', definition: '证书颁发机构，负责签发和管理数字证书的可信第三方。' },
  { term: 'PKI', definition: '公钥基础设施，管理密钥和证书的完整体系。' },

  // === 无线与电信 ===
  { term: 'Wi-Fi', definition: '基于IEEE 802.11标准的无线局域网技术。' },
  { term: 'SSID', definition: '服务集标识符，Wi-Fi网络的名称，如"ChinaNet-xxxx"。' },
  { term: 'dBm', definition: '分贝毫瓦，无线信号强度的计量单位，值越大信号越强。' },
  { term: '5G', definition: '第五代移动通信技术，理论峰值速率20Gbps，延迟低于1ms。' },
  { term: 'LTE', definition: '长期演进，4G移动通信标准，下行峰值速率约100Mbps。' },
  { term: 'MIMO', definition: '多输入多输出，使用多根天线同时收发，提升无线容量和速率。' },
  { term: 'PON', definition: '无源光网络，光纤到户的接入技术，包括EPON和GPON。' },
  { term: 'DWDM', definition: '密集波分复用，在一根光纤上同时传输多个不同波长的光信号。' },

  // === 网络运维 ===
  { term: 'SNMP', definition: '简单网络管理协议，用于监控和管理网络设备的标准协议。' },
  { term: 'MIB', definition: '管理信息库，SNMP中定义设备可被管理的变量集合。' },
  { term: 'OID', definition: '对象标识符，SNMP中唯一标识MIB变量的数字路径。' },
  { term: 'QoS', definition: '服务质量，对不同类型网络流量进行优先级管理的机制。' },
  { term: 'NTP', definition: '网络时间协议，用于同步网络中各设备的时钟。' },
  { term: 'Syslog', definition: '系统日志协议，网络设备将日志信息发送到集中日志服务器。' },
];

// 快速查找表：term/alias → GlossaryTerm（不区分大小写）
const _lookup: Map<string, GlossaryTerm> | null = null;

export function getGlossaryLookup(): Map<string, GlossaryTerm> {
  if (_lookup) return _lookup;
  const map = new Map<string, GlossaryTerm>();
  for (const entry of glossary) {
    map.set(entry.term.toLowerCase(), entry);
    if (entry.aliases) {
      for (const alias of entry.aliases) {
        map.set(alias.toLowerCase(), entry);
      }
    }
  }
  return map;
}
