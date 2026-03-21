import { Plan, PlanNode } from "@/app/workflow/plan"
import { Workflow } from "./workflow"
import { WorkUnit } from "./work-unit"
import { Task } from "./task"

export class PlanWorkflowMapper {
	static fromPlan(plan: Plan): Workflow {
		return this.fromNode(plan.root)
	}

	private static fromNode(node: PlanNode): Workflow {
		if (node.kind !== "workflow") {
			throw new Error("Root must be workflow")
		}

		return new Workflow(node.mode, node.units.map(this.mapNode))
	}

	private static mapNode(node: PlanNode): WorkUnit {
		if (node.kind === "task") {
			return new Task(node.task, node.model)
		}

		return new Workflow(node.mode, node.units.map(this.mapNode))
	}
}
