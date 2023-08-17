import { useExperimentStore } from "@/lib/flow/state";
import { ForEachWidget } from "@/lib/widgets/layout";
import { useFormikContext } from "formik";

// TODO: complete with proper logic
export default function ForEach(props: { widget: ForEachWidget }) {
  const {
    widget: innerWidget,
    loopValue,
    valueVariableName = "for_each_i",
    indexVariableName = "for_each_value",
  } = props.widget.props;

  const data = useExperimentStore((s) => s.data);
  const { values } = useFormikContext();

  return <div>ForEach widget</div>;
}
