export type LayoutProps = {
  children: React.ReactNode;
};

export type User = {
  name: string;
  slug: string;
  avatar: string;
  organization: string;
};

export type Team = {
  name: string;
  description: string;
  background: string;
  members: User[];
  slug: string;
};

export type Experiment = {
  name: string;
  description: string;
  background: string;
  slug: string;
  team: Team;
};

export type View = {
  name: string;
  description: string;
  slug: string;
  preview: string;
};
