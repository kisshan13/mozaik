import { Interaction } from "../hypervisor/interaction"
import { Episode } from "./episode"
import { Observer } from "../hypervisor/observer"

export class EpisodicMemory implements Observer {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}

	
	observe(interaction: Interaction<unknown>): void {
		this.recordEpisode(interaction)
	}


	private recordEpisode(interaction: Interaction<unknown>): void {
		const episodeId = crypto.randomUUID()
		const episode = {
			id: episodeId,
			interaction: interaction,
		}
		this.episodes.push(episode)
	}
}
