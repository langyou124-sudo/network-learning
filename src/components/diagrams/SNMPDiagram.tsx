'use client';

import { useState } from 'react';

interface TrapType {
  name: string;
  description: string;
}

interface Component {
  name: string;
  nameEn: string;
  color: string;
  role: string;
  details: string;
  example: string;
  keyConcept: string;
  traps?: TrapType[];
}

const components: Component[] = [
  {
    name: 'SNMP管理站',
    nameEn: 'NMS (Network Management Station)',
    color: '#3b82f6',
    role: '网络管理的核心，运行SNMP管理软件，负责监控和管理整个网络。',
    details: 'NMS通过轮询(Polling)方式定期向各设备发送SNMP请求，获取设备状态信息（CPU使用率、内存占用、接口流量、错误计数等）。也接收设备主动发送的Trap告警。大型网络通常部署多台NMS实现冗余。',
    example: 'SolarWinds NPM、PRTG Network Monitor、Zabbix、开源的Net-SNMP工具集（snmpget/snmpwalk命令）。管理员通过NMS的Web界面可以看到全网设备的实时状态仪表盘。',
    keyConcept: 'NMS使用"轮询+陷阱"双机制：定期查询设备状态（轮询），同时等待设备主动报告异常（Trap）。轮询间隔通常1-5分钟，Trap是实时的。',
  },
  {
    name: 'SNMP代理',
    nameEn: 'Agent (Embedded in Device)',
    color: '#22c55e',
    role: '嵌入在网络设备中的软件模块，响应NMS的查询请求并主动发送Trap告警。',
    details: '每个被管理的设备（路由器、交换机、服务器、打印机甚至IP摄像头）都运行一个SNMP Agent。Agent监听UDP 161端口接收请求，维护本地MIB数据，当检测到异常事件时向NMS的UDP 162端口发送Trap消息。',
    example: 'Cisco交换机内置SNMP Agent，通过`snmp-server community public RO`命令启用。Linux服务器用net-snmp软件包提供Agent功能，安装后自动监听161端口。',
    keyConcept: 'Agent是被动+主动的结合体：被动响应NMS的Get请求，主动发送Trap通知。Agent的资源消耗很小，适合嵌入到各种设备中。',
  },
  {
    name: 'MIB管理信息库',
    nameEn: 'MIB (Management Information Base)',
    color: '#a855f7',
    role: '定义了可被管理的网络对象的层次化数据库，用OID（对象标识符）标识每个变量。',
    details: 'MIB是一个树形结构的数据库，每个被管理的变量都有一个唯一的OID路径。MIB文件用ASN.1语法定义，分为标准MIB（RFC定义，如MIB-II）和私有MIB（厂商自定义）。NMS通过OID查询设备上对应的变量值。',
    example: 'OID: 1.3.6.1.2.1.1.1.0 对应 sysDescr（系统描述），查询结果可能是"Cisco IOS Software, C3750 Software..."。OID: 1.3.6.1.2.1.2.2.1.10 对应 ifInOctets（接口入流量字节数）。',
    keyConcept: 'OID就像变量的"地址"。iso(1).org(3).dod(6).internet(1).mgmt(2).mib-2(1).system(1).sysDescr(1).0 — 这串数字就是读取系统描述的完整地址。',
  },
  {
    name: 'Trap告警',
    nameEn: 'Trap (Asynchronous Notification)',
    color: '#f97316',
    role: '设备主动向NMS发送的异步通知消息，用于报告重要事件或异常状况。',
    details: 'Trap不需要NMS事先请求，设备检测到事件就立即发送。Trap消息包含：OID（事件类型）、时间戳、变量绑定列表（附加信息）。SNMPv2c引入了Inform（需要确认的Trap），NMS收到后会回复确认，确保告警不丢失。',
    example: '接口Down → 设备发送linkDown Trap → NMS收到后弹出告警并发送邮件通知管理员。温度超过阈值 → 设备发送environmental Trap → NMS记录并触发自动处理脚本。',
    keyConcept: 'Trap解决了轮询的延迟问题。轮询间隔可能是5分钟，但Trap是实时的——接口断开的瞬间NMS就知道了。但Trap用UDP发送，不保证送达，所以关键告警建议用Inform。',
    traps: [
      { name: 'coldStart', description: '设备冷启动（重新上电），所有配置重新加载' },
      { name: 'warmStart', description: '设备热启动（软重启），配置保持不变' },
      { name: 'linkDown', description: '网络接口状态变为Down，链路断开' },
      { name: 'linkUp', description: '网络接口状态恢复为Up，链路恢复' },
      { name: 'authenticationFailure', description: 'SNMP认证失败，可能是community string错误' },
      { name: 'egpNeighborLoss', description: 'EGP邻居丢失，BGP等路由协议邻居断开' },
    ],
  },
];

