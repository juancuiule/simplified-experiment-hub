import { BaseNode } from ".";

export interface BaseStudyNode<U extends string, Props>
  extends BaseNode<"study", U> {
  props: Props;
}

export interface ExperimentStepNode
  extends BaseStudyNode<
    "experiment-step",
    {
      slug: string;
    }
  > {}

export type StudyNode = ExperimentStepNode;
