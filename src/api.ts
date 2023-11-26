import { GET, PATCH, POST, PUT, DELETE } from "./api_utils";
import { FrameworkView } from "./lib";
import { FrameworkNode } from "./lib/nodes";

export type Entity<T> = {
  pk: number;
} & T;

export type User = {
  email: string;
  name: string;
  username: string;
  avatar: string;
  organization: string;
};

export type UserTeam = Entity<Omit<Team, "experiments">>;

export type BaseExperiment = Omit<
  Experiment,
  "team" | "nodes" | "views" | "answers"
>;

export type Experiment = {
  name: string;
  slug: string;
  description: string;
  coverImage: string;
  team: Entity<Omit<Team, "experiments">>;
  nodes: FrameworkNode[];
  views: FrameworkView[];
  answers: number;
};

export type Team = {
  name: string;
  slug: string;
  coverImage: string;
  description: string;
  experiments: Entity<Experiment>[];
  users: Entity<User>[];
};

export type LoginBody = { email: string; password: string };
export type SignupBody = Omit<User, "avatar"> & { password: string };
export type AuthResponse = { accessToken: string };

export type CreateTeamBody = Omit<UserTeam, "pk" | "users"> & {
  userId: number;
};
export type CreateExperimentBody = BaseExperiment & { teamId: number };
export type CreateViewBody = Omit<FrameworkView, "widgets">;

export type Answer = {
  id: string;
  body: any;
  experimentId: string;
};

export const API = {
  auth: {
    login: POST<LoginBody, AuthResponse>("/api/auth/login"),
    signup: POST<SignupBody, AuthResponse>("/api/auth/signup"),
  },
  users: {
    fetchByUsername: (username: string) =>
      GET<Entity<User>>(`/api/users/slug/${username}`),
    fetch: (id: string) => GET<Entity<User>>(`/api/users/${id}`),
    update: (id: string) =>
      PATCH<Partial<User>, Entity<User>>(`/api/users/${id}`),
    teams: (id: string) => GET<UserTeam[]>(`/api/users/${id}/teams`),
    experiments: (id: string) =>
      GET<Entity<Experiment>[]>(`/api/users/${id}/experiments`),
  },
  teams: {
    fetchBySlug: (slug: string) => GET<Entity<Team>>(`/api/teams/slug/${slug}`),
    fetch: (id: string) => GET<Entity<Team>>(`/api/teams/${id}`),
    members: (id: string) => GET<Entity<User>[]>(`/api/teams/${id}/members`),
    experiments: (id: string) =>
      GET<Entity<BaseExperiment>[]>(`/api/teams/${id}/experiments`),
    create: POST<CreateTeamBody, Entity<UserTeam>>("/api/teams"),
    delete: (id: string) => DELETE<Entity<Team>>(`/api/teams/${id}`),
  },
  experiments: {
    fetchAll: () => GET<Entity<Experiment>[]>("/api/experiments"),
    fetch: (id: string) => GET<Entity<Experiment>>(`/api/experiments/${id}`),
    fetchBySlug: (slug: string) =>
      GET<Entity<Experiment>>(`/api/experiments/slug/${slug}`),
    create: POST<CreateExperimentBody, Entity<Experiment>>("/api/experiments"),
    update: (id: string) =>
      PATCH<Partial<BaseExperiment>, Entity<Experiment>>(
        `/api/experiments/${id}`
      ),
    delete: (id: string) =>
      DELETE<Entity<Experiment>>(`/api/experiments/${id}`),
    views: {
      create: (id: string) =>
        POST<CreateViewBody, Entity<Experiment>>(
          `/api/experiments/${id}/views`
        ),
      update: (id: string, slug: string) =>
        PUT<Pick<FrameworkView, "widgets">, Entity<Experiment>>(
          `/api/experiments/${id}/views/${slug}`
        ),
    },
    nodes: {
      update: (id: string) =>
        PUT<Pick<Experiment, "nodes">, Entity<Experiment>>(
          `/api/experiments/${id}/nodes`
        ),
    },
    answers: {
      create: (id: string) =>
        POST<{ body: any }, { id: string }>(`/api/experiments/${id}/answers`),
      fetch: (id: string) => GET<Answer[]>(`/api/experiments/${id}/answers`),
    },
  },
};
