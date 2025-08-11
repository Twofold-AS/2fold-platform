"use client";
import React, { useMemo } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

type Status = {
  db: boolean;
  env: Record<string, boolean>;
  endpoints: { path: string; ok: boolean }[];
};

export default function PlatformGraph({ status }: { status: Status }) {
  const nodes = useMemo(() => {
    const N: any[] = [
      { id: "fe", position: { x: 0,   y: 40 },  data: { label: "Frontend" }, type: "input" },
      { id: "db", position: { x: 520, y: 200 }, data: { label: `Database ${status.db ? "✅" : "❌"}` } }
    ];
    status.endpoints.forEach((e, i) => {
      N.push({
        id: e.path,
        position: { x: 300, y: 40 + i*80 },
        data: { label: `${e.path} ${e.ok ? "✅" : "❌"}` }
      });
    });
    return N;
  }, [status]);

  const edges = useMemo(() => {
    const E: any[] = status.endpoints.map(e => ({ id: `fe-${e.path}`, source: "fe", target: e.path }));
    const hitsDB = new Set([
      "/api/health", "/api/trpc", "/api/upgrade", "/api/github/webhook", "/api/auth/[...nextauth]"
    ]);
    status.endpoints.forEach(e => { if (hitsDB.has(e.path)) E.push({ id: `db-${e.path}`, source: e.path, target: "db" }); });
    return E;
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
