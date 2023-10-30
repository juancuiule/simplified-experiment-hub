import { views } from "@/mock-data";
import { updateNode } from "@/ui/flow/store";
import Link from "next/link";
import { Edit3, Monitor } from "react-feather";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

type ExperimentStepNodeData = {
  label: "ExperimentStep";
  view?: string;
};

export default function ExpeirmentStepNode(
  props: NodeProps<ExperimentStepNodeData>
) {
  const {
    data: { view = "" },
    id,
  } = props;
  const { setNodes } = useReactFlow();

  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="flex flex-col gap-2 p-2 w-44 bg-white border border-black rounded-sm text-sm">
        <div className="flex gap-2 items-center w-full">
          <Monitor size={16} /> <span>ExperimentStep</span>
        </div>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded-md h-8 px-2 outline-info flex text-xs"
            onChange={(e) => {
              const view = e.target.value;
              updateNode<ExperimentStepNodeData>(id, setNodes, (node) => ({
                ...node,
                data: {
                  ...node.data,
                  view,
                },
              }));
            }}
          >
            {views.map((view) => (
              <option key={view.slug} value={view.slug}>
                {view.name}
              </option>
            ))}
          </select>
          <Link
            className="hover:text-blue-400"
            href={`/experiments/dilemas-de-la-pandemia/views/${view}`}
          >
            <Edit3 size={14} />
          </Link>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
}
