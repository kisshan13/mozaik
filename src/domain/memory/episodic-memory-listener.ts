import { BaseEvent } from "../event/base"
import { Episode } from "./episode"
import { Listener } from "../runtime/listener"
import { InferenceEndedEvent } from "../event/inference-ended"
import { ToolExecutedEvent } from "../event/tool-executed"
import { UserMessageEvent } from "../event/user-message"

export class EpisodicMemoryListener implements Listener {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}
	toolExecutedListener(event: ToolExecutedEvent): void {
		throw new Error("Method not implemented.")
	}
	inferenceEndedListener(event: InferenceEndedEvent): void {
		throw new Error("Method not implemented.")
	}
	userMessageListener(event: UserMessageEvent): void {
		throw new Error("Method not implemented.")
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
