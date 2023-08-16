import { RadioWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";

export default function Radio(props: { widget: RadioWidget }) {
  const { values, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return (
    <div className="flex flex-col gap-2">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="flex flex-col gap-2 w-full">
        {props.widget.props.options.map((option, index) => {
          return (
            <div key={option.value} className="flex gap-2">
              <input
                type="radio"
                key={index}
                name={props.widget.props.dataKey}
                id={`${props.widget.props.dataKey}-${option.value}`}
                value={option.value}
                onChange={handleChange}
              />
              <label htmlFor={`${props.widget.props.dataKey}-${option.value}`}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}
