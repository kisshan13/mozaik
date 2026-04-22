import { UserMessage } from "@domain/model-context/context-item/client-item/user-message"
import { StateId } from "@domain/agnet-loop/state/state"
import { FunctionCallState } from "@domain/agnet-loop/state/function-call"
import { ModelMessageState } from "@domain/agnet-loop/state/model-message"
import { InferencePendingState } from "@domain/agnet-loop/state/inference-request"
import { UserMessageState } from "@domain/agnet-loop/state/user-message"
import { State } from "@domain/agnet-loop/state/state"
import { Execution } from "@domain/agnet-loop/execution"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { Context } from "@domain/model-context/context"
import { InferenceResponse } from "@domain/generative-model/inference-response"
import { ModelMessage } from "@domain/model-context/context-item/model-item/model-message"
import { FunctionCallOutput } from "@domain/model-context/context-item/client-item/function-call-output"
import { Transition } from "@domain/agnet-loop/transition/transition"

export interface RuntimeContext {
	execution: Execution
	userMessage: UserMessage
	model: GenerativeModel & ReasoningEffort<string> & ToolCallingCapability
	context: Context
	inferenceResponse?: InferenceResponse
	functionCallOutput?: FunctionCallOutput
	modelMessage?: ModelMessage
}

export class AgentLoop {
	private states: Map<StateId, State> = new Map<StateId, State>()

	constructor() {
		this.states.set(StateId.USER_MESSAGE_RECEIVED, new UserMessageState())
		this.states.set(StateId.INFERENCE_PENDING, new InferencePendingState())
		this.states.set(StateId.FUNCTION_CALL_PENDING, new FunctionCallState())
		this.states.set(StateId.MODEL_MESSAGE_RECEIVED, new ModelMessageState())
	}

	next(runtime: RuntimeContext): Transition {
		const state = this.states.get(runtime.execution.currentStateId)
		if (!state) {
			throw new Error(`State ${runtime.execution.currentStateId} not found`)
		}
		return state.next(runtime)
	}
}
