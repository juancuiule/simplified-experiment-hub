import { API_URL } from "@/constants";

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const res = await fetch(`${API_URL}/experiments/${params.experimentId}`);
  const data = await res.json();
  return Response.json(data);
}

export async function PATCH(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  const body = await request.json();

  const res = await fetch(`${API_URL}/experiments/${experimentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
}
