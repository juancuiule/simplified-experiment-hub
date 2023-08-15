type NodeFamily = "study" | "core" | "control" | "view";

export interface BaseNode<T extends NodeFamily, U extends string> {
  nodeFamily: T;
  nodeType: U;
  id: string
}


