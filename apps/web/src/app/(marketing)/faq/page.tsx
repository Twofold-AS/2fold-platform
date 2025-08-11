import Link from "next/link";

export default function FAQ() {
  const faqs = [
    { slug: "velkommen", title: "Velkommen" },
    { slug: "deploy", title: "Deploy & miljøer" }
  ];
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-semibold mb-4">FAQ</h1>
      <ul className="space-y-2">
        {faqs.map(f => (
          <li key={f.slug}>
            <Link className="underline" href={`/faq/${f.slug}`}>{f.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
