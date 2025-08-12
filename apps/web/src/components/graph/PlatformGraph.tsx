"use client";
import React from "react";
import ReactFlow, { Background, Controls, Node, Edge } from "reactflow";
import "reactflow/dist/style.css";

const nodes: Node[] = [
  { id: "ui",  position: { x: 180, y: 10 },  data: { label: "Web UI" }, type: "output" },
  { id: "api", position: { x: 40,  y: 120 }, data: { label: "API" },    type: "input"  },
  { id: "db",  position: { x: 320, y: 120 }, data: { label: "Database"} }
];

const edges: Edge[] = [
  { id: "e1", source: "ui", target: "api", animated: true },
  { id: "e2", source: "api", target: "db" }
];

export default function PlatformGraph() {
  return (
    <div style={{ width: "100%", height: 420 }} className="rounded-2xl border">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
