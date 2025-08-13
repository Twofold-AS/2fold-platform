import { auth } from '@/server/auth';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function ApiDocsPage() {
  const session = await auth();
  const inProd = process.env.NODE_ENV === 'production';

  if (inProd && !session) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <h1 className="text-3xl font-semibold mb-4">API Documentation</h1>
        <p className="text-gray-600 mb-6">
          Sign in with your GitHub account to access the API documentation.
        </p>
        <Link 
          href="/auth/signin" 
          className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
        >
          Sign in with GitHub
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-semibold mb-2">API Documentation</h1>
        <p className="text-gray-600">
          Interactive documentation for the Twofold Platform API
        </p>
      </div>
      
      <div className="grid gap-4">
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Available Endpoints</h2>
          
          <div className="space-y-4">
            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-medium">GET /api/health</h3>
              <p className="text-gray-600">System health check</p>
            </div>
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-medium">GET /api/status</h3>
              <p className="text-gray-600">Platform status overview</p>
            </div>
            
            <div className="border-l-4 border-purple-500 pl-4">
              <h3 className="font-medium">GET /api/openapi</h3>
              <p className="text-gray-600">OpenAPI specification</p>
              <Link href="/api/openapi" className="text-blue-600 underline text-sm">
                View raw spec →
              </Link>
            </div>
            
            <div className="border-l-4 border-orange-500 pl-4">
              <h3 className="font-medium">POST /api/upgrade</h3>
              <p className="text-gray-600">Create package upgrade PR</p>
            </div>
          </div>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <h3 className="font-medium text-yellow-800">Note</h3>
          <p className="text-yellow-700 mt-1">
            Interactive Swagger UI is coming soon. For now, you can access the raw OpenAPI spec above.
          </p>
        </div>
      </div>
    </div>
  );
}
