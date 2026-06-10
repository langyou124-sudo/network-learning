export const topic_62 = {
  title: "确定性网络与TSN",
  description: "时间敏感网络(802.1)、DetNet、帧抢占、时间同步(802.1AS)、工业互联网应用",
  content: `# 确定性网络与TSN

## 开篇：你的网络，能"准时"送达吗？

你在网上看视频，偶尔缓冲一下可以忍。但想象一下：工厂里的机器人手臂以每秒数百次的频率做精密装配，每一帧控制指令都必须**精确在 1 毫秒内到达**。差一点，产品就报废；差更多，可能伤到工人。传统以太网是"尽力而为"的——数据包在网络中排队、竞争、可能被延迟。工业和自动化场景需要的是**确定性网络**：数据包必须在规定时间内到达，没有例外。

这一课，我们来了解时间敏感网络（TSN）和确定性网络如何让以太网从"尽力而为"变为"使命必达"。

<Glossary terms="%5B%7B%22term%22%3A%22TSN%22%2C%22english%22%3A%22Time-Sensitive%20Networking%22%2C%22definition%22%3A%22%E6%97%B6%E9%97%B4%E6%95%8F%E6%84%9F%E7%BD%91%E7%BB%9C%EF%BC%8CIEEE%20802.1%E5%B7%A5%E4%BD%9C%E7%BB%84%E7%9A%84%E4%B8%80%E7%B3%BB%E5%88%97%E6%A0%87%E5%87%86%EF%BC%8C%E5%AE%9E%E7%8E%B0%E4%BB%A5%E5%A4%AA%E7%BD%91%E7%A1%AE%E5%AE%9A%E6%80%A7%E4%BC%A0%E8%BE%93%22%7D%2C%7B%22term%22%3A%22DetNet%22%2C%22english%22%3A%22Deterministic%20Networking%22%2C%22definition%22%3A%22%E7%A1%AE%E5%AE%9A%E6%80%A7%E7%BD%91%E7%BB%9C%EF%BC%8CIETF%20%E6%A0%87%E5%87%86%EF%BC%8C%E5%9C%A8%20IP%20%E5%B1%82%E5%AE%9E%E7%8E%B0%E7%A1%AE%E5%AE%9A%E6%80%A7%E8%B7%AF%E7%94%B1%E5%92%8C%E8%B0%83%E5%BA%A6%22%7D%2C%7B%22term%22%3A%22802.1AS%22%2C%22english%22%3A%22IEEE%20802.1AS%20-%20Timing%20and%20Synchronization%22%2C%22definition%22%3A%22%E7%B2%BE%E7%A1%AE%E6%97%B6%E9%97%B4%E5%90%8C%E6%AD%A5%E5%8D%8F%E8%AE%AE%EF%BC%8C%E4%B8%BA%20TSN%20%E7%BD%91%E7%BB%9C%E6%8F%90%E4%BE%9B%E4%BA%B2%E7%A7%91%E7%BA%A7%E6%97%B6%E9%97%B4%E5%90%8C%E6%AD%A5%22%7D%2C%7B%22term%22%3A%22%E5%B8%A7%E6%8A%A2%E5%8D%A0%22%2C%22english%22%3A%22Frame%20Preemption%22%2C%22definition%22%3A%22%E5%B8%A7%E6%8A%A2%E5%8D%A0%EF%BC%8C%E5%85%81%E8%AE%B8%E9%AB%98%E4%BC%98%E5%85%88%E7%BA%A7%E5%B8%A7%E6%89%93%E6%96%AD%E4%BD%8E%E4%BC%98%E5%85%88%E7%BA%A7%E5%B8%A7%E7%9A%84%E5%8F%91%E9%80%81%22%7D%2C%7B%22term%22%3A%22802.1Qbv%22%2C%22english%22%3A%22IEEE%20802.1Qbv%20-%20Enhanced%20Scheduled%20Traffic%22%2C%22definition%22%3A%22%E6%97%B6%E9%97%B4%E6%84%9F%E7%9F%A5%E6%B5%81%E9%87%8F%E8%B0%83%E5%BA%A6%EF%BC%8C%E6%8C%89%E6%97%B6%E9%97%B4%E7%AA%97%E5%8F%A3%E8%B0%83%E5%BA%A6%E4%B8%8D%E5%90%8C%E4%BC%98%E5%85%88%E7%BA%A7%E7%9A%84%E6%B5%81%E9%87%8F%22%7D%2C%7B%22term%22%3A%22802.1Qcc%22%2C%22english%22%3A%22IEEE%20802.1Qcc%20-%22%2C%22definition%22%3A%22%E6%B5%81%E9%87%8F%E9%A2%84%E7%BA%A6%E5%A2%9E%E5%BC%BA%EF%BC%8C%E6%8F%90%E4%BE%9B%E6%9B%B4%E7%81%B5%E6%B4%BB%E7%9A%84%E8%B5%84%E6%BA%90%E9%A2%84%E7%BA%A6%E5%92%8C管%E7%90%86%E6%9C%BA%E5%88%B6%22%7D%5D" />

## 什么是确定性网络？

### 尽力而为 vs 确定性

传统以太网采用**尽力而为（Best-Effort）** 模式：

| 特性 | 尽力而为 | 确定性 |
|------|----------|--------|
| 时延 | 不可预测 | 可预测、有上界 |
| 丢包 | 可能发生 | 保证零丢包 |
| 抖动 | 波动大 | 极小或为零 |
| 适用场景 | 网页、邮件 | 工业控制、音视频 |
| 保障 | 无 | 有端到端 SLA |

**类比**：尽力而为像快递——"尽快送到，但不保证几点到"。确定性网络像高铁——"14:32 出发，15:07 到站，精确到分钟"。

### 确定性网络的三个指标

`,
  quizzes: [
        {
          id: 'quiz-62-01',
          type: 'choice',
          question: 'TSN 中负责全网设备时钟同步的标准是哪个？',
          options: ['802.1Qbv', '802.1AS', '802.1CB', '802.1Qcc'],
          answer: 'B',
          explanation: '802.1AS 是 TSN 的精确时间同步标准，基于 PTP 协议，为全网设备提供亚微秒级的时钟同步。'
        },
        {
          id: 'quiz-62-02',
          type: 'choice',
          question: '帧抢占（Frame Preemption）技术解决的核心问题是什么？',
          options: [
            '提高整体网络吞吐量',
            '防止广播风暴',
            '减少高优先级帧被大帧阻塞的延迟',
            '实现零丢包传输'
          ],
          answer: 'C',
          explanation: '帧抢占允许高优先级帧打断正在发送的低优先级帧，避免高优先级帧因等待大帧发送完毕而产生的额外延迟。'
        },
        {
          id: 'quiz-62-03',
          type: 'fill',
          question: 'TSN 与 DetNet 的主要区别在于 TSN 工作在______层，DetNet 工作在______层。',
          answer: ['二', '三'],
          explanation: 'TSN（IEEE 802.1）工作在二层（数据链路层/以太网），DetNet（IETF）工作在三层（IP层），两者互补。'
        },
        {
          id: 'quiz-62-04',
          type: 'short-answer',
          question: '请解释 802.1Qbv 时间感知整形器（TAS）的工作原理，以及它如何保证确定性时延。',
          answer: '802.1Qbv 定义了时间感知整形器（TAS），其工作原理：(1) 将时间划分为周期性的门控循环，每个周期包含多个时间窗口；(2) 每个端口维护一组门控列表（GCL），定义每个时间窗口内各优先级队列的开/关状态；(3) 高优先级流量在专属时间窗口内独占带宽，低优先级流量在其余时间窗口传输。通过这种方式，高优先级流量不需要与其他流量竞争带宽，也不会被低优先级流量阻塞，从而保证了确定性的低时延。时间同步（802.1AS）是 TAS 工作的前提，确保全网设备在统一的时间基准上执行调度。',
          explanation: '802.1Qbv 是 TSN 实现确定性时延的核心机制，配合时间同步使用。'
        }
      ],
  references: [
        'IEEE 802.1Q-2018 - Bridges and Bridged Networks (包含 TSN 核心标准)',
        'IETF RFC 8655 - Deterministic Networking Architecture',
        'IEEE 802.1AS-2020 - Timing and Synchronization for Time-Sensitive Applications'
      ]
};
