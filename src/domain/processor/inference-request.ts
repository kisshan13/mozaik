import { BaseProcessor } from "./base"
import { Listener, ListenerId } from "../runtime/listener"
import { BaseEvent } from "../event/base"
import { ToolArgs } from "../runtime/tool"
import { InferenceEndedEvent } from "../event/inference-ended"

export type ToolCallSuggestion = {
	name: string
	description: string
	args: ToolArgs
}

export type InferenceResult =
	| { suggestedNextStep: "tool_call"; suggestion: ToolCallSuggestion; rawResponse: unknown }
	| { suggestedNextStep: "respond_to_user"; rawResponse: unknown }

export abstract class InferenceRequestProcessor extends BaseProcessor<unknown, BaseEvent> {
	constructor(listeners: Map<ListenerId, Listener> = new Map()) {
		super(listeners)
	}

	async process(initiator: string, input: unknown): Promise<void> {
		const result: InferenceResult = await this.infer(input)
		const inferenceEvent = new InferenceEndedEvent(
			crypto.randomUUID(),
			"inference_ended",
			new Date(),
			{},
			initiator,
			result,
		)

		this.notify(inferenceEvent)
	}

	abstract infer(input: unknown): Promise<InferenceResult>
}
