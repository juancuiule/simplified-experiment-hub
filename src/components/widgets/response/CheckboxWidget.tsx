import { CheckboxWidget } from "@/lib/widgets/response";

export default function Checkbox(props: { widget: CheckboxWidget }) {
  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="flex flex-col gap-2 w-full">
        {props.widget.props.options.map((option, i) => {
          return (
            <div key={i} className="py-4 px-4 rounded-md border border-black">
              {option.label}
            </div>
          );
        })}
      </div>
    </div>
  );
}
