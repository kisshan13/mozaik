import { Workflow } from "../workflow"
import { WorkflowExecutionStrategy } from "./strategy"

export class SequentalExecution implements WorkflowExecutionStrategy {
    
    async execute(workflow: Workflow): Promise<any> {

        const results = []
		for (const u of workflow.units) {
			results.push(await u.execute())
		}

        return results
    }
}