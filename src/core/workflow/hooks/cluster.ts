import { Task } from "../task"
import { Workflow } from "../workflow"
import { ExecutionHook } from "./execution-hook"

export class ClusterHook implements ExecutionHook {
	constructor(private hooks: ExecutionHook[]) {}

	beforeTask(task: Task): void {
		this.hooks.forEach((h) => h.beforeTask(task))
	}

	afterTask(task: Task): void {
		this.hooks.forEach((h) => h.afterTask(task))
	}

	beforeWorkflow(wf: Workflow) {
		this.hooks.forEach((h) => h.beforeWorkflow(wf))
	}

	afterWorkflow(wf: Workflow) {
		this.hooks.forEach((h) => h.afterWorkflow(wf))
	}
}
