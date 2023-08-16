import { FrameworkNode } from "../nodes";
import { sumBy } from "../utils";

export function nodeSteps(node: FrameworkNode): number {
  switch (node.nodeType) {
    case "start":
    case "noop":
    case "finish":
    case "branch": {
      return 0;
    }
    case "experiment-step": {
      return 0;
    }
    case "path": {
      return sumBy(node.props.nodes, nodeSteps);
    }
    default: {
      return 0;
    }
  }
}
