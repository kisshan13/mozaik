import { InteractionHandler } from "./handler"
import { Interaction } from "./interaction"

export interface Channel<T> {
	publish(sessionId: string, interaction: Interaction<T>): void
	subscribe(sessionId: string, handler: InteractionHandler<T>): void
}

export class InteractionChannel<T> implements Channel<T> {
	private interactionHandlers: Map<string, InteractionHandler<T>> = new Map()

	publish(sessionId: string, interaction: Interaction<T>): void {
		const interactionHandler = this.interactionHandlers.get(sessionId)
		if (interactionHandler) {
			interactionHandler.handle(sessionId, interaction)
		}
	}

	subscribe(sessionId: string, handler: InteractionHandler<T>): void {
		this.interactionHandlers.set(sessionId, handler)
	}
}
