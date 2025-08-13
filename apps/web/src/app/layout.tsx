import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Twofold - Skreddersydde AI-løsninger',
  description: 'Vi bygger webapper, mobile apps og programvare drevet av kunstig intelligens',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen bg-twofold-dark text-twofold-cream antialiased overflow-x-hidden" style={{ cursor: 'none' }}>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
