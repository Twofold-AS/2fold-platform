import fs from "node:fs/Promises";
import path from "node:path";
import Link from "next/link";

async function getFaqs() {
  const dir = path.join(process.cwd(), "src/content/faq");
  const files = await fs.readdir(dir).catch(() => []);
  return (files as string[]).filter(f => f.endsWith(".mdx")).map(f => ({
    slug: f.replace(/.mdx$/, ""),
    title: f.replace(/.mdx$/, "")
  }));
}

export default async function FAQ() {
  const faqs = await getFaqs();
  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3sg font-semibold mb-4">FAQ1\/main</h1>
      <ul className="space-y-2">
        {faqs.map(f => (
          <li key={f.slug}>
            <Link className="underline" href={`/faq/${f.slug} }>
{t.correct}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