const oidTree = [
  { oid: '1', name: 'iso', description: 'ISO标准根节点' },
  { oid: '1.3', name: 'org', description: 'ISO认可的组织' },
  { oid: '1.3.6', name: 'dod', description: '美国国防部 (DoD)' },
  { oid: '1.3.6.1', name: 'internet', description: '互联网协议族' },
  { oid: '1.3.6.1.2', name: 'mgmt', description: '管理对象（标准MIB）' },
  { oid: '1.3.6.1.2.1', name: 'mib-2', description: 'MIB-II标准库（RFC 1213）' },
  { oid: '1.3.6.1.2.1.1', name: 'system', description: '系统信息组' },
  { oid: '1.3.6.1.2.1.1.1', name: 'sysDescr', description: '系统描述（型号、OS版本）' },
  { oid: '1.3.6.1.2.1.1.3', name: 'sysUpTime', description: '设备运行时间' },
  { oid: '1.3.6.1.2.1.2', name: 'interfaces', description: '网络接口组' },
  { oid: '1.3.6.1.2.1.2.2.1.10', name: 'ifInOctets', description: '接口入流量字节数' },
  { oid: '1.3.6.1.4', name: 'private', description: '企业私有MIB' },
  { oid: '1.3.6.1.4.1', name: 'enterprises', description: '企业自定义对象' },
  { oid: '1.3.6.1.4.1.9', name: 'cisco', description: 'Cisco私有MIB' },
];

const snmpOps = [
  { name: 'Get', direction: 'NMS → Agent', color: '#3b82f6', description: '查询指定OID的值。NMS想知道某个变量的当前值时使用。例如查询接口流量：snmpget -v2c -c public 192.168.1.1 1.3.6.1.2.1.2.2.1.10.1' },
  { name: 'GetNext', direction: 'NMS → Agent', color: '#22c55e', description: '查询指定OID的下一个值。用于遍历MIB树，snmpwalk命令底层就是反复发GetNext请求。适合批量获取某组下的所有变量。' },
  { name: 'Set', direction: 'NMS → Agent', color: '#f97316', description: '修改指定OID的值。用于远程配置设备（如关闭接口、修改描述）。需要写权限的community string。危险操作，生产环境要谨慎使用。' },
  { name: 'Response', direction: 'Agent → NMS', color: '#a855f7', description: 'Agent对Get/GetNext/Set请求的回复。包含请求的OID和对应的值，或错误状态（如noSuchName、readOnly）。' },
  { name: 'Trap', direction: 'Agent → NMS', color: '#ef4444', description: 'Agent主动发送的异步告警。不需要NMS请求，设备检测到事件就立即发送。UDP端口162。不可靠但实时性好。' },
  { name: 'Inform', direction: 'Agent → NMS', color: '#06b6d4', description: 'SNMPv2c引入的可靠Trap。NMS收到后必须回复Response确认。如果Agent没收到确认会重发。适合关键告警。' },
];

