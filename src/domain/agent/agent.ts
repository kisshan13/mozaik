import { Context } from "../hypervisor/context"
import { ContextEngineeringStrategy } from "./context-engineering-strategy"
import { Interaction } from "../hypervisor/interaction"
import { Participant } from "../hypervisor/participant"
import { Interpreter } from "../hypervisor/interpreter"

class AgentInterpreter implements Interpreter {
	private contextEngineeringStrategy: ContextEngineeringStrategy

	constructor(contextEngineeringStrategy: ContextEngineeringStrategy) {
		this.contextEngineeringStrategy = contextEngineeringStrategy
	}

	interpret(interaction: Interaction, context: Context): void {
		this.contextEngineeringStrategy.execute(interaction, context)
	}
}

export class Agent extends Participant {
	constructor(id: string, contextEngineeringStrategy: ContextEngineeringStrategy) {
		super(id, new AgentInterpreter(contextEngineeringStrategy))
	}
}
