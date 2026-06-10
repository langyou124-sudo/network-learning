export const topic_54 = {
  title: "SDN/NFV应用场景",
  description: "数据中心网络虚拟化、广域网优化(SD-WAN)、5G核心网、运营商网络、白盒交换机",
  content: `# SDN/NFV应用场景

## 开篇：你手机上的5G信号，背后是谁在调度？

你用手机刷视频时，有没有想过：信号从基站发出后，是怎么到达互联网的？中间经过了多少设备？这些设备是物理的还是虚拟的？

答案可能会让你惊讶：在现代 5G 网络中，很多"路由器"和"防火墙"其实只是运行在服务器上的**软件实例**。SDN 和 NFV 已经从论文里的概念，变成了运营商网络的日常基础设施。

这一课，我们来看 SDN 和 NFV 在真实世界中的主要应用场景。

<Glossary terms="%5B%7B%22term%22%3A%22SD-WAN%22%2C%22english%22%3A%22Software-Defined%20Wide%20Area%20Network%22%2C%22definition%22%3A%22%E8%BD%AF%E4%BB%B6%E5%AE%9A%E4%B9%89%E5%B9%BF%E5%9F%9F%E7%BD%91%EF%BC%8C%E5%88%A9%E7%94%A8SDN%E6%80%9D%E6%83%B3%E4%BC%98%E5%8C%96%E5%B9%BF%E5%9F%9F%E7%BD%91%E8%BF%9E%E6%8E%A5%E5%92%8C%E7%AE%A1%E7%90%86%22%7D%2C%7B%22term%22%3A%22%E7%99%BD%E7%9B%92%E4%BA%A4%E6%8D%A2%E6%9C%BA%22%2C%22english%22%3A%22White-Box%20Switch%22%2C%22definition%22%3A%22%E7%99%BD%E7%9B%92%E4%BA%A4%E6%8D%A2%E6%9C%BA%EF%BC%8C%E9%80%9A%E7%94%A8%E7%A1%AC%E4%BB%B6%E5%8A%A0%E5%BC%80%E6%BA%90%E7%BD%91%E7%BB%9C%E6%93%8D%E4%BD%9C%E7%B3%BB%E7%BB%9F%E7%9A%84%E4%BA%A4%E6%8D%A2%E6%9C%BA%EF%BC%8C%E6%88%90%E6%9C%AC%E4%BD%8E%E4%BA%8E%E4%B8%93%E7%94%A8%E8%AE%BE%E5%A4%87%22%7D%2C%7B%22term%22%3A%225GC%22%2C%22english%22%3A%225G%20Core%22%2C%22definition%22%3A%225G%E6%A0%B8%E5%BF%83%E7%BD%91%EF%BC%8C%E9%87%87%E7%94%A8%E6%9C%8D%E5%8A%A1%E5%8C%BA%E7%BD%91%E6%9E%B6%E6%9E%84%EF%BC%8C%E6%B7%B7%E5%90%88%E4%BA%86SDN/NFV%E6%8A%80%E6%9C%AF%22%7D%2C%7B%22term%22%3A%22VNF%22%2C%22english%22%3A%22Virtual%20Network%20Function%22%2C%22definition%22%3A%22%E8%99%9A%E6%8B%9F%E7%BD%91%E7%BB%9C%E5%8A%9F%E8%83%BD%EF%BC%8C%E8%BF%90%E8%A1%8C%E5%9C%A8%E8%99%9A%E6%8B%9F%E6%9C%BA%E4%B8%8A%E7%9A%84%E7%BD%91%E7%BB%9C%E5%8A%9F%E8%83%BD%E5%AE%9E%E4%BE%8B%22%7D%2C%7B%22term%22%3A%22ONAP%22%2C%22english%22%3A%22Open%20Network%20Automation%20Platform%22%2C%22definition%22%3A%22%E5%BC%80%E6%94%BE%E7%BD%91%E7%BB%9C%E8%87%AA%E5%8A%A8%E5%8C%96%E5%B9%B3%E5%8F%B0%EF%BC%8CLinux%E5%9F%BA%E9%87%91%E4%BC%9A%E7%9A%84%E7%BD%91%E7%BB%9C%E7%BC%96%E6%8E%92%E5%92%8C%E7%AE%A1%E7%90%86%E5%B9%B3%E5%8F%B0%22%7D%5D" />

## 数据中心网络虚拟化

### 场景描述

数据中心是 SDN 最早落地的场景。Google 的 **B4 网络**是 SDN 大规模应用的标志性案例。

`,
  quizzes: [
        {
          id: 'quiz-54-01',
          type: 'choice',
          question: 'SD-WAN 相比传统 MPLS WAN 的最大优势是什么？',
          options: [
            '更高的物理带宽',
            '利用廉价互联网链路降低成本并实现智能选路',
            '完全替代所有专线',
            '不需要任何控制器'
          ],
          answer: 'B',
          explanation: 'SD-WAN 的核心优势是利用廉价的互联网链路替代或补充昂贵的 MPLS 专线，同时通过智能选路保证应用体验，大幅降低企业 WAN 成本。'
        },
        {
          id: 'quiz-54-02',
          type: 'choice',
          question: '5G 核心网中，哪个网元负责用户面数据转发，且在 NFV 架构中作为独立 VNF 运行？',
          options: ['AMF', 'SMF', 'UPF', 'UDM'],
          answer: 'C',
          explanation: 'UPF（User Plane Function，用户面功能）负责用户数据的实际转发，在 5G SBA 架构中作为独立 VNF 运行在通用服务器上，是 SDN 控制数据面的核心组件。'
        },
        {
          id: 'quiz-54-03',
          type: 'fill',
          question: '白盒交换机使用通用硬件加上开源网络操作系统（如______），取代传统厂商的一体化交换机。',
          answer: 'SONiC',
          explanation: 'SONiC（Software for Open Networking in the Cloud）是微软开源的网络操作系统，运行在白盒交换机上，通过 SAI（Switch Abstraction Interface）实现硬件抽象。'
        },
        {
          id: 'quiz-54-04',
          type: 'short-answer',
          question: '请解释 5G 网络切片的概念，以及 SDN 和 NFV 在网络切片中各自扮演什么角色。',
          answer: '5G 网络切片是在共享物理基础设施上创建多个逻辑独立的端到端网络，每个切片可以针对特定业务场景（如 eMBB 高带宽、URLLC 低延迟、mMTC 海量连接）进行定制优化。NFV 在切片中的角色是：通过组合不同的 VNF（如 vAMF、vSMF、vUPF）来构建每个切片的功能面，不同切片可以有不同的 VNF 组合和实例数量。SDN 在切片中的角色是：通过集中式控制器为每个切片配置独立的网络资源和转发路径，确保切片间的隔离性和各自的 QoS 要求。简单说，NFV 解决"每个切片跑什么功能"，SDN 解决"每个切片的流量怎么走"。',
          explanation: '5G 网络切片是 SDN 和 NFV 的典型融合应用场景，两者分别解决资源编排和流量调度问题。'
        }
      ],
  references: [
        'Sushant Jain et al., "B4: Traffic Engineering for Google\'s Wide Area Network," ACM SIGCOMM, 2013',
        'ETSI, "Network Functions Virtualisation (NFV); Use Cases," GS NFV 006, 2014',
        '3GPP, "System Architecture for the 5G System (5GS)," TS 23.501, 2020'
      ]
};
