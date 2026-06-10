export const topic_20 = {
  title: "DHCP协议",
  description: "DHCP工作过程、IP地址租约、DHCP中继代理",
  content: `# DHCP协议

<Glossary terms="%5B%7B%22term%22%3A%22DHCP%22%2C%22definition%22%3A%22%E5%8A%A8%E6%80%81%E4%B8%BB%E6%9C%BA%E9%85%8D%E7%BD%AE%E5%8D%8F%E8%AE%AE%EF%BC%8C%E8%87%AA%E5%8A%A8%E4%B8%BA%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%E5%88%86%E9%85%8DIP%E5%9C%B0%E5%9D%80%E5%92%8C%E7%BD%91%E7%BB%9C%E9%85%8D%E7%BD%AE%22%7D%2C%7B%22term%22%3A%22IP%E5%9C%B0%E5%9D%80%E7%A7%9F%E7%BA%A6%22%2C%22definition%22%3A%22DHCP%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%88%86%E9%85%8DIP%E5%9C%B0%E5%9D%80%E7%BB%99%E5%AE%A2%E6%88%B7%E7%AB%AF%E7%9A%84%E4%B8%B4%E6%97%B6%E4%BD%BF%E7%94%A8%E6%9D%83%EF%BC%8C%E6%9C%89%E6%97%B6%E9%97%B4%E9%99%90%E5%88%B6%22%7D%2C%7B%22term%22%3A%22DORA%22%2C%22definition%22%3A%22DHCP%E5%9B%9B%E6%AD%A5%E4%BA%A4%E4%BA%92%E8%BF%87%E7%A8%8B%EF%BC%9ADiscover%E3%80%81Offer%E3%80%81Request%E3%80%81Acknowledge%22%7D%2C%7B%22term%22%3A%22DHCP%E4%B8%AD%E7%BB%A7%E4%BB%A3%E7%90%86%22%2C%22definition%22%3A%22%E5%9C%A8%E4%B8%8D%E5%90%8C%E5%AD%90%E7%BD%91%E4%B9%8B%E9%97%B4%E8%BD%AC%E5%8F%91DHCP%E8%AF%B7%E6%B1%82%E7%9A%84%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%22%7D%2C%7B%22term%22%3A%22Discover%22%2C%22definition%22%3A%22DHCP%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%B9%BF%E6%92%AD%E5%8F%91%E9%80%81%E7%9A%84%E5%8F%91%E7%8E%B0%E6%8A%A5%E6%96%87%EF%BC%8C%E5%AF%BB%E6%89%BEDHCP%E6%9C%8D%E5%8A%A1%E5%99%A8%22%7D%2C%7B%22term%22%3A%22Offer%22%2C%22definition%22%3A%22DHCP%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%9B%9E%E5%A4%8D%E7%9A%84%E6%8F%90%E4%BE%9B%E6%8A%A5%E6%96%87%EF%BC%8C%E5%8C%85%E5%90%AB%E5%8F%AF%E7%94%A8%E7%9A%84IP%E5%9C%B0%E5%9D%80%22%7D%2C%7B%22term%22%3A%22Request%22%2C%22definition%22%3A%22DHCP%E5%AE%A2%E6%88%B7%E7%AB%AF%E5%8F%91%E9%80%81%E7%9A%84%E8%AF%B7%E6%B1%82%E6%8A%A5%E6%96%87%EF%BC%8C%E7%A1%AE%E8%AE%A4%E4%BD%BF%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%99%A8%E6%8F%90%E4%BE%9B%E7%9A%84IP%E5%9C%B0%E5%9D%80%22%7D%2C%7B%22term%22%3A%22Acknowledge%22%2C%22definition%22%3A%22DHCP%E6%9C%8D%E5%8A%A1%E5%99%A8%E5%8F%91%E9%80%81%E7%9A%84%E7%A1%AE%E8%AE%A4%E6%8A%A5%E6%96%87%EF%BC%8C%E5%AE%8C%E6%88%90IP%E5%9C%B0%E5%9D%80%E5%88%86%E9%85%8D%22%7D%5D" />

## 引入：自动配置网络参数

想象一下你管理一个有500台电脑的公司网络。如果每台电脑都需要手动配置IP地址、子网掩码、默认网关和DNS服务器地址，工作量会非常大。而且手动配置容易出错——两个电脑配了相同的IP地址就会冲突，导致都无法上网。

DHCP（Dynamic Host Configuration Protocol，动态主机配置协议）就是解决这个问题的协议。它能够自动为网络中的设备分配IP地址和其他网络配置参数，大大简化了网络管理。

当你连接到Wi-Fi或插入网线时，电脑会自动获取IP地址并能够上网——这就是DHCP在幕后工作。

## DHCP的工作过程

DHCP使用客户端-服务器模型。客户端是需要获取IP地址的设备（如电脑、手机），服务器是负责分配IP地址的设备（可以是专用的DHCP服务器，也可以是路由器）。

DHCP的工作过程被称为DORA过程，由四个步骤组成：

第一步：Discover（发现）。客户端启动后，由于还没有IP地址，它使用0.0.0.0作为源地址，255.255.255.255作为目的地址，广播发送Discover报文。这个报文的意思是"有没有DHCP服务器？我需要一个IP地址"。

第二步：Offer（提供）。网络中的DHCP服务器收到Discover报文后，从地址池中选择一个可用的IP地址，广播发送Offer报文。这个报文的意思是"我可以给你这个IP地址"。如果有多个DHCP服务器，客户端可能会收到多个Offer。

第三步：Request（请求）。客户端选择一个Offer（通常是第一个收到的），广播发送Request报文，告诉所有DHCP服务器它选择了哪个Offer。广播的目的是通知其他DHCP服务器"我已经选了，你们可以把之前Offer的地址收回了"。

第四步：Acknowledge（确认）。被选中的DHCP服务器发送Acknowledge报文，确认IP地址的分配。客户端收到ACK后，就可以使用这个IP地址了。

这四步完成后，客户端获得了IP地址、子网掩码、默认网关、DNS服务器等完整的网络配置参数。

## IP地址租约

DHCP分配的IP地址不是永久的，而是有时间限制的——这就是IP地址租约（Lease）。租约时间由DHCP服务器配置，通常从几小时到几天不等。

租约机制的工作流程：
1. 客户端获得IP地址时，同时获得租约时间
2. 租约时间过半时，客户端尝试续租——向服务器发送Request报文
3. 如果服务器同意，返回ACK，租约重新计时
4. 如果服务器不同意或没有响应，客户端继续使用该地址
5. 租约时间达到87.5%时，客户端再次尝试续租
6. 如果续租失败，租约到期后客户端必须释放IP地址，重新开始DORA过程

续租过程是单播的（直接发给DHCP服务器），而不是广播的，减少了网络流量。

## DHCP中继代理

在大型网络中，通常会划分多个子网。但DHCP Discover是广播报文，广播不能跨越路由器——也就是说，不同子网的客户端无法直接与DHCP服务器通信。

解决方案是使用DHCP中继代理（DHCP Relay Agent）。中继代理通常是路由器上的一个功能，它的工作是：
1. 在本地子网监听DHCP Discover报文
2. 将Discover报文以单播方式转发给指定的DHCP服务器
3. 将DHCP服务器的响应转发回客户端

使用中继代理后，一个DHCP服务器可以为多个子网的客户端分配IP地址。服务器根据中继代理的IP地址来判断客户端在哪个子网，从而分配正确的IP地址范围。

## DHCP的其他功能

除了分配IP地址，DHCP还可以提供以下配置信息：

- 子网掩码：告诉客户端网络的大小
- 默认网关：告诉客户端如何访问其他网络
- DNS服务器地址：告诉客户端使用哪个DNS服务器
- NTP服务器地址：告诉客户端使用哪个时间服务器
- TFTP服务器地址：用于无盘工作站或网络设备的配置文件下载

## DHCP安全问题

DHCP存在一些安全隐患：

DHCP耗尽攻击：攻击者伪造大量MAC地址，向DHCP服务器请求IP地址，耗尽地址池，导致正常用户无法获取IP地址。解决方案是限制每个端口的MAC地址数量。

伪造DHCP服务器：攻击者在局域网中搭建非法的DHCP服务器，向客户端提供错误的网络配置（如将网关指向攻击者的电脑）。解决方案是启用DHCP Snooping功能，只允许受信任的端口提供DHCP响应。

## 总结

DHCP是网络管理中不可或缺的协议，它通过DORA四步过程自动为客户端分配IP地址和网络配置。IP地址租约机制保证了地址的有效回收和再利用。DHCP中继代理使得一个服务器可以为多个子网提供服务。

理解DHCP的工作原理对于网络工程师来说非常重要，因为IP地址配置问题是网络故障中最常见的原因之一。`,
  quizzes: [
          {
            id: 'q20-1',
            type: 'choice',
            question: 'DHCP的四步交互过程的正确顺序是什么？',
            options: ['Discover → Offer → Acknowledge → Request', 'Discover → Request → Offer → Acknowledge', 'Discover → Offer → Request → Acknowledge', 'Request → Discover → Offer → Acknowledge'],
            answer: 'C',
            explanation: 'DHCP的四步过程（DORA）：客户端发送Discover，服务器回复Offer，客户端发送Request确认，服务器发送Acknowledge完成分配。'
          },
          {
            id: 'q20-2',
            type: 'fill',
            question: 'DHCP分配的IP地址有时间限制，这个限制称为_____。',
            answer: '租约',
            explanation: 'IP地址租约（Lease）是DHCP服务器分配给客户端的IP地址临时使用权，有时间限制，到期后需要续租或重新获取。'
          },
          {
            id: 'q20-3',
            type: 'choice',
            question: 'DHCP Discover报文使用什么目的地址？',
            options: ['DHCP服务器的IP地址', '255.255.255.255', '0.0.0.0', '默认网关地址'],
            answer: 'B',
            explanation: 'DHCP Discover是广播报文，使用255.255.255.255作为目的地址，因为客户端此时还不知道DHCP服务器的IP地址。'
          },
          {
            id: 'q20-4',
            type: 'short-answer',
            question: '为什么需要DHCP中继代理？',
            answer: '因为DHCP Discover是广播报文，不能跨越路由器。中继代理将广播转为单播转发给DHCP服务器，使得一个DHCP服务器可以为多个子网的客户端分配IP地址。',
            explanation: '中继代理通常配置在路由器上，它监听本地子网的DHCP广播，以单播方式转发给指定的DHCP服务器，再将响应转发回客户端。'
          },
          {
            id: 'q20-5',
            type: 'choice',
            question: 'DHCP租约时间过半时，客户端会做什么？',
            options: ['释放IP地址', '尝试续租', '重新发送Discover', '什么都不做'],
            answer: 'B',
            explanation: '租约时间过半时，客户端会向DHCP服务器发送Request报文尝试续租。如果续租成功，租约重新计时。'
          }
        ],
  references: ['《图解TCP/IP》第9章', 'RFC 2131 - DHCP']
};
