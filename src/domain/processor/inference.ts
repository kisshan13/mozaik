import { Processor } from "./processor"
import { Tool, ToolArgs } from "../runtime/tool"
import { InferenceEndedEvent } from "../event/inference-ended"

export type InferenceResult =
	| { suggestedNextStep: "tool_call"; tool: Tool; toolArgs: ToolArgs; rawResponse: unknown }
	| { suggestedNextStep: "respond"; rawResponse: unknown }

export abstract class InferenceProcessor extends Processor {
	readonly tools: Tool[]

	constructor(tools: Tool[]) {
		super()
		this.tools = tools
	}

	async process(initiator: string, input: unknown): Promise<void> {

	}

	abstract sendLLMRequest(input: unknown): Promise<unknown>

	async infer(input: unknown): Promise<InferenceResult>{

		const llmResponse = await this.sendLLMRequest(input)

		const inferenceEvent = new InferenceEndedEvent(
			crypto.randomUUID(),
			"inference_ended",
			new Date(),
			{},
			this.id,
			llmResponse,
		)

		this.publish("inference_ended", inferenceEvent)
	}
}
