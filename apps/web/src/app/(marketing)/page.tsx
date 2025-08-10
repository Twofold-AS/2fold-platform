export const dynamic = 'force-dynamic';
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Marketing() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      <div className="absolute right-4 top-4"><ThemeToggle /></div>
      <h1 className="text-4xl font-bold">Twofold – Oversikt & FAQ</h1>
      <p className="max-w-prose text-center opacity-80">
        Her kan kundene få oversikt, lese dokumentasjon og status. Utviklere kan logge inn for å se dashboardet.
      </p>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-xl border" href="/faq">Se FAQ</Link>
        <Link className="px-4 py-2 rounded-xl border" href="/api-docs">API-dokumentasjon→</Link>
        <Link href="/dashboard" className="px-4 py-2 rounded-xl bg-black text-white">Logg inn</Link>
      </div>
    </main>
  );
}
