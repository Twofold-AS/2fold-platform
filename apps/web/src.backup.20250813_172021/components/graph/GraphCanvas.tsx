'use client';
import React from 'react';
import ReactFlow, { Background, Controls, MiniMap, addEdge, Connection, Edge, Node } from 'reactflow';
import 'reactflow/dist/style.css';
export default function GraphCanvas() {
  const [nodes] = React.useState<Node[]>([
    { id: 'app', position: { x: 50, y: 80 }, data: { label: 'App (Next.js)' } },
    { id: 'api', position: { x: 320, y: 80 }, data: { label: 'API' } },
    { id: 'db', position: { x: 590, y: 80 }, data: { label: 'Database' } },
  ]);
  const [edges, setEdges] = React.useState<Edge[]>([
    { id: 'a', source: 'app', target: 'api' },
    { id: 'b', source: 'api', target: 'db' },
  ]);
  const onConnect = React.useCallback((c: Connection) => setEdges((eds) => addEdge(c, eds)), []);
  return (
    <ReactFlow nodes={nodes} edges={edges} onConnect={onConnect} fitView>
      <MiniMap /><Controls /><Background />
    </ReactFlow>
  );
}
