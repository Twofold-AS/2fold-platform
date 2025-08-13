"use client";
import React, { useMemo } from "react";
import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

type Endpoint = { path: string; ok: boolean };
type PlatformStatus = { db: boolean; env: Record<string, boolean>; endpoints: Endpoint[] };
type NodeData = { label: string };

export default function PlatformGraph({ status }: { status: PlatformStatus }) {
  const nodes = useMemo<Node<NodeData>[]>(() => {
    const list: Node<NodeData>[] = [
      { id: "fe", position: { x: 0, y: 40 }, data: { label: "Frontend" }, type: "input" },
      { id: "db", position: { x: 520, y: 200 }, data: { label: `Database ${status.db ? "✅" : "❌"}` } },
    ];
    status.endpoints.forEach((e, i) => {
      list.push({
        id: e.path,
        position: { x: 300, y: 40 + i * 80 },
        data: { label: `${e.path} ${e.ok ? "✅" : "❌"}` },
      });
    });
    return list;
  }, [status]);

  const edges = useMemo<Edge[]>(() => {
    const list: Edge[] = status.endpoints.map((e) => ({
      id: `fe-${e.path}`,
      source: "fe",
      target: e.path,
    }));
    const hitsDB = new Set<string>(["/api/health", "/api/trpc", "/api/upgrade", "/api/github/webhook"]);
    status.endpoints.forEach((e) => {
      if (hitsDB.has(e.path)) list.push({ id: `db-${e.path}`, source: e.path, target: "db" });
    });
    return list;
  }, [status]);

  return (
    <div style={{ width: "100%", height: 420 }} className="rounded-2xl border">
      <ReactFlow  nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
