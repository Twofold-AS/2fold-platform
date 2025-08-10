"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { LDProvider } from "launchdarkly-react-client-sdk";

export function Providers({ children }: { children: ReactNode }) {
  const id = process.env.NEXT_PUBLIC_LD_CLIENT_ID;

  const withTheme = (c: ReactNode) => (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {c}
    </ThemeProvider>
  );

  // Ingen ID satt → ikke init LD (unngå warnings)
  if (!id) return withTheme(children);

  return withTheme(<LDProvider clientSideID={id}>{children}</LDProvider>);
}
