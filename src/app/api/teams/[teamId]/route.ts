import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  const res = await fetch(`${API_URL}/teams/${params.teamId}`, {
    next: { revalidate: 0 },
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function DELETE(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  const res = await fetch(`${API_URL}/teams/${params.teamId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return NextResponse.json(data);
}
