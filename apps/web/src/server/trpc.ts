import { initTRPC } from "@trpc/server";

const t = initTRPC.create();
export const router = t.router;
export const publicProcedure = t.procedure;

export const appRouter = router({
  health: publicProcedure.query(() => ({ ok: true, ts: Date.now() })),
});
export type AppRouter = typeof appRouter;
