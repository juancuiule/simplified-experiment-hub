"use client";
import { toFrameworkNodes, parseEdges } from "@/utils";
import { useMemo } from "react";
import { useFlowContext, FlowNode } from "./store";
import { FrameworkNode } from "@/lib/nodes";

const getLabel = (node: FlowNode) => {
  switch (node.data.type) {
    case "experiment-step": {
      return `experiment-step - ${node.data.viewId}`;
    }
    case "checkpoint": {
      return `checkpoint - ${node.data.checkpointId}`;
    }
    default: {
      return node.data.type;
    }
  }
};

export default function Debug() {
  const { nodes, edges } = useFlowContext((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const parsed: FrameworkNode[] = useMemo(() => {
    try {
      const startNode = nodes.find((n) => n.type === "start");
      if (startNode) {
        return toFrameworkNodes(startNode, nodes, edges);
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [nodes, edges]);

  const parsedEdgess = useMemo(() => {
    try {
      const list = parsed.length > 0 ? parseEdges(parsed) : [];
      // return likst;
      return list.map((e) => {
        const source = nodes.find((n) => n.id === e.source);
        const target = nodes.find((n) => n.id === e.target);
        return source !== undefined && target !== undefined
          ? `${getLabel(source)} (vía: ${e.sourceHandle}) => ${getLabel(
              target
            )}`
          : "";
      });
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [parsed]);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(parsedEdgess, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify(parsed, null, 2)}</code>
      </pre>
      <pre>
        <code>{JSON.stringify({ nodes, edges }, null, 2)}</code>
      </pre>
    </div>
  );
}
