import "./globals.css";
import Providers from "@/components/providers";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white antialiased">
        <Header />
        <Providers>{children}</Providers>
        <Footer />
      </body>
    </html>
  );
}
