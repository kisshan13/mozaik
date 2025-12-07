import { Workflow } from "./workflow"

export interface WorkflowExecutionStrategy {

    execute(worfklow: Workflow): Promise<any>
}