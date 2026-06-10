export const topic_48 = {
  title: "虚拟化网络技术",
  description: "虚拟交换机、虚拟路由器、VXLAN与网络功能虚拟化基础",
  content: `# 虚拟化网络技术

## 开篇：虚拟机之间怎么通信？

一台物理服务器上运行着10个虚拟机，它们之间需要通信。以前这走的是物理交换机，现在虚拟交换机直接在服务器内部解决了。这就是虚拟化网络的基本场景。

> 虚拟化网络的核心：用软件模拟物理网络设备的功能。

## 虚拟交换机

### 什么是虚拟交换机？

虚拟交换机（vSwitch）运行在Hypervisor中，模拟物理交换机的功能。虚拟机的虚拟网卡连接到虚拟交换机，虚拟交换机负责在虚拟机之间以及虚拟机与外部网络之间转发数据包。

### Open vSwitch（OVS）

最流行的开源虚拟交换机，支持：

- **OpenFlow** — SDN协议，可通过控制器集中管理流表
- **VXLAN/GRE** — Overlay隧道封装
- **QoS** — 流量限速和优先级
- **ACL** — 访问控制
- **镜像** — 端口镜像用于抓包分析

OVS广泛用于OpenStack、Kubernetes等云平台。

### Linux Bridge

Linux内核自带的网桥功能，比OVS简单，适合小规模场景。

### OVS vs Linux Bridge

| 特性 | OVS | Linux Bridge |
|------|-----|-------------|
| 复杂度 | 高 | 低 |
| OpenFlow支持 | 支持 | 不支持 |
| VXLAN支持 | 支持 | 支持 |
| 适用场景 | 大规模云平台 | 小规模或简单场景 |

## VXLAN技术详解

VXLAN是目前最主流的Overlay技术：

### 封装格式

\`\`\`
原始帧 → VXLAN头(8B,含VNI) → UDP头 → IP头 → 外层MAC头
\`\`\`

- VXLAN头中的VNI（24位）标识虚拟网络
- UDP目的端口4789
- 外层IP头用于在Underlay网络中路由

### 洪泛与学习

VXLAN保留了传统以太网的行为模型：

1. **未知单播洪泛** — 不知道目的MAC在哪，就向同一VNI的所有VTEP洪泛
2. **MAC学习** — 收到帧后学习源MAC与VTEP的映射关系
3. **组播替代** — 用底层IP组播实现洪泛功能

### ARP代理

为了减少洪泛流量，VTEP可以代理ARP请求：如果知道目的MAC的映射，直接回复ARP，不需要洪泛。

## 网络功能虚拟化（NFV）

传统网络中的防火墙、负载均衡器、路由器都是专用硬件。NFV将这些功能软件化，运行在通用x86服务器上：

**虚拟防火墙（vFW）** — 软件实现的防火墙功能

**虚拟负载均衡器（vLB）** — 软件实现的负载均衡

**虚拟路由器（vRouter）** — 软件实现的路由功能

> NFV降低了硬件依赖，提高了部署灵活性，但性能可能不如专用硬件。

## 虚拟网络与物理网络的映射

虚拟网络运行在物理网络之上：

- **物理网络** — 叶脊架构，提供IP可达性
- **虚拟网络** — VXLAN Overlay，提供多租户隔离
- **网关** — 连接Overlay和Underlay的边界设备

> 物理网络是"公路"，虚拟网络是"车道"。多条车道共享同一条公路，但彼此隔离。

## 本课小结

- 虚拟交换机（OVS、Linux Bridge）在Hypervisor中模拟交换机功能
- OVS是最流行的开源虚拟交换机，支持OpenFlow和VXLAN
- VXLAN通过封装实现Overlay网络，24位VNI支持1600万虚拟网络
- NFV将网络功能从专用硬件迁移到通用服务器
- 物理网络提供底层连通性，虚拟网络提供多租户隔离`,
  quizzes: [{id:'quiz-48-01',type:'choice',question:'以下哪个是最流行的开源虚拟交换机？',options:['Cisco Nexus','Open vSwitch','Huawei CE','Juniper QFX'],answer:'B',explanation:'Open vSwitch（OVS）是最流行的开源虚拟交换机，广泛用于云平台。'},{id:'quiz-48-02',type:'choice',question:'VXLAN使用什么协议进行封装？',options:['TCP','UDP','ICMP','GRE'],answer:'B',explanation:'VXLAN使用UDP封装，目的端口4789。'},{id:'quiz-48-03',type:'fill',question:'NFV是将网络功能从专用硬件迁移到通用______服务器上。',answer:['x86'],explanation:'NFV的核心是用通用x86服务器替代专用网络硬件。'},{id:'quiz-48-04',type:'short-answer',question:'请解释VXLAN的洪泛与学习机制。',answer:'VXLAN保留以太网行为模型：当VTEP不知道目的MAC位置时，将数据包洪泛到同一VNI的所有VTEP；收到帧后学习源MAC与VTEP的映射关系。为减少洪泛，VTEP可代理ARP请求。',explanation:'洪泛与学习是以太网的基本机制，VXLAN在Overlay网络中复用了这一模型。'}],
  references: ["RFC 7348 - VXLAN","OVS Documentation - openvswitch.org","ETSI NFV Architecture Framework"]
};
