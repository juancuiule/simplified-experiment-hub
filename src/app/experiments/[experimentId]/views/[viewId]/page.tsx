"use client";

import Card from "@/components/Card";
import { ChevronLeft, Eye, Save } from "react-feather";
import { items, Item } from "./widget-items";
import { Fragment, useState } from "react";

export default function Page({
  params,
}: {
  params: { experimentId: string; viewId: string };
}) {
  const [viewItems, setItems] = useState<Item[]>([]);

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
          className="flex-1 bg-light rounded"
          style={{
            backgroundImage: "url(/dot-tile.png)",
            backgroundRepeat: "repeat",
            backgroundSize: "45px 45px",
          }}
        ></div>

        {/* Current widgets */}
        {viewItems.length > 0 ? (
          <div className="flex flex-col p-2.5 gap-2.5 overflow-y-scroll rounded bg-light">
            {viewItems.map((item, i) => (
              <Card
                key={`${item.title}-${i}`}
                title={item.title}
                icon={<item.icon size={16} />}
                description={item.description}
                onClick={() => {
                  setItems((is) => is.filter((_, j) => j !== i));
                }}
              />
            ))}
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
