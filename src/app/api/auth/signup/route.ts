import { API_URL } from "@/constants";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  const response = NextResponse.json(data);

  cookies().set("accessToken", data.accessToken);

  return response;
}
