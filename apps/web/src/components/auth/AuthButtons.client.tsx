"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function AuthButtons() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;

  if (session) {
    return (
      <div className="flex items-center gap-2">
        <span className="hidden sm:inline text-sm opacity-70">
          {session.user?.name ?? "Innlogget"}
        </span>
        <Button variant="outline" onClick={() => signOut({ callbackUrl: "/" })}>
          Logg ut
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={() => signIn("github", { callbackUrl: "/dashboard" })}>
      Logg inn
    </Button>
  );
}
