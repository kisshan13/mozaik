import { Context } from "./context"
import { Interaction } from "./interaction"
import { Participant } from "./participant"

export class Environment {
	readonly id: string

	constructor() {
		this.id = crypto.randomUUID()
	}

	createContext(participants: Set<Participant>): Context {
		return new Context(this, participants, [])
	}

	absorb(interaction: Interaction): void {
		const tool = interaction.getTool()
		if (tool) {
			tool.execute(interaction)
		}
	}
}
