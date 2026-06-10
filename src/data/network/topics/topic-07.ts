export const topic_07 = {
  title: "MAC地址与ARP协议",
  description: "MAC地址结构、OUI、ARP工作原理、ARP欺骗攻击",
  content: `# 课题7：MAC地址与ARP协议

<Glossary terms="%5B%7B%22term%22%3A%22MAC%E5%9C%B0%E5%9D%80%22%2C%22english%22%3A%22Media%20Access%20Control%20Address%22%2C%22definition%22%3A%22%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%E7%BD%91%E5%8D%A1%E7%9A%84%E5%94%AF%E4%B8%80%E7%A1%AC%E4%BB%B6%E5%9C%B0%E5%9D%80%EF%BC%8C48%E4%BD%8D%E9%95%BF%E5%BA%A6%EF%BC%8C%E5%89%8D24%E4%BD%8D%E6%98%AF%E5%8E%82%E5%95%86%E7%BC%96%E5%8F%B7%EF%BC%88OUI%EF%BC%89%EF%BC%8C%E5%90%8E24%E4%BD%8D%E6%98%AF%E8%AE%BE%E5%A4%87%E7%BC%96%E5%8F%B7%E3%80%82%22%7D%2C%7B%22term%22%3A%22OUI%22%2C%22english%22%3A%22Organizationally%20Unique%20Identifier%22%2C%22definition%22%3A%22%E7%94%B1IEEE%E5%88%86%E9%85%8D%E7%BB%99%E7%BD%91%E5%8D%A1%E5%88%B6%E9%80%A0%E5%95%86%E7%9A%8424%E4%BD%8D%E5%94%AF%E4%B8%80%E6%A0%87%E8%AF%86%EF%BC%8C%E6%98%AFMAC%E5%9C%B0%E5%9D%80%E7%9A%84%E5%89%8D3%E4%B8%AA%E5%AD%97%E8%8A%82%EF%BC%8C%E7%94%A8%E4%BA%8E%E8%AF%86%E5%88%AB%E8%AE%BE%E5%A4%87%E7%9A%84%E7%94%9F%E4%BA%A7%E5%8E%82%E5%95%86%E3%80%82%22%7D%2C%7B%22term%22%3A%22ARP%22%2C%22english%22%3A%22Address%20Resolution%20Protocol%22%2C%22definition%22%3A%22%E5%9C%B0%E5%9D%80%E8%A7%A3%E6%9E%90%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%94%A8%E4%BA%8E%E6%A0%B9%E6%8D%AE%E5%B7%B2%E7%9F%A5%E7%9A%84IP%E5%9C%B0%E5%9D%80%E8%A7%A3%E6%9E%90%E5%87%BA%E5%AF%B9%E5%BA%94%E7%9A%84MAC%E5%9C%B0%E5%9D%80%EF%BC%8C%E6%98%AF%E5%B1%80%E5%9F%9F%E7%BD%91%E9%80%9A%E4%BF%A1%E7%9A%84%E5%85%B3%E9%94%AE%E5%8D%8F%E8%AE%AE%E3%80%82%22%7D%2C%7B%22term%22%3A%22ARP%E8%AF%B7%E6%B1%82%22%2C%22english%22%3A%22ARP%20Request%22%2C%22definition%22%3A%22%E5%B9%BF%E6%92%AD%E5%B8%A7%EF%BC%8C%E5%90%91%E5%B1%80%E5%9F%9F%E7%BD%91%E5%86%85%E6%89%80%E6%9C%89%E8%AE%BE%E5%A4%87%E8%AF%A2%E9%97%AE%E6%9F%90%E4%B8%AAIP%E5%9C%B0%E5%9D%80%E5%AF%B9%E5%BA%94%E7%9A%84MAC%E5%9C%B0%E5%9D%80%E3%80%82%E5%B0%B1%E5%83%8F%E5%9C%A8%E6%95%99%E5%AE%A4%E9%87%8C%E5%A4%A7%E5%96%8A%EF%BC%9A%E8%B0%81%E7%9A%84IP%E6%98%AF192.168.1.1%EF%BC%9F%22%7D%2C%7B%22term%22%3A%22ARP%E5%93%8D%E5%BA%94%22%2C%22english%22%3A%22ARP%20Reply%22%2C%22definition%22%3A%22%E5%8D%95%E6%92%AD%E5%B8%A7%EF%BC%8C%E7%9B%AE%E6%A0%87%E8%AE%BE%E5%A4%87%E6%94%B6%E5%88%B0ARP%E8%AF%B7%E6%B1%82%E5%90%8E%EF%BC%8C%E5%9B%9E%E5%A4%8D%E8%87%AA%E5%B7%B1%E7%9A%84MAC%E5%9C%B0%E5%9D%80%E3%80%82%E5%B0%B1%E5%83%8F%E9%82%A3%E4%B8%AA%E5%90%8C%E5%AD%A6%E4%B8%BE%E6%89%8B%E5%9B%9E%E7%AD%94%EF%BC%9A%E6%98%AF%E6%88%91%E7%9A%84%EF%BC%81%22%7D%2C%7B%22term%22%3A%22ARP%E7%BC%93%E5%AD%98%E8%A1%A8%22%2C%22english%22%3A%22ARP%20Cache%22%2C%22definition%22%3A%22%E8%AE%BE%E5%A4%87%E7%BB%B4%E6%8A%A4%E7%9A%84%E4%B8%80%E5%BC%A0IP%E5%9C%B0%E5%9D%80%E5%88%B0MAC%E5%9C%B0%E5%9D%80%E7%9A%84%E6%98%A0%E5%B0%84%E8%A1%A8%EF%BC%8C%E6%9C%89%E7%94%9F%E5%AD%98%E6%97%B6%E9%97%B4%EF%BC%88%E9%80%9A%E5%B8%B820%E5%88%86%E9%92%9F%EF%BC%89%EF%BC%8C%E9%81%BF%E5%85%8D%E6%AF%8F%E6%AC%A1%E9%83%BD%E5%B9%BF%E6%92%AD%E6%9F%A5%E8%AF%A2%E3%80%82%22%7D%2C%7B%22term%22%3A%22ARP%E6%AC%BA%E9%AA%97%22%2C%22english%22%3A%22ARP%20Spoofing%22%2C%22definition%22%3A%22%E6%94%BB%E5%87%BB%E8%80%85%E5%8F%91%E9%80%81%E8%99%9A%E5%81%87ARP%E5%93%8D%E5%BA%94%EF%BC%8C%E5%B0%86%E8%87%AA%E5%B7%B1%E4%BC%AA%E8%A3%85%E6%88%90%E7%BD%91%E5%85%B3%E6%88%96%E5%85%B6%E4%BB%96%E8%AE%BE%E5%A4%87%EF%BC%8C%E4%BB%8E%E8%80%8C%E6%88%AA%E8%8E%B7%E6%88%96%E7%AF%A1%E6%94%B9%E9%80%9A%E4%BF%A1%E6%95%B0%E6%8D%AE%EF%BC%8C%E6%98%AF%E4%B8%80%E7%A7%8D%E5%B8%B8%E8%A7%81%E7%9A%84%E4%B8%AD%E9%97%B4%E4%BA%BA%E6%94%BB%E5%87%BB%E3%80%82%22%7D%2C%7B%22term%22%3A%22%E5%B9%BF%E6%92%AD%22%2C%22english%22%3A%22Broadcast%22%2C%22definition%22%3A%22%E5%90%91%E5%B1%80%E5%9F%9F%E7%BD%91%E5%86%85%E6%89%80%E6%9C%89%E8%AE%BE%E5%A4%87%E5%8F%91%E9%80%81%E6%95%B0%E6%8D%AE%E5%B8%A7%E3%80%82%E4%BB%A5%E5%A4%AA%E7%BD%91%E4%B8%AD%E7%9B%AE%E7%9A%84MAC%E4%B8%BAFF%3AFF%3AFF%3AFF%3AFF%3AFF%E7%9A%84%E5%B8%A7%E5%B0%B1%E6%98%AF%E5%B9%BF%E6%92%AD%E5%B8%A7%EF%BC%8C%E6%89%80%E6%9C%89%E8%AE%BE%E5%A4%87%E9%83%BD%E4%BC%9A%E6%8E%A5%E6%94%B6%E5%A4%84%E7%90%86%E3%80%82%22%7D%5D" />

## 两层地址，各司其职

在网络通信中，我们有两种地址：**IP地址**和**MAC地址**。很多初学者会困惑：既然有了IP地址，为什么还需要MAC地址？

打个比方：IP地址就像你的**家庭住址**（可以随着搬家改变），MAC地址就像你的**身份证号**（出厂就固定，终身不变）。IP地址工作在网络层，负责"从北京到上海"的路径选择；MAC地址工作在数据链路层，负责"从这个路由器端口到那个交换机端口"的精确投递。

每经过一个路由器，IP地址不变（始终是源和目的），但MAC地址会不断变化——因为每一跳的"上一站"和"下一站"都不同。

## MAC地址的结构

**MAC地址**是一个48位（6字节）的二进制数，通常用十六进制表示，格式如：00:1A:2B:3C:4D:5E 或 00-1A-2B-3C-4D-5E。

### OUI + 设备标识

MAC地址分为两部分：
- **前24位（3字节）**：**OUI（组织唯一标识符）**，由IEEE分配给网卡制造商。比如Intel的OUI可能是 00:1A:A0，华为可能是 00:E0:FC。
- **后24位（3字节）**：**设备标识符**，由制造商自己分配，保证同一厂商的每块网卡地址都不重复。

### 特殊MAC地址

- **广播地址**：FF:FF:FF:FF:FF:FF，表示"发给所有人"
- **组播地址**：第一个字节的最低位为1，表示发给一组设备
- **单播地址**：第一个字节的最低位为0，表示发给一个特定设备

你可以在Windows上用 ipconfig /all 命令查看自己网卡的MAC地址（显示为"物理地址"），在Linux/Mac上用 ifconfig 或 ip link 命令。

## ARP协议：IP到MAC的"翻译官"

知道了MAC地址是什么，下一个问题就是：**我怎么知道目标设备的MAC地址是什么？**

我在局域网里知道目标的IP地址（比如192.168.1.100），但以太网帧的传输需要MAC地址。这就需要**ARP协议（Address Resolution Protocol，地址解析协议）**来做"翻译"——把IP地址解析成MAC地址。

### ARP的工作过程

假设主机A（IP: 192.168.1.1，MAC: AA-AA-AA-AA-AA-AA）要给主机B（IP: 192.168.1.100）发数据，但不知道B的MAC地址。

**第一步：ARP请求——"大喇叭"广播**

主机A构造一个**ARP请求帧**，内容是："谁的IP是192.168.1.100？请告诉我你的MAC地址。"这个帧的目的MAC是 FF:FF:FF:FF:FF:FF（广播地址），所以局域网内的**所有设备**都会收到这个请求。

就像你在教室里大喊一声："谁是张三？你的座位号是多少？"

**第二步：ARP响应——"我在这儿"**

局域网内所有设备收到ARP请求后，会检查请求中的IP地址是不是自己的。如果不是，就忽略。只有主机B发现"192.168.1.100是我的IP"，于是构造一个**ARP响应帧**，回复自己的MAC地址："我是192.168.1.100，我的MAC是BB-BB-BB-BB-BB-BB。"这个响应是**单播**——只发给主机A。

就像张三听到后举手回答："是我，我坐在15号！"

**第三步：建立映射**

主机A收到ARP响应后，把IP地址和MAC地址的映射关系存入**ARP缓存表**。以后再给192.168.1.100发数据，就直接查表，不用再广播了。

### ARP缓存表

ARP缓存表是设备维护的一张"通讯录"，记录了IP地址到MAC地址的映射。每条记录都有一个**生存时间（TTL）**，通常是20分钟。过了这个时间，记录会被清除，下次通信需要重新ARP解析。

你可以在命令行输入 arp -a 查看当前的ARP缓存表。

## ARP欺骗攻击

ARP协议有一个致命的设计缺陷：**它不验证响应的真实性**。任何设备都可以发送ARP响应，声称"我是某个IP地址的拥有者"，其他设备会无条件相信。

### 攻击原理

攻击者（主机C）向主机A发送虚假的ARP响应："网关（192.168.1.1）的MAC地址是我的MAC。"同时向网关发送："主机A（192.168.1.100）的MAC地址是我的MAC。"

结果：主机A以为C是网关，网关以为C是主机A。所有流量都经过攻击者，攻击者可以**窃听、篡改、甚至阻断**通信。这就是**中间人攻击（Man-in-the-Middle Attack）**。

### 防御措施

- **静态ARP绑定**：手动在设备上绑定IP和MAC的对应关系（小规模网络可行，大规模网络管理成本太高）
- **DAI（动态ARP检测）**：交换机上启用，验证ARP报文的合法性
- **802.1X认证**：对接入设备进行身份认证，防止未授权设备接入

## 本课小结

- **MAC地址**是48位的硬件唯一标识，前24位是OUI（厂商编号），后24位是设备编号
- **ARP协议**用于根据IP地址解析MAC地址，是局域网通信的关键
- ARP工作过程：广播ARP请求 → 目标单播ARP响应 → 建立缓存映射
- **ARP缓存表**有生存时间（约20分钟），过期需要重新解析
- **ARP欺骗**利用ARP不验证响应真实性的缺陷，是常见的中间人攻击手段
- 防御ARP欺骗可以通过静态绑定、DAI、802.1X认证等方式`,
  quizzes: [
          {
            id: 'q7-1',
            type: 'choice',
            question: 'MAC地址的长度是多少位？',
            options: ['32位', '48位', '64位', '128位'],
            answer: 'B',
            explanation: 'MAC地址长度为48位（6字节），通常用十六进制表示，如AA:BB:CC:DD:EE:FF。前24位是OUI，后24位是设备标识。'
          },
          {
            id: 'q7-2',
            type: 'choice',
            question: 'ARP请求帧的目的MAC地址是什么？',
            options: ['00:00:00:00:00:00', 'FF:FF:FF:FF:FF:FF', '发送方自己的MAC', '目标设备的MAC'],
            answer: 'B',
            explanation: 'ARP请求使用广播地址FF:FF:FF:FF:FF:FF作为目的MAC，这样局域网内所有设备都能收到请求并检查IP是否匹配。'
          },
          {
            id: 'q7-3',
            type: 'fill',
            question: 'ARP缓存表中每条记录的生存时间通常为________分钟。',
            answer: '20',
            explanation: 'ARP缓存表的默认TTL通常为20分钟。过期后记录会被清除，下次通信需要重新进行ARP广播解析。'
          },
          {
            id: 'q7-4',
            type: 'choice',
            question: 'ARP欺骗攻击利用的是ARP协议的什么缺陷？',
            options: ['ARP协议没有加密', 'ARP协议不验证响应的真实性', 'ARP协议速率太慢', 'ARP协议只支持IPv4'],
            answer: 'B',
            explanation: 'ARP协议的设计缺陷在于它不验证ARP响应的真实性，任何设备都可以发送ARP响应声称自己拥有某个IP地址，其他设备会无条件相信。'
          },
          {
            id: 'q7-5',
            type: 'short-answer',
            question: '请简述ARP协议的完整工作过程（三步）。',
            answer: '1. 发送方广播ARP请求，询问目标IP对应的MAC地址；2. 目标设备收到请求后单播ARP响应，回复自己的MAC地址；3. 发送方将IP-MAC映射存入ARP缓存表，后续通信直接查表。',
            explanation: 'ARP的核心过程就是"广播问、单播答、存缓存"三步。理解这个过程对排查网络故障非常重要。'
          }
        ],
  references: [
          '《图解TCP/IP》第2章 - MAC地址与ARP',
          '《计算机网络》谢希仁 第3章 - ARP协议',
          'RFC 826 - An Ethernet Address Resolution Protocol'
        ]
};
