import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { FrameworkNode } from "../nodes";
import { BranchNode, ForkNode, PathNode } from "../nodes/control";
import { evaluateCondition } from "../utils";

type InNodeState = {
  type: "in-node";
  node: Exclude<FrameworkNode, PathNode | BranchNode>;
};

// TODO: add support to randomized path
type InPathState = {
  type: "in-path";
  node: PathNode;
  path_state: ExperimentState;
  path_step: number;
};

// TODO: think what we need inside this state
type InForkState = {
  type: "in-fork";
  node: ForkNode;
};

type InBranchState = {
  type: "in-branch";
  node: BranchNode;
  branch_state: ExperimentState;
};

export type ExperimentState = InNodeState | InPathState | InBranchState;

type NextNode = {
  type: "NEXT_NODE";
};

type GoToNode = {
  type: "GO_TO_NODE";
  id: string;
};

type SetData = {
  type: "SET_DATA";
  data: Context["data"];
};

export type Action = NextNode | GoToNode | SetData;

export type ResponseValue = string | boolean | number | string[] | undefined;

export type Context = {
  state: ExperimentState;
  step: number;
  nodes: FrameworkNode[];
  data: Record<string, ResponseValue>;
  debugMode?: boolean;
};

function initialStateForNode(
  node: FrameworkNode,
  data: Record<string, ResponseValue>
): ExperimentState {
  switch (node.nodeType) {
    case "path": {
      return {
        type: "in-path",
        node,
        path_state: initialStateForNode(node.props.nodes[0], data),
        path_step: 0,
      };
    }
    case "branch": {
      const {
        defaultBranch = {
          group: "default",
          nextNode: { nodeFamily: "core", nodeType: "noop", id: "", props: {} },
        },
        branches = [],
      } = node.props;

      const selected =
        branches.find((branch) => {
          return evaluateCondition(
            branch.condition,
            data[branch.conditionKey],
            branch.value
          );
        }) || defaultBranch;

      return {
        type: "in-branch",
        node,
        branch_state: initialStateForNode(selected.nextNode, data),
      };
    }
    default: {
      return { type: "in-node", node };
    }
  }
}

export function nextState(
  state: ExperimentState,
  nodes: FrameworkNode[],
  index: number,
  data: Context["data"]
): Context & { exitFlag?: boolean } {
  const nextIndex = index + 1;

  const goToNextOrExitPath = () => {
    if (nextIndex < nodes.length) {
      return {
        state: initialStateForNode(nodes[nextIndex], data),
        step: nextIndex,
        nodes,
        data,
      };
    } else {
      return {
        state,
        step: index,
        nodes,
        exitFlag: true,
        data,
      };
    }
  };

  switch (state.type) {
    case "in-node": {
      return goToNextOrExitPath();
    }
    case "in-branch": {
      return nextState(state.branch_state, nodes, index, data);
    }
    case "in-path": {
      const { path_state, path_step, node } = state;
      const {
        props: { nodes: pathNodes },
      } = node;
      const {
        exitFlag,
        state: nextPathState,
        step: nextPathStep,
      } = nextState(path_state, pathNodes, path_step, data);

      if (exitFlag) {
        return goToNextOrExitPath();
      } else {
        return {
          state: {
            type: "in-path",
            path_state: nextPathState,
            path_step: nextPathStep,
            node,
          },
          step: index,
          nodes,
          data,
        };
      }
    }
  }
}

export type Reducer = (state: Context, action: Action) => Context;

export const reducer: Reducer = (context, action) => {
  switch (action.type) {
    case "NEXT_NODE": {
      const next = nextState(
        context.state,
        context.nodes,
        context.step,
        context.data
      );
      return next;
    }
    case "GO_TO_NODE": {
      const { id } = action;
      const nodeIndex = context.nodes.findIndex((n) => n.id === id);
      return {
        ...context,
        step: nodeIndex,
        state: initialStateForNode(context.nodes[nodeIndex], context.data),
      };
    }
    case "SET_DATA": {
      return {
        ...context,
        data: {
          ...context.data,
          ...action.data,
        },
      };
    }
  }
};

export function currentNode(state: ExperimentState): FrameworkNode {
  switch (state.type) {
    case "in-node": {
      return state.node;
    }
    case "in-path": {
      return currentNode(state.path_state);
    }
    case "in-branch": {
      return currentNode(state.branch_state);
    }
  }
}

type StoreFns = {
  dispatch: (action: Action) => void;
  init: (nodes: FrameworkNode[], debugMode?: boolean) => void;
  unsub: () => void;
  unsubTransient: () => void;
};

export const useExperimentStore = create<Context & StoreFns>()(
  subscribeWithSelector((set, get, api) => ({
    nodes: [] as FrameworkNode[],
    state: {
      type: "in-node",
      node: {
        nodeFamily: "core",
        nodeType: "start",
        props: {},
        id: "",
      },
    },
    data: {},
    step: 0,
    init: (nodes: FrameworkNode[], debugMode: boolean = false) => {
      const unsub = api.subscribe(
        (s) => s.state,
        async (currState, prevState) => {
          const node = currentNode(currState);
          switch (node.nodeType) {
            case "start":
            case "noop": {
              console.log("Skipping start or noop state");
              get().dispatch({ type: "NEXT_NODE" });
              break;
            }
            case "redirect": {
              get().dispatch({ type: "GO_TO_NODE", id: node.props.nodeId });
              break;
            }
            case "checkpoint": {
              console.log("Sending data");
              const sleep = (ms: number) =>
                new Promise((r) => setTimeout(r, ms));
              await sleep(1000);
              console.log("Sent data");
              get().dispatch({ type: "NEXT_NODE" });
              break;
            }
            default: {
              break;
            }
          }
        }
      );

      set((state) => ({ ...state, unsub, nodes, debugMode }));
      get().dispatch({ type: "NEXT_NODE" });
    },
    unsub: () => {
      console.log("original unsub");
    },
    unsubTransient: () => {
      get().unsub();
    },
    dispatch: (args) => set((state) => ({ ...state, ...reducer(state, args) })),
  }))
);
