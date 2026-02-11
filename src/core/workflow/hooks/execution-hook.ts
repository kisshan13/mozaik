import { Workflow } from "@core/workflow/workflow"
import { Task } from "@core/workflow/task"

export interface ExecutionHook {
	beforeWorkflow(wf: Workflow): void
	afterWorkflow(wf: Workflow, result: any): void
	beforeTask(task: Task): void
	afterTask(task: Task, result: any): void
}
