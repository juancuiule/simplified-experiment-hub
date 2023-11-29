import { CheckpointNode, updateNode } from "@/ui/flow/store";
import { Database } from "react-feather";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import NodeHandle from "./NodeHandle";

export default function CheckpointNode(props: NodeProps<CheckpointNode>) {
  const {
    data: { checkpointId = "" },
    id,
  } = props;
  const { setNodes } = useReactFlow();

  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="flex flex-col gap-2 p-2 w-44 bg-white border border-black rounded-sm text-sm">
        <div className="flex gap-2 items-center w-full">
          <Database size={16} /> <span>Checkpoint</span>
        </div>
        <input
          className="border rounded-md h-10 px-2 outline-info flex"
          type="text"
          name="checkpoint"
          id="checkpoint"
          placeholder="Checkpoint name"
          value={checkpointId}
          onChange={(e) => {
            const checkpointId = e.target.value;
            updateNode<CheckpointNode>(id, setNodes, (node) => ({
              ...node,
              data: {
                ...node.data,
                checkpointId,
              },
            }));
          }}
        />
      </div>
      <NodeHandle maxConnections={1} type="source" position={Position.Bottom} id="a" />
    </>
  );
}
