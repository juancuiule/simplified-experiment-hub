"use client";
import { Edge, Node } from "reactflow";
import { FlowNode, useFlowContext } from "./store";
import { useMemo } from "react";

const parse = (nodes: Node[], edges: Edge[]) => {
  const firstNode = nodes.find((node) => node.type === "start");

  if (!firstNode) {
    throw new Error("No start node found");
  }

  const firstEdge = edges.find((edge) => edge.source === firstNode.id);

  if (firstEdge === undefined) {
    throw new Error("No edge found from start node");
  }

  const nextNode = nodes.find((node) => node.id === firstEdge.target);

  if (nextNode === undefined) {
    throw new Error("No next node found");
  }
};

const parseFlowNode = (
  node: FlowNode,
  nodes: FlowNode[],
  edges: Edge[]
): (any | any[])[] => {
  const edge = edges.find((edge) => edge.source === node.id);
  if (edge !== undefined) {
    const nextNode = nodes.find((node) => node.id === edge.target);

    if (nextNode !== undefined) {
      switch (node.data.type) {
        case "start": {
          return ["start", ...parseFlowNode(nextNode, nodes, edges)];
        }
        case "experiment-step": {
          return [
            `experiment-step => ${node.data.viewId}`,
            ...parseFlowNode(nextNode, nodes, edges),
          ];
        }
        case "checkpoint": {
          return [
            `checkpoint => ${node.data.checkpointId}`,
            ...parseFlowNode(nextNode, nodes, edges),
          ];
        }
        case "branch": {
          const branches = node.data.branches
            .map((branch) => {
              return edges.find(
                (edge) =>
                  edge.source === node.id && edge.sourceHandle === branch
              );
            })
            .map((edge) => nodes.find((node) => node.id === edge?.target))
            .filter(Boolean) as FlowNode[];

          const sharedComponents: (any | any[])[] = branches
            .map((branch) => parseFlowNode(branch, nodes, edges))
            .reduce((acc, val) =>
              acc.length === 0 ? val : acc.filter((x) => val.includes(x))
            );

          const notSharedComponents: (any | any[])[] = branches
            .map((branch) => parseFlowNode(branch, nodes, edges))
            .map((branch) => {
              const notShared = branch.filter(
                (x) => !sharedComponents.includes(x)
              );
              if (notShared.length === 0 && sharedComponents.length !== 0) {
                return ["noop"];
              } else {
                return notShared;
              }
            });

          return [["branch", ...notSharedComponents], ...sharedComponents];
        }
        case "noop": {
          return ["noop", ...parseFlowNode(nextNode, nodes, edges)];
        }
        default: {
          return [];
        }
      }
    }
  } else if (node.data.type === "finish") {
    return ["finish"];
  }
  return [];
};

const a = {
  parsed: [
    "start",
    "experiment-step => terms",
    ["branch", ["noop"], ["experiment-step => psicodelicos"]],
    "checkpoint => first-save",
    "experiment-step => gracias",
    "finish",
  ],
};
export default function Debug() {
  const { nodes, edges } = useFlowContext((state) => ({
    nodes: state.nodes,
    edges: state.edges,
  }));

  const parsed = useMemo(() => {
    const startNode = nodes.find((n) => n.type === "start");
    if (startNode) {
      return parseFlowNode(startNode, nodes, edges);
    } else {
      return {};
    }
  }, [nodes, edges]);

  return (
    <div>
      <pre>
        <code>
          {JSON.stringify(
            {
              parsed,
            },
            null,
            2
          )}
        </code>
        <br />
        <code>{JSON.stringify({ nodes, edges }, null, 2)}</code>
      </pre>
    </div>
  );
}
