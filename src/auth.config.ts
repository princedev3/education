import Credentials from "next-auth/providers/credentials";
import { findUserByEmail } from "./lib/some-actions/find-existing-user-by-email";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("Invalid credentials");
        }

        const userByEmail = await findUserByEmail(email as string);
        if (!userByEmail || !userByEmail.password) {
          throw new Error("Invalid credentials");
        }

        const passwordMatch = await bcrypt.compare(
          password as string,
          userByEmail.password
        );

        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: userByEmail.id,
          name: userByEmail.name,
          email: userByEmail.email,
          role: userByEmail.role,
          img: userByEmail.img,
          emailVerified: userByEmail.emailVerified,
        };
      },
    }),
  ],
} satisfies NextAuthConfig;
