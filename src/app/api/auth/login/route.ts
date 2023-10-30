import { API_URL } from "@/constants";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  return await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then(async (res) => {
      return { res, data: await res.json() };
    })
    .then(({ res, data }) => {
      return new Response(JSON.stringify(data), { status: res.status });
    })
    .catch((err) => {
      return new Response(JSON.stringify(err), {
        status: 500,
      });
    });
}
