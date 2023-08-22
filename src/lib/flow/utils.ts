import { FrameworkNode } from "../nodes";
import { sumBy } from "../utils";
import { ExperimentState } from "./state";

export function nodeSteps(node: FrameworkNode): number {
  switch (node.nodeType) {
    case "start":
    case "noop":
    case "finish":
    case "branch": {
      return 0;
    }
    case "experiment-step": {
      return 1;
    }
    case "path": {
      return sumBy(node.props.nodes, nodeSteps);
    }
    default: {
      return 0;
    }
  }
}

export const flowCurrentStep = (state: ExperimentState): number => {
  switch (state.type) {
    case "in-branch":
    case "in-node": {
      return 1;
    }
    case "in-path": {
      const prev = state.node.props.nodes
        .slice(0, state.path_step)
        .reduce((sum, curr) => {
          return sum + nodeSteps(curr);
        }, 0);
      return prev + flowCurrentStep(state.path_state);
    }
  }
};
