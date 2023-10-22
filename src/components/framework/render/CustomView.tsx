import dynamic from "next/dynamic";
import { ComponentType } from "react";

const FeedbackComer = dynamic(() => import("@/custom-views/FeedbackComer"));

const views: Record<string, ComponentType<{}>> = {
  "feedback-comer": FeedbackComer,
};

export default function CustomView(props: { slug: string }) {
  const View = views.hasOwnProperty(props.slug)
    ? views[props.slug]
    : () => <div>Not found</div>;

  return (
    <div className="flex flex-col flex-1">
      <View />
    </div>
  );
}
