import { SkipForward } from "react-feather";
import { Handle, Position } from "reactflow";

export default function NoOpNode() {
  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="flex flex-col gap-2 p-2 w-44 bg-white border border-black rounded-sm text-sm">
        <div className="flex gap-2 items-center w-full">
          <SkipForward size={16} /> <span>NoOp</span>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="a" />
    </>
  );
}
