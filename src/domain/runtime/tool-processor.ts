import { Listener, ListenerId } from "./listener"
import { Tool, ToolArgs } from "./tool"
import { ToolExecutedEvent } from "./tool-executed-event"

export class ToolProcessor {

	readonly listeners: Map<ListenerId, Listener>

	constructor(listeners: Map<ListenerId, Listener> = new Map()) {
		this.listeners = listeners
	}

	getListeners(): Map<ListenerId, Listener> {
		return this.listeners
	}

	notify(event: ToolExecutedEvent) {
		for (const listener of this.listeners.values()) {
			listener.listen(event)
		}
	}

	async execute(initiator: string, tool: Tool, args: ToolArgs){
		const result = await tool.execute(args)
		const toolExecutedEvent = new ToolExecutedEvent(crypto.randomUUID(), "tool_executed", new Date(), {}, initiator, tool.name, tool.description, args, result)
		this.notify(toolExecutedEvent)
	}

}