const versions = [
  {
    version: 'SNMPv1',
    color: '#ef4444',
    year: '1988',
    security: '无',
    auth: 'Community String（明文）',
    features: '基础Get/GetNext/Set/Trap操作',
    pros: '最广泛兼容，几乎所有设备支持',
    cons: '无加密、无认证，community string明文传输易被嗅探',
    community: '相当于"密码"，但以明文传输。默认值通常是"public"（只读）和"private"（读写）。任何人都可以嗅探网络获取community string。',
  },
  {
    version: 'SNMPv2c',
    color: '#f97316',
    year: '1993',
    security: '低',
    auth: 'Community String（明文）',
    features: '新增GetBulk批量查询、Inform确认机制、64位计数器',
    pros: '性能更好，GetBulk一次获取大量数据，Inform更可靠',
    cons: '安全性与v1相同，community string仍为明文',
    community: '沿用v1的community机制，增加了GetBulk操作提高大批量查询效率。是目前最广泛使用的版本。',
  },
  {
    version: 'SNMPv3',
    color: '#22c55e',
    year: '2002',
    security: '高',
    auth: 'USM用户认证 + DES/AES加密',
    features: '认证(Authentication)、加密(Privacy)、访问控制(VACM)',
    pros: '安全级别高，支持MD5/SHA认证+DES/AES加密，防止嗅探和篡改',
    cons: '配置复杂，部分老旧设备不支持，性能略有开销',
    community: 'v3取消了community string概念，改用基于用户的安全模型(USM)。配置用户名、认证密码和加密密码。三个安全级别：noAuthNoPriv / authNoPriv / authPriv。',
  },
];

