"use client";
import {
  isConditionalWidget,
  isNotUndefined,
  isResponseWidget,
} from "@/lib/common";
import { useExperimentStore } from "@/lib/flow/state";
import { flowCurrentStep, nodeSteps } from "@/lib/flow/utils";
import { ExperimentStepNode } from "@/lib/nodes/study";
import {
  evaluateCondition,
  getInitialValuesForStep,
  getValueByPath,
  pick,
} from "@/lib/utils";
import { getStepSchema } from "@/lib/validation";
import { Formik } from "formik";
import RenderWidget from "./RenderWidget";

function Stepper(props: {
  current: number;
  total: number;
  type?: string;
  labelTemplate?: string;
}) {
  const {
    current,
    total,
    labelTemplate = "{n}/{t}",
    type = "continuous",
  } = props;
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="text-sm text-[#507E8A] font-serif">
        {labelTemplate
          .replace("{n}", current.toString())
          .replace("{t}", total.toString())}
      </div>
      <div className={`flex ${type === "continuous" ? "" : "gap-0.5"}`}>
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

  const isDebug = useExperimentStore((s) => Boolean(s.debugMode));
  const state = useExperimentStore((s) => s.state);
  const data = useExperimentStore((s) => s.data);
  const dispatch = useExperimentStore((s) => s.dispatch);

  const initialValues = getInitialValuesForStep(node);
  const validationSchema = getStepSchema(node);

  return (
    <div className="flex flex-col flex-1">
      {state.type === "in-path" && state.node.props.stepper ? (
        <Stepper
          current={flowCurrentStep(state)}
          total={nodeSteps(state.node)}
          type={state.node.props.stepperStyle || "continuous"}
          labelTemplate={state.node.props.stepperLabel}
        />
      ) : null}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          if (!isDebug) {
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
                    const realValue = conditionKey.startsWith("$$")
                      ? getValueByPath(conditionKey.slice(2), data)
                      : getValueByPath(conditionKey, values);

                    const isVisible = evaluateCondition(
                      condition,
                      realValue,
                      value
                    );

                    if (isVisible) {
                      return child.props.dataKey;
                    }
                  }
                }
                return undefined;
              })
              .filter(isNotUndefined);

            const dataToSubmit = pick(values)(keys);
            console.log(dataToSubmit);

            dispatch({ type: "SET_DATA", data: dataToSubmit });
            dispatch({ type: "NEXT_NODE" });
          } else {
            alert(JSON.stringify(values, null, 2));
          }
        }}
      >
        {({ handleSubmit, values }) => {
          return (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-6 flex-1"
            >
              {widgets.map((widget, i) => {
                return <RenderWidget widget={widget} key={i} />;
              })}
            </form>
          );
        }}
      </Formik>
    </div>
  );
}
