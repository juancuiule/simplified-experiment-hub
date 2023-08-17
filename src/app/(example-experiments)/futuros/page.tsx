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
      id: "home",
      props: {
        widgets: [
          {
            template: "rich_text",
            widgetFamily: "content",
            props: { content: "# Presentación" },
          },
          {
            template: "rich_text",
            widgetFamily: "content",
            props: {
              content:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus ullamcorper blandit congue. Nulla luctus feugiat dapibus. Donec interdum, magna ullamcorper semper facilisis, risus velit hendrerit sem, eget lobortis risus libero non odio. Aenean tincidunt pellentesque est congue fermentum. Sed in maximus diam, viverra fermentum tellus. Donec orci arcu, ornare id erat et, maximus ultrices velit. Duis sollicitudin sapien rhoncus, euismod sem id, volutpat urna. Quisque ornare rutrum ante ut iaculis.",
            },
          },
          {
            template: "button",
            widgetFamily: "layout",
            props: { text: "Siguiente", behaivor: "next_node" },
          },
        ],
      },
    },
    {
      nodeType: "path",
      nodeFamily: "control",
      id: "escenarios",
      props: {
        nodes: [
          {
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "carnes",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "## Imaginá el siguiente evento" },
                },
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: {
                    content:
                      "Maecenas in justo nec velit commodo dignissim et id purus. Fusce porta dolor nec nunc sagittis tincidunt eu non sapien. In eu tincidunt lectus. Integer non dolor magna. Suspendisse posuere id turpis in tempor.",
                  },
                },
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: {
                    content: "### ¿Qué opinas?",
                  },
                },
                {
                  template: "slider",
                  widgetFamily: "response",
                  props: {
                    label: "¿Cuán grande puede ser el impacto?",
                    dataKey: "impacto",
                    minLabel: "Nada",
                    maxLabel: "Mucho",
                    required: true,
                  },
                },
                {
                  template: "slider",
                  widgetFamily: "response",
                  props: {
                    label: "¿Cuán probable es que suceda?",
                    dataKey: "probable",
                    minLabel: "Nada",
                    maxLabel: "Mucho",
                    required: true,
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
            nodeType: "experiment-step",
            nodeFamily: "study",
            id: "feedbcak",
            props: {
              widgets: [
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: { content: "# ¡Gracias por participar!" },
                },
                {
                  template: "rich_text",
                  widgetFamily: "content",
                  props: {
                    content:
                      "Pellentesque accumsan placerat risus non convallis. Etiam suscipit dictum dictum. Quisque elementum massa nec porttitor cursus. Morbi vestibulum risus at egestas pretium. Nullam eget ullamcorper nulla. Ut et tellus ut magna lacinia finibus vitae ut enim.",
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

export default function Page() {
  const state = useExperimentStore((e) => e.state);
  const init = useExperimentStore((e) => e.init);
  const unsubTransient = useExperimentStore((e) => e.unsubTransient);

  useEffect(() => {
    init(experiment.nodes);
    return () => {
      unsubTransient();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col mx-auto gap-4 max-w-lg w-full p-6 border border-black min-h-screen">
        <nav className="text-[#507E8A] text-md font-serif text-center">
          Futuros
        </nav>
        <RenderState state={state} />
      </div>
      <div className="flex flex-col">
        <pre>
          <code>{JSON.stringify(state, null, 2)}</code>
        </pre>
      </div>
    </>
  );
}
