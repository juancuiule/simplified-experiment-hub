import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const response = NextResponse.json({});

    cookies().delete("accessToken");

    return response;
  } catch (error) {
    return NextResponse.error();
  }
}
