import { FrameworkWidget } from "@/lib/widgets";
import {
  AlignLeft,
  CheckSquare,
  ChevronDown,
  GitCommit,
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
  content: [
    {
      icon: AlignLeft,
      title: "Rich Text",
      template: "rich_text",
      description:
        "A rich text editor that allows you to format text with bold, italic, underline, strikethrough, and more.",
    },
    {
      icon: Image,
      title: "Image",
      template: "image",
      description: "An image that can be uploaded or selected from a URL.",
    },
    // {
    //   icon: Headphones,
    //   title: "Audio",
    //   template: "audio",
    //   description: "An audio player that allows you to play audio files.",
    // },
    // {
    //   icon: Video,
    //   title: "Video",
    //   template: "video",
    //   description: "A video player that allows you to play video files.",
    // },
  ],
  layout: [
    {
      icon: MousePointer,
      title: "Button",
      template: "button",
      description:
        "A button to go to the next node in the flow or go to a specific node",
    },
    // {
    //   icon: Grid,
    //   title: "Group",
    //   template: "group",
    //   description:
    //     "Container element that allows you to group different components together. This can be useful for organizing the user interface.",
    // },
  ],
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
      title: "Single Checkbox",
      description: "A single checkbox with a label",
      template: "single_checkbox",
    },
    {
      icon: Type,
      title: "Text Input",
      template: "text_input",
      description:
        "A classic text input that allows the user to enter a single line of text.",
    },
    // {
    //   icon: Calendar,
    //   title: "Date Input",
    //   template: "date_input",
    //   description:
    //     "A date input that allows the user to select a date from a calendar.",
    // },
    // {
    //   icon: Clock,
    //   title: "Time Input",
    //   template: "time_input",
    //   description:
    //     "A time input that allows the user to select a time from a clock.",
    // },
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
        "Allows the user to rate something on a scale of 1 to 3, 1 to 5 or 1 to 7. The scale is represented by a series of circles with a numeric value and an optional label.",
    },
  ],

  control: [
    // {
    //   icon: GitMerge,
    //   title: "Conditional",
    //   template: "conditional",
    //   description:
    //     "Allows you to define if one component should be visible or not based on some condition.",
    // },
    // {
    //   icon: Repeat,
    //   title: "For Each",
    //   template: "for_each",
    //   description: "Allows you to repeat a component for each item in a list.",
    // },
  ],
};
