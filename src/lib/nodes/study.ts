import { BaseNode } from ".";
import { Widget } from "../widgets";

export interface BaseStudyNode<U extends string, Props>
  extends BaseNode<"study", U> {
  props: Props;
}

export interface ExperimentStepNode
  extends BaseStudyNode<
    "experiment-step",
    {
      widgets: Widget[];
    }
  > {}

export type StudyNode = ExperimentStepNode;
