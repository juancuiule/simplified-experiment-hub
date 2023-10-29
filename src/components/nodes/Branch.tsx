import { useState } from "react";
import { Edit3, GitBranch, Plus, X } from "react-feather";
import { Handle, Position } from "reactflow";

export default function BranchNode() {
  const [branches, setBranch] = useState<string[]>([]);
  const [branch, setBranchName] = useState<string>("");
  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="flex flex-col gap-2 p-2 w-44 bg-white border border-black rounded-sm text-sm">
        <div className="flex gap-2 items-center w-full">
          <GitBranch size={16} /> <span>Branch</span>
        </div>
        <div className="flex gap-2 items-center">
          <input
            className="border w-full rounded-md h-8 px-2 outline-info flex text-xs"
            type="text"
            name="branch"
            id="branch"
            placeholder="Branch name"
            value={branch}
            onChange={(e) => setBranchName(e.target.value)}
          />
          <button
            className="hover:text-success"
            onClick={() => setBranch((b) => [...b, branch])}
          >
            <Plus size={16} />
          </button>
        </div>

        <ul>
          {branches.map((branch, index) => (
            <li key={index} className="flex gap-1 items-center justify-between">
              <span className="text-xs">{branch}</span>
              <div className="flex gap-1">
                <button className="hover:text-info">
                  <Edit3 size={12} />
                </button>
                <button
                  className="hover:text-error"
                  onClick={() => {
                    setBranch((b) => b.filter((_, i) => i !== index));
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      {branches.map((branch, index) => (
        <Handle
          key={index}
          type="source"
          position={Position.Bottom}
          id={branch}
          style={{ left: `${((index + 1) * 100) / (branches.length + 1)}%` }}
        />
      ))}
    </>
  );
}
