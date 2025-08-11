import { auth } from "@/server/auth";
import { headers } from "next/headers";
import Link from "next/link";
import PlatformGraphClient from "@/components/PlatformGraph.client";

type PlatformStatus = unknown;

async function fetchStatus(): Promise<PlatformStatus | null> {
  try {
    const h = headers();
    const proto = h.get("x-forwarded-proto") ?? "https";
    const host =
      h.get("host") ??
      (process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") ?? "localhost:3000");
    const res = await fetch(`${proto}://${host}/api/health`, { cache: "no-store" });
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
      <section className="min-h-[70vh] grid place-items-center">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-semibold">Du er ikke innlogget</h1>
          <Link className="underline" href="/api/auth/signin">Logg inn</Link>
        </div>
      </section>
    );
  }

  const status = await fetchStatus();

  return (
    <section className="space-y-6">
      <header className="space-y-1">
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="opacity-70">Hei, {session.user?.name ?? "bruker"}!</p>
      </header>
      <div className="grid place-items-center">
        <div className="w-full max-w-5xl">
          <PlatformGraphClient status={status ?? undefined} />
        </div>
      </div>
    </section>
  );
}
