import NextAuth from "next-auth";
import prisma from "./lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { findUserById } from "./lib/some-actions/find-user-byid";
import authConfig from "./auth.config";
import { UserRole } from "@prisma/client";
export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") return true;
      if (!user?.id) return false;
      const existingUser = await findUserById(user?.id);

      if (!existingUser?.emailVerified) return false;
      const expiration = Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60;
      user.customExpiration = expiration;
      return true;
    },
    async jwt({ user, token }) {
      if (!token.sub) return token;
      const existingUser = await findUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      if (user?.customExpiration) {
        token.expiration = user.customExpiration;
      }
      return token;
    },
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
        session.user.customExpiration = token?.expiration as number;
      }
      return session;
    },
  },
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
});
