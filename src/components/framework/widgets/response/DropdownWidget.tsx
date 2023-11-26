import { DropdownWidget } from "@/lib/widgets/response";

import Markdown from "@/components/Markdown";
import { useFormikContext } from "formik";

export default function Dropdown(props: { widget: DropdownWidget }) {
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
          <select
            className={`border rounded-md h-10 px-2 outline-info flex ${
              submitCount > 0 && errors[dataKey] && touched[dataKey]
                ? "border-error"
                : ""
            }`}
            name={dataKey}
            id={dataKey}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values[dataKey]}
          >
            <option value={""} disabled defaultChecked>
              Elegí una opción
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      {errors[dataKey] && (touched[dataKey] || submitCount > 0) ? (
        <div className={"text-error text-xs"}>{errors[dataKey] || ""}</div>
      ) : null}
    </div>
  );
}
