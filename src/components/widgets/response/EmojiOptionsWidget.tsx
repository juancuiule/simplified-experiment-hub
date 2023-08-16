import { EmojiOptionsWidget } from "@/lib/widgets/response";

export default function EmojiOptions(props: { widget: EmojiOptionsWidget }) {
  return (
    <div className="flex flex-col gap-6">
      {props.widget.props.label !== "" ? (
        <div className="text-md">{props.widget.props.label}</div>
      ) : null}
      <div className="grid grid-cols-3 gap-6 w-full">
        {props.widget.props.options.map((option, i) => {
          return (
            <div
              key={i}
              className="col-span-1 flex flex-col items-center gap-2 cursor-pointer group border border-gray-400 hover:border-black aspect-square rounded-md shadow-lg justify-center transition-colors"
            >
              <div className="text-3xl">{option.emoji}</div>
              <div className="text-sm font-medium text-gray-400 group-hover:text-black transition-colors">
                {option.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
