export async function POST(request: Request) {
  const { email, password } = await request.json();

  return await fetch("https://api.experiment-hub.com/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => res.json());
}
