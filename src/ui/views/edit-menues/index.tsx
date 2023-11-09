import { FrameworkWidget } from "@/lib/widgets";
import { ArrowDown, ArrowUp, X } from "react-feather";
import SliderWidgetMenu from "./SliderWidgetMenu";
import React from "react";
import RichTextWidgetMenu from "./RichTextMenu";
import { ButtonWidget } from "@/lib/widgets/layout";
import { Formik } from "formik";
import CheckboxMenu from "./CheckboxWidgetMenu";
import RadioWidgetMenu from "./RadioWidgetMenu";

type MenuProps = {
  widget: FrameworkWidget;
  updateWidget: (widget: FrameworkWidget) => void;
  moveUp: () => void;
  moveDown: () => void;
  remove: () => void;
  icon: React.ReactNode;
};

const titles: Partial<Record<FrameworkWidget["template"], string>> = {
  checkbox: "Checkbox",
  slider: "Slider",
  image: "Image",
  rich_text: "Rich Text",
  audio: "Audio",
  video: "Video",
  button: "Button",
  radio: "Radio",
};

function ButtonWidgetMenu(props: { update: (widget: ButtonWidget) => void }) {
  return (
    <Formik
      initialValues={{
        label: "",
      }}
      onSubmit={(values) => {
        props.update({
          template: "button",
          widgetFamily: "layout",
          props: {
            text: values.label,
            behaivor: "next_node",
          },
        });
      }}
    >
      {({ handleSubmit, handleChange }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label>Label</label>
              <textarea
                onChange={handleChange}
                name="label"
                className="border border-black rounded-md"
              />
            </div>
            <button type="submit">submit</button>
          </form>
        );
      }}
    </Formik>
  );
}
const menues = {
  slider: SliderWidgetMenu,
  rich_text: RichTextWidgetMenu,
  button: ButtonWidgetMenu,
  checkbox: CheckboxMenu,
  radio: RadioWidgetMenu,
};

export default function WidgetMenu(props: MenuProps) {
  const { widget, icon } = props;

  const Menu =
    menues[widget.template as keyof typeof menues] ||
    (() => {
      return <div></div>;
    });

  return (
    <div className="flex flex-col w-full gap-2 px-4 py-3 pb-4 bg-gray-300 rounded-md transition-colors">
      <div className="flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-1.5">
          {icon}{" "}
          <span className="text-sm font-semibold">
            {titles[widget.template]}
          </span>
        </div>
        <div className="flex flex-row gap-1">
          <button
            onClick={props.moveUp}
            className="hover:bg-gray-400 transition-colors rounded-full aspect-square p-1"
          >
            <ArrowUp size={16} />
          </button>
          <button
            onClick={props.moveDown}
            className="hover:bg-gray-400 transition-colors rounded-full aspect-square p-1"
          >
            <ArrowDown size={16} />
          </button>
          <button
            onClick={props.remove}
            className="hover:bg-gray-400 transition-colors rounded-full aspect-square p-1"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="w-full bg-gray-200 p-1 rounded-sm">
        {menues[widget.template as keyof typeof menues] !== undefined ? (
          <Menu update={props.updateWidget} />
        ) : null}
      </div>
      {/* <div>{widget.id}</div> */}
    </div>
  );
}
