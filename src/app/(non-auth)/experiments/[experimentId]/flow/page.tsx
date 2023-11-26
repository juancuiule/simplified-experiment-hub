import Canvas from "@/ui/flow/canvas";
import { FlowProvider } from "@/ui/flow/store";

import { API } from "@/api";
import Debug from "@/ui/flow/debug";
import NodesMenu from "@/ui/flow/nodes-menu";
import TopNav from "@/ui/flow/top-nav";
import { parseEdges, parseNodes } from "@/utils";

export const revalidate = 0;

export default async function Page({
  params,
}: {
  params: { experimentId: string };
}) {
  const { nodes, views } = await API.experiments.fetch(params.experimentId);

  const initialNodes = parseNodes(nodes);
  const initialEdges = parseEdges(nodes);

  return (
    <div className="flex flex-col flex-1 gap-2">
      <FlowProvider nodes={initialNodes} edges={initialEdges} views={views}>
        <>
          {/* Experiment flow navbar */}
          <TopNav experimentId={params.experimentId} />
          {/* Experiment flow design */}
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
        </>
      </FlowProvider>
    </div>
  );
}
