"use client";
import "reactflow/dist/style.css";
import { ViewState, useViewContext } from "./store";
import RenderState from "@/components/framework/render/RenderState";

const selector = (state: ViewState) => ({
  widgets: state.widgets,
});

export default function Canvas(props: { viewId: string }) {
  const { widgets } = useViewContext(selector);

  return (
    <div className="flex flex-col p-2 gap-2 rounded bg-light h-full">
      <div
        className="flex flex-col flex-1 p-6 bg-light rounded h-full overflow-y-scroll"
        style={{
          backgroundImage: "url(/dot-tile.png)",
          backgroundRepeat: "repeat",
          backgroundSize: "45px 45px",
        }}
      >
        <div className="flex flex-col flex-1 mx-auto gap-4 max-w-lg w-full p-6 border border-black bg-white min-h-fit">
          <RenderState
            state={{
              type: "in-node",
              node: {
                id: props.viewId,
                nodeType: "experiment-step",
                nodeFamily: "study",
                props: { widgets },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}
