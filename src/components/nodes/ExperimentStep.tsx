import { views } from "@/mock-data";
import Link from "next/link";
import { useState } from "react";
import { Edit3, Play } from "react-feather";
import { Handle, Position } from "reactflow";

export default function ExpeirmentStepNode() {
  const [view, setView] = useState(views[0].slug);
  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="flex flex-col gap-2 p-2 w-44 bg-white border border-black rounded-sm text-sm">
        <div className="flex gap-2 items-center w-full">
          <Play size={16} /> <span>ExperimentStep</span>
        </div>
        <div className="flex gap-2 items-center">
          <select
            className="border rounded-md h-8 px-2 outline-info flex text-xs"
            value={view}
            onChange={(e) => {
              setView(e.target.value);
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
            href={`/experiments/dilema-de-la-pandemia/views/${view}`}
          >
            <Edit3 size={14} />
          </Link>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} id="b" />
    </>
  );
}
