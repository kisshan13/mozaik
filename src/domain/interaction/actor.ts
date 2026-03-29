import { Interaction } from "./interaction"
import { Tool } from "./tool"

export abstract class Actor {
	readonly id: string
	tools: Tool[]

	constructor(id: string, tools: Tool[]) {
		this.id = id
		this.tools = tools
	}

	interact(interaction: Interaction<unknown, unknown>, tool: Tool): Promise<unknown> {
		return interaction.commit(tool)
	}

}
