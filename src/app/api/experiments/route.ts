import { experiments } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  NextResponse.json(experiments);
}

export async function POST(request: Request) {
  // TODO create a new experiment

  return NextResponse.json({});
}
