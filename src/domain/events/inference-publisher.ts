import { LoopContext } from "@loop/loop-context"
import { InferenceEvent, InferenceSignal } from "./topics/inference"

export abstract class SignalListener {
	abstract onSignal(loopContext: LoopContext): void
}

export abstract class InferenceSignalListener extends SignalListener {
	abstract onSignal(loopContext: LoopContext): void
}

export enum LoopTopic {
	LOOP_STARTED = "loop.started",
	LOOP_COMPLETED = "loop.completed",
	LOOP_FAILED = "loop.failed",
}

export class Publisher<T> {
	private topics: Map<T, SignalListener[]> = new Map()

	subscribe(topic: T, listener: SignalListener): void {
		if (!this.topics.has(topic)) {
			this.topics.set(topic, [])
		}

		this.topics.get(topic)!.push(listener)
	}

	publish(topic: T, loopContext: LoopContext): void {
		if (!this.topics.has(topic)) {
			return
		}

		const topicListeners = this.topics.get(topic)

		if (!topicListeners) {
			return
		}

		topicListeners.forEach((listener) => listener.onSignal(loopContext))
	}
}

export class InferenceSignalPublisher extends Publisher<InferenceSignal> {
	subscribe(topic: InferenceSignal, listener: SignalListener): void {
		console.log("InferenceSignalPublisher: Subscribing to topic", topic)
		super.subscribe(topic, listener)
	}

	publish(topic: InferenceSignal, loopContext: LoopContext): void {
		console.log("InferenceSignalPublisher: Publishing to topic", topic)
		super.publish(topic, loopContext)
	}
}

export class InferenceEventPublisher extends Publisher<InferenceEvent> {
	subscribe(topic: InferenceEvent, listener: SignalListener): void {
		console.log("InferenceEventPublisher: Subscribing to topic", topic)
		super.subscribe(topic, listener)
	}

	publish(topic: InferenceEvent, loopContext: LoopContext): void {
		console.log("InferenceEventPublisher: Publishing to topic", topic)
		super.publish(topic, loopContext)
	}
}
