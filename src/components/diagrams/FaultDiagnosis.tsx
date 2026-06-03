'use client';

import { useState } from 'react';

interface StepDetail {
  actions: string[];
  tools: string[];
  commands: string[];
}

interface Step {
  num: number;
  name: string;
  nameEn: string;
  color: string;
  description: string;
  keyPoint: string;
  details: StepDetail;
}

interface FaultCause {
  cause: string;
  diagnostic: string;
  solution: string;
}

interface Fault {
  name: string;
  color: string;
  symptoms: string[];
  causes: FaultCause[];
}

const steps: Step[] = [
  {
    num: 1,
    name: '问题定义',
    nameEn: 'Define Problem',
    color: '#3b82f6',
    description: '明确故障现象、影响范围和发生时间。问清楚"谁、什么、何时、哪里"——哪些用户受影响？什么功能异常？什么时候开始的？在哪个区域？',
    keyPoint: '问题定义不准确，后面全白干。"网不好"不是问题定义，"10楼研发部所有人在下午2点后无法访问GitLab服务器"才是。',
    details: {
      actions: [
        '收集用户报告的故障现象，记录原话',
        '确定影响范围：单用户/单网段/全网',
        '确认故障时间线：突发还是渐进？持续性还是间歇性？',
        '区分"不能用"和"慢"——不同的故障类型',
        '检查是否有变更操作（配置变更、设备更换、软件升级）',
      ],
      tools: ['工单系统', '监控平台（Zabbix/Grafana）', '变更管理记录'],
      commands: [],
    },
  },
  {
    num: 2,
    name: '信息收集',
    nameEn: 'Gather Information',
    color: '#22c55e',
    description: '收集设备状态、日志、配置信息。使用各种show命令、ping、traceroute等工具获取第一手数据。信息越多，判断越准。',
    keyPoint: '先看设备状态，再看日志，最后抓包。不要一上来就抓包——那是最后手段。',
    details: {
      actions: [
        '检查设备接口状态（up/down、错误计数、丢包率）',
        '查看设备日志（系统日志、告警日志）',
        '检查路由表和ARP表',
        '测试连通性（ping、traceroute）',
        '检查最近的配置变更记录',
        '使用抓包工具分析数据包',
      ],
      tools: ['Wireshark', 'tcpdump', 'SNMP监控', 'Syslog服务器', 'NetFlow分析'],
      commands: [
        'ping 10.0.0.1 -t',
        'traceroute 10.0.0.1',
        'show interfaces',
        'show ip route',
        'show arp',
        'show logging',
        'show processes cpu',
        'show memory',
      ],
    },
  },
  {
    num: 3,
    name: '原因分析',
    nameEn: 'Analyze Cause',
    color: '#f97316',
    description: '基于收集到的信息，用OSI分层法或排除法逐步缩小故障范围。从物理层开始逐层排查，定位根因。',
    keyPoint: 'OSI逐层排查是最可靠的方法。物理层没问题才查数据链路层，以此类推。跳层排查容易遗漏。',
    details: {
      actions: [
        '物理层：线缆松了？光模块坏了？端口灯不亮？',
        '数据链路层：MAC地址表满？VLAN配置错？STP环路？',
        '网络层：IP冲突？路由缺失？ACL误拦？',
        '传输层：端口被占？防火墙规则？TCP连接数满？',
        '应用层：服务进程挂了？DNS解析失败？证书过期？',
      ],
      tools: ['协议分析仪', '光功率计', '电缆测试仪', '端口镜像'],
      commands: [
        'show interfaces status',
        'show mac address-table',
        'show spanning-tree',
        'show ip interface brief',
        'show access-lists',
        'show tcp brief',
        'nslookup / dig',
      ],
    },
  },
  {
    num: 4,
    name: '制定方案',
    nameEn: 'Plan Solution',
    color: '#a855f7',
    description: '根据根因制定修复方案。优先考虑临时方案恢复业务，再制定永久方案彻底解决。方案要有回退计划。',
    keyPoint: '永远准备Plan B。改配置前先备份，能回退的操作才敢做。生产环境不允许"试一试"。',
    details: {
      actions: [
        '制定临时方案：快速恢复业务（如切换备用链路）',
        '制定永久方案：彻底解决根因（如更换故障设备）',
        '评估方案风险：会不会影响其他业务？',
        '准备回退方案：如果新方案失败怎么办？',
        '确认变更窗口：是否需要在维护时间操作？',
        '通知相关方：运维、业务方、管理层',
      ],
      tools: ['变更管理系统', '风险评估模板', '操作手册'],
      commands: [],
    },
  },
  {
    num: 5,
    name: '实施方案',
    nameEn: 'Implement Fix',
    color: '#6366f1',
    description: '按照方案执行修复操作。操作前备份配置，操作过程记录每一步，操作后立即验证。',
    keyPoint: '操作一条验证一条，不要一口气改完再验证。改了没效果立即回退，别继续改别的。',
    details: {
      actions: [
        '备份当前配置（copy running-config startup-config）',
        '按步骤执行修复操作',
        '每执行一步，验证一步',
        '如果操作无效，立即执行回退方案',
        '记录操作过程和结果',
        '通知业务方确认恢复',
      ],
      tools: ['终端/SSH客户端', '配置管理工具（Ansible）', 'console线'],
      commands: [
        'copy running-config startup-config',
        'configure terminal',
        'interface range ...',
        'no shutdown / shutdown',
        'write memory',
      ],
    },
  },
  {
    num: 6,
    name: '验证结果',
    nameEn: 'Verify Result',
    color: '#0d9488',
    description: '确认故障已修复，各项指标恢复正常。不仅要验证故障本身，还要检查是否引入了新问题。',
    keyPoint: '用户说"好了"不算数，要从技术和业务两个层面验证。监控指标正常 + 用户确认可用 = 真的修好了。',
    details: {
      actions: [
        '测试故障功能是否恢复正常',
        '检查设备各项指标（CPU、内存、接口错误率）',
        '确认监控系统不再告警',
        '请用户验证业务是否正常',
        '检查是否影响了其他功能',
        '持续观察一段时间（至少30分钟）',
      ],
      tools: ['监控平台', '自动化测试脚本', '用户体验反馈'],
      commands: [
        'ping -t 目标地址',
        'show interfaces (检查错误计数是否归零)',
        'show processes cpu',
        'show memory statistics',
      ],
    },
  },
  {
    num: 7,
    name: '记录归档',
    nameEn: 'Document & Archive',
    color: '#6b7280',
    description: '将故障处理过程记录到知识库，包括故障现象、根因、修复方案、经验教训。为下次类似故障提供参考。',
    keyPoint: '好记性不如烂笔头。今天花了3小时排查的问题，记录下来后下次可能10分钟就搞定。',
    details: {
      actions: [
        '编写故障报告：时间线、现象、根因、修复过程',
        '更新知识库/FAQ：添加新的故障排查条目',
        '提出预防建议：能否通过监控提前发现？能否通过冗余避免？',
        '更新操作手册：如果流程有改进',
        '关闭工单：通知相关人员',
      ],
      tools: ['知识库系统（Confluence/Wiki）', '工单系统', '故障报告模板'],
      commands: [],
    },
  },
];

