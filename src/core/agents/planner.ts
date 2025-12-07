import { Plan, PlanNode } from "@/types/plan"
import { WorkUnit } from "@core/workflow/work-unit"
import { Task } from "@core/workflow/task"
import { Workflow } from "@core/workflow/workflow"
import { Agent } from "./agent"
import { Command } from "@/types/command"
import { PlanSchema } from "@core/schemas/plan"

const PROMPT = 
`You are a planner.

Rules:
- Use 'parallel' for the task that can be run in parallel.
- Pick model based on the task complexity
- Keep prompts actionable.
- Don't ask user for any input, just do the thing with available data you have.
`
  
export class PlanningAgent extends Agent {

	constructor(command: Command){
		super(command)
	}

	async planFromGoal(goal: string): Promise<Workflow> {
		this.setStructuredOutput(PlanSchema)
		const plan: Plan = await this.act(`${PROMPT}\nGoal: ${goal}`)
		return buildWorkflow(plan.root)
	}
}

function buildWorkflow(node: PlanNode): Workflow {

	if (node.kind !== "workflow") 
		throw new Error("Root must be workflow")
	
	return new Workflow(
		node.mode,
		node.units.map(mapNode)
	)
}

function mapNode(node: PlanNode): WorkUnit {

	if (node.kind === "task") {
		return new Task(node.task, node.model)
	}
	
	return new Workflow(
		node.mode,
		node.units.map(mapNode)
	)
}
