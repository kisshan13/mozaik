import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { FunctionCallCapable, InferenceCapable, InputCapable } from "@domain/agentic-environment/capabilities"
import { Participant } from "@domain/agentic-environment/participant"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelContext } from "@domain/model-context/model-context"
import { InferenceRunner } from "@domain/agentic-environment/inference-runner"
import { FunctionCallRunner } from "@domain/agentic-environment/function-call-runner"
import { InputStream } from "@domain/agentic-environment/input-stream"
import { FunctionCallOutputItem } from "@domain/model-context/context-item/client-item/function-call-output"
import { ModelMessageItem } from "@domain/model-context/context-item/model-item/model-message"
import { ReasoningItem } from "@domain/model-context/context-item/model-item/reasoning"

export class BaseAgentParticipant extends Participant implements InputCapable, InferenceCapable, FunctionCallCapable {
	private inputSource: InputStream
	private inferenceRunner: InferenceRunner
	private functionCallRunner: FunctionCallRunner

	constructor(inputSource: InputStream, inferenceRunner: InferenceRunner, functionCallRunner: FunctionCallRunner) {
		super()
		this.inputSource = inputSource
		this.inferenceRunner = inferenceRunner
		this.functionCallRunner = functionCallRunner
	}

	onJoined(environment: AgenticEnvironment) {}

	onLeft(environment: AgenticEnvironment) {}

	onParticipantJoined(participant: Participant) {}

	onParticipantLeft(participant: Participant) {}

	onFunctionCall(item: FunctionCallItem) {}

	onExternalFunctionCall(source: Participant, item: FunctionCallItem) {}

	onFunctionCallOutput(item: FunctionCallOutputItem) {}

	onExternalFunctionCallOutput(source: Participant, item: FunctionCallOutputItem) {}

	onReasoning(item: ReasoningItem) {}

	onExternalReasoning(source: Participant, item: ReasoningItem) {}

	onModelMessage(item: ModelMessageItem) {}

	onExternalModelMessage(source: Participant, item: ModelMessageItem) {}

	onMessage(message: string) {}

	async executeFunctionCall(
		environment: AgenticEnvironment,
		functionCallItem: FunctionCallItem,
		signal?: AbortSignal,
	): Promise<void> {
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
			if (item.type === "reasoning") {
				await environment.deliverReasoning(this, item)
			} else if (item.type === "function_call") {
				await environment.deliverFunctionCall(this, item)
			} else if (item.type === "message" && item.role === "assistant") {
				await environment.deliverModelMessage(this, item)
			}
		}
	}

	async streamInput(environment: AgenticEnvironment): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		const stream = this.inputSource.stream()
		for await (const message of stream) {
			await environment.deliverMessage(this, message)
		}
	}
}
