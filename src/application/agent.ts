import { AgenticEnvironment } from "@domain/agentic-environment/agentic-environment"
import { FunctionCallCapable, InferenceCapable, InputCapable } from "@domain/agentic-environment/capabilities"
import { Participant } from "@domain/agentic-environment/participant"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ContextItem } from "@domain/model-context/context-item/context-item"
import { FunctionCallItem } from "@domain/model-context/context-item/model-item/function-call"
import { ModelContext } from "@domain/model-context/model-context"
import { deliverStream } from "./deliver-stream"
import { InferenceRunner } from "@domain/agentic-environment/inference-runner"
import { FunctionCallRunner } from "@domain/agentic-environment/function-call-runner"
import { InputItemSource } from "@domain/agentic-environment/input-source"

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

	onExternalContextItem(source: Participant, item: ContextItem): Promise<void> {
		return Promise.resolve()
	}

	async executeFunctionCall(
		environment: AgenticEnvironment,
		functionCallItem: FunctionCallItem,
		signal?: AbortSignal,
	): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		await deliverStream(environment, this, this.functionCallRunner.run(functionCallItem, signal))
	}

	async runInference(
		environment: AgenticEnvironment,
		context: ModelContext,
		model: GenerativeModel,
		signal?: AbortSignal,
	): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		await deliverStream(environment, this, this.inferenceRunner.run(context, model, signal))
	}

	async streamInput(environment: AgenticEnvironment): Promise<void> {
		if (!this.isJoinedTo(environment)) return

		await deliverStream(environment, this, this.inputSource.stream())
	}
}
