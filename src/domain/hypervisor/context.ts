import { Interaction } from "./interaction"
import { Participant } from "./participant"
import { Environment } from "./environment"
import { Interpreter } from "./interpreter"

export class Context {
	readonly id: string
	participants: Set<Participant>
	environment: Environment

	constructor(environment: Environment, participants: Set<Participant>) {
		this.id = crypto.randomUUID()
		this.participants = participants
		this.environment = environment
	}

	submit(initiator: Participant, interaction: Interaction, interpreter: Interpreter): void {
		const participants = interaction.getParticipants()
		for (const participant of participants.values()) {
			if (!this.participants.has(participant)) {
				throw new Error(`Participant ${participant.id} does not belong to context`)
			}
		}

		this.environment.absorb(initiator, interaction, interpreter)
		this.engageParticipants(interaction, this)
	}

	private engageParticipants(interaction: Interaction, context: Context): void {
		for (const participant of this.participants) {
			participant.observe(interaction, context)
		}
	}
}
