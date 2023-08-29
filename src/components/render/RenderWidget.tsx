import RichText from "@/components/widgets/content/RichText";
import Conditional from "@/components/widgets/control/Conditional";
import Button from "@/components/widgets/layout/Button";
import Checkbox from "@/components/widgets/response/CheckboxWidget";
import ColorOptions from "@/components/widgets/response/ColorOptionsWidget";
import EmojiOptions from "@/components/widgets/response/EmojiOptionsWidget";
import MultipleCheck from "@/components/widgets/response/MultipleCheck";
import Radio from "@/components/widgets/response/RadioWidget";
import SingleCheckbox from "@/components/widgets/response/SingleCheckboxWidget";
import Slider from "@/components/widgets/response/SliderWidget";
import { FrameworkWidget } from "@/lib/widgets";
import Audio from "../widgets/content/Audio";
import Rating from "../widgets/response/RatingWidget";

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
      return <Conditional widget={widget} />;
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
    case "slider": {
      return <Slider widget={widget} />;
    }
    case "multiple-check": {
      return <MultipleCheck widget={widget} />;
    }
    case "single_checkbox": {
      return <SingleCheckbox widget={widget} />;
    }
    case "rating": {
      return <Rating widget={widget} />;
    }
    case "audio": {
      return <Audio widget={widget} />;
    }
    default: {
      return <span>{widget.template}</span>;
    }
  }
}
