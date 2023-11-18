import { API_URL } from "@/constants";
import { Experiment } from "@/types";

type ApiExperiment = {
  pk: string;
  name: string;
  slug: string;
  coverImage: string;
  description: string;
  team: {
    pk: string;
    name: string;
    description: string;
  };
  _count: {
    answers: number;
  };
};

export async function GET(request: Request) {
  return await fetch(`${API_URL}/experiments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      return { res, data: (await res.json()) as ApiExperiment[] };
    })
    .then(({ res, data }) => {
      const experiments: Experiment[] = data.map((exp) => {
        return {
          answers: 10,
          coverImage: exp.coverImage,
          description: exp.description,
          id: exp.pk,
          name: exp.name,
          slug: exp.slug,
          team: {
            description: exp.team.description,
            name: exp.team.name,
            slug: exp.team.pk,
            coverImage: "https://placebear.com/1200/600",
            members: [],
          },
        };
      });

      return new Response(JSON.stringify(experiments), { status: res.status });
    })
    .catch((err) => {
      return new Response(JSON.stringify(err), {
        status: 500,
      });
    });
}

export async function POST(request: Request) {
  const {
    name,
    description,
    slug,
    cover: coverImage,
    team: teamId,
  } = await request.json();

  return await fetch(`${API_URL}/experiments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      description,
      slug,
      coverImage,
      teamId,
    }),
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
