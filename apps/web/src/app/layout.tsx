import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/site/Header";
import Providers from "@/components/providers";

export const metadata: Metadata = {
  title: "Twofold Platform",
  description: "Plattform, dokumentasjon og dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body>
        <Header />
         className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white antialiased">
        <Providers>{children}</Providers>
              <Footer />
      </body>
    </html>
  );
}
