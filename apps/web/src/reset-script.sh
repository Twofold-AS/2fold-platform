# Reset til clean, basic oppsett

cd apps/web/src

# 1. Reset globals.css til basic
cat > app/globals.css << 'EOF'
@import "tailwindcss";
@plugin "@tailwindcss/typography";
@plugin "tailwindcss-animate";

/* Base */
html, body { height: 100%; }
body {
  @apply antialiased bg-white text-black dark:bg-neutral-950 dark:text-white;
}

/* Små justeringer for typografi */
.prose { @apply max-w-none; }
.prose :where(h1,h2,h3, h4){ @apply scroll-m-20; }
a { @apply underline-offset-4; }
EOF

# 2. Reset tailwind.config.ts til basic
cat > ../tailwind.config.ts << 'EOF'
import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [animate, typography]
} satisfies Config;
EOF

# 3. Reset Header til basic med alle links
cat > components/layout/Header.tsx << 'EOF'
import Link from 'next/link';
import { auth } from '@/server/auth';
import ThemeToggle from '@/components/ThemeToggle';

export default async function Header() {
  const session = await auth();
  
  return (
    <header className="border-b">
      <div className="container mx-auto h-14 flex items-center justify-between gap-4 px-4">
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="font-semibold">Twofold</Link>
          <Link href="/faq" className="opacity-80 hover:opacity-100">FAQ</Link>
          <Link href="/docs" className="opacity-80 hover:opacity-100">Docs</Link>
          <Link href="/api-docs" className="opacity-80 hover:opacity-100">API</Link>
          {session && <Link href="/dashboard" className="opacity-80 hover:opacity-100">Dashboard</Link>}
          {session && <Link href="/platform" className="opacity-80 hover:opacity-100">Platform</Link>}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {session ? (
            <a href="/api/auth/signout" className="text-sm underline">Logg ut</a>
          ) : (
            <Link href="/auth/signin" className="text-sm underline">Logg inn</Link>
          )}
        </div>
      </div>
    </header>
  );
}
EOF

# 4. Reset Footer til basic
cat > components/layout/Footer.tsx << 'EOF'
export default function Footer() {
  return (
    <footer className="border-t mt-8">
      <div className="container mx-auto px-4 py-8 text-center text-sm opacity-70">
        © {new Date().getFullYear()} Twofold AS
      </div>
    </footer>
  );
}
EOF

# 5. Reset layout.tsx til basic
cat > app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/components/Providers';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Twofold',
  description: 'Twofold platform',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className="min-h-screen bg-white text-black dark:bg-neutral-950 dark:text-white antialiased">
        <Providers>
          <Header />
          <main className="container mx-auto px-4 py-8">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
EOF

# 6. Basic forsiden med alle links
cat > app/\(marketing\)/page.tsx << 'EOF'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">Twofold Platform</h1>
        <p className="text-lg opacity-80 mb-8">
          Utviklingsplattform og skreddersydde løsninger
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild>
            <Link href="/dashboard">Gå til Dashboard</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/docs">Les Dokumentasjon</Link>
          </Button>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Navigasjon</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Dashboard</CardTitle>
              <CardDescription>Hovedkontrollpanel</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard" className="text-blue-600 underline">
                Åpne Dashboard →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Status</CardTitle>
              <CardDescription>Systemovervåking</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/platform" className="text-blue-600 underline">
                Se Platform Status →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Dokumentasjon</CardTitle>
              <CardDescription>Swagger UI og endpoints</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/api-docs" className="text-blue-600 underline">
                Åpne API Docs →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Dokumentasjon</CardTitle>
              <CardDescription>Guides og README</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/docs" className="text-blue-600 underline">
                Les Docs →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>FAQ</CardTitle>
              <CardDescription>Ofte stilte spørsmål</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/faq" className="text-blue-600 underline">
                Se FAQ →
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Innlogging</CardTitle>
              <CardDescription>GitHub OAuth</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/auth/signin" className="text-blue-600 underline">
                Logg inn →
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Health Check</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="/api/health" className="text-blue-600 underline">
                /api/health →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Platform Status</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="/api/status" className="text-blue-600 underline">
                /api/status →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>OpenAPI Spec</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="/api/openapi" className="text-blue-600 underline">
                /api/openapi →
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>tRPC</CardTitle>
            </CardHeader>
            <CardContent>
              <span className="text-gray-500">/api/trpc</span>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
EOF

# 7. Fjern alle GSAP/fancy filer
rm -f components/sections/HeroSection.tsx
rm -f components/ui/CustomCursor.tsx
rm -rf components/sections

echo "✅ Reset complete - basic clean setup ready!"
EOF