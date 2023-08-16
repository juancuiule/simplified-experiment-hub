import { ControlNode } from "./control";
import { CoreNode } from "./core";
import { StudyNode } from "./study";

type NodeFamily = "study" | "core" | "control" | "view";

export interface BaseNode<T extends NodeFamily, U extends string> {
  nodeFamily: T;
  nodeType: U;
  id: string;
}

export type FrameworkNode = ControlNode | StudyNode | CoreNode;
