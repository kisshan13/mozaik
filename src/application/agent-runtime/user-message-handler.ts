import { RuntimeContext } from "@domain/agnet-loop/loop"
import { StateHandler } from "@app/agent-runtime/state-handler"
import { EventEmitter } from "@app/agent-runtime/event-emitter"

export class UserMessageHandler implements StateHandler, EventEmitter {
	private subscribers: Map<string, (data: any) => void> = new Map<string, (data: any) => void>()

	subscribe(event: string, callback: (data: any) => void): void {
		console.log(`Event subscribed: ${event} with callback: ${callback}`)
		this.subscribers.set(event, callback)
	}
	unsubscribe(event: string, callback: (data: any) => void): void {
		console.log(`Event unsubscribed: ${event} with callback: ${callback}`)
	}
	emit(event: string, data: any): void {
		console.log(`Event emitted: ${event} with data: ${data}`)
		const callback = this.subscribers.get(event)
		if (callback) {
			callback(data)
		}
	}
	async handle(runtimeContext: RuntimeContext): Promise<void> {
		this.emit("userMessageReceived", runtimeContext.userMessage)
	}
}
