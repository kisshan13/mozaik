import { Plan } from "@/types/plan"
import { Workflow } from "@core/workflow/workflow"
import { MozaikAgent } from "./agent"
import { MozaikRequest } from "@/types/request"
import { PlanSchema } from "@core/workflow/schema/plan"
import { PlanWorkflowMapper } from "@core/workflow/mapper"

const PROMPT = `You are a planner.

Rules:
- Use 'parallel' for the task that can be run in parallel.
- Pick model based on the task complexity
- Keep prompts actionable.
- Don't ask user for any input, just do the thing with available data you have.
`

export class PlanningAgent extends MozaikAgent {
	constructor(request: MozaikRequest) {
		super(request)
	}

	async planFromGoal(goal: string): Promise<Workflow> {
		this.setStructuredOutput(PlanSchema)
		const response = await this.act(`${PROMPT}\nGoal: ${goal}`)
		const plan: Plan = response.data
		return PlanWorkflowMapper.fromPlan(plan)
	}
}
