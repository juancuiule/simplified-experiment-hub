import { CheckboxWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Check } from "react-feather";

export default function Checkbox(props: { widget: CheckboxWidget }) {
  const { values, errors, touched, submitCount, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="flex flex-col gap-2 w-full">
        {props.widget.props.options.map((option, i) => {
          const isSelected = (
            (values[props.widget.props.dataKey] || []) as string[]
          ).includes(option.value);

          return (
            <div key={i} className="flex gap-3 items-center">
              <input
                type="checkbox"
                name={props.widget.props.dataKey}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor={option.value}
                tabIndex={1}
                className="h-6 rounded-md aspect-square border border-gray-400 flex p-0.5 justify-center items-center"
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
                htmlFor={option.value}
                className={`text-md flex-1`}
              >
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
