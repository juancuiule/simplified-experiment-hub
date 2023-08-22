import { RadioWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Check } from "react-feather";

export default function Radio(props: { widget: RadioWidget }) {
  const { values, errors, touched, submitCount, handleChange } =
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
          const isSelected =
            option.value === values[props.widget.props.dataKey];
          return (
            <div key={option.value} className="flex gap-3 items-center">
              <input
                type="radio"
                key={index}
                name={props.widget.props.dataKey}
                id={`${props.widget.props.dataKey}-${option.value}`}
                value={option.value}
                onChange={handleChange}
                className="opacity-0 w-0 -ml-3"
              />
              <label
                htmlFor={`${props.widget.props.dataKey}-${option.value}`}
                className="w-5 h-5 aspect-square p-0.5 border border-gray-400 rounded-full"
              >
                <div
                  className={`w-full rounded-full h-full bg-[#507E8A] ${
                    isSelected ? "opacity-100" : "opacity-0"
                  } transition-opacity duration-100`}
                ></div>
              </label>
              <label htmlFor={`${props.widget.props.dataKey}-${option.value}`}>
                {option.label}
              </label>
            </div>
          );
        })}
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
