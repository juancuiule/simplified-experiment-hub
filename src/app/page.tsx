"use client";
import RenderState from "@/components/RenderState";
import { useExperimentStore } from "@/lib/flow/state";
import { FrameworkNode } from "@/lib/nodes";
import { useEffect } from "react";

type Experiment = {
  nodes: FrameworkNode[];
};

const experiment: Experiment = {
  nodes: [
    { nodeType: "start", nodeFamily: "core", id: "", props: {} },
    {
      nodeType: "experiment-step",
      nodeFamily: "study",
      id: "intro",
      props: {
        widgets: [
          {
            template: "rich_text",
            widgetFamily: "content",
            props: {
              content: "# Pensá en las últimas 24 horas",
            },
          },
          {
            template: "rich_text",
            widgetFamily: "content",
            props: {
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis metus non odio convallis tincidunt. Praesent tempor purus nisi, at sagittis magna facilisis at. Cras sed mi neque. Integer eros est, semper a mauris eget, convallis hendrerit nisi. Ut aliquam tellus sed fringilla imperdiet. ",
            },
          },
          {
            template: "button",
            widgetFamily: "layout",
            props: {
              text: "Siguiente",
              behaivor: "next_node",
            },
          },
        ],
      },
    },
    {
      nodeType: "path",
      nodeFamily: "control",
      id: "preguntas",
      props: {
        nodes: [
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "carnes",
            props: {
              widgets: [
                {
                  template: "checkbox",
                  widgetFamily: "response",
                  props: {
                    label: "¿Cuáles carnes consumiste?",
                    options: [
                      { label: "Pescado", value: "pescado" },
                      { label: "Carne roja", value: "carne-roja" },
                      { label: "Pollo", value: "pollo" },
                      { label: "Víceras", value: "viceras" },
                    ],
                    dataKey: "carnes-consumo",
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-eq",
                    value: 0,
                    conditionKey: "carnes-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        disabled: true,
                        text: "No consumí carnes",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
                {
                  template: "conditional",
                  widgetFamily: "control",
                  props: {
                    condition: "length-gt",
                    value: 0,
                    conditionKey: "carnes-consumo",
                    widget: {
                      template: "button",
                      widgetFamily: "layout",
                      props: {
                        text: "Siguiente",
                        behaivor: "next_node",
                      },
                    },
                  },
                },
              ],
            },
          },
        ],
      },
    },
    { nodeType: "finish", nodeFamily: "core", id: "", props: {} },
  ],
};

export default function Home() {
  // const full = useExperimentStore();
  const state = useExperimentStore((e) => e.state);
  const dispatch = useExperimentStore((e) => e.dispatch);
  const init = useExperimentStore((e) => e.init);
  const unsubTransient = useExperimentStore((e) => e.unsubTransient);

  useEffect(() => {
    init(experiment.nodes);
    dispatch({ type: "NEXT_NODE" });
    return () => {
      unsubTransient();
    };
  }, []);

  return (
    <div className="flex flex-col">
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
      <RenderState state={state} />
    </div>
  );
}
