import Markdown from "@/components/Markdown";
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
        <div className="text-md">
          <Markdown
            allowedElements={["strong", "em", "del", "p", "span"]}
            content={props.widget.props.label}
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-2 w-full">
        {props.widget.props.options.map((option, i) => {
          const isSelected = (
            (values[props.widget.props.dataKey] || []) as string[]
          ).includes(option.value);

          return (
            <div key={option.value} className="flex">
              <input
                type="checkbox"
                name={props.widget.props.dataKey}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                className="peer w-0"
              />
              <label
                htmlFor={option.value}
                className={`peer-focus:ring-1 flex-1 py-4 px-4 rounded-md border transition-colors cursor-pointer flex justify-between ${
                  isSelected
                    ? "bg-primary/40 border-primary text-primary"
                    : "hover:bg-primary/20 border-black"
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
