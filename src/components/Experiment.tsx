"use client";
import RenderState from "@/components/framework/render/RenderState";
import { FrameworkExperiment } from "@/lib";
import { useExperimentStore } from "@/lib/flow/state";
import { useEffect } from "react";

const experiment: FrameworkExperiment = {
  name: "La invención de la comida",
  slug: "la-invencion-de-la-comida",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolores iusto libero laborum amet? Suscipit, quas! Qui ex, ducimus iusto provident et at omnis voluptatem recusandae laboriosam atque. Tenetur, rerum.",
  views: [
    {
      slug: "regressors",
      description: "",
      name: "Regresores",
      widgets: [
        {
          template: "rich_text",
          widgetFamily: "content",
          props: {
            content: "# Para empezar",
          },
        },
      ],
    },
  ],
  nodes: [
    { nodeType: "start", nodeFamily: "core", id: "", props: {} },
    {
      nodeType: "experiment-step",
      nodeFamily: "study",
      id: "regresores",
      props: {
        slug: "regressors",
      },
    },
    {
      nodeType: "checkpoint",
      nodeFamily: "core",
      id: "checkpoint-1",
      props: {},
    },
    {
      nodeFamily: "study",
      nodeType: "custom-view",
      id: "feedback",
      props: {
        slug: "feedback-comer",
      },
    },
    { nodeType: "finish", nodeFamily: "core", id: "", props: {} },
  ],
};

export default function Experiment() {
  const state = useExperimentStore((e) => e.state);
  const init = useExperimentStore((e) => e.init);
  const unsubTransient = useExperimentStore((e) => e.unsubTransient);

  useEffect(() => {
    init(experiment.nodes);
    return () => {
      unsubTransient();
    };
  }, [init, unsubTransient]);

  return <RenderState state={state} views={experiment.views} />;
}
