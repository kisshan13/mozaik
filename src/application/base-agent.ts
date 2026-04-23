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
		this.runtime.on(HookId.BEFORE_INFERENCE, this.beforeInference)
		this.runtime.on(HookId.AFTER_INFERENCE, this.afterInference)
		this.runtime.on(HookId.BEFORE_FUNCTION_CALL, this.beforeFunctionCall)
		this.runtime.on(HookId.AFTER_FUNCTION_CALL, this.afterFunctionCall)
		this.runtime.on(HookId.BEFORE_MODEL_MESSAGE, this.beforeModelMessage)
		this.runtime.on(HookId.AFTER_MODEL_MESSAGE, this.afterModelMessage)
	}

	async beforeInference({
		inferenceRequest,
		context,
	}: {
		inferenceRequest: InferenceRequest
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async afterInference({
		inferenceResponse,
		context,
	}: {
		inferenceResponse: InferenceResponse
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async beforeFunctionCall({
		functionCall,
		context,
	}: {
		functionCall: FunctionCall
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async afterFunctionCall({
		functionCallOutput,
		context,
	}: {
		functionCallOutput: FunctionCallOutput
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async beforeModelMessage({
		modelMessage,
		context,
	}: {
		modelMessage: ModelMessage
		context: Context
	}): Promise<void> {
		return Promise.resolve()
	}

	async afterModelMessage({
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
