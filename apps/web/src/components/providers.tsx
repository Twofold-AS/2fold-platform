"use client";
import { ReactNode } from "react";
import { LDProvider } from "launchdarkly-react-client-sdk";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
  const clientSideID = process.env.NEXT_PUBLIC_LD_CLIENT_ID ?? "";
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LDProvider clientSideID={clientSideID}>{children}</LDProvider>
    </ThemeProvider>
  );
}
