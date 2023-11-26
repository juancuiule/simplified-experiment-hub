import { API } from "@/api";
import { FrameworkView } from "@/lib";
import Canvas from "@/ui/views/canvas";
import { ViewProvider } from "@/ui/views/store";
import TopNav from "@/ui/views/top-nav";
import WdigetMenu from "@/ui/views/widget-menu";
import WidgetsMenu from "@/ui/views/widgets-menu";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { experimentId: string; viewId: string };
}) {
  const { experimentId, viewId } = params;
  const view: FrameworkView | undefined = await API.experiments
    .fetch(experimentId)
    .then((res) => {
      return res.views.find((view) => view.slug === viewId);
    });

  if (view === undefined) {
    notFound();
  }

  const { widgets } = view;

  return (
    <div className="flex flex-col flex-1 gap-2">
      <ViewProvider widgets={widgets}>
        <>
          {/* Experiment view navbar */}
          <TopNav experimentId={params.experimentId} viewId={params.viewId} />
          {/* Experiment view design */}
          <div className="grid grid-cols-12 gap-2 md:max-h-[calc(60vh)]">
            <div className="col-span-12 md:col-span-4 xl:col-span-6 h-[60vh]">
              <Canvas viewId={params.viewId} />
            </div>
            <div className="col-span-12 md:col-span-4 xl:col-span-4 overflow-y-scroll md:max-h-[60vh] w-full max-w-none">
              <WdigetMenu />
            </div>
            <div className="col-span-12 md:col-span-4 xl:col-span-2 overflow-y-scroll md:max-h-[60vh] w-full max-w-none">
              <WidgetsMenu />
            </div>
          </div>
        </>
      </ViewProvider>
    </div>
  );
}
