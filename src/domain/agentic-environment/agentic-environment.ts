import { Participant } from "@domain/agentic-environment/participant"
import { ContextItem } from "@domain/model-context/context-item/context-item"

export class AgenticEnvironment {
	protected subscribers: Participant[] = []
	private isActive = false

	subscribe(subscriber: Participant) {
		this.subscribers.push(subscriber)
	}

	unsubscribe(user: Participant) {
		this.subscribers = this.subscribers.filter((p) => p !== user)
	}

	deliverContextItem(source: Participant, item: ContextItem): void {
		for (const subscriber of this.subscribers) {
			if (subscriber === source) {
				subscriber.onInternalContextItem(item)
			} else {
				subscriber.onExternalContextItem(source, item)
			}
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
