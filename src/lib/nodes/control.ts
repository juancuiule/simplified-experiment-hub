import { BaseNode, FrameworkNode } from ".";
import { ConditionConfig } from "../common";

export interface BaseControlNode<U extends string, Props>
  extends BaseNode<"control", U> {
  props: Props;
}

type Ramification = {
  group: string;
  nextNode: FrameworkNode;
};

type Branch = ConditionConfig & Ramification;

export interface BranchNode
  extends BaseControlNode<
    "branch",
    {
      branches: Branch[];
      defaultBranch?: Ramification;
    }
  > {}

export interface RedirectNode
  extends BaseControlNode<
    "redirect",
    {
      nodeId: string;
    }
  > {}

export interface PathNode
  extends BaseControlNode<
    "path",
    {
      nodes: FrameworkNode[];
    }
  > {}

type ForkGroup = {
  group: string;
  ratio: number;
  node: FrameworkNode;
};

// TODO: add behaivor for in-fork state
export interface ForkNode
  extends BaseControlNode<
    "fork",
    {
      groups: ForkGroup;
      dataKey: string;
    }
  > {}

export type ControlNode = BranchNode | RedirectNode | PathNode | ForkNode;
