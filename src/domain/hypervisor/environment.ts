import { Context } from "./context"
import { Interaction } from "./interaction"
import { Participant } from "./participant"
import { Interpreter } from "./interpreter"
import { Interpretation } from "./interpretation"
import { Episode } from "./episode"

export class Environment {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}

	createContext(participants: Set<Participant>): Context {
		return new Context(this, participants)
	}

	async absorb(initiator: Participant, interaction: Interaction, interpreter: Interpreter): Promise<void> {
		const interpretation: Interpretation = await interpreter.execute(interaction)
		this.recordEpisode(initiator, interaction, interpretation)
	}

	private recordEpisode(initiator: Participant, interaction: Interaction, interpretation: Interpretation): void {
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
