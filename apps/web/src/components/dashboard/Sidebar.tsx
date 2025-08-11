"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const items = [
  { href: "/dashboard", label: "Oversikt" },
  { href: "/dashboard/platform", label: "Plattform" },
  { href: "/api-docs", label: "API-docs" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="w-64 shrink-0 border-r min-h-screen p-4">
      <div className="font-bold mb-4">Twofold</div>
      <nav className="grid gap-1">
        {items.map((i) => {
          const active = pathname === i.href || pathname?.startsWith(i.href + "/");
          return (
            <Link
              key={i.href}
              href={i.href}
              className={`rounded-xl px-3 py-2 text-sm transition ${
                active ? "bg-gray-100 dark:bg-neutral-900 font-medium"
                       : "hover:bg-gray-50 dark:hover:bg-neutral-900"
              }`}
            >
              {i.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
