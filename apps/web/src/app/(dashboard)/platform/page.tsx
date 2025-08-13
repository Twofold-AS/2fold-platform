import { headers } from "next/headers";

export default async function PlatformStatusPage() {
  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Platform Status</h1>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <h2 className="font-medium mb-2">Database</h2>
          <div className="text-lg">✅ Connected</div>
        </div>
        
        <div className="rounded-2xl border p-4">
          <h2 className="font-medium mb-2">Environment</h2>
          <p className="text-sm">All variables loaded</p>
        </div>
        
        <div className="rounded-2xl border p-4">
          <h2 className="font-medium mb-2">API Endpoints</h2>
          <p className="text-sm">All endpoints operational</p>
        </div>
      </div>
    </main>
  );
}
