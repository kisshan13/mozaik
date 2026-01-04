import { Plan } from "@/types/plan"
import { Workflow } from "@core/workflow/workflow"
import { Agent } from "./agent"
import { Command } from "@/types/command"
import { PlanSchema } from "@core/workflow/schema/plan"
import { PlanWorkflowMapper } from "@core/workflow/mapper"

const PROMPT = `You are a planner.

Rules:
- Use 'parallel' for the task that can be run in parallel.
- Pick model based on the task complexity
- Keep prompts actionable.
- Don't ask user for any input, just do the thing with available data you have.
`

export class PlanningAgent extends Agent {
	constructor(command: Command) {
		super(command)
	}

	async planFromGoal(goal: string): Promise<Workflow> {
		this.setStructuredOutput(PlanSchema)
		const plan: Plan = await this.act(`${PROMPT}\nGoal: ${goal}`)
		return PlanWorkflowMapper.fromPlan(plan)
	}
}
