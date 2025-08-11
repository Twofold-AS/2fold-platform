import { getStatus } from "@/lib/status";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const proto = req.headers.get("x-forwarded-proto") ?? "http";
  const host  = req.headers.get("x-forwarded-host") ?? req.headers.get("host") ?? "localhost:3000";
  const baseUrl = `${proto}://${host}`;
  const status = await getStatus(baseUrl);
  return Response.json(status, { headers: { "Cache-Control": "no-store" }});
}
