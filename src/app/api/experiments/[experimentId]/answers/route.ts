import { views } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  return NextResponse.json(views);
}

export async function POST(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  // TODO add an answer to an experiment

  return NextResponse.json({});
}