export default function SNMPDiagram() {
  const [activeComponent, setActiveComponent] = useState<number | null>(null);
  const [activeOp, setActiveOp] = useState<string | null>(null);
  const [showOID, setShowOID] = useState(false);
  const [showVersions, setShowVersions] = useState(false);
  const [activeTrap, setActiveTrap] = useState<string | null>(null);

  return (
    <div className="snmp-diagram">
      {/* 核心组件 */}
      <div className="flex flex-col gap-[3px]">
        {components.map((comp, idx) => {
          const isActive = activeComponent === idx;
          return (
            <div key={idx}>
              <button
                onClick={() => {
                  setActiveComponent(isActive ? null : idx);
                  setActiveTrap(null);
                }}
                className="w-full text-left transition-all duration-300"
                style={{ transform: isActive ? 'scale(1.005)' : 'scale(1)' }}
              >
                <div
                  className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
                  style={{
                    background: isActive
                      ? `linear-gradient(135deg, ${comp.color}10, ${comp.color}05)`
                      : 'var(--surface)',
                    border: `1.5px solid ${isActive ? comp.color + '40' : 'var(--border)'}`,
                    boxShadow: isActive ? `0 4px 20px ${comp.color}12` : 'none',
                  }}
                >
                  {/* 图标 */}
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
                    style={{ background: `linear-gradient(135deg, ${comp.color}, ${comp.color}cc)` }}
                  >
                    {idx === 0 ? 'M' : idx === 1 ? 'A' : idx === 2 ? 'DB' : 'T'}
                  </div>

                  {/* 端口标签 */}
                  <div
                    className="text-[11px] px-2.5 py-0.5 rounded-md font-medium mr-4 flex-shrink-0 hidden md:block"
                    style={{ background: comp.color + '10', color: comp.color, border: `1px solid ${comp.color}20` }}
                  >
                    {idx === 0 ? 'UDP 162' : idx === 1 ? 'UDP 161' : idx === 2 ? 'OID树' : 'Trap/Inform'}
                  </div>

                  {/* 名称 */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[15px]" style={{ color: isActive ? comp.color : 'var(--text)' }}>
                        {comp.name}
                      </span>
                      <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                        {comp.nameEn}
                      </span>
                    </div>
                    <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {comp.role}
                    </div>
                  </div>
                </div>
              </button>

              {/* 展开详情 */}
              {isActive && (
                <div
                  className="mx-4 mt-1 mb-2 px-5 py-5 rounded-xl"
                  style={{ background: comp.color + '05', border: `1.5px solid ${comp.color}20` }}
                >
                  {/* 核心概念 */}
                  <div className="mb-4 px-4 py-3 rounded-lg" style={{ background: comp.color + '08' }}>
                    <div className="text-[12px] font-semibold mb-1" style={{ color: comp.color }}>核心概念</div>
                    <div className="text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {comp.keyConcept}
                    </div>
                  </div>

                  {/* 详细说明 */}
                  <div className="mb-4 text-[13.5px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {comp.details}
                  </div>

                  {/* 实际场景 */}
                  <div className="mb-4 text-[13px]" style={{ color: 'var(--text-muted)' }}>
                    <span className="font-medium" style={{ color: 'var(--text)' }}>实际场景：</span>
                    {comp.example}
                  </div>

                  {/* Trap类型（仅Trap组件） */}
                  {comp.traps && (
                    <div className="space-y-2">
                      <div className="text-[12px] font-semibold" style={{ color: 'var(--text-muted)' }}>标准Trap类型</div>
                      {comp.traps.map(t => (
                        <button
                          key={t.name}
                          onClick={(e) => {
                            e.stopPropagation();
                            setActiveTrap(activeTrap === t.name ? null : t.name);
                          }}
                          className="w-full text-left px-4 py-3 rounded-lg transition-all duration-200"
                          style={{
                            background: activeTrap === t.name ? 'var(--surface)' : 'transparent',
                            border: `1px solid ${activeTrap === t.name ? comp.color + '30' : 'var(--border-light)'}`,
                          }}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-[13px] font-mono font-semibold" style={{ color: comp.color }}>{t.name}</span>
                          </div>
                          {activeTrap === t.name && (
                            <div className="mt-2 text-[13px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                              {t.description}
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SNMP操作 */}
      <div className="mt-6">
        <div className="text-[13px] font-semibold mb-3" style={{ color: 'var(--text)' }}>SNMP 操作类型</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3px]">
          {snmpOps.map((op) => {
            const isActive = activeOp === op.name;
            return (
              <button
                key={op.name}
                onClick={() => setActiveOp(isActive ? null : op.name)}
                className="text-left px-4 py-3 rounded-xl transition-all duration-200"
                style={{
                  background: isActive ? `linear-gradient(135deg, ${op.color}10, ${op.color}05)` : 'var(--surface)',
                  border: `1.5px solid ${isActive ? op.color + '40' : 'var(--border)'}`,
                }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[13px] font-mono font-semibold" style={{ color: op.color }}>{op.name}</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                    style={{ background: op.color + '10', color: op.color, border: `1px solid ${op.color}20` }}>
                    {op.direction}
                  </span>
                </div>
                {isActive && (
                  <div className="text-[12px] leading-relaxed mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {op.description}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* OID 树 */}
      <div className="mt-6 space-y-[3px]">
        <button
          onClick={() => setShowOID(!showOID)}
          className="w-full text-left transition-all duration-300"
        >
          <div
            className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
            style={{
              background: showOID ? 'linear-gradient(135deg, #a855f710, #a855f705)' : 'var(--surface)',
              border: `1.5px solid ${showOID ? '#a855f740' : 'var(--border)'}`,
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #a855f7, #a855f7cc)' }}>
              OID
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[15px]" style={{ color: showOID ? '#a855f7' : 'var(--text)' }}>
                OID 树结构
              </span>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                Management Information Base 层次结构
              </div>
            </div>
          </div>
        </button>

        {showOID && (
          <div className="mx-4 mb-2 px-5 py-5 rounded-xl" style={{ background: '#a855f705', border: '1.5px solid #a855f720' }}>
            <div className="space-y-1">
              {oidTree.map((node, i) => {
                const depth = node.oid.split('.').length - 1;
                return (
                  <div
                    key={i}
                    className="flex items-center px-3 py-2 rounded-lg transition-all duration-200"
                    style={{ paddingLeft: `${depth * 16 + 12}px`, background: i % 2 === 0 ? 'transparent' : '#a855f703' }}
                  >
                    <span className="font-mono text-[12px] mr-3 min-w-[140px]" style={{ color: '#a855f7' }}>
                      {node.oid}
                    </span>
                    <span className="font-mono text-[12px] font-semibold mr-3" style={{ color: 'var(--text)' }}>
                      {node.name}
                    </span>
                    <span className="text-[12px]" style={{ color: 'var(--text-muted)' }}>
                      {node.description}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 版本对比 */}
        <button
          onClick={() => setShowVersions(!showVersions)}
          className="w-full text-left transition-all duration-300"
        >
          <div
            className="flex items-center rounded-xl px-5 py-3.5 transition-all duration-300"
            style={{
              background: showVersions ? 'linear-gradient(135deg, #06b6d410, #06b6d405)' : 'var(--surface)',
              border: `1.5px solid ${showVersions ? '#06b6d440' : 'var(--border)'}`,
            }}
          >
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white text-sm font-bold mr-4 flex-shrink-0"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #06b6d4cc)' }}>
              v
            </div>
            <div className="flex-1">
              <span className="font-semibold text-[15px]" style={{ color: showVersions ? '#06b6d4' : 'var(--text)' }}>
                SNMPv1 vs v2c vs v3 版本对比
              </span>
              <div className="text-[12px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                安全性和功能演进
              </div>
            </div>
          </div>
        </button>

        {showVersions && (
          <div className="mx-4 mb-2 px-5 py-5 rounded-xl" style={{ background: '#06b6d405', border: '1.5px solid #06b6d420' }}>
            <div className="space-y-3">
              {versions.map((v) => (
                <div key={v.version} className="px-4 py-3 rounded-lg" style={{ background: 'var(--surface)', border: `1px solid ${v.color}20` }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[14px] font-semibold" style={{ color: v.color }}>{v.version}</span>
                    <div className="flex gap-1.5">
                      <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: v.color + '10', color: v.color, border: `1px solid ${v.color}20` }}>
                        {v.year}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{ background: v.security === '高' ? '#22c55e10' : v.security === '低' ? '#f9731610' : '#ef444410',
                          color: v.security === '高' ? '#22c55e' : v.security === '低' ? '#f97316' : '#ef4444',
                          border: `1px solid ${v.security === '高' ? '#22c55e20' : v.security === '低' ? '#f9731620' : '#ef444420'}` }}>
                        安全: {v.security}
                      </span>
                    </div>
                  </div>
                  <div className="text-[12px] mb-1">
                    <span className="font-medium" style={{ color: 'var(--text)' }}>认证：</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{v.auth}</span>
                  </div>
                  <div className="text-[12px] mb-1">
                    <span className="font-medium" style={{ color: 'var(--text)' }}>新增功能：</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{v.features}</span>
                  </div>
                  <div className="text-[12px] mb-1">
                    <span className="font-medium" style={{ color: '#22c55e' }}>优点：</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{v.pros}</span>
                  </div>
                  <div className="text-[12px] mb-2">
                    <span className="font-medium" style={{ color: '#ef4444' }}>缺点：</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{v.cons}</span>
                  </div>
                  <div className="text-[12px] px-3 py-2 rounded-md" style={{ background: v.color + '08' }}>
                    <span className="font-medium" style={{ color: v.color }}>
                      {v.version === 'SNMPv3' ? '用户模型：' : 'Community String：'}
                    </span>
                    <span style={{ color: 'var(--text-secondary)' }}>{v.community}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-center text-[12px]" style={{ color: 'var(--text-muted)' }}>
        点击各组件展开详情 · SNMP使用UDP协议 · 管理站端口162 / 代理端口161
      </div>
    </div>
  );
}
