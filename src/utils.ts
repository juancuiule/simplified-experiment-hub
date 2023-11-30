// ReactFlow to ExperimentNodes

import { Edge } from "reactflow";
import { FrameworkNode } from "./lib/nodes";
import { FlowNode, FlowNodeTypes } from "./ui/flow/store";
import { Branch, PathNode } from "./lib/nodes/control";

type Pair = {
  frameworkNode: FrameworkNode;
  flowNode: FlowNodeTypes;
};

export function toFrameworkNodes(
  node: FlowNode,
  nodes: FlowNode[],
  edges: Edge[]
): FrameworkNode[] {
  const edgesFromNode = edges.filter((edge) => edge.source === node.id);

  if (edgesFromNode.length === 0) {
    return [toFrameworkNode(node)];
  }

  switch (node.data.type) {
    case "start":
    case "checkpoint":
    case "experiment-step":
    case "finish":
    case "noop": {
      const nextNode = nodes.find(
        (node) => node.id === edgesFromNode[0].target
      );
      return nextNode !== undefined
        ? [toFrameworkNode(node), ...toFrameworkNodes(nextNode, nodes, edges)]
        : [toFrameworkNode(node)];
    }
    case "branch": {
      const { branches } = node.data;

      const nextNodeForEachBranch = branches
        .map((branch) => {
          const edge = edges.find(
            (edge) =>
              edge.source === node.id && edge.sourceHandle === branch.group
          );
          if (edge) {
            const nextNode = nodes.find((node) => node.id === edge.target);
            return nextNode;
          }
          return undefined;
        })
        .filter(Boolean) as FlowNode[];

      const sharedComponents: FrameworkNode[] = nextNodeForEachBranch
        .map((firstNodeOfBranch) =>
          toFrameworkNodes(firstNodeOfBranch, nodes, edges)
        )
        .reduce(
          (acc, val) =>
            acc.length === 0
              ? val
              : acc.filter((x) => val.map((_) => _.id).includes(x.id)),
          []
        );

      const notSharedComponents: FrameworkNode[][] = nextNodeForEachBranch
        .map((firstNodeOfBranch) =>
          toFrameworkNodes(firstNodeOfBranch, nodes, edges)
        )
        .map((firstNodeOfBranch, i) => {
          const notShared = firstNodeOfBranch.filter(
            (x) => !sharedComponents.map((s) => s.id).includes(x.id)
          );
          if (notShared.length === 0 && sharedComponents.length !== 0) {
            return [
              {
                id: `noop-${branches[i].group}`,
                nodeFamily: "core",
                nodeType: "noop",
                props: {},
              },
            ];
          } else {
            return notShared;
          }
        });

      return [
        toFrameworkNode(
          node,
          branches.map((branch, i) => {
            const branchNodes = notSharedComponents[i];
            const nextNode =
              branchNodes.length === 1
                ? branchNodes[0]
                : ({
                    id: `path-${branch.group}`,
                    nodeType: "path",
                    nodeFamily: "control",
                    props: {
                      nodes: branchNodes,
                      stepper: false,
                    },
                  } as PathNode);

            return {
              ...branch,
              nextNode,
            };
          })
        ),
        ...sharedComponents,
      ];
    }
    default: {
      return [];
    }
  }
}

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

    if (nextEdge) {
      sortedEdges.push(nextEdge);
    } else {
      // If there is a break in the chain, break the loop
      break;
    }
  }

  return sortedEdges;
}

const toFrameworkNode = (
  node: FlowNode,
  branches: Branch[] = []
): FrameworkNode => {
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
    case "path": {
      return {
        id: node.id,
        nodeFamily: "control",
        nodeType: "path",
        props: {
          nodes: [],
          stepper: false,
        },
      };
    }
    case "checkpoint": {
      return {
        id: node.id,
        nodeFamily: "core",
        nodeType: "checkpoint",
        props: {
          id: node.data.checkpointId,
        },
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
          branches,
        },
      };
    }
  }
};

// export const toFrameworkNodes = (
//   nodes: FlowNode[],
//   edges: Edge[]
// ): FrameworkNode[] => {
//   const node = (id: string) => nodes.find((node) => node.id === id)!;
//   const sorted = sortEdges(edges);
//   return sorted.flatMap((edge, i) => {
//     if (i === sorted.length - 1) {
//       return [
//         toFrameworkNode(node(edge.source)),
//         toFrameworkNode(node(edge.target)),
//       ];
//     } else {
//       return toFrameworkNode(node(edge.source));
//     }
//   });
// };

