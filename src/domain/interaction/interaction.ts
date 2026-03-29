import { Observer } from "./observer"
import { Actor } from "./actor"
import { Tool } from "./tool"

type ObserverId = string

export class Interaction<I = unknown, O = unknown> {
	readonly id: string
	readonly intent: I
	readonly initiator: Actor
	readonly recipients: Map<ObserverId, Observer>
	private outcome?: O

	constructor(intent: I, initiator: Actor, participants: Map<ObserverId, Observer> = new Map()) {
		this.id = crypto.randomUUID()
		this.intent = intent
		this.initiator = initiator
		this.recipients = participants
	}

	getParticipants(): Map<ObserverId, Observer> {
		return this.recipients
	}

	getInitiator(): Actor {
		return this.initiator
	}

	getIntent(): I {
		return this.intent
	}

	getOutcome(): O | undefined {
		return this.outcome
	}

	isCommitted(): boolean {
		return this.outcome !== undefined
	}

	async commit(tool: Tool){
		const result = await tool.execute(this.intent)
		this.outcome = result as O
		for (const participant of this.recipients.values()) {
			participant.observe(this)
		}

	}

}
