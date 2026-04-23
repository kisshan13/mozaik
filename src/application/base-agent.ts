import { AgentRuntime } from "@app/agent-runtime/agent-runtime"
import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { Context } from "@domain/model-context/context"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { HookId } from "@domain/agent-loop/hooks/hook"
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { InferenceResponse } from "@domain/generative-model/inference-response"
import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"
import { FunctionCallOutput } from "@domain/model-context/context-item/client-item/function-call-output"

export class BaseAgent {
	constructor(private readonly runtime: AgentRuntime) {
		this.runtime.on(HookId.BEFORE_INFERENCE, this.onBeforeInference)
		this.runtime.on(HookId.AFTER_INFERENCE, this.onAfterInference)
		this.runtime.on(HookId.BEFORE_FUNCTION_CALL, this.onBeforeFunctionCall)
		this.runtime.on(HookId.AFTER_FUNCTION_CALL, this.onAfterFunctionCall)
		this.runtime.on(HookId.BEFORE_MODEL_MESSAGE, this.onBeforeModelMessage)
		this.runtime.on(HookId.ON_MODEL_MESSAGE, this.onModelMessageReceived)
	}


	async onModelMessageReceived({
		modelMessage,
		context,
	}: {
		modelMessage: ModelMessage
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async onBeforeInference({
		inferenceRequest,
		context,
	}: {
		inferenceRequest: InferenceRequest
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async onAfterInference({
		inferenceResponse,
		context,
	}: {
		inferenceResponse: InferenceResponse
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async onBeforeFunctionCall({
		functionCall,
		context,
	}: {
		functionCall: FunctionCall
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async onAfterFunctionCall({
		functionCallOutput,
		context,
	}: {
		functionCallOutput: FunctionCallOutput
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async onBeforeModelMessage({
		modelMessage,
		context,
	}: {
		modelMessage: ModelMessage
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async message(
		userMessage: UserMessage,
		model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability,
		context: Context,
	): Promise<void> {
		return this.runtime.start(userMessage, model, context)
	}
}
