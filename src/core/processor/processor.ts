import { ContextItem } from "@core/context-runtime/context-item"
import { FunctionCallOutput } from "@core/context-runtime/input/function-call-output"
import { FunctionCall } from "@core/context-runtime/output/function-call"
import { Tool } from "@core/generative-model/tool"

export interface ContextItemProcessor {
	on(sessionId: string, contextItem: ContextItem): Promise<void>
}

export class FunctionCallProcessor implements ContextItemProcessor {
	private tools: Tool[]
	private bus: ContextItemBus

	constructor(tools: Tool[], bus: ContextItemBus) {
		this.tools = tools
		this.bus = bus
	}

	async on(sessionId: string, functionCall: FunctionCall): Promise<void> {
		const tool = this.tools.find((tool) => tool.name === functionCall.name)
		if (!tool) {
			return
		}
		const result = await tool.invoke(functionCall.args)
		this.bus.publish(sessionId, FunctionCallOutput.create(functionCall.callId, result))
	}
}

export interface ContextItemBus {
	publish(sessionId: string, contextItem: ContextItem): void
	subscribe(sessionId: string, processor: ContextItemProcessor): void
}

export class ContextItemBus implements ContextItemBus {
	private processors: Map<string, ContextItemProcessor> = new Map()

	publish(sessionId: string, input: ContextItem): void {
		const processor = this.processors.get(sessionId)
		if (processor) {
			processor.on(sessionId, input)
		}
	}
	subscribe(sessionId: string, processor: ContextItemProcessor): void {
		this.processors.set(sessionId, processor)
	}
}
