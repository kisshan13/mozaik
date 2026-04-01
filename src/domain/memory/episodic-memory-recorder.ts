import { BaseEvent } from "../event/base"
import { Episode } from "./episode"
import { AgentRuntime } from "../communication/observer"

export class EpisodicMemoryRecorder implements AgentRuntime {
	readonly id: string
	readonly episodes: Episode[]

	constructor() {
		this.id = crypto.randomUUID()
		this.episodes = []
	}
	onLlmResponse(llmResponse: unknown): Promise<void> | void {
		throw new Error("Method not implemented.")
	}
	onToolCall(initiator: string, toolName: string, toolArgs: unknown): Promise<void> | void {
		throw new Error("Method not implemented.")
	}
	onToolCallResult(toolName: string, toolArgs: unknown, result: unknown): Promise<void> | void {
		throw new Error("Method not implemented.")
	}
	onMessage(messageType: string, data: unknown): Promise<void> | void {
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
