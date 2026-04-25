import { Execution, ExecutionStatus } from "@domain/agent-loop/execution"
import { AgentLoop, RuntimeContext } from "@domain/agent-loop/loop"
import { ModelContext } from "@domain/model-context/model-context"
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
		this.hooksRegistry.registerHandler(HookId.ON_ERROR, this.onError)
	}

	async onInferencePending(context: RuntimeContext): Promise<void> {
		const openaiResponses = new OpenAIResponses()
		const inferenceRequest = new InferenceRequest(context.model, context.context)
		const inferenceResponse = await openaiResponses.infer(inferenceRequest)
		context.inferenceResponse = inferenceResponse
		context.context.applyModelOutput(inferenceResponse.contextItems)
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
		context.context.addItem(FunctionCallOutput.create(functionCall.callId, JSON.stringify(functionCallOutput)))
		return Promise.resolve()
	}

	async onError(context: RuntimeContext): Promise<void> {
		const error = context.error
		if (!error) {
			throw new Error("Error not found")
		}
		console.error(error)
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
		context: ModelContext,
	): Promise<void> {
		console.log("Starting agent runtime")

		const execution = Execution.create()

		const loop = new AgentLoop()
		const runtimeContext: RuntimeContext = {
			execution,
			userMessage,
			model,
			context,
		}
		while (!execution.isTerminal()) {
			console.log("Executing state", execution.currentStateId)

			try {
				const stateDetails = loop.getStateDetails(runtimeContext)
				if (stateDetails.before) {
					const handler = this.hooksRegistry.getHandler(stateDetails.before)
					await handler(runtimeContext)
				}

				const stateHandler = this.stateHandlerRegistry.getHandler(execution.currentStateId)
				await stateHandler(runtimeContext)

				if (stateDetails.after) {
					const handler = this.hooksRegistry.getHandler(stateDetails.after)
					await handler(runtimeContext)
				}
			} catch (error) {
				console.log("Error occurred", error)
				execution.status = ExecutionStatus.FAILED
				const handler = this.hooksRegistry.getHandler(HookId.ON_ERROR)
				runtimeContext.error = error as Error
				await handler(runtimeContext)
			}

			const transition = loop.next(runtimeContext)
			await transition.apply(runtimeContext)
		}
	}
}
