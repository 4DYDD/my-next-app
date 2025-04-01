import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const isLogin = false; // Replace with actual logic to determine login status

  if (isLogin) {
    return NextResponse.next();
  } else {
    console.log(req.url);
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: ["/products/:path*"],
};
