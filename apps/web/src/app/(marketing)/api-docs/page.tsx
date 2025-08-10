import { auth } from "@/server/auth";
import Link from "next/link";
import SwaggerClient from "@#/components/SwaggerClient";

export default async function ApiDocs() {
  const session = await auth();
  const inProd = process.NODE_ENV === "production";
  if (inProd && !session) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-semibold mb-2">API-dokumentasjon</h1>
        <p className="opacity-80 mb-4">Logg inn for à se Swagger UI i produksjon.</p>
        <Link className="underline" href="/api/auth/signin">Logg inn</Link>
      </main>
    );
  }
  return (
    <main className="min-hreen p-4">
      <div className="max-w-5xl mx-auto">
        <SwaggerClient />
      </div>
    </main>
  );
}
