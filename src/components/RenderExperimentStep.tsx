"use client";
import { useExperimentStore } from "@/lib/flow/state";
import { ExperimentStepNode } from "@/lib/nodes/study";

export function RenderExperimentStep(props: { node: ExperimentStepNode }) {
  const { node } = props;

  const dispatch = useExperimentStore((s) => s.dispatch);

  return (
    <div>
      <button onClick={() => dispatch({ type: "NEXT_NODE" })}>Next node</button>
    </div>
  );
}
