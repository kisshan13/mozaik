import { AgentRuntime } from "@app/agent-runtime"
import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { Context } from "@domain/model-context/context"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { HookId } from "@domain/agent-loop/hooks/hook"
import { RuntimeContext } from "@domain/agent-loop/loop"
import { InferenceVisitor } from "./inference-visitor"

export class Agent {
	private visitor: InferenceVisitor | undefined

	constructor(private readonly runtime: AgentRuntime) {
		this.runtime.on(HookId.BEFORE_INFERENCE, this.beforeInference)
		this.runtime.on(HookId.AFTER_INFERENCE, this.afterInference)
		this.runtime.on(HookId.BEFORE_FUNCTION_CALL, this.beforeFunctionCall)
		this.runtime.on(HookId.AFTER_FUNCTION_CALL, this.afterFunctionCall)
		this.runtime.on(HookId.BEFORE_MODEL_MESSAGE, this.beforeModelMessage)
		this.runtime.on(HookId.AFTER_MODEL_MESSAGE, this.afterModelMessage)
		this.runtime.on(HookId.ON_ERROR, this.onError)
	}

	async beforeInference(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async afterInference(context: RuntimeContext): Promise<void> {
		const inferenceResponse = context.inferenceResponse
		if (inferenceResponse && this.visitor) {
			await this.visitor.afterInference(inferenceResponse)
		}
		return Promise.resolve()
	}

	async beforeFunctionCall(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async afterFunctionCall(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async beforeModelMessage(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async afterModelMessage(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async onError(context: RuntimeContext): Promise<void> {
		console.log("Error occurred", context.error)
		return Promise.resolve()
	}

	async onStart(context: RuntimeContext): Promise<void> {
		await this.visitor?.onStart(context)
		return Promise.resolve()
	}

	setInferenceVisitor(visitor: InferenceVisitor): void {
		this.visitor = visitor
	}

	async run(
		userMessage: string,
		model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability,
		context: Context,
	): Promise<void> {
		const userMessageItem = UserMessage.create(userMessage)
		return this.runtime.start(userMessageItem, model, context)
	}
}
