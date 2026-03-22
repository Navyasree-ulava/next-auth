import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const token = request.cookies.get("token")?.value;

  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";

  // ✅ Logged-in user → block login/signup
  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Not logged-in → block protected routes
  if (!token && (path.startsWith("/profile") || path === "/logout")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // ✅ Allow everything else
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup", "/logout", "/verifyemail"],
};