const faults: Fault[] = [
  {
    name: '网络不通',
    color: '#ef4444',
    symptoms: ['完全无法访问目标主机', 'ping超时或请求超时', '浏览器显示"无法连接到服务器"', 'SSH连接超时'],
    causes: [
      { cause: '物理链路故障', diagnostic: '检查网线是否松动、光模块是否亮灯。show interfaces查看接口状态是否为up。', solution: '重新插拔网线/光纤。更换线缆或光模块。检查对端设备端口是否正常。' },
      { cause: 'IP地址配置错误', diagnostic: 'show ip interface brief检查IP是否正确。对比设计文档。检查子网掩码是否匹配。', solution: '修正IP地址配置。检查DHCP服务器是否正常分配地址。' },
      { cause: '路由缺失', diagnostic: 'show ip route检查是否有到达目标网络的路由条目。traceroute看在哪一跳中断。', solution: '添加静态路由或检查动态路由协议（OSPF/BGP）邻居是否正常建立。' },
      { cause: 'ACL/防火墙拦截', diagnostic: 'show access-lists查看是否有匹配的拒绝规则。检查防火墙日志。', solution: '调整ACL规则，添加允许规则。检查防火墙策略是否正确。' },
      { cause: 'VLAN配置错误', diagnostic: 'show vlan brief检查端口是否在正确的VLAN。show interfaces trunk检查Trunk链路是否放行了目标VLAN。', solution: '修正VLAN分配。在Trunk链路上添加缺失的VLAN。' },
    ],
  },
  {
    name: '速度慢',
    color: '#f97316',
    symptoms: ['网页加载缓慢但能打开', '文件传输速度远低于预期', '视频卡顿缓冲', '应用响应延迟高'],
    causes: [
      { cause: '带宽拥塞', diagnostic: 'show interfaces查看接口利用率是否超过70%。检查是否有异常大流量（可能是备份任务或P2P）。', solution: '升级带宽。实施QoS策略优先保障关键业务。限制非关键流量。' },
      { cause: '双工不匹配', diagnostic: 'show interfaces查看端口双工模式。一端全双工一端半双工会导致大量冲突和重传。', solution: '两端都设置为auto-negotiation或手动统一为全双工。' },
      { cause: 'DNS解析慢', diagnostic: 'ping IP地址快但ping域名慢 = DNS问题。nslookup测试DNS服务器响应时间。', solution: '更换DNS服务器（如使用114.114.114.114或8.8.8.8）。检查本地DNS缓存。' },
      { cause: 'MTU不匹配导致分片', diagnostic: 'ping目标地址 -l 1472 -f（Windows）测试MTU。如果返回"需要分片但DF置位"则MTU有问题。', solution: '统一MTU设置。检查VPN隧道的MTU（通常需要减小到1400左右）。' },
      { cause: '设备性能瓶颈', diagnostic: 'show processes cpu检查CPU利用率。show memory检查内存使用。高CPU会导致转发延迟。', solution: '减少不必要的服务。升级设备硬件。优化路由表大小。' },
    ],
  },
  {
    name: '丢包',
    color: '#a855f7',
    symptoms: ['ping有间歇性超时', 'TCP重传导致速度波动', '语音通话断断续续', '远程桌面操作卡顿'],
    causes: [
      { cause: '链路质量差', diagnostic: 'show interfaces查看CRC错误、input errors、output errors。持续增长的错误计数说明链路有问题。', solution: '更换网线/光纤。检查光模块功率（用光功率计测量）。检查接头是否清洁。' },
      { cause: '设备过载', diagnostic: 'show processes cpu历史。CPU超过80%时可能开始丢包。查看接口队列是否有丢弃：show interfaces | include drops。', solution: '减少设备负载。启用QoS优先处理关键流量。考虑设备升级。' },
      { cause: '环路或广播风暴', diagnostic: 'show spanning-tree检查STP状态。查看广播流量是否异常高。检查是否有环路。', solution: '排除物理环路。检查STP配置。启用环路保护功能（Loop Guard/BPDU Guard）。' },
      { cause: '缓冲区溢出', diagnostic: 'show interfaces | include buffer。查看是否有buffer failures。突发流量可能填满缓冲区。', solution: '调整缓冲区大小。实施流量整形（Traffic Shaping）平滑突发流量。' },
    ],
  },
  {
    name: 'DNS故障',
    color: '#3b82f6',
    symptoms: ['能ping通IP但无法ping域名', '浏览器显示"DNS解析失败"', '部分网站能打开部分不能', '域名解析到错误的IP地址'],
    causes: [
      { cause: 'DNS服务器不可达', diagnostic: 'nslookup测试DNS服务器。如果超时则DNS服务器不可达。检查到DNS服务器的网络连通性。', solution: '更换DNS服务器地址。检查网络到DNS服务器的路由。搭建本地DNS缓存。' },
      { cause: 'DNS缓存污染', diagnostic: 'ipconfig /displaydns（Windows）查看本地DNS缓存。检查是否有错误的解析记录。', solution: '清空DNS缓存：ipconfig /flushdns。使用DNSSEC防止DNS欺骗。' },
      { cause: 'DNS服务器配置错误', diagnostic: 'dig @DNS服务器 域名 检查DNS服务器返回的记录是否正确。对比不同DNS服务器的结果。', solution: '修正DNS记录。检查DNS区域文件配置。确认DNS服务器同步状态。' },
      { cause: '防火墙阻断DNS流量', diagnostic: '检查防火墙是否放行UDP 53端口。抓包看DNS请求是否有去有回。', solution: '在防火墙上放行UDP/TCP 53端口。检查是否有DNS过滤策略。' },
    ],
  },
];

