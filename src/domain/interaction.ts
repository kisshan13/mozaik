import { Tool } from "./inference/tool"
import { Participant } from "./participant"

type ParticipantId = string

export class Interaction<T = unknown> {
	readonly type: string
	readonly id: string
	private participants: Map<ParticipantId, Participant>
	readonly context: T
	readonly tool: Tool | null

	constructor(type: string, participants: Map<ParticipantId, Participant>, context: T, tool?: Tool) {
		this.id = crypto.randomUUID()
		this.type = type
		this.participants = participants
		this.context = context
		this.tool = tool ?? null
	}

	getParticipants(): Map<ParticipantId, Participant> {
		return this.participants
	}

	getContext(): T {
		return this.context
	}

	getTool(): Tool | null {
		return this.tool
	}
}
