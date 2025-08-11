"use client";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
      <SpeedInsights />
    </ThemeProvider>
  );
}
