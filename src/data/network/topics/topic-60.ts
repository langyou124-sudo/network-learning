export const topic_60 = {
  title: "Wi-Fi 6/7与下一代无线",
  description: "802.11ax(Wi-Fi 6)特性、802.11be(Wi-Fi 7)、MLO、确定性时延",
  content: `# Wi-Fi 6/7与下一代无线

## 开篇：家里十几台设备抢 Wi-Fi，为什么还是卡？

你家里可能有手机、平板、笔记本、智能电视、扫地机器人、智能音箱……十几台设备同时连着同一个 Wi-Fi。以前上网慢你可能会怪运营商，但有没有想过：问题可能出在 Wi-Fi 本身？Wi-Fi 6 和 Wi-Fi 7 带来了一系列革命性技术，彻底解决了"设备多了就卡"的问题。

这一课，我们来深入了解 Wi-Fi 6（802.11ax）和 Wi-Fi 7（802.11be）的核心技术。

<Glossary terms="%5B%7B%22term%22%3A%22OFDMA%22%2C%22english%22%3A%22Orthogonal%20Frequency%20Division%20Multiple%20Access%22%2C%22definition%22%3A%22%E6%AD%A3%E4%BA%A4%E9%A2%91%E5%88%86%E5%A4%8D%E5%A4%9A%E5%9D%80%EF%BC%8C%E5%B0%86%E4%BF%A1%E9%81%93%E6%8B%86%E6%88%90%E5%A4%9A%E4%B8%AA%E5%AD%90%E8%BD%BD%E6%B3%A2%EF%BC%8C%E5%90%8C%E6%97%B6%E4%B8%BA%E5%A4%9A%E4%B8%AA%E8%AE%BE%E5%A4%8D%E6%9C%8D%E5%8A%A1%22%7D%2C%7B%22term%22%3A%22BSS%20Coloring%22%2C%22english%22%3A%22Basic%20Service%20Set%20Coloring%22%2C%22definition%22%3A%22BSS%E7%9D%80%E8%89%B2%EF%BC%8C%E7%BB%99%E4%B8%8D%E5%90%8CAP%E7%9A%84%E6%95%B0%E6%8D%AE%E5%B8%A7%E6%A0%87%E8%AE%B0%E4%B8%8D%E5%90%8C%E9%A2%9C%E8%89%B2%EF%BC%8C%E5%87%8F%E5%B0%91%E5%90%8C%E9%A2%91%E5%B9%B2%E6%89%B0%22%7D%2C%7B%22term%22%3A%22TWT%22%2C%22english%22%3A%22Target%20Wake%20Time%22%2C%22definition%22%3A%22%E7%9B%AE%E6%A0%87%E5%94%A4%E9%86%92%E6%97%B6%E9%97%B4%EF%BC%8C%E8%AE%BE%E5%A4%87%E4%B8%8EAP%E5%8D%8F%E5%95%86%E5%94%A4%E9%86%92%E6%97%B6%E9%97%B4%EFF%BC%8C%E5%85%B6%E4%BB%96%E6%97%B6%E9%97%B4%E5%8F%AF%E4%BB%A5%E4%BC%91%E7%9C%A0%E8%8A%82%E7%9C%81%E7%94%B5%E9%87%8F%22%7D%2C%7B%22term%22%3A%22MLO%22%2C%22english%22%3A%22Multi-Link%20Operation%22%2C%22definition%22%3A%22%E5%A4%9A%E9%93%BE%E8%B7%AF%E6%93%8D%E4%BD%9C%EF%BC%8CWi-Fi%207%E6%96%B0%E6%8A%80%E6%9C%AF%EF%BC%8C%E8%AE%BE%E5%A4%87%E5%8F%AF%E5%90%8C%E6%97%B6%E9%80%9A%E8%BF%87%E5%A4%9A%E4%B8%AA%E9%A2%91%E6%AE%B5%E5%92%8C%E4%BF%A1%E9%81%93%E4%BC%A0%E8%BE%93%E6%95%B0%E6%8D%AE%22%7D%2C%7B%22term%22%3A%22MU-MIMO%22%2C%22english%22%3A%22Multi-User%20Multiple%20Input%20Multiple%20Output%22%2C%22definition%22%3A%22%E5%A4%9A%E7%94%A8%E6%88%B7%E5%A4%9A%E5%85%A5%E5%A4%9A%E5%87%BA%EF%BC%8CAP%E5%8F%AF%E5%90%8C%E6%97%B6%E4%B8%8E%E5%A4%9A%E4%B8%AA%E8%AE%BE%E5%A4%8D%E9%80%9A%E4%BF%A1%22%7D%2C%7B%22term%22%3A%221024-QAM%22%2C%22english%22%3A%221024-Quadrature%20Amplitude%20Modulation%22%2C%22definition%22%3A%221024%E6%AD%A3%E4%BA%A4%E5%B9%85%E5%BA%A6%E8%B0%83%E5%88%B6%EF%BC%8C%E6%AF%8F%E4%B8%AA%E7%AC%A6%E5%8F%B7%E6%90%BA%E5%B8%A610bit%E6%95%B0%E6%8D%AE%22%7D%2C%7B%22term%22%3A%224096-QAM%22%2C%22english%22%3A%224096-Quadrature%20Amplitude%20Modulation%22%2C%22definition%22%3A%224096%E6%AD%A3%E4%BA%A4%E5%B9%85%E5%BA%A6%E8%B0%83%E5%88%B6%EF%BC%8C%E6%AF%8F%E4%B8%AA%E7%AC%A6%E5%8F%B7%E6%90%BA%E5%B8%A612bit%E6%95%B0%E6%8D%AE%EF%BC%8C40%E2%80%9350%25%E6%8F%90%E5%8D%87%22%7D%5D" />

## Wi-Fi 标准演进总览

| 标准 | 商用名 | 年份 | 频段 | 最高速率 | 关键技术 |
|------|--------|------|------|----------|----------|
| 802.11n | Wi-Fi 4 | 2009 | 2.4/5 GHz | 600 Mbps | MIMO |
| 802.11ac | Wi-Fi 5 | 2013 | 5 GHz | 6.9 Gbps | MU-MIMO, 256-QAM |
| 802.11ax | Wi-Fi 6 | 2019 | 2.4/5/6 GHz | 9.6 Gbps | OFDMA, BSS Coloring, TWT |
| 802.11be | Wi-Fi 7 | 2024 | 2.4/5/6 GHz | 46 Gbps | MLO, 320MHz, 4096-QAM |

> Wi-Fi 6 的核心目标不是"更快"，而是在**高密度环境**下让更多设备高效共享无线资源。

## Wi-Fi 6（802.11ax）核心技术

### OFDMA：从"轮流用"到"同时用"

传统 Wi-Fi（OFDM）一次只能为一个设备发送数据，其他设备排队等待。Wi-Fi 6 引入 **OFDMA**，把信道分成多个子载波组（称为 RU，Resource Unit），**同时为多个设备服务**。

**类比**：以前 Wi-Fi 像一条单车道公路，所有车排队通过。OFDMA 把公路分成多条车道，多辆车同时通过。

`,
  quizzes: [
        {
          id: 'quiz-60-01',
          type: 'choice',
          question: 'Wi-Fi 6 引入的 OFDMA 技术最大的改进是什么？',
          options: [
            '提高了单设备的最高速率',
            '让多个设备可以同时使用不同子载波组通信',
            '增加了最大传输距离',
            '降低了设备功耗'
          ],
          answer: 'B',
          explanation: 'OFDMA 将信道拆分为多个 RU（资源单元），允许多个设备同时通信，大幅提高了高密度环境下的效率。'
        },
        {
          id: 'quiz-60-02',
          type: 'choice',
          question: 'Wi-Fi 7 最重要的创新技术是什么？',
          options: ['BSS Coloring', 'TWT', 'MLO（多链路操作）', 'OFDMA'],
          answer: 'C',
          explanation: 'MLO（Multi-Link Operation）是 Wi-Fi 7 最核心的创新，允许设备同时通过多个频段和信道通信，实现高吞吐量和确定性低时延。'
        },
        {
          id: 'quiz-60-03',
          type: 'fill',
          question: 'Wi-Fi 7 支持的最大信道带宽为______MHz。',
          answer: ['320'],
          explanation: 'Wi-Fi 7（802.11be）支持最大 320 MHz 信道带宽，是 Wi-Fi 6（160 MHz）的两倍。'
        },
        {
          id: 'quiz-60-04',
          type: 'short-answer',
          question: '请解释 Wi-Fi 6 的 BSS Coloring 技术是如何解决同频干扰问题的。',
          answer: 'BSS Coloring 为每个 BSS 分配一个颜色标记（0-7）。当设备收到无线帧时，检查帧中的颜色标记：如果颜色与自己所属 BSS 的颜色相同，说明是自己网络的信号，正常处理；如果颜色不同，说明是邻近 BSS 的干扰信号，可以选择忽略、降低优先级处理或退避等待。这样无需复杂的频率规划，就能在密集部署环境下有效减少同频干扰，提高空间复用效率。',
          explanation: 'BSS Coloring 是 Wi-Fi 6 解决密集部署干扰的关键技术，原理简单但效果显著。'
        }
      ],
  references: [
        'IEEE 802.11ax-2021 - Enhancements for High-Efficiency WLAN',
        'IEEE 802.11be Draft - Extremely High Throughput (EHT)',
        'Wi-Fi Alliance - Wi-Fi 6/7 Technology Overview'
      ]
};
