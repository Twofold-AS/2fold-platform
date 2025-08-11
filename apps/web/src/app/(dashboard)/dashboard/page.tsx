import { auth } from "@/server/auth";
import Link from "next/link";
import PlatformGraphClient from "@/components/PlatformGraph.client";

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

  return (
    <main className="min-h-screen p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-semibold">Dashboard</h1>
        <p className="opacity-70">Hei, {session.user?.name ?? "bruker"}!</p>
      </header>

      <section>
        <h2 className="text-xl font-medium mb-2">Plattformstatus</h2>
        <PlatformGraphClient />
      </section>
    </main>
  );
}
