import { views } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  return NextResponse.json(views);
}