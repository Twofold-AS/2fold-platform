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
        <p className="leading-7">Mangler du noe? Ta kontakt, så fyller vi på.</p>
      </>
    ),
  },
  deploy: {
    title: "Deploy & miljøer",
    body: (
      <>
        <p className="leading-7">
          Vi deployer frontend til Vercel. Miljøvariabler styres i Vercel Dashboard.
        </p>
      </>
    ),
  },
};

export default async function FAQSlug({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = CONTENT[slug];
  if (!entry) return notFound();

  return (
    <main className="min-h-screen p-8 mx-auto max-w-3xl">
      <Link href="/faq" className="inline-block mb-4 underline">← Til FAQ</Link>
      <h1 className="text-3xl font-semibold mb-4">{entry.title}</h1>
      <div className="prose dark:prose-invert">{entry.body}</div>
    </main>
  );
}
