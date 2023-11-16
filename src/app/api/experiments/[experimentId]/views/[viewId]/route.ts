import { views } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string; viewId: string } }
) {
  // TODO get an specific view

  return NextResponse.json(views);
}

export async function PUT(
  request: Request,
  { params }: { params: { experimentId: string; viewId: string } }
) {
  // TODO update a view

  return NextResponse.json({});
}
