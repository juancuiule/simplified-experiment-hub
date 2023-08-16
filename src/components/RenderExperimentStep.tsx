"use client";
import { ExperimentStepNode } from "@/lib/nodes/study";
import RenderWidget from "./RenderWidget";
import { useExperimentStore } from "@/lib/flow/state";
import { flowCurrentStep, nodeSteps } from "@/lib/flow/utils";
import { Formik } from "formik";
import {
  isConditionalWidget,
  isNotUndefined,
  isResponseWidget,
} from "@/lib/common";
import { getInitialValuesForStep, pick } from "@/lib/utils";

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
  const data = useExperimentStore((s) => s.data);
  const dispatch = useExperimentStore((s) => s.dispatch);

  const initialValues = getInitialValuesForStep(node);

  return (
    <>
      {state.type === "in-path" ? (
        <Stepper
          current={flowCurrentStep(state)}
          total={nodeSteps(state.node)}
          continuous
        />
      ) : null}
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          window.scrollTo(0, 0);

          const keys = widgets
            .map((widget) => {
              if (isResponseWidget(widget)) {
                return widget.props.dataKey;
              }
              if (isConditionalWidget(widget)) {
                const {
                  condition,
                  conditionKey,
                  value,
                  widget: child,
                } = widget.props;
                if (isResponseWidget(child)) {
                  // const isVisible = evalCondition(
                  //   condition,
                  //   { ...data, ...values }[conditionKey],
                  //   value
                  // );
                  // if (isVisible) {
                  //   return child.props.dataKey;
                  // }
                }
              }
              return undefined;
            })
            .filter(isNotUndefined);

          const dataToSubmit = pick(values)(keys);
          console.log(dataToSubmit);

          dispatch({ type: "SET_DATA", data: dataToSubmit });
          dispatch({ type: "NEXT_NODE" });
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <>
              <form
                onSubmit={handleSubmit}
                className="h-full flex flex-col gap-6"
              >
                {widgets.map((widget, i) => {
                  return <RenderWidget widget={widget} key={i} />;
                })}
              </form>
              <pre>
                <code>{JSON.stringify(values, null, 2)}</code>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            </>
          );
        }}
      </Formik>
    </>
  );
}
