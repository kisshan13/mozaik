import { UserMessageItem } from "@domain/model-context/context-item/client-item/user-message"
import { StateDetails, StateId } from "@domain/agent-loop/state/state"
import { FunctionCallPendingState } from "@domain/agent-loop/state/function-call-pending"
import { ModelRespondedState } from "@domain/agent-loop/state/model-responded"
import { InferencePendingState } from "@domain/agent-loop/state/inference-pending"
import { State } from "@domain/agent-loop/state/state"
import { Execution } from "@domain/agent-loop/execution"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { ModelContext } from "@domain/model-context/model-context"
import { InferenceResponse } from "@domain/generative-model/inference-response"
import { Transition } from "@domain/agent-loop/transition/transition"
import { InferenceRequest } from "@domain/generative-model/inference-request"
import { MessageReceivedState } from "./state/message-received"

export interface RuntimeContext {
	execution: Execution
	userMessage: UserMessageItem
	inferenceRequest?: InferenceRequest
	model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability
	context: ModelContext
	inferenceResponse?: InferenceResponse
	error?: Error
}

export class AgentLoop {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.MESSAGE_RECEIVED, new MessageReceivedState())
		this.states.set(StateId.INFERENCE_PENDING, new InferencePendingState())
		this.states.set(StateId.FUNCTION_CALL_PENDING, new FunctionCallPendingState())
		this.states.set(StateId.MODEL_RESPONDED, new ModelRespondedState())
	}

	getState(runtime: RuntimeContext): State {
		const state = this.states.get(runtime.execution.currentStateId)
		if (!state) {
			throw new Error(`State ${runtime.execution.currentStateId} not found`)
		}
		return state
	}
}
