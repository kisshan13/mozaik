import { Interaction } from "../hypervisor/interaction"
import { Participant } from "../hypervisor/participant"
import { Tool } from "../hypervisor/tool"
import { ModelAdapter } from "../model/adapter"

export class Agent extends Participant {
	constructor(
		id: string,
		tools: Tool[],
		private readonly modelAdapter: ModelAdapter,
	) {
		super(id, tools)
	}

	async observe(interaction: Interaction<unknown>) {
		const modelResponse = await this.modelAdapter.adapt(interaction)
		return modelResponse
	}
}
