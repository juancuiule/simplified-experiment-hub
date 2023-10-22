"use client";
import Card from "@/components/Card";
import WidgetMenu from "@/components/framework/edit-menues";
import RenderState from "@/components/framework/render/RenderState";
import { defaultByType } from "@/lib/default";
import { useExperimentStore } from "@/lib/flow/state";
import { FrameworkWidget } from "@/lib/widgets";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { ChevronLeft, Eye, Save } from "react-feather";
import { items } from "./widget-items";

const fullItems = Object.values(items).reduce((acc, val) => [...acc, ...val]);

export default function Page({
  params,
}: {
  params: { experimentId: string; viewId: string };
}) {
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
          <Link href={`/experiments/${params.experimentId}/views`}>
            <ChevronLeft size={16} />
          </Link>
          <span className="font-medium">View Design - {params.viewId}</span>
        </div>
        <div className="flex gap-2.5 text-white">
          <button className="flex justify-center items-center gap-2 rounded bg-[#4F4F4F] px-2.5 py-1">
            <span className="font-medium">Preview</span>
            <Eye size={16} />
          </button>
          <button className="flex justify-center items-center gap-2 rounded bg-success px-2.5 py-1">
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
        {widgets.length > 0 ? (
          <div className="flex flex-col p-2.5 gap-2.5 overflow-y-scroll rounded bg-light">
            {widgets.map((widget, i) => {
              const item = fullItems.find(
                (item) => item.template === widget.template
              )!;
              return (
                <div
                  key={`${widget.id}`}
                  className="w-full flex flex-col gap-1"
                >
                  <WidgetMenu
                    widget={widget}
                    icon={<item.icon size={16} />}
                    remove={() => {
                      setWidgets((ws) => ws.filter((_, j) => j !== i));
                    }}
                    moveDown={() => {
                      if (i === widgets.length - 1) return;
                      const newWidgets = [...widgets];
                      const temp = newWidgets[i];
                      newWidgets[i] = newWidgets[i + 1];
                      newWidgets[i + 1] = temp;
                      setWidgets(newWidgets);
                    }}
                    moveUp={() => {
                      if (i === 0) return;
                      const newWidgets = [...widgets];
                      const temp = newWidgets[i];
                      newWidgets[i] = newWidgets[i - 1];
                      newWidgets[i - 1] = temp;
                      setWidgets(newWidgets);
                    }}
                    updateWidget={(newWidget) => {
                      const newWidgets = [...widgets];
                      newWidgets[i] = { ...newWidget, id: widget.id };
                      setWidgets(newWidgets);
                    }}
                  />
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
                    const newWidget: FrameworkWidget = {
                      ...defaultByType(item.template),
                      id: new Date().getTime().toString(),
                    };
                    setWidgets((ws) => [...ws, newWidget]);
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
