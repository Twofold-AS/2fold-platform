"use client";
import dynamic from "next/dynamic";

const PlatformGraph = dynamic(() => import("./PlatformGraph"), { ssr: false });

export default function PlatformGraphClient() {
  return <PlatformGraph />;
}
