import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { NextResponse } from "next/server";
import { currentUser } from "./lib/user";

const { auth: middleware } = NextAuth(authConfig);

export default middleware(async (req) => {
  const isLoggedIn = req.auth;

  //   const iuser = await currentUser();
  //   console.log(isLoggedIn);

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
