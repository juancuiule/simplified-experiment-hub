"use client";
import RenderState from "@/components/framework/render/RenderState";
import { FrameworkExperiment } from "@/lib";
import { useExperimentStore } from "@/lib/flow/state";
import { useEffect } from "react";

export default function Experiment(props: { experiment: FrameworkExperiment }) {
  const {
    experiment: { nodes, views },
  } = props;
  const state = useExperimentStore((e) => e.state);
  const init = useExperimentStore((e) => e.init);
  const unsubTransient = useExperimentStore((e) => e.unsubTransient);
  const reset = useExperimentStore((e) => e.reset);

  useEffect(() => {
    init(nodes);
    return () => {
      unsubTransient();
      reset();
    };
  }, [init, unsubTransient]);

  return <RenderState state={state} views={views} />;
}
