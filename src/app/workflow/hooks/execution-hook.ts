import { Workflow } from "@/app/workflow/workflow"
import { Task } from "@/app/workflow/task"

export interface ExecutionHook {
	beforeWorkflow(wf: Workflow): void
	afterWorkflow(wf: Workflow, result: any): void
	beforeTask(task: Task): void
	afterTask(task: Task, result: any): void
}
