import { EmojiOptionsWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Fragment } from "react";

export default function EmojiOptions(props: { widget: EmojiOptionsWidget }) {
  const { values, errors, touched, submitCount, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();
  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="grid grid-cols-3 gap-6 w-full">
        {props.widget.props.options.map((option, i) => {
          const isSelected = (
            (values[props.widget.props.dataKey] || []) as string[]
          ).includes(option.value);

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
                className={`col-span-1 flex flex-col items-center gap-2 cursor-pointer group border border-gray-400 hover:border-black aspect-square rounded-md shadow-lg justify-center transition-colors ${
                  isSelected ? "bg-[#507E8A]/40 border-[#507E8A]" : ""
                }`}
              >
                <div className="text-3xl">{option.emoji}</div>
                <div
                  className={`text-sm font-medium group-hover:text-black transition-colors ${
                    isSelected ? "text-black" : "text-gray-400"
                  }`}
                >
                  {option.label}
                </div>
              </label>
            </Fragment>
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
