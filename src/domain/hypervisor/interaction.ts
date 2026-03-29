import { Observer } from "./observer"
import { Actor } from "./actor"
import { Tool } from "./tool"

type ObserverId = string

export class Interaction<D> {
	readonly id: string
	readonly input: D
	readonly initiator: Actor
	readonly recipients: Map<ObserverId, Observer>

	constructor(input: D, initiator: Actor, participants: Map<ObserverId, Observer> = new Map()) {
		this.id = crypto.randomUUID()
		this.input = input
		this.initiator = initiator
		this.recipients = participants
	}

	getParticipants(): Map<ObserverId, Observer> {
		return this.recipients
	}

	getInitiator(): Actor {
		return this.initiator
	}

	getInput(): D {
		return this.input
	}

	async commit(tool: Tool){
		for (const participant of this.recipients.values()) {
			await participant.observe(this)
		}
		
		const data = await tool.execute(this.input)

	}

}
