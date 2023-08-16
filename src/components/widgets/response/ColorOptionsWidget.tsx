import { ColorOptionsWidget } from "@/lib/widgets/response";

export default function ColorOptions(props: { widget: ColorOptionsWidget }) {
  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="grid grid-cols-4 gap-6 w-full">
        {props.widget.props.options.map((option, i) => {
          return (
            <div
              key={i}
              className="col-span-1 flex flex-col items-center gap-2 cursor-pointer group"
            >
              <div
                className={`w-8/12 border border-gray-400 flex items-center justify-center aspect-square rounded-full shadow-md`}
                style={{
                  // @ts-ignore
                  "--background": option.color,
                }}
              >
                <div
                  className="w-9/12 aspect-square rounded-full"
                  style={{ background: "var(--background)" }}
                ></div>
              </div>
              <div className="text-xs text-gray-400 group-hover:text-black">
                {option.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
