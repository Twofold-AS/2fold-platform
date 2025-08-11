import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import ThemeToggle from "@/components/ThemeToggle";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Twofold Platform",
  description: "Oversikt, dokumentasjon og FAQ for Twofold-plattformen.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <header className="h-14 border-b">
              <div className="mx-auto max-w-6xl h-full px-4 flex items-center justify-between">
                <a href="/" className="font-semibold">Twofold</a>
                <ThemeToggle />
              </div>
            </header>
            <main className="flex-1 px-4">
              <div className="mx-auto max-w-6xl py-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
