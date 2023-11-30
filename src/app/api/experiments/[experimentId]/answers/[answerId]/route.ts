import { API_URL } from "@/constants";
import { NextResponse } from "next/server";

export async function PUT(
  request: Request,
  { params }: { params: { experimentId: string; answerId: string } }
) {
  const { experimentId, answerId } = params;

  const body = await request.json();

  const res = await fetch(
    `${API_URL}/experiments/${experimentId}/answers/${answerId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return NextResponse.json(data);
}
