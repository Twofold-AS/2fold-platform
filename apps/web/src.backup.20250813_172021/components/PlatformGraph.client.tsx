"use client";
import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, type Node, type Edge } from "reactflow";
import "reactflow/dist/style.css";

type PlatformStatus = unknown; // erstatt med din faktiske type hvis ønskelig
type Props = { status?: PlatformStatus | null };

export default function PlatformGraphClient({ status }: Props) {
  const { nodes, edges } = useMemo(() => {
    // Fallback-demo når vi ikke har status-data ennå
    if (!status) {
      const demoNodes: Node[] = [
        { id: "browser", position: { x: 0,   y: 80 }, data: { label: "Browser" } },
        { id: "next",    position: { x: 220, y: 80 }, data: { label: "Next.js" } },
        { id: "api",     position: { x: 440, y: 40 }, data: { label: "API" } },
        { id: "db",      position: { x: 440, y:120 }, data: { label: "DB" } },
      ];
      const demoEdges: Edge[] = [
        { id: "e1", source: "browser", target: "next" },
        { id: "e2", source: "next",    target: "api", animated: true },
        { id: "e3", source: "next",    target: "db" },
      ];
      return { nodes: demoNodes, edges: demoEdges };
    }

    // TODO: bygg ekte graf fra status-objektet ditt
    const ns: Node[] = [
      { id: "frontend", position: { x: 0, y: 80 }, data: { label: "Frontend" } },
    ];
    const es: Edge[] = [];
    return { nodes: ns, edges: es };
  }, [status]);

  return (
    <div style={{ width: "100%", height: 420 }} className="rounded-2xl border">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
