import { API_URL } from "@/constants";

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  return fetch(`${API_URL}/users/${params.userId}/teams`);
}
