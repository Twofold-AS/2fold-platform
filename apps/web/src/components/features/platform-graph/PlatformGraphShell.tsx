'use client';
import dynamic from 'next/dynamic';

const GraphCanvas = dynamic(() => import('./GraphCanvas'), { 
  ssr: false,
  loading: () => <div className="flex items-center justify-center h-96">Loading graph...</div>
});

export default function PlatformGraphShell() { 
  return <GraphCanvas />; 
}
