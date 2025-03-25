import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
const authRoute = ["/login", "/register", "/verify-email", "/forgot-email"];
export default async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    cookieName: "next-auth.session-token",
  });

  if (token && authRoute.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
