# Twofold Platform — README

## Oversikt
Monorepo (pnpm/Turborepo) med Next.js App Router i `apps/web`. Skille mellom **(marketing)** (public) og **(dashboard)** (autentisert), deploy på **Vercel**, stabile bygg og ruter.

## Ruter
- Public: `/`, `/faq`, `/faq/[slug]`, `/api-docs`, `/docs`, `/docs/readme`
- Autentisert: `/dashboard`
- OpenAPI JSON: `/api/openapi` (vises på `/api-docs`)

## Stack
- Next.js 15 (App Router, TS), React 18
- Tailwind v4 + next-themes
- NextAuth (server: `auth()`)
- Swagger UI (via `swagger-ui-react`)
- React Flow (plattform-graf)
- pnpm + Turborepo
- Prisma (klar – kobles til DB ved behov)

## Struktur (apps/web/src)
app/
  (marketing)/
    page.tsx
    faq/
      page.tsx
      [slug]/page.tsx
    api-docs/page.tsx
    docs/
      page.tsx
      readme/page.tsx
  (dashboard)/
    dashboard/page.tsx
  api/
    openapi/route.ts
  layout.tsx
components/
  PlatformGraph.client.tsx
  SwaggerClient.tsx
  ThemeToggle.tsx
  providers.tsx
lib/
server/
  auth.ts
styles/
  globals.css

`@/` peker til `apps/web/src` (se tsconfig).

## Viktige regler
- Klientkomp? bruk `"use client"` og *ikke* `ssr:false` i server-komp.
- Next 15: `params`/`headers` kan være `Promise` → `await`.
- Public-sider inn i `(marketing)`; innlogget i `(dashboard)`.

## Miljøvariabler (Vercel)
- `NEXT_PUBLIC_APP_URL`
- `NEXTAUTH_SECRET`
- `DATABASE_URL` (senere)

## Lokalt
pnpm install
pnpm -C apps/web dev
pnpm -C apps/web build && pnpm -C apps/web start
