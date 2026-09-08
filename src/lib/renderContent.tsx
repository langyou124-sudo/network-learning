'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { highlightTerms } from '@/components/GlossaryTooltip';
import { GlossaryCard } from '@/components/diagrams';
import ErrorBoundary from '@/components/ErrorBoundary';
import { OsiLayers, TcpIpLayers, NetworkTopology, Encapsulation, RoutingTable, VlanDiagram, STPTopology, RoutingProcess, EncryptionFlow, FirewallTypes, VPNTunnel, WirelessStandards, CellularNetwork, FiberOptic, SDNArchitecture, SNMPDiagram, FaultDiagnosis } from '@/components/diagrams';

const diagramComponents: Record<string, React.ComponentType> = {
  'osi-layers': OsiLayers,
  'tcpip-layers': TcpIpLayers,
  'network-topology': NetworkTopology,
  'encapsulation': Encapsulation,
  'routing-table': RoutingTable,
  'vlan-diagram': VlanDiagram,
  'stp-topology': STPTopology,
  'routing-process': RoutingProcess,
  'encryption-flow': EncryptionFlow,
  'firewall-types': FirewallTypes,
  'vpn-tunnel': VPNTunnel,
  'wireless-standards': WirelessStandards,
  'cellular-network': CellularNetwork,
  'fiber-optic': FiberOptic,
  'sdn-architecture': SDNArchitecture,
  'snmp-diagram': SNMPDiagram,
  'fault-diagnosis': FaultDiagnosis,
};

// 处理 React 子节点，对纯文本节点做术语高亮
function processChildren(children: React.ReactNode): React.ReactNode {
  return React.Children.map(children, (child) => {
    if (typeof child === 'string') {
      const highlighted = highlightTerms(child);
      return highlighted.length === 1 ? highlighted[0] : <>{highlighted}</>;
    }
    if (typeof child === 'number' || typeof child === 'boolean') return child;
    if (React.isValidElement(child)) {
      const props = child.props as Record<string, unknown>;
      const tag = typeof child.type === 'string' ? child.type : '';
      // Skip code/pre elements to avoid breaking code block styling
      if (tag === 'code' || tag === 'pre') return child;
      if (props.children) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return React.cloneElement(child as React.ReactElement<any>, {
          ...props,
          children: processChildren(props.children as React.ReactNode),
        });
      }
    }
    return child;
  });
}

export function renderContentWithDiagrams(content: string) {
  const regex = /<(?:Diagram\s+type="([^"]+)"|Glossary\s+terms="([^"]*)")\s*\/>/g;
  const parts: { type: 'md' | 'diagram' | 'glossary'; value: string }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: 'md', value: content.slice(lastIndex, match.index) });
    }
    if (match[1]) {
      parts.push({ type: 'diagram', value: match[1] });
    } else if (match[2] !== undefined) {
      parts.push({ type: 'glossary', value: match[2] });
    }
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < content.length) {
    parts.push({ type: 'md', value: content.slice(lastIndex) });
  }

  return parts.map((part, i) => {
    if (part.type === 'diagram') {
      const Component = diagramComponents[part.value];
      if (Component) {
        return (
          <div key={i} className="my-6 p-5 rounded-2xl" style={{ background: 'var(--bg-warm)', border: '1px solid var(--border)' }}>
            <ErrorBoundary>
              <Component />
            </ErrorBoundary>
          </div>
        );
      }
    }
    if (part.type === 'glossary') {
      try {
        const terms = JSON.parse(decodeURIComponent(part.value));
        return (
          <div key={i} className="my-6">
            <GlossaryCard terms={terms} />
          </div>
        );
      } catch {
        return null;
      }
    }
    return part.value.trim() ? (
      <ReactMarkdown
        key={i}
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p>{processChildren(children)}</p>,
          li: ({ children }) => <li>{processChildren(children)}</li>,
          td: ({ children }) => <td>{processChildren(children)}</td>,
        }}
      >
        {part.value}
      </ReactMarkdown>
    ) : null;
  });
}
