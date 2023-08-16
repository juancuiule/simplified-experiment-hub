import { FrameworkWidget } from "./widgets";
import { ConditionalWidget } from "./widgets/control";
import { ResponseWidget } from "./widgets/response";

export type BaseCondition = "lt" | "lte" | "gt" | "gte" | "eq" | "neq";
export type ArrayCondition = `length-${BaseCondition}` | `includes`;

// export type UnaryCondition = 'is_true' | 'is_false' | 'is_defined'

type BinaryConditionConfig = {
  condition: BaseCondition | ArrayCondition;
  conditionKey: string;
  value: string | number | boolean;
};

export type Condition = BaseCondition | ArrayCondition;
export type ConditionConfig = BinaryConditionConfig;

export function isResponseWidget(
  widget: FrameworkWidget
): widget is ResponseWidget {
  return widget.widgetFamily === "response";
}

export const isConditionalWidget = (
  widget: FrameworkWidget
): widget is ConditionalWidget => {
  return widget.widgetFamily === "control" && widget.template === "conditional";
};

export function isNotUndefined<T>(x: T | undefined): x is T {
  return x !== undefined;
}
