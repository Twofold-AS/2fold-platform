import Link from "next/link";

export default function MarketingPage() {
  return (
    <main className="min-h-screen p-8 space-y-4">
      <h1 className="text-3xl font-semibold">Twofold</h1>
      <p className="opacity-80">Velkommen!</p>
      <div className="flex gap-4">
        <Link className="underline" href="/api-docs">API-dokumentasjon</Link>
        <Link className="underline" href="/faq">FAQ</Link>
        <Link className="underline" href="/dashboard">Dashboard</Link>
      </div>
          <div className="mt-6">
        <Link className="underline" href="/docs">Docs</Link>
      </div>
    </main>
  );
}
