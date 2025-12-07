
import { Workflow } from "@core/workflow/workflow"
import { WorkflowExecutionStrategy } from "@core/workflow/execution/strategy"

export class ParallelExecution implements WorkflowExecutionStrategy {
    
    async execute(workflow: Workflow): Promise<any> {

        const promises = []
		for (const u of workflow.units) {
			promises.push(u.execute())
		}

        const results = await Promise.all(promises)

        return results
    }

}