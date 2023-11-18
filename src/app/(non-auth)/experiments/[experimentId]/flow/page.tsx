import Canvas from "@/ui/flow/canvas";
import { FlowNode, FlowProvider } from "@/ui/flow/store";
import Link from "next/link";
import { ChevronLeft, Save } from "react-feather";

import { Edge, Node } from "reactflow";

import NodesMenu from "@/ui/flow/nodes-menu";
import Debug from "@/ui/flow/debug";

const initialNodes: FlowNode[] = [
  {
    width: 176,
    height: 38,
    id: "0.06672878037301588",
    position: {
      x: -147.67910254814456,
      y: -25.617803503249547,
    },
    data: {
      type: "start",
    },
    type: "start",
    positionAbsolute: {
      x: -147.67910254814456,
      y: -25.617803503249547,
    },
    selected: false,
    dragging: false,
  },
  {
    width: 176,
    height: 38,
    id: "0.44843533876167285",
    position: {
      x: -132.328202219592,
      y: 444.48703822478325,
    },
    data: {
      type: "noop",
    },
    type: "noop",
    positionAbsolute: {
      x: -132.328202219592,
      y: 444.48703822478325,
    },
    selected: false,
    dragging: false,
  },
  {
    width: 176,
    height: 86,
    id: "0.6382724944204043",
    position: {
      x: -69.16399594277266,
      y: 547.6059051074536,
    },
    data: {
      checkpointId: "first-save",
      type: "checkpoint",
    },
    type: "checkpoint",
    positionAbsolute: {
      x: -69.16399594277266,
      y: 547.6059051074536,
    },
    selected: false,
    dragging: false,
  },
  {
    width: 176,
    height: 38,
    id: "0.332068266659",
    position: {
      x: -123.28012001654295,
      y: 781.7674252144014,
    },
    data: {
      type: "finish",
    },
    type: "finish",
    positionAbsolute: {
      x: -123.28012001654295,
      y: 781.7674252144014,
    },
    selected: false,
    dragging: false,
  },
  {
    width: 176,
    height: 78,
    id: "0.7119057478133837",
    position: {
      x: -133.70504191703486,
      y: 660.308361445966,
    },
    data: {
      viewId: "gracias",
      type: "experiment-step",
    },
    type: "experiment-step",
    positionAbsolute: {
      x: -133.70504191703486,
      y: 660.308361445966,
    },
    selected: false,
    dragging: false,
  },
  {
    width: 176,
    height: 78,
    id: "0.02293823979960008",
    position: {
      x: -150.4698980978284,
      y: 62.244592122080576,
    },
    data: {
      viewId: "terms",
      type: "experiment-step",
    },
    type: "experiment-step",
    positionAbsolute: {
      x: -150.4698980978284,
      y: 62.244592122080576,
    },
    selected: false,
    dragging: false,
  },
  {
    width: 176,
    height: 118,
    id: "0.4814941625288125",
    position: {
      x: -146.66517320111922,
      y: 188.94376094884603,
    },
    data: {
      branches: ["sin-psicodelicos", "con-psicodelicos"],
      type: "branch",
    },
    type: "branch",
    selected: false,
    positionAbsolute: {
      x: -146.66517320111922,
      y: 188.94376094884603,
    },
    dragging: false,
  },
  {
    width: 176,
    height: 78,
    id: "0.1345763639252744",
    position: {
      x: 84.38805859893975,
      y: 414.40564490550776,
    },
    data: {
      viewId: "psicodelicos",
      type: "experiment-step",
    },
    type: "experiment-step",
    selected: false,
    positionAbsolute: {
      x: 84.38805859893975,
      y: 414.40564490550776,
    },
    dragging: false,
  },
];
const initialEdges: Edge[] = [
  {
    source: "0.02293823979960008",
    sourceHandle: "b",
    target: "0.4814941625288125",
    targetHandle: "a",
    id: "reactflow__edge-0.02293823979960008b-0.4814941625288125a",
  },
  {
    source: "0.4814941625288125",
    sourceHandle: "sin-psicodelicos",
    target: "0.44843533876167285",
    targetHandle: "a",
    id: "reactflow__edge-0.4814941625288125sin-psicodelicos-0.44843533876167285a",
  },
  {
    source: "0.06672878037301588",
    sourceHandle: "a",
    target: "0.02293823979960008",
    targetHandle: "a",
    id: "reactflow__edge-0.06672878037301588a-0.02293823979960008a",
  },
  {
    source: "0.4814941625288125",
    sourceHandle: "con-psicodelicos",
    target: "0.1345763639252744",
    targetHandle: "a",
    id: "reactflow__edge-0.4814941625288125con-psicodelicos-0.1345763639252744a",
  },
  {
    source: "0.44843533876167285",
    sourceHandle: "a",
    target: "0.6382724944204043",
    targetHandle: "a",
    id: "reactflow__edge-0.44843533876167285a-0.6382724944204043a",
  },
  {
    source: "0.1345763639252744",
    sourceHandle: "b",
    target: "0.6382724944204043",
    targetHandle: "a",
    id: "reactflow__edge-0.1345763639252744b-0.6382724944204043a",
  },
  {
    source: "0.6382724944204043",
    sourceHandle: "a",
    target: "0.7119057478133837",
    targetHandle: "a",
    id: "reactflow__edge-0.6382724944204043a-0.7119057478133837a",
  },
  {
    source: "0.7119057478133837",
    sourceHandle: "b",
    target: "0.332068266659",
    targetHandle: "a",
    id: "reactflow__edge-0.7119057478133837b-0.332068266659a",
  },
];

export default function Page({ params }: { params: { experimentId: string } }) {
  // TODO: Fetch flow from backend

  return (
    <div className="flex flex-col flex-1 gap-2">
      {/* Experiment flow navbar */}
      <div className="sticky z-10 w-full top-2 flex justify-between items-center h-12 bg-light rounded p-2 gap-2">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/experiments/${params.experimentId}`}>
            <ChevronLeft size={16} />
          </Link>
          <span className="font-medium">Flow Design</span>
        </div>
        <div className="flex gap-2 text-white">
          <button className="flex justify-center items-center gap-2 rounded bg-success px-2 py-1">
            <span className="font-medium">Save</span>
            <Save size={16} />
          </button>
        </div>
      </div>

      {/* Experiment flow design */}
      <FlowProvider nodes={initialNodes} edges={initialEdges}>
        <div className="grid grid-cols-12 gap-2 md:max-h-[calc(60vh)]">
          <div className="col-span-12 md:col-span-9 lg:col-span-10 h-[60vh]">
            <Canvas />
          </div>
          <div className="col-span-12 md:col-span-3 lg:col-span-2 overflow-y-scroll md:max-h-[60vh]">
            <NodesMenu />
          </div>
        </div>
        <div className="flex">
          <Debug />
        </div>
      </FlowProvider>
    </div>
  );
}
