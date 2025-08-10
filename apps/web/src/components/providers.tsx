"use client";

import { ReactNode, useEffect, useState } from "react";
import { LDProvider } from "launchdarkly-react-client-sdk";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: ReactNode }) {
  const clientSideID = process.env.NEXT_PUBLIC_LD_CLIENT_ID ?? "";
  const [mounted, setMounted] = useState(false);

  // Vent til klient mount for å unngå mismatch mellom SSR og client
  useEffect(() => setMounted(true), []);

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <LDProvider clientSideID={clientSideID}>
        {/* Skjul innhold frem til mount for å unngå visuell “blink” */}
        <div style={mounted ? undefined : { visibility: "hidden" }}>
          {children}
        </div>
      </LDProvider>
    </ThemeProvider>
  );
}
