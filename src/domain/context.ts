import { Interaction } from "./interaction"
import { Participant } from "./participant"
import { Episode } from "./episode"
import { Environment } from "./environment"

export class Context {
	readonly id: string
	participants: Set<Participant>
	environment: Environment
	private episodes: Episode[]

	constructor(environment: Environment, participants: Set<Participant>, episodes: Episode[]) {
		this.id = crypto.randomUUID()
		this.participants = participants
		this.environment = environment
		this.episodes = episodes
	}

	submit(initiator: Participant, interaction: Interaction): void {
		// validate participants belong to context
		this.recordEpisode(initiator, interaction)

		const participants = interaction.getParticipants()
		for (const participant of participants.values()) {
			if (!this.participants.has(participant)) {
				throw new Error(`Participant ${participant.id} does not belong to context`)
			}
		}

		this.environment.absorb(interaction)
		this.engageParticipants(interaction)
	}

	private recordEpisode(initiator: Participant, interaction: Interaction): void {
		// record episode in context

		const episodeId = crypto.randomUUID()
		const episode = {
			id: episodeId,
			initiator: initiator,
			interaction: interaction,
		}
		this.episodes.push(episode)
	}

	private engageParticipants(interaction: Interaction): void {
		for (const participant of this.participants) {
			participant.observe(interaction)
		}
	}
}
