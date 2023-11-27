import { API_URL } from "@/constants";
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
  return NextResponse.json(data);
}
