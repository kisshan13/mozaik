import { Environment } from "./environment"
import { Interaction } from "./interaction"
import { Tool } from "./tool"

export abstract class Participant {
	readonly id: string
	tools: Tool[]
	environment: Environment

	constructor(id: string, tools: Tool[], environment: Environment) {
		this.id = id
		this.tools = tools
		this.environment = environment
	}

	interact(interaction: Interaction<unknown>, tool: Tool): Promise<unknown> {
		return this.environment.absorb(interaction, tool)
	}

	abstract observe(interaction: Interaction<unknown>): void
}
