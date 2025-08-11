import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t mt-24">
      <div className="mx-auto max-w-6xl px-4 py-10 grid sm:grid-cols-2 gap-6 text-sm">
        <div>
          <div className="font-semibold mb-2">Twofold</div>
          <p className="opacity-80">Bygger og drifter prosjekter på én plattform.</p>
        </div>
        <nav className="sm:justify-self-end flex gap-4">
          <Link className="hover:underline" href="/docs">Docs</Link>
          <Link className="hover:underline" href="/faq">FAQ</Link>
          <Link className="hover:underline" href="/api-docs">API</Link>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-4 pb-8 text-xs opacity-70">© {year} Twofold</div>
    </footer>
  );
}
