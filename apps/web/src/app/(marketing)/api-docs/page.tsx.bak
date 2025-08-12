import { auth } from "@/server/auth";
import Link from "next/link";
import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";

const SwaggerClient = dynamic(() => import("@/components/SwaggerClient"), { ssr: false });

export default async function ApiDocsPage() {
  const session = await auth();
  const inProd = process.env.NODE_ENV === "production";

  if (inProd && !session) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-semibold mb-2">API-dokumentasjon</h1>
        <p className="opacity-80 mb-4">Logg inn for å se Swagger UI i produksjon.</p>
        <Link className="underline" href="/auth/signin">Logg inn</Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-4">
      <div className="max-w-5xl mx-auto">
        <SwaggerClient />
      </div>
    </main>
  );
}
