import { GenerativeModel } from "@domain/generative-model/generative-model"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { ModelContext } from "@domain/model-context/model-context"
import { ToolExecutor } from "./tool-executor"
import { MessageSender } from "./message-sender"
import { InferenceHandler } from "./inference-handler"
import { AgenticEnvironment } from "./agentic-environment"

export abstract class Participant {
	protected toolExecutor: ToolExecutor
	protected messageSender: MessageSender
	protected inferenceHandler: InferenceHandler
	protected environments: AgenticEnvironment[] = []

	constructor(toolExecutor: ToolExecutor, messageSender: MessageSender, inferenceHandler: InferenceHandler) {
		this.toolExecutor = toolExecutor
		this.messageSender = messageSender
		this.inferenceHandler = inferenceHandler
	}

	abstract onFunctionCallOutput(participant: Participant, item: FunctionCallOutputItem): Promise<void>

	abstract onMessage(participant: Participant, message: string): Promise<void>

	abstract onFunctionCall(participant: Participant, item: FunctionCallItem): Promise<void>

	abstract onReasoning(participant: Participant, item: ReasoningItem): Promise<void>

	abstract onOutputMessage(participant: Participant, item: ModelMessageItem): Promise<void>

	async sendMessage(message: string, environment: AgenticEnvironment): Promise<void> {
		if (!this.environments.includes(environment)) {
			return
		}
		for await (const messagePart of this.messageSender.stream(message)) {
			environment.notifyMessage(this, messagePart)
		}
	}

	async executeFunctionCall(functionCallItem: FunctionCallItem, environment: AgenticEnvironment): Promise<void> {
		if (!this.environments.includes(environment)) {
			return
		}
		for await (const item of this.toolExecutor.produce(functionCallItem)) {
			environment.notifyFunctionCallOutput(this, item)
		}
	}

	async runInference(
		environment: AgenticEnvironment,
		context: ModelContext,
		model: GenerativeModel,
		signal?: AbortSignal,
	): Promise<void> {
		if (!this.environments.includes(environment)) {
			return
		}

		for await (const item of this.inferenceHandler.produce(context, model, signal)) {
			if (item instanceof FunctionCallItem) {
				environment.notifyFunctionCall(this, item)
			} else if (item instanceof ReasoningItem) {
				environment.notifyReasoning(this, item)
			} else if (item instanceof ModelMessageItem) {
				environment.notifyOutputMessage(this, item)
			}
		}
	}

	join(environment: AgenticEnvironment) {
		if (this.environments.includes(environment)) {
			return
		}
		environment.subscribe(this)
		this.environments.push(environment)
	}

	leave(environment: AgenticEnvironment) {
		if (!this.environments.includes(environment)) {
			return
		}
		environment.unsubscribe(this)
		this.environments = this.environments.filter((e) => e !== environment)
	}
}
