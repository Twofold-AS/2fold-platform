import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Twofold ‒ Dashboard",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen p-8">{children}</div>;
}
