import { WordpressPost } from "./types";

export async function getNotas(
  args: Record<string, any>,
  reduced: boolean = false
) {
  return (await fetch(
    `https://pabgon18.dream.press/wp-json/api/gato_get_posts/`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ args: JSON.stringify(args), reduced: reduced }),
    }
  ).then((res) => res.json())) as WordpressPost[];
}
