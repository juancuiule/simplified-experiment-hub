import { FrameworkNode } from "./nodes";
import { FrameworkWidget } from "./widgets";

export type FrameworkView = {
  slug: string;
  name: string;
  description: string;
  widgets: FrameworkWidget[];
};

export type FrameworkExperiment = {
  slug: string;
  name: string;
  description: string;
  nodes: FrameworkNode[];
  views: FrameworkView[];
};
