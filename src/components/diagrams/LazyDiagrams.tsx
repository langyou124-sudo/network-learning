'use client';

import dynamic from 'next/dynamic';


// Loading skeleton for diagrams
function DiagramSkeleton() {
  return (
    <div className="animate-pulse rounded-lg" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
      <div className="p-6">
        <div className="h-4 rounded w-1/3 mb-4" style={{ background: 'var(--border)' }}></div>
        <div className="space-y-3">
          <div className="h-3 rounded w-full" style={{ background: 'var(--border)' }}></div>
          <div className="h-3 rounded w-5/6" style={{ background: 'var(--border)' }}></div>
          <div className="h-3 rounded w-4/6" style={{ background: 'var(--border)' }}></div>
        </div>
      </div>
    </div>
  );
}

// Lazy load all diagram components
export const LazyOsiLayers = dynamic(() => import('./OsiLayers'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyTcpIpLayers = dynamic(() => import('./TcpIpLayers'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyNetworkTopology = dynamic(() => import('./NetworkTopology'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyEncapsulation = dynamic(() => import('./Encapsulation'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyRoutingTable = dynamic(() => import('./RoutingTable'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyVlanDiagram = dynamic(() => import('./VlanDiagram'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazySTPTopology = dynamic(() => import('./STPTopology'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyRoutingProcess = dynamic(() => import('./RoutingProcess'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyEncryptionFlow = dynamic(() => import('./EncryptionFlow'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyFirewallTypes = dynamic(() => import('./FirewallTypes'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyVPNTunnel = dynamic(() => import('./VPNTunnel'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyWirelessStandards = dynamic(() => import('./WirelessStandards'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyCellularNetwork = dynamic(() => import('./CellularNetwork'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyFiberOptic = dynamic(() => import('./FiberOptic'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazySDNArchitecture = dynamic(() => import('./SDNArchitecture'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazySNMPDiagram = dynamic(() => import('./SNMPDiagram'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyFaultDiagnosis = dynamic(() => import('./FaultDiagnosis'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});

export const LazyGlossaryCard = dynamic(() => import('./GlossaryCard'), {
  loading: () => <DiagramSkeleton />,
  ssr: false,
});
