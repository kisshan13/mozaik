import { Workflow } from "@core/workflow/workflow"
import { WorkflowExecutionStrategy } from "@core/workflow/execution/strategy"
import { ExecutionHook } from "../hooks/execution-hook"

export class ParallelExecution implements WorkflowExecutionStrategy {
	async execute(workflow: Workflow, hook: ExecutionHook): Promise<any> {
		const promises = []
		for (const u of workflow.units) {
			promises.push(u.execute(hook))
		}

		const results = await Promise.all(promises)

		return results
	}
}
