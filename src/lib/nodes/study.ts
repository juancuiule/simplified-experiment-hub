import { BaseNode } from ".";
import { FrameworkWidget } from "../widgets";

export interface BaseStudyNode<U extends string, Props>
  extends BaseNode<"study", U> {
  props: Props;
}

export interface ExperimentStepNode
  extends BaseStudyNode<
    "experiment-step",
    {
      widgets: FrameworkWidget[];
    }
  > {}

export interface CustomViewNode
  extends BaseStudyNode<
    "custom-view",
    {
      slug: string;
    }
  > {}

export type StudyNode = ExperimentStepNode | CustomViewNode;
