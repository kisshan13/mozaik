import { WorkUnit } from "@core/workflow/work-unit"
import { ExecutionStrategyFactory } from "./execution-strategy-factory"
import { WorkflowExecutionStrategy } from "./workflow-execution-strategy"

export class Workflow extends WorkUnit {
	
    constructor(readonly mode: 'parallel' | 'sequential', readonly units: WorkUnit[]) {
		super()
    }
  
    async execute(): Promise<any> {
		const executionStrategy: WorkflowExecutionStrategy = ExecutionStrategyFactory.create(this.mode)
		const result = await executionStrategy.execute(this)
		return { ok: true, data: result }
    }
}