import Markdown from "@/components/Markdown";
import { RadioWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";

export default function Radio(props: { widget: RadioWidget }) {
  const { errors, touched, submitCount, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return (
    <div className="flex flex-col gap-2">
      {props.widget.props.label !== "" ? (
        <div className="text-md">
          <Markdown
            allowedElements={["strong", "em", "del", "p", "span"]}
            content={props.widget.props.label}
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-2 w-full">
        {props.widget.props.options.map((option) => {
          return (
            <label
              key={option.value}
              htmlFor={`${props.widget.props.dataKey}-${option.value}`}
              className="flex gap-2 items-center flex-1"
            >
              <input
                type="radio"
                name={props.widget.props.dataKey}
                id={`${props.widget.props.dataKey}-${option.value}`}
                value={option.value}
                onChange={handleChange}
                className="peer opacity-0 w-0 -ml-3"
              />
              <div className="w-5 h-5 peer-focus:ring-2 flex justify-center items-center aspect-square border border-gray-400 rounded-full group/circle">
                <div className="w-10/12 aspect-square rounded-full peer-checked:group-[]/circle:bg-[#507E8A] bg-transparent transition-colors"></div>
              </div>
              <span>{option.label}</span>
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
