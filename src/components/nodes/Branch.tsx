import { BranchNode, updateNode } from "@/ui/flow/store";
import { Edit3, GitBranch, Plus, X } from "react-feather";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";

export default function BranchNode(props: NodeProps<BranchNode>) {
  const {
    data: { branches = [] },
    id,
  } = props;
  const { setNodes } = useReactFlow();

  return (
    <>
      <Handle type="target" position={Position.Top} id="a" />
      <div className="flex flex-col gap-2 p-2 w-44 bg-white border border-black rounded-sm text-sm">
        <div className="flex gap-2 items-center w-full">
          <GitBranch size={16} /> <span>Branch</span>
        </div>
        <form
          className="flex gap-2 items-center"
          onSubmit={(e) => {
            e.preventDefault();
            const formEl = e.target as HTMLFormElement;
            const formData = new FormData(formEl);
            const branchName = formData.get("branch")?.toString()!;
            // updateNode<BranchNode>(id, setNodes, (node) => ({
            //   ...node,
            //   data: {
            //     ...node.data,
            //     branches: [...(node.data.branches || []), branchName],
            //   },
            // }));
            formEl.reset();
          }}
        >
          <input
            className="border w-full rounded-md h-8 px-2 outline-info flex text-xs"
            type="text"
            name="branch"
            id="branch"
            placeholder="Branch name"
          />
          <button className="hover:text-success" type="submit">
            <Plus size={16} />
          </button>
        </form>

        <ul>
          {branches.map((branch, index) => (
            <li key={index} className="flex gap-1 items-center justify-between">
              <span className="text-xs">{branch.group}</span>
              <div className="flex gap-1">
                <button className="hover:text-info">
                  <Edit3 size={12} />
                </button>
                <button
                  className="hover:text-error"
                  onClick={() => {
                    updateNode<BranchNode>(id, setNodes, (node) => ({
                      ...node,
                      data: {
                        ...node.data,
                        branches: (node.data.branches || []).filter(
                          (_: any, i: number) => i !== index
                        ),
                      },
                    }));
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
          isConnectable
          key={index}
          type="source"
          position={Position.Bottom}
          id={branch.group}
          style={{
            left: `${((index + 1) * 100) / (branches.length + 1)}%`,
          }}
        />
      ))}
    </>
  );
}
