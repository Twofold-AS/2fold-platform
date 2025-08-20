import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import Providers from "@/components/sections/Providers"
import { GeistSans } from "geist/font/sans"

export const metadata: Metadata = {
  title: "YOYO – AI Version Control for Vibe Coding | Instantly Undo AI Mistakes",
  description: "AI coding doesn't have an undo button—until now. YOYO snapshots your code before AI breaks it. Instantly save, preview, and restore your work. Works with Cursor, Windsurf, VS Code, Claude Code, and OpenAI Codex.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@geist-ui/core@latest/dist/geist-ui.css" />
      </head>
      <body className={GeistSans.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}