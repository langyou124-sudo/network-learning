import { writeFileSync } from 'fs';
const dir = 'src/data/network/topics';

function w(id, varName, title, desc, content, quizzes, refs) {
  writeFileSync(`${dir}/${id}.ts`, `export const ${varName} = {
  title: ${JSON.stringify(title)},
  description: ${JSON.stringify(desc)},
  content: \`${content}\`,
  quizzes: ${quizzes},
  references: ${JSON.stringify(refs)}
};
`, 'utf8');
  console.log(`Wrote ${id}`);
}

w('topic-47','topic_47','数据中心网络架构','数据中心网络设计原则、叶脊架构、Overlay网络与流量工程',
`# 数据中心网络架构

## 开篇：为什么数据中心需要特殊设计？

一个大型数据中心可能有10万台服务器，它们之间的流量（东西向流量）远大于进出互联网的流量（南北向流量）。传统的"接入-汇聚-核心"三层架构无法高效处理这种流量模式，于是叶脊架构应运而生。

> 现代数据中心网络的核心挑战：如何让10万台服务器之间高效、可靠地通信。

## 东西向流量 vs 南北向流量

**南北向流量** — 用户到服务器的流量，进出数据中心。传统网络以这种流量为主。

**东西向流量** — 服务器之间的流量。在云计算、大数据场景下，一台服务器可能需要和数千台其他服务器通信。现代数据中心80%以上的流量是东西向。

> 流量模式的变化决定了网络架构的变化。三层架构为南北向设计，叶脊架构为东西向设计。

## 叶脊架构详解

### 基本结构

- **叶交换机** — 接入层，直接连接服务器。通常放在每个机架顶部（TOR交换机）。
- **脊交换机** — 骨干层，连接所有叶交换机。

### 关键设计原则

1. **全网状互联** — 每个叶交换机连接到所有脊交换机
2. **ECMP负载均衡** — 到同一目的地的多条路径同时使用
3. **无阻塞架构** — 上行带宽 ≥ 下行带宽总和
4. **水平扩展** — 需要更多带宽就加脊交换机，需要更多端口就加叶交换机

### 优势

- 任意两台服务器之间最多两跳延迟
- 所有链路活跃，无STP阻塞
- 故障域小，一台设备故障只影响直连的服务器

## Overlay网络（VXLAN）

### 为什么需要Overlay？

传统VLAN只有12位标识符（最多4096个），远不够数据中心使用。VXLAN用24位VNI（VXLAN Network Identifier），支持约1600万个虚拟网络。

### VXLAN封装

\`\`\`
原始以太网帧 → VXLAN头(8字节) → UDP头 → IP头 → 外层以太网头
\`\`\`

- **VNI（24位）** — 虚拟网络标识符，类似VLAN ID
- **VTEP（VXLAN隧道端点）** — 执行封装/解封装的设备（可以是交换机或服务器）
- **UDP端口4789** — VXLAN使用UDP传输

### Underlay与Overlay

**Underlay** — 物理网络基础设施（叶脊交换机之间的IP网络）

**Overlay** — 在物理网络上构建的虚拟网络（VXLAN隧道）

> 物理网络负责"怎么走"，虚拟网络负责"和谁通信"。

## 超大规模数据中心案例

**Google B4** — 全球数据中心互联网络，使用SDN进行流量工程，将链路利用率从30-40%提升到接近100%。

**Facebook（Meta）** — 开源了Wedge交换机和FBOSS操作系统，推动白盒交换机在数据中心的应用。

**Microsoft Azure** — SONiC（Software for Open Networking in the Cloud）开源网络操作系统。

## 本课小结

- 现代数据中心以东西向流量为主，需要扁平化架构
- 叶脊架构通过全网状互联+ECMP实现无阻塞转发
- VXLAN用24位VNI突破VLAN 4096的限制
- Overlay/Underlay分离简化了网络管理
- 超大规模数据中心引领了SDN和白盒交换机的创新`,
`[{id:'quiz-47-01',type:'choice',question:'数据中心中，服务器之间的流量称为什么？',options:['南北向流量','东西向流量','进出流量','核心流量'],answer:'B',explanation:'东西向流量是服务器之间的通信，现代数据中心80%以上流量是东西向。'},{id:'quiz-47-02',type:'choice',question:'VXLAN使用多少位的VNI标识虚拟网络？',options:['12位','16位','24位','32位'],answer:'C',explanation:'VXLAN使用24位VNI，支持约1600万个虚拟网络，远超VLAN的4096个。'},{id:'quiz-47-03',type:'fill',question:'叶脊架构中，任意两台服务器之间最多经过______跳。',answer:['两'],explanation:'叶→脊→叶，只需两跳即可到达任意服务器。'},{id:'quiz-47-04',type:'short-answer',question:'请解释叶脊架构的ECMP负载均衡如何提高网络效率。',answer:'ECMP（等价多路径）让去同一目的地的多条路径同时工作。在叶脊架构中，每个叶交换机到每个脊交换机都有一条链路，ECMP将流量分散到所有链路上，避免了STP阻塞冗余链路的问题，充分利用了所有带宽。',explanation:'ECMP是叶脊架构高效转发的关键技术。'}]`,
['RFC 7348 - Virtual eXtensible Local Area Network (VXLAN)','The Facebook Data Center Fabric','Google B4: Experience with a Globally-Deployed SDN WAN']);

