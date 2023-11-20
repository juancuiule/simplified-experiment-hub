import { API_URL } from "@/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const headers = new Headers(request.headers);
  return await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
}
