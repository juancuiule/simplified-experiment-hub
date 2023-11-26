import Markdown from "@/components/Markdown";
import { RadioWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";

export default function Radio(props: { widget: RadioWidget }) {
  const { label, options, dataKey } = props.widget.props;

  const { values, errors, touched, submitCount, handleChange, handleBlur } =
    useFormikContext<Record<string, string | undefined>>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col gap-1">
          <label className="text-md font-medium" htmlFor={dataKey}>
            <Markdown
              allowedElements={["strong", "em", "del", "p", "span"]}
              content={label}
            />
          </label>
          <div className="flex flex-col gap-1">
            {options.map((option) => {
              return (
                <label
                  key={option.value}
                  htmlFor={`${dataKey}-${option.value}`}
                  className="flex gap-2 items-center flex-1"
                >
                  <input
                    type="radio"
                    name={dataKey}
                    id={`${dataKey}-${option.value}`}
                    value={option.value}
                    onChange={handleChange}
                    className="peer opacity-0 w-0 -ml-3"
                    checked={values[dataKey] === option.value}
                  />
                  <div className="w-5 h-5 peer-focus:ring-2 flex justify-center items-center aspect-square border border-gray-400 rounded-full group/circle">
                    <div className="w-10/12 aspect-square rounded-full peer-checked:group-[]/circle:bg-primary bg-transparent transition-colors"></div>
                  </div>
                  <span>{option.label}</span>
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
