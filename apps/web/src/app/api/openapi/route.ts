import { getOpenApiSpec } from "@/server/openapi";

export async function GET() {
  const baseUrl = process.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  return Response.json(getOpenApiSpec(baseUrl));
}
