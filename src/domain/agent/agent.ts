import { Interaction } from "../runtime/tool-executor"
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

	async toolExecuted(interaction: Interaction<unknown>) {
		
	}

	async listen(interaction: Interaction<unknown>) {

		if (interaction.getInitiator() === this) {
			this.toolExecuted(interaction)
		}

		
		const modelResponse = await this.modelAdapter.adapt(interaction)
		return modelResponse
	}
}
