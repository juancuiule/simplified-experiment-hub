import { API_URL } from "@/constants";

export async function GET(request: Request) {
  return await fetch(`${API_URL}/experiments`);
}

export async function POST(request: Request) {
  const body = await request.json();

  return await fetch(`${API_URL}/experiments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
