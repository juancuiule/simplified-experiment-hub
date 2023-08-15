import { BaseWidget } from ".";

export interface BaseLayoutWidget<U extends string, Props>
  extends BaseWidget<"layout", U> {
  props: Props;
}

type ButtonBaseConfig = {
  text?: string;
  disabled?: boolean;
  alignBottom?: boolean;
};

type ButtonNext = { behaivor: "next_node" };
type ButtonGoTo = { behaivor: "go_to"; nodeId: string };

type ButtonProps = ButtonBaseConfig & (ButtonNext | ButtonGoTo);

export interface ButtonWidget extends BaseLayoutWidget<"button", ButtonProps> {}

// TODO: complete
export interface ForEachWidget extends BaseLayoutWidget<"for_each", {}> {}

// TODO: complete
export interface GroupWidget extends BaseLayoutWidget<"group", {}> {}

export type LayoutWidget = ButtonWidget | ForEachWidget | GroupWidget;
