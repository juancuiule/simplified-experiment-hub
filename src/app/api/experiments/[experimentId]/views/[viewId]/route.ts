import { API_URL } from "@/constants";

export async function PUT(
  request: Request,
  { params }: { params: { experimentId: string; viewId: string } }
) {
  const body = await request.json();
  const { experimentId, viewId } = params;
  const res = await fetch(
    `${API_URL}/experiments/${experimentId}/views/${viewId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );
  const data = await res.json();
  return Response.json(data);
}
