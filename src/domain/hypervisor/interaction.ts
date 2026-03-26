import { Tool } from "../inference/tool"
import { Participant } from "./participant"
    
type ParticipantId = string

export class Interaction {
	readonly type: string
	readonly id: string
	private participants: Map<ParticipantId, Participant>
	readonly tool: Tool | null

	constructor(type: string, participants: Map<ParticipantId, Participant>, tool?: Tool) {
		this.id = crypto.randomUUID()
		this.type = type
		this.participants = participants
		this.tool = tool ?? null
	}

	getParticipants(): Map<ParticipantId, Participant> {
		return this.participants
	}

	getTool(): Tool | null {
		return this.tool
	}
}
