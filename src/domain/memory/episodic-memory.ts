import { Interaction } from "../interaction/interaction"
import { Episode } from "./episode"
import { Observer } from "../interaction/observer"

export class EpisodicMemory implements Observer {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}

	
	observe(interaction: Interaction): void {
		this.recordEpisode(interaction)
	}


	private recordEpisode(interaction: Interaction): void {
		const episodeId = crypto.randomUUID()
		const episode = {
			id: episodeId,
			interaction: interaction,
		}
		this.episodes.push(episode)
	}
}
