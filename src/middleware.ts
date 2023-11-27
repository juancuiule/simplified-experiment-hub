import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(
    `${new Date().toISOString()} => [${request.method}] ${
      request.nextUrl.pathname
    }`
  );

  const response = NextResponse.next();

  if (request.nextUrl.pathname.startsWith("/api")) {
    response.headers.append("Access-Control-Allow-Origin", "*");
  }

  return response;
}
export const config = {
  matcher: "/api/:path*",
};
