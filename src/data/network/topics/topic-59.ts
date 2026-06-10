export const topic_59 = {
  title: "5G核心网与边缘计算",
  description: "5G SA/NSA架构、MEC、网络切片、UPF下沉、URLLC场景",
  content: `# 5G核心网与边缘计算

## 开篇：你的手机信号，正在经历一场革命

你有没有注意到，5G 的宣传总是强调"快"——下载一部电影只要几秒。但 5G 的真正杀手锏其实不是速度，而是**超低时延**和**万物互联**。想象一下：一辆自动驾驶汽车需要在 1 毫秒内做出刹车决策，远程手术需要医生的每一个操作实时同步到千里之外的手术机器人。这些场景靠"快"是不够的，必须靠全新的网络架构来实现。

这一课，我们来拆解 5G 核心网的架构变革，以及边缘计算如何让网络"聪明地"处理数据。

<Glossary terms="%5B%7B%22term%22%3A%225G%22%2C%22english%22%3A%225th%20Generation%20Mobile%20Network%22%2C%22definition%22%3A%22%E7%AC%AC%E4%BA%94%E4%BB%A3%E7%A7%BB%E5%8A%A8%E9%80%9A%E4%BF%A1%E7%BD%91%E7%BB%9C%EF%BC%8C%E6%94%AF%E6%8C%81eMBB%2FURLLC%2FmMTC%E4%B8%89%E5%A4%A7%E5%9C%BA%E6%99%AF%22%7D%2C%7B%22term%22%3A%22SA%22%2C%22english%22%3A%22Standalone%22%2C%22definition%22%3A%22%E7%8B%AC%E7%AB%8B%E7%BB%84%E7%BD%91%EF%BC%8C5G%E6%A0%B8%E5%BF%83%E7%BD%91%E7%8B%AC%E7%AB%8B%E8%BF%90%E8%A1%8C%EF%BC%8C%E4%B8%8D%E4%BE%9D%E8%B5%964G%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%22%7D%2C%7B%22term%22%3A%22NSA%22%2C%22english%22%3A%22Non-Standalone%22%2C%22definition%22%3A%22%E9%9D%9E%E7%8B%AC%E7%AB%8B%E7%BB%84%E7%BD%91%EF%BC%8C5G%E6%8E%A7%E5%88%B6%E9%9D%A2%E4%BE%9D%E8%B5%964G%E6%A0%B8%E5%BF%83%E7%BD%91%EF%BC%8C%E6%95%B0%E6%8D%AE%E9%9D%A2%E4%BD%BF%E7%94%A85G%22%7D%2C%7B%22term%22%3A%22MEC%22%2C%22english%22%3A%22Multi-access%20Edge%20Computing%22%2C%22definition%22%3A%22%E5%A4%9A%E6%8E%A5%E5%85%A5%E8%BE%B9%E7%BC%98%E8%AE%A1%E7%AE%97%EF%BC%8C%E5%B0%86%E8%AE%A1%E7%AE%97%E5%92%8C%E5%AD%98%E5%82%A8%E6%94%BE%E5%9C%A8%E7%BD%91%E7%BB%9C%E8%BE%B9%E7%BC%98%EF%BC%8C%E5%87%8F%E5%B0%91%E6%97%B6%E5%BB%B6%22%7D%2C%7B%22term%22%3A%22%E7%BD%91%E7%BB%9C%E5%88%87%E7%89%87%22%2C%22english%22%3A%22Network%20Slicing%22%2C%22definition%22%3A%22%E5%B0%86%E7%89%A9%E7%90%86%E7%BD%91%E7%BB%9C%E8%99%9A%E6%8B%9F%E5%8C%96%E4%B8%BA%E5%A4%9A%E4%B8%AA%E9%80%BB%E8%BE%91%E7%BD%91%E7%BB%9C%EF%BC%8C%E6%AF%8F%E4%B8%AA%E5%88%87%E7%89%87%E6%BB%A1%E8%B6%B3%E4%B8%8D%E5%90%8CQoS%E9%9C%80%E6%B1%82%22%7D%2C%7B%22term%22%3A%22UPF%22%2C%22english%22%3A%22User%20Plane%20Function%22%2C%22definition%22%3A%22%E7%94%A8%E6%88%B7%E9%9D%A2%E5%8A%9F%E8%83%BD%EF%BC%8C5G%E6%A0%B8%E5%BF%83%E7%BD%91%E4%B8%AD%E8%B4%9F%E8%B4%A3%E6%95%B0%E6%8D%AE%E8%BD%AC%E5%8F%91%E5%92%8C%E8%B7%AF%E7%94%B1%22%7D%2C%7B%22term%22%3A%22URLLC%22%2C%22english%22%3A%22Ultra-Reliable%20Low-Latency%20Communication%22%2C%22definition%22%3A%22%E8%B6%85%E5%8F%AF%E9%9D%A0%E4%BD%8E%E6%97%B6%E5%BB%B6%E9%80%9A%E4%BF%A1%EF%BC%8C%E6%97%B6%E5%BB%B6%E4%BD%8E%E4%BA%8E1ms%EF%BC%8C%E5%8F%AF%E9%9D%A0%E6%80%A799.999%25%22%7D%5D" />

## 5G 的三大应用场景

ITU 为 5G 定义了三大场景，每个场景对应完全不同的技术需求：

| 场景 | 全称 | 核心指标 | 典型应用 |
|------|------|----------|----------|
| eMBB | 增强移动宽带 | 峰值 20 Gbps | 4K/8K 视频、VR/AR |
| URLLC | 超可靠低时延通信 | 时延 < 1ms，可靠性 99.999% | 自动驾驶、远程手术 |
| mMTC | 海量机器类通信 | 100 万设备/km² | 智慧城市、IoT 传感 |

> 5G 不是 4G 的"加速版"，而是一个全新的网络平台。4G 主要服务于人，5G 要同时服务于人、机器和工业。

## 5G 架构：从 NSA 到 SA

### NSA（非独立组网）

NSA 是 5G 部署的过渡方案，复用 4G 核心网：

`,
  quizzes: [
        {
          id: 'quiz-59-01',
          type: 'choice',
          question: '5G 的 URLLC 场景要求端到端时延低于多少？',
          options: ['10ms', '5ms', '1ms', '0.1ms'],
          answer: 'C',
          explanation: 'URLLC（超可靠低时延通信）要求端到端时延低于 1 毫秒，可靠性达到 99.999%。'
        },
        {
          id: 'quiz-59-02',
          type: 'choice',
          question: '以下哪种 5G 架构使用了全新的 5G 核心网（5GC）？',
          options: ['NSA Option 3', 'NSA Option 3a', 'SA', 'LTE Advanced'],
          answer: 'C',
          explanation: 'SA（独立组网）使用全新的 5G 核心网（5GC），支持网络切片和完整 5G 能力。NSA 复用 4G 核心网。'
        },
        {
          id: 'quiz-59-03',
          type: 'fill',
          question: 'MEC 的全称是 Multi-access ______ Computing。',
          answer: ['Edge'],
          explanation: 'MEC 即多接入边缘计算（Multi-access Edge Computing），将计算和存储放在网络边缘。'
        },
        {
          id: 'quiz-59-04',
          type: 'short-answer',
          question: '请解释网络切片的概念，并说明为什么运营商需要网络切片技术。',
          answer: '网络切片是在同一物理网络上创建多个逻辑隔离的虚拟网络，每个切片有独立的资源分配和 QoS 保障。运营商需要网络切片的原因：(1) 不同业务对网络的需求差异巨大，eMBB 需要大带宽，URLLC 需要低时延，mMTC 需要海量连接；(2) 如果用一张网络服务所有场景，无法满足各自的 SLA 要求；(3) 网络切片让运营商可以在同一基础设施上为不同客户提供定制化服务，提高资源利用率和商业灵活性。',
          explanation: '网络切片是 5G 区别于 4G 的核心能力之一，使一网多用成为可能。'
        }
      ],
  references: [
        '3GPP TS 23.501 - System Architecture for the 5G System',
        'ETSI MEC - Multi-access Edge Computing Framework',
        'ITU-R M.2083 - IMT Vision - Framework and Overall Objectives'
      ]
};
