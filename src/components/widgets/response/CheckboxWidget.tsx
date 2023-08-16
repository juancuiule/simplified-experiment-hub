import { CheckboxWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Fragment } from "react";

export default function Checkbox(props: { widget: CheckboxWidget }) {
  const { values, handleChange } =
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
          return (
            <Fragment key={i}>
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
                className={`py-4 px-4 rounded-md border border-black transition-colors cursor-pointer ${
                  (
                    (values[props.widget.props.dataKey] || []) as string[]
                  ).includes(option.value)
                    ? "bg-[#507E8A]/40 border-[#507E8A]"
                    : "hover:bg-[#507e8a]/20 "
                }`}
              >
                {option.label}
              </label>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
