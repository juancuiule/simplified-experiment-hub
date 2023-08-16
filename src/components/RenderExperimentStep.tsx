"use client";
import { ExperimentStepNode } from "@/lib/nodes/study";
import RenderWidget from "./RenderWidget";
import { useExperimentStore } from "@/lib/flow/state";
import { flowCurrentStep, nodeSteps } from "@/lib/flow/utils";

function Stepper(props: {
  current: number;
  total: number;
  continuous?: boolean;
}) {
  const { current, total, continuous = false } = props;
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="text-sm text-[#507E8A] font-serif">
        {current}/{total}
      </div>
      <div className={`flex ${continuous ? "" : "gap-0.5"}`}>
        {Array.from({ length: total }).map((_, i) => {
          if (i <= current - 1) {
            return (
              <div
                key={`step-${i + 1}`}
                className="flex-1 h-1 bg-[#507E8A]"
              ></div>
            );
          } else {
            return (
              <div
                key={`step-${i + 1}`}
                className="flex-1 h-1 bg-gray-300"
              ></div>
            );
          }
        })}
      </div>
    </div>
  );
}

export function RenderExperimentStep(props: { node: ExperimentStepNode }) {
  const { node } = props;
  const {
    props: { widgets },
  } = node;

  const state = useExperimentStore((s) => s.state);

  return (
    <>
      {state.type === "in-path" ? (
        <Stepper
          current={flowCurrentStep(state)}
          total={nodeSteps(state.node)}
          continuous
        />
      ) : null}
      {widgets.map((widget, i) => {
        return <RenderWidget widget={widget} key={i} />;
      })}
    </>
  );
}
