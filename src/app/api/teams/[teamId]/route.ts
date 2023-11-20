import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { teamId: string } }
) {
  return fetch(`${API_URL}/teams/${params.teamId}`);
}
