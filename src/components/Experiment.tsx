"use client";
import { Experiment } from "@/api";
import RenderState from "@/components/framework/render/RenderState";
import { useExperimentStore } from "@/lib/flow/state";
import { useEffect } from "react";

export default function Experiment(props: {
  experiment: Experiment;
  id: string;
}) {
  const { experiment, id } = props;
  const { nodes, views } = experiment;
  const state = useExperimentStore((e) => e.state);
  const init = useExperimentStore((e) => e.init);
  const unsubTransient = useExperimentStore((e) => e.unsubTransient);
  const reset = useExperimentStore((e) => e.reset);

  useEffect(() => {
    init({ nodes, views, id });
    return () => {
      unsubTransient();
      reset();
    };
  }, [init, unsubTransient]);

  return (
    <>
      <RenderState state={state} views={views} />
    </>
  );
}
