import { LoopContext } from "@loop/loop-context"

export interface ContextListener {
	onContextUpdate(data: LoopContext): void
}

export enum Topic {
	LOOP_STARTED = "loop.started",
	LOOP_COMPLETED = "loop.completed",
	LOOP_FAILED = "loop.failed",
	INFERENCE_REQUESTED = "inference.requested",
	INFERENCE_COMPLETION_RECEIVED = "inference.completion.received",
	INFERENCE_COMPLETED = "inference.completed",
	INFERENCE_ERROR = "inference.error",
}

export class ContextPublisher {
	private topics: Map<Topic, ContextListener[]> = new Map()

	subscribe(topic: Topic, listener: ContextListener): void {
		if (!this.topics.has(topic)) {
			this.topics.set(topic, [])
		}

		this.topics.get(topic)!.push(listener)
	}

	publish(topic: Topic, loopContext: LoopContext): void {
		if (!this.topics.has(topic)) {
			return
		}

		const topicListeners = this.topics.get(topic)

		if (!topicListeners) {
			return
		}

		topicListeners.forEach((listener) => listener.onContextUpdate(loopContext))
	}
}
