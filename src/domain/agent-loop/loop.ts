import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { StateDetails, StateId } from "@domain/agent-loop/state/state"
import { FunctionCallState } from "@domain/agent-loop/state/function-call"
import { ModelMessageState } from "@domain/agent-loop/state/model-message"
import { InferencePendingState } from "@domain/agent-loop/state/inference-pending"
import { State } from "@domain/agent-loop/state/state"
import { Execution } from "@domain/agent-loop/execution"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { Context } from "@domain/model-context/context"
import { InferenceResponse } from "@domain/generative-model/inference-response"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallOutput } from "@domain/model-context/context-item/client-item/function-call-output"
import { Transition } from "@domain/agent-loop/transition/transition"
import { InferenceRequest } from "@domain/generative-model/inference-request"

export interface RuntimeContext {
	execution: Execution
	userMessage: UserMessage
	inferenceRequest?: InferenceRequest
	model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability
	context: Context
	inferenceResponse?: InferenceResponse
	functionCallOutput?: FunctionCallOutput
	modelMessage?: ModelMessage
	error?: Error
}

export class AgentLoop {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.INFERENCE_PENDING, new InferencePendingState())
		this.states.set(StateId.FUNCTION_CALL_PENDING, new FunctionCallState())
		this.states.set(StateId.MODEL_MESSAGE_RECEIVED, new ModelMessageState())
	}

	validateEntry(runtime: RuntimeContext): void {
		const state = this.states.get(runtime.execution.currentStateId)
		if (!state) {
			throw new Error(`State ${runtime.execution.currentStateId} not found`)
		}
		state.validateEntry(runtime)
	}

	getStateDetails(runtime: RuntimeContext): StateDetails {
		const state = this.states.get(runtime.execution.currentStateId)
		if (!state) {
			throw new Error(`State ${runtime.execution.currentStateId} not found`)
		}
		return state.getDetails()
	}

	next(runtime: RuntimeContext): Transition {
		const state = this.states.get(runtime.execution.currentStateId)
		if (!state) {
			throw new Error(`State ${runtime.execution.currentStateId} not found`)
		}
		return state.next(runtime)
	}
}
