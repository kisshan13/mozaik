import { Execution, ExecutionStatus } from "@domain/agent-loop/execution"
import { AgentLoop, RuntimeContext } from "@domain/agent-loop/loop"
import { Context } from "@domain/model-context/context"
import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { HooksRegistry } from "@domain/agent-loop/hooks/hooks-registry"
import { HookId } from "@domain/agent-loop/hooks/hook"
import { StateHandlerRegistry } from "@domain/agent-loop/state/state-registry"
import { StateId } from "@domain/agent-loop/state/state"
import { FunctionCall } from "@domain/model-context/context-item/model-item/function-call"
import { FunctionCallOutput } from "@domain/model-context/context-item/client-item/function-call-output"
import { OpenAIResponses } from "@infra/providers/openai/runtime/openai-responses"
import { InferenceRequest } from "@domain/generative-model/inference-request"

export class AgentRuntime {
	private hooksRegistry: HooksRegistry = new HooksRegistry()
	private stateHandlerRegistry: StateHandlerRegistry = new StateHandlerRegistry()

	constructor() {
		this.stateHandlerRegistry.registerHandler(StateId.INFERENCE_PENDING, this.onInferencePending)
		this.stateHandlerRegistry.registerHandler(StateId.FUNCTION_CALL_PENDING, this.onFunctionCallPending)
		this.stateHandlerRegistry.registerHandler(StateId.MODEL_MESSAGE_RECEIVED, this.onModelMessageReceived)
	}

	async onInferencePending(context: RuntimeContext): Promise<void> {
		const openaiResponses = new OpenAIResponses()
		const inferenceRequest = new InferenceRequest(context.model, context.context)
		const inferenceResponse = await openaiResponses.infer(inferenceRequest)
		context.inferenceResponse = inferenceResponse
		return Promise.resolve()
	}

	async onFunctionCallPending(context: RuntimeContext): Promise<void> {
		const functionCall = context.inferenceResponse?.contextItems.find((item) => item.getType() === "function_call")
		if (!functionCall || !(functionCall instanceof FunctionCall)) {
			throw new Error("Function call not found")
		}

		const tool = context.model.getTools().find((tool) => tool.name === functionCall.name)
		if (!tool) {
			throw new Error("Function not found")
		}

		const functionCallOutput = await tool.invoke(functionCall.args)
		context.functionCallOutput = FunctionCallOutput.create(functionCall.callId, functionCallOutput)
		return Promise.resolve()
	}

	async onModelMessageReceived(context: RuntimeContext): Promise<void> {
		return Promise.resolve()
	}

	async on(hookId: HookId, callback: (data: any) => Promise<void>): Promise<void> {
		this.hooksRegistry.registerHandler(hookId, callback)
	}

	async start(
		userMessage: UserMessage,
		model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability,
		context: Context,
	): Promise<void> {
		const execution = Execution.create()

		const loop = new AgentLoop()
		const runtimeContext: RuntimeContext = {
			execution,
			userMessage,
			model,
			context,
		}
		while (!execution.isTerminal()) {
			const transition = loop.next(runtimeContext)
			await transition.apply(runtimeContext)

			try {
				const stateDetails = loop.getStateDetails(runtimeContext)
				if (stateDetails.before) {
					const handler = this.hooksRegistry.getHandler(stateDetails.before)
					await handler(runtimeContext)
				}

				if (stateDetails.after) {
					const handler = this.hooksRegistry.getHandler(stateDetails.after)
					await handler(runtimeContext)
				}
			} catch (error) {
				execution.status = ExecutionStatus.FAILED
				break
			}
		}
	}
}
