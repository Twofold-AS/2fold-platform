import { auth } from "@/server/auth";
import { headers } from "next/headers";
import Link from "next/link";
import PlatformGraphClient from "@/components/PlatformGraph.client";

type PlatformStatus = unknown; // vi trenger ikke eksakt type her

async function fetchStatus(): Promise<PlatformStatus | null> {
  try {
    const h = headers();
    const proto = h.get("x-forwarded-proto") ?? "https";
    const host =
      h.get("host") ??
      (process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") ?? "localhost:3000");

    const base = `${proto}://${host}`;
    const res = await fetch(`${base}/api/health`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export default async function DashboardPage() {
  const session = await auth();
  if (!session) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-semibold mb-2">Du er ikke innlogget</h1>
        <Link className="underline" href="/api/auth/signin">Logg inn</Link>
      </main>
    );
  }

  const status = await fetchStatus();

  return (
    <main className="min-h-screen p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="opacity-70">Hei, {session.user?.name ?? "bruker"}!</p>
      </header>

      <section>
        <h2 className="text-xl font-medium mb-2">Plattformstatus</h2>
        <PlatformGraphClient status={status ?? undefined} />
      </section>
    </main>
  );
}
