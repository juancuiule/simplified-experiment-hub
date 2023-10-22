import Markdown from "@/components/Markdown";
import { RatingWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";

export default function Rating(props: { widget: RatingWidget }) {
  const { errors, touched, submitCount, handleChange } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  const { label, max, optionsLabel, dataKey } = props.widget.props;

  const options = Array.from({ length: max }, (_, i) => {
    return {
      value: `${i + 1}`,
      label: i + 1,
    };
  });

  return (
    <div className="flex flex-col gap-2">
      {label !== "" ? (
        <div className="text-md">
          <Markdown
            allowedElements={["strong", "em", "del", "p", "span"]}
            content={label}
          />
        </div>
      ) : null}
      <div className="flex flex-row justify-between w-full gap-2">
        {options.map((option) => {
          return (
            <label
              key={option.value}
              htmlFor={`${dataKey}-${option.value}`}
              className="flex justify-center items-center"
            >
              <input
                type="radio"
                name={dataKey}
                id={`${dataKey}-${option.value}`}
                value={option.value}
                onChange={handleChange}
                className="peer opacity-0 w-0 h-0"
              />
              <div className="cursor-pointer peer-checked:border-primary peer-checked:text-primary peer-checked:font-bold border-gray-400 text-gray-400 w-9 flex justify-center items-center aspect-square rounded-full border-[3px]">
                <span>{option.label}</span>
              </div>
            </label>
          );
        })}
      </div>
      {errors[dataKey] && (touched[dataKey] || submitCount > 0) ? (
        <div className={"text-error text-xs"}>{errors[dataKey] || ""}</div>
      ) : null}
    </div>
  );
}
