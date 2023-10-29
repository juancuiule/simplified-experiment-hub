import { API_URL } from "@/constants";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  return await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}
