import { Module } from '@/types';

export const modules: Module[] = [
  {
    id: 'network-basics',
    title: '网络基础',
    description: '计算机网络入门，了解网络的基本概念和模型',
    icon: '🌐',
    topics: [
      {
        id: 'topic-01',
        moduleId: 'network-basics',
        title: '计算机网络概述',
        description: '网络的定义、功能、分类和发展历史',
        content: `# 计算机网络概述

## 什么是计算机网络

计算机网络是将**多台计算机**通过**通信设备**和**传输介质**连接起来，实现**资源共享**和**信息传递**的系统。

### 核心功能

| 功能 | 说明 | 举例 |
|------|------|------|
| 资源共享 | 共享硬件、软件、数据 | 共享打印机、文件服务器 |
| 数据通信 | 计算机之间传递信息 | 发邮件、发微信 |
| 分布式处理 | 多台计算机协同工作 | 云计算、大数据处理 |
| 提高可靠性 | 冗余备份 | 双机热备 |

### 生活类比

把计算机网络想象成**邮政系统**：
- 计算机 = 收发信件的人
- 路由器 = 邮局
- 传输介质 = 公路/铁路
- 数据 = 信件

## 网络的分类

### 按覆盖范围分类

| 类型 | 全称 | 覆盖范围 | 典型应用 |
|------|------|----------|----------|
| **LAN** | Local Area Network | 几百米到几公里 | 家庭网络、办公室网络 |
| **MAN** | Metropolitan Area Network | 一个城市 | 城域网、校园网 |
| **WAN** | Wide Area Network | 跨城市/国家 | 互联网、企业专网 |

### 形象理解

- **LAN（局域网）**：你家里的网络，路由器连着手机、电脑、电视
- **MAN（城域网）**：整个城市的网络，比如一个大学的多个校区互联
- **WAN（广域网）**：跨国公司的网络，或者就是整个互联网

## 网络发展历史

| 阶段 | 时间 | 特点 |
|------|------|------|
| 第一代 | 1960s | 以主机为中心，终端连接主机 |
| 第二代 | 1970s | 分组交换，ARPANET诞生 |
| 第三代 | 1980s | OSI标准，TCP/IP成型 |
| 第四代 | 1990s至今 | 互联网爆发，光纤、5G |

### 关键里程碑

- **1969年**：ARPANET诞生（互联网前身），最初只有4个节点
- **1983年**：TCP/IP成为ARPANET标准协议（互联网生日）
- **1991年**：万维网（WWW）发明
- **1995年**：互联网商业化
- **2020s**：5G、物联网、云计算普及

## 互联网基本架构

\`\`\`
┌─────────────────────────────────────────┐
│           终端设备（手机、电脑）          │
├─────────────────────────────────────────┤
│           接入网（光纤、4G/5G）          │
├─────────────────────────────────────────┤
│           核心网（骨干路由器）            │
├─────────────────────────────────────────┤
│           数据中心（服务器集群）          │
└─────────────────────────────────────────┘
\`\`\`

### 关键设备

| 设备 | 功能 | 工作层次 |
|------|------|----------|
| 集线器(Hub) | 信号放大和转发 | 物理层 |
| 交换机(Switch) | 根据MAC地址转发数据 | 数据链路层 |
| 路由器(Router) | 根据IP地址转发数据 | 网络层 |
| 防火墙(Firewall) | 网络安全防护 | 多层 |

### 数据传输过程

你在浏览器输入 www.baidu.com 后发生了什么：

1. **DNS解析**：把域名变成IP地址（像查电话簿）
2. **建立连接**：和百度服务器建立TCP连接（像打电话先拨号）
3. **发送请求**：发一个HTTP请求（说"给我首页"）
4. **服务器响应**：百度返回网页内容
5. **渲染页面**：浏览器显示网页`,
        quizzes: [
          {
            id: 'quiz-01-01',
            type: 'choice',
            question: '以下哪个是局域网的典型覆盖范围？',
            options: ['一个国家', '一个城市', '一栋办公楼', '全球'],
            answer: 'C',
            explanation: '局域网（LAN）覆盖范围通常在几百米到几公里，如一栋办公楼或一个家庭。'
          },
          {
            id: 'quiz-01-02',
            type: 'choice',
            question: '互联网的前身是哪个网络？',
            options: ['LAN', 'ARPANET', 'Ethernet', 'Token Ring'],
            answer: 'B',
            explanation: 'ARPANET是1969年诞生的，是互联网的前身。'
          },
          {
            id: 'quiz-01-03',
            type: 'choice',
            question: '以下哪个设备工作在网络层？',
            options: ['集线器', '交换机', '路由器', '网卡'],
            answer: 'C',
            explanation: '路由器根据IP地址转发数据，工作在网络层（第3层）。'
          },
          {
            id: 'quiz-01-04',
            type: 'fill',
            question: '计算机网络的核心功能是______和______。',
            answer: ['资源共享', '数据通信'],
            explanation: '计算机网络的两大核心功能是资源共享和数据通信。'
          },
          {
            id: 'quiz-01-05',
            type: 'short-answer',
            question: '用你自己的话解释，为什么需要计算机网络？',
            answer: '计算机网络让多台计算机可以共享资源（如打印机、文件）和传递信息（如邮件、微信），提高了效率和便利性。',
            explanation: '开放性问题，核心是理解资源共享和数据通信的价值。'
          }
        ],
        references: [
          '《图解TCP/IP》第1章',
          '《网络是怎样连接的》前言',
          'RFC 1122 - Requirements for Internet Hosts'
        ]
      },
      {
        id: 'topic-02',
        moduleId: 'network-basics',
        title: 'OSI七层模型与TCP/IP四层模型',
        description: '理解网络分层架构，掌握两种模型的对比',
        content: `# OSI七层模型与TCP/IP四层模型

## 为什么需要分层？

想象你要寄一个包裹：
1. 你写好内容（应用层）
2. 打包封装（表示层、会话层）
3. 写地址、贴邮票（传输层、网络层）
4. 交给快递公司运输（数据链路层、物理层）

**分层的好处**：每层只管自己的事，层与层之间通过接口通信。

## OSI七层模型

| 层号 | 层名 | 功能 | 协议举例 |
|------|------|------|----------|
| 7 | 应用层 | 用户接口 | HTTP, FTP, SMTP |
| 6 | 表示层 | 数据格式转换 | JPEG, ASCII, SSL |
| 5 | 会话层 | 建立/管理会话 | NetBIOS, RPC |
| 4 | 传输层 | 端到端可靠传输 | TCP, UDP |
| 3 | 网络层 | 路由和寻址 | IP, ICMP, ARP |
| 2 | 数据链路层 | 帧传输 | Ethernet, PPP |
| 1 | 物理层 | 比特传输 | 光纤、双绞线 |

### 助记口诀

**"应表会传网数物"** 或 **"All People Seem To Need Data Processing"**

## TCP/IP四层模型

| 层号 | 层名 | 对应OSI | 协议举例 |
|------|------|---------|----------|
| 4 | 应用层 | 应用层+表示层+会话层 | HTTP, DNS, FTP |
| 3 | 传输层 | 传输层 | TCP, UDP |
| 2 | 网际层 | 网络层 | IP, ICMP |
| 1 | 网络接口层 | 数据链路层+物理层 | Ethernet, Wi-Fi |

## 两种模型对比

| 对比项 | OSI模型 | TCP/IP模型 |
|--------|---------|------------|
| 层数 | 7层 | 4层 |
| 是否实际使用 | 教学参考 | 实际标准 |
| 设计理念 | 先有标准后有实现 | 先有实现后有标准 |
| 通用性 | 理论完善 | 实用性强 |

## 数据封装过程

\`\`\`
应用层数据
    ↓ + TCP头部
传输层段（Segment）
    ↓ + IP头部
网络层包（Packet）
    ↓ + 帧头帧尾
数据链路层帧（Frame）
    ↓
物理层比特流（Bits）
\`\`\`

每一层都"包装"一次，像俄罗斯套娃一样。`,
        quizzes: [
          {
            id: 'quiz-02-01',
            type: 'choice',
            question: 'OSI模型共有几层？',
            options: ['4层', '5层', '6层', '7层'],
            answer: 'D',
            explanation: 'OSI模型有7层：应用层、表示层、会话层、传输层、网络层、数据链路层、物理层。'
          },
          {
            id: 'quiz-02-02',
            type: 'choice',
            question: 'HTTP协议工作在OSI模型的哪一层？',
            options: ['传输层', '网络层', '应用层', '数据链路层'],
            answer: 'C',
            explanation: 'HTTP是应用层协议，用于Web浏览器和服务器之间的通信。'
          },
          {
            id: 'quiz-02-03',
            type: 'fill',
            question: 'TCP/IP模型分为4层：应用层、______、网际层和网络接口层。',
            answer: '传输层',
            explanation: 'TCP/IP四层模型：应用层、传输层、网际层、网络接口层。'
          },
          {
            id: 'quiz-02-04',
            type: 'choice',
            question: '数据封装时，TCP头部加在哪一层？',
            options: ['应用层', '传输层', '网络层', '数据链路层'],
            answer: 'B',
            explanation: 'TCP头部在传输层添加，形成Segment（段）。'
          }
        ],
        references: [
          '《图解TCP/IP》第2章',
          '《计算机网络：自顶向下方法》第1章',
          'ISO/IEC 7498-1 - OSI Reference Model'
        ]
      },
      {
        id: 'topic-03',
        moduleId: 'network-basics',
        title: '数据封装与解封装',
        description: '理解数据在网络中如何传输',
        content: `# 数据封装与解封装

## 什么是封装？

封装就是在数据外面"打包"，每一层都加上自己的头部（有时还有尾部）。

### 生活类比

寄快递的过程：
1. 你写信（应用层数据）
2. 装进信封，写上收件人（传输层加TCP头）
3. 装进快递箱，写上地址（网络层加IP头）
4. 快递公司贴面单（数据链路层加帧头帧尾）
5. 卡车运输（物理层比特流）

## 封装过程详解

\`\`\`
[应用层] 数据 (Data)
         ↓
[传输层] [TCP头] + 数据 = 段 (Segment)
         ↓
[网络层] [IP头] + 段 = 包 (Packet)
         ↓
[数据链路层] [帧头] + 包 + [帧尾] = 帧 (Frame)
         ↓
[物理层] 01010110... (比特流)
\`\`\`

## 各层的PDU

| 层 | PDU名称 | 中文 | 包含内容 |
|----|---------|------|----------|
| 应用层 | Data | 数据 | 应用数据 |
| 传输层 | Segment | 段 | TCP/UDP头 + 数据 |
| 网络层 | Packet | 包 | IP头 + 段 |
| 数据链路层 | Frame | 帧 | 帧头 + 包 + 帧尾 |
| 物理层 | Bits | 比特 | 0和1 |

## 解封装过程

接收方执行相反的过程：
1. 物理层接收比特流
2. 数据链路层去掉帧头帧尾，取出包
3. 网络层去掉IP头，取出段
4. 传输层去掉TCP头，取出数据
5. 应用层使用数据

**每层只看自己该看的头部，其他层的内容视为"数据"。**

## 关键概念

### 协议数据单元（PDU）
每一层传输的数据单位叫PDU（Protocol Data Unit）。

### 头部信息的作用
- **TCP头部**：端口号、序列号、确认号（确保可靠传输）
- **IP头部**：源IP、目的IP（路由寻址）
- **帧头**：源MAC、目的MAC（本地传输）`,
        quizzes: [
          {
            id: 'quiz-03-01',
            type: 'choice',
            question: '传输层的PDU叫什么？',
            options: ['Frame', 'Packet', 'Segment', 'Bits'],
            answer: 'C',
            explanation: '传输层的PDU叫Segment（段），包含TCP/UDP头部和数据。'
          },
          {
            id: 'quiz-03-02',
            type: 'choice',
            question: 'IP地址信息在哪一层被添加？',
            options: ['应用层', '传输层', '网络层', '数据链路层'],
            answer: 'C',
            explanation: 'IP地址在网络层的IP头部中被添加。'
          },
          {
            id: 'quiz-03-03',
            type: 'fill',
            question: '数据链路层的PDU叫______，包含帧头、数据和帧尾。',
            answer: '帧（Frame）',
            explanation: '数据链路层的PDU是帧（Frame）。'
          }
        ],
        references: [
          '《图解TCP/IP》第2章',
          '《TCP/IP详解 卷1》第1-2章'
        ]
      },
      {
        id: 'topic-04',
        moduleId: 'network-basics',
        title: '网络拓扑结构',
        description: '了解常见的网络拓扑及其优缺点',
        content: `# 网络拓扑结构

## 什么是拓扑？

拓扑是指网络中设备的**物理或逻辑布局方式**。

## 常见拓扑类型

### 1. 星型拓扑（Star）

\`\`\`
    [PC1]
      |
[PC2]—[交换机]—[PC3]
      |
    [PC4]
\`\`\`

**特点**：
- 所有设备连接到中心节点（交换机/集线器）
- 优点：易于管理、故障隔离好、易于扩展
- 缺点：中心节点故障则全网瘫痪
- **应用**：最常见的家庭和办公室网络

### 2. 总线型拓扑（Bus）

\`\`\`
[PC1]——[PC2]——[PC3]——[PC4]
\`\`\`

**特点**：
- 所有设备共享一条总线
- 优点：布线简单、成本低
- 缺点：故障难排查、总线故障全网瘫痪
- **应用**：早期以太网，现已淘汰

### 3. 环型拓扑（Ring）

\`\`\`
[PC1] → [PC2]
  ↑       ↓
[PC4] ← [PC3]
\`\`\`

**特点**：
- 设备首尾相连形成环
- 优点：结构简单、无冲突
- 缺点：单点故障影响全网
- **应用**：令牌环网（已淘汰）

### 4. 网状拓扑（Mesh）

\`\`\`
[PC1]——[PC2]
  |  \\  |
  |   \\ |
[PC3]——[PC4]
\`\`\`

**特点**：
- 设备之间有多条路径
- 优点：可靠性最高、有冗余
- 缺点：成本高、布线复杂
- **应用**：互联网骨干网、军事网络

## 拓扑对比

| 拓扑 | 可靠性 | 成本 | 扩展性 | 典型应用 |
|------|--------|------|--------|----------|
| 星型 | 中 | 中 | 好 | 家庭/办公网络 |
| 总线型 | 低 | 低 | 差 | 已淘汰 |
| 环型 | 中 | 中 | 中 | 已淘汰 |
| 网状 | 高 | 高 | 好 | 互联网骨干 |

## 实际应用

现代网络通常是**混合拓扑**：
- 家庭：星型（路由器为中心）
- 办公楼：树型（核心交换机→接入交换机→终端）
- 互联网：网状（多个核心节点互联）`,
        quizzes: [
          {
            id: 'quiz-04-01',
            type: 'choice',
            question: '以下哪种拓扑结构可靠性最高？',
            options: ['星型', '总线型', '环型', '网状'],
            answer: 'D',
            explanation: '网状拓扑有多个冗余路径，可靠性最高。'
          },
          {
            id: 'quiz-04-02',
            type: 'choice',
            question: '家庭网络通常使用哪种拓扑？',
            options: ['星型', '总线型', '环型', '网状'],
            answer: 'A',
            explanation: '家庭网络通常使用星型拓扑，以路由器为中心。'
          },
          {
            id: 'quiz-04-03',
            type: 'fill',
            question: '星型拓扑的中心节点通常是______或______。',
            answer: ['交换机', '集线器'],
            explanation: '星型拓扑的中心节点是交换机或集线器。'
          }
        ],
        references: [
          '《图解TCP/IP》第1章',
          '《计算机网络》谢希仁 第2章'
        ]
      }
    ]
  },
  {
    id: 'physical-datalink',
    title: '物理层与数据链路层',
    description: '传输介质、以太网、ARP、VLAN',
    icon: '🔌',
    topics: []
  },
  {
    id: 'network-layer',
    title: '网络层',
    description: 'IP地址、子网划分、路由基础',
    icon: '📡',
    topics: []
  },
  {
    id: 'transport-layer',
    title: '传输层',
    description: 'TCP/UDP协议、三次握手、拥塞控制',
    icon: '🚚',
    topics: []
  },
  {
    id: 'application-layer',
    title: '应用层',
    description: 'DNS、HTTP、DHCP等应用协议',
    icon: '📱',
    topics: []
  },
  {
    id: 'routing-switching',
    title: '路由与交换',
    description: 'OSPF、BGP、交换机路由器配置',
    icon: '🔄',
    topics: []
  },
  {
    id: 'network-security',
    title: '网络安全',
    description: '防火墙、ACL、VPN',
    icon: '🔒',
    topics: []
  },
  {
    id: 'wireless',
    title: '无线网络',
    description: 'Wi-Fi标准、无线安全',
    icon: '📶',
    topics: []
  },
  {
    id: 'telecom',
    title: '通信工程基础',
    description: '信号、调制、4G/5G、光纤',
    icon: '📞',
    topics: []
  },
  {
    id: 'network-ops',
    title: '网络管理与运维',
    description: 'SNMP、故障排查、Wireshark',
    icon: '🛠️',
    topics: []
  }
];

// 获取所有课题
export function getAllTopics() {
  return modules.flatMap(m => m.topics);
}

// 根据ID获取模块
export function getModuleById(id: string) {
  return modules.find(m => m.id === id);
}

// 根据ID获取课题
export function getTopicById(id: string) {
  for (const m of modules) {
    const topic = m.topics.find(t => t.id === id);
    if (topic) return topic;
  }
  return null;
}
