import { ToolExecutedEvent } from "../event/tool-executed"
import { InferenceEndedEvent } from "../event/inference-ended"
import { Tool } from "../runtime/tool"
import { Observer } from "../communication/observer"
import { Publisher } from "../communication/publisher"
import { InferenceResult } from "./inference-result"

export abstract class Agent extends Publisher implements Observer {

	readonly requestParameters: Record<string, unknown>
	
	constructor(
		private readonly id: string,
		requestParameters: Record<string, unknown>,
	) {
		super()
		this.id = id
		this.requestParameters = requestParameters
	}

	onEvent(event: string, data: unknown): Promise<void> | void {
		switch (event) {
			case "tool_executed":
				this.onToolExecuted(data as ToolExecutedEvent)
				break
			case "inference_ended":
				this.onInferenceEnded(data as InferenceEndedEvent)
				break
			case "message":
				this.infer(data)
				break
		}
	}

	onToolExecuted(event: ToolExecutedEvent) {
		this.infer(event)
	}

	onLlmResponse(event: InferenceEndedEvent) {
		const llmResponse = event.llmResponse
		if (event.result.suggestedNextStep === "tool_call") {
			this.publish("tool_call", { initiator: this.id, tool: result.tool, toolArgs: result.toolArgs })
		} else if (event.getResult().suggestedNextStep === "respond") {
			this.publish("message", event.getResult().rawResponse)
		}
	}

	onToolCall(toolName: string, toolArgs: unknown): Promise<void> | void {

	}

    onMessage(messageType: string, data: unknown): Promise<void> | void {

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
