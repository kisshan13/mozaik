import { WorkUnit } from "@core/workflow/work-unit"
import { ExecutionStrategyFactory } from "@core/workflow/execution/strategy-factory"
import { WorkflowExecutionStrategy } from "@core/workflow/execution/strategy"
import { CompositeExecutionHook } from "./hooks/composite-hook"
import { ExecutionHook } from "./hooks/execution-hook"

export class Workflow extends WorkUnit {
	
    constructor(readonly mode: 'parallel' | 'sequential', readonly units: WorkUnit[]) {
		  super()
    }
  
    async execute(hook: ExecutionHook = new CompositeExecutionHook()): Promise<any> {

		hook.beforeWorkflow(this)
		const executionStrategy: WorkflowExecutionStrategy = ExecutionStrategyFactory.create(this.mode)
		const result = await executionStrategy.execute(this, hook)
		
		hook.afterWorkflow(this)
		return result
    }
}