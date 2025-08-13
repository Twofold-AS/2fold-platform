'use client';
import dynamic from 'next/dynamic';
const GraphCanvas = dynamic(() => import('./GraphCanvas'), { ssr: false });
export default function PlatformGraphShell() { return <GraphCanvas />; }
