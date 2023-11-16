import { views } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  // return flow and views

  return NextResponse.json(views);
}

export async function PUT(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  // TODO update an experiment's flow

  return NextResponse.json({});
}
