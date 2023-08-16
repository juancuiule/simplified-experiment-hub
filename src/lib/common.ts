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
