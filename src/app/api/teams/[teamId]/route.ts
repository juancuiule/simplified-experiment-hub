import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  const res = await fetch(`${API_URL}/teams/${params.teamId}`, {
    next: { revalidate: 0 },
  });
  console.log({ res });
  const data = await res.json();
  return NextResponse.json(data);
}
