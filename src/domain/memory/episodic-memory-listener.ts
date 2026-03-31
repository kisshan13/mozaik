import { BaseEvent } from "../event/base"
import { Episode } from "./episode"
import { InferenceEndedEvent } from "../event/inference-ended"
import { ToolExecutedEvent } from "../event/tool-executed"
import { UserMessageEvent } from "../event/user-message"
import { EventObserver } from "../communication/event-observer"

export class EpisodicMemoryListener implements EventObserver<InferenceEndedEvent | ToolExecutedEvent | UserMessageEvent> {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}
	
	onEvent(event: InferenceEndedEvent | ToolExecutedEvent | UserMessageEvent): void {
		this.recordEpisode(event)
	}

	private recordEpisode(event: BaseEvent): void {
		const episodeId = crypto.randomUUID()
		const episode: Episode = {
			id: episodeId,
			event: event,
		}
		this.episodes.push(episode)
	}
}
