import { SliderWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";

export default function Slider(props: { widget: SliderWidget }) {
  const {
    max = 100,
    min = 0,
    minLabel = min.toString(),
    maxLabel = max.toString(),
    defaultValue = (max - min) / 2,
    step = 1,
    dataKey,
  } = props.widget.props;

  const { values, errors, touched, submitCount, setFieldValue } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="flex flex-col gap-2 w-full">
        <input
          type="range"
          max={max}
          min={min}
          defaultValue={defaultValue}
          step={step}
          value={values[dataKey] as number}
          onChange={(e) => {
            const value = e.target.valueAsNumber;
            setFieldValue(dataKey, value);
          }}
        />
        <div className="flex justify-between">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
      </div>
      {errors[props.widget.props.dataKey] &&
      (touched[props.widget.props.dataKey] || submitCount > 0) ? (
        <div className={"text-error text-xs"}>
          {errors[props.widget.props.dataKey] || ""}
        </div>
      ) : null}
    </div>
  );
}
