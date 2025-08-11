import { notFound } from "next/navigation";
import Link from "next/link";

const CONTENT: Record<string, { title: string; body: JSX.Element }> = {
  velkommen: {
    title: "Velkommen",
    body: (
      <>
        <p className="leading-7">
          Dette er Twofold sin FAQ. Her finner du korte svar på vanlige spørsmål.
        </p>
        <p className="leading-7">
          Mangler du noe? Ta kontakt, så fyller vi på.
        </p>
      </>
    ),
  },
  deploy: {
    title: "Deploy & miljøer",
    body: (
      <>
        <p className="leading-7">
          Vi deployer frontend til Vercel. Miljøvariabler styres i Vercel
          Dashboard. API-er eksponeres via /api-ruter i Next.
        </p>
      </>
    ),
  },
};

export default function FAQSlug({ params }: { params: { slug: string } }) {
  const entry = CONTENT[params.slug];
  if (!entry) return notFound();

  return (
    <main className="min-h-screen p-8 mx-auto max-w-3xl">
      <Link href="/faq" className="inline-block mb-4 underline">← Til FAQ</Link>
      <h1 className="text-3xl font-semibold mb-4">{entry.title}</h1>
      <div className="prose dark:prose-invert">{entry.body}</div>
    </main>
  );
}
