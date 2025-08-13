"use client";
import { useFlags } from "launchdarkly-react-client-sdk";
import Link from "next/link";

export function LDDemo() {
  // Definer flag i LaunchDarkly: key = showNewCTA (boolean)
  const { showNewCTA } = useFlags() as { showNewCTA?: boolean };
  if (!showNewCTA) return null;
  return (
    <Link className="px-4 py-2 rounded-xl border" href="/faq">
      Ny CTA (flagget showNewCTA)
    </Link>
  );
}
