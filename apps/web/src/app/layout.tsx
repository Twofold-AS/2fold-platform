import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Twofold Platform",
  description: "Oversikt, dokumentasjon og FAQ for Twofold-plattformen."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no">
      <body>{children}</body>
    </html>
  );
}
