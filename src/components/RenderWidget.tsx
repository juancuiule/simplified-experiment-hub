import { FrameworkWidget } from "@/lib/widgets";
import RichText from "./widgets/content/RichText";
import Button from "./widgets/layout/Button";
import Checkbox from "./widgets/response/CheckboxWidget";
import ColorOptions from "./widgets/response/ColorOptionsWidget";
import EmojiOptions from "./widgets/response/EmojiOptionsWidget";
import Radio from "./widgets/response/RadioWidget";

export default function RenderWidget(props: { widget: FrameworkWidget }) {
  const { widget } = props;
  switch (widget.template) {
    case "button": {
      return <Button widget={widget} />;
    }
    case "rich_text": {
      return <RichText widget={widget} />;
    }
    case "checkbox": {
      return <Checkbox widget={widget} />;
    }
    case "conditional": {
      const { condition, conditionKey, widget: innerWidget } = widget.props;

      return <RenderWidget widget={innerWidget} />;
    }
    case "radio": {
      return <Radio widget={widget} />;
    }
    case "color-options": {
      return <ColorOptions widget={widget} />;
    }
    case "emoji-options": {
      return <EmojiOptions widget={widget} />;
    }
    default: {
      return <span>{widget.template}</span>;
    }
  }
}
