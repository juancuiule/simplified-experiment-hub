export async function POST(request: Request) {
  const { email, password, name } = await request.json();
  console.log({ email, password, name });

  try {
    const data = await fetch("https://api.experiment-hub.com/users", {
      method: "POST",
      body: JSON.stringify({
        email: "juani@gmail.com",
        password: "abc123",
        type: "SCIENTIST",
        name: "Juani",
      }),
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then((res) => res.json())
      .catch((err) => {
        console.log(err);
      });

    console.log("Algo");

    return data;
  } catch (error) {
    console.log(error);
  }
}
