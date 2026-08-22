import { NextRequest, NextResponse } from "next/server";

const productHosts: Record<string, string> = {
  "anvaya.teihsra.com": "/products/anvaya",
  "shalya.teihsra.com": "/products/shalya",
  "nukta.teihsra.com": "/products/nukta",
  "reva.teihsra.com": "/products/reva",
};

export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host")?.split(":")[0];
  const productPath = hostname ? productHosts[hostname] : undefined;

  if (!productPath) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();

  // Prevent rewriting an already-internal product route again.
  if (url.pathname.startsWith("/products/")) {
    return NextResponse.next();
  }

  // Preserve any path after the subdomain.
  // anvaya.teihsra.com/         -> /products/anvaya
  // anvaya.teihsra.com/contact  -> /products/anvaya/contact
  url.pathname =
    url.pathname === "/"
      ? productPath
      : `${productPath}${url.pathname}`;

  return NextResponse.rewrite(url);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};