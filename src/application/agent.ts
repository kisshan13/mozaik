import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { FunctionCallCapable, InferenceCapable, InputCapable } from "@domain/agentic-environment/capabilities"
import { Participant } from "@domain/agentic-environment/participant"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelContext } from "@domain/model-context/model-context"
import { InferenceRunner } from "@domain/agentic-environment/inference-runner"
import { FunctionCallRunner } from "@domain/agentic-environment/function-call-runner"
import { InputItemSource } from "@domain/agentic-environment/input-source"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { DeveloperMessageItem } from "@domain/model-context/context-item/client-item/developer-message"
import { SystemMessageItem } from "@domain/model-context/context-item/client-item/system-message"

export class BaseAgentParticipant extends Participant implements InputCapable, InferenceCapable, FunctionCallCapable {
	private inputSource: InputItemSource
	private inferenceRunner: InferenceRunner
	private functionCallRunner: FunctionCallRunner

	constructor(
		inputSource: InputItemSource,
		inferenceRunner: InferenceRunner,
		functionCallRunner: FunctionCallRunner,
	) {
		super()
		this.inputSource = inputSource
		this.inferenceRunner = inferenceRunner
		this.functionCallRunner = functionCallRunner
	}

	onInternalContextItem(item: ContextItem): Promise<void> {
		return Promise.resolve()
	}

	onFunctionCall(item: FunctionCallItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalFunctionCall(source: Participant, item: FunctionCallItem): Promise<void> {
		return Promise.resolve()
	}

	onFunctionCallOutput(item: FunctionCallOutputItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalFunctionCallOutput(source: Participant, item: FunctionCallOutputItem): Promise<void> {
		return Promise.resolve()
	}

	onReasoning(item: ReasoningItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalReasoning(source: Participant, item: ReasoningItem): Promise<void> {
		return Promise.resolve()
	}

	onModelMessage(item: ModelMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalModelMessage(source: Participant, item: ModelMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onUserMessage(item: UserMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalUserMessage(source: Participant, item: UserMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onDeveloperMessage(item: DeveloperMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalDeveloperMessage(source: Participant, item: DeveloperMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onSystemMessage(item: SystemMessageItem): Promise<void> {
		return Promise.resolve()
	}

	onExternalSystemMessage(source: Participant, item: SystemMessageItem): Promise<void> {
		return Promise.resolve()
	}

	async executeFunctionCall(environment: AgenticEnvironment, functionCallItem: FunctionCallItem, signal?: AbortSignal): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		const stream = this.functionCallRunner.run(functionCallItem, signal)

		for await (const item of stream) {
			await environment.deliverFunctionCallOutput(this, item)
		}
	}

	async runInference(
		environment: AgenticEnvironment,
		context: ModelContext,
		model: GenerativeModel,
		signal?: AbortSignal,
	): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		const stream = this.inferenceRunner.run(context, model, signal)

		for await (const item of stream) {

			if (item.type === 'reasoning') {		
				await environment.deliverReasoning(this, item)
			}else if (item.type === 'function_call') {
				await environment.deliverFunctionCall(this, item)
			}else if (item.type === 'message' && item.role === 'assistant') {
				await environment.deliverModelMessage(this, item)
			}
		}
	}
	async streamInput(environment: AgenticEnvironment): Promise<void> {
		if (!this.isJoinedTo(environment)) return


		const stream = this.inputSource.stream()
		for await (const item of stream) {

			if (item.type === 'message' && item.role === 'user') {
				await environment.deliverUserMessage(this, item)
			}else if (item.type === 'message' && item.role === 'developer') {
				await environment.deliverDeveloperMessage(this, item)
			}else if (item.type === 'message' && item.role === 'system') {
				await environment.deliverSystemMessage(this, item)
			}
		}
	}
}
