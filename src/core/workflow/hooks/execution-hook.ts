import { Workflow } from "@core/workflow/workflow"
import { Task } from "@core/workflow/task"

export interface ExecutionHook {
    beforeWorkflow(wf: Workflow): void
    afterWorkflow(wf: Workflow): void
    beforeTask(task: Task): void
    afterTask(task: Task): void
}