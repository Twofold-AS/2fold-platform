import { notFound } from "next/navigation";

export default async function FaqArticle({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  try {
    const mod = await import(`@/content/faq/${slug}.mdx`);
    const Content = mod.default;
    return (
      <main className="min-h-screen p-8">
        <article className="prose max-w-2xl dark:prose-invert">
          <Content />
        </article>
      </main>
    );
  } catch {
    notFound();
  }
}