const toFlowNode = (node: FrameworkNode): Pair | Pair[] => {
  switch (node.nodeType) {
    case "start": {
      return { frameworkNode: node, flowNode: { type: "start" } };
    }
    case "finish": {
      return { frameworkNode: node, flowNode: { type: "finish" } };
    }
    // ocultarlo, que sea un salto de edge
    case "noop": {
      return [];
      return { frameworkNode: node, flowNode: { type: "noop" } };
    }
    case "checkpoint": {
      return {
        frameworkNode: node,
        flowNode: { type: "checkpoint", checkpointId: node.props.id },
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
    case "path": {
      return node.props.nodes.flatMap((node) => toFlowNode(node));
    }
    case "initial-state":
    case "fork":
    case "redirect": {
      return [];
    }
  }
};

// ocultar patth y noop
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
        checkpointId: node.props.id,
      };
    }
    case "noop":
    case "path": {
      return {
        type: node.nodeType,
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

function connect(
  node: FrameworkNode,
  nextNode: FrameworkNode,
  nextNextNode: FrameworkNode | undefined,
  sourceHandle: string = "a"
): Edge | undefined {
  switch (nextNode.nodeType) {
    case "path": {
      // saltea el path para que el anterior
      // vaya al primer nodo del path
      const firstNodeOfPath = nextNode.props.nodes.at(0);
      if (firstNodeOfPath) {
        return {
          source: node.id,
          sourceHandle,
          target: firstNodeOfPath.id,
          targetHandle: "a",
          id: `${node.id}-${firstNodeOfPath.id}`,
        };
      }
      return undefined;
    }
    case "noop": {
      // saltea el noop para que vaya al siguiente directamente
      if (nextNextNode) {
        return {
          source: node.id,
          sourceHandle,
          target: nextNextNode.id,
          targetHandle: "a",
          id: `${node.id}-${nextNextNode.id}`,
        };
      }
      return undefined;
    }
    default: {
      return {
        source: node.id,
        sourceHandle,
        target: nextNode.id,
        targetHandle: "a",
        id: `${node.id}-${nextNode.id}`,
      };
    }
  }
}

export const parseEdges = (nodes: FrameworkNode[]): Edge[] => {
  return nodes
    .flatMap((node, i) => {
      const nextNode = nodes.at(i + 1);
      const nextNextNode = nodes.at(i + 2);
      switch (node.nodeType) {
        case "start":
        case "checkpoint":
        case "experiment-step": {
          if (nextNode) {
            return connect(node, nextNode, nextNextNode);
          }
          return [];
        }
        case "path": {
          const last = node.props.nodes.at(-1);
          return [
            ...parseEdges(node.props.nodes),
            ...(nextNode && last
              ? [connect(last, nextNode, nextNextNode)]
              : []),
          ];
        }
        case "branch": {
          return node.props.branches.flatMap((branch, i) => {
            // conecta al nodo branch con el primer nodo del branch
            const connection = connect(
              node,
              branch.nextNode,
              nextNode,
              branch.group
            );

            if (branch.nextNode.nodeType === "path") {
              const pathEdges = parseEdges(branch.nextNode.props.nodes);
              const lastPathNode = branch.nextNode.props.nodes.at(-1);
              return [
                ...(connection ? [connection] : []),
                ...pathEdges,
                ...(nextNode && lastPathNode
                  ? [connect(lastPathNode, nextNode, nextNextNode)]
                  : []),
              ];
            } else {
              return [
                ...(connection ? [connection] : []),
                ...(nextNode
                  ? [connect(branch.nextNode, nextNode, nextNextNode)]
                  : []),
              ];
            }
          });
        }
        default: {
          [];
        }
      }
    })
    .filter(Boolean) as Edge[];
};

export function slugify(text: string) {
  const dict = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    ä: "ae",
    ä: "ae",
  };

  return Object.entries(dict)
    .reduce((acc, [key, value]) => {
      return acc.replace(new RegExp(key, "g"), value);
    }, text.replace(/^\s+|\s+$/g, "").toLowerCase())
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes;
}
