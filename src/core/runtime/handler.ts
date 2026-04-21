import { FunctionCallOutput } from "@core/context/input/function-call-output"
import { FunctionCall } from "@core/context/output/function-call"
import { Effect, Interaction, Motion } from "./interaction"
import { UserMessage } from "@core/context/input/user-message"
import { InferenceRequest } from "@core/generative-model/inference-request"
import { InferenceResponse } from "@core/generative-model/inference-response"
import { ModelMessage } from "@core/context/output/model-message"

export interface InteractionHandler<T> {
	handle(sessionId: string, interaction: Interaction<T>): Promise<void>
}

export interface UserMessageHandler extends InteractionHandler<UserMessage> {
	handle(sessionId: string, interaction: Interaction<UserMessage>): Promise<void>
}

export interface InferenceRequestHandler extends InteractionHandler<InferenceRequest> {
	handle(sessionId: string, interaction: Interaction<InferenceRequest>): Promise<void>
}

export interface InferenceResponseHandler extends InteractionHandler<InferenceResponse> {
	handle(sessionId: string, interaction: Interaction<InferenceResponse>): Promise<void>
}

export interface FunctionCallHandler extends InteractionHandler<FunctionCall> {
	handle(sessionId: string, interaction: Interaction<FunctionCall>): Promise<void>
}

export interface FunctionCallOutputHandler extends InteractionHandler<FunctionCallOutput> {
	handle(sessionId: string, interaction: Interaction<FunctionCallOutput>): Promise<void>
}

export interface ModelMessageHandler extends InteractionHandler<ModelMessage> {
	handle(sessionId: string, interaction: Interaction<ModelMessage>): Promise<void>
}

export class Runtime {
	private userMessageHandler: UserMessageHandler
	private inferenceRequestHandler: InferenceRequestHandler
	private inferenceResponseHandler: InferenceResponseHandler
	private functionCallHandler: FunctionCallHandler
	private functionCallOutputHandler: FunctionCallOutputHandler
	private modelMessageHandler: ModelMessageHandler

	constructor(
		userMessageHandler: UserMessageHandler,
		inferenceRequestHandler: InferenceRequestHandler,
		inferenceResponseHandler: InferenceResponseHandler,
		functionCallHandler: FunctionCallHandler,
		functionCallOutputHandler: FunctionCallOutputHandler,
		modelMessageHandler: ModelMessageHandler,
	) {
		this.userMessageHandler = userMessageHandler
		this.inferenceRequestHandler = inferenceRequestHandler
		this.inferenceResponseHandler = inferenceResponseHandler
		this.functionCallHandler = functionCallHandler
		this.functionCallOutputHandler = functionCallOutputHandler
		this.modelMessageHandler = modelMessageHandler
	}

	async start(sessionId: string, userMessage: UserMessage): Promise<void> {
		this.userMessageHandler.handle(sessionId, new Motion<UserMessage>(userMessage))
	}

	async onInferenceRequest(sessionId: string, inferenceRequest: InferenceRequest): Promise<void> {
		this.inferenceRequestHandler.handle(sessionId, new Motion<InferenceRequest>(inferenceRequest))
	}

	async onInferenceResponse(sessionId: string, inferenceResponse: InferenceResponse): Promise<void> {
		this.inferenceResponseHandler.handle(sessionId, new Effect<InferenceResponse>(inferenceResponse))
	}

	async onFunctionCall(sessionId: string, functionCall: FunctionCall): Promise<void> {
		this.functionCallHandler.handle(sessionId, new Motion<FunctionCall>(functionCall))
	}

	async onFunctionCallOutput(sessionId: string, functionCallOutput: FunctionCallOutput): Promise<void> {
		this.functionCallOutputHandler.handle(sessionId, new Effect<FunctionCallOutput>(functionCallOutput))
	}

	async onModelMessage(sessionId: string, modelMessage: ModelMessage): Promise<void> {
		this.modelMessageHandler.handle(sessionId, new Effect<ModelMessage>(modelMessage))
	}
}

// export class FunctionCallHandler implements MotionHandler<FunctionCall> {
// 	private tools: Tool[]
// 	private effectChannel: EffectChannel<FunctionCallOutput>

// 	constructor(tools: Tool[], effectChannel: EffectChannel<FunctionCallOutput>) {
// 		this.tools = tools
// 		this.effectChannel = effectChannel
// 	}

// 	async on(sessionId: string, motion: Motion<FunctionCall>): Promise<void> {
// 		const functionCall = motion.data
// 		const tool = this.tools.find((tool) => tool.name === functionCall.name)
// 		if (!tool) {
// 			return
// 		}
// 		const result = await tool.invoke(functionCall.args)

// 		const effect = new Effect(FunctionCallOutput.create("function_call_executed", result))
// 		this.effectChannel.publish(sessionId, effect)
// 	}
// }
