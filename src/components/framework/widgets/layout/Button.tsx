import { useExperimentStore } from "@/lib/flow/state";
import { ButtonWidget } from "@/lib/widgets/layout";

export default function Button(props: { widget: ButtonWidget }) {
  const dispatch = useExperimentStore((s) => s.dispatch);

  return (
    <button
      className="px-6 py-2 border border-black rounded-full w-fit mx-auto hover:bg-black hover:text-white transition-colors mt-auto"
      type="submit"
      // onClick={() => {
      //   dispatch({ type: "NEXT_NODE" });
      // }}
    >
      {props.widget.props.text}
    </button>
  );
}
