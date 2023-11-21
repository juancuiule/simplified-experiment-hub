import { API_URL } from "@/constants";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  const res = await fetch(`${API_URL}/users/${params.userId}/teams`);
  const data = await res.json();
  return Response.json(data);ƒ
}