w('topic-48','topic_48','虚拟化网络技术','虚拟交换机、虚拟路由器、VXLAN与网络功能虚拟化基础',
`# 虚拟化网络技术

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
`[{id:'quiz-48-01',type:'choice',question:'以下哪个是最流行的开源虚拟交换机？',options:['Cisco Nexus','Open vSwitch','Huawei CE','Juniper QFX'],answer:'B',explanation:'Open vSwitch（OVS）是最流行的开源虚拟交换机，广泛用于云平台。'},{id:'quiz-48-02',type:'choice',question:'VXLAN使用什么协议进行封装？',options:['TCP','UDP','ICMP','GRE'],answer:'B',explanation:'VXLAN使用UDP封装，目的端口4789。'},{id:'quiz-48-03',type:'fill',question:'NFV是将网络功能从专用硬件迁移到通用______服务器上。',answer:['x86'],explanation:'NFV的核心是用通用x86服务器替代专用网络硬件。'},{id:'quiz-48-04',type:'short-answer',question:'请解释VXLAN的洪泛与学习机制。',answer:'VXLAN保留以太网行为模型：当VTEP不知道目的MAC位置时，将数据包洪泛到同一VNI的所有VTEP；收到帧后学习源MAC与VTEP的映射关系。为减少洪泛，VTEP可代理ARP请求。',explanation:'洪泛与学习是以太网的基本机制，VXLAN在Overlay网络中复用了这一模型。'}]`,
['RFC 7348 - VXLAN','OVS Documentation - openvswitch.org','ETSI NFV Architecture Framework']);

w('topic-49','topic_49','容器网络与服务网格','Docker网络模型、Kubernetes网络架构、Service Mesh与Istio',
`# 容器网络与服务网格

## 开篇：容器和虚拟机的网络有什么不同？

虚拟机通过虚拟交换机连接，每台VM有独立的内核。容器共享宿主机内核，网络隔离通过Linux命名空间实现。容器的生命周期更短（秒级启停），网络方案必须更灵活。

> 容器网络的核心挑战：如何让数千个短命容器高效、可靠地通信。

## Docker网络模型

Docker提供四种网络模式：

### Bridge（桥接模式）

默认模式。Docker创建一个虚拟网桥（docker0），每个容器连接到网桥，获得独立IP。容器间通过网桥通信，与外部通过NAT通信。

### Host（主机模式）

容器直接使用宿主机的网络栈，没有网络隔离。性能最好但端口会冲突。

### Overlay（覆盖模式）

跨主机的容器通信。使用VXLAN封装，让不同主机上的容器像在同一网络中。

### None（无网络）

容器没有网络接口，完全隔离。用于不需要网络的场景。

## Kubernetes网络模型

Kubernetes对网络有三个基本要求：

1. **每个Pod一个IP** — Pod内的所有容器共享同一个IP
2. **Pod间直接通信** — 不需要NAT
3. **Node到Pod通信** — 节点可以直接访问任何Pod

### Pod内容器通信

同一个Pod内的容器共享网络命名空间，通过localhost通信。就像同一台机器上的不同进程。

### Pod间通信

不同Pod之间的通信通过CNI（容器网络接口）插件实现：

**Flannel** — 简单的Overlay方案，使用VXLAN封装

**Calico** — 基于BGP的路由方案，性能好，支持网络策略

**Cilium** — 基于eBPF的新一代方案，高性能、可观测性强

### K8s Service

Pod的IP会变（重启、扩缩容），Service提供稳定的访问入口：

| 类型 | 说明 |
|------|------|
| ClusterIP | 集群内部虚拟IP |
| NodePort | 在每个节点上暴露端口 |
| LoadBalancer | 云厂商负载均衡器 |
| ExternalName | 映射到外部DNS名 |

### Ingress控制器

七层负载均衡，根据域名和路径将流量路由到不同的Service。

## 服务网格（Service Mesh）

### 为什么需要服务网格？

微服务架构中，服务间通信变得复杂：负载均衡、重试、熔断、安全认证、可观测性。把这些功能从业务代码中抽出来，下沉到基础设施层，就是服务网格。

### Sidecar模式

每个服务Pod旁边部署一个代理（Sidecar），拦截所有出入流量：

\`\`\`
[应用容器] ←→ [Envoy Sidecar] ←→ 网络
\`\`\`

Sidecar负责：流量管理、安全（mTLS加密）、可观测性（指标、日志、追踪）。

### Istio架构

Istio是最流行的服务网格实现：

**数据平面** — Envoy代理，以Sidecar方式部署，处理所有网络流量

**控制平面** — Istiod，包含：
- **Pilot** — 流量管理配置
- **Citadel** — 证书管理和mTLS
- **Galley** — 配置验证

### 核心能力

- **流量管理** — 金丝雀发布、A/B测试、故障注入、超时重试
- **安全** — 服务间mTLS加密、细粒度授权策略
- **可观测性** — 自动收集指标、日志和分布式追踪

## 本课小结

- Docker提供Bridge/Host/Overlay/None四种网络模式
- K8s要求每个Pod一个IP，Pod间无需NAT直接通信
- CNI插件（Flannel/Calico/Cilium）实现Pod间网络
- 服务网格通过Sidecar模式将网络功能从业务代码中解耦
- Istio是最流行的服务网格，提供流量管理、安全和可观测性`,
`[{id:'quiz-49-01',type:'choice',question:'Kubernetes中，不同Pod之间通信需要什么？',options:['NAT转换','CNI插件','端口映射','VPN隧道'],answer:'B',explanation:'CNI（容器网络接口）插件负责实现Pod间的网络连通性。'},{id:'quiz-49-02',type:'choice',question:'服务网格中，处理网络流量的代理通常以什么方式部署？',options:['独立服务器','DaemonSet','Sidecar','CronJob'],answer:'C',explanation:'服务网格采用Sidecar模式，每个服务Pod旁部署一个Envoy代理。'},{id:'quiz-49-03',type:'fill',question:'Kubernetes的______提供稳定的访问入口，解决Pod IP变化的问题。',answer:['Service'],explanation:'Service为Pod提供稳定的虚拟IP，后端Pod变化不影响访问。'},{id:'quiz-49-04',type:'short-answer',question:'请解释服务网格的Sidecar模式及其优势。',answer:'Sidecar模式在每个服务Pod旁部署一个代理（如Envoy），拦截所有出入流量。代理负责负载均衡、mTLS加密、重试熔断、指标收集等网络功能。优势：业务代码无需关心网络逻辑，网络策略集中管理，可观测性自动获得。',explanation:'Sidecar模式实现了网络功能与业务逻辑的解耦。'}]`,
['Istio Documentation','Kubernetes Networking Design Proposal','Envoy Proxy Documentation']);

