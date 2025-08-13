import { auth } from '@/server/auth';
import PlatformGraph from '@/components/features/platform-graph/PlatformGraphShell';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
export default async function DashboardPage() {
  const session = await auth();
  return (
    <div className="grid gap-6">
      <header className="grid gap-1">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="opacity-70">Hei, {session?.user?.name ?? 'bruker'}</p>
      </header>
      <div className="grid sm:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Status</CardTitle><CardDescription>Alt ser normalt ut.</CardDescription></CardHeader><CardContent><p className="text-sm opacity-80">Sist oppdatert: nå nettopp.</p></CardContent></Card>
        <Card><CardHeader><CardTitle>Prosjekter</CardTitle><CardDescription>0 aktive / 0 i kø</CardDescription></CardHeader><CardContent /></Card>
        <Card><CardHeader><CardTitle>API</CardTitle><CardDescription>Swagger tilgjengelig</CardDescription></CardHeader><CardContent /></Card>
      </div>
      <section className="h-[500px] rounded-md border">
        <PlatformGraph />
      </section>
    </div>
  );
}
