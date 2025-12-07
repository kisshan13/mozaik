import { ParallelExecution } from "./parallel"
import { SequentalExecution } from "./sequential"
import { WorkflowExecutionStrategy } from "./strategy"

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