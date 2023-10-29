"use client";
import Card from "@/components/Card";
import { items } from "@/components/node-items";
import Link from "next/link";
import { Fragment, useCallback } from "react";
import { ChevronLeft, Save } from "react-feather";

// export const metadata: Metadata = {
//   title: `Flow`,
// };
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Node,
  OnConnect,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";

import "reactflow/dist/style.css";

const initialNodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "1" } },
  { id: "2", position: { x: 0, y: 100 }, data: { label: "2" } },
];
const initialEdges = [{ id: "e1-2", source: "1", target: "2" }];

export default function Page({ params }: { params: { experimentId: string } }) {
  // TODO: Fetch flow from backend

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const addNode = useCallback(
    (node: Node) => {
      setNodes((nodes) => [...nodes, node]);
    },
    [setNodes]
  );

  return (
    <div className="flex flex-col flex-1 gap-2">
      {/* Experiment flow navbar */}
      <div className="flex justify-between items-center h-12 bg-light rounded p-2 gap-2">
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
      <div className="flex gap-2 max-h-[calc(80vh-64px-24px*2-44px-10px)]">
        {/* Preview */}
        <div className="flex-1 bg-light rounded flex flex-col gap-2 p-2">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
          >
            <Controls />
            <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          </ReactFlow>
        </div>

        {/* Nodes menu */}
        <div className="flex flex-col p-2 gap-2 overflow-y-scroll rounded bg-light">
          {Object.entries(items).map(([key, value]) => (
            <Fragment key={key}>
              <h4 className="text-md font-semibold">{`${key
                .charAt(0)
                .toUpperCase()}${key.slice(1)}`}</h4>
              {value.map((item) => (
                <button
                  onClick={() => {
                    addNode({
                      id: Math.random().toString(),
                      position: { x: 0, y: 0 },
                      data: { label: item.title },
                    });
                  }}
                  className="text-left"
                  key={item.title}
                >
                  <Card
                    title={item.title}
                    icon={<item.icon size={16} />}
                    description={item.description}
                  />
                </button>
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
