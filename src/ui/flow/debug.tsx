"use client";
import { useFlowContext } from "./store";

export default function Debug() {
  const { nodes, edges } = useFlowContext((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));
  return (
    <div>
      <pre>
        <code>{JSON.stringify({ nodes, edges }, null, 2)}</code>
      </pre>
    </div>
  );
}
