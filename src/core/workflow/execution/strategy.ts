import { ExecutionHook } from "../hooks/execution-hook"
import { Workflow } from "../workflow"

export interface WorkflowExecutionStrategy {

    execute(workflow: Workflow, hook: ExecutionHook): Promise<any>
}