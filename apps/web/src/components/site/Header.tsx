import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import AuthButtons from "@/components/auth/AuthButtons.client";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold">Twofold</Link>
          <nav className="hidden md:flex items-center gap-4 text-sm">
            <Link href="/api-docs" className="hover:underline">API</Link>
            <Link href="/faq" className="hover:underline">FAQ</Link>
            <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <AuthButtons />
        </div>
      </div>
    </header>
  );
}
