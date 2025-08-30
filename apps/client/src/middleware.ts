import { NextRequest, NextResponse } from "next/server";
import { getServerAuthSession } from "@/shared/auth-client";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const { session } = await getServerAuthSession();

  if (path === "/") {
    if (session?.user) {
      return NextResponse.redirect(new URL("/dashboard", req.nextUrl));
    }
    return NextResponse.redirect(new URL("/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
