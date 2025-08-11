"use client";
import dynamic from "next/dynamic";

const PlatformGraph = dynamic(() => import("./PlatformGraph"), { ssr: false });

export default function PlatformGraphClient({ status }: { status?: unknown }) {
  if (!status) return null;
  // Vi skjermar TS her – PlatformGraph har sin egen prop-type
  // @ts-expect-error passthrough til korrekt types i PlatformGraph.tsx
  return <PlatformGraph status={status} />;
}
