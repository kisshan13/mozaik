import { SessionContext } from "../session/state"
import { Workflow } from "../workflow/workflow"

export abstract class Agent {
	
	readonly workflow: Workflow
	readonly context: SessionContext

	constructor(workflow: Workflow, context: SessionContext) {
		this.workflow = workflow
		this.context = context
	}

	async start(): Promise<unknown> {
		return this.workflow.start(this.context)
	}

}
