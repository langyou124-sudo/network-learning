export const topic_46 = {
  title: "IPv6过渡技术",
  description: "IPv4到IPv6的过渡方案：双栈、隧道、翻译三大技术路线",
  content: `# IPv6过渡技术

<Glossary terms="%5B%7B%22term%22%3A%22%E5%8F%8C%E6%A0%88%22%2C%22definition%22%3A%22%E5%90%8C%E6%97%B6%E8%BF%90%E8%A1%8CIPv4%E5%92%8CIPv6%E4%B8%A4%E5%A5%97%E5%8D%8F%E8%AE%AE%E6%A0%88%EF%BC%8C%E6%98%AF%E6%9C%80%E5%9F%BA%E7%A1%80%E7%9A%84%E8%BF%87%E6%B8%A1%E6%96%B9%E6%A1%88%22%7D%2C%7B%22term%22%3A%22%E9%9A%A7%E9%81%93%22%2C%22definition%22%3A%22%E5%B0%86IPv6%E6%95%B0%E6%8D%AE%E5%8C%85%E5%B0%81%E8%A3%85%E5%9C%A8IPv4%E6%95%B0%E6%8D%AE%E5%8C%85%E4%B8%AD%E4%BC%A0%E8%BE%93%EF%BC%8C%E7%A9%BF%E8%B6%8AIPv4%E7%BD%91%E7%BB%9C%22%7D%2C%7B%22term%22%3A%226to4%22%2C%22definition%22%3A%22%E8%87%AA%E5%8A%A8%E9%9A%A7%E9%81%93%E6%8A%80%E6%9C%AF%EF%BC%8C%E4%BD%BF%E7%94%A82002::/16%E5%89%8D%E7%BC%80%EF%BC%8C%E9%80%9A%E8%BF%87IPv4%E5%9C%B0%E5%9D%80%E8%87%AA%E5%8A%A8%E6%9E%84%E5%BB%BAIPv6%E5%9C%B0%E5%9D%80%22%7D%2C%7B%22term%22%3A%22ISATAP%22%2C%22definition%22%3A%22%E7%AB%99%E5%86%85%E8%87%AA%E5%8A%A8%E9%9A%A7%E9%81%93%E5%AF%BB%E5%9D%80%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%94%A8%E4%BA%8E%E4%BC%81%E4%B8%9A%E5%86%85%E9%83%A8%E7%BD%91%E7%BB%9C%E7%9A%84IPv6%E8%BF%87%E6%B8%A1%22%7D%2C%7B%22term%22%3A%22Teredo%22%2C%22definition%22%3A%22%E7%A9%BF%E9%80%8FNAT%E7%9A%84IPv6%E9%9A%A7%E9%81%93%E6%8A%80%E6%9C%AF%EF%BC%8C%E5%B0%86IPv6%E5%B0%81%E8%A3%85%E5%9C%A8UDP%E4%B8%AD%E4%BC%A0%E8%BE%93%22%7D%2C%7B%22term%22%3A%22NAT64%22%2C%22definition%22%3A%22%E5%9C%B0%E5%9D%80%E7%BF%BB%E8%AF%91%E6%8A%80%E6%9C%AF%EF%BC%8C%E5%AE%9E%E7%8E%B0IPv6%E4%B8%BB%E6%9C%BA%E8%AE%BF%E9%97%AEIPv4%E8%B5%84%E6%BA%90%22%7D%2C%7B%22term%22%3A%22DNS64%22%2C%22definition%22%3A%22%E9%85%8D%E5%90%88NAT64%E7%9A%84DNS%E6%9C%8D%E5%8A%A1%EF%BC%8C%E5%B0%86IPv4%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2%E4%B8%BAIPv6%E5%9C%B0%E5%9D%80%22%7D%2C%7B%22term%22%3A%22NAT-PT%22%2C%22definition%22%3A%22%E7%BD%91%E7%BB%9C%E5%9C%B0%E5%9D%80%E8%BD%AC%E6%8D%A2-%E5%8D%8F%E8%AE%AE%E8%BD%AC%E6%8D%A2%EF%BC%8C%E6%97%A9%E6%9C%9FIPv6%E7%BF%BB%E8%AF%91%E6%8A%80%E6%9C%AF%EF%BC%8C%E5%B7%B2%E8%A2%AB%E6%B7%98%E6%B1%B0%22%7D%5D" />

## 引入：为什么需要过渡技术？

IPv6被设计为IPv4的继任者，但现实世界不可能一夜之间完成切换。全球数十亿设备运行着IPv4，数以百万计的网络基础设施依赖IPv4协议栈。从IPv4到IPv6的过渡不是一个简单的"开关"，而是一个漫长的过程，可能持续数十年。

在过渡期间，IPv4和IPv6将长期共存。这就带来了一个核心问题：**IPv6网络中的设备如何与IPv4网络中的设备通信？** 以及**如何在现有IPv4基础设施上逐步部署IPv6？**

为了回答这些问题，业界发展出了三大过渡技术路线：

1. **双栈技术**：让设备同时支持IPv4和IPv6
2. **隧道技术**：在IPv4网络中"打通"IPv6的通道
3. **翻译技术**：在IPv4和IPv6之间进行协议转换

这三种技术并非互斥，实际部署中往往会组合使用。接下来我们逐一详细讨论。

## 双栈技术（Dual Stack）

### 基本原理

双栈技术是最简单、最直接的过渡方案。它的核心思想是：**让网络设备同时运行IPv4和IPv6两套协议栈**。也就是说，设备同时拥有IPv4地址和IPv6地址，能够同时处理IPv4和IPv6数据包。

双栈设备的协议栈结构：

| 层次 | IPv4部分 | IPv6部分 |
|------|----------|----------|
| 应用层 | 应用程序 | 应用程序 |
| 传输层 | TCP/UDP | TCP/UDP |
| 网络层 | IPv4 | IPv6 |
| 数据链路层 | 以太网/Wi-Fi等 | 以太网/Wi-Fi等 |

当双栈设备需要与某个目的地通信时，它会根据DNS解析结果来决定使用哪个协议栈：
- 如果DNS返回AAAA记录（IPv6地址），优先使用IPv6
- 如果只有A记录（IPv4地址），使用IPv4
- 如果两者都有，通常优先使用IPv6（取决于操作系统配置）

### 双栈的优势

1. **实现简单**：只需要设备同时配置IPv4和IPv6地址即可，不需要额外的封装或转换
2. **性能最佳**：没有封装/解封装的开销，直接使用原生协议通信
3. **应用透明**：应用程序无需修改，操作系统自动选择合适的协议栈
4. **可靠性高**：两套协议栈独立运行，互不影响

### 双栈的局限

1. **IPv4地址消耗**：双栈设备仍然需要IPv4地址，这与IPv4地址枯竭的趋势相矛盾
2. **设备要求**：所有中间设备（路由器、交换机、防火墙）都需要支持双栈
3. **管理复杂**：需要同时维护两套网络配置
4. **不能单独解决过渡问题**：双栈只是让设备同时支持两种协议，但没有解决IPv6-only设备与IPv4-only设备之间的通信问题

### 实际部署

双栈是过渡的基础。中国电信、中国移动等运营商在骨干网和城域网层面普遍部署了双栈。家庭路由器方面，现代路由器大多默认开启双栈功能，WAN口同时获取IPv4和IPv6地址。

典型的双栈网络拓扑：

    [IPv6服务器] --- [双栈路由器] --- [双栈网络] --- [双栈客户端]
                           |
                      [IPv4网络] --- [IPv4服务器]

## 隧道技术概述

隧道技术的核心思想是：**将IPv6数据包封装在IPv4数据包中传输**，使得IPv6数据能够穿越IPv4网络。这就像在IPv4网络中挖了一条"隧道"，让IPv6数据包通过。

隧道技术的基本原理：

    原始IPv6数据包: [IPv6 Header][Payload]
                          ↓ 封装
    隧道IPv4数据包: [IPv4 Header][IPv6 Header][Payload]
                          ↓ 穿越IPv4网络
    到达隧道另一端: [IPv6 Header][Payload]  ← 解封装

IPv4头部的协议字段（Protocol）设置为41，表示负载是一个IPv6数据包。

隧道技术主要分为两类：
- **手动隧道**：需要人工配置隧道端点
- **自动隧道**：根据地址自动建立隧道

### 手动隧道（Manual Tunnel）

手动隧道是最简单的隧道类型。管理员需要手动配置隧道的两个端点——入口和出口的IPv4地址。

配置示例（Cisco路由器）：
    interface Tunnel0
     ipv6 address 2001:db8:1::1/64
     tunnel source 10.0.0.1
     tunnel destination 10.0.0.2
     tunnel mode ipv6ip

**优点**：配置明确，流量可控，安全性较好。
**缺点**：需要手动配置每对端点，扩展性差；只适合点对点连接。

### 6to4隧道

6to4（RFC 3056）是一种自动隧道技术，使用特殊的IPv6前缀 2002::/16。6to4将隧道端点的IPv4地址嵌入到IPv6地址中，从而实现自动隧道建立。

6to4地址格式：
    | 2002 | 32位IPv4地址 | 16位子网ID | 64位接口标识符 |
    |  16  |     32      |     16    |      64       |

例如，如果隧道端点的IPv4地址是 192.168.1.1（十六进制为C0A8:0101），则对应的6to4前缀是 2002:C0A8:0101::/48。

**6to4的工作过程**：

1. 源主机（6to4地址 2002:C0A8:0101::1）要发送数据给目的主机（6to4地址 2002:C0A8:0202::1）
2. 源路由器查看目的地址的前缀 2002:C0A8:0202::，提取IPv4地址 192.168.2.2
3. 源路由器将IPv6数据包封装在IPv4数据包中，目的地址为 192.168.2.2
4. IPv4数据包穿越IPv4网络到达目的路由器
5. 目的路由器解封装，取出IPv6数据包转发给目的主机

**6to4 Relay**：当6to4网络需要与原生IPv6网络通信时，需要通过6to4中继路由器（Relay Router）。中继路由器同时连接6to4网络（2002::/16）和原生IPv6网络，负责在两者之间转发数据。

**6to4的优缺点**：
- 优点：自动建立隧道，无需手动配置；只需要一个全球可路由的IPv4地址
- 缺点：依赖中继路由器，性能不稳定；容易受到中间人攻击；已经不推荐使用（RFC 7526将其归为Historic）

### ISATAP隧道

ISATAP（Intra-Site Automatic Tunnel Addressing Protocol，站内自动隧道寻址协议，RFC 5214）主要用于企业内部网络的IPv6过渡。它允许在IPv4内部网络上建立IPv6连接。

ISATAP地址格式：
    | 64位前缀 | 0000:5EFE | 32位IPv4地址 |
    |   64    |    32    |     32      |

ISATAP将IPv4地址嵌入到接口标识符的后32位，格式为 ::0:5EFE:a.b.c.d 或 ::200:5EFE:a.b.c.d。

**ISATAP的特点**：
- 可以在纯IPv4网络内部建立IPv6连接
- 不需要支持IPv6的路由器——ISATAP将IPv4网络视为一个虚拟的IPv6链路
- 适合企业网络逐步过渡到IPv6

**ISATAP的工作过程**：
1. 主机配置ISATAP接口，自动根据IPv4地址生成ISATAP IPv6地址
2. 主机通过ISATAP路由器获取IPv6前缀和路由信息
3. 当需要发送IPv6数据包时，将IPv6数据包封装在IPv4中，发送给ISATAP路由器
4. ISATAP路由器解封装后，通过原生IPv6网络转发

### Teredo隧道

Teredo（RFC 4380）是一种特殊的隧道技术，它的设计目标是**穿越NAT设备**。在IPv4网络中，NAT（网络地址转换）设备大量存在，传统的隧道技术（如6to4）无法穿越NAT。Teredo通过将IPv6数据包封装在UDP数据报中来解决这个问题。

Teredo的工作原理：
1. Teredo客户端将IPv6数据包封装在UDP数据报中
2. UDP数据报被IPv4网络传输
3. NAT设备将UDP数据报视为普通的UDP流量，进行地址和端口转换
4. Teredo服务器/中继在另一端解封装，取出IPv6数据包

**Teredo地址格式**：
    | 2001:0000 | Teredo服务器IPv4 | Flags | UDP端口(取反) | 客户端IPv4(取反) |
    |   32     |       32       |  16  |      16      |       32        |

**Teredo组件**：
- **Teredo客户端**：需要IPv6连接但处于IPv4 NAT后面的主机
- **Teredo服务器**：帮助客户端初始化通信，辅助NAT类型检测
- **Teredo中继**：在Teredo网络和原生IPv6网络之间转发数据
- **Teredo特定主机中继**：当主机本身同时连接Teredo和原生IPv6网络时使用

**Teredo的优缺点**：
- 优点：能够穿越大多数NAT设备；Windows系统内置支持
- 缺点：性能较差（需要经过中继）；安全性较低（依赖UDP，容易被防火墙阻止）；逐步被淘汰

Windows系统中的Teredo配置：
    # 查看Teredo状态
    netsh interface teredo show state
    
    # 启用Teredo
    netsh interface teredo set state client
    
    # 禁用Teredo
    netsh interface teredo set state disabled

### GRE隧道

GRE（Generic Routing Encapsulation，通用路由封装）是一种通用的隧道协议，可以封装多种协议（包括IPv6）在IPv4中传输。GRE隧道在IPv4协议字段中使用协议号47。

GRE隧道的特点：
- 支持多协议封装（IPv4、IPv6、IPX等）
- 支持组播和广播
- 可以结合IPsec提供安全保护
- 在企业网络和运营商网络中广泛使用

## 隧道技术对比

| 技术 | 类型 | 是否自动 | NAT穿越 | 推荐程度 |
|------|------|---------|---------|---------|
| 手动隧道 | 点对点 | 否 | 不支持 | 仍在使用 |
| 6to4 | 自动 | 是 | 不支持 | 已淘汰（RFC 7526） |
| ISATAP | 自动 | 是 | 部分支持 | 企业内部使用 |
| Teredo | 自动 | 是 | 支持 | 逐步淘汰 |
| GRE | 点对点 | 否 | 不支持 | 仍在使用 |

## 翻译技术

当IPv6-only网络中的设备需要与IPv4-only网络中的设备通信时，双栈和隧道技术都无法解决——因为至少有一端不支持目标协议。这时就需要**翻译技术**，在IPv4和IPv6之间进行协议转换。

### NAT64/DNS64

NAT64/DNS64是目前最主要的IPv6-IPv4翻译技术，定义在RFC 6146和RFC 6147中。

**NAT64** 负责将IPv6数据包转换为IPv4数据包（或反向），其工作方式类似IPv4中的NAT，但转换的是整个IP层协议。

**DNS64** 是配合NAT64使用的DNS服务。当IPv6客户端查询一个只有A记录（IPv4地址）的域名时，DNS64将IPv4地址合成一个IPv6地址（使用64:ff9b::/96前缀），使得IPv6客户端可以将数据包发送到NAT64设备。

**NAT64/DNS64的工作过程**：

1. IPv6客户端想要访问IPv4服务器（如 example.com，IPv4地址为 93.184.216.34）
2. 客户端向DNS64服务器查询 example.com 的AAAA记录
3. DNS64发现该域名没有AAAA记录，只有A记录 93.184.216.34
4. DNS64合成IPv6地址：64:ff9b::93.184.216.34（即 64:ff9b::5DB8:D822）
5. 客户端向 64:ff9b::5DB8:D822 发送IPv6数据包
6. NAT64设备收到数据包后，提取嵌入的IPv4地址 93.184.216.34
7. NAT64将IPv6数据包转换为IPv4数据包，发送给IPv4服务器
8. IPv4服务器的响应经过NAT64反向转换回IPv6数据包

**NAT64的两种模式**：
- **有状态NAT64**：维护IPv6和IPv4地址/端口的映射表，类似IPv4 NAT，支持IPv6到IPv4的通信
- **无状态NAT64**：使用固定的地址映射规则（1:1映射），不需要维护状态表，支持双向通信

**NAT64/DNS64的适用场景**：
- 运营商部署IPv6-only接入网络，但用户仍需访问IPv4互联网
- 企业内部部署IPv6-only网络，需要访问外部IPv4服务
- 数据中心逐步迁移到IPv6-only

### NAT-PT/NAPT-PT

NAT-PT（Network Address Translation - Protocol Translation，RFC 2766）是早期的IPv6-IPv4翻译技术。它将NAT和协议翻译结合在一起。

NAT-PT的问题：
- 需要DNS ALG（Application Layer Gateway）配合，对DNS进行深度包检测
- 与许多协议不兼容（如IPsec）
- 安全性较差
- 已被RFC 4966归为Historic，不推荐使用

NAT64/DNS64是NAT-PT的替代方案，设计更加合理和安全。

### 翻译技术的局限性

翻译技术并非完美的解决方案，它存在一些固有的局限：

1. **性能开销**：协议转换需要CPU处理，增加延迟
2. **应用兼容性**：某些应用在数据中嵌入IP地址（如FTP、SIP），翻译后可能失效
3. **端到端原则破坏**：翻译设备位于通信路径中间，破坏了IP协议的端到端原则
4. **日志和审计困难**：地址映射增加了追踪的复杂性

## 运营商过渡策略

运营商的IPv6过渡策略通常遵循"从核心到边缘"的思路：

### 阶段一：骨干网双栈

首先在骨干网和城域网核心设备上部署双栈。这个阶段用户侧无需改变。

### 阶段二：接入网双栈

在宽带接入网（如BRAS/SR）和移动核心网上部署双栈，为用户分配IPv6地址。用户设备开始获得全球可路由的IPv6地址。

### 阶段三：IPv6优先

逐步将用户流量迁移到IPv6。通过DNS策略、NAT64等技术，优先使用IPv6处理新增流量。

### 阶段四：IPv6-only

最终目标是全网IPv6-only，不再维护IPv4基础设施。使用NAT64/DNS64处理遗留的IPv4流量。

### DS-Lite技术

DS-Lite（Dual-Stack Lite，RFC 6333）是运营商常用的一种过渡技术。它的核心思想是：

- 在用户侧使用IPv6-only接入（不再为用户分配公网IPv4地址）
- 使用CGNAT（运营商级NAT）共享IPv4地址
- IPv4流量通过IPv6隧道传送到CGNAT设备

DS-Lite的优势：
- 节省IPv4地址（大量用户共享少量IPv4地址）
- 用户侧简化为IPv6-only
- 利用IPv6骨干网传输IPv4流量

### MAP技术

MAP（Mapping of Address and Port，RFC 7599）是另一种运营商过渡技术，它将IPv4地址和端口映射规则编码在用户的IPv6地址中，实现无状态的地址共享。

MAP-E（MAP with Encapsulation）：使用IPv6封装IPv4数据包
MAP-T（MAP with Translation）：使用NAT64风格的翻译

## 实际部署案例

### 案例一：中国电信IPv6部署

中国电信在2010年代开始大规模部署IPv6，采用双栈策略：
- 骨干网全面支持双栈
- 家庭宽带用户同时获得IPv4和IPv6地址
- 2020年后，新入网用户默认启用IPv6

### 案例二：Facebook IPv6部署

Facebook是最早大规模部署IPv6的互联网公司之一：
- 数据中心内部采用IPv6-only网络
- 使用NAT64/DNS64处理遗留的IPv4连接
- 减少了约25%的网络基础设施成本

### 案例三：苹果iOS IPv6要求

苹果从2016年起要求所有提交App Store的应用必须支持纯IPv6网络环境。这推动了大量移动应用的IPv6适配。iOS设备默认优先使用IPv6，在IPv6-only网络中通过NAT64/DNS64访问IPv4资源。

## 过渡技术选择指南

| 场景 | 推荐技术 | 原因 |
|------|---------|------|
| 新建网络 | 双栈 + IPv6优先 | 最灵活，性能最佳 |
| 纯IPv6网络访问IPv4资源 | NAT64/DNS64 | 标准化方案，安全性好 |
| 企业内网IPv6过渡 | ISATAP或手动隧道 | 可控性强 |
| 运营商接入网 | DS-Lite或MAP | 节省IPv4地址 |
| 穿越NAT的IPv6连接 | Teredo（临时方案） | 逐步被淘汰 |
| IPv6孤岛互联 | GRE隧道或手动隧道 | 简单可靠 |

## IPv6过渡的未来趋势

随着IPv4地址枯竭加剧和IPv6部署加速，过渡技术的重心正在发生变化：

1. **双栈仍是主流**：短期内双栈仍是最普遍的部署方式
2. **IPv6-only趋势明显**：大型云服务商和运营商开始推进IPv6-only网络
3. **NAT64/DNS64地位上升**：作为IPv6-only网络访问IPv4资源的标准方案
4. **隧道技术逐步退出**：6to4、Teredo等自动隧道技术已被淘汰或逐步淘汰
5. **464XLAT成为新标准**：结合无状态NAT64和客户端侧NAT，支持IPv6-only网络中需要IPv4的应用（如VoLTE）

## 总结

IPv6过渡技术是IPv6部署过程中不可避免的环节。三大过渡技术路线各有优劣：

| 技术路线 | 核心思想 | 优势 | 劣势 |
|----------|---------|------|------|
| 双栈 | 两套协议并行 | 简单、高效 | 仍需IPv4地址 |
| 隧道 | IPv6封装在IPv4中 | 穿越IPv4网络 | 性能开销、安全风险 |
| 翻译 | IPv4/IPv6协议转换 | 解决互通问题 | 兼容性、性能问题 |

实际部署中，应根据具体场景选择合适的过渡方案，或者组合使用多种技术。最终目标是实现全网IPv6-only，届时过渡技术将完成其历史使命。

## 思考题

1. 为什么6to4隧道技术被淘汰？它存在哪些根本性的问题？
2. NAT64和NAT-PT有什么区别？为什么NAT64能取代NAT-PT？
3. 运营商选择DS-Lite技术的核心动机是什么？`,
  quizzes: [
    {
      id: 'quiz-46-01',
      type: 'choice',
      question: '以下哪种过渡技术能够穿越NAT设备建立IPv6连接？',
      options: ['6to4隧道', '手动隧道', 'Teredo隧道', 'GRE隧道'],
      answer: 'C',
      explanation: 'Teredo隧道将IPv6数据包封装在UDP数据报中传输，由于NAT设备将UDP视为普通流量进行地址端口转换，因此Teredo能够穿越NAT设备。6to4、手动隧道和GRE都直接封装在IPv4中，无法穿越NAT。'
    },
    {
      id: 'quiz-46-02',
      type: 'choice',
      question: 'NAT64/DNS64技术中，DNS64的作用是什么？',
      options: ['将IPv6地址转换为IPv4地址', '将IPv4地址合成为IPv6地址', '将DNS查询从IPv6转换为IPv4', '将域名解析为IPv6地址'],
      answer: 'B',
      explanation: 'DNS64在IPv6客户端查询只有A记录（IPv4地址）的域名时，将IPv4地址合成为带有64:ff9b::/96前缀的IPv6地址，使得IPv6客户端可以将数据包发送到NAT64设备进行协议转换。'
    },
    {
      id: 'quiz-46-03',
      type: 'fill',
      question: '双栈技术的核心思想是让网络设备同时运行____和____两套协议栈。',
      answer: ['IPv4', 'IPv6'],
      explanation: '双栈技术（Dual Stack）让设备同时配置IPv4地址和IPv6地址，同时运行两套协议栈，根据DNS解析结果自动选择使用哪种协议进行通信。它是IPv6过渡最基础、最重要的技术。'
    },
    {
      id: 'quiz-46-04',
      type: 'short-answer',
      question: '简述6to4隧道技术的工作原理，以及为什么它被淘汰。',
      answer: '6to4使用2002::/16前缀，将隧道端点的IPv4地址嵌入IPv6地址中（2002:IPv4地址::/48），路由器自动从目的IPv6地址中提取IPv4地址作为隧道封装的目的地址，实现自动隧道建立。6to4被淘汰的原因：（1）依赖6to4中继路由器，而公共中继性能不稳定且难以控制；（2）容易受到中间人攻击，安全性差；（3）在NAT环境下无法工作；（4）IPv6原生部署的加速使得隧道技术的需求减少。RFC 7526已将6to4归为Historic状态。',
      explanation: '6to4是早期重要的自动隧道技术，但其设计中的安全和性能问题使其不再适合现代网络环境。随着原生IPv6部署的普及，隧道技术整体正在被边缘化。'
    }
  ],
  references: [
    'RFC 3056 - Connection of IPv6 Domains via IPv4 Clouds (6to4)',
    'RFC 5214 - Intra-Site Automatic Tunnel Addressing Protocol (ISATAP)',
    'RFC 4380 - Teredo: Tunneling IPv6 over UDP through Network Address Translations (NATs)',
    'RFC 6146 - Stateful NAT64: Network Address and Protocol Translation from IPv6 Clients to IPv4 Servers',
    'RFC 6147 - DNS64: DNS Extensions for Network Address Translation from IPv6 Clients to IPv4 Servers',
    'RFC 6333 - Dual-Stack Lite Broadband Deployments Following IPv4 Exhaustion',
    'RFC 7526 - Deprecating the Anycast Prefix for 6to4 Relay Routers'
  ]
};