import { Context } from "../hypervisor/context"
import { Interaction } from "../hypervisor/interaction"
import { Participant } from "../hypervisor/participant"
import { ContextEngineeringStrategy } from "./context-engineering-strategy"

export class Agent extends Participant {
	private contextEngineeringStrategy: ContextEngineeringStrategy

	constructor(id: string, contextEngineeringStrategy: ContextEngineeringStrategy) {
		super(id)
		this.contextEngineeringStrategy = contextEngineeringStrategy
	}

	observe(interaction: Interaction, context: Context): void {
		this.contextEngineeringStrategy.execute(interaction, context)
	}
}
