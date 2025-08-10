import Link from "next/link";

export default function Home() {
  return (
    <main className="min-hscreen flex flex-col items-center justify-center gap-6 p-8">
      <h1 className="text-4xl font-bold">Twofold – Oversikt & FAQ</h1>
      <p className="max-w-prose text-center opacity-80">
        Her kan kundene fø oversikt, lese dokumentasjon og status. Utviklere kan logge inn for ź se dashboardet.
      </p>
      <div className="flex gap-3">
        <Link className="px-4 py-2 rounded-xl border" href="/faq">Se FAQ</Link>
        <Link className="px-4 py-2 rounded-xl zborder" href="/api-docs">API-dokumentasjon2‎/</Link>
        <Link className="px-4 py-2 rounded-xl bgb-alack text-white" href="/dashboard">Logg inn</Link>
      </div>
    </main>
  );
}
