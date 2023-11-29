"use client";
import { BranchNode, updateNode } from "@/ui/flow/store";
import { useState } from "react";
import { Edit3, GitBranch, Plus, X } from "react-feather";
import { Handle, NodeProps, Position, useReactFlow } from "reactflow";
import BranchConfigModal from "./BranchConfigModal";
import { Branch } from "@/lib/nodes/control";
import NodeHandle from "./NodeHandle";

export default function BranchNode(props: NodeProps<BranchNode>) {
  const {
    data: { branches = [] },
    id,
  } = props;
  const { setNodes, setEdges } = useReactFlow();

  const [open, setOpen] = useState(false);
  const [initialState, setInitialState] = useState<
    Partial<Omit<Branch, "nextNode">> | undefined
  >(undefined);

  const addBranch = (branch: Omit<Branch, "nextNode">) => {
    updateNode<BranchNode>(id, setNodes, (node) => ({
      ...node,
      data: {
        ...node.data,
        branches: [...(node.data.branches || []), branch],
      },
    }));
  };

  const updateBranch = (group: string, branch: Omit<Branch, "nextNode">) => {
    updateNode<BranchNode>(id, setNodes, (node) => ({
      ...node,
      data: {
        ...node.data,
        branches: (node.data.branches || []).map((b) =>
          b.group === group ? branch : b
        ),
      },
    }));
  };

  return (
    <>
      <BranchConfigModal
        isOpen={open}
        addBranch={addBranch}
        updateBranch={updateBranch}
        initialState={initialState}
        close={() => {
          setOpen(false);
          setInitialState(undefined);
        }}
      />
      <Handle type="target" position={Position.Top} id="a" />
      <div className="flex flex-col gap-2 p-2 min-w-[theme(spacing.44)] bg-white border border-black rounded-sm text-sm">
        <div className="flex gap-2 items-center w-full">
          <GitBranch size={16} /> <span>Branch</span>
        </div>

        <ul>
          {branches.map((branch, index) => (
            <li key={index} className="flex gap-1 items-center justify-between">
              <span className="text-xs">
                {index + 1}. {branch.group}
              </span>
              <div className="flex gap-1">
                <button
                  className="hover:text-info"
                  onClick={() => {
                    setInitialState(branch);
                    setOpen(true);
                  }}
                >
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
                    setEdges((edges) => {
                      return edges.filter(
                        (edge) => edge.sourceHandle !== branch.group
                      );
                    });
                  }}
                >
                  <X size={12} />
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-center">
          <button
            className="hover:text-success"
            onClick={() => {
              setOpen(true);
            }}
          >
            <Plus size={16} />
          </button>
        </div>
        {branches.length > 0 && (
          <div className="relative h-3">
            {branches.map((branch, index) => (
              <div
                key={index}
                className="absolute text-center -translate-x-1/2"
                style={{
                  left: `${((index + 1) * 100) / (branches.length + 1)}%`,
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>
        )}
      </div>
      {branches.map((branch, index) => (
        <NodeHandle
          maxConnections={1}
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
