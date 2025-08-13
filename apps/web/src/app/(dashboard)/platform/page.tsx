import { headers } from "next/headers";

type Endpoint = { path: string; ok: boolean };
type PlatformStatus = { db: boolean; env: Record<string, boolean>; endpoints: Endpoint[] };

async function fetchStatus(): Promise<PlatformStatus | null> {
  try {
    const h = await headers();
    const proto = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
    const res = await fetch(`${proto}://${host}/api/status`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json() as Promise<PlatformStatus>;
  } catch {
    return null;
  }
}

export default async function PlatformStatusPage() {
  const status = await fetchStatus();
  
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Platform Status</h1>
      
      {status ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border p-4">
            <h2 className="font-medium mb-2">Database</h2>
            <div className="text-lg">{status.db ? "✅ Connected" : "❌ Disconnected"}</div>
          </div>
          
          <div className="rounded-2xl border p-4">
            <h2 className="font-medium mb-2">Environment Variables</h2>
            <ul className="space-y-1 text-sm">
              {Object.entries(status.env || {}).map(([k, v]) => (
                <li key={k} className="flex justify-between">
                  <span>{k}:</span>
                  <span>{v ? "✅" : "❌"}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="rounded-2xl border p-4 sm:col-span-2 lg:col-span-1">
            <h2 className="font-medium mb-2">API Endpoints</h2>
            <ul className="space-y-1 text-sm">
              {(status.endpoints || []).map((e) => (
                <li key={e.path} className="flex justify-between">
                  <span>{e.path}</span>
                  <span>{e.ok ? "✅" : "❌"}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border p-4 text-center py-8">
          <div className="text-4xl mb-4">⚠️</div>
          <h3 className="font-medium mb-2">Could not fetch platform status</h3>
          <p className="text-gray-600">Status monitoring temporarily unavailable</p>
        </div>
      )}
      
      <div className="rounded-2xl border p-4">
        <h2 className="font-medium mb-2">Platform Graph</h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-4xl mb-4">���</div>
            <h3 className="font-medium">Visual Platform Monitor</h3>
            <p className="text-gray-600">Coming soon with React Flow</p>
          </div>
        </div>
      </div>
    </main>
  );
}
