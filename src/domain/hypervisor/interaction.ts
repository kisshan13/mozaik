import { Participant } from "./participant"
import { Interpreter } from "./interpreter"

type ParticipantId = string

export class Interaction {
	readonly type: string
	readonly id: string
	private participants: Map<ParticipantId, Participant>

	constructor(type: string, participants: Map<ParticipantId, Participant>) {
		this.id = crypto.randomUUID()
		this.type = type
		this.participants = participants
	}

	getParticipants(): Map<ParticipantId, Participant> {
		return this.participants
	}

	public simulate(interpreter: Interpreter): void {
		interpreter.execute(this)
	}
}
