import { BaseEvent } from "../event/base"
import { Episode } from "./episode"
import { InferenceEndedEvent } from "../event/inference-ended"
import { ToolExecutedEvent } from "../event/tool-executed"
import { MessageEvent } from "../event/message"
import { EventObserver } from "../communication/observer"

export class EpisodicMemoryRecorder implements EventObserver<InferenceEndedEvent | ToolExecutedEvent | MessageEvent> {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}

	onEvent(event: InferenceEndedEvent | ToolExecutedEvent | MessageEvent): void {
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
