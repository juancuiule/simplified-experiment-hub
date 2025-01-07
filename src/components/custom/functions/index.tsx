import { ResponseValue } from "@/lib/utils";

const customFunctions: Record<
  string,
  (data: Record<string, ResponseValue>) => Record<string, ResponseValue>
> = {
  id: (data: Record<string, ResponseValue>) => data,
  "sd4-aggregate": (data: Record<string, ResponseValue>) => {
    const keys = ["wild", "mean", "craft", "special"];

    const items = Object.entries(data) as [string, string][];

    const compute = (key: string, items: [string, string][]) => {
      const values = items
        .filter(([k]) => k.startsWith(key))
        .map(([, v]) => parseFloat(v));

      const sum = values.reduce((acc, v) => acc + v, 0);
      return sum;
    };

    const result = keys.reduce((acc, key) => {
      return {
        ...acc,
        [key]: compute(key, items),
      };
    }, {});

    return {
      ...data,
      ...result,
    };
  },
};

export default customFunctions;
