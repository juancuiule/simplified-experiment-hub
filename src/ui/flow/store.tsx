"use client";
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

export interface FlowProps {
  nodes: Node[];
  edges: Edge[];
}

export interface FlowState extends FlowProps {
  addNode: (node: Node) => void;
  addEdge: (edge: Edge) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
}

export type FlowStore = ReturnType<typeof createFlowStore>;

export const createFlowStore = (initProps?: Partial<FlowProps>) => {
  const DEFAULT_PROPS: FlowProps = {
    nodes: [],
    edges: [],
  };
  return createStore<FlowState>()((set, get) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    addNode: (node: Node) => {
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
        nodes: applyNodeChanges(changes, get().nodes),
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

export function updateNode<T>(
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
