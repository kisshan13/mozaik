import { Workflow } from "./workflow";
import { WorkflowExecutionStrategy } from "./workflow-execution-strategy";

export class ParallelExecution implements WorkflowExecutionStrategy {
    
    async execute(worfklow: Workflow): Promise<any> {

        const promises = []
		for (const u of worfklow.units) {
			promises.push(u.execute())
		}

        const results = await Promise.all(promises)

        return results
    }

}