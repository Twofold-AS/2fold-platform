import { auth } from '@/server/auth';
import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect('/auth/signin?callbackUrl=/dashboard');
  return <>{children}</>;
}
