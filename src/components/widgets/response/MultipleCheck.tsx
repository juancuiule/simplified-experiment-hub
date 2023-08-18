import { MultipleCheckWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Check } from "react-feather";

export default function MultipleCheck(props: { widget: MultipleCheckWidget }) {
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
            <div key={i} className="flex">
              <input
                type="checkbox"
                name={props.widget.props.dataKey}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                className="w-0"
              />
              <label
                tabIndex={1}
                htmlFor={option.value}
                className={`flex-1 py-4 px-4 rounded-md border transition-colors cursor-pointer flex justify-between ${
                  isSelected
                    ? "bg-[#507E8A]/40 border-[#507E8A] text-[#507E8A] font-semibold"
                    : "hover:bg-[#507e8a]/20 border-black"
                }`}
              >
                <span>{option.label}</span>{" "}
                <span>{isSelected ? <Check /> : null}</span>
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
