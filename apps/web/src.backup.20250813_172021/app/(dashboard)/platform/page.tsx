import PlatformGraph from "@/components/PlatformGraph";
import { headers } from "next/headers";

type Endpoint = { path: string; ok: boolean };
type PlatformStatus = { db: boolean; env: Record<string, boolean>; endpoints: Endpoint[] };

async function fetchStatus(): Promise<PlatformStatus | null> {
  const h = await headers();
  const proto = h.get("x-forwarded-proto") ?? "http";
  const host  = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const res = await fetch(`${proto}://${host}/api/status`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json() as Promise<PlatformStatus>;
}

export default async function PlatformStatusPage() {
  const status = await fetchStatus();
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Platform status</h1>
      {status ? (
        <>
          <PlatformGraph status={status} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border p-4">
              <h2 className="font-medium mb-2">Database</h2>
              <div>{status.db ? "✅ OK" : "❌ Down"}</div>
            </div>
            <div className="rounded-2xl border p-4">
              <h2 className="font-medium mb-2">Miljøvariabler</h2>
              <ul className="space-y-1 text-sm opacity-80">
                {Object.entries(status.env).map(([k, v]) => (
                  <li key={k}>{k}: {v ? "✅" : "❌"}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border p-4 sm:col-span-2 lg:col-span-1">
              <h2 className="font-medium mb-2">API-endepunkter</h2>
              <ul className="space-y-1 text-sm">
                {status.endpoints.map((e) => (
                  <li key={e.path}>{e.ok ? "✅" : "❌"} {e.path}</li>
                ))}
              </ul>
            </div>
          </div>
        </>
      ) : (
        <div className="rounded-2xl border p-4">Kunne ikke hente status.</div>
      )}
    </main>
  );
}
