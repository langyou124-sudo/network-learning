export const topic_03 = {
  title: "数据封装与解封装",
  description: "理解数据在网络中如何传输",
  content: `# 数据封装与解封装

<Glossary terms="%5B%7B%22term%22%3A%22%E5%B0%81%E8%A3%85%22%2C%22english%22%3A%22Encapsulation%22%2C%22definition%22%3A%22%E6%95%B0%E6%8D%AE%E4%BB%8E%E4%B8%8A%E5%B1%82%E5%88%B0%E4%B8%8B%E5%B1%82%E6%97%B6%EF%BC%8C%E6%AF%8F%E4%B8%80%E5%B1%82%E9%83%BD%E5%9C%A8%E6%95%B0%E6%8D%AE%E5%89%8D%E9%9D%A2%E5%8A%A0%E4%B8%8A%E8%87%AA%E5%B7%B1%E7%9A%84%E5%A4%B4%E9%83%A8%E4%BF%A1%E6%81%AF%EF%BC%8C%E5%83%8F%E5%A5%97%E5%A8%83%E4%B8%80%E6%A0%B7%E5%B1%82%E5%B1%82%E5%8C%85%E8%A3%B9%22%7D%2C%7B%22term%22%3A%22%E8%A7%A3%E5%B0%81%E8%A3%85%22%2C%22english%22%3A%22Decapsulation%22%2C%22definition%22%3A%22%E6%95%B0%E6%8D%AE%E4%BB%8E%E4%B8%8B%E5%B1%82%E5%88%B0%E4%B8%8A%E5%B1%82%E6%97%B6%EF%BC%8C%E9%80%90%E5%B1%82%E5%89%A5%E5%8E%BB%E5%A4%B4%E9%83%A8%E4%BF%A1%E6%81%AF%EF%BC%8C%E8%BF%98%E5%8E%9F%E5%87%BA%E5%8E%9F%E5%A7%8B%E6%95%B0%E6%8D%AE%22%7D%2C%7B%22term%22%3A%22PDU%22%2C%22english%22%3A%22Protocol%20Data%20Unit%22%2C%22definition%22%3A%22%E5%8D%8F%E8%AE%AE%E6%95%B0%E6%8D%AE%E5%8D%95%E5%85%83%EF%BC%8C%E6%AF%8F%E5%B1%82%E4%BC%A0%E8%BE%93%E7%9A%84%E6%95%B0%E6%8D%AE%E5%8D%95%E4%BD%8D%E5%90%8D%E7%A7%B0%E4%B8%8D%E5%90%8C%EF%BC%9AData%E3%80%81Segment%E3%80%81Packet%E3%80%81Frame%E3%80%81Bits%22%7D%2C%7B%22term%22%3A%22%E5%B8%A7%22%2C%22english%22%3A%22Frame%22%2C%22definition%22%3A%22%E6%95%B0%E6%8D%AE%E9%93%BE%E8%B7%AF%E5%B1%82%E7%9A%84PDU%EF%BC%8C%E7%94%B1%E5%B8%A7%E5%A4%B4%2B%E6%95%B0%E6%8D%AE%2B%E5%B8%A7%E5%B0%BE%E7%BB%84%E6%88%90%22%7D%2C%7B%22term%22%3A%22%E5%B8%A7%E5%A4%B4%22%2C%22english%22%3A%22Frame%20Header%22%2C%22definition%22%3A%22%E5%B8%A7%E7%9A%84%E5%BC%80%E5%A4%B4%EF%BC%8C%E5%8C%85%E5%90%AB%E6%BA%90MAC%E5%92%8C%E7%9B%AE%E6%A0%87MAC%E5%9C%B0%E5%9D%80%EF%BC%8C%E5%91%8A%E8%AF%89%E4%BA%A4%E6%8D%A2%E6%9C%BA%E5%B8%A7%E4%BB%8E%E5%93%AA%E6%9D%A5%E5%88%B0%E5%93%AA%E5%8E%BB%22%7D%2C%7B%22term%22%3A%22%E5%B8%A7%E5%B0%BE%22%2C%22english%22%3A%22Frame%20Trailer%22%2C%22definition%22%3A%22%E5%B8%A7%E7%9A%84%E7%BB%93%E5%B0%BE%EF%BC%8C%E5%8C%85%E5%90%ABFCS%E6%A0%A1%E9%AA%8C%E7%A0%81%EF%BC%8C%E6%A3%80%E6%B5%8B%E6%95%B0%E6%8D%AE%E6%98%AF%E5%90%A6%E6%8D%9F%E5%9D%8F%22%7D%2C%7B%22term%22%3A%22MAC%E5%9C%B0%E5%9D%80%22%2C%22english%22%3A%22MAC%20Address%22%2C%22definition%22%3A%22%E7%BD%91%E5%8D%A1%E7%9A%84%E7%89%A9%E7%90%86%E5%9C%B0%E5%9D%80%EF%BC%8C%E5%85%A8%E7%90%83%E5%94%AF%E4%B8%80%EF%BC%8C%E6%A0%BC%E5%BC%8F%E5%A6%82AA%3ABB%3ACC%3ADD%3AEE%3AFF%22%7D%2C%7B%22term%22%3A%22%E6%AE%B5%22%2C%22english%22%3A%22Segment%22%2C%22definition%22%3A%22%E4%BC%A0%E8%BE%93%E5%B1%82%E7%9A%84PDU%EF%BC%8CTCP%2FUDP%E5%A4%B4%2B%E5%BA%94%E7%94%A8%E6%95%B0%E6%8D%AE%22%7D%2C%7B%22term%22%3A%22%E5%8C%85%22%2C%22english%22%3A%22Packet%22%2C%22definition%22%3A%22%E7%BD%91%E7%BB%9C%E5%B1%82%E7%9A%84PDU%EF%BC%8CIP%E5%A4%B4%2B%E6%AE%B5%22%7D%5D" />

## 什么是封装？

当你在微信上发送一条消息"你好"，这条消息并不是原封不动地从你的手机传到对方手机的。它会经历一个叫**封装**的过程——每一层网络协议都在数据上"贴"上自己的标签，就像寄快递时一层层包装。

### 生活类比：寄快递

1. 你写好信的内容（应用层数据）
2. 装进信封，写上收件人姓名（传输层加TCP头——标识是哪个程序的数据）
3. 装进快递箱，写上收件地址（网络层加IP头——标识发到哪台设备）
4. 快递公司贴面单，写上发件人和收件人的手机号（数据链路层加帧头——标识在局域网内从哪来、到哪去）
5. 卡车运输（物理层——变成电信号或光信号传输）

## 封装过程详解

<Diagram type="encapsulation" />

每一层都做同一件事：**在数据前面加上自己的头部信息**（数据链路层还会在末尾加帧尾）。

### 各层做了什么？

**应用层** — 你的应用程序生成原始数据。比如你输入"你好"，这就是应用层的Data。

**传输层** — 在数据前面加上TCP头部。TCP头部包含两个关键信息：**源端口**和**目标端口**。端口号用来区分同一台设备上的不同程序——HTTP用80端口，HTTPS用443端口，微信用自己的端口。加了TCP头的数据叫**段（Segment）**。

**网络层** — 在段前面加上IP头部。IP头部包含**源IP地址**和**目标IP地址**，路由器根据目标IP地址决定数据包往哪转发。加了IP头的数据叫**包（Packet）**。

**数据链路层** — 在包的前面加上**帧头**，末尾加上**帧尾**，组装成**帧（Frame）**。
- **帧头**包含：源MAC地址和目标MAC地址。MAC地址是网卡的物理地址，全球唯一，格式如 AA:BB:CC:DD:EE:FF。交换机根据目标MAC地址把帧转发到正确的端口。
- **帧尾**包含：FCS（帧校验序列），是一串校验码。接收方用它来检查数据在传输过程中是否损坏——如果校验失败，说明数据被干扰了，这个帧会被丢弃。

**物理层** — 把帧转换成比特流（0和1），通过网线、光纤或无线电波发送出去。

## 各层的PDU

每一层传输的数据单位有专门的名称，叫**PDU（Protocol Data Unit，协议数据单元）**：

| 层 | PDU名称 | 中文 | 结构 |
|----|---------|------|------|
| 应用层 | Data | 数据 | 原始应用数据 |
| 传输层 | Segment | 段 | TCP/UDP头 + 应用数据 |
| 网络层 | Packet | 包 | IP头 + 段 |
| 数据链路层 | Frame | 帧 | 帧头 + 包 + 帧尾 |
| 物理层 | Bits | 比特 | 一串0和1 |

## 解封装：接收方怎么还原数据？

接收方执行与封装相反的过程——从下往上，逐层拆去头部：

1. **物理层**接收比特流，还原成帧
2. **数据链路层**检查帧尾的FCS校验码，确认数据没损坏，然后去掉帧头帧尾，取出包交给网络层
3. **网络层**读取IP头部，确认这个包是发给自己的，然后去掉IP头，取出段交给传输层
4. **传输层**读取TCP头部，根据端口号把数据交给对应的应用程序，然后去掉TCP头
5. **应用层**收到原始数据"你好"

> 核心原则：每层只看自己该看的头部，其他层的内容一律视为"数据"。这就是分层的威力——应用层不需要知道数据是通过Wi-Fi还是光纤传输的。

## 本课小结

- **封装**是数据从上到下逐层加头部的过程，**解封装**是反向逐层拆头部的过程
- 每层的PDU有专门名称：Data→Segment→Packet→Frame→Bits
- **帧头帧尾**是数据链路层特有的：帧头含MAC地址，帧尾含校验码
- **TCP头部**标识端口号（哪个程序），**IP头部**标识IP地址（哪台设备）
- 分层的核心意义：每层各司其职，互不干扰`,
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
          },
          {
            id: 'quiz-03-04',
            type: 'choice',
            question: '帧尾中的FCS字段的作用是什么？',
            options: ['标识源MAC地址', '标识目标MAC地址', '检测数据在传输中是否损坏', '标识数据包长度'],
            answer: 'C',
            explanation: 'FCS（帧校验序列）是一串校验码，接收方用它来检查数据在传输过程中是否损坏。'
          },
          {
            id: 'quiz-03-05',
            type: 'fill',
            question: '数据从应用层到物理层逐层加头部的过程叫______，反向逐层拆头部的过程叫______。',
            answer: ['封装', '解封装'],
            explanation: '封装（Encapsulation）是从上到下逐层加头部，解封装（Decapsulation）是从下到上逐层拆头部。'
          },
          {
            id: 'quiz-03-06',
            type: 'choice',
            question: 'TCP头部中包含的关键信息是什么？',
            options: ['源IP和目标IP地址', '源端口和目标端口号', '源MAC和目标MAC地址', '序列号和FCS校验码'],
            answer: 'B',
            explanation: 'TCP头部包含源端口和目标端口号，用于区分同一台设备上的不同应用程序。IP地址在IP头部中，MAC地址在帧头中。'
          }
        ],
  references: [
          '《图解TCP/IP》第2章',
          '《TCP/IP详解 卷1》第1-2章'
        ]
};
