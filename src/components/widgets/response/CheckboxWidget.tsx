import Markdown from "@/components/Markdown";
import { CheckboxWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { Check } from "react-feather";

export default function Checkbox(props: { widget: CheckboxWidget }) {
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
      <div className="flex flex-col gap-2 w-full">
        {props.widget.props.options.map((option, i) => {
          return (
            <label
              htmlFor={option.value}
              className="flex gap-2"
              key={option.value}
            >
              <input
                type="checkbox"
                name={props.widget.props.dataKey}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                className="peer w-0 -ml-3"
              />
              <div className="peer-focus:ring-2 h-6 rounded-md aspect-square border border-gray-400 flex p-0.5 justify-center items-center bg-white peer-checked:bg-[#507E8A] peer-checked:border-[#507E8A] transition-colors">
                <Check className="text-white w-full h-full scale-75 " />
              </div>
              <span className="text-md flex-1">{option.label}</span>
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
