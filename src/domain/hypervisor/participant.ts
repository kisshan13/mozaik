import { Interaction } from "./interaction"
import { Tool } from "./tool"

export abstract class Participant {
	readonly id: string
	tools: Tool[]

	constructor(id: string, tools: Tool[]) {
		this.id = id
		this.tools = tools
	}

	abstract observe(interaction: Interaction<unknown>): void
}
