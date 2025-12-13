import { Task } from "../task"
import { Workflow } from "../workflow"
import { ExecutionHook } from "./execution-hook"
import { Logger } from "./logging-hook"

export class CompositeExecutionHook implements ExecutionHook {
    
    constructor(private hooks: ExecutionHook[] = [new Logger()]) {}
    
    beforeTask(task: Task): void {
        this.hooks.forEach(h => h.beforeTask(task))
    }

    afterTask(task: Task): void {
        this.hooks.forEach(h => h.afterTask(task))
    }
  
    beforeWorkflow(wf: Workflow) {
        this.hooks.forEach(h => h.beforeWorkflow(wf))
    }
  
    afterWorkflow(wf: Workflow) {
        this.hooks.forEach(h => h.afterWorkflow(wf))
    }
  
}
  