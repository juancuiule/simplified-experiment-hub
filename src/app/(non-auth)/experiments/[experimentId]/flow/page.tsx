import Canvas from "@/ui/flow/canvas";
import { FlowProvider } from "@/ui/flow/store";
import Link from "next/link";
import { ChevronLeft, Save } from "react-feather";

import { Edge, Node } from "reactflow";

import NodesMenu from "@/ui/flow/nodes-menu";
import Debug from "@/ui/flow/debug";

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

export default function Page({ params }: { params: { experimentId: string } }) {
  // TODO: Fetch flow from backend

  return (
    <div className="flex flex-col flex-1 gap-2">
      {/* Experiment flow navbar */}
      <div className="sticky z-50 w-full top-2 flex justify-between items-center h-12 bg-light rounded p-2 gap-2">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/experiments/${params.experimentId}/dashboard`}>
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
