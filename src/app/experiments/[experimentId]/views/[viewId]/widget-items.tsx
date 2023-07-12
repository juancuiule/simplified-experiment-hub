import {
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock,
  GitCommit,
  Icon,
  List,
  MoreHorizontal,
  Type,
} from "react-feather";

export type Item = {
  icon: Icon;
  title: string;
  description: string;
};

export const items: Record<string, Item[]> = {
  response: [
    {
      icon: GitCommit,
      title: "Slider",
      description:
        "Allows the user to select a value from a range of values by sliding a knob along a track.",
    },
    { icon: CheckSquare, title: "Checkbox", description: "" },
    {
      icon: Type,
      title: "Text Input",
      description:
        "Show a slider that the user can set to any value in the range",
    },
    {
      icon: Calendar,
      title: "Date Input",
      description:
        "Show a slider that the user can set to any value in the range",
    },
    {
      icon: Clock,
      title: "Time Input",
      description:
        "Show a slider that the user can set to any value in the range",
    },
    {
      icon: ChevronDown,
      title: "Dropdown",
      description:
        "Allows the user to select one option from a list of options in the form of a classic select.",
    },
    {
      icon: List,
      title: "Radio Buttons",
      description:
        "Allows the user to select one option from a list of options. Each option is represented by a circular button, and only one button can be selected at a time.",
    },
    {
      icon: List,
      title: "Checkbox Group",
      description:
        "Allows the user to select one or more options from a list of options. Each option is represented by a checkbox, and multiple checkboxes can be selected at the same time.",
    },
    {
      icon: MoreHorizontal,
      title: "Rating",
      description:
        "Allows the user to rate something on a scale of 1 to 5 or 1 to 10. The scale is represented by a series of circles with or without the numeric value.",
    },
  ],
};
