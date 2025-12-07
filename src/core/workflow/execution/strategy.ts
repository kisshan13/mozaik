import { Workflow } from "../workflow"

export interface WorkflowExecutionStrategy {

    execute(workflow: Workflow): Promise<any>
}