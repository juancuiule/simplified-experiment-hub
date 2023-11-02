"use client";
import Card from "@/components/Card";
import { items } from "./node-items";
import { FlowNodeTypes, useFlowContext, defaultForType } from "./store";

export default function NodesMenu() {
  const addNode = useFlowContext((state) => state.addNode);

  return (
    <div className="flex flex-col p-2 gap-2 rounded bg-light">
      {Object.entries(items).map(([key, value]) => (
        <div className="flex flex-col gap-2" key={key}>
          <h4 className="text-md font-semibold">{`${key
            .charAt(0)
            .toUpperCase()}${key.slice(1)}`}</h4>
          <div className="grid grid-cols-12 gap-2">
            {value.map((item) => (
              <button
                onClick={() => {
                  const type = item.title
                    .toLowerCase()
                    .replaceAll(" ", "-") as unknown as FlowNodeTypes["type"];
                  addNode({
                    id: Math.random().toString(),
                    position: { x: 0, y: 0 },
                    data: {
                      ...defaultForType(type),
                    },
                    type,
                  });
                }}
                className="text-left col-span-6 md:col-span-12 flex-1"
                key={item.title}
              >
                <Card
                  title={item.title}
                  icon={<item.icon size={16} />}
                  description={item.description}
                />
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
