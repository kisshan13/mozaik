import { Listener, ListenerId } from "./listener"
import { Tool, ToolArgs } from "./tool"
import { ToolCallEvent } from "./tool-call-event"

export class ToolExecutor<I = unknown, O = unknown> {

	readonly listeners: Map<ListenerId, Listener>

	constructor(listeners: Map<ListenerId, Listener> = new Map()) {
		this.listeners = listeners
	}

	getListeners(): Map<ListenerId, Listener> {
		return this.listeners
	}

	async executeTool(tool: Tool, args: ToolArgs){
		const result = await tool.execute(args)
		const toolCallEvent = new ToolCallEvent(crypto.randomUUID(), "tool_call", new Date(), {}, tool.name, tool.description, args, result)
		for (const listener of this.listeners.values()) {
			listener.listen(toolCallEvent)
		}

	}

}
