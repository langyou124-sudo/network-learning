import { Module } from '@/types';

export const networkOperations: Module = {
  id: 'network-operations',
  title: '网络运维',
  description: '网络运维管理，保障网络稳定高效运行',
  icon: '🔧',
  topics: [
    {
      id: 'topic-10-01',
      moduleId: 'network-operations',
      title: '网络监控与管理',
      description: 'FCAPS、SNMP协议与网管系统',
      content: `# 网络监控与管理

## 开篇：怎么知道网络"生病"了？

你家的路由器坏了，你知道是因为上不了网。但一个有几百台设备的企业网络，怎么知道哪台设备出了问题？

这就是**网络管理**的工作——监控网络状态，发现问题，解决问题。

<Glossary terms="%5B%7B%22term%22%3A%22FCAPS%22%2C%22english%22%3A%22Fault%2C%20Configuration%2C%20Accounting%2C%20Performance%2C%20Security%22%2C%22definition%22%3A%22%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86%E4%BA%94%E5%A4%A7%E5%8A%9F%E8%83%BD%EF%BC%9A%E6%95%85%E9%9A%9C%E3%80%81%E9%85%8D%E7%BD%AE%E3%80%81%E8%AE%A1%E8%B4%B9%E3%80%81%E6%80%A7%E8%83%BD%E3%80%81%E5%AE%89%E5%85%A8%22%7D%2C%7B%22term%22%3A%22SNMP%22%2C%22english%22%3A%22Simple%20Network%20Management%20Protocol%22%2C%22definition%22%3A%22%E7%AE%80%E5%8D%95%E7%BD%91%E7%BB%9C%E7%AE%A1%E7%90%86%E5%8D%8F%E8%AE%AE%EF%BC%8C%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%E7%9B%91%E6%8E%A7%E7%9A%84%E6%A0%87%E5%87%86%E5%8D%8F%E8%AE%AE%22%7D%2C%7B%22term%22%3A%22MIB%22%2C%22english%22%3A%22Management%20Information%20Base%22%2C%22definition%22%3A%22%E7%AE%A1%E7%90%86%E4%BF%A1%E6%81%AF%E5%BA%93%EF%BC%8C%E5%AE%9A%E4%B9%89%E7%BD%91%E7%BB%9C%E8%AE%BE%E5%A4%87%E5%8F%AF%E8%A2%AB%E7%AE%A1%E7%90%86%E7%9A%84%E5%8F%98%E9%87%8F%22%7D%2C%7B%22term%22%3A%22Syslog%22%2C%22english%22%3A%22System%20Log%22%2C%22definition%22%3A%22%E7%B3%BB%E7%BB%9F%E6%97%A5%E5%BF%97%E5%8D%8F%E8%AE%AE%EF%BC%8C%E8%AE%B0%E5%BD%95%E7%BD%91%E7%BB%9C%E4%BA%8B%E4%BB%B6%22%7D%5D" />

## FCAPS：网络管理五大功能

国际标准化组织定义了网络管理的五大功能：

### F - 故障管理（Fault）

**目标**：检测、隔离、修复网络故障

**工作内容**：
- 监控设备状态（up/down）
- 接收告警（trap）
- 故障定位
- 故障修复

**类比**：医院的急诊室，发现病人→诊断→治疗。

### C - 配置管理（Configuration）

**目标**：管理和维护网络设备配置

**工作内容**：
- 备份配置
- 批量配置
- 配置变更管理
- 配置合规检查

**类比**：医院的病历管理，记录每个病人的治疗方案。

### A - 计费管理（Accounting）

**目标**：记录网络资源使用情况

**工作内容**：
- 流量统计
- 用户计费
- 资源使用报告

**类比**：水电表，记录每家用了多少水电。

### P - 性能管理（Performance）

**目标**：监控和优化网络性能

**监控指标**：
- 带宽利用率
- 延迟
- 丢包率
- 抖动

**类比**：体检，定期检查身体各项指标。

### S - 安全管理（Security）

**目标**：保护网络安全

**工作内容**：
- 访问控制
- 入侵检测
- 安全审计
- 漏洞管理

**类比**：保安，保护小区安全。

## SNMP 协议

**SNMP（简单网络管理协议）** 是网络设备监控的标准协议。

### SNMP 架构

\`\`\`
[网管站（NMS）]
      ↕ SNMP
[设备1] [设备2] [设备3]
Agent   Agent   Agent
\`\`\**

**NMS**：网络管理站，运行网管软件
**Agent**：运行在被管理设备上的代理程序

### SNMP 操作

| 操作 | 方向 | 说明 |
|------|------|------|
| Get | NMS → Agent | 获取设备信息 |
| Set | NMS → Agent | 修改设备配置 |
| Trap | Agent → NMS | 主动上报告警 |
| GetBulk | NMS → Agent | 批量获取数据 |

<Diagram type="snmp-diagram" />

### MIB 与 OID

**MIB（管理信息库）** 定义了设备可被管理的变量。

**OID（对象标识符）** 是变量的唯一标识：

\`\`\**
iso.org.dod.internet.mgmt.mib-2.system.sysName
= 1.3.6.1.2.1.1.5
\`\示例

**常用 OID**：
- 系统名称：1.3.6.1.2.1.1.5
- 接口状态：1.3.6.1.2.1.2.2.1.8
- CPU 使用率：1.3.6.1.4.1.9.9.109.1.1.1.1.3

### SNMP 版本

| 版本 | 安全性 | 特点 |
|------|--------|------|
| v1 | 低 | 团体名明文传输 |
| v2c | 低 | 支持 GetBulk |
| v3 | 高 | 支持认证和加密 |

**建议**：生产环境使用 SNMPv3。

## 网管系统

### 开源网管

**Zabbix**
- 功能全面
- 支持 SNMP、IPMI、JMX
- 告警通知灵活
- 适合中大型网络

**PRTG**
- 界面友好
- 传感器模式
- 适合小型网络

**Nagios**
- 老牌网管
- 插件丰富
- 配置复杂

### 商业网管

**SolarWinds**
- 功能强大
- 价格较高
- 适合大型企业

**Cisco DNA Center**
- 思科设备专用
- 自动化管理
- AI 分析

## 日志管理

### Syslog

**Syslog** 是网络设备日志的标准协议。

**日志级别**：

| 级别 | 名称 | 说明 |
|------|------|------|
| 0 | Emergency | 系统不可用 |
| 1 | Alert | 需要立即处理 |
| 2 | Critical | 严重条件 |
| 3 | Error | 错误条件 |
| 4 | Warning | 警告条件 |
| 5 | Notice | 正常但重要 |
| 6 | Informational | 信息 |
| 7 | Debug | 调试 |

### ELK Stack

**ELK** 是日志分析的常用组合：
- **Elasticsearch**：存储和搜索日志
- **Logstash**：收集和处理日志
- **Kibana**：可视化展示

\`\`\**
设备日志 → Logstash → Elasticsearch → Kibana
\`\示例

## 网络自动化

### 为什么需要自动化？

- 手动配置容易出错
- 批量操作效率低
- 变更管理困难

### 自动化工具

**Ansible**
- 无代理（Agentless）
- YAML 格式剧本
- 适合网络设备配置

\`\`\**
# 示例：批量配置交换机
- name: Configure VLAN
  hosts: switches
  tasks:
    - name: Create VLAN 10
      ios_config:
        lines:
          - vlan 10
          - name Finance
\`\示例

**Python 脚本**
- Netmiko：SSH 连接设备
- NAPALM：多厂商支持
- Nornir：自动化框架

## 本课小结

- **FCAPS** 是网络管理的五大功能
- **SNMP** 是网络设备监控的标准协议
- **网管系统**（Zabbix、PRTG）实现集中监控
- **Syslog** 和 **ELK** 用于日志管理
- **网络自动化**（Ansible、Python）提高运维效率`,
      quizzes: [
        {
          id: 'quiz-10-01-01',
          type: 'choice',
          question: 'FCAPS 中的 F 代表什么？',
          options: ['功能（Function）', '故障（Fault）', '频率（Frequency）', '过滤（Filter）'],
          answer: 'B',
          explanation: 'FCAPS 中的 F 代表 Fault（故障管理）。'
        },
        {
          id: 'quiz-10-01-02',
          type: 'choice',
          question: 'SNMP 中设备主动上报告警的操作是什么？',
          options: ['Get', 'Set', 'Trap', 'GetBulk'],
          answer: 'C',
          explanation: 'Trap 是 Agent 主动向 NMS 上报告警的操作。'
        },
        {
          id: 'quiz-10-01-03',
          type: 'choice',
          question: '哪个 SNMP 版本安全性最高？',
          options: ['v1', 'v2c', 'v3', '都一样'],
          answer: 'C',
          explanation: 'SNMPv3 支持认证和加密，安全性最高。'
        },
        {
          id: 'quiz-10-01-04',
          type: 'fill',
          question: '网络自动化工具______使用 YAML 格式编写剧本。',
          answer: ['Ansible'],
          explanation: 'Ansible 使用 YAML 格式编写剧本（Playbook），实现网络自动化。'
        }
      ],
      references: [
        'RFC 3411 - An Architecture for Describing SNMP Management Frameworks'
      ]
    },
    {
      id: 'topic-10-02',
      moduleId: 'network-operations',
      title: '故障排除方法论',
      description: '分层排查法、常用工具与故障处理流程',
      content: `# 故障排除方法论

## 开篇：网络出问题了怎么办？

"网断了！" "上不了网！" "网速好慢！"

作为网络工程师，你每天都会遇到各种网络问题。怎么快速定位问题、解决问题？

这一课，我们来学习系统化的故障排除方法。

<Glossary terms="%5B%7B%22term%22%3A%22%E5%88%86%E5%B1%82%E6%8E%92%E6%9F%A5%22%2C%22english%22%3A%22Layered%20Troubleshooting%22%2C%22definition%22%3A%22%E6%8C%89OSI%E5%B1%82%E6%AC%A1%E4%BB%8E%E4%B8%8B%E5%BE%80%E4%B8%8A%E6%88%96%E4%BB%8E%E4%B8%8A%E5%BE%80%E4%B8%8B%E6%8E%92%E6%9F%A5%E9%97%AE%E9%A2%98%22%7D%2C%7B%22term%22%3A%22ping%22%2C%22english%22%3A%22Packet%20Internet%20Groper%22%2C%22definition%22%3A%22ICMP%E5%B7%A5%E5%85%B7%EF%BC%8C%E6%B5%8B%E8%AF%95%E7%BD%91%E7%BB%9C%E8%BF%9E%E9%80%9A%E6%80%A7%22%7D%2C%7B%22term%22%3A%22traceroute%22%2C%22english%22%3A%22Traceroute%22%2C%22definition%22%3A%22%E8%B7%AF%E5%BE%84%E8%BF%BD%E8%B8%AA%E5%B7%A5%E5%85%B7%EF%BC%8C%E6%98%BE%E7%A4%BA%E6%95%B0%E6%8D%AE%E5%8C%85%E7%BB%8F%E8%BF%87%E7%9A%84%E8%B7%AF%E7%94%B1%E5%99%A8%22%7D%2C%7B%22term%22%3A%22Wireshark%22%2C%22english%22%3A%22Wireshark%22%2C%22definition%22%3A%22%E7%BD%91%E7%BB%9C%E6%8A%93%E5%8C%85%E5%B7%A5%E5%85%B7%EF%BC%8C%E5%88%86%E6%9E%90%E7%BD%91%E7%BB%9C%E6%95%B0%E6%8D%AE%E5%8C%85%22%7D%5D" />

<Diagram type="fault-diagnosis" />

## 分层排查法

### OSI 分层排查

按照 OSI 七层模型，**从下往上**或**从上往下**逐层排查：

\`\`\**
应用层    ← 7. 应用能用吗？
表示层    ← 6. 数据格式对吗？
会话层    ← 5. 连接建立了吗？
传输层    ← 4. 端口通吗？
网络层    ← 3. IP 能 ping 通吗？
数据链路层 ← 2. MAC 地址对吗？链路 UP 吗？
物理层    ← 1. 网线插了吗？灯亮吗？
\`\示例

### 从下往上排查（推荐）

**物理层**：
- 网线插好了吗？
- 网卡灯亮了吗？
- 光纤接好了吗？

**数据链路层**：
- 接口状态是 UP 吗？
- MAC 地址表有记录吗？
- VLAN 配置对吗？

**网络层**：
- IP 地址配置对吗？
- 能 ping 通网关吗？
- 路由表有路由吗？

**传输层**：
- 端口开放了吗？
- 防火墙允许吗？

**应用层**：
- 服务启动了吗？
- DNS 能解析吗？

## 常用工具

### ping

测试网络连通性。

\`\`\**
# 基本用法
ping 192.168.1.1

# 持续 ping
ping -t 192.168.1.1

# 指定包大小
ping -l 1000 192.168.1.1
\`\示例

**结果分析**：
- Reply from：成功
- Request timed out：超时
- Destination unreachable：不可达

### traceroute / tracert

显示数据包经过的路由器。

\`\`\**
# Windows
tracert www.baidu.com

# Linux/Mac
traceroute www.baidu.com
\`\示例

**结果分析**：
- 每一跳显示延迟
- 某一跳超时可能是防火墙或故障

### nslookup / dig

测试 DNS 解析。

\`\`\**
# nslookup
nslookup www.baidu.com

# dig（Linux）
dig www.baidu.com
\`\示例

### Wireshark

网络抓包分析工具。

**使用场景**：
- 分析协议交互
- 排查应用层问题
- 安全分析

**过滤器示例**：
\`\`\**
ip.addr == 192.168.1.1
tcp.port == 80
http.request.method == "GET"
\`\示例

### 设备诊断命令

**Cisco 设备**：
\`\`\**
show interfaces          # 查看接口状态
show ip route            # 查看路由表
show mac address-table   # 查看 MAC 表
show running-config      # 查看当前配置
show logging             # 查看日志
\`\示例

## 常见故障场景

### 场景一：无法上网

**排查步骤**：
1. 检查物理连接（网线、Wi-Fi 连接）
2. ping 网关（检查局域网连通性）
3. ping 外网 IP（如 8.8.8.8，检查路由）
4. ping 域名（如 www.baidu.com，检查 DNS）

**故障点**：
- 步骤 1 失败：物理问题
- 步骤 2 失败：局域网问题
- 步骤 3 失败：路由或 WAN 问题
- 步骤 4 失败：DNS 问题

### 场景二：网速慢

**排查步骤**：
1. 检查带宽利用率（是否跑满）
2. 检查延迟和丢包
3. 检查是否有异常流量
4. 检查设备 CPU/内存

**常见原因**：
- 带宽不足
- 网络拥塞
- 设备性能瓶颈
- 病毒或攻击

### 场景三：间歇性断网

**排查步骤**：
1. 检查物理链路（是否接触不良）
2. 检查 STP 是否有环路
3. 检查是否有 IP 冲突
4. 检查日志是否有告警

## 故障处理流程

### 标准流程

1. **记录现象**：什么时间、什么设备、什么问题
2. **收集信息**：日志、配置、监控数据
3. **分析假设**：根据信息推测可能原因
4. **验证假设**：通过测试验证推测
5. **解决问题**：实施解决方案
6. **文档记录**：记录问题和解决方法

### 文档化

**故障记录模板**：
\`\`\**
日期：2026-06-03
设备：核心交换机 SW01
现象：VLAN 10 用户无法上网
原因：VLAN 10 的 SVI 接口被 shutdown
解决：no shutdown
经验：配置变更前要检查影响范围
\`\示例

### 知识库建设

把常见问题和解决方法整理成知识库：
- 问题分类
- 排查步骤
- 解决方案
- 经验教训

## 本课小结

- **分层排查法**按 OSI 层次逐层定位问题
- **ping、traceroute、Wireshark** 是常用诊断工具
- **标准流程**：记录→收集→分析→验证→解决→文档
- **知识库**积累经验，提高排障效率`,
      quizzes: [
        {
          id: 'quiz-10-02-01',
          type: 'choice',
          question: '分层排查法通常从哪一层开始？',
          options: ['应用层', '网络层', '物理层', '传输层'],
          answer: 'C',
          explanation: '分层排查法通常从物理层开始，从下往上逐层排查。'
        },
        {
          id: 'quiz-10-02-02',
          type: 'choice',
          question: 'traceroute 命令的作用是什么？',
          options: ['测试连通性', '显示路由路径', '抓包分析', '查看配置'],
          answer: 'B',
          explanation: 'traceroute 显示数据包经过的路由器路径。'
        },
        {
          id: 'quiz-10-02-03',
          type: 'choice',
          question: '无法上网时，应该先检查什么？',
          options: ['DNS', '路由', '物理连接', '防火墙'],
          answer: 'C',
          explanation: '应该先检查物理连接（网线、Wi-Fi），这是最常见的问题。'
        },
        {
          id: 'quiz-10-02-04',
          type: 'fill',
          question: '故障处理的最后一步是______。',
          answer: ['文档记录', '文档'],
          explanation: '故障处理的最后一步是文档记录，把问题和解决方法记录下来，积累经验。'
        }
      ],
      references: [
        'Cisco Troubleshooting Guide'
      ]
    },
    {
      id: 'topic-10-03',
      moduleId: 'network-operations',
      title: '网络性能优化',
      description: 'QoS、带宽管理与负载均衡',
      content: `# 网络性能优化

## 开篇：为什么网速会变慢？

你在家看视频很流畅，但公司一开会，视频就卡了。这是因为**多人共享带宽**，当流量超过网络容量时，就会出现拥塞。

这一课，我们来学习如何优化网络性能。

<Glossary terms="%5B%7B%22term%22%3A%22QoS%22%2C%22english%22%3A%22Quality%20of%20Service%22%2C%22definition%22%3A%22%E6%9C%8D%E5%8A%A1%E8%B4%A8%E9%87%8F%EF%BC%8C%E4%B8%8D%E5%90%8C%E6%B5%81%E9%87%8F%E8%8E%B7%E5%BE%97%E4%B8%8D%E5%90%8C%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7%22%7D%2C%7B%22term%22%3A%22%E6%B5%81%E9%87%8F%E6%95%B4%E5%BD%A2%22%2C%22english%22%3A%22Traffic%20Shaping%22%2C%22definition%22%3A%22%E9%99%90%E5%88%B6%E6%B5%81%E9%87%8F%E9%80%9F%E7%8E%87%EF%BC%8C%E9%81%BF%E5%85%8D%E6%8B%A5%E5%A1%9E%22%7D%2C%7B%22term%22%3A%22%E8%B4%9F%E8%BD%BD%E5%9D%87%E8%A1%A1%22%2C%22english%22%3A%22Load%20Balancing%22%2C%22definition%22%3A%22%E6%8A%8A%E6%B5%81%E9%87%8F%E5%88%86%E6%95%A3%E5%88%B0%E5%A4%9A%E6%9D%A1%E8%B7%AF%E5%BE%84%E6%88%96%E6%9C%8D%E5%8A%A1%E5%99%A8%22%7D%2C%7B%22term%22%3A%22CDN%22%2C%22english%22%3A%22Content%20Delivery%20Network%22%2C%22definition%22%3A%22%E5%86%85%E5%AE%B9%E5%88%86%E5%8F%91%E7%BD%91%E7%BB%9C%EF%BC%8C%E6%8A%8A%E5%86%85%E5%AE%B9%E7%BC%93%E5%AD%98%E5%88%B0%E7%A6%BB%E7%94%A8%E6%88%B7%E6%9B%B4%E8%BF%91%E7%9A%84%E5%9C%B0%E6%96%B9%22%7D%5D" />

## QoS 服务质量

### 为什么需要 QoS？

网络带宽有限，当多条流量竞争时：
- 视频会议需要低延迟
- 文件下载需要高带宽
- 普通上网可以容忍一些延迟

**QoS 让不同流量获得不同的优先级。**

### QoS 四大机制

**1. 分类（Classification）**

把流量分成不同类别：
- 语音流量（最高优先级）
- 视频流量（高优先级）
- 业务流量（中优先级）
- 普通流量（低优先级）

**分类依据**：
- IP 地址
- 端口号
- DSCP 标记
- 应用类型

**2. 标记（Marking）**

给数据包打上优先级标签：

\`\`\**
DSCP 值：
- EF（46）：语音流量
- AF41（34）：视频流量
- AF21（18）：业务流量
- BE（0）：普通流量
\`\示例

**3. 队列（Queuing）**

不同优先级的流量进入不同的队列：

\`\`\**
[语音队列] ← 优先发送
[视频队列] ← 次优先
[业务队列] ← 正常
[普通队列] ← 最后发送
\`\示例

**常用队列算法**：
- PQ（优先队列）：高优先级一直发
- WFQ（加权公平队列）：按权重分配带宽
- CBWFQ（基于类的加权公平队列）：灵活配置

**4. 调度（Scheduling）**

决定哪个队列先发送：

\`\`\**调度策略：
1. 语音队列有包？→ 立即发送
2. 视频队列有包？→ 发送
3. 业务队列有包？→ 发送
4. 普通队列有包？→ 发送
\`\示例

## 带宽管理

### 流量整形（Traffic Shaping）

**限制流量速率**，避免突发流量导致拥塞。

**类比**：水库的闸门，控制水流速度。

\`\`\**
原始流量：|||||||||||||||||||| (突发)
整形后：  || || || || || (平稳)
\`\示例

### 流量监管（Traffic Poling）

**丢弃超速流量**，保证带宽不被滥用。

**类比**：超速罚款，超过限速就扣分。

### 配置示例（Cisco）

\`\`\**
# 限制接口带宽为 10Mbps
policy-map SHAPE-POLICY
  class class-default
    shape average 10000000

interface GigabitEthernet0/0
  service-policy output SHAPE-POLICY
\`\示例

## 负载均衡

### 链路负载均衡

把流量分散到多条链路：

\`\`\**
[用户] → [负载均衡器] → [链路1: 电信]
                      → [链路2: 联通]
                      → [链路3: 移动]
\`\示例

**算法**：
- 轮询：轮流使用每条链路
- 加权轮询：按权重分配
- 最小连接：选择连接数最少的链路
- 源地址哈希：同一用户走同一条链路

### 服务器负载均衡

把请求分散到多台服务器：

\`\`\**
[用户] → [负载均衡器] → [服务器1]
                      → [服务器2]
                      → [服务器3]
\`\示例

**好处**：
- 提高处理能力
- 提供冗余
- 便于扩展

## CDN 内容分发网络

### CDN 的原理

把内容**缓存到离用户更近的节点**。

\`\`\**
传统：用户 → 源站（可能很远）
CDN：  用户 → 边缘节点（很近）→ 缓存命中返回
                         → 未命中则回源站
\`\示例

### CDN 的好处

- **加速访问**：用户从就近节点获取内容
- **减轻源站压力**：大部分请求被 CDN 处理
- **提高可用性**：一个节点故障，其他节点继续服务

### CDN 应用

- 网页加速
- 视频流媒体
- 软件下载
- 游戏加速

## 网络容量规划

### 容量规划的步骤

1. **收集数据**：当前流量、增长趋势
2. **预测需求**：未来 1-3 年的带宽需求
3. **设计方案**：升级带宽、增加链路
4. **实施验证**：实施后监控效果

### 带宽计算

**公式**：
\`\`\**
所需带宽 = 峰值流量 × 冗余系数
\`\示例

**冗余系数**：通常取 1.3-1.5

### 监控指标

| 指标 | 正常范围 | 告警阈值 |
|------|----------|----------|
| 带宽利用率 | < 70% | > 80% |
| 延迟 | < 50ms | > 100ms |
| 丢包率 | < 0.1% | > 1% |
| 抖动 | < 10ms | > 30ms |

## 本课小结

- **QoS** 让不同流量获得不同优先级
- **流量整形**和**流量监管**控制带宽使用
- **负载均衡**分散流量到多条路径或多台服务器
- **CDN** 把内容缓存到离用户更近的地方
- **容量规划**预测和满足未来的带宽需求`,
      quizzes: [
        {
          id: 'quiz-10-03-01',
          type: 'choice',
          question: 'QoS 中语音流量通常标记为什么？',
          options: ['BE', 'AF21', 'AF41', 'EF'],
          answer: 'D',
          explanation: '语音流量通常标记为 EF（DSCP 46），获得最高优先级。'
        },
        {
          id: 'quiz-10-03-02',
          type: 'choice',
          question: 'CDN 的主要作用是什么？',
          options: ['加密数据', '缓存内容到就近节点', '压缩数据', '备份数据'],
          answer: 'B',
          explanation: 'CDN 把内容缓存到离用户更近的节点，加速访问。'
        },
        {
          id: 'quiz-10-03-03',
          type: 'choice',
          question: '流量整形和流量监管的区别是什么？',
          options: ['没有区别', '整形缓存超速流量，监管丢弃超速流量', '整形更安全', '监管更快'],
          answer: 'B',
          explanation: '流量整形会缓存超速流量并延迟发送，流量监管直接丢弃超速流量。'
        },
        {
          id: 'quiz-10-03-04',
          type: 'fill',
          question: '网络带宽利用率超过______时应该考虑扩容。',
          answer: ['70%', '80%'],
          explanation: '带宽利用率超过 70-80% 时应该考虑扩容，避免拥塞。'
        }
      ],
      references: [
        'RFC 2474 - Definition of the Differentiated Services Field'
      ]
    }
  ]
};
