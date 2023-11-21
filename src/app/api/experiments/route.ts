import { API_URL } from "@/constants";

export async function GET(request: Request) {
  const res = await fetch(`${API_URL}/experiments`);
  const data = await res.json();
  return Response.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();

  const res = await fetch(`${API_URL}/experiments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return Response.json(data);
}
