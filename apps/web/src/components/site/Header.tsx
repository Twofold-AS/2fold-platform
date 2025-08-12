/* eslint-disable @next/next/no-html-link-for-pages */
import Link from "next/link";
import { auth } from "@/server/auth";
import ThemeToggle from "@/components/ThemeToggle";

export default async function Header() {
  const session = await auth();

  return (
    <header className="border-b">
      <div className="container mx-auto h-14 flex items-center justify-between gap-4 px-4">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="font-semibold">Twofold</Link>
          <Link href="/faq" className="opacity-80 hover:opacity-100">FAQ</Link>
          <Link href="/api-docs" className="opacity-80 hover:opacity-100">API</Link>
          <Link href="/dashboard" className="opacity-80 hover:opacity-100">Dashboard</Link>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <a href="/api/auth/signout" className="text-sm underline">Logg ut</a>
          ) : (
            <Link href="/auth/signin" className="text-sm underline">Logg inn</Link>
          )}
        </div>
      </div>
    </header>
  );
}
