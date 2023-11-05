import Canvas from "@/ui/views/canvas";
import { ViewProvider } from "@/ui/views/store";
import WdigetMenu from "@/ui/views/widget-menu";
import WidgetsMenu from "@/ui/views/widgets-menu";
import Link from "next/link";
import { ChevronLeft, Save } from "react-feather";

export default function Page({
  params,
}: {
  params: { experimentId: string; viewId: string };
}) {
  return (
    <div className="flex flex-col flex-1 gap-2">
      {/* Experiment view navbar */}
      <div className="sticky z-10 w-full top-2 flex justify-between items-center h-12 bg-light rounded p-2 gap-2">
        <div className="flex justify-center items-center gap-1">
          <Link href={`/experiments/${params.experimentId}/views`}>
            <ChevronLeft size={16} />
          </Link>
          <span className="font-medium">View Design - {params.viewId}</span>
        </div>
        {/* <div className="w-5 h-5 bg-blue-400 sm:bg-red-400 md:bg-green-400 lg:bg-yellow-400 xl:bg-purple-400"></div> */}
        <div className="flex gap-2 text-white">
          <button className="flex justify-center items-center gap-2 rounded bg-success px-2 py-1">
            <span className="font-medium">Save</span>
            <Save size={16} />
          </button>
        </div>
      </div>

      {/* Experiment view design */}
      <ViewProvider widgets={[]}>
        <div className="grid grid-cols-12 gap-2 md:max-h-[calc(60vh)]">
          <div className="col-span-12 md:col-span-6 xl:col-span-8 h-[60vh]">
            <Canvas viewId={params.viewId} />
          </div>
          <div className="col-span-12 md:col-span-3 xl:col-span-2 overflow-y-scroll md:max-h-[60vh]">
            <WdigetMenu />
          </div>
          <div className="col-span-12 md:col-span-3 xl:col-span-2 overflow-y-scroll md:max-h-[60vh]">
            <WidgetsMenu />
          </div>
        </div>
      </ViewProvider>
    </div>
  );
}
