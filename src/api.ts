import { BASE_URL } from "./constants";
import { Experiment, Team, User, View } from "./types";

const validationPipe = <T extends any>(res: Response) => {
  if (res.status === 404) {
    return null;
  } else {
    return res.json() as Promise<T>;
  }
};

export async function fetchUser(userId: string) {
  return await fetch(`${BASE_URL}/api/users/${userId}`).then(
    validationPipe<User & { teams: Team[]; experiments: Experiment[] }>
  );
}

export async function fetchTeam(teamId: string) {
  return await fetch(`${BASE_URL}/api/teams/${teamId}`).then(
    validationPipe<Team & { experiments: Experiment[] }>
  );
}

export async function fetchExperiment(experimentId: string) {
  return await fetch(`${BASE_URL}/api/experiments/${experimentId}`).then(
    validationPipe<Experiment>
  );
}

export async function fetchExperimentViews(experimentId: string) {
  return await fetch(`${BASE_URL}/api/experiments/${experimentId}/views`).then(
    validationPipe<View[]>
  );
}

export async function fetchExperiments() {
  return await fetch(`${BASE_URL}/api/experiments`).then(
    validationPipe<Experiment[]>
  );
}

export async function createExperiment(experiment: any) {
  return await fetch(`${BASE_URL}/api/experiments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(experiment),
  }).then(validationPipe);
}

export async function fetchTeams() {
  return await fetch(`${BASE_URL}/api/teams`).then(validationPipe);
}
