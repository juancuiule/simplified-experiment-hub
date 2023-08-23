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

type StepperConfig =
  | {
      stepper: true;
      stepperLabel?: string;
      stepperStyle?: "continuous" | "discrete";
    }
  | {
      stepper: false;
    };

export interface PathNode
  extends BaseControlNode<
    "path",
    {
      nodes: FrameworkNode[];
      randomize?: boolean;
    } & StepperConfig
  > {}

type ForkGroup = {
  group: string;
  ratio: number;
  node: FrameworkNode;
};

export interface ForkNode
  extends BaseControlNode<
    "fork",
    {
      groups: ForkGroup;
      dataKey: string;
    }
  > {}

export type ControlNode = BranchNode | RedirectNode | PathNode | ForkNode;
