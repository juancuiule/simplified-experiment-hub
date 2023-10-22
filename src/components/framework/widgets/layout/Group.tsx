import RenderWidget from "@/components/framework/render/RenderWidget";
import { GroupWidget } from "@/lib/widgets/layout";

export default function Group(props: { widget: GroupWidget }) {
  return (
    <div id={props.widget.props.name}>
      {props.widget.props.widgets.map((widget, i) => {
        return <RenderWidget widget={widget} key={i} />;
      })}
    </div>
  );
}
