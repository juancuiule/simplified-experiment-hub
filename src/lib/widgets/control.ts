import { BaseWidget } from ".";
import { ResponseWidget } from "./response";

export interface BaseControlWidget<U extends string, Props>
  extends BaseWidget<"control", U> {
  props: Props;
}

export type SimpleCondition = "lt" | "gt" | "lte" | "gte" | "eq" | "neq";
export type BranchCondition =
  | SimpleCondition
  | "includes"
  | `length-${SimpleCondition}`;

export interface ConditionalWidget
  extends BaseControlWidget<
    "conditional",
    {
      condition: BranchCondition;
      valueKey: string;
      expectedValue: string | boolean | number;
      widget: ResponseWidget;
    }
  > {}

export type ControlWidget = ConditionalWidget;