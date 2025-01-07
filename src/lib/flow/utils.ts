import { FrameworkNode } from "../nodes";
import { BranchNode, PathNode } from "../nodes/control";
import { shuffle, sumBy } from "../utils";
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

export function shufflePath(node: PathNode): PathNode {
  return {
    ...node,
    props: {
      ...node.props,
      nodes: shuffle(node.props.nodes),
    },
  };
}

export function shuffePathsInBranches(node: BranchNode): BranchNode {
  const {
    props: { branches, defaultBranch },
  } = node;

  return {
    ...node,
    props: {
      ...node.props,
      branches: branches.map((branch) => {
        if (branch.nextNode.nodeType === "path") {
          return {
            ...branch,
            nextNode: shufflePath(branch.nextNode),
          };
        }
        return branch;
      }),
      defaultBranch:
        defaultBranch && defaultBranch.nextNode.nodeType === "path"
          ? {
              ...defaultBranch,
              nextNode: shufflePath(defaultBranch.nextNode),
            }
          : defaultBranch,
    },
  };
}

export function randomizePaths(nodes: FrameworkNode[]): FrameworkNode[] {
  /*
  Takes every node from the experiment nodes list and traverses it recursively to
  find PathNodes with the randomize flag set to true. If the flag is set, it shuffles
  the nodes list and replaces the original list with the shuffled one.
  */
  return nodes.map((node) => {
    if (node.nodeType === "path" && node.props.randomize) {
      return shufflePath(node);
    }
    if (node.nodeType === "branch") {
      return shuffePathsInBranches(node);
    }
    return node;
  });
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
