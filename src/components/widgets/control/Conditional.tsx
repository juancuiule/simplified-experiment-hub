import RenderWidget from "@/components/RenderWidget";
import { useExperimentStore } from "@/lib/flow/state";
import { evaluateCondition, getValueByPath } from "@/lib/utils";
import { ConditionalWidget } from "@/lib/widgets/control";
import { useFormikContext } from "formik";

export default function Conditional(props: { widget: ConditionalWidget }) {
  const {
    condition,
    conditionKey,
    value: expectedValue,
    widget: innerWidget,
  } = props.widget.props;

  const data = useExperimentStore((state) => state.data);
  const { values } = useFormikContext();

  const realValue = conditionKey.startsWith("$$")
    ? getValueByPath(conditionKey.slice(2), data)
    : getValueByPath(conditionKey, values);

  const conditionIsMet = evaluateCondition(condition, realValue, expectedValue);

  if (!conditionIsMet) return null;

  return <RenderWidget widget={innerWidget} />;
}
