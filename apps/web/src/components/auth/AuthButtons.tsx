import Link from "next/link";
import { auth } from "@/server/auth";
import { Button } from "@/components/ui/button";

export default async function AuthButtons() {
  const session = await auth(); // server-only

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm opacity-70">
          {session.user?.name ?? "Innlogget"}
        </span>
        <form action="/api/auth/signout" method="post">
          <Button variant="outline">Logg ut</Button>
        </form>
      </div>
    );
  }

  return (
    <Button asChild>
      <Link href="/auth/signin">Logg inn</Link>
    </Button>
  );
}
