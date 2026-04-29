import { Participant } from "@domain/agentic-environment/participant"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"

export class AgenticEnvironment {
	protected subscribers: Participant[] = []
	private isActive = false

	async start() {
		this.isActive = true
		while (this.isActive) {
			await new Promise((resolve) => setTimeout(resolve, 100))
		}
	}

	stop() {
		this.isActive = false
	}

	subscribe(subscriber: Participant) {
		this.subscribers.push(subscriber)
	}

	unsubscribe(user: Participant) {
		this.subscribers = this.subscribers.filter((p) => p !== user)
	}

	notifyFunctionCallOutput(user: Participant, item: FunctionCallOutputItem): void {
		for (const subscriber of this.subscribers) {
			subscriber.onFunctionCallOutput(subscriber, item)
		}
	}

	notifyMessage(user: Participant, message: string): void {
		for (const subscriber of this.subscribers) {
			if (subscriber === user) {
				continue
			}
			subscriber.onMessage(subscriber, message)
		}
	}

	notifyFunctionCall(user: Participant, item: FunctionCallItem): void {
		for (const subscriber of this.subscribers) {
			subscriber.onFunctionCall(user, item)
		}
	}

	notifyReasoning(user: Participant, item: ReasoningItem): void {
		for (const subscriber of this.subscribers) {
			subscriber.onReasoning(user, item)
		}
	}

	notifyOutputMessage(user: Participant, item: ModelMessageItem): void {
		for (const subscriber of this.subscribers) {
			subscriber.onOutputMessage(user, item)
		}
	}
}
