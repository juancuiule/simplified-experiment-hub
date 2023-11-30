"use client";
import { FrameworkView } from "@/lib";
import { Branch } from "@/lib/nodes/control";
import { createContext, useContext, useRef } from "react";
import {
  Connection,
  Edge,
  EdgeChange,
  Instance,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { createStore, useStore } from "zustand";

export type StartNode = { type: "start" };
export type FinishNode = { type: "finish" };
export type CheckpointNode = { type: "checkpoint"; checkpointId: string };
export type NoOp = { type: "noop" };
export type Path = { type: "path" };
export type ExperimentStep = { type: "experiment-step"; viewId: string };
export type BranchNode = {
  type: "branch";
  branches: Omit<Branch, "nextNode">[];
};
// export type Redirect = { type: "redirect" };

export type FlowNodeTypes =
  | StartNode
  | FinishNode
  | CheckpointNode
  | NoOp
  | Path
  | ExperimentStep
  | BranchNode;
// | Redirect;

export const defaultForType = (type: FlowNodeTypes["type"]): FlowNodeTypes => {
  if (type === "branch") {
    return { branches: [], type: "branch" };
  }
  if (type === "experiment-step") {
    return { viewId: "", type: "experiment-step" };
  }
  if (type === "checkpoint") {
    return { checkpointId: "", type: "checkpoint" };
  }
  return { type };
};

export type FlowNode = Node<FlowNodeTypes, FlowNodeTypes["type"]>;
export type FlowEdge = Edge;

export interface FlowProps {
  experimentId: string;
  nodes: FlowNode[];
  edges: Edge[];
  views: FrameworkView[];
}

export interface FlowState extends FlowProps {
  addNode: (node: FlowNode) => void;
  addEdge: (edge: Edge) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
}

export type FlowStore = ReturnType<typeof createFlowStore>;

export const createFlowStore = (initProps?: Partial<FlowProps>) => {
  const DEFAULT_PROPS: FlowProps = {
    experimentId: "",
    nodes: [],
    edges: [],
    views: [],
  };
  return createStore<FlowState>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addNode: (node: FlowNode) => {
      set({
        nodes: [...get().nodes, node],
      });
    },
    addEdge: (edge: Edge) => {
      set({
        edges: [...get().edges, edge],
      });
    },
    onNodesChange: (changes: NodeChange[]) => {
      set({
        nodes: applyNodeChanges(changes, get().nodes) as FlowNode[],
      });
    },
    onEdgesChange: (changes: EdgeChange[]) => {
      set({
        edges: applyEdgeChanges(changes, get().edges),
      });
    },
    onConnect: (connection: Connection) => {
      set({
        edges: addEdge(connection, get().edges),
      });
    },
  }));
};

export type FlowProviderProps = React.PropsWithChildren<FlowProps>;

export const FlowContext = createContext<FlowStore | null>(null);

export function FlowProvider({ children, ...props }: FlowProviderProps) {
  const storeRef = useRef<FlowStore>();
  if (!storeRef.current) {
    storeRef.current = createFlowStore(props);
  }
  return (
    <FlowContext.Provider value={storeRef.current}>
      {children}
    </FlowContext.Provider>
  );
}

export function updateNode<T extends FlowNodeTypes>(
  id: string,
  setNodes: Instance.SetNodes<any>,
  update: Node<T> | ((node: Node<T>) => Node<T>)
) {
  setNodes((nodes) =>
    nodes.map((node) =>
      node.id === id
        ? update instanceof Function
          ? update(node)
          : update
        : node
    )
  );
}

export function useFlowContext<T>(selector: (state: FlowState) => T): T {
  const store = useContext(FlowContext);
  if (!store) throw new Error("Missing FlowContext.Provider in the tree");
  return useStore(store, selector);
}
