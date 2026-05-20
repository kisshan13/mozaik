import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { Participant } from "@domain/agentic-environment/participants/participant"

export abstract class Human extends Participant {
	sendMessage(environment: AgenticEnvironment, message: string): void {
		if (!this.isJoinedTo(environment)) throw new Error("Not joined to environment")
		environment.deliverMessage(this, message)
	}
}
