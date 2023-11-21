import { views } from "@/mock-data";

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  return Response.json(views);
}

export async function POST(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  // TODO add an answer to an experiment

  return Response.json({});
}
