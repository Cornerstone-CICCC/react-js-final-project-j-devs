import { checkSession } from "@/lib/checkSession";
import { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const isSessionOn = await checkSession()
  if (!isSessionOn) {
    if (request.nextUrl.pathname.startsWith("/products")) {
      return NextResponse.rewrite(new URL('/login', request.url))
    }
  }
  return NextResponse.next()
}