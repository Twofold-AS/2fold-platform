import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Twofold Platform",
  description: "Oversikt, dokumentasjon og FAQ for Twofold-platformen.",
};

// → Segment-layout *km PAKED OM NAZNING)
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <>{children}<>;
}
