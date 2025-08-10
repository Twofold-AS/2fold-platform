import NextAuth, { type NextAuthOptions } from "next-auth";
import Github from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [Github({ allowDangerousEmailAccountLinking: true })],
  session: { strategy: "database" },
  callbacks: {
    session: async ({ session, user }) => {
      if (session.user) (session.user as any).id = user.id;
      return session;
    }
  }
};

export const { handlers: { GET, POST }, auth } = NextAuth(authOptions);
