import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/shared/auth-client";

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  const { session } = await getAuthSession();

  if (path.startsWith("/auth")) {
    if (session?.user) return NextResponse.redirect(new URL("/", req.nextUrl));
    if (path.startsWith("/auth/login") || path.startsWith("/auth/register"))
      return NextResponse.next();
    return NextResponse.redirect("/auth/login");
  }

  if (path === "/") {
    if (session?.user) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (!session?.user) {
    const loginUrl = new URL("/auth/login", req.nextUrl);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
