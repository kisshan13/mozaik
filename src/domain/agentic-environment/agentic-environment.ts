import { Participant } from "@domain/agentic-environment/participant"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"

export class AgenticEnvironment {
	protected subscribers: Participant[] = []
	private isActive = false

	subscribe(subscriber: Participant) {
		this.subscribers.push(subscriber)
		for (const subscriber of this.subscribers) {
			if (subscriber === subscriber) {
				subscriber.onJoined()
			} else {
				subscriber.onParticipantJoined(subscriber)
			}
		}
	}

	unsubscribe(subscriber: Participant) {
		this.subscribers = this.subscribers.filter((p) => p !== subscriber)
		for (const subscriber of this.subscribers) {
			if (subscriber === subscriber) {
				subscriber.onLeft()
			} else {
				subscriber.onParticipantLeft(subscriber)
			}
		}
	}

	deliverFunctionCall(source: Participant, item: FunctionCallItem): void {
		for (const subscriber of this.subscribers) {
			if (subscriber === source) {
				subscriber.onFunctionCall(item)
			} else {
				subscriber.onExternalFunctionCall(source, item)
			}
		}
	}

	deliverModelMessage(source: Participant, item: ModelMessageItem): void {
		for (const subscriber of this.subscribers) {
			if (subscriber === source) {
				subscriber.onModelMessage(item)
			} else {
				subscriber.onExternalModelMessage(source, item)
			}
		}
	}

	deliverReasoning(source: Participant, item: ReasoningItem): void {
		for (const subscriber of this.subscribers) {
			if (subscriber === source) {
				subscriber.onReasoning(item)
			} else {
				subscriber.onExternalReasoning(source, item)
			}
		}
	}

	deliverFunctionCallOutput(source: Participant, item: FunctionCallOutputItem): void {
		for (const subscriber of this.subscribers) {
			if (subscriber === source) {
				subscriber.onFunctionCallOutput(item)
			} else {
				subscriber.onExternalFunctionCallOutput(source, item)
			}
		}
	}

	deliverMessage(source: Participant, message: string): void {
		for (const subscriber of this.subscribers) {
			if (subscriber === source) continue

			subscriber.onMessage(message)
		}
	}

	async start() {
		this.isActive = true
		while (this.isActive) {
			await new Promise((resolve) => setTimeout(resolve, 100))
		}
	}

	stop() {
		this.isActive = false
	}
}
