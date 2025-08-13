import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function GET() {
  const spec = {
    openapi: '3.0.3',
    info: { title: 'Twofold API', version: '0.1.0' },
    paths: { '/health': { get: { responses: { '200': { description: 'ok' } } } } },
  };
  return NextResponse.json(spec);
}
