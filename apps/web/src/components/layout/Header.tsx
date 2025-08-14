import Link from 'next/link';
import { auth } from '@/server/auth';
import ThemeToggle from '@/components/ThemeToggle';
import AdaptiveLogo from '@/components/AdaptiveLogo';
import MobileMenuClient from '@/components/MobileMenuClient';

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Logo - always visible */}
        <div className="flex items-center">
          <AdaptiveLogo />
        </div>

        {/* Desktop navigation - hidden on mobile/tablet */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/docs" className="opacity-80 hover:opacity-100 transition-opacity">
            Docs
          </Link>
          <Link href="/api-docs" className="opacity-80 hover:opacity-100 transition-opacity">
            API
          </Link>
          {session && (
            <Link href="/dashboard" className="opacity-80 hover:opacity-100 transition-opacity">
              Dashboard
            </Link>
          )}
        </nav>

        {/* Desktop right section - hidden on mobile/tablet */}
        <div className="hidden md:flex items-center gap-4 text-sm">
          <Link href="/api-docs" className="opacity-80 hover:opacity-100 transition-opacity">
            The Fold
          </Link>
          <Link href="/docs" className="opacity-80 hover:opacity-100 transition-opacity">
            Priser
          </Link>
          <Link href="/api-docs" className="opacity-80 hover:opacity-100 transition-opacity">
            Support
          </Link>
          <ThemeToggle />
          {session ? (
            <form action="/api/auth/signout" method="post" className="inline">
              <button type="submit" className="opacity-80 hover:opacity-100 transition-opacity">
                Logg ut
              </button>
            </form>
          ) : (
            <Link href="/auth/signin" className="opacity-80 hover:opacity-100 transition-opacity">
              Logg inn
            </Link>
          )}
        </div>

        {/* Mobile menu - only visible on mobile/tablet */}
        <MobileMenuClient
          hasSession={!!session}
          userName={session?.user?.name}
        />
      </div>
    </header>
  );
}