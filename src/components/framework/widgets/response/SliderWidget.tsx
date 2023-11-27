import Markdown from "@/components/Markdown";
import { SliderWidget } from "@/lib/widgets/response";
import { useFormikContext } from "formik";

import * as RadixSlider from "@radix-ui/react-slider";

export default function Slider(props: { widget: SliderWidget }) {
  const {
    max = 100,
    min = 0,
    minLabel = min.toString(),
    maxLabel = max.toString(),
    defaultValue = Math.round((max - min) / 2 + min),
    step = 1,
    dataKey,
  } = props.widget.props;

  const { values, errors, touched, submitCount, setFieldValue } =
    useFormikContext<
      Record<string, string | boolean | number | string[] | undefined>
    >();

  return (
    <div className="flex flex-col gap-4">
      {props.widget.props.label !== "" ? (
        <div className="text-md">
          <Markdown
            allowedElements={["strong", "em", "del", "p", "span"]}
            content={props.widget.props.label}
          />
        </div>
      ) : null}
      <div className="flex flex-col gap-3">
        <div className="flex w-full">
          <RadixSlider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            defaultValue={[defaultValue]}
            max={max}
            min={min}
            step={step}
            id={dataKey}
            value={[values[dataKey] as number]}
            onValueChange={(value) => {
              setFieldValue(dataKey, value[0]);
            }}
          >
            <div className="w-3 h-3 -z-10 rounded-full bg-gray-200 absolute left-0"></div>
            <RadixSlider.Track className="bg-gray-200 relative grow rounded-full h-1.5 focus:ring-0">
              <RadixSlider.Range className="absolute bg-gray-200 rounded-full h-full" />
            </RadixSlider.Track>
            <RadixSlider.Thumb className="w-8 h-8 bg-white border-4 border-primary rounded-full flex justify-center items-center focus:shadow-[0_0_10px] focus:shadow-primary focus:outline-none">
              <div className="w-2 h-2 rounded-full bg-gray-200"></div>
            </RadixSlider.Thumb>
            <div className="w-3 h-3 -z-10 rounded-full bg-gray-200 absolute right-0"></div>
          </RadixSlider.Root>
        </div>
        <div className="flex justify-between uppercase text-xs font-semibold text-gray-400 select-none">
          <span>{minLabel}</span>
          <span>{maxLabel}</span>
        </div>
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

// export default function Slider(props: { widget: SliderWidget }) {
//   const {
//     max = 100,
//     min = 0,
//     minLabel = min.toString(),
//     maxLabel = max.toString(),
//     defaultValue = (max - min) / 2,
//     step = 1,
//     dataKey,
//   } = props.widget.props;

//   const { values, errors, touched, submitCount, setFieldValue } =
//     useFormikContext<
//       Record<string, string | boolean | number | string[] | undefined>
//     >();

//   return (
//     <div className="flex flex-col gap-6">
//       {props.widget.props.label !== "" ? (
//         <div className="text-md">
//           <Markdown
//             allowedElements={["strong", "em", "del", "p", "span"]}
//             content={props.widget.props.label}
//           />
//         </div>
//       ) : null}
//       <div className="flex flex-col gap-2 w-full">
//         <input
//           type="range"
//           max={max}
//           min={min}
//           defaultValue={defaultValue}
//           step={step}
//           value={values[dataKey] as number}
//           onChange={(e) => {
//             const value = e.target.valueAsNumber;
//             setFieldValue(dataKey, value);
//           }}
//         />
//         <div className="flex justify-between">
//           <span>{minLabel}</span>
//           <span>{maxLabel}</span>
//         </div>
//       </div>
//       {errors[props.widget.props.dataKey] &&
//       (touched[props.widget.props.dataKey] || submitCount > 0) ? (
//         <div className={"text-error text-xs"}>
//           {errors[props.widget.props.dataKey] || ""}
//         </div>
//       ) : null}
//     </div>
//   );
// }
