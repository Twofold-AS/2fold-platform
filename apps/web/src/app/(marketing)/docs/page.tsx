import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Docs" };

export default function DocsIndex() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-semibold mb-4">Docs</h1>
      <ul className="list-disc pl-6 space-y-2">
        <li><Link className="underline" href="/docs/readme">Platform README</Link></li>
      </ul>
    </main>
  );
}
