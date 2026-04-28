import { InferenceHandler } from "@domain/agentic-environment/inference-handler"
import { MessageSender } from "@domain/agentic-environment/message-sender"
import { Participant } from "@domain/agentic-environment/participant"
import { ToolExecutor } from "@domain/agentic-environment/tool-executor"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelContext } from "@domain/model-context/model-context"

export abstract class AgenticEnvironment {
	protected toolExecutor: ToolExecutor
	protected messageSender: MessageSender
	protected inferenceHandler: InferenceHandler
	protected participants: Participant[] = []

	constructor(toolExecutor: ToolExecutor, messageSender: MessageSender, inferenceHandler: InferenceHandler) {
		this.toolExecutor = toolExecutor
		this.messageSender = messageSender
		this.inferenceHandler = inferenceHandler
	}

	join(user: Participant) {
		this.participants.push(user)
	}

	leave(user: Participant) {
		this.participants = this.participants.filter((p) => p !== user)
	}

	notifyFunctionCallOutput(user: Participant, item: FunctionCallOutputItem): void {
		for (const participant of this.participants) {
			participant.onFunctionCallOutput(user, item)
		}
	}

	notifyMessage(user: Participant, message: string): void {
		for (const participant of this.participants) {
			if (participant === user) {
				continue
			}
			participant.onMessage(user, message)
		}
	}

	abstract executeFunctionCall(user: Participant, functionCallItem: FunctionCallItem): Promise<void>

	abstract sendMessage(user: Participant, message: string): Promise<void>

	abstract runInference(
		user: Participant,
		context: ModelContext,
		model: GenerativeModel,
		signal?: AbortSignal,
	): Promise<void>

	notifyFunctionCall(user: Participant, item: FunctionCallItem): void {
		for (const participant of this.participants) {
			participant.onFunctionCall(user, item)
		}
	}

	notifyReasoning(user: Participant, item: ReasoningItem): void {
		for (const participant of this.participants) {
			participant.onReasoning(user, item)
		}
	}

	notifyOutputMessage(user: Participant, item: ModelMessageItem): void {
		for (const participant of this.participants) {
			participant.onOutputMessage(user, item)
		}
	}
}
