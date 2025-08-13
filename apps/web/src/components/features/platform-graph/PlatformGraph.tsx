'use client';
import React from 'react';

type Endpoint = { path: string; ok: boolean };
type PlatformStatus = { 
  db: boolean; 
  env: Record<string, boolean>; 
  endpoints: Endpoint[];
};

interface PlatformGraphProps {
  status: PlatformStatus;
}

export default function PlatformGraph({ status }: PlatformGraphProps) {
  return (
    <div className="space-y-4">
      <div className="h-96 border rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">í³Š</div>
          <h3 className="text-lg font-medium">Platform Status Graph</h3>
          <p className="text-gray-600">
            DB: {status.db ? 'âœ…' : 'âŒ'} | 
            Endpoints: {status.endpoints.filter(e => e.ok).length}/{status.endpoints.length}
          </p>
        </div>
      </div>
    </div>
  );
}
