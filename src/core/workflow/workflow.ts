import { WorkUnit } from "@core/workflow/work-unit"
import { ExecutionStrategyFactory } from "@core/workflow/execution/strategy-factory"
import { WorkflowExecutionStrategy } from "@core/workflow/execution/strategy"
import { ExecutionHook } from "./hooks/execution-hook"
import { DEFAULT_CLUSTER_HOOK } from "./hooks"

export class Workflow extends WorkUnit {
	constructor(
		readonly mode: "parallel" | "sequential",
		readonly units: WorkUnit[],
	) {
		super()
	}

	async execute(hook: ExecutionHook = DEFAULT_CLUSTER_HOOK): Promise<any> {
		hook.beforeWorkflow(this)

		const executionStrategy: WorkflowExecutionStrategy = ExecutionStrategyFactory.create(this.mode)
		const result = await executionStrategy.execute(this, hook)

		hook.afterWorkflow(this, result)
		return result
	}
}
