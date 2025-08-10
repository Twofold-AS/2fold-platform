// src/server/auth.ts (NextAuth v4-stil)
import NextAuth, { type NextAuthOptions, getServerSession } from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "database" },
  providers: [
    Github({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      // legg kun det du trenger i session
      if (session.user) session.user.id = user.id;
      return session;
    },
  },
};

// I v4 er NextAuth(...) en request handler-funksjon
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// liten helper så du kan bruke `const session = await auth()` i server-komponenter
export const auth = () => getServerSession(authOptions);
