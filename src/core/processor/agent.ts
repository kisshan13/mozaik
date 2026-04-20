import { ContextItem } from "@core/context-runtime/context-item"
import { ContextItemBus, ContextItemProcessor, FunctionCallProcessor } from "./processor"
import { UserMessage } from "@core/context-runtime/input/user-message"

export class AgentRuntime {
	private processors: ContextItemProcessor[] = []
	private bus: ContextItemBus

	constructor(processors: ContextItemProcessor[]) {
		this.processors = processors
		this.bus = new ContextItemBus()
	}

	subscribe(sessionId: string, processor: ContextItemProcessor) {
		this.bus.subscribe(sessionId, processor)
	}

	process(sessionId: string, input: ContextItem) {
		for (const processor of this.processors) {
			processor.on(sessionId, input)
		}
	}
}
export class Agent {
	private runtime: AgentRuntime

	constructor(runtime: AgentRuntime) {
		this.runtime = runtime
	}

	async run(sessionId: string, input: ContextItem) {
		this.runtime.process(sessionId, input)
	}
}

const functionCallProcessor = new FunctionCallProcessor([], new ContextItemBus())
const runtime = new AgentRuntime([functionCallProcessor])
runtime.subscribe("123", functionCallProcessor)
const agent = new Agent(runtime)
agent.run("123", UserMessage.create("Hello, how are you?"))
