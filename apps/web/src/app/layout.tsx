import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "Twofold",
  description: "Marketing, docs og dashboard i én kodebase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white antialiased">
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
