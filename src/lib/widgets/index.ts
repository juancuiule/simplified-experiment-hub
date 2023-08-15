import { ContentWidget } from "./content";
import { ControlWidget } from "./control";
import { LayoutWidget } from "./layout";
import { ResponseWidget } from "./response";

type WidgetFamily = "layout" | "content" | "response" | "control";

export interface BaseWidget<T extends WidgetFamily, U extends string> {
  widgetFamily: T;
  template: U;
}

export type Widget =
  | ControlWidget
  | ContentWidget
  | ResponseWidget
  | LayoutWidget;