import Link from 'next/link';
import { auth } from '@/server/auth';
import ThemeToggle from '@/components/ThemeToggle';
import AdaptiveLogo from '@/components/AdaptiveLogo';
import MobileMenuClient from '@/components/MobileMenuClient';
import AuthSection from "../auth/AuthSection";

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">

        <div className="flex items-center">
          <AdaptiveLogo />
        </div>

        {/* Desktop - skjult på mobil/tablet */}
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
          <AuthSection/>
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