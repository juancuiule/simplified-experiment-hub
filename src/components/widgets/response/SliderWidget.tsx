import { SliderWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { memo } from "react";

export default memo(Slider);

function useField(field: string) {
  const { values, errors, touched, submitCount, handleChange, setFieldValue } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return {
    value: values[field],
    error: errors[field],
    touched: touched[field],
    submitCount,
    handleChange,
    setFieldValue,
  };
}

export function Slider(props: { widget: SliderWidget }) {
  const {
    max = 100,
    min = 0,
    minLabel = min.toString(),
    maxLabel = max.toString(),
    defaultValue = (max - min) / 2,
    step = 1,
    dataKey,
  } = props.widget.props;

  const { value, setFieldValue, error, touched, submitCount } =
    useField(dataKey);

  console.log({ [dataKey]: value });

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
          step={step}
          value={(value as number) || defaultValue}
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
      {error && (touched || submitCount > 0) ? (
        <div className={"text-error text-xs"}>{error || ""}</div>
      ) : null}
    </div>
  );
}
