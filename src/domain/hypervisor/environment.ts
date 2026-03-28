import { Interaction } from "./interaction"
import { Participant } from "./participant"
import { Interpreter } from "./interpreter"
import { Interpretation } from "./interpretation"
import { Episode } from "./episode"

export class Environment {
	readonly id: string
	readonly participants: Set<Participant>
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.participants = new Set()
		this.episodes = []
	}

	async absorb(initiator: Participant, interaction: Interaction<unknown>, interpreter: Interpreter): Promise<void> {
		const interpretation: Interpretation<unknown> = await interpreter.execute(interaction)
		this.recordEpisode(initiator, interaction, interpretation)
		this.engageParticipants(interaction)
	}

	addParticipant(participant: Participant): void {
		this.participants.add(participant)
	}

	removeParticipant(participant: Participant): void {
		this.participants.delete(participant)
	}

	private engageParticipants(interaction: Interaction<unknown>): void {
		for (const participant of this.participants) {
			participant.observe(interaction)
		}
	}

	private recordEpisode(
		initiator: Participant,
		interaction: Interaction<unknown>,
		interpretation: Interpretation<unknown>,
	): void {
		// record episode in context

		const episodeId = crypto.randomUUID()
		const episode = {
			id: episodeId,
			initiator: initiator,
			interaction: interaction,
			interpretation: interpretation,
		}
		this.episodes.push(episode)
	}
}
