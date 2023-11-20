import { BaseNode } from ".";

export interface BaseCoreNode<U extends string, Props>
  extends BaseNode<"core", U> {
  props: Props;
}

export interface InitialStateNode extends BaseCoreNode<"initial-state", {}> {}
export interface StartNode extends BaseCoreNode<"start", {}> {}
export interface FinishNode extends BaseCoreNode<"finish", {}> {}
export interface NoOpNode extends BaseCoreNode<"noop", {}> {}
export interface CheckpointNode extends BaseCoreNode<"checkpoint", {}> {}

export type CoreNode =
  | StartNode
  | FinishNode
  | NoOpNode
  | CheckpointNode
  | InitialStateNode;
