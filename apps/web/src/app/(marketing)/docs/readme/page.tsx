import fs from "node:fs";
import path from "node:path";
import { marked } from "marked";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platform README",
  description: "Architecture and operations overview for Twofold."
};

export default async function ReadmePage() {
  const mdPath = path.join(process.cwd(), "README.md");
  const md = fs.readFileSync(mdPath, "utf8");
  const html = marked.parse(md) as string;

  return (
    <main className="mx-auto max-w-3xl p-8">
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
