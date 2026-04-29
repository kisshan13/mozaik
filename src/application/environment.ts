import { ToolExecutor } from "@domain/agentic-environment/tool-executor"
import { AgenticEnvironment } from "../domain/agentic-environment/agentic-environment"
import { MessageSender } from "@domain/agentic-environment/message-sender"
import { Participant } from "@domain/agentic-environment/participant"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { InferenceHandler } from "@domain/agentic-environment/inference-handler"
import { ModelContext } from "@domain/model-context/model-context"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"

export class Environment extends AgenticEnvironment {
	private isActive = false

	constructor(toolExecutor: ToolExecutor, messageSender: MessageSender, inferenceHandler: InferenceHandler) {
		super(toolExecutor, messageSender, inferenceHandler)
	}

	async executeFunctionCall(user: Participant, functionCallItem: FunctionCallItem): Promise<void> {
		for await (const item of this.toolExecutor.produce(functionCallItem)) {
			this.notifyFunctionCallOutput(user, item)
		}
	}

	async sendMessage(user: Participant, message: string): Promise<void> {
		for await (const messagePart of this.messageSender.stream(message)) {
			this.notifyMessage(user, messagePart)
		}
	}

	async runInference(
		user: Participant,
		context: ModelContext,
		model: GenerativeModel,
		signal?: AbortSignal,
	): Promise<void> {
		for await (const item of this.inferenceHandler.produce(context, model, signal)) {
			if (item instanceof FunctionCallItem) {
				this.notifyFunctionCall(user, item)
			} else if (item instanceof ReasoningItem) {
				this.notifyReasoning(user, item)
			} else if (item instanceof ModelMessageItem) {
				this.notifyOutputMessage(user, item)
			}
		}
	}

	async start() {
		this.isActive = true
		while (this.isActive) {
			await new Promise((resolve) => setTimeout(resolve, 100))
		}
	}

	stop() {
		this.isActive = false
	}
}
