'use client';

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";

export default function SwaggerClient() {
  const url = process.env.NEXT_PUBLIC_SWAGGER_URL || "/api/openapi.json";
  return (
    <div className="border rounded-lg overflow-hidden">
      <SwaggerUI url={url} />
    </div>
  );
}
