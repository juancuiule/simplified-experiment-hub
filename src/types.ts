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
  coverImage: string;
  members: User[];
  slug: string;
};

export type Experiment = {
  id: string;
  name: string;
  description: string;
  coverImage: string;
  slug: string;
  team: Team;
  answers?: number;
};

export type View = {
  name: string;
  description: string;
  slug: string;
  preview: string;
};
