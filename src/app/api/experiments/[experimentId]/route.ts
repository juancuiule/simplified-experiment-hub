import { experiments } from "@/mock-data";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;
  const experiment = experiments.find((e) => e.slug === experimentId);

  if (!experiment) {
    return new Response("Experiment not found", {
      status: 404,
    });
  } else {
    return NextResponse.json(experiment);
  }
}
