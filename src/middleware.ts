import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log(
    `${new Date().toISOString()} => [${request.method}] ${
      request.nextUrl.pathname
    }`
  );

  if (request.method === "OPTIONS") {
    const response = new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers":
          "Content-Type, Authorization, X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Date, X-Api-Version",
        "Access-Control-Max-Age": "86400",
      },
    });
    return response;
  }

  const response = await NextResponse.next();

  return response;
}
export const config = {
  matcher: "/api/:path*",
};
