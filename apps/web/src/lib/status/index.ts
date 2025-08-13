import { prisma } from "@/lib/db/prisma";

export type PlatformStatus = {
  db: boolean;
  env: Record<string, boolean>;
  time: number;
  endpoints: { path: string; ok: boolean }[];
};

const ENDPOINTS = [
  "/api/health",
  "/api/openapi",
  "/api/trpc",
  "/api/upgrade",
  "/api/github/webhook",
  // NB: ikke legg /api/status her, for å unngå rekursjon
];

export async function getStatus(baseUrl: string): Promise<PlatformStatus> {
  let db = false;
  try { await prisma.$queryRaw`SELECT 1`; db = true; } catch {}

  const envKeys = ["NEXT_PUBLIC_APP_URL","NEXTAUTH_SECRET","GITHUB_APP_ID","SENTRY_DSN"];
  const env: Record<string, boolean> = Object.fromEntries(envKeys.map(k => [k, !!process.env[k]]));

  const endpoints = await Promise.all(
    ENDPOINTS.map(async (p) => {
      try {
        const res = await fetch(`${baseUrl}${p}`, { cache: "no-store" });
        return { path: p, ok: res.ok };
      } catch {
        return { path: p, ok: false };
      }
    })
  );

  return { db, env, time: Date.now(), endpoints };
}
