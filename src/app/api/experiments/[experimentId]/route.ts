import { API_URL } from "@/constants";
import { Experiment } from "@/types";

type ApiExperiment = {
  postgresExperiment: {
    pk: number;
    name: string;
    slug: string;
    coverImage: string;
    description: string;

    team: {
      pk: number;
      name: string;
      description: string;
    };
  };
  mongoExperiment: {
    nodes: any[];
    views: any[];
    id: string;
    slug: string;
  };
};

export async function GET(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  return await fetch(`${API_URL}/experiments/${experimentId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      return { res, data: (await res.json()) as ApiExperiment };
    })
    .then(({ res, data }) => {
      const {
        postgresExperiment: {
          pk,
          name,
          slug,
          coverImage,
          description,
          team: { pk: teamId, name: teamName, description: teamDescription },
        },
      } = data;
      const experiment: Experiment = {
        id: pk.toString(),
        name,
        slug,
        coverImage,
        description,
        team: {
          slug: teamId.toString(),
          name: teamName,
          description: teamDescription,
          coverImage: "https://placebear.com/1200/600",
          members: [],
        },
      };
      return new Response(JSON.stringify(experiment), { status: res.status });
    })
    .catch((err) => {
      return new Response(JSON.stringify(err), {
        status: 500,
      });
    });
}

export async function PATCH(
  request: Request,
  { params }: { params: { experimentId: string } }
) {
  const { experimentId } = params;

  const body = await request.json();

  console.log({ experimentId });

  return await fetch(`${API_URL}/experiments/${experimentId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then(async (res) => {
      return { res, data: (await res.json()) as ApiExperiment };
    })
    .then(({ res, data }) => {
      const {
        postgresExperiment: {
          pk,
          name,
          slug,
          coverImage,
          description,
          team: { pk: teamId, name: teamName, description: teamDescription },
        },
      } = data;
      const experiment: Experiment = {
        id: pk.toString(),
        name,
        slug,
        coverImage,
        description,
        team: {
          slug: teamId.toString(),
          name: teamName,
          description: teamDescription,
          coverImage: "https://placebear.com/1200/600",
          members: [],
        },
      };
      return new Response(JSON.stringify(experiment), { status: res.status });
    })
    .catch((err) => {
      return new Response(JSON.stringify(err), {
        status: 500,
      });
    });
}
