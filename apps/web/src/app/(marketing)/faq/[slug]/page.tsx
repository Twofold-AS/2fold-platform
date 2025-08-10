import { notFound } from "next/navigation";

export default async function FaqArticle({ params }: { params: { slug: string }}) {
  try {
    const mod = await import(`@/content/faq/${params.slug}.mdx`);
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
