import { BASE_URL } from "./constants";
import { Experiment, Team, User, View } from "./types";

export async function fetchUser(userId: string) {
  return await fetch(`${BASE_URL}/api/users/${userId}`).then((res) => {
    if (res.status === 404) {
      return null;
    } else {
      return res.json() as Promise<
        User & { teams: Team[]; experiments: Experiment[] }
      >;
    }
  });
}

export async function fetchTeam(teamId: string) {
  return await fetch(`${BASE_URL}/api/teams/${teamId}`).then((res) => {
    if (res.status === 404) {
      return null;
    } else {
      return res.json() as Promise<Team & { experiments: Experiment[] }>;
    }
  });
}

export async function fetchExperiment(experimentId: string) {
  return await fetch(`${BASE_URL}/api/experiments/${experimentId}`).then(
    (res) => {
      if (res.status === 404) {
        return null;
      } else {
        return res.json() as Promise<Experiment>;
      }
    }
  );
}

export async function fetchExperimentViews(experimentId: string) {
  return await fetch(`${BASE_URL}/api/experiments/${experimentId}/views`).then(
    (res) => {
      if (res.status === 404) {
        return null;
      } else {
        return res.json() as Promise<View[]>;
      }
    }
  );
}
