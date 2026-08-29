import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";

  if (host.startsWith("web-development.")) {
    return NextResponse.rewrite(new URL("/landing/web-development", req.url));
  }

  if (host.startsWith("digital-marketing.")) {
    return NextResponse.rewrite(new URL("/landing/digital-marketing", req.url));
  }

  return NextResponse.next();
}
