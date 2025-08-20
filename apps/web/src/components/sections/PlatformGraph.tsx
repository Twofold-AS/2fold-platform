"use client";
import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

type Endpoint = { path: string; ok: boolean };
type PlatformStatus = { 
  db: boolean; 
  env: Record<string, boolean>; 
  endpoints: Endpoint[];
  time?: number;
};

interface PlatformGraphProps {
  status: PlatformStatus;
}

export default function PlatformGraph({ status }: PlatformGraphProps) {
  const { nodes, edges } = useMemo(() => {
    const nodeList: Node[] = [
      { id: "fe", position: { x: 0, y: 40 }, data: { label: "Frontend" }, type: "input" },
      { id: "db", position: { x: 520, y: 200 }, data: { label: `Database ${status.db ? "✅" : "❌"}` } },
    ];
    
    status.endpoints.forEach((e, i) => {
      nodeList.push({
        id: e.path,
        position: { x: 300, y: 40 + i * 80 },
        data: { label: `${e.path} ${e.ok ? "✅" : "❌"}` },
      });
    });

    const edgeList: Edge[] = status.endpoints.map((e) => ({
      id: `fe-${e.path}`,
      source: "fe",
      target: e.path,
    }));

    // Add edges to DB for endpoints that use it
    const dbEndpoints = ["/api/health", "/api/trpc", "/api/upgrade"];
    status.endpoints.forEach((e) => {
      if (dbEndpoints.includes(e.path)) {
        edgeList.push({ id: `db-${e.path}`, source: e.path, target: "db" });
      }
    });

    return { nodes: nodeList, edges: edgeList };
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
