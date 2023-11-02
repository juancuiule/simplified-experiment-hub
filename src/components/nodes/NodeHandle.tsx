import { FlowNode } from "@/ui/flow/store";
import { HTMLAttributes, useCallback } from "react";
import {
  Handle,
  HandleProps,
  ReactFlowState,
  getConnectedEdges,
  useNodeId,
  useStore,
} from "reactflow";

const selector =
  (nodeId: string, isConnectable = true, maxConnections = Infinity) =>
  (s: ReactFlowState) => {
    // If the user props say this handle is not connectable, we don't need to
    // bother checking anything else.
    if (!isConnectable) return false;

    const node = s.nodeInternals.get(nodeId) as FlowNode;
    console.log({ node });
    const connectedEdges = getConnectedEdges([node], s.edges);

    return connectedEdges.length < maxConnections;
  };

const NodeHandle = ({
  maxConnections,
  ...props
}: HandleProps &
  Omit<HTMLAttributes<HTMLDivElement>, "id"> & { maxConnections: number }) => {
  const nodeId = useNodeId();
  const isConnectable = useStore(
    useCallback(selector(nodeId || "", props.isConnectable, maxConnections), [
      nodeId,
      props.isConnectable,
      maxConnections,
    ])
  );

  console.log({ isConnectable, maxConnections })

  // The `isConnectable` prop is a part of React Flow, all we need to do is give
  // it the bool we calculated above and React Flow can handle the logic to disable
  // it for us.
  return <Handle {...props} isConnectable={isConnectable} />;
};

export default NodeHandle;
