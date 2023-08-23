import Markdown from "@/components/Markdown";
import { EmojiOptionsWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";

export default function EmojiOptions(props: { widget: EmojiOptionsWidget }) {
  const { errors, touched, submitCount, handleChange } =
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
      <div className="grid grid-cols-3 gap-6 w-full">
        {props.widget.props.options.map((option, i) => {
          return (
            <div key={option.value} className="flex flex-1 col-span-1">
              <input
                type="checkbox"
                name={props.widget.props.dataKey}
                id={option.value}
                value={option.value}
                onChange={handleChange}
                className="peer w-0 h-0"
              />
              <label
                htmlFor={option.value}
                className={`peer-focus:border-black flex flex-1 flex-col items-center gap-2 cursor-pointer group border hover:border-black aspect-square rounded-md shadow-lg justify-center transition-colors duration-100 peer-checked:bg-[#507E8A]/40 peer-checked:border-[#507E8A] border-gray-400`}
              >
                <div className="text-3xl">{option.emoji}</div>
                <div
                  className={`text-sm font-medium group-hover:text-black transition-colors peer-checked:group-[]:text-black text-gray-400`}
                >
                  {option.label}
                </div>
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
