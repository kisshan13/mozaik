import { Interaction } from "./interaction"
import { Participant } from "./participant"
import { Interpretation } from "./interpretation"
import { Episode } from "./episode"
import { Tool } from "./tool"

export class Environment {
	readonly id: string
	readonly participants: Set<Participant>
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.participants = new Set()
		this.episodes = []
	}

	async absorb(interaction: Interaction<unknown>, tool: Tool): Promise<void> {
		this.engageParticipants(interaction)
		const interpretation = await interaction.simulate(tool)
		this.recordEpisode(interaction, interpretation)
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

	private recordEpisode(interaction: Interaction<unknown>, interpretation: Interpretation<unknown>): void {
		const episodeId = crypto.randomUUID()
		const episode = {
			id: episodeId,
			interaction: interaction,
			interpretation: interpretation,
		}
		this.episodes.push(episode)
	}
}
