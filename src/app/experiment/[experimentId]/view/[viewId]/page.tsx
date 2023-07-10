import Card from "@/components/Card";
import {
  AlignLeft,
  Calendar,
  CheckSquare,
  ChevronDown,
  Clock,
  Film,
  GitCommit,
  GitMerge,
  Grid,
  Headphones,
  Image,
  List,
  MoreHorizontal,
  MousePointer,
  Repeat,
  Type,
} from "react-feather";

export default function Page({
  params,
}: {
  params: { experimentId: string; viewId: string };
}) {
  return (
    <div className="flex flex-row flex-1 w-full mx-auto h-screen gap-2.5 p-6">
      <div className="flex-1 h-full bg-gray-100 p-3 rounded-md">
        <h1>
          Experiment {params.experimentId} - View {params.viewId}
        </h1>
      </div>
      <div className="flex flex-col gap-2.5 max-h-full overflow-y-scroll pb-2.5">
        <h4 className="text-md font-semibold">Response</h4>
        <Card
          icon={<GitCommit size={16} />}
          title={"Slider"}
          description={
            "Allows the user to select a value from a range of values by sliding a knob along a track."
          }
        />
        <Card
          icon={<CheckSquare size={16} />}
          title={"Checkbox"}
          description={"A single checkbox with a label."}
        />
        <Card
          icon={<Type size={16} />}
          title={"Text Input"}
          description={
            "Show a slider that the user can set to any value in the range"
          }
        />
        <Card
          icon={<Calendar size={16} />}
          title={"Date Input"}
          description={
            "Show a slider that the user can set to any value in the range"
          }
        />
        <Card
          icon={<Clock size={16} />}
          title={"Time Input"}
          description={
            "Show a slider that the user can set to any value in the range"
          }
        />
        <Card
          icon={<ChevronDown size={16} />}
          title={"Dropdown"}
          description={
            "Allows the user to select one option from a list of options in the form of a classic select."
          }
        />
        <Card
          icon={<List size={16} />}
          title={"Radio Buttons"}
          description={
            "Allows the user to select one option from a list of options. Each option is represented by a circular button, and only one button can be selected at a time."
          }
        />
        <Card
          icon={<List size={16} />}
          title={"Checkbox Group"}
          description={
            "Allows the user to select one or more options from a list of options. Each option is represented by a checkbox, and multiple checkboxes can be selected at the same time."
          }
        />
        <Card
          icon={<MoreHorizontal size={16} />}
          title={"Rating"}
          description={
            "Allows the user to rate something on a scale of 1 to 5 or 1 to 10. The scale is represented by a series of circles with or without the numeric value."
          }
        />
        <h4 className="text-md font-semibold">Content</h4>
        <Card
          icon={<Image size={16} />}
          title={"Image"}
          description={"Display an image from an url."}
        />
        <Card
          icon={<AlignLeft size={16} />}
          title={"Rich Text"}
          description={
            "Text that includes formatting such as bold, italic, underline, and font size. Should be markdown-formatted."
          }
        />
        <Card
          icon={<Headphones size={16} />}
          title={"Audio"}
          description={
            "Allows the user to rate something on a scale of 1 to 5 or 1 to 10. The scale is represented by a series of circles with or without the numeric value."
          }
        />
        <Card icon={<></>} title={"Stepper"} description={"."} />
        <Card
          icon={<Film size={16} />}
          title={"Video"}
          description={
            "Allows the user to rate something on a scale of 1 to 5 or 1 to 10. The scale is represented by a series of circles with or without the numeric value."
          }
        />
        <h4 className="text-md font-semibold">Layout</h4>
        <Card
          icon={<MousePointer size={16} />}
          title={"Button"}
          description={"Classic button"}
        />
        <Card
          icon={<Grid size={16} />}
          title={"Group"}
          description={
            "Container element that allows you to group different components together. This can be useful for organizing the user interface."
          }
        />
        <h4 className="text-md font-semibold">Control</h4>
        <Card
          icon={<GitMerge size={16} />}
          title={"Conditional"}
          description={
            "Allows you to define if one component should be visible or not based on some condition."
          }
        />
        <Card
          icon={<Repeat size={16} />}
          title={"For Each"}
          description={
            "Allows you to repeat a component for each value in a list."
          }
        />
      </div>
    </div>
  );
}
