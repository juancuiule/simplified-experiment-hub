"use client";

import Card from "@/components/Card";
import { useState } from "react";
import {
  CornerUpRight,
  Database,
  Flag,
  GitBranch,
  Icon,
  Monitor,
  Play,
  Shuffle,
  SkipForward,
} from "react-feather";

type Item = {
  icon: Icon;
  title: string;
  description: string;
};

const coreNodes: Item[] = [
  {
    icon: Play,
    title: "Start",
    description: "Representa el inicio del experimento",
  },
  {
    icon: Flag,
    title: "Finish",
    description: "Representa el final del experimento",
  },
  {
    icon: Database,
    title: "Checkpoint",
    description:
      "Es un nodo que una vez aue la persona pasa por ahí envía los datos al backend",
  },
  {
    icon: SkipForward,
    title: "NoOp",
    description:
      "Es un nodo que sirve para casos particulares donde encesitamos un nodo para ocupar un lugar pero tiene que al caer ahí tiene que pasar directamente al siguiente. En principio es un workaround para casos donde un branch tiene una rama que implica saltearse la otra.",
  },
];

const studyNodes: Item[] = [
  {
    icon: Monitor,
    title: "Experiment Step",
    description:
      "Es un step ad-hoc del experimento (no viene de un cuestionario). Es una lista de widgets que se muestran en esa pantalla",
  },
  {
    icon: Monitor,
    title: "Task",
    description:
      "Es un step donde el usuario tiene que realizar una tarea. Puede tener un tiempo límite y un botón para terminar la tarea. Puede tener un botón para empezar la tarea o empezarla automáticamente cuando se llega a ese nodo",
  },
];

const controlNodes: Item[] = [
  {
    icon: GitBranch,
    title: "Branch",
    description: "Nodo que sirve para dividir el flujo en base a algún valor",
  },
  {
    icon: CornerUpRight,
    title: "Redirect",
    description:
      "Es un nodo que tiene un nodeId y te lleva a ese punto del experimento (podríamos configurar si esto resetea el contexto o no)",
  },
  {
    icon: Monitor,
    title: "Path",
    description:
      "Es un nodo que agrupa otros nodos que constituyen toda un camino posible dentro del experimento. Tiene un bool para indicar si esos nodos van acompañados de un stepper o no",
  },
  {
    icon: Shuffle,
    title: "Fork",
    description:
      "Nodo que sirve para dividir el flujo en distintos forks de forma aleatoria",
  },
];

export default function Page({ params }: { params: { experimentId: string } }) {
  const [items, setItems] = useState<Item[]>([]);

  return (
    <div className="flex flex-row flex-1 gap-2.5">
      <div className="flex-1 h-full bg-gray-100 p-3 rounded-md">
        <h1>Experiment {params.experimentId} - Flow</h1>
        <div className="flex flex-col gap-2">
          {items.map((item, i) => (
            <Card
              title={item.title}
              icon={<item.icon size={16} />}
              description=""
              onClick={() => {
                if (item.title === "Experiment Step") {
                  // open experiment view in new tab
                  window.open(
                    `/experiments/${params.experimentId}/views/${1}`,
                    "_blank"
                  );
                } else {
                  setItems((prev) => prev.filter((_, j) => i !== j));
                }
              }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2.5 max-h-[calc(100vh-64px-48px)] overflow-y-scroll rounded-md">
        <h4 className="text-md font-semibold text-white">Core</h4>
        {coreNodes.map((item) => (
          <Card
            title={item.title}
            icon={<item.icon size={16} />}
            description={item.description}
            onClick={() => setItems((prev) => [...prev, item])}
          />
        ))}
        <h4 className="text-md font-semibold text-white">Study</h4>
        {studyNodes.map((item) => (
          <Card
            title={item.title}
            icon={<item.icon size={16} />}
            description={item.description}
            onClick={() => setItems((prev) => [...prev, item])}
          />
        ))}
        <h4 className="text-md font-semibold text-white">Control</h4>
        {controlNodes.map((item) => (
          <Card
            title={item.title}
            icon={<item.icon size={16} />}
            description={item.description}
            onClick={() => setItems((prev) => [...prev, item])}
          />
        ))}
      </div>
    </div>
  );
}
