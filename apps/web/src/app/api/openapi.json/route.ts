import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";
export async function GET() {
  return NextResponse.json({
    openapi: "3.0.0",
    info: { title: "Twofold API", version: "0.1.0" },
    servers: [{ url: "/" }],
    paths: {
      "/api/health": {
        get: { summary: "Health check", responses: { "200": { description: "OK" } } }
      }
    }
  });
}