w('topic-50','topic_50','IPv6技术概览','IPv6的核心优势、部署现状、与IPv4的对比及未来发展趋势',
`# IPv6技术概览

## 开篇：IPv6到底好在哪里？

你可能听过"IPv6地址更多"，但这只是冰山一角。IPv6不仅地址多，还简化了报头、内置了安全、支持自动配置。它不是IPv4的简单升级，而是重新设计的网络协议。

> IPv6的六大优势：海量地址、简化报头、内置安全、自动配置、更好的QoS、消除NAT。

## IPv6的核心优势

### 海量地址空间

128位地址，约3.4×10^38个地址。够用到宇宙尽头。

### 简化报头

固定40字节，8个字段（IPv4是12个字段）。取消了校验和、分片字段，路由器处理更快。

### 内置安全

IPsec是IPv6的组成部分（虽然实际部署中不是强制的）。支持认证头（AH）和封装安全载荷（ESP）。

### 自动配置

SLAAC让设备即插即用，不需要DHCP服务器。

### 更好的QoS

流标签字段让路由器能快速识别和处理同一数据流，对实时应用（视频会议、在线游戏）友好。

### 消除NAT

每个设备都有全球唯一地址，不再需要NAT。端到端通信恢复，P2P应用、VoIP等更简单。

## 全球IPv6部署现状

### 各国进度

- **印度** — 全球领先，移动网络IPv6使用率超过70%
- **美国** — 运营商和大型互联网公司积极推进
- **中国** — 三大运营商大力部署，移动网络走在前面
- **欧洲** — 德国、比利时等国领先

### 中国的IPv6战略

中国将IPv6作为国家战略推进：
- 三大运营商骨干网全面支持IPv6
- 移动终端默认开启IPv6
- 政府网站和大型互联网应用优先改造

## IPv6-only网络

随着IPv4地址耗尽，IPv6-only（纯IPv6）网络开始出现：

**优势** — 不再维护IPv4协议栈，降低运维复杂度

**挑战** — 需要通过NAT64/DNS64访问遗留的IPv4服务

> 移动网络是IPv6-only的最佳切入点，因为新设备天然支持IPv6。

## IPv6在5G中的角色

5G网络与IPv6深度结合：

- **海量设备接入** — 5G物联网场景需要海量地址，IPv6天然支持
- **网络切片** — IPv6流标签配合SDN实现切片隔离
- **移动边缘计算** — IPv6的端到端通信简化了MEC架构

## 企业IPv6迁移策略

企业迁移到IPv6的建议步骤：

1. **评估** — 盘点现有网络设备和应用的IPv6支持情况
2. **双栈部署** — 在核心网络启用双栈
3. **应用改造** — 确保业务应用支持IPv6
4. **安全加固** — 更新防火墙规则、IDS签名
5. **逐步切换** — 从内部网络到外部服务逐步迁移

## 本课小结

- IPv6不只是地址更多，还有简化报头、内置安全、自动配置等优势
- 全球IPv6部署持续增长，中国将IPv6作为国家战略
- IPv6-only网络开始出现，移动网络是最佳切入点
- 5G与IPv6深度结合，支撑海量物联网设备
- 企业应制定渐进式IPv6迁移策略`,
`[{id:'quiz-50-01',type:'choice',question:'以下哪项不是IPv6相对于IPv4的优势？',options:['更大的地址空间','内置NAT支持','自动地址配置','简化的报头格式'],answer:'B',explanation:'IPv6的目标是消除NAT，每个设备有全球唯一地址，这是优势而非功能。'},{id:'quiz-50-02',type:'choice',question:'哪个国家的移动网络IPv6使用率全球领先？',options:['美国','中国','印度','日本'],answer:'C',explanation:'印度的移动网络IPv6使用率超过70%，全球领先。'},{id:'quiz-50-03',type:'fill',question:'5G物联网场景需要海量地址，______天然支持这一需求。',answer:['IPv6'],explanation:'IPv6的128位地址空间可以为海量物联网设备提供唯一地址。'},{id:'quiz-50-04',type:'short-answer',question:'请列举IPv6的三大核心优势，并简要说明。',answer:'1）海量地址空间：128位地址，约3.4×10^38个地址；2）简化报头：固定40字节，取消校验和等字段，路由器处理更快；3）自动配置：SLAAC让设备即插即用，不需要DHCP服务器。',explanation:'IPv6的设计从根本上解决了IPv4的地址耗尽和效率问题。'}]`,
['RFC 8200 - IPv6 Specification','中国IPv6发展状况白皮书','3GPP TR 23.501 - 5G Architecture']);

console.log('Done: topic-47 to topic-50');
