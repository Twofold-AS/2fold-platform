// components/layout/AuthSection.tsx
import { auth } from '@/server/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AuthSection() {
  const session = await auth();

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm opacity-70">
          {session.user?.name ?? 'Bruker'}
        </span>
        <form action="/api/auth/signout" method="post">
          <Button type="submit" variant="outline" size="sm">
            Logg ut
          </Button>
        </form>
      </div>
    );
  }

  return (
    <Button asChild size="sm">
      <Link href="/auth/signin">Logg inn</Link>
    </Button>
  );
}