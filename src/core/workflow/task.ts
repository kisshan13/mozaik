import { Model, Command, Agent } from "@/index"
import { WorkUnit } from "@core/workflow/work-unit"
import { ExecutionHook } from "./hooks/execution-hook"
import { DEFAULT_CLUSTER_HOOK } from "./hooks"

export class Task extends WorkUnit {
	constructor(
		private task: string,
		private model: Model,
	) {
		super()
	}

	getTask() {
		return this.task
	}

	getModel() {
		return this.model
	}

	async execute(hook: ExecutionHook = DEFAULT_CLUSTER_HOOK): Promise<any> {
		hook.beforeTask(this)

		const command: Command = {
			model: this.model,
			task: this.task,
		}

		const agent = new Agent(command)
		const result = await agent.act(this.task)

		hook.afterTask(this)
		return result
	}
}