export default function FaultDiagnosis() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [activeFault, setActiveFault] = useState<number | null>(null);
  const [activeCause, setActiveCause] = useState<string | null>(null);
  const [showOSI, setShowOSI] = useState(false);

  return (
    <div className="fault-diagnosis">
      {/* 七步诊断流程 */}
      <div className="flex flex-col gap-[3px]">
        {steps.map((step) => {
          const isActive = activeStep === step.num;
          return (
            <div key={step.num}>
              <button
                onClick={() => {
                  setActiveStep(isActive ? null : step.num);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${step.color}10, ${step.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? step.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${step.color}12` : 'none',
                  }}
                >
                  {/* 步骤号 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${step.color}, ${step.color}cc)` }}
                  >
                    {step.num}
                  </div>

                  {/* 步骤标签 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: step.color + '10', color: step.color, border: `1px solid ${step.color}20` }}
                  >
                    {step.nameEn}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? step.color : 'var(--text)' }}>
                        {step.name}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {step.description.slice(0, 45)}...
                    </div>
                  </div>

                  {/* 工具数 */}
                  <div className="hidden sm:flex flex-wrap gap-1.5 ml-4 max-w-[160px] justify-end">
                    {step.details.tools.slice(0, 2).map(t => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: step.color + '10', color: step.color, border: `1px solid ${step.color}20` }}
                      >
                        {t.length > 8 ? t.slice(0, 8) + '...' : t}
                      </span>
                    ))}
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                  style={{ background: step.color + '05', border: `1.5px solid ${step.color}20` }}
                >
                  {/* 关键要点 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: step.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: step.color }}>关键要点</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {step.keyPoint}
                    </div>
                  </div>

                  {/* 详细说明 */}
                  <div className="mb-4 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {step.description}
                  </div>

                  {/* 操作步骤 */}
                  <div className="mb-4">
                    <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>操作步骤</div>
                    <div className="space-y-1.5">
                      {step.details.actions.map((action, i) => (
                        <div key={i} className="flex items-start gap-2 text-[13px]" style={{ color: 'var(--text-secondary)' }}>
                          <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md flex-shrink-0 mt-0.5"
                            style={{ background: step.color + '10', color: step.color }}>
                            {i + 1}
                          </span>
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 常用命令 */}
                  {step.details.commands.length > 0 && (
                    <div className="mb-4">
                      <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>常用命令</div>
                      <div className="flex flex-wrap gap-1.5">
                        {step.details.commands.map(cmd => (
                          <span
                            key={cmd}
                            className="text-[11px] px-2.5 py-1 rounded-md font-mono"
                            style={{ background: 'var(--bg-warm, #f9fafb)', color: 'var(--text)', border: '1px solid var(--border)' }}
                          >
                            {cmd}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 工具 */}
                  <div>
                    <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>常用工具</div>
                    <div className="flex flex-wrap gap-1.5">
                      {step.details.tools.map(tool => (
                        <span
                          key={tool}
                          className="text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                          style={{ background: step.color + '10', color: step.color, border: `1px solid ${step.color}20` }}
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 步骤连接 */}
      <div className="mt-3 flex items-center justify-center flex-wrap gap-1 text-[11px]" style={{ color: 'var(--text-muted)' }}>
        {steps.map((s, i) => (
          <span key={s.num} className="flex items-center gap-1">
            <span className="px-2 py-0.5 rounded-md font-medium" style={{ background: s.color + '10', color: s.color }}>{s.name}</span>
            {i < steps.length - 1 && <span>→</span>}
          </span>
        ))}
      </div>

      {/* 常见故障 */}
      <div className="mt-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text)' }}>常见故障诊断</div>
        <div className="flex flex-col gap-[3px]">
          {faults.map((fault, idx) => {
            const isActive = activeFault === idx;
            return (
              <div key={idx}>
                <button
                  onClick={() => {
                    setActiveFault(isActive ? null : idx);
                    setActiveCause(null);
                  }}
                  className="w-full text-left transition-all duration-300"
                  style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
                >
                  <div
                    className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
                    style={{
                      background: isActive
                        ? `linear-gradient(135deg, ${fault.color}10, ${fault.color}05)`
                        : 'var(--surface)',
                      border: `1.5px solid ${isActive ? fault.color + '40' : 'var(--border)'}`,
                      boxShadow: isActive ? `0 4px 20px ${fault.color}12` : 'none',
                    }}
                  >
                    {/* 故障图标 */}
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${fault.color}, ${fault.color}cc)` }}
                    >
                      {idx + 1}
                    </div>

                    {/* 症状标签 */}
                    <div className="hidden sm:flex flex-wrap gap-1.5 mr-4 flex-shrink-0">
                      {fault.symptoms.slice(0, 2).map(s => (
                        <span
                          key={s}
                          className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                          style={{ background: fault.color + '10', color: fault.color, border: `1px solid ${fault.color}20` }}
                        >
                          {s.length > 10 ? s.slice(0, 10) + '...' : s}
                        </span>
                      ))}
                    </div>

                    {/* 名称 */}
                    <div className="flex-1 min-w-0">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? fault.color : 'var(--text)' }}>
                        {fault.name}
                      </span>
                      <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                        {fault.symptoms[0]}
                      </div>
                    </div>

                    {/* 原因数 */}
                    <div
                      className="text-[11px] px-2.5 py-0.5 rounded-md font-medium flex-shrink-0 hidden md:block"
                      style={{ background: fault.color + '10', color: fault.color, border: `1px solid ${fault.color}20` }}
                    >
                      {fault.causes.length} 原因
                    </div>
                  </div>
                </button>

                {/* 展开详情 */}
                {isActive && (
                  <div
                    className="mx-2 sm:mx-4 mt-1 mb-2 px-3 sm:px-5 py-5 rounded-xl"
                    style={{ background: fault.color + '05', border: `1.5px solid ${fault.color}20` }}
                  >
                    {/* 症状列表 */}
                    <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: fault.color + '08' }}>
                      <div className="text-[12px] font-semibold mb-2" style={{ color: fault.color }}>典型症状</div>
                      <div className="flex flex-wrap gap-1.5">
                        {fault.symptoms.map(s => (
                          <span
                            key={s}
                            className="text-[12px] px-2.5 py-0.5 rounded-md"
                            style={{ background: fault.color + '10', color: fault.color, border: `1px solid ${fault.color}20` }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* 可能原因 */}
                    <div className="text-[12px] font-semibold mb-2" style={{ color: 'var(--text-muted)' }}>可能原因与解决方案</div>
                    <div className="space-y-2">
                      {fault.causes.map((c, ci) => (
                        <button
                          key={ci}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveCause(activeCause === `${idx}-${ci}` ? null : `${idx}-${ci}`);
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                          style={{
                            background: activeCause === `${idx}-${ci}` ? 'var(--surface)' : 'transparent',
                            border: `1px solid ${activeCause === `${idx}-${ci}` ? fault.color + '30' : 'var(--border-light)'}`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-md" style={{ background: fault.color + '10', color: fault.color }}>
                              {ci + 1}
                            </span>
                            <span className="text-[13px] font-semibold" style={{ color: fault.color }}>{c.cause}</span>
                          </div>
                          {activeCause === `${idx}-${ci}` && (
                            <div className="mt-3 space-y-2">
                              <div className="text-[12px] px-3 py-2 rounded-md" style={{ background: '#3b82f608', border: '1px solid #3b82f6' + '15' }}>
                                <span className="font-medium" style={{ color: '#3b82f6' }}>诊断方法：</span>{' '}
                                <span style={{ color: 'var(--text-secondary)' }}>{c.diagnostic}</span>
                              </div>
                              <div className="text-[12px] px-3 py-2 rounded-md" style={{ background: '#22c55e08', border: '1px solid #22c55e' + '15' }}>
                                <span className="font-medium" style={{ color: '#22c55e' }}>解决方案：</span>{' '}
                                <span style={{ color: 'var(--text-secondary)' }}>{c.solution}</span>
                              </div>
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* OSI层排查法 */}
      <div className="mt-6 space-y-[3px]">
        <button
          onClick={() => setShowOSI(!showOSI)}
          className="w-full text-left transition-all duration-300"
        >
          <div
            className="flex items-center rounded-xl px-3 sm:px-5 py-3.5 transition-all duration-300"
            style={{
              background: showOSI ? 'linear-gradient(135deg, #ec489910, #ec489905)' : 'var(--surface)',
              border: `1.5px solid ${showOSI ? '#ec489940' : 'var(--border)'}`,
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #ec4899, #ec4899cc)' }}>
              OSI
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[15px]" style={{ color: showOSI ? '#ec4899' : 'var(--text)' }}>
                OSI 七层排查法
              </span>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                从物理层到应用层逐层排查，最系统化的故障定位方法
              </div>
            </div>
          </div>
        </button>

        {showOSI && (
          <div className="mx-4 mb-2 px-5 py-5 rounded-xl" style={{ background: '#ec489905', border: '1.5px solid #ec489920' }}>
            <div className="space-y-2">
              {[
                { layer: '7 应用层', color: '#6366f1', check: '服务进程运行中？端口监听正常？应用日志有无报错？证书是否过期？', cmd: 'netstat -an | findstr :80, telnet host port' },
                { layer: '6 表示层', color: '#8b5cf6', check: 'SSL/TLS握手成功？证书链完整？编码格式匹配？', cmd: 'openssl s_client -connect host:443' },
                { layer: '5 会话层', color: '#a855f7', check: '会话是否建立？超时设置是否合理？并发连接数是否超限？', cmd: 'netstat -s, show tcp brief' },
                { layer: '4 传输层', color: '#d946ef', check: 'TCP连接正常？端口可达？有无RST/FIN异常？防火墙是否放行端口？', cmd: 'telnet host port, netstat -an, show access-lists' },
                { layer: '3 网络层', color: '#ec4899', check: 'IP可达？路由表完整？TTL是否耗尽？ACL是否拦截？', cmd: 'ping, traceroute, show ip route, show ip interface brief' },
                { layer: '2 数据链路层', color: '#f43f5e', check: '接口up/down？MAC地址表正确？VLAN配置无误？STP状态正常？', cmd: 'show interfaces, show mac address-table, show vlan brief, show spanning-tree' },
                { layer: '1 物理层', color: '#ef4444', check: '线缆连接牢固？端口灯亮？光功率正常？设备上电？', cmd: 'show interfaces status, 物理检查线缆和指示灯' },
              ].map((item, i) => (
                <div key={i} className="px-4 py-3 rounded-lg" style={{ background: 'var(--surface)', border: `1px solid ${item.color}20` }}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[13px] font-semibold" style={{ color: item.color }}>{item.layer}</span>
                  </div>
                  <div className="text-[12px] mb-1" style={{ color: 'var(--text-secondary)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>检查点：</span>{item.check}
                  </div>
                  <div className="text-[11px] font-mono px-2.5 py-1 rounded-md inline-block" style={{ background: item.color + '08', color: item.color }}>
                    {item.cmd}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 px-4 py-3 rounded-lg" style={{ background: '#ec489908' }}>
              <div className="text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                <span className="font-semibold" style={{ color: '#ec4899' }}>排查原则：</span>
                从下往上查（物理层→应用层）。物理层最简单也最容易被忽略——先确认线缆和端口状态，再逐层往上。每通过一层，排除该层问题后才进入下一层。
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各步骤展开详情和命令 · 常见故障可展开查看诊断方法和解决方案
      </div>
    </div>
  );
}
