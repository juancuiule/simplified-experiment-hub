import Markdown from "@/components/Markdown";
import { RatingWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";
import { twMerge } from "tailwind-merge";

export default function Rating(props: { widget: RatingWidget }) {
  const { errors, touched, submitCount, handleChange, handleBlur, values } =
    useFormikContext<Record<string, string | undefined>>();

  const { label, max, optionsLabel = [], dataKey } = props.widget.props;

  const options = Array.from({ length: max }, (_, i) => {
    return {
      value: i + 1,
      label: i + 1,
      description: optionsLabel.find((o) => parseInt(o.value) === i + 1)?.label,
    };
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1">
          {label !== "" ? (
            <label className="text-md font-medium" htmlFor={dataKey}>
              <Markdown
                allowedElements={["strong", "em", "del", "p", "span"]}
                content={label}
              />
            </label>
          ) : null}
          <div className="flex flex-row justify-between w-full gap-2 items-start">
            {options.map((option) => {
              return (
                <label
                  key={option.value}
                  htmlFor={`${dataKey}-${option.value}`}
                  className="flex justify-center items-center flex-col flex-1 group"
                >
                  <input
                    type="radio"
                    name={dataKey}
                    id={`${dataKey}-${option.value}`}
                    value={option.value}
                    onChange={handleChange}
                    className="peer opacity-0 w-0 h-0"
                  />
                  <div
                    className={twMerge(
                      "cursor-pointer peer-checked:border-primary peer-checked:text-primary peer-checked:font-bold border-gray-200 text-gray-400 w-9 flex justify-center items-center aspect-square rounded-full border-[3px]",
                      "group-hover:border-primary/60 peer-focus:ring-2 peer-focus:ring-offset-2 peer-focus:ring-primary transition-all duration-100"
                    )}
                  >
                    <span>{option.label}</span>
                  </div>
                  {option.description && (
                    <span className="text-xs text-center max-w-full leading-4">
                      {option.description}
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        </div>
      </div>
      {errors[dataKey] && (touched[dataKey] || submitCount > 0) ? (
        <div className={"text-error text-xs"}>{errors[dataKey] || ""}</div>
      ) : null}
    </div>
  );
}
