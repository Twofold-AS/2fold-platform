'use client';
export default function SwaggerClient() {
  const url = '/api/openapi.json';
  return (
    <iframe
      src={`https://petstore.swagger.io/?url=${encodeURIComponent(url)}`}
      className="w-full h-[70vh] border rounded-md bg-white"
      title="Swagger UI"
    />
  );
}
