import { RadioWidget } from "@/lib/widgets/response";

export default function Radio(props: { widget: RadioWidget }) {
  return (
    <div className="flex flex-col gap-2">
      {props.widget.props.options.map((option, index) => {
        return (
          <div key={option.value} className="flex gap-2">
            <input
              type="radio"
              key={index}
              name={props.widget.props.dataKey}
              value={option.value}
              id={`${props.widget.props.dataKey}-${option.value}`}
            />
            <label htmlFor={`${props.widget.props.dataKey}-${option.value}`}>
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
}
