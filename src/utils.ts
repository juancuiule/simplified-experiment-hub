// ReactFlow to ExperimentNodes

import { Edge } from "reactflow";
import { FrameworkNode } from "./lib/nodes";
import { FlowNode, FlowNodeTypes } from "./ui/flow/store";

type Pair = {
  frameworkNode: FrameworkNode;
  flowNode: FlowNodeTypes;
};

function sortEdges(edges: Edge[]) {
  // Create a map to quickly access edges by their target
  const edgeMap = edges.reduce((map, edge) => {
    return {
      ...map,
      [edge.source]: edges.find((e) => e.source === edge.target)!,
    };
  }, {} as Record<string, Edge>);

  // Initialize the sorted array with the first edge
  const sortedEdges = [edges.find((edge) => edge.source === "start")!];

  // Loop through the remaining edges and add them to the sorted array
  while (sortedEdges.length < edges.length) {
    const lastEdge = sortedEdges[sortedEdges.length - 1]!;
    const nextEdge = edgeMap[lastEdge.source];
    console.log({ nextEdge });

    if (nextEdge) {
      sortedEdges.push(nextEdge);
    } else {
      // If there is a break in the chain, break the loop
      break;
    }
  }

  return sortedEdges;
}

const toFrameworkNode = (node: FlowNode): FrameworkNode => {
  switch (node.data.type) {
    case "start": {
      return {
        id: node.id,
        nodeFamily: "core",
        nodeType: "start",
        props: {},
      };
    }
    case "finish": {
      return {
        id: node.id,
        nodeFamily: "core",
        nodeType: "finish",
        props: {},
      };
    }
    case "noop": {
      return {
        id: node.id,
        nodeFamily: "core",
        nodeType: "noop",
        props: {},
      };
    }
    case "checkpoint": {
      return {
        id: node.id,
        nodeFamily: "core",
        nodeType: "checkpoint",
        props: {},
      };
    }
    case "experiment-step": {
      return {
        id: node.id,
        nodeFamily: "study",
        nodeType: "experiment-step",
        props: {
          slug: node.data.viewId,
        },
      };
    }
    case "branch": {
      return {
        id: node.id,
        nodeFamily: "control",
        nodeType: "branch",
        props: {
          branches: node.data.branches,
        },
      };
    }
  }
};

export const toFrameworkNodes = (
  nodes: FlowNode[],
  edges: Edge[]
): FrameworkNode[] => {
  const node = (id: string) => nodes.find((node) => node.id === id)!;
  const sorted = sortEdges(edges);
  return sorted.flatMap((edge, i) => {
    if (i === sorted.length - 1) {
      return [
        toFrameworkNode(node(edge.source)),
        toFrameworkNode(node(edge.target)),
      ];
    } else {
      return toFrameworkNode(node(edge.source));
    }
  });
};

const toFlowNode = (node: FrameworkNode): Pair | Pair[] => {
  switch (node.nodeType) {
    case "start": {
      return { frameworkNode: node, flowNode: { type: "start" } };
    }
    case "finish": {
      return { frameworkNode: node, flowNode: { type: "finish" } };
    }
    case "noop": {
      return { frameworkNode: node, flowNode: { type: "noop" } };
    }
    case "checkpoint": {
      return {
        frameworkNode: node,
        flowNode: { type: "checkpoint", checkpointId: node.id },
      };
    }
    case "experiment-step": {
      return {
        frameworkNode: node,
        flowNode: { type: "experiment-step", viewId: node.props.slug },
      };
    }
    case "branch": {
      const { branches } = node.props;
      const nodes = branches.flatMap((branch) => toFlowNode(branch.nextNode));
      return [
        {
          frameworkNode: node,
          flowNode: { type: "branch", branches: node.props.branches },
        },
        ...nodes,
      ];
    }
    case "initial-state":
    case "path":
    case "fork":
    case "redirect": {
      return [];
    }
    // case "path": {
    //   return node.props.nodes.flatMap((node) => toFlowNode(node));
    // }
    // case "fork": {
    //   return node.props.groups.flatMap((group) => toFlowNode(group.node));
    // }
    // case "redirect": {
    //   return [];
    // }
  }
};

export const nodeData = (node: FrameworkNode): FlowNodeTypes => {
  switch (node.nodeType) {
    case "start": {
      return {
        type: "start",
      };
    }
    case "finish": {
      return {
        type: "finish",
      };
    }
    case "checkpoint": {
      return {
        type: "checkpoint",
        checkpointId: node.id,
      };
    }
    case "noop": {
      return {
        type: "noop",
      };
    }
    case "experiment-step": {
      return {
        type: "experiment-step",
        viewId: node.props.slug,
      };
    }
    case "branch": {
      return {
        type: "branch",
        branches: node.props.branches,
      };
    }
    default: {
      return {
        type: "start",
      };
    }
  }
};

export const parseNodes = (nodes: FrameworkNode[]): FlowNode[] => {
  return nodes
    .flatMap((node) => {
      return toFlowNode(node);
    })
    .map(({ frameworkNode, flowNode }, i) => {
      return {
        id: frameworkNode.id,
        position: {
          x: 0,
          y: i * 100,
        },
        data: flowNode,
        type: flowNode.type,
      };
    });
};

export const parseEdges = (nodes: FrameworkNode[]): Edge[] => {
  return nodes
    .map((node, i) => {
      if (i !== nodes.length - 1) {
        return {
          source: node.id,
          sourceHandle: "a",
          target: nodes[i + 1].id,
          targetHandle: "a",
          id: `${node.id}-${nodes[i + 1].id}`,
        };
      }
    })
    .filter(Boolean) as Edge[];
};
