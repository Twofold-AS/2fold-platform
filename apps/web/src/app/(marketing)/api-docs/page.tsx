import { auth } from '@/server/auth';
import Link from 'next/link';
import SwaggerClient from '@/components/api/SwaggerUI';

export const dynamic = 'force-dynamic';

export default async function ApiDocsPage() {
  const session = await auth();
  const inProd = process.env.NODE_ENV === 'production';

  if (inProd && !session) {
    return (
      <div>
        <h1 className="text-3xl font-semibold mb-2">API-dokumentasjon</h1>
        <p className="opacity-80 mb-4">Logg inn for å se Swagger UI i produksjon.</p>
        <Link className="underline" href="/auth/signin">Logg inn</Link>
      </div>
    );
  }

  return <div className="max-w-5xl mx-auto"><SwaggerClient /></div>;
}
