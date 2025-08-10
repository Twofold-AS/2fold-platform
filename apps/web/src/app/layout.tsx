import "../styles/globals.css";
import type { Metadata } from "next";
import { Providers } from "@/components/providers";

export const metadata: Metadata = {
  title: "Twofold",
  description: "Oversikt & FAQ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
