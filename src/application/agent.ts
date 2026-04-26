import { AgentRuntime } from "@app/agent-runtime"
import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { ModelContext } from "@domain/model-context/model-context"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { HookId } from "@domain/agent-loop/hooks/hook"
import { RuntimeContext } from "@domain/agent-loop/agent-loop"
import { InferenceVisitor } from "../domain/agent-loop/visitors/inference-visitor"
import { FunctionCallVisitor } from "../domain/agent-loop/visitors/function-call-visitor"

export class Agent {
	private visitor: InferenceVisitor | undefined
	private functionCallVisitor: FunctionCallVisitor | undefined
	constructor(private readonly runtime: AgentRuntime) {
		this.runtime.on(HookId.BEFORE_INFERENCE, this.beforeInference)
		this.runtime.on(HookId.AFTER_INFERENCE, this.afterInference)
		this.runtime.on(HookId.BEFORE_FUNCTION_CALL, this.beforeFunctionCall)
		this.runtime.on(HookId.AFTER_FUNCTION_CALL, this.afterFunctionCall)
		this.runtime.on(HookId.BEFORE_MODEL_RESPONDED, this.beforeModelResponded)
		this.runtime.on(HookId.AFTER_MODEL_RESPONDED, this.afterModelResponded)
		this.runtime.on(HookId.ON_ERROR, this.onError)
	}

	async beforeInference(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async afterInference(context: RuntimeContext): Promise<void> {
		const inferenceResponse = context.inferenceResponse
		if (inferenceResponse && this.visitor !== undefined) {
			await this.visitor.afterInference(inferenceResponse)
		}
		return Promise.resolve()
	}

	async beforeFunctionCall(context: RuntimeContext): Promise<void> {
		if (this.functionCallVisitor !== undefined) {
			await this.functionCallVisitor.beforeFunctionCall(context)
		}
		return Promise.resolve()
	}

	async afterFunctionCall(context: RuntimeContext): Promise<void> {
		if (this.functionCallVisitor !== undefined) {
			await this.functionCallVisitor.afterFunctionCall(context)
		}
		return Promise.resolve()
	}

	async beforeModelResponded(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async afterModelResponded(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async onError(context: RuntimeContext): Promise<void> {
		console.log("Error occurred", context.error)
		return Promise.resolve()
	}

	async onStart(context: RuntimeContext): Promise<void> {
		if (this.visitor !== undefined) {
			await this.visitor.onStart(context)
		}
		return Promise.resolve()
	}

	setInferenceVisitor(visitor: InferenceVisitor): void {
		this.visitor = visitor
	}

	setFunctionCallVisitor(visitor: FunctionCallVisitor): void {
		this.functionCallVisitor = visitor
	}

	async run(
		userMessage: string,
		model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability,
		context: ModelContext,
	): Promise<void> {
		const userMessageItem = UserMessageItem.create(userMessage)
		return this.runtime.start(userMessageItem, model, context)
	}
}
