import { Interaction } from "../hypervisor/interaction"
import { Participant } from "../hypervisor/participant"
import { Tool } from "../hypervisor/tool"
import { ContextEngineeringStrategy } from "./context-engineering-strategy"

export class Agent extends Participant {
	private contextEngineeringStrategy: ContextEngineeringStrategy

	constructor(id: string, tools: Tool[], contextEngineeringStrategy: ContextEngineeringStrategy) {
		super(id, tools)
		this.contextEngineeringStrategy = contextEngineeringStrategy
	}

	observe(interaction: Interaction<unknown>): void {
		this.contextEngineeringStrategy.execute(interaction)
	}
}
