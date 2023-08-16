import {
  ArrayCondition,
  BaseCondition,
  Condition,
  isResponseWidget,
} from "./common";
import { ExperimentStepNode } from "./nodes/study";
import { ResponseWidget } from "./widgets/response";

export function shuffle<T>(original: T[]): T[] {
  const array = [...original];
  let currentIndex = array.length;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export function distribute(total: number, steps: number) {
  const min = Math.floor(total / steps);
  const rest = total % steps;
  return Array.from({ length: steps }).map((_, i) => {
    return i < rest ? min + 1 : min;
  });
}

// given a record and a set of keys returns a new record
// only with the keys-values of the given keys
export function pick<T extends Record<string, any>, K extends keyof T>(
  record: T
) {
  return function (keys: K[]) {
    return keys.reduce((newRecord, currentKey, i) => {
      return { ...newRecord, [currentKey]: record[currentKey] };
    }, {}) as Pick<T, K>;
  };
}

export function unique<T>(list: T[], id: (x: T) => string) {
  return list.reduce((acc, curr) => {
    return acc.map(id).includes(id(curr)) ? acc : [...acc, curr];
  }, [] as T[]);
}

export function sum(list: number[]) {
  return list.reduce((acum, curr) => acum + curr, 0);
}

export function sumBy<T>(list: T[], by: (x: T) => number) {
  return sum(list.map(by));
}

type Primitive = string | number | boolean | Primitive[] | undefined;

export function getValueByPath<T>(path: string, obj: T): Primitive | undefined {
  const pathParts = path.split(".");

  const value = pathParts.reduce<any>((currentValue, part) => {
    if (
      currentValue &&
      typeof currentValue === "object" &&
      part in currentValue
    ) {
      return (currentValue as any)[part];
    } else {
      return undefined;
    }
  }, obj);

  if (Array.isArray(value)) {
    const isArrayOfPrimitives = value.every(
      (item) =>
        typeof item === "string" ||
        typeof item === "number" ||
        typeof item === "boolean"
    );
    if (isArrayOfPrimitives) {
      return value as Primitive[];
    }
  } else if (
    typeof value === "string" ||
    typeof value === "number" ||
    typeof value === "boolean"
  ) {
    return value as Primitive;
  }

  return undefined;
}

export function evaluateBaseCondition(
  condition: BaseCondition,
  value1: Primitive,
  value2: Primitive
): boolean {
  if (value1 !== undefined && value2 !== undefined) {
    switch (condition) {
      case "lt":
        return value1 < value2;
      case "lte":
        return value1 <= value2;
      case "gt":
        return value1 > value2;
      case "gte":
        return value1 >= value2;
      default:
        throw new Error(`Unsupported base condition: ${condition}`);
    }
  }

  switch (condition) {
    case "eq":
      return value1 === value2;
    case "neq":
      return value1 !== value2;
    default:
      throw new Error(`Unsupported base condition: ${condition}`);
  }
}

export function evaluateArrayCondition(
  condition: ArrayCondition,
  value: Array<any>,
  target: Primitive
): boolean {
  if (condition === "includes") {
    return value.includes(target);
  } else {
    const baseCondition = condition.split("-")[1] as BaseCondition;
    const arrayLength = value.length;
    return evaluateBaseCondition(baseCondition, arrayLength, target as number);
  }
}

export function evaluateCondition(
  condition: Condition,
  dataValue: any,
  conditionValue: any
): boolean {
  switch (condition) {
    case "eq": {
      return dataValue === conditionValue;
    }
    case "neq": {
      return dataValue !== conditionValue;
    }
    case "gt": {
      return dataValue > conditionValue;
    }
    case "gte": {
      return dataValue >= conditionValue;
    }
    case "lt": {
      return dataValue < conditionValue;
    }
    case "lte": {
      return dataValue <= conditionValue;
    }
    case "includes": {
      return dataValue.includes(conditionValue);
    }
    default: {
      if (condition.startsWith("length-")) {
        const newCondition = condition.replace("length-", "") as BaseCondition;
        return evaluateCondition(
          newCondition,
          dataValue.length,
          conditionValue
        );
      }
      return false;
    }
  }
}

export type ResponseValue = string | boolean | number | string[] | undefined;
type DefaultValue = ResponseValue | undefined;

export function defaultValueForWidget(widget: ResponseWidget): DefaultValue {
  switch (widget.template) {
    case "single_checkbox": {
      return widget.props.defaultValue;
    }
    case "text_input":
    case "dropdown":
    case "rating":
    case "radio": {
      return "";
    }
    case "slider": {
      return undefined;
    }
    case "checkbox":
    case "color-options":
    case "emoji-options": {
      return [] as string[];
    }
  }
}

export function getInitialValuesForStep(node: ExperimentStepNode) {
  const entries: [string, DefaultValue][] = node.props.widgets
    .filter(isResponseWidget)
    .map((widget) => [widget.props.dataKey, defaultValueForWidget(widget)]);

  return Object.fromEntries(entries) as Record<string, DefaultValue>;
}
