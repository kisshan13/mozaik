import { Interaction } from "../interaction/interaction"
import { Observer } from "../interaction/observer"
import { Actor } from "../interaction/actor"
import { Tool } from "../interaction/tool"
import { ModelAdapter } from "../model/adapter"

export class Agent extends Actor implements Observer {
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
