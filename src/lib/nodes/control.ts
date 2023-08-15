import { BaseNode } from ".";

export interface BaseControlNode<U extends string, Props>
  extends BaseNode<"control", U> {
  props: Props;
}

export interface BranchNode extends BaseControlNode<"branch", {}> {}
export interface RedirectNode extends BaseControlNode<"redirect", {}> {}
export interface PathNode extends BaseControlNode<"path", {}> {}
export interface ForkNode extends BaseControlNode<"fork", {}> {}

export type ControlNode = BranchNode | RedirectNode | PathNode | ForkNode;
