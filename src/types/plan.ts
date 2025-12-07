import { Model } from "@/types/model"

export type PlanNode =
  | { kind: "task"; task: string; model: Model }
  | { kind: "workflow"; mode: "sequential"|"parallel"; units: PlanNode[] }

export type Plan = { root: PlanNode }