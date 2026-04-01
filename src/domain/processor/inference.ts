import { Processor } from "./processor"
import { Tool, ToolArgs } from "../runtime/tool"
import { InferenceEndedEvent } from "../event/inference-ended"

export type InferenceResult =
	| { suggestedNextStep: "tool_call"; tool: Tool; toolArgs: ToolArgs; rawResponse: unknown }
	| { suggestedNextStep: "respond"; rawResponse: unknown }

export abstract class InferenceProcessor extends Processor<unknown, InferenceEndedEvent> {
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

		this.publish(inferenceEvent)
	}

	abstract infer(input: unknown): Promise<InferenceResult>
}
