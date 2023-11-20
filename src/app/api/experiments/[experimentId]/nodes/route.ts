import { API_URL } from "@/constants";

export async function PUT(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const body = await request.json();
  const { experimentId } = params;
  return await fetch(`${API_URL}/experiments/${experimentId}/nodes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
