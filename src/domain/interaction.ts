import { Participant } from "./participant"

type ParticipantId = string

export class Interaction<T = unknown> {
	readonly type: string
	readonly id: string
	private participants: Map<ParticipantId, Participant>
	readonly context: T

	constructor(type: string, participants: Map<ParticipantId, Participant>, context: T) {
		this.id = crypto.randomUUID()
		this.type = type
		this.participants = participants
		this.context = context
	}

	getParticipants(): Map<ParticipantId, Participant> {
		return this.participants
	}

	getContext(): T {
		return this.context
	}
}
