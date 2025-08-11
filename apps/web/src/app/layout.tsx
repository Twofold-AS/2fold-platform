import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twofold Platform",
  description: "Oversikt, dokumentasjon og FAQ for Twofold-plattformen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen">
        <Providers>
          <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur dark:bg-neutral-950/80 supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-neutral-950/60">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
              <Link href="/" className="font-semibold">Twofold</Link>
              <nav className="flex items-center gap-5 text-sm">
                <Link href="/api-docs" className="hover:underline">API-docs</Link>
                <Link href="/faq" className="hover:underline">FAQ</Link>
                <Link href="/dashboard" className="hover:underline">Dashboard</Link>
                <Link href="/docs" className="hover:underline">Docs</Link>
                <ThemeToggle />
              </nav>
            </div>
          </header>

          <main className="mx-auto max-w-5xl px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
