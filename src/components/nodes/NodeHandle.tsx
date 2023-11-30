import { HTMLAttributes, useCallback } from "react";
import {
  Handle,
  HandleProps,
  ReactFlowState,
  useNodeId,
  useStore,
} from "reactflow";

const NodeHandle = ({
  maxConnections,
  ...props
}: HandleProps &
  Omit<HTMLAttributes<HTMLDivElement>, "id"> & { maxConnections: number }) => {
  const nodeId = useNodeId() || "";
  const handleId = props.id || "";

  const selector = useCallback(
    (s: ReactFlowState) => {
      const edges = s.edges.filter(
        (edge) => edge.source === nodeId && edge.sourceHandle === handleId
      );
      const connectable = edges.length < maxConnections;
      return connectable;
    },
    [nodeId, maxConnections, handleId]
  );

  const isConnectable = useStore(selector);

  // The `isConnectable` prop is a part of React Flow, all we need to do is give
  // it the bool we calculated above and React Flow can handle the logic to disable
  // it for us.
  return <Handle {...props} isConnectable={isConnectable} />;
};

export default NodeHandle;
