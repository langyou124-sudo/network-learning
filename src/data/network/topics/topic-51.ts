export const topic_51 = {
  title: "SDN架构与原理",
  description: "控制/数据平面分离、OpenFlow协议、SDN控制器、南向/北向API、集中式vs分布式控制",
  content: `# SDN架构与原理

## 开篇：谁在真正"开车"？

你坐过网约车吧？司机负责踩油门、打方向盘（转发数据包），而手机上的导航App负责规划最优路线（决定数据怎么走）。这就是**控制平面和数据平面分离**的日常类比。

传统网络里，每台交换机/路由器既是"司机"又是"导航"——它自己决定数据包往哪转发。这就像每辆车都装了一个独立导航，而且彼此不共享路况信息。当网络变大时，这种"各自为政"的方式就会出大问题。

**SDN（Software-Defined Networking，软件定义网络）** 的核心思想就是：把"导航"从"车"上拆出来，交给一个中央大脑统一调度。

这一课，我们来深入理解 SDN 的架构、原理和核心组件。

<Glossary terms="%5B%7B%22term%22%3A%22SDN%22%2C%22english%22%3A%22Software-Defined%20Networking%22%2C%22definition%22%3A%22%E8%BD%AF%E4%BB%B6%E5%AE%9A%E4%B9%89%E7%BD%91%E7%BB%9C%EF%BC%8C%E9%80%9A%E8%BF%87%E5%B0%86%E6%8E%A7%E5%88%B6%E5%B9%B3%E9%9D%A2%E4%B8%8E%E6%95%B0%E6%8D%AE%E5%B9%B3%E9%9D%A2%E5%88%86%E7%A6%BB%EF%BC%8C%E5%AE%9E%E7%8E%B0%E7%BD%91%E7%BB%9C%E7%BC%96%E7%A8%8B%E7%9A%84%E9%9B%86%E4%B8%AD%E6%8E%A7%E5%88%B6%22%7D%2C%7B%22term%22%3A%22%E6%8E%A7%E5%88%B6%E5%B9%B3%E9%9D%A2%22%2C%22english%22%3A%22Control%20Plane%22%2C%22definition%22%3A%22%E6%8E%A7%E5%88%B6%E5%B9%B3%E9%9D%A2%EF%BC%8C%E8%B4%9F%E8%B4%A3%E7%BD%91%E7%BB%9C%E6%8B%93%E6%89%91%E5%86%B3%E7%AD%96%E3%80%81%E8%B7%AF%E7%94%B1%E8%AE%A1%E7%AE%97%E7%AD%89%E9%80%BB%E8%BE%91%E5%8A%9F%E8%83%BD%22%7D%2C%7B%22term%22%3A%22%E6%95%B0%E6%8D%AE%E5%B9%B3%E9%9D%A2%22%2C%22english%22%3A%22Data%20Plane%22%2C%22definition%22%3A%22%E6%95%B0%E6%8D%AE%E5%B9%B3%E9%9D%A2%EF%BC%8C%E8%B4%9F%E8%B4%A3%E6%8D%AE%E6%8D%AE%E5%8C%85%E7%9A%84%E5%AE%9E%E9%99%85%E8%BD%AC%E5%8F%91%EF%BC%8C%E4%B9%9F%E7%A7%B0%E8%BD%AC%E5%8F%91%E5%B9%B3%E9%9D%A2%22%7D%2C%7B%22term%22%3A%22OpenFlow%22%2C%22english%22%3A%22OpenFlow%20Protocol%22%2C%22definition%22%3A%22%E5%BC%80%E6%94%BE%E6%B5%81%E5%8D%8F%E8%AE%AE%EF%BC%8CSDN%E6%9C%80%E9%87%8D%E8%A6%81%E7%9A%84%E5%8D%97%E5%90%91%E6%8E%A5%E5%8F%A3%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%94%A8%E4%BA%8E%E6%8E%A7%E5%88%B6%E5%99%A8%E4%B8%8E%E4%BA%A4%E6%8D%A2%E6%9C%BA%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1%22%7D%2C%7B%22term%22%3A%22%E5%8D%97%E5%90%91API%22%2C%22english%22%3A%22Southbound%20API%22%2C%22definition%22%3A%22%E5%8D%97%E5%90%91%E6%8E%A5%E5%8F%A3%EF%BC%8C%E6%8E%A7%E5%88%B6%E5%99%A8%E4%B8%8E%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%E4%B9%8B%E9%97%B4%E7%9A%84%E9%80%9A%E4%BF%A1%E6%8E%A5%E5%8F%A3%EF%BC%8C%E5%A6%82OpenFlow%22%7D%2C%7B%22term%22%3A%22%E5%8C%97%E5%90%91API%22%2C%22english%22%3A%22Northbound%20API%22%2C%22definition%22%3A%22%E5%8C%97%E5%90%91%E6%8E%A5%E5%8F%A3%EF%BC%8C%E6%8E%A7%E5%88%B6%E5%99%A8%E4%B8%8A%E5%B1%82%E5%BA%94%E7%94%A8%E4%B9%8B%E9%97%B4%E7%9A%84%E6%8E%A5%E5%8F%A3%EF%BC%8C%E9%80%9A%E5%B8%B8%E6%98%AFRESTful%22%7D%5D" />

## 传统网络的问题

### 传统网络的"分布式困境"

在传统网络中，每台设备都是自治的：

`,
  quizzes: [
        {
          id: 'quiz-51-01',
          type: 'choice',
          question: 'SDN 的核心创新是什么？',
          options: ['提高物理带宽', '控制平面与数据平面分离', '使用光纤替代铜线', '增加路由器端口数量'],
          answer: 'B',
          explanation: 'SDN 的核心创新是将控制平面从网络设备中剥离，集中到中央控制器，实现网络的编程化控制。'
        },
        {
          id: 'quiz-51-02',
          type: 'choice',
          question: 'SDN 架构中，北向接口连接的是哪两层？',
          options: ['控制器与交换机', '应用层与控制器', '交换机与服务器', '控制器与互联网'],
          answer: 'B',
          explanation: '北向接口连接应用层和控制层，让上层应用能够调用控制器的网络功能。'
        },
        {
          id: 'quiz-51-03',
          type: 'fill',
          question: 'ONOS 控制器主要面向______级网络场景。',
          answer: '运营商',
          explanation: 'ONOS 由 ON.Lab（现为 ONF）开发，专注于运营商和企业级网络场景，具有高性能和高可用特性。'
        },
        {
          id: 'quiz-51-04',
          type: 'short-answer',
          question: '为什么实际生产环境中的 SDN 控制器通常采用分布式集群架构，而不是纯集中式？',
          answer: '纯集中式控制器存在单点故障风险——如果控制器宕机，整个网络将失去控制能力。分布式集群架构通过多个控制器实例协同工作，每个控制器管理一个域，通过东西向协议同步状态。这样既能获得全局视图实现最优决策，又能在某个控制器故障时由其他控制器接管，保证网络高可用。ONOS 和 OpenDaylight 都采用这种架构。',
          explanation: '分布式集群架构解决了SDN控制器的单点故障问题，是生产环境的必选方案。'
        }
      ],
  references: [
        'ONF, "Software-Defined Networking: The New Norm for Networks," Open Networking Foundation, 2012',
        'Diego Kreutz et al., "Software-Defined Networking: A Comprehensive Survey," Proceedings of the IEEE, 2015',
        'Thomas D. Nadeau & Ken Gray, "SDN: Software Defined Networks," O\'Reilly Media, 2013'
      ]
};
