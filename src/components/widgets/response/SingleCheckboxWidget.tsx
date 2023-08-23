import { SingleCheckboxWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Check } from "react-feather";

export default function SingleCheckbox(props: {
  widget: SingleCheckboxWidget;
}) {
  const { values, errors, touched, setFieldValue, submitCount, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  const isSelected = Boolean(values[props.widget.props.dataKey]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          name={props.widget.props.dataKey}
          id={props.widget.props.dataKey}
          defaultChecked={props.widget.props.defaultValue}
          checked={isSelected}
          onChange={(e) => {
            const checked = e.target.checked;
            setFieldValue(props.widget.props.dataKey, checked);
          }}
          className="hidden"
        />
        <label
          htmlFor={props.widget.props.dataKey}
          tabIndex={1}
          className="h-4 rounded-sm aspect-square border border-gray-400 flex p-0.5 justify-center items-center"
        >
          <div
            className={`w-full rounded-sm h-full bg-[#507E8A] ${
              isSelected ? "opacity-100" : "opacity-0"
            } transition-opacity duration-100`}
          >
            <Check className="text-white w-full h-full scale-75" />
          </div>
        </label>
        <label
          tabIndex={1}
          htmlFor={props.widget.props.dataKey}
          className={`text-sm flex-1`}
        >
          {props.widget.props.label}
        </label>
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
