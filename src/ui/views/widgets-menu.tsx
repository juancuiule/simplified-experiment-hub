"use client";
import Card from "@/components/Card";
import { items } from "./widget-items";
import { useViewContext } from "./store";
import { Fragment } from "react";
import { FrameworkWidget } from "@/lib/widgets";
import { defaultByType } from "@/lib/default";

export default function WidgetsMenu() {
  const addWidget = useViewContext((state) => state.addWidget);

  return (
    <div className="flex flex-col p-2 gap-2 overflow-y-scroll rounded bg-light">
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
                addWidget(newWidget);
              }}
            />
          ))}
        </Fragment>
      ))}
    </div>
  );
}
