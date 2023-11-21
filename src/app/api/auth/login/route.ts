import { API_URL } from "@/constants";

export async function POST(request: Request) {
  const body = await request.json();
  const headers = new Headers(request.headers);
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(body),
    headers,
  });
  const data = await res.json();
  return Response.json(data);
}
