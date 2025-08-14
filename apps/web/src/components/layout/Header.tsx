import Link from 'next/link';
import { auth } from '@/server/auth';
import ThemeToggle from '@/components/ThemeToggle';
import AdaptiveLogo from '@/components/AdaptiveLogo'

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-18 flex items-center justify-between gap-4">
        {/* NAV */}
        <nav className="flex items-center gap-4 text-sm">
          <AdaptiveLogo></AdaptiveLogo>
          <Link href="/docs" className="opacity-80 hover:opacity-100">Docs</Link>
          <Link href="/api-docs" className="opacity-80 hover:opacity-100">API</Link>
          {session && <Link href="/dashboard" className="opacity-80 hover:opacity-100">Dashboard</Link>}
        </nav>
        {/* Alt annet */}
        <div className="flex items-center gap-3">
          <Link href="/api-docs" className="opacity-80 hover:opacity-100">The Fold</Link>
          <Link href="/docs" className="opacity-80 hover:opacity-100">Priser</Link>
          <Link href="/api-docs" className="opacity-80 hover:opacity-100">Support</Link>
          <ThemeToggle />
          {session ? (
            <form action="/api/auth/signout" method="post" className="inline">
              <button type="submit" className="text-sm underline">Logg ut</button>
            </form>
          ) : (
            <Link href="/auth/signin" className="text-sm underline">Logg inn</Link>
          )}
        </div>
      </div>
    </header>
  );
}
