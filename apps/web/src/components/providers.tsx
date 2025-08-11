'use client';
import type { ReactNode } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  // Legg evt. SessionProvider, ThemeProvider, QueryClientProvider her
  return <>{children}</>;
}
