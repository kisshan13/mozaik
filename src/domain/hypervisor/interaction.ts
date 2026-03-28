import { Participant } from "./participant"
import { Interpreter } from "./interpreter"

type ParticipantId = string

export class Interaction<D> {
	readonly id: string
	readonly data: D
	private participants: Map<ParticipantId, Participant>

	constructor(data: D, participants: Map<ParticipantId, Participant> = new Map()) {
		this.id = crypto.randomUUID()
		this.data = data
		this.participants = participants
	}

	getParticipants(): Map<ParticipantId, Participant> {
		return this.participants
	}

	public simulate(interpreter: Interpreter): void {
		interpreter.execute(this)
	}
}
