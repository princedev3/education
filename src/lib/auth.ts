export const runtime = "nodejs";
import prisma from "./prisma";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { v4 as uuid } from "uuid";
import { encode as defaultEncode } from "next-auth/jwt";
import bcrypt from "bcryptjs";
import { generateVerificationtokenbyemail } from "./some-actions/generateverificationtokenbtemail";
import { sendVerificationEmail } from "./some-actions/mail";
import { NextResponse } from "next/server";

const adapter = PrismaAdapter(prisma);
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    GoogleProvider,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        const { email, password } = credentials;
        const user = await prisma.user.findUnique({
          where: {
            email: email as string,
          },
        });

        if (!user) {
          throw new Error("invalid credentials");
        }
        const isPasswordCorrect = await bcrypt.compare(
          password as string,
          user?.password as string
        );
        if (!isPasswordCorrect) {
          return null;
        }
        if (!user.emailVerified) {
          const verifyToken = await generateVerificationtokenbyemail(
            email as string
          );
          await sendVerificationEmail(email as string, verifyToken.token);
          return null;
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: user.email as string },
        });

        if (existingUser) {
          await prisma.account.upsert({
            where: {
              provider_providerAccountId: {
                provider: "google",
                providerAccountId: account.providerAccountId,
              },
            },
            update: {},
            create: {
              userId: existingUser.id,
              provider: "google",
              providerAccountId: account.providerAccountId,
              type: account.type,
              access_token: account.access_token,
              expires_at: account.expires_at,
              id_token: account.id_token,
              scope: account.scope,
              token_type: account.token_type,
            },
          });
        } else {
          await prisma.user.create({
            data: {
              email: user.email as string,
              name: user.name || "New User",
              image: user.image as string,
              password: "",
              accounts: {
                create: {
                  provider: "google",
                  providerAccountId: account.providerAccountId,
                  type: account.type,
                  access_token: account.access_token,
                  expires_at: account.expires_at,
                  id_token: account.id_token,
                  scope: account.scope,
                  token_type: account.token_type,
                },
              },
            },
          });
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.email = user.email;
      } else if (!token.role && token.email) {
        const dbUser = await prisma.user.findUnique({
          where: { email: token.email },
          select: { role: true },
        });
        token.role = dbUser?.role || "USER";
      }
      return token;
    },
    async session({ session, token }) {
      if (token.role) {
        session.user.role = token.role as string;
      }
      return session;
    },
  },
});
// jwt: {
//   secret: process.env.AUTH_SECRET as string,
//   encryption: true,

// },
// encode: async function (params) {
//   if (params.token?.credentials) {
//     const sessionToken = uuid();

//     if (!params.token.sub) {
//       throw new Error("No user ID found in token");
//     }

//     const createdSession = await adapter?.createSession?.({
//       sessionToken: sessionToken,
//       userId: params.token.sub,
//       expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
//     });

//     if (!createdSession) {
//       throw new Error("Failed to create session");
//     }

//     return sessionToken;
//   }
//   return defaultEncode(params);

// },
