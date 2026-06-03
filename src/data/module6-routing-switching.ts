import { Module } from '@/types';

export const routingSwitching: Module = {
  id: 'routing-switching',
  title: '路由交换',
  description: '路由与交换技术，掌握数据包的转发逻辑',
  icon: '🔀',
  topics: [
    {
      id: 'topic-06-01',
      moduleId: 'routing-switching',
      title: '路由基础',
      description: '路由器的工作原理、路由表与静态路由',
      content: `# 路由基础

## 开篇：数据包是怎么找到路的？

你寄快递时，快递员会根据地址一层一层转发：先到市分拣中心，再到区网点，最后送到你家。网络中的数据包也是这样——它从你的电脑出发，经过一个又一个"中转站"，最终到达目标服务器。

这些"中转站"就是**路由器**。而路由器决定"往哪转发"的依据，就是**路由表**。

这一课，我们来搞清楚路由器到底是怎么工作的。

<Glossary terms="%5B%7B%22term%22%3A%22%E8%B7%AF%E7%94%B1%E5%99%A8%22%2C%22english%22%3A%22Router%22%2C%22definition%22%3A%22%E5%B7%A5%E4%BD%9C%E5%9C%A8%E7%BD%91%E7%BB%9C%E5%B1%82%E7%9A%84%E8%AE%BE%E5%A4%87%EF%BC%8C%E6%A0%B9%E6%8D%AEIP%E5%9C%B0%E5%9D%80%E8%BD%AC%E5%8F%91%E6%95%B0%E6%8D%AE%E5%8C%85%EF%BC%8C%E8%BF%9E%E6%8E%A5%E4%B8%8D%E5%90%8C%E7%BD%91%E7%BB%9C%22%7D%2C%7B%22term%22%3A%22%E8%B7%AF%E7%94%B1%E8%A1%A8%22%2C%22english%22%3A%22Routing%20Table%22%2C%22definition%22%3A%22%E8%B7%AF%E7%94%B1%E5%99%A8%E4%B8%AD%E7%9A%84%E2%80%9C%E5%9C%B0%E5%9B%BE%E2%80%9D%EF%BC%8C%E8%AE%B0%E5%BD%95%E4%BA%86%E5%88%B0%E8%BE%BE%E5%90%84%E4%B8%AA%E7%BD%91%E7%BB%9C%E7%9A%84%E8%B7%AF%E5%BE%84%E4%BF%A1%E6%81%AF%22%7D%2C%7B%22term%22%3A%22%E9%9D%99%E6%80%81%E8%B7%AF%E7%94%B1%22%2C%22english%22%3A%22Static%20Route%22%2C%22definition%22%3A%22%E7%AE%A1%E7%90%86%E5%91%98%E6%89%8B%E5%8A%A8%E9%85%8D%E7%BD%AE%E7%9A%84%E8%B7%AF%E7%94%B1%E6%9D%A1%E7%9B%AE%EF%BC%8C%E9%80%82%E5%90%88%E5%B0%8F%E5%9E%8B%E7%BD%91%E7%BB%9C%22%7D%2C%7B%22term%22%3A%22%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1%22%2C%22english%22%3A%22Dynamic%20Route%22%2C%22definition%22%3A%22%E8%B7%AF%E7%94%B1%E5%99%A8%E9%80%9A%E8%BF%87%E5%8D%8F%E8%AE%AE%E8%87%AA%E5%8A%A8%E5%AD%A6%E4%B9%A0%E7%9A%84%E8%B7%AF%E7%94%B1%EF%BC%8C%E9%80%82%E5%90%88%E5%A4%A7%E5%9E%8B%E7%BD%91%E7%BB%9C%22%7D%2C%7B%22term%22%3A%22%E6%9C%80%E9%95%BF%E5%89%8D%E7%BC%80%E5%8C%B9%E9%85%8D%22%2C%22english%22%3A%22Longest%20Prefix%20Match%22%2C%22definition%22%3A%22%E8%B7%AF%E7%94%B1%E5%99%A8%E9%80%89%E6%8B%A9%E8%B7%AF%E7%94%B1%E6%97%B6%EF%BC%8C%E4%BC%98%E5%85%88%E5%8C%B9%E9%85%8D%E6%9B%B4%E7%B2%BE%E7%A1%AE%E7%9A%84%E8%B7%AF%E7%94%B1%E6%9D%A1%E7%9B%AE%22%7D%5D" />

## 路由器是什么？

想象你站在十字路口，面前有五条路。你要去"中关村"，但不知道走哪条。这时候你需要一块路牌，告诉你"中关村→往北走"。

路由器就是网络世界的"十字路口+路牌"。它连接多个网络，根据路由表告诉数据包"该往哪走"。

**路由器的核心功能：**
- **连接不同网络**：你的家庭局域网和互联网是两个不同的网络，路由器把它们连起来
- **路径选择**：当有多条路可走时，选择最优路径
- **数据转发**：把数据包从一个接口转到另一个接口

## 路由表：路由器的"地图"

路由表是路由器的核心数据结构。它就像一张地图，记录了"去某个网络该怎么走"。

每条路由表项包含以下信息：

| 字段 | 含义 | 类比 |
|------|------|------|
| 目的网络 | 要去的地方 | "中关村" |
| 子网掩码 | 网络范围 | "海淀区范围" |
| 下一站 | 下一个路由器 | "先到海淀黄庄" |
| 接口 | 从哪个口出去 | "走北门" |
| 度量值 | 路径 cost | "距离 5 公里" |

**查看路由表的命令：**
\`\`\`
# Windows
route print

# Linux/Mac
ip route show
# 或
route -n
\`\`\`

## 静态路由 vs 动态路由

### 静态路由：手动配置

就像你手绘一张地图，告诉路由器"去 A 网络走接口 1，去 B 网络走接口 2"。

**优点：**
- 配置简单，易于理解
- 不消耗带宽（不需要交换路由信息）
- 安全可控

**缺点：**
- 网络变化时需要手动修改
- 适合小型网络，大型网络配置量巨大

**配置示例（Cisco）：**
\`\`\`
Router(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.1
# 去 192.168.2.0/24 网络，下一跳是 10.0.0.1
\`\`\`

### 动态路由：自动学习

路由器之间互相"聊天"，告诉对方"我知道怎么去哪些网络"。就像一群人互相指路："去中关村？你先往北走，到海淀黄庄再问。"

**优点：**
- 自动适应网络变化
- 适合大型网络
- 有冗余路径，某条路断了自动绕行

**缺点：**
- 消耗带宽和 CPU
- 配置相对复杂

## 最长前缀匹配原则

当路由表中有多条路由都能匹配目的地址时，路由器怎么选？

**规则：选择最精确的那条。**

举个例子：
\`\`\`
路由1: 192.168.0.0/16  → 下一跳 10.0.0.1
路由2: 192.168.1.0/24  → 下一跳 10.0.0.2
\`\`\`

数据包要发往 \`192.168.1.100\`：

- 路由1 匹配：\`192.168.0.0/16\` 包含 \`192.168.1.100\` ✓
- 路由2 匹配：\`192.168.1.0/24\` 包含 \`192.168.1.100\` ✓

两条都匹配，但路由2 的前缀长度是 24，比路由1 的 16 更长，所以**选路由2**。

> 类比：你说"我要去北京海淀区中关村大街1号"，导航会精确到街道，而不是只把你送到北京就完事。

## 路由器的工作流程

当一个数据包到达路由器时：

1. **拆包**：取出数据链路层的帧头，看到目标 IP 地址
2. **查表**：在路由表中查找匹配的路由条目
3. **选择**：如果有多个匹配，用最长前缀匹配选最优
4. **转发**：把数据包从对应的接口发出去
5. **封装**：重新封装新的帧头（新的源/目标 MAC 地址）

> 注意：路由器转发时会**改变 MAC 地址**，但**不改变 IP 地址**。

## 本课小结

- **路由器**是连接不同网络的设备，工作在网络层
- **路由表**是路由器的"地图"，记录了到达各个网络的路径
- **静态路由**手动配置，适合小型网络；**动态路由**自动学习，适合大型网络
- **最长前缀匹配**是路由器选择路由的核心规则
- 转发时改变 MAC 地址，不改变 IP 地址`,
      quizzes: [
        {
          id: 'quiz-06-01-01',
          type: 'choice',
          question: '路由器工作在 OSI 模型的哪一层？',
          options: ['物理层', '数据链路层', '网络层', '传输层'],
          answer: 'C',
          explanation: '路由器根据 IP 地址转发数据包，工作在网络层（第 3 层）。'
        },
        {
          id: 'quiz-06-01-02',
          type: 'choice',
          question: '以下哪项不是路由表的组成部分？',
          options: ['目的网络', '子网掩码', 'MAC 地址', '下一跳'],
          answer: 'C',
          explanation: '路由表包含目的网络、子网掩码、下一跳、接口、度量值等，但不包含 MAC 地址。MAC 地址是数据链路层的概念。'
        },
        {
          id: 'quiz-06-01-03',
          type: 'choice',
          question: '路由表中有两条路由：10.0.0.0/8 和 10.1.0.0/16，数据包发往 10.1.5.5，会选择哪条？',
          options: ['10.0.0.0/8', '10.1.0.0/16', '随机选择', '丢弃'],
          answer: 'B',
          explanation: '根据最长前缀匹配原则，10.1.0.0/16 的前缀更长（16 > 8），更精确，所以选择这条。'
        },
        {
          id: 'quiz-06-01-04',
          type: 'fill',
          question: '路由器转发数据包时，会修改______地址，但不修改______地址。',
          answer: ['MAC', 'IP'],
          explanation: '路由器在转发时会重新封装帧头（改变 MAC 地址），但 IP 地址保持不变。'
        }
      ],
      references: [
        'RFC 1812 - Requirements for IP Version 4 Routers',
        'Cisco CCNA Routing and Switching'
      ]
    },
    {
      id: 'topic-06-02',
      moduleId: 'routing-switching',
      title: '路由协议',
      description: 'RIP、OSPF、BGP 等动态路由协议',
      content: `# 路由协议

## 开篇：路由器之间是怎么"聊天"的？

上一课我们知道了路由器靠路由表转发数据包。但大型网络有成百上千个路由器，手动配置路由表根本不现实。

于是人们发明了**路由协议**——让路由器之间自动交换信息，互相学习对方的路由。就像一群人聚在一起，各自分享自己知道的路怎么走。

这一课，我们来认识三种最重要的路由协议：RIP、OSPF 和 BGP。

<Glossary terms="%5B%7B%22term%22%3A%22RIP%22%2C%22english%22%3A%22Routing%20Information%20Protocol%22%2C%22definition%22%3A%22%E8%B7%AF%E7%94%B1%E4%BF%A1%E6%81%AF%E5%8D%8F%E8%AE%AE%EF%BC%8C%E5%9F%BA%E4%BA%8E%E8%B7%B3%E6%95%B0%E7%9A%84%E8%B7%9D%E7%A6%BB%E7%9F%A2%E9%87%8F%E5%8D%8F%E8%AE%AE%EF%BC%8C%E6%9C%80%E5%A4%A715%E8%B7%B3%22%7D%2C%7B%22term%22%3A%22OSPF%22%2C%22english%22%3A%22Open%20Shortest%20Path%20First%22%2C%22definition%22%3A%22%E5%BC%80%E6%94%BE%E6%9C%80%E7%9F%AD%E8%B7%AF%E5%BE%84%E4%BC%98%E5%85%88%E5%8D%8F%E8%AE%AE%EF%BC%8C%E5%9F%BA%E4%BA%8E%E9%93%BE%E8%B7%AF%E7%8A%B6%E6%80%81%E7%9A%84IGP%E5%8D%8F%E8%AE%AE%22%7D%2C%7B%22term%22%3A%22BGP%22%2C%22english%22%3A%22Border%20Gateway%20Protocol%22%2C%22definition%22%3A%22%E8%BE%B9%E7%95%8C%E7%BD%91%E5%85%B3%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%BA%92%E8%81%94%E7%BD%91%E7%9A%84%E6%A0%B8%E5%BF%83%E8%B7%AF%E7%94%B1%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%AE%A1%E7%90%86AS%E4%B9%8B%E9%97%B4%E7%9A%84%E8%B7%AF%E7%94%B1%22%7D%2C%7B%22term%22%3A%22AS%22%2C%22english%22%3A%22Autonomous%20System%22%2C%22definition%22%3A%22%E8%87%AA%E6%B2%BB%E7%B3%BB%E7%BB%9F%EF%BC%8C%E7%94%B1%E5%8D%95%E4%B8%80%E7%BB%84%E7%BB%87%E7%AE%A1%E7%90%86%E7%9A%84%E7%BD%91%E7%BB%9C%EF%BC%8C%E5%A6%82%E4%B8%80%E5%AE%B6ISP%22%7D%2C%7B%22term%22%3A%22IGP%22%2C%22english%22%3A%22Interior%20Gateway%20Protocol%22%2C%22definition%22%3A%22%E5%86%85%E9%83%A8%E7%BD%91%E5%85%B3%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%94%A8%E4%BA%8EAS%E5%86%85%E9%83%A8%E7%9A%84%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%A6%82RIP%E3%80%81OSPF%22%7D%2C%7B%22term%22%3A%22EGP%22%2C%22english%22%3A%22Exterior%20Gateway%20Protocol%22%2C%22definition%22%3A%22%E5%A4%96%E9%83%A8%E7%BD%91%E5%85%B3%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%94%A8%E4%BA%8EAS%E4%B9%8B%E9%97%B4%E7%9A%84%E8%B7%AF%E7%94%B1%EF%BC%8C%E5%A6%82BGP%22%7D%5D" />

## 路由协议的分类

在讲具体协议之前，先搞清楚两个概念：

### IGP vs EGP

- **IGP（内部网关协议）**：在一个组织内部使用的路由协议，如 RIP、OSPF
- **EGP（外部网关协议）**：在不同组织之间使用的路由协议，如 BGP

类比：IGP 就像公司内部的沟通（用企业微信），EGP 就像和外部客户沟通（用邮件）。

### 距离矢量 vs 链路状态

- **距离矢量**：每个路由器只知道"去某个网络有多远、往哪走"，像路牌只写"中关村 5km →"
- **链路状态**：每个路由器知道整个网络的拓扑图，像手握完整地图

## RIP：最简单的路由协议

**RIP（Routing Information Protocol）** 是最早出现的路由协议，原理非常简单。

### 工作原理

1. 每隔 30 秒，路由器向邻居广播自己的路由表
2. 收到邻居的路由表后，更新自己的路由表
3. 用**跳数**（经过的路由器数量）作为度量值
4. 最大跳数为 15，16 表示不可达

### RIP 的问题

**"好消息传播快，坏消息传播慢"——计数到无穷问题**

假设网络 A→B→C，B 到 A 的距离是 1 跳。如果 A 断了：
1. B 发现 A 不可达，距离变成 16
2. 但 C 还没收到更新，它告诉 B："我能到 A，距离是 2"
3. B 以为通过 C 能到 A，把距离改成 3
4. 然后 B 告诉 C："我能到 A，距离是 3"
5. C 又把距离改成 4……
6. 直到距离涨到 16 才停止

这就是"计数到无穷"问题。RIP 用以下方法解决：
- **水平分割**：不要把从邻居学到的路由再告诉那个邻居
- **毒性逆转**：告诉邻居"我从你那学到的路由已经不可达了"
- **触发更新**：网络变化时立即通知，不等 30 秒

### RIP 的局限

- 最大 15 跳，只适合小型网络
- 收敛速度慢（网络变化后需要很长时间才能稳定）
- 每 30 秒广播整个路由表，消耗带宽

## OSPF：企业网络的首选

**OSPF（Open Shortest Path First）** 是目前使用最广泛的内部路由协议。

### 与 RIP 的区别

| 特性 | RIP | OSPF |
|------|-----|------|
| 算法 | 距离矢量 | 链路状态 |
| 度量值 | 跳数 | 带宽（cost） |
| 收敛速度 | 慢 | 快 |
| 网络规模 | 小型 | 大型 |
| 更新方式 | 定期广播 | 触发更新 |

### OSPF 的工作原理

1. **建立邻居关系**：路由器发现直连的邻居
2. **交换 LSA**：链路状态通告，描述自己连接了哪些网络
3. **构建 LSDB**：链路状态数据库，存储整个网络的拓扑
4. **运行 SPF 算法**：以自己为根，计算到每个网络的最短路径
5. **生成路由表**：把最短路径写入路由表

> 类比：每个路由器都拿到了一张完整的网络地图，然后用 GPS 算出最优路线。

### OSPF 区域

大型网络中，如果所有路由器都在一个区域，LSDB 会非常大，SPF 计算也很耗时。OSPF 引入了**区域**的概念：

- **Area 0**：骨干区域，所有其他区域必须连接到 Area 0
- **普通区域**：连接到 Area 0 的非骨干区域

好处：
- 减少 LSA 泛洪范围
- 减小 LSDB 规模
- 加快 SPF 计算

## BGP：互联网的路由协议

**BGP（Border Gateway Protocol）** 是互联网的核心路由协议。它管理的是**自治系统（AS）之间**的路由。

### 什么是 AS？

**AS（Autonomous System）** 是由单一组织管理的网络。每个 AS 有一个唯一的编号（ASN）。

- 中国电信：AS4134
- 中国联通：AS4837
- 谷歌：AS15169

### BGP 的特点

- **路径矢量协议**：不仅知道下一跳，还知道完整的 AS 路径
- **基于策略的路由**：可以人为控制路由选择（比如"不走竞争对手的网络"）
- **TCP 连接**：BGP 邻居之间用 TCP 端口 179 通信
- **增量更新**：只发送变化的路由，不广播整个路由表

### BGP 路径选择

当有多条到达同一目的地的路由时，BGP 按以下顺序选择：

1. **权重**（Weight）：本地优先级，越高越优先
2. **本地优先级**（Local Preference）：AS 内部优先级
3. **本地始发**：自己发布的路由优先
4. **AS 路径长度**：经过的 AS 越少越优先
5. **MED**：告诉邻居 AS 哪条路更优

## 协议对比

| 协议 | 类型 | 适用场景 | 度量值 | 收敛速度 |
|------|------|----------|--------|----------|
| RIP | 距离矢量 | 小型网络 | 跳数 | 慢 |
| OSPF | 链路状态 | 企业网络 | 带宽 | 快 |
| BGP | 路径矢量 | 互联网/AS间 | 策略 | 中 |

## 本课小结

- **RIP** 简单但有局限，最大 15 跳，适合小型网络
- **OSPF** 基于链路状态，收敛快，适合企业网络
- **BGP** 是互联网的核心，管理 AS 之间的路由
- 选择路由协议要根据网络规模和需求`,
      quizzes: [
        {
          id: 'quiz-06-02-01',
          type: 'choice',
          question: 'RIP 协议的最大跳数是多少？',
          options: ['10', '15', '16', '20'],
          answer: 'B',
          explanation: 'RIP 的最大跳数是 15，16 表示不可达。'
        },
        {
          id: 'quiz-06-02-02',
          type: 'choice',
          question: 'OSPF 使用什么作为度量值？',
          options: ['跳数', '延迟', '带宽（cost）', 'MTU'],
          answer: 'C',
          explanation: 'OSPF 使用带宽计算 cost 值作为度量值，带宽越高 cost 越低。'
        },
        {
          id: 'quiz-06-02-03',
          type: 'choice',
          question: '以下哪个协议用于 AS 之间的路由？',
          options: ['RIP', 'OSPF', 'BGP', 'EIGRP'],
          answer: 'C',
          explanation: 'BGP（边界网关协议）是用于 AS 之间的外部路由协议。'
        },
        {
          id: 'quiz-06-02-04',
          type: 'fill',
          question: 'OSPF 的骨干区域编号是______。',
          answer: '0',
          explanation: 'OSPF 的骨干区域是 Area 0，所有其他区域必须连接到 Area 0。'
        }
      ],
      references: [
        'RFC 2328 - OSPF Version 2',
        'RFC 4271 - A Border Gateway Protocol 4 (BGP-4)'
      ]
    },
    {
      id: 'topic-06-03',
      moduleId: 'routing-switching',
      title: '交换技术',
      description: '交换机工作原理、VLAN 与三层交换',
      content: `# 交换技术

## 开篇：交换机和路由器有什么区别？

你家有路由器，但公司机房里更多的是**交换机**。它们看起来都是"有很多网口的盒子"，但工作原理完全不同。

简单说：
- **路由器**：连接不同网络，根据 IP 地址转发（网络层）
- **交换机**：连接同一网络内的设备，根据 MAC 地址转发（数据链路层）

这一课，我们来搞清楚交换机是怎么工作的。

<Glossary terms="%5B%7B%22term%22%3A%22%E4%BA%A4%E6%8D%A2%E6%9C%BA%22%2C%22english%22%3A%22Switch%22%2C%22definition%22%3A%22%E5%B7%A5%E4%BD%9C%E5%9C%A8%E6%95%B0%E6%8D%AE%E9%93%BE%E8%B7%AF%E5%B1%82%E7%9A%84%E8%AE%BE%E5%A4%87%EF%BC%8C%E6%A0%B9%E6%8D%AEMAC%E5%9C%B0%E5%9D%80%E8%BD%AC%E5%8F%91%E6%95%B0%E6%8D%AE%E5%B8%A7%22%7D%2C%7B%22term%22%3A%22MAC%E5%9C%B0%E5%9D%80%E8%A1%A8%22%2C%22english%22%3A%22MAC%20Address%20Table%22%2C%22definition%22%3A%22%E4%BA%A4%E6%8D%A2%E6%9C%BA%E7%9A%84%E2%80%9C%E9%80%9A%E8%AE%AF%E5%BD%95%E2%80%9D%EF%BC%8C%E8%AE%B0%E5%BD%95MAC%E5%9C%B0%E5%9D%80%E4%B8%8E%E7%AB%AF%E5%8F%A3%E7%9A%84%E5%AF%B9%E5%BA%94%E5%85%B3%E7%B3%BB%22%7D%2C%7B%22term%22%3A%22VLAN%22%2C%22english%22%3A%22Virtual%20LAN%22%2C%22definition%22%3A%22%E8%99%9A%E6%8B%9F%E5%B1%80%E5%9F%9F%E7%BD%91%EF%BC%8C%E5%9C%A8%E4%B8%80%E4%B8%AA%E7%89%A9%E7%90%86%E4%BA%A4%E6%8D%A2%E6%9C%BA%E4%B8%8A%E5%88%92%E5%88%86%E5%A4%9A%E4%B8%AA%E9%80%BB%E8%BE%91%E7%BD%91%E7%BB%9C%22%7D%2C%7B%22term%22%3A%22Trunk%22%2C%22english%22%3A%22Trunk%20Link%22%2C%22definition%22%3A%22%E5%B9%B2%E7%BA%BF%E9%93%BE%E8%B7%AF%EF%BC%8C%E5%9C%A8%E4%BA%A4%E6%8D%A2%E6%9C%BA%E4%B9%8B%E9%97%B4%E4%BC%A0%E8%BE%93%E5%A4%9AVLAN%E7%9A%84%E6%95%B0%E6%8D%AE%E5%B8%A7%22%7D%2C%7B%22term%22%3A%22%E4%B8%89%E5%B1%82%E4%BA%A4%E6%8D%A2%22%2C%22english%22%3A%22Layer%203%20Switching%22%2C%22definition%22%3A%22%E5%85%B7%E5%A4%87%E8%B7%AF%E7%94%B1%E5%8A%9F%E8%83%BD%E7%9A%84%E4%BA%A4%E6%8D%A2%E6%9C%BA%EF%BC%8C%E5%8F%AF%E4%BB%A5%E5%AE%9E%E7%8E%B0VLAN%E9%97%B4%E8%B7%AF%E7%94%B1%22%7D%5D" />

## 交换机的工作原理

### MAC 地址表学习

交换机有一个"通讯录"——**MAC 地址表**，记录了每个 MAC 地址对应哪个端口。

**学习过程：**

1. **初始状态**：MAC 地址表是空的
2. **收到帧**：设备 A 从端口 1 发送数据帧
3. **记录来源**：交换机记录"MAC-A 在端口 1"
4. **查目标**：查看目标 MAC 地址是否在表中
5. **转发或泛洪**：
   - 如果找到：只发到对应的端口
   - 如果没找到：向所有端口广播（泛洪）

**类比**：你第一次来公司，前台不认识你，会问所有人"这是谁的访客？"。下次再来，前台就直接带你去对应工位了。

### 三种转发方式

| 方式 | 说明 | 优缺点 |
|------|------|--------|
| 存储转发 | 收完整个帧再转发 | 可靠，但有延迟 |
| 直通转发 | 只看目标 MAC 就转发 | 快，但可能转发错误帧 |
| 无碎片转发 | 收到 64 字节再转发 | 折中方案 |

## VLAN：虚拟局域网

### 为什么需要 VLAN？

一个交换机连接了 100 台设备，它们都在同一个广播域。任何一台设备发广播帧，其他 99 台都能收到。这会带来：

- **广播风暴**：大量广播帧消耗带宽
- **安全问题**：任何设备都能监听广播
- **管理困难**：无法按部门隔离网络

### VLAN 的解决方案

VLAN 把一个物理交换机**逻辑上**划分成多个虚拟交换机：

\`\`\`
物理交换机
├── VLAN 10（财务部）：端口 1-10
├── VLAN 20（技术部）：端口 11-20
└── VLAN 30（市场部）：端口 21-30
\`\`\`

**效果：**
- VLAN 10 的设备只能和 VLAN 10 内的设备通信
- 不同 VLAN 之间默认不能通信
- 广播帧只在本 VLAN 内传播

### VLAN 配置（Cisco）

\`\`\`
# 创建 VLAN
Switch(config)# vlan 10
Switch(config-vlan)# name Finance

# 把端口加入 VLAN
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport access vlan 10
\`\`\`

## Trunk：交换机之间的 VLAN 通道

### 问题

两台交换机各有 VLAN 10 和 VLAN 20，它们之间怎么传输不同 VLAN 的数据？

如果给每个 VLAN 拉一根线，10 个 VLAN 就要 10 根线，太浪费了。

### 解决方案：Trunk 链路

Trunk 链路是一根线传输所有 VLAN 的数据。为了区分数据属于哪个 VLAN，在帧中添加 **VLAN 标签**。

**802.1Q 封装**：在以太网帧中插入 4 字节的 VLAN 标签：

\`\`\`
| 目标MAC | 源MAC | 802.1Q标签(4字节) | 类型 | 数据 | FCS |
\`\`\`

标签内容：
- **TPID**：固定值 0x8100，表示这是 802.1Q 帧
- **VLAN ID**：12 位，支持 1-4094 个 VLAN

### Trunk 配置

\`\`\`
Switch(config)# interface fa0/24
Switch(config-if)# switchport mode trunk
Switch(config-if)# switchport trunk allowed vlan 10,20
\`\`\`

## 三层交换：VLAN 间路由

### 问题

不同 VLAN 之间默认不能通信。如果财务部和技术部需要通信怎么办？

### 解决方案

**方案一：外部路由器**
- 每个 VLAN 连一个接口到路由器
- 缺点：路由器接口有限，VLAN 多了不够用

**方案二：单臂路由**
- 路由器用一个 Trunk 接口连接交换机
- 在路由器上创建子接口，每个子接口对应一个 VLAN
- 缺点：所有流量都经过路由器，容易成为瓶颈

**方案三：三层交换机**
- 交换机本身具备路由功能
- 在交换机上创建 SVI（交换虚拟接口）
- 速度快，因为是硬件转发

\`\`\`
# 三层交换机配置 SVI
Switch(config)# interface vlan 10
Switch(config-if)# ip address 192.168.10.1 255.255.255.0
Switch(config-if)# no shutdown

Switch(config)# interface vlan 20
Switch(config-if)# ip address 192.168.20.1 255.255.255.0
Switch(config-if)# no shutdown

# 开启路由功能
Switch(config)# ip routing
\`\`\`

## 本课小结

- **交换机**根据 MAC 地址转发，工作在数据链路层
- **MAC 地址表**通过学习帧的源地址自动建立
- **VLAN** 在物理交换机上划分逻辑网络，隔离广播域
- **Trunk** 用 802.1Q 封装在一根线上传输多个 VLAN 的数据
- **三层交换机**可以实现 VLAN 间路由，比路由器更快`,
      quizzes: [
        {
          id: 'quiz-06-03-01',
          type: 'choice',
          question: '交换机根据什么地址转发数据帧？',
          options: ['IP 地址', 'MAC 地址', '端口号', '域名'],
          answer: 'B',
          explanation: '交换机工作在数据链路层，根据 MAC 地址转发数据帧。'
        },
        {
          id: 'quiz-06-03-02',
          type: 'choice',
          question: 'VLAN 的主要作用是什么？',
          options: ['提高网速', '隔离广播域', '增加端口数', '减少成本'],
          answer: 'B',
          explanation: 'VLAN 的主要作用是隔离广播域，减少广播流量，提高安全性和管理效率。'
        },
        {
          id: 'quiz-06-03-03',
          type: 'choice',
          question: '802.1Q 标签中 VLAN ID 是多少位？',
          options: ['8 位', '12 位', '16 位', '32 位'],
          answer: 'B',
          explanation: '802.1Q 标签中的 VLAN ID 是 12 位，支持 1-4094 个 VLAN。'
        },
        {
          id: 'quiz-06-03-04',
          type: 'fill',
          question: '交换机收到未知目标 MAC 地址的帧时，会向______端口转发。',
          answer: ['所有'],
          explanation: '当 MAC 地址表中没有目标地址时，交换机会泛洪（向所有端口转发）。'
        }
      ],
      references: [
        'IEEE 802.1Q - Virtual Bridged Local Area Networks'
      ]
    },
    {
      id: 'topic-06-04',
      moduleId: 'routing-switching',
      title: '生成树协议',
      description: 'STP 防止环路、RSTP 快速收敛',
      content: `# 生成树协议

## 开篇：为什么需要生成树？

交换机之间为了冗余，通常会连接多条线路。但以太网有一个致命问题：**环路会导致广播风暴**。

想象你在一个房间里喊"谁是张三？"，如果有回声，你的声音会不断循环，越来越大。网络中的广播帧也是如此——在环路中不断循环，最终耗尽所有带宽。

**生成树协议（STP）** 就是为了解决这个问题：在有冗余的网络中，自动"切断"一些链路，消除环路。

<Glossary terms="%5B%7B%22term%22%3A%22STP%22%2C%22english%22%3A%22Spanning%20Tree%20Protocol%22%2C%22definition%22%3A%22%E7%94%9F%E6%88%90%E6%A0%91%E5%8D%8F%E8%AE%AE%EF%BC%8C%E9%80%9A%E8%BF%87%E7%A6%81%E7%94%A8%E5%86%97%E4%BD%99%E9%93%BE%E8%B7%AF%E6%B6%88%E9%99%A4%E4%BB%A5%E5%A4%AA%E7%BD%91%E7%8E%AF%E8%B7%AF%22%7D%2C%7B%22term%22%3A%22%E6%A0%B9%E6%A1%A5%22%2C%22english%22%3A%22Root%20Bridge%22%2C%22definition%22%3A%22STP%E7%BD%91%E7%BB%9C%E4%B8%AD%E7%9A%84%E2%80%9C%E4%B8%BB%E8%8A%82%E7%82%B9%E2%80%9D%EF%BC%8C%E6%89%80%E6%9C%89%E8%B7%AF%E5%BE%84%E9%83%BD%E4%BB%A5%E5%AE%83%E4%B8%BA%E5%8F%82%E8%80%83%E7%82%B9%22%7D%2C%7B%22term%22%3A%22RSTP%22%2C%22english%22%3A%22Rapid%20Spanning%20Tree%20Protocol%22%2C%22definition%22%3A%22%E5%BF%AB%E9%80%9F%E7%94%9F%E6%88%90%E6%A0%91%E5%8D%8F%E8%AE%AE%EF%BC%8CSTP%E7%9A%84%E5%8D%87%E7%BA%A7%E7%89%88%EF%BC%8C%E6%94%B6%E6%95%9B%E9%80%9F%E5%BA%A6%E6%9B%B4%E5%BF%AB%22%7D%2C%7B%22term%22%3A%22%E5%B9%BF%E6%92%AD%E9%A3%8E%E6%9A%B4%22%2C%22english%22%3A%22Broadcast%20Storm%22%2C%22definition%22%3A%22%E5%B9%BF%E6%92%AD%E5%B8%A7%E5%9C%A8%E7%8E%AF%E8%B7%AF%E4%B8%AD%E4%B8%8D%E6%96%AD%E5%BE%AA%E7%8E%AF%EF%BC%8C%E8%80%97%E5%B0%BD%E5%B8%A6%E5%AE%BD%22%7D%5D" />

## 环路问题演示

假设有三台交换机 A、B、C，它们两两相连形成一个三角形：

\`\`\`
    A
   / \\
  B---C
\`\`\`

当 A 收到一个广播帧时：
1. A 把帧发给 B 和 C
2. B 收到后发给 A 和 C
3. C 收到后发给 A 和 B
4. A 又收到这个帧，继续转发……

**结果**：广播帧在网络中无限循环，最终导致网络瘫痪。

## STP 的工作原理

STP 的核心思想是：**选择一些链路"激活"，禁用其他链路，让网络形成一棵没有环路的"树"。**

### 第一步：选举根桥

所有交换机参与选举，**Bridge ID 最小的成为根桥**。

Bridge ID = 优先级（2字节）+ MAC 地址（6字节）

默认优先级都是 32768，所以通常 MAC 地址最小的交换机成为根桥。

**可以手动设置优先级来控制根桥选举：**
\`\`\`
Switch(config)# spanning-tree vlan 1 root primary
\`\`\`

### 第二步：选举根端口

每个非根桥交换机选择一个**根端口**——到达根桥路径 cost 最小的端口。

Cost 根据链路带宽计算：

| 带宽 | Cost |
|------|------|
| 10 Mbps | 100 |
| 100 Mbps | 19 |
| 1 Gbps | 4 |
| 10 Gbps | 2 |

### 第三步：选举指定端口

每条链路选择一个**指定端口**——负责在这条链路上转发数据的端口。

规则：离根桥更近的一方成为指定端口。

### 第四步：阻塞非指定端口

既不是根端口也不是指定端口的端口，进入**阻塞状态**，不转发数据。

### 最终结果

环路被打破，形成一棵以根桥为根的生成树。

\`\`\`
      Root(A)
      /    \\
   端口    端口
    |        |
   B -------C
    端口(阻塞)
\`\`\`

## STP 的端口状态

STP 端口有五种状态：

| 状态 | 持续时间 | 行为 |
|------|----------|------|
| 禁用 | - | 端口关闭 |
| 阻塞 | 20 秒 | 不转发，只接收 BPDU |
| 监听 | 15 秒 | 不转发，参与选举 |
| 学习 | 15 秒 | 不转发，学习 MAC 地址 |
| 转发 | - | 正常转发 |

**问题**：从阻塞到转发需要 30-50 秒，太慢了！

## RSTP：快速生成树

**RSTP（Rapid Spanning Tree Protocol）** 是 STP 的升级版，收敛时间从 30-50 秒缩短到**几秒钟**。

### RSTP 的改进

1. **新的端口角色**：
   - 替代端口（Alternate）：根端口的备份
   - 备份端口（Backup）：指定端口的备份

2. **快速切换**：当链路断开时，替代端口可以立即切换到转发状态

3. **提议/同意机制**：新的链路建立时，通过握手快速确认

4. **边缘端口**：连接终端设备的端口直接进入转发状态，不参与 STP 计算

\`\`\`
Switch(config)# interface fa0/1
Switch(config-if)# spanning-tree portfast
\`\`\`

## 链路聚合

除了 STP，还有一种技术可以**既利用冗余链路，又避免环路**——**链路聚合（Link Aggregation）**。

把多条物理链路捆绑成一条逻辑链路：

\`\`\`
交换机A ==== 4条1G线 ==== 交换机B
         逻辑上 = 1条4G线
\`\`\`

**好处：**
- 带宽翻倍（4 条 1G = 4G）
- 冗余（一条断了，其他三条继续工作）
- 无环路（逻辑上只有一条链路）

**配置（LACP）：**
\`\`\`
Switch(config)# interface range fa0/1-4
Switch(config-if-range)# channel-group 1 mode active
\`\`\`

## 本课小结

- **环路**会导致广播风暴，使网络瘫痪
- **STP** 通过禁用冗余链路消除环路
- **根桥选举**是 STP 的第一步，Bridge ID 最小的成为根桥
- **RSTP** 大幅加快了收敛速度
- **链路聚合**可以同时利用多条链路，既增加带宽又提供冗余`,
      quizzes: [
        {
          id: 'quiz-06-04-01',
          type: 'choice',
          question: 'STP 的主要作用是什么？',
          options: ['提高网速', '消除环路', '划分 VLAN', '路由选择'],
          answer: 'B',
          explanation: 'STP（生成树协议）的主要作用是通过禁用冗余链路来消除以太网环路。'
        },
        {
          id: 'quiz-06-04-02',
          type: 'choice',
          question: 'STP 中根桥是根据什么选举的？',
          options: ['MAC 地址最小', 'Bridge ID 最小', '端口数最多', '带宽最高'],
          answer: 'B',
          explanation: 'STP 中 Bridge ID（优先级 + MAC 地址）最小的交换机成为根桥。'
        },
        {
          id: 'quiz-06-04-03',
          type: 'choice',
          question: 'RSTP 相比 STP 的主要改进是什么？',
          options: ['支持更多 VLAN', '收敛速度更快', '支持更高带宽', '更安全'],
          answer: 'B',
          explanation: 'RSTP 的主要改进是将收敛时间从 30-50 秒缩短到几秒钟。'
        },
        {
          id: 'quiz-06-04-04',
          type: 'fill',
          question: 'STP 端口从阻塞状态到转发状态需要______秒。',
          answer: ['30-50'],
          explanation: 'STP 端口需要经过阻塞（20秒）→ 监听（15秒）→ 学习（15秒）→ 转发，总共约 30-50 秒。'
        }
      ],
      references: [
        'IEEE 802.1D - Spanning Tree Protocol',
        'IEEE 802.1w - Rapid Spanning Tree Protocol'
      ]
    }
  ]
};
