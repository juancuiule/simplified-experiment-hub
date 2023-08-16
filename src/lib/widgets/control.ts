import { BaseWidget, FrameworkWidget } from ".";
import { ConditionConfig } from "../common";

export interface BaseControlWidget<U extends string, Props>
  extends BaseWidget<"control", U> {
  props: Props;
}

export interface ConditionalWidget
  extends BaseControlWidget<
    "conditional",
    ConditionConfig & {
      widget: FrameworkWidget;
    }
  > {}

export type ControlWidget = ConditionalWidget;
