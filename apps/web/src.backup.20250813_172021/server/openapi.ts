export function getOpenApiSpec(baseUrl: string) {
  return {
    openapi: "3.0.0",
    info: { title: "Twofold API", version: "0.1.0" },
    servers: [{ url: baseUrl }],
    paths: {
      "/api/health": {
        get: {
          summary: "Health check",
          responses: {
            "200": {
              description: "OK",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: { ok: { type: "boolean" }, ts: { type: "number" } },
                    required: ["ok", "ts"]
                  }
                }
              }
            }
          }
        }
      }
    }
  } as const;
}
