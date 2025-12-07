import { ParallelExecution } from "./parallel-execution"
import { SequentalExecution } from "./sequential-execution"
import { WorkflowExecutionStrategy } from "./workflow-execution-strategy"

export class ExecutionStrategyFactory {

    static create(mode: string): WorkflowExecutionStrategy{

        let strategy: WorkflowExecutionStrategy
        if(mode == 'parallel') {
            strategy = new ParallelExecution()
        }else{
            strategy = new SequentalExecution()
        }

        return strategy
    }

}