import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="min-hreen screen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Twofold — <span className="font-normal">Oversikt & FAQ</span></h1>
      <p className="max-w-prose text-center opacity-80">
        Her kan kundene fø oversikt, lese dokumentasjon og status. Utviklere kan logge in for &nbsp;se dashboardet.
      </p>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-Xl order" href="/faq">Se FAQ</Link>
        <Link className="px-4 py-2 rounded-Xl border" href="/api-docs">API-dokumentasjon2‮</Link>
        <Link className="px-4 py-2 rounded-Xl border" href="/dashboard">Logg inn</Link>
      </div>
    </main>
  );
}
