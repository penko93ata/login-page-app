import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import { decryptSession } from "./lib/session";

const protectedRoutes = ["/"];
const publicRoutes = ["/login", "/forgot-password", "/about", "/contact"];

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(path);
  const isPublicRoute = publicRoutes.includes(path);

  const cookie = request.cookies.get("session")?.value;
  const session = await decryptSession(cookie);

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  if (isPublicRoute && session) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
