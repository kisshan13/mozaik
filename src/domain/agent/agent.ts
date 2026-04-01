import { AgentRuntime } from "../communication/observer"
import { Publisher } from "../communication/publisher"

export abstract class Agent extends Publisher implements AgentRuntime {
	readonly requestParameters: Record<string, unknown>

	constructor(
		private readonly id: string,
		requestParameters: Record<string, unknown>,
	) {
		super()
		this.id = id
		this.requestParameters = requestParameters
	}

	onLlmResponse(llmResponse: unknown): Promise<void> | void {
		throw new Error("Method not implemented.")
	}
	onToolCall(initiator: string, toolName: string, toolArgs: unknown): Promise<void> | void {
		throw new Error("Method not implemented.")
	}
	onToolCallResult(toolName: string, toolArgs: unknown, result: unknown): Promise<void> | void {
		throw new Error("Method not implemented.")
	}

	onMessage(messageType: string, data: unknown): Promise<void> | void {}
}
