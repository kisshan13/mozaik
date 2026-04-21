import { UserMessage } from "@domain/context/input/user-message"
import { StateId } from "./state/state"
import { FunctionCallState } from "./state/function-call"
import { ModelMessageState } from "./state/model-message"
import { InferencePendingState } from "./state/inference-request"
import { UserMessageState } from "./state/user-message"
import { State } from "./state/state"
import { Execution } from "./execution"
import { GenerativeModel } from "@domain/generative-model/generative-model"
import { ReasoningEffort } from "@domain/generative-model/capabilities/reasoning-effort"
import { ToolCallingCapability } from "@domain/generative-model/capabilities/tool-calling"
import { Context } from "@domain/context/context"
import { InferenceResponse } from "@domain/generative-model/inference-response"
import { ModelMessage } from "@domain/context/output/model-message"
import { FunctionCallOutput } from "@domain/context/input/function-call-output"
import { Transition } from "./transition/transition"

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
