import RichText from "@/components/framework/widgets/content/RichText";
import Conditional from "@/components/framework/widgets/control/Conditional";
import Button from "@/components/framework/widgets/layout/Button";
import Checkbox from "@/components/framework/widgets/response/CheckboxWidget";
import MultipleCheck from "@/components/framework/widgets/response/MultipleCheck";
import Radio from "@/components/framework/widgets/response/RadioWidget";
import SingleCheckbox from "@/components/framework/widgets/response/SingleCheckboxWidget";
import Slider from "@/components/framework/widgets/response/SliderWidget";
import { FrameworkWidget } from "@/lib/widgets";
import Audio from "../widgets/content/Audio";
import Image from "../widgets/content/Image";
import Dropdown from "../widgets/response/DropdownWidget";
import Rating from "../widgets/response/RatingWidget";
import TextInput from "../widgets/response/TextInputWidget";

export default function RenderWidget(props: { widget: FrameworkWidget }) {
  const { widget } = props;
  switch (widget.template) {
    case "button": {
      return <Button widget={widget} />;
    }
    case "text_input": {
      return <TextInput widget={widget} />;
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
    case "dropdown": {
      return <Dropdown widget={widget} />;
    }
    case "image": {
      return <Image widget={widget} />;
    }
    default: {
      return <span>Algo</span>;
    }
  }
}
