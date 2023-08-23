import { FrameworkWidget } from "@/lib/widgets";
import {
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock,
  GitCommit,
  Grid,
  Headphones,
  Icon,
  Image,
  List,
  MoreHorizontal,
  MousePointer,
  Type,
} from "react-feather";

export type Item = {
  icon: Icon;
  title: string;
  description: string;
  template: FrameworkWidget["template"];
};

export const items: Record<string, Item[]> = {
  response: [
    {
      icon: GitCommit,
      title: "Slider",
      template: "slider",
      description:
        "Allows the user to select a value from a range of values by sliding a knob along a track.",
    },
    {
      icon: CheckSquare,
      title: "Checkbox",
      description: "",
      template: "single_checkbox",
    },
    {
      icon: Type,
      title: "Text Input",
      template: "text_input",
      description:
        "Show a slider that the user can set to any value in the range",
    },
    {
      icon: Calendar,
      title: "Date Input",
      template: "date_input",
      description:
        "Show a slider that the user can set to any value in the range",
    },
    {
      icon: Clock,
      title: "Time Input",
      template: "time_input",
      description:
        "Show a slider that the user can set to any value in the range",
    },
    {
      icon: ChevronDown,
      title: "Dropdown",
      template: "dropdown",
      description:
        "Allows the user to select one option from a list of options in the form of a classic select.",
    },
    {
      icon: List,
      title: "Radio Buttons",
      template: "radio",
      description:
        "Allows the user to select one option from a list of options. Each option is represented by a circular button, and only one button can be selected at a time.",
    },
    {
      icon: List,
      title: "Checkbox Group",
      template: "checkbox",
      description:
        "Allows the user to select one or more options from a list of options. Each option is represented by a checkbox, and multiple checkboxes can be selected at the same time.",
    },
    {
      icon: MoreHorizontal,
      title: "Rating",
      template: "rating",
      description:
        "Allows the user to rate something on a scale of 1 to 5 or 1 to 10. The scale is represented by a series of circles with or without the numeric value.",
    },
  ],
  layout: [
    {
      icon: MousePointer,
      title: "Button",
      template: "button",
      description:
        "A button to go to the next node in the flow or go to a specific node",
    },
    {
      icon: Grid,
      title: "Group",
      template: "group",
      description:
        "Container element that allows you to group different components together. This can be useful for organizing the user interface.",
    },
  ],
  content: [
    {
      icon: Image,
      title: "Image",
      template: "image",
      description: "An image that can be uploaded or selected from a URL.",
    },
    {
      icon: AlignLeft,
      title: "Rich Text",
      template: "rich_text",
      description:
        "A rich text editor that allows you to format text with bold, italic, underline, strikethrough, and more.",
    },
    {
      icon: Headphones,
      title: "Audio",
      template: "audio",
      description: "An audio player that allows you to play audio files.",
    },
  ],
};
