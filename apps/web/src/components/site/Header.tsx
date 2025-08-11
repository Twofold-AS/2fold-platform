"use client";
import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 dark:bg-neutral-950/80 backdrop-blur">
      <div className="mx-auto max-w-6xl flex h-14 items-center justify-between px-4">
        <Link href="/" className="font-bold tracking-tight">Twofold</Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/api-docs" className="hover:underline">API-dokumentasjon</Link>
          <Link href="/faq" className="hover:underline">FAQ</Link>
          <Link href="/docs" className="hover:underline">Docs</Link>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild variant="outline" size="sm"><a href="/api/auth/signin">Logg inn</a></Button>
          <Button asChild size="sm"><a href="/dashboard">Dashboard</a></Button>
        </div>
      </div>
    </header>
  );
}
