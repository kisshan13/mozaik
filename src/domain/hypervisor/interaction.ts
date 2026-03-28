import { Interpretation } from "./interpretation"
import { Participant } from "./participant"
import { Tool } from "./tool"

type ParticipantId = string

export class Interaction<D> {
	readonly id: string
	readonly data: D
	readonly initiator: Participant
	readonly participants: Map<ParticipantId, Participant>

	constructor(data: D, initiator: Participant, participants: Map<ParticipantId, Participant> = new Map()) {
		this.id = crypto.randomUUID()
		this.data = data
		this.initiator = initiator
		this.participants = participants
	}

	getParticipants(): Map<ParticipantId, Participant> {
		return this.participants
	}

	getInitiator(): Participant {
		return this.initiator
	}

	getData(): D {
		return this.data
	}

	public async simulate(tool: Tool): Promise<Interpretation<unknown>> {
		const data = await tool.execute(this.data)
		const interpretation: Interpretation<unknown> = {
			data: data,
		}
		return interpretation
	}
}
