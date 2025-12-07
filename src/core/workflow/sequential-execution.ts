import { Workflow } from "./workflow"
import { WorkflowExecutionStrategy } from "./workflow-execution-strategy"

export class SequentalExecution implements WorkflowExecutionStrategy {
    
    async execute(worfklow: Workflow): Promise<any> {

        const results = []
		for (const u of worfklow.units) {
			results.push(await u.execute())
		}

        return results
    }
}