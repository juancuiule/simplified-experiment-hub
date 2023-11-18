import { API_URL } from "@/constants";

export async function POST(request: Request) {
  const { email, password, name, organization } = await request.json();

  try {
    const data = await fetch(`${API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        name,
        organization,
        type: "SCIENTIST",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    return data;
  } catch (error) {
    console.log(error);
  }
}
