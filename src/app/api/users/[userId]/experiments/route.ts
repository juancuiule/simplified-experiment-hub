import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const res = await fetch(`${API_URL}/users/${params.userId}/experiments`);
  const data = await res.json();
  return NextResponse.json(data);
}
