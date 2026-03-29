import { ExecutionEvent } from "../runtime/execution-event"
import { Listener } from "../runtime/listener"
import { ToolCaller } from "../runtime/tool-caller"
import { Tool } from "../runtime/tool"
import { ModelAdapter } from "../model/adapter"

export class Agent extends ToolCaller implements Listener {
	constructor(
		id: string,
		tools: Tool[],
		private readonly modelAdapter: ModelAdapter,
	) {
		super(id, tools)
	}

	async toolExecuted(event: ExecutionEvent) {
		
	}

	async listen(event: ExecutionEvent) {

		if (event.getType() === "tool_call") {
			this.toolExecuted(event)
		}

		const modelResponse = await this.modelAdapter.adapt(event)
		return modelResponse
	}
}
