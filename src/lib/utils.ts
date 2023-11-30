import {
  ArrayCondition,
  BaseCondition,
  Condition,
  isResponseWidget,
} from "./common";
import { FrameworkWidget } from "./widgets";
import { Option, ResponseWidget } from "./widgets/response";

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

export function getKeys<T extends Record<string, any>>(obj: T) {
  return Object.keys(obj) as (keyof T)[];
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

const alignTypes = (value1: any, value2: any) => {
  if (typeof value1 === "number" && typeof value2 === "string") {
    return [value1, Number(value2)];
  } else if (typeof value1 === "string" && typeof value2 === "number") {
    return [value1, value2.toString()];
  } else if (typeof value1 === "boolean" && typeof value2 === "string") {
    return [value1, Boolean(value2)];
  } else if (typeof value1 === "string" && typeof value2 === "boolean") {
    return [value1, value2.toString()];
  } else {
    return [value1, value2];
  }
};

export function evaluateCondition(
  condition: Condition,
  dataValue: any,
  conditionValue: any
): boolean {
  if (dataValue === undefined || conditionValue === undefined) {
    return false;
  }
  const [a, b] = alignTypes(dataValue, conditionValue);
  switch (condition) {
    case "eq": {
      return a === b;
    }
    case "neq": {
      return a !== b;
    }
    case "gt": {
      return a > b;
    }
    case "gte": {
      return a >= b;
    }
    case "lt": {
      return a < b;
    }
    case "lte": {
      return a <= b;
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
      const {
        max = 100,
        min = 0,
        defaultValue = (max - min) / 2,
      } = widget.props;
      return defaultValue;
    }
    case "checkbox":
    case "color-options":
    case "emoji-options":
    case "multiple-check": {
      return [] as string[];
    }
  }
}

export function getInitialValuesForStep(widgets: FrameworkWidget[]) {
  const entries: [string, DefaultValue][] = widgets
    .filter(isResponseWidget)
    .map((widget) => [widget.props.dataKey, defaultValueForWidget(widget)]);

  return Object.fromEntries(entries) as Record<string, DefaultValue>;
}

export function optionsToString(options: Option[]) {
  return options.map((option) => option.label).join(",");
}

export function stringToOptions(str: string): Option[] {
  return str.split(",").map((option) => {
    return {
      label: option.trim(),
      value: option.trim().replaceAll(" ", "_").toLowerCase(),
    };
  });
}
