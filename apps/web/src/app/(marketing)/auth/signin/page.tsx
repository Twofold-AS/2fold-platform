/* eslint-disable @next/next/no-html-link-for-pages */
import { auth } from "@/server/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    return (
      <main className="container mx-auto p-8">
        <h1 className="text-2xl font-semibold mb-4">Du er allerede innlogget</h1>
        <div className="flex gap-4">
          <Link className="underline" href="/dashboard">Gå til dashboard</Link>
          <a className="underline" href="/api/auth/signout">Logg ut</a>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-semibold mb-4">Logg inn</h1>
      <p className="opacity-80 mb-6">Bruk GitHub-konto (kun organisasjonen er tillatt).</p>
      <a className="inline-block underline" href="/api/auth/signin">Fortsett med GitHub</a>
    </main>
  );
}
