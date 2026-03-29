import { ExecutionEvent } from "../runtime/execution-event"
import { Episode } from "./episode"
import { Listener } from "../runtime/listener"

export class EpisodicMemoryListener implements Listener {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}

	
	listen(event: ExecutionEvent): void {
		this.recordEpisode(event)
	}

	private recordEpisode(event: ExecutionEvent): void {
		const episodeId = crypto.randomUUID()
		const episode: Episode = {
			id: episodeId,
			event: event,
		}
		this.episodes.push(episode)
	}
}
