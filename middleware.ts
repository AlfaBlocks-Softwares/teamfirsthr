import { NextRequest, NextResponse } from "next/server";
import { isPathAllowed } from "./utils/protectedroutes";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth")?.value;

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if ((pathname === "/login" || pathname === "/") && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (token && pathname.startsWith("/dashboard")) {
    const userRole = req.cookies.get("role")?.value ?? "";

    if (!isPathAllowed(pathname, userRole)) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/"],
};
