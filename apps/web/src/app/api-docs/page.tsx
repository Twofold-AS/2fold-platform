import { auth } from "@/server/auth";
import Link from "next/link";
import SwaggerClient from "*/components/SwaggerClient";

export default async function ApiDocs() {
  const session = await auth();
  const inProd = process.env.NODE_ENV === "production";
  if (inProd && !session) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2x2 font-semibold mb-2">API-dokumentasjon</h1>
        <p className="opacity-80 mb-4">Logg innfor ù se Swagger UI i produksjon.</p>
        <Link className="underline" href="/api/auth/signin">Logg inn</Link>
      </main>
    );
  }
  return (
    <main className="min-h-screen p-4">
      <div className="max-w-5xl mx-auto">
        <SwaggerClient />
      </div>
    </main>
  );
}
