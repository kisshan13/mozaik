import { Plan } from "@/app/workflow/plan"
import { Workflow } from "@/app/workflow/workflow"
import { MozaikAgent } from "../../domain/agent"
import { Context } from "@/domain/inference/context"
import { PlanSchema } from "@/app/workflow/schema/plan"
import { PlanWorkflowMapper } from "@/app/workflow/mapper"

const PROMPT = `You are a planner.

Rules:
- Use 'parallel' for the task that can be run in parallel.
- Pick model based on the task complexity
- Keep prompts actionable.
- Don't ask user for any input, just do the thing with available data you have.
`

export class PlanningAgent extends MozaikAgent {
	constructor(context: Context) {
		super(context)
	}

	async planFromGoal(goal: string): Promise<Workflow> {
		this.setStructuredOutput(PlanSchema)
		const response = await this.act(`${PROMPT}\nGoal: ${goal}`)
		const plan: Plan = response.data
		return PlanWorkflowMapper.fromPlan(plan)
	}
}
