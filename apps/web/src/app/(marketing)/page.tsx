import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="space-y-8">
      <section className="text-center py-12">
        <h1 className="text-4xl font-bold mb-4">The Fold</h1>
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
        </div>
      </section>
    </div>
  );
}
