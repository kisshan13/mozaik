import { Context } from "./context"
import { Participant } from "./participant"

export class Environment {
	readonly id: string

	constructor() {
		this.id = crypto.randomUUID()
	}

	createContext(participants: Set<Participant>): Context {
		return new Context(this, participants, [])
	}
}
