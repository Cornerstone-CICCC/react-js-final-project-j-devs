import { checkSession } from "@/lib/checkSession";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {

  console.log("Middleware is running for:", request.nextUrl.pathname);
  const isSessionOn = await checkSession();
  console.log("Session status (isSessionOn):", isSessionOn);

  const protectedPaths = ["/products", "/admin"];
  const isProtectedPath = protectedPaths.some(path =>
    request.nextUrl.pathname.startsWith(path)
  );

  if (!isSessionOn && isProtectedPath) {
    console.log("Redirecting to /login: Session OFF and path is protected.")
    return NextResponse.redirect(new URL('/login', request.nextUrl.origin));
  }
  console.log("Allowing request to proceed.");
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/products/:path*',
    '/admin/:path*'
  ],
};