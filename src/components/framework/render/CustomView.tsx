import { ComponentType } from "react";

const views: Record<string, ComponentType<{}>> = {};

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
