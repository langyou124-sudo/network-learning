export const topic_06_02 = {
  title: "路由协议",
  description: "RIP、OSPF、BGP 等动态路由协议",
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
};
