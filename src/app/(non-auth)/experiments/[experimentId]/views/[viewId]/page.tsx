"use client";

import Card from "@/components/Card";
import RenderState from "@/components/render/RenderState";
import { defaultByType } from "@/lib/default";
import { useExperimentStore } from "@/lib/flow/state";
import { FrameworkWidget } from "@/lib/widgets";
import { Fragment, useEffect, useState } from "react";
import { ChevronLeft, Eye, Save } from "react-feather";
import { Item, items } from "./widget-items";

export default function Page({
  params,
}: {
  params: { experimentId: string; viewId: string };
}) {
  const [viewItems, setItems] = useState<Item[]>([]);
  const [widgets, setWidgets] = useState<FrameworkWidget[]>([]);

  const init = useExperimentStore((e) => e.init);

  useEffect(() => {
    init([], true);
  }, []);

  return (
    <div className="flex flex-col flex-1 gap-2.5">
      {/* Experiment flow navbar */}
      <div className="flex justify-between items-center h-11 bg-light rounded p-2.5 gap-2.5">
        <div className="flex justify-center items-center gap-1">
          <button>
            <ChevronLeft size={16} />
          </button>
          <span className="font-medium">
            Experiment {params.experimentId} - View Design - {params.viewId}
          </span>
        </div>
        <div className="flex gap-2.5 text-white">
          <button className="flex justify-center items-center gap-2 rounded bg-[#4F4F4F] px-2.5 py-1">
            <span className="font-medium">Preview</span>
            <Eye size={16} />
          </button>
          <button className="flex justify-center items-center gap-2 rounded bg-sucess px-2.5 py-1">
            <span className="font-medium">Save</span>
            <Save size={16} />
          </button>
        </div>
      </div>

      {/* Experiment flow design */}
      <div className="flex flex-1 gap-2.5 max-h-[calc(100vh-64px-24px*2-44px-10px)]">
        {/* Preview */}
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
                  id: params.viewId,
                  nodeType: "experiment-step",
                  nodeFamily: "study",
                  props: { widgets },
                },
              }}
            />
          </div>
        </div>

        {/* Current widgets */}
        {viewItems.length > 0 ? (
          <div className="flex flex-col p-2.5 gap-2.5 overflow-y-scroll rounded bg-light">
            {viewItems.map((item, i) => {
              const widget = widgets[i];
              return (
                <div
                  key={`${item.title}-${i}`}
                  className="w-full flex flex-col gap-1"
                >
                  <Card
                    title={item.title}
                    icon={<item.icon size={16} />}
                    description={item.description}
                    onClick={() => {
                      setItems((is) => is.filter((_, j) => j !== i));
                      setWidgets((is) => is.filter((_, j) => j !== i));
                    }}
                  />
                  {item.template === "rich_text" &&
                  widget.template === "rich_text" ? (
                    <textarea
                      className="border w-full h-fit"
                      onChange={(e) => {
                        const newWidgets = [...widgets];
                        const newWidget = newWidgets[i];
                        if (newWidget.template == "rich_text") {
                          newWidget.props.content = e.target.value;
                        }
                        setWidgets(newWidgets);
                      }}
                    >
                      {widget.props.content}
                    </textarea>
                  ) : null}
                  {item.template === "slider" &&
                  widget.template === "slider" ? (
                    <textarea
                      className="border w-full h-fit"
                      onChange={(e) => {
                        const newWidgets = [...widgets];
                        const newWidget = newWidgets[i];
                        if (newWidget.template == "slider") {
                          newWidget.props.label = e.target.value;
                        }
                        setWidgets(newWidgets);
                      }}
                    >
                      {widget.props.label}
                    </textarea>
                  ) : null}
                </div>
              );
            })}
          </div>
        ) : null}

        {/* Nodes menu */}
        <div className="flex flex-col p-2.5 gap-2.5 overflow-y-scroll rounded bg-light">
          {Object.entries(items).map(([key, value]) => (
            <Fragment key={key}>
              <h4 className="text-md font-semibold">{`${key
                .charAt(0)
                .toUpperCase()}${key.slice(1)}`}</h4>
              {value.map((item) => (
                <Card
                  key={item.title}
                  title={item.title}
                  icon={<item.icon size={16} />}
                  description={item.description}
                  onClick={() => {
                    setWidgets((ws) => [...ws, defaultByType(item.template)]);
                    setItems((is) => [...is, item]);
                  }}
                />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
