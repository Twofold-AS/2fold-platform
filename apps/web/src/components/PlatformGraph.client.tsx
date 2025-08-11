"use client";

import React from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

export type PlatformStatus = {
  services?: { id?: string; name?: string }[];
  apis?: { id?: string; name?: string; serviceId?: string }[];
};

export default function PlatformGraphClient({
  status,
}: {
  status?: PlatformStatus | null;
}) {
  // Ingen data? Vis tom-state i stedet for å kaste feil
  if (!status) {
    return (
      <div className="rounded-2xl border p-6 text-sm opacity-80">
        Ingen statusdata ennå.
      </div>
    );
  }

  const services = Array.isArray(status.services) ? status.services : [];
  const apis = Array.isArray(status.apis) ? status.apis : [];

  const nodes = [
    ...services.map((s, i) => ({
      id: `svc-${s.id ?? i}`,
      position: { x: i * 200, y: 0 },
      data: { label: s.name ?? `Service ${i + 1}` },
      type: "default",
    })),
    ...apis.map((a, i) => ({
      id: `api-${a.id ?? i}`,
      position: { x: i * 200, y: 180 },
      data: { label: a.name ?? `API ${i + 1}` },
      type: "default",
    })),
  ];

  const edges = apis
    .filter((a) => a.serviceId)
    .map((a, i) => ({
      id: `e-${a.serviceId}-${a.id ?? i}`,
      source: `svc-${a.serviceId}`,
      target: `api-${a.id ?? i}`,
    }));

  return (
    <div style={{ width: "100%", height: 420 }} className="rounded-2xl border">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
