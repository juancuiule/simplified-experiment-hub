"use client";
import "reactflow/dist/style.css";
import BranchNode from "@/components/nodes/Branch";
import CheckpointNode from "@/components/nodes/Checkpoint";
import ExpeirmentStepNode from "@/components/nodes/ExperimentStep";
import FinishNode from "@/components/nodes/Finish";
import StartNode from "@/components/nodes/Start";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
} from "reactflow";
import { FlowState, useFlowContext } from "./store";
import NoOpNode from "@/components/nodes/NoOp";

const nodeTypes = {
  start: StartNode,
  finish: FinishNode,
  checkpoint: CheckpointNode,
  "experiment-step": ExpeirmentStepNode,
  branch: BranchNode,
  noop: NoOpNode,
};
const selector = (state: FlowState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

export default function Canvas() {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } =
    useFlowContext(selector);

  return (
    <div className="flex flex-col p-2 gap-2 rounded bg-light h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Controls />
        <MiniMap />
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
