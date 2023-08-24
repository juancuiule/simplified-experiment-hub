import Markdown from "@/components/Markdown";
import { ColorOptionsWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Check } from "react-feather";

export default function ColorOptions(props: { widget: ColorOptionsWidget }) {
  const { errors, touched, submitCount, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">
          <Markdown
            allowedElements={["strong", "em", "del", "p", "span"]}
            content={props.widget.props.label}
          />
        </div>
      ) : null}
      <div className="grid grid-cols-4 gap-6 w-full">
        {props.widget.props.options.map((option, i) => {
          return (
            <label
              key={option.value}
              htmlFor={option.value}
              className="col-span-1 flex flex-1 flex-col items-center gap-2 cursor-pointer group/label"
            >
              <input
                type="checkbox"
                name={props.widget.props.dataKey}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                className="peer w-0 h-0"
              />
              <div
                className={`w-8/12 border peer-focus:ring-1 peer-focus:ring-[var(--circle-color)] flex items-center group-hover/label:border-[var(--circle-color)] justify-center aspect-square rounded-full shadow-md transition-colors peer-checked:border-[var(--circle-color)] border-gray-400 group/circle`}
                style={{
                  // @ts-ignore
                  "--circle-color": option.color,
                }}
              >
                <div className="w-9/12 aspect-square rounded-full bg-[var(--circle-color)] flex justify-center items-center">
                  <Check className="text-white w-9/12 peer-checked:group-[]/circle:block hidden" />
                </div>
              </div>
              <div
                className={`text-xs group-hover:text-black text-gray-400 peer-checked:text-black peer-checked:font-medium`}
              >
                {option.label}
              </div>
            </label>
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